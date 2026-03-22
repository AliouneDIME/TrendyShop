# 🛍️ TrendyShop – Boutique E-commerce Premium

Design de dernière génération · PayTech.sn · Orange Money · Wave · React + TypeScript + Node.js

---

## ✨ Fonctionnalités

### Frontend
- ⚡ Design dark luxury avec palette or (gold) et obsidian
- 🎨 Typographie Cormorant Garamond + DM Sans
- 🖱️ Curseur personnalisé doré (desktop)
- 📦 16+ produits dans 4 catégories (Tech, Mode, Maison, Sport)
- 🛒 Panier persistant (localStorage) avec tiroir animé
- 🔔 Notifications toast élégantes
- 🔍 Recherche + filtres avancés (prix, note, badge, tri)
- 📊 Grille bento catégories
- ⭐ Témoignages clients avec carrousel
- 📱 100% responsive mobile-first
- 🎭 Animations particules canvas sur Hero
- ✅ SEO complet (meta, OG, JSON-LD, canonical)

### Tunnel de paiement
- 💳 **PayTech.sn** – intégration sécurisée côté backend
- 📱 **Orange Money** – paiement mobile
- 💧 **Wave** – portefeuille digital
- 🔒 Formulaire de livraison avec validation
- 🌍 Conversion automatique EUR → FCFA
- ✅ Pages success/cancel avec confetti

### Backend (Node.js/Express)
- 🛡️ Helmet (CSP, HSTS, XSS protection)
- 🚦 Rate limiting (100 req/15min, 5 paiements/min)
- 🔐 CSRF protection
- ✅ Validation et sanitisation de tous les inputs
- 📬 IPN endpoint pour confirmations PayTech
- 🔒 Clés API jamais exposées côté client

---

## 🚀 Installation

### 1. Cloner & installer

```bash
git clone https://github.com/votre-repo/trendyshop
cd trendyshop
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
# Remplir vos clés API dans .env
```

Variables obligatoires :
```env
PAYTECH_API_KEY=votre_cle_paytech
PAYTECH_API_SECRET=votre_secret_paytech
FRONTEND_URL=http://localhost:5173
```

### 3. Lancer en développement

```bash
# Frontend + Backend ensemble
npm run dev:full

# Ou séparément :
npm run dev          # Frontend sur :5173
npm run dev:server   # Backend sur :3001
```

### 4. Build production

```bash
npm run build
npm start
```

---

## 🔑 Configuration PayTech.sn

1. Créez un compte sur [paytech.sn](https://paytech.sn)
2. Accédez à votre dashboard → Paramètres → API
3. Copiez votre `API_KEY` et `API_SECRET`
4. Ajoutez-les dans votre fichier `.env`
5. Configurez vos URLs de retour dans le dashboard PayTech :
   - Success URL : `https://votre-domaine.sn/success`
   - Cancel URL : `https://votre-domaine.sn/cancel`  
   - IPN URL : `https://votre-backend.sn/api/payment/ipn`

En mode test, utilisez `env: 'test'` dans la config.

---

## 📂 Structure du projet

```
trendyshop/
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, CartDrawer
│   │   ├── sections/       # Hero, Featured, Categories, Trust…
│   │   ├── ui/             # Toast, CustomCursor
│   │   └── ProductCard.tsx
│   ├── contexts/           # CartContext, ToastContext
│   ├── data/               # products.ts
│   ├── pages/              # Home, Shop, Cart, Checkout, Success…
│   ├── services/           # paytech.ts
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Design system complet
├── server/
│   └── index.ts            # Backend Express sécurisé
├── index.html              # SEO optimisé
├── vite.config.ts
├── tailwind.config.js
└── .env.example
```

---

## 🔒 Sécurité

- ✅ Clés API PayTech côté serveur uniquement
- ✅ Helmet CSP headers
- ✅ Rate limiting sur tous les endpoints
- ✅ Validation & sanitisation des inputs
- ✅ HTTPS en production
- ✅ RGPD : aucune donnée bancaire stockée
- ✅ IPN PayTech pour confirmation serveur-à-serveur

---

## 📈 SEO & Performance

- Meta tags complets (title, description, keywords)
- Open Graph + Twitter Cards
- JSON-LD structured data (OnlineStore)
- Images lazy loading
- Code splitting (React + icons séparés)
- DNS prefetch pour PayTech et Unsplash
- Google Analytics placeholder

---

## 🎨 Design System

Couleurs principales :
- `--obsidian`: #0a0a0f (fond principal)
- `--gold`: #c9a85c (accent or)
- `--ivory`: #f0f0f8 (texte principal)

Typographies :
- Display : Cormorant Garamond
- Body : DM Sans
- Mono : Space Mono
