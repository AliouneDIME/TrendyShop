# 🔐 RAPPORT D'AUDIT DE SÉCURITÉ — TrendyShop

Date : 2024 | Auditeur : Claude Sonnet 4.6

---

## RÉSUMÉ EXÉCUTIF

| Criticité | Nombre | Status |
|-----------|--------|--------|
| 🔴 CRITIQUE  | 3 | À corriger immédiatement |
| 🟠 HAUTE     | 4 | À corriger avant production |
| 🟡 MOYENNE   | 3 | À corriger avant déploiement |
| 🟢 FAIBLE    | 2 | Bonnes pratiques recommandées |

---

## 🔴 VULNÉRABILITÉS CRITIQUES

### CRITIQUE #1 — Clés API dans le corps de requête frontend
**Fichier :** `src/services/paytech.ts` ligne 49

```typescript
// ❌ DANGEREUX : apiKey et apiSecret passés en paramètres
// Si un appelant frontend les passe, ils traversent le réseau en clair
body: JSON.stringify({ data, apiKey, apiSecret })
```

**Risque :** Si cette fonction était appelée avec de vraies clés depuis le frontend,
elles seraient visibles dans les DevTools → onglet Network de n'importe quel utilisateur.

**Status :** La fonction n'est PAS appelée depuis Checkout.tsx avec des vraies clés.
Le Checkout appelle `/api/payment/paytech` sans passer de clés.
MAIS la signature de la fonction EST dangereuse et pourrait être mal utilisée.

**Fix :** Supprimer les paramètres apiKey/apiSecret de la fonction frontend.

---

### CRITIQUE #2 — CSRF middleware commenté / désactivé
**Fichier :** `server/index.ts` lignes 75-82

```typescript
// ❌ CSRF DÉSACTIVÉ — code commenté !
function csrfMiddleware(...) {
  // const token = req.headers['x-csrf-token'] as string;
  // if (!token || !validateCsrfToken(token)) {
  //   return res.status(403).json({ error: 'Token CSRF invalide' });
  // }
  next(); // ← passe toujours, sans vérification
}
```

**Risque :** Un attaquant peut forger une requête POST `/api/payment/paytech` depuis
n'importe quel site web malveillant. Le serveur l'acceptera sans résistance.

**Fix :** Activer le CSRF. Code écrit, il suffit de décommenter.

---

### CRITIQUE #3 — IPN endpoint non authentifié
**Fichier :** `server/index.ts` ligne 220

```typescript
// ❌ TOUT le monde peut appeler cet endpoint et confirmer n'importe quelle commande !
app.post('/api/payment/ipn', async (req, res) => {
  if (type_event === 'sale_complete') {
    // Mark order as paid ← sans vérifier que c'est PayTech qui appelle
  }
});
```

**Risque :** Un attaquant peut envoyer un POST à `/api/payment/ipn` avec
`type_event: "sale_complete"` et marquer une commande comme payée sans payer.

**Fix :** Vérifier la signature HMAC de PayTech ou appeler l'API de vérification
de PayTech avant de confirmer le paiement.

---

## 🟠 VULNÉRABILITÉS HAUTES

### HAUTE #1 — Endpoint /api/health expose l'environnement
```typescript
// ❌ Révèle si on est en test ou prod (aide les attaquants)
res.json({ status: 'ok', env: process.env.NODE_ENV })
```
**Fix :** En production, répondre uniquement `{ status: 'ok' }`.

---

### HAUTE #2 — redirect_url de PayTech non validée avant iframe
```typescript
// ❌ Pas de validation que l'URL vient bien de paytech.sn
setPaytechUrl(data?.redirect_url);
<iframe src={url} />
```
**Risque :** Si l'API backend est compromise, une URL malveillante pourrait
être injectée dans l'iframe (phishing embarqué).
**Fix :** Valider que redirect_url commence par `https://paytech.sn/`.

---

### HAUTE #3 — CORS trop permissif en développement
```typescript
origin: process.env.FRONTEND_URL || 'http://localhost:5173'
```
Si `FRONTEND_URL` n'est pas défini en prod → accepte localhost en production !
**Fix :** Pas de valeur par défaut en production. Lever une erreur si non configuré.

---

### HAUTE #4 — Endpoint mobile payment utilise Math.random() en simulation
```typescript
// ❌ Simule aléatoirement un succès/échec en "dev"
// Risque : oublier de remplacer par le vrai code en prod
const success = Math.random() > 0.05;
```
**Fix :** Lever une erreur explicite si les vraies clés API ne sont pas configurées.

---

## 🟡 VULNÉRABILITÉS MOYENNES

### MOYENNE #1 — CSP contient 'unsafe-inline'
```typescript
scriptSrc: ["'self'", "'unsafe-inline'", ...],
styleSrc:  ["'self'", "'unsafe-inline'", ...]
```
**Risque :** Réduit la protection contre les injections XSS.
**Fix :** Utiliser des nonces CSP à la place de 'unsafe-inline'.

---

### MOYENNE #2 — console.error peut logger des données sensibles
```typescript
console.error('PayTech payment error:', error)
```
En production, les logs peuvent exposer des tokens, emails, montants dans des
systèmes de logging tiers (Datadog, Sentry...).
**Fix :** Masquer les données PII dans les logs de production.

---

### MOYENNE #3 — Pas de validation du token PayTech côté IPN
L'IPN reçoit un `token` mais ne le vérifie pas via l'API PayTech.
**Fix :** Appeler `GET https://paytech.sn/api/payment/details/{token}` pour
confirmer indépendamment avant de valider la commande.

---

## 🟢 FAIBLES / BONNES PRATIQUES

### FAIBLE #1 — localStorage pour le panier (risque XSS indirect)
Le panier est en localStorage. Si une XSS survenait, les articles seraient
lisibles. Pas de données bancaires stockées → risque faible.
**Fix :** Acceptable, mais ajouter une expiration du panier (ex: 7 jours).

### FAIBLE #2 — Pas de sous-ressource integrity (SRI) pour les fonts Google
Les fonts Google sont chargées sans `integrity=""`.
**Fix :** Héberger les fonts localement ou utiliser l'attribut `integrity`.

---

## ✅ CE QUI EST CORRECT

- ✓ Clés PayTech UNIQUEMENT dans le serveur (`process.env`)
- ✓ Aucune variable `VITE_PAYTECH_*` dans le frontend (jamais exposées au browser)
- ✓ Helmet activé avec HSTS, X-Frame-Options, etc.
- ✓ Rate limiting sur tous les endpoints (100/15min, 5 paiements/min)
- ✓ Validation et sanitisation des inputs (email, phone, amount, strings)
- ✓ Pas de `dangerouslySetInnerHTML` dans le frontend
- ✓ Body size limité à 10kb
- ✓ CORS restrictif (liste blanche par domaine)
- ✓ Inputs non-contrôlés (pas de faille cursor/state React)
- ✓ Pas de secrets dans le code source

