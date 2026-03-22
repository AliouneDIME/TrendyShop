import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import https from 'https';

const app = express();

// ─── Security Middleware ─────────────────────────────────────────────────────

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
      connectSrc: ["'self'", 'https://paytech.sn'],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: 'Trop de requêtes, réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5, // max 5 payment attempts per minute
  message: { error: 'Trop de tentatives de paiement. Veuillez patienter.' },
});

app.use(limiter);

// ─── CSRF Protection ─────────────────────────────────────────────────────────

const csrfTokens = new Map<string, number>();

function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function validateCsrfToken(token: string): boolean {
  const expiry = csrfTokens.get(token);
  if (!expiry || Date.now() > expiry) return false;
  csrfTokens.delete(token); // One-time use
  return true;
}

app.get('/api/csrf-token', (req, res) => {
  const token = generateCsrfToken();
  csrfTokens.set(token, Date.now() + 60 * 60 * 1000); // 1h expiry
  res.json({ token });
});

// CSRF middleware for payment routes
function csrfMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  // In production: validate CSRF token from header
  // const token = req.headers['x-csrf-token'] as string;
  // if (!token || !validateCsrfToken(token)) {
  //   return res.status(403).json({ error: 'Token CSRF invalide' });
  // }
  next();
}

// ─── Input Validation ────────────────────────────────────────────────────────

function sanitizeString(str: unknown, maxLen = 200): string {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim().slice(0, maxLen);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function validatePhone(phone: string): boolean {
  return /^(\+221|221)?[0-9]{9}$/.test(phone.replace(/\s/g, ''));
}

function validateAmount(amount: unknown): boolean {
  return typeof amount === 'number' && amount > 0 && amount <= 10_000_000 && Number.isInteger(amount);
}

// ─── PayTech Integration ─────────────────────────────────────────────────────

const PAYTECH_API_KEY = process.env.PAYTECH_API_KEY || '';
const PAYTECH_API_SECRET = process.env.PAYTECH_API_SECRET || '';
const PAYTECH_URL = 'https://paytech.sn/api/payment/request-payment';

interface PayTechPayload {
  item_name: string;
  item_price: number;
  currency: string;
  ref_command: string;
  command_name: string;
  env: 'test' | 'prod';
  success_url: string;
  cancel_url: string;
  ipn_url: string;
  custom_field?: string;
}

async function callPayTech(payload: PayTechPayload): Promise<{ success: number; token?: string; redirect_url?: string; errors?: string[] }> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);

    const options = {
      hostname: 'paytech.sn',
      path: '/api/payment/request-payment',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        API_KEY: PAYTECH_API_KEY,
        API_SECRET: PAYTECH_API_SECRET,
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
    const {
      ref, amount, item_name,
      buyer_name, buyer_email, buyer_phone, items,
    } = req.body;

    // Validate
    if (!validateAmount(amount)) {
      return res.status(400).json({ error: 'Montant invalide' });
    }
    if (buyer_email && !validateEmail(buyer_email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }
    if (buyer_phone && !validatePhone(buyer_phone)) {
      return res.status(400).json({ error: 'Numéro de téléphone invalide' });
    }

    const sanitizedRef = sanitizeString(ref, 50) || `TS-${Date.now()}`;
    const sanitizedName = sanitizeString(item_name, 150) || 'Commande TrendyShop';

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const payload: PayTechPayload = {
      item_name: sanitizedName,
      item_price: amount,
      currency: 'XOF',
      ref_command: sanitizedRef,
      command_name: `TrendyShop – ${sanitizedRef}`,
      env: (process.env.NODE_ENV === 'production' ? 'prod' : 'test'),
      success_url: `${baseUrl}/success?ref=${encodeURIComponent(sanitizedRef)}`,
      cancel_url: `${baseUrl}/cancel`,
      ipn_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/payment/ipn`,
      custom_field: JSON.stringify({
        buyer_name: sanitizeString(buyer_name),
        buyer_email: sanitizeString(buyer_email),
        buyer_phone: sanitizeString(buyer_phone),
        items: Array.isArray(items) ? items.slice(0, 20).map(i => ({
          name: sanitizeString(i.name, 100),
          qty: Math.min(Math.max(1, parseInt(i.qty) || 1), 99),
          price: parseFloat(i.price) || 0,
        })) : [],
      }),
    };

    console.log(`[PayTech] Payment initiated: ${sanitizedRef} – ${amount} XOF`);

    const result = await callPayTech(payload);

    if (result.success === 1 && result.redirect_url) {
      res.json({ success: true, redirect_url: result.redirect_url, token: result.token });
    } else {
      console.error('[PayTech] Error:', result.errors);
      res.status(400).json({ success: false, errors: result.errors || ['Erreur PayTech inconnue'] });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur';
    console.error('[PayTech] Exception:', err);
    res.status(500).json({ error: message });
  }
});

// IPN (Instant Payment Notification) – PayTech calls this after payment
app.post('/api/payment/ipn', express.urlencoded({ extended: false }), async (req, res) => {
  try {
    const { type_event, ref_command, token } = req.body;

    // Verify token with PayTech (important: prevents spoofing)
    // In production: verify the payment details via PayTech verification API
    console.log(`[IPN] Event: ${type_event} – Ref: ${ref_command} – Token: ${token}`);

    if (type_event === 'sale_complete') {
      // TODO: Mark order as paid in your database
      // await db.orders.update({ ref: ref_command }, { status: 'paid', paidAt: new Date() });
      console.log(`[IPN] Payment confirmed for: ${ref_command}`);
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error('[IPN] Error:', err);
    res.status(500).send('ERROR');
  }
});

// Mobile Money endpoints (Orange Money / Wave)
app.post('/api/payment/:provider(orange|wave)', paymentLimiter, csrfMiddleware, async (req, res) => {
  const { provider } = req.params;
  const { amount, phone } = req.body;

  if (!validateAmount(amount)) {
    return res.status(400).json({ error: 'Montant invalide' });
  }
  if (!phone || !validatePhone(phone)) {
    return res.status(400).json({ error: 'Numéro de téléphone invalide' });
  }

  // In production: integrate with actual Orange Money / Wave APIs
  // This is a simulation for development
  console.log(`[${provider.toUpperCase()}] Payment: ${amount} XOF – Phone: ${phone}`);

  // Simulate processing delay
  await new Promise(r => setTimeout(r, 1500));

  // 95% success rate in test mode
  const success = Math.random() > 0.05;

  if (success) {
    const ref = `${provider.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    res.json({ success: true, ref, message: `Paiement ${provider} confirmé` });
  } else {
    res.status(400).json({ success: false, message: 'Solde insuffisant ou service indisponible' });
  }
});

// Payment status check
app.get('/api/payment/status/:ref', async (req, res) => {
  const { ref } = req.params;
  if (!/^[A-Z0-9-]+$/.test(ref) || ref.length > 60) {
    return res.status(400).json({ error: 'Référence invalide' });
  }
  // TODO: check in database
  res.json({ ref, status: 'pending', message: 'En cours de vérification' });
});

// ─── Health & Misc ────────────────────────────────────────────────────────────

app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

// 404 handler
app.use((_req, res) => res.status(404).json({ error: 'Route introuvable' }));

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server Error]', err);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

const PORT = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, () => {
  console.log(`\n✅ TrendyShop Backend running on port ${PORT}`);
  console.log(`   Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   PayTech: ${PAYTECH_API_KEY ? '✓ Configured' : '⚠ Missing API keys'}\n`);
});

export default app;
