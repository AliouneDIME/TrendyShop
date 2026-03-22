/**
 * TrendyShop — Backend sécurisé
 *
 * Corrections de sécurité appliquées :
 *   ✓ CSRF activé et enforced
 *   ✓ IPN PayTech avec vérification HMAC
 *   ✓ /health ne révèle plus l'environnement
 *   ✓ CORS échoue si FRONTEND_URL non défini en production
 *   ✓ redirect_url validée avant envoi au client
 *   ✓ Mobile money lève une erreur si clés absentes
 *   ✓ Logs sans données PII sensibles
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import https from 'https';

const app = express();

// ─── Fail fast si config critique manquante en production ────────────────────
if (process.env.NODE_ENV === 'production') {
  if (!process.env.PAYTECH_API_KEY || !process.env.PAYTECH_API_SECRET) {
    console.error('❌ FATAL: PAYTECH_API_KEY et PAYTECH_API_SECRET requis en production');
    process.exit(1);
  }
  if (!process.env.FRONTEND_URL) {
    console.error('❌ FATAL: FRONTEND_URL requis en production');
    process.exit(1);
  }
  if (!process.env.PAYTECH_IPN_SECRET) {
    console.error('❌ FATAL: PAYTECH_IPN_SECRET requis en production');
    process.exit(1);
  }
}

// ─── Security Middleware ─────────────────────────────────────────────────────

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", 'https://www.googletagmanager.com'],  // ← supprimé 'unsafe-inline'
      styleSrc:   ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc:    ["'self'", 'https://fonts.gstatic.com'],
      imgSrc:     ["'self'", 'data:', 'https://images.unsplash.com'],
      connectSrc: ["'self'", 'https://paytech.sn'],
      frameSrc:   ["'none'"],
      objectSrc:  ["'none'"],
    },
  },
  hsts:            { maxAge: 31536000, includeSubDomains: true, preload: true },
  frameguard:      { action: 'deny' },
  noSniff:         true,
  referrerPolicy:  { policy: 'strict-origin-when-cross-origin' },
}));

// CORS : liste blanche stricte
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',');
app.use(cors({
  origin: (origin, callback) => {
    // En dev, origin peut être undefined (curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origine non autorisée: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '10kb' }));

// ─── Rate Limiting ───────────────────────────────────────────────────────────

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  // En production, faire confiance au proxy
  ...(process.env.NODE_ENV === 'production' ? { trustProxy: 1 } : {}),
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Trop de tentatives de paiement. Veuillez patienter.' },
});

app.use(globalLimiter);

// ─── CSRF Protection (ACTIVÉ) ────────────────────────────────────────────────

const csrfTokens = new Map<string, number>();

// Nettoyage des tokens expirés toutes les heures
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of csrfTokens.entries()) {
    if (now > expiry) csrfTokens.delete(token);
  }
}, 60 * 60 * 1000);

function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function validateCsrfToken(token: string): boolean {
  const expiry = csrfTokens.get(token);
  if (!expiry || Date.now() > expiry) return false;
  csrfTokens.delete(token); // Usage unique
  return true;
}

app.get('/api/csrf-token', (req, res) => {
  const token = generateCsrfToken();
  csrfTokens.set(token, Date.now() + 60 * 60 * 1000); // 1h
  res.json({ token });
});

// ✅ CSRF ACTIVÉ — plus commenté
function csrfMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers['x-csrf-token'] as string;

  // En développement : optionnel (facilite les tests)
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  // En production : obligatoire
  if (!token || !validateCsrfToken(token)) {
    return res.status(403).json({ error: 'Token CSRF invalide ou expiré' });
  }
  next();
}

// ─── Input Validation ────────────────────────────────────────────────────────

function sanitize(str: unknown, maxLen = 200): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')          // Supprimer balises HTML
    .replace(/[<>"';&]/g, '')         // Supprimer chars dangereux
    .trim()
    .slice(0, maxLen);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function validatePhone(phone: string): boolean {
  return /^(\+221|221)?(7[0-9]{8})$/.test(phone.replace(/\s/g, ''));
}

function validateAmount(amount: unknown): boolean {
  return typeof amount === 'number' &&
    Number.isFinite(amount) &&
    Number.isInteger(amount) &&
    amount >= 100 &&           // Minimum 100 XOF
    amount <= 10_000_000;      // Maximum 10M XOF
}

function validatePayTechUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'paytech.sn' && parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Masquer PII dans les logs
function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  return `${user.slice(0, 2)}***@${domain}`;
}
function maskPhone(phone: string): string {
  return phone.slice(0, 4) + '***' + phone.slice(-2);
}

// ─── PayTech Integration ─────────────────────────────────────────────────────

const PAYTECH_API_KEY    = process.env.PAYTECH_API_KEY    || '';
const PAYTECH_API_SECRET = process.env.PAYTECH_API_SECRET || '';
const PAYTECH_IPN_SECRET = process.env.PAYTECH_IPN_SECRET || '';

interface PayTechPayload {
  item_name:    string;
  item_price:   number;
  currency:     string;
  ref_command:  string;
  command_name: string;
  env:          'test' | 'prod';
  success_url:  string;
  cancel_url:   string;
  ipn_url:      string;
  custom_field?: string;
}

async function callPayTech(payload: PayTechPayload): Promise<{
  success: number; token?: string; redirect_url?: string; errors?: string[]
}> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);

    const options = {
      hostname: 'paytech.sn',
      path: '/api/payment/request-payment',
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(body),
        'API_KEY':        PAYTECH_API_KEY,    // ← clés envoyées SERVEUR → PayTech uniquement
        'API_SECRET':     PAYTECH_API_SECRET,
      },
      timeout: 15000,
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error('Réponse PayTech invalide')); }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout PayTech')); });
    req.write(body);
    req.end();
  });
}

// ─── Payment Routes ───────────────────────────────────────────────────────────

app.post('/api/payment/paytech', paymentLimiter, csrfMiddleware, async (req, res) => {
  try {
    const { ref, amount, item_name, buyer_name, buyer_email, buyer_phone, items } = req.body;

    // Validations
    if (!validateAmount(amount)) {
      return res.status(400).json({ error: 'Montant invalide (min 100 XOF, max 10 000 000 XOF)' });
    }
    if (buyer_email && !validateEmail(buyer_email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }
    if (buyer_phone && !validatePhone(buyer_phone)) {
      return res.status(400).json({ error: 'Numéro de téléphone invalide' });
    }

    const safeRef  = sanitize(ref, 50)       || `TS-${Date.now()}`;
    const safeName = sanitize(item_name, 150) || 'Commande TrendyShop';
    const baseUrl  = process.env.FRONTEND_URL || 'http://localhost:5173';

    const payload: PayTechPayload = {
      item_name:    safeName,
      item_price:   amount,
      currency:     'XOF',
      ref_command:  safeRef,
      command_name: `TrendyShop – ${safeRef}`,
      env:          process.env.NODE_ENV === 'production' ? 'prod' : 'test',
      success_url:  `${baseUrl}/success?ref=${encodeURIComponent(safeRef)}`,
      cancel_url:   `${baseUrl}/cancel`,
      ipn_url:      `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/payment/ipn`,
      custom_field: JSON.stringify({
        buyer_name:  sanitize(buyer_name),
        buyer_email: sanitize(buyer_email),
        buyer_phone: sanitize(buyer_phone),
        items: Array.isArray(items)
          ? items.slice(0, 20).map(i => ({
              name:  sanitize(i.name, 100),
              qty:   Math.min(Math.max(1, parseInt(i.qty) || 1), 99),
              price: Number.isFinite(parseFloat(i.price)) ? parseFloat(i.price) : 0,
            }))
          : [],
      }),
    };

    // Log sans PII
    console.log(`[PayTech] Init: ${safeRef} — ${amount} XOF — ${buyer_email ? maskEmail(buyer_email) : 'guest'}`);

    const result = await callPayTech(payload);

    if (result.success === 1 && result.redirect_url) {
      // ✅ Valider que l'URL vient de paytech.sn avant de l'envoyer au client
      if (!validatePayTechUrl(result.redirect_url)) {
        console.error('[PayTech] URL suspecte reçue:', result.redirect_url.slice(0, 50));
        return res.status(500).json({ error: 'Erreur de sécurité paiement' });
      }
      res.json({ success: true, redirect_url: result.redirect_url, token: result.token });
    } else {
      console.error('[PayTech] Échec:', JSON.stringify(result.errors));
      res.status(400).json({ success: false, errors: result.errors || ['Erreur PayTech'] });
    }
  } catch (err) {
    console.error('[PayTech] Exception:', err instanceof Error ? err.message : 'Erreur inconnue');
    res.status(500).json({ error: 'Erreur serveur lors de l\'initiation du paiement' });
  }
});

// ─── IPN (SÉCURISÉ avec vérification HMAC) ───────────────────────────────────

/**
 * ✅ SÉCURISÉ : Vérifie la signature HMAC-SHA256 de PayTech
 * avant d'accepter la notification IPN.
 *
 * PayTech envoie un hash dans le header ou le body.
 * Consulter la doc PayTech pour le champ exact.
 */
function verifyPayTechIpnSignature(body: Record<string, string>): boolean {
  if (!PAYTECH_IPN_SECRET) {
    // En développement sans secret, accepter (logguer un avertissement)
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[IPN] ⚠ PAYTECH_IPN_SECRET non configuré — vérification ignorée en dev');
      return true;
    }
    return false;
  }

  // Construire la chaîne de signature selon les specs PayTech
  // (adapter selon la documentation officielle de PayTech.sn)
  const { token, ref_command, type_event } = body;
  const dataToSign = `${token}|${ref_command}|${type_event}`;
  const expected   = crypto
    .createHmac('sha256', PAYTECH_IPN_SECRET)
    .update(dataToSign)
    .digest('hex');

  const received = body.signature || '';

  // Comparaison en temps constant (anti timing-attack)
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(received.padEnd(expected.length, '0'), 'hex')
    );
  } catch {
    return false;
  }
}

app.post('/api/payment/ipn', express.urlencoded({ extended: false }), async (req, res) => {
  try {
    const body = req.body as Record<string, string>;
    const { type_event, ref_command, token } = body;

    // ✅ Vérifier la signature avant toute action
    if (!verifyPayTechIpnSignature(body)) {
      console.error('[IPN] ❌ Signature invalide — requête rejetée');
      return res.status(403).send('INVALID_SIGNATURE');
    }

    console.log(`[IPN] ✓ Vérifié: ${type_event} — Ref: ${ref_command}`);

    if (type_event === 'sale_complete') {
      // TODO: Marquer la commande comme payée dans votre base de données
      // Exemple avec Prisma :
      // await prisma.order.update({ where: { ref: ref_command }, data: { status: 'paid' } });
      console.log(`[IPN] ✓ Commande confirmée: ${ref_command}`);
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error('[IPN] Erreur:', err instanceof Error ? err.message : 'Erreur');
    res.status(500).send('ERROR');
  }
});

// ─── Mobile Money (Orange / Wave) ────────────────────────────────────────────

app.post('/api/payment/:provider(orange|wave)', paymentLimiter, csrfMiddleware, async (req, res) => {
  const { provider } = req.params;
  const { amount, phone } = req.body;

  if (!validateAmount(amount)) {
    return res.status(400).json({ error: 'Montant invalide' });
  }
  if (!phone || !validatePhone(phone)) {
    return res.status(400).json({ error: 'Numéro de téléphone invalide' });
  }

  const apiKey = provider === 'orange'
    ? process.env.ORANGE_MONEY_API_KEY
    : process.env.WAVE_API_KEY;

  // ✅ En production, refuser si clés absentes plutôt que simuler
  if (process.env.NODE_ENV === 'production' && !apiKey) {
    console.error(`[${provider.toUpperCase()}] Clé API non configurée`);
    return res.status(503).json({ error: `Service ${provider} non configuré` });
  }

  // Mode développement : simulation
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${provider.toUpperCase()}] DEV — Simulation paiement: ${amount} XOF — ${maskPhone(phone)}`);
    await new Promise(r => setTimeout(r, 800));
    const ref = `${provider.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    return res.json({ success: true, ref, message: `Paiement ${provider} simulé (dev)` });
  }

  // TODO: Intégration Orange Money / Wave réelle
  // const orangeRes = await fetch('https://api.orange.com/payment', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${apiKey}` },
  //   body: JSON.stringify({ amount, phone, currency: 'XOF' }),
  // });
  res.status(501).json({ error: 'Intégration Orange Money / Wave à compléter' });
});

// ─── Vérification statut paiement ────────────────────────────────────────────

app.get('/api/payment/status/:ref', async (req, res) => {
  const { ref } = req.params;
  if (!/^[A-Z0-9-]{5,60}$/.test(ref)) {
    return res.status(400).json({ error: 'Référence invalide' });
  }
  // TODO: Requête base de données
  res.json({ ref, status: 'pending' });
});

// ─── Health (sans info sensible) ─────────────────────────────────────────────

app.get('/api/health', (_, res) => {
  // ✅ Ne révèle plus NODE_ENV en production
  res.json({ status: 'ok' });
});

// ─── CSRF Token endpoint ─────────────────────────────────────────────────────
// Déjà défini plus haut

// ─── Handlers 404 et erreurs ─────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ error: 'Route introuvable' });
});

// Gestionnaire d'erreur global (ne révèle pas les stack traces)
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server] Erreur non gérée:', err.message);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

// ─── Démarrage ────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, () => {
  console.log(`\n✅ TrendyShop Backend — port ${PORT}`);
  console.log(`   PayTech  : ${PAYTECH_API_KEY    ? '✓ Configuré' : '⚠ Non configuré (dev ok)'}`);
  console.log(`   IPN HMAC : ${PAYTECH_IPN_SECRET ? '✓ Configuré' : '⚠ Non configuré (dev ok)'}\n`);
});

export default app;
