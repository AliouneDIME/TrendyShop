/**
 * PayTech.sn — Service frontend SÉCURISÉ
 *
 * ⚠️  RÈGLE D'OR : Les clés API PayTech (API_KEY, API_SECRET)
 *     NE SONT JAMAIS dans ce fichier.
 *     Elles vivent UNIQUEMENT dans server/index.ts via process.env.
 *
 * Ce fichier ne fait QUE :
 *   1. Appeler /api/payment/paytech (notre backend proxy)
 *   2. Fournir des helpers utilitaires (ref, validation)
 */

export interface PayTechInitRequest {
  ref: string;
  amount: number;        // En XOF (entier)
  item_name: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_phone?: string;
  items?: Array<{ name: string; qty: number; price: number }>;
}

export interface PayTechInitResponse {
  success: boolean;
  redirect_url?: string;   // Toujours https://paytech.sn/...
  token?: string;
  errors?: string[];
}

/**
 * Initie un paiement PayTech via notre backend sécurisé.
 * ✓ Ne passe AUCUNE clé API — elles sont sur le serveur.
 * ✓ Valide que l'URL retournée provient bien de paytech.sn.
 */
export async function initiatePayment(
  data: PayTechInitRequest
): Promise<PayTechInitResponse> {
  const response = await fetch('/api/payment/paytech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(data),   // ← PAS de clés ici
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Erreur de paiement');
  }

  const result: PayTechInitResponse = await response.json();

  // Validation côté client : s'assurer que l'URL vient de paytech.sn
  if (result.redirect_url && !isPayTechUrl(result.redirect_url)) {
    console.error('[PayTech] URL suspecte reçue:', result.redirect_url);
    throw new Error('URL de paiement invalide');
  }

  return result;
}

/**
 * Valide que l'URL provient bien de paytech.sn (anti-redirect injection).
 */
export function isPayTechUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'paytech.sn' && parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Génère une référence de commande unique. */
export function generatePaymentRef(prefix = 'TS'): string {
  const ts     = Date.now().toString(36).toUpperCase();
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().slice(0, 4);
  return `${prefix}-${ts}-${random}`;
}

/** Convertit EUR → XOF (taux fixe BCEAO). */
export function eurToXof(eur: number): number {
  return Math.round(eur * 655.957);
}

/** Valide un numéro sénégalais (ex: 77 123 45 67). */
export function validateSenPhone(phone: string): boolean {
  return /^(\+221|221)?(7[0-9]{8})$/.test(phone.replace(/\s/g, ''));
}
