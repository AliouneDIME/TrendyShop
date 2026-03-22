// PayTech.sn Payment Integration
// Documentation: https://paytech.sn/documentation

export interface PayTechConfig {
  apiKey: string;
  apiSecret: string;
  env: 'test' | 'prod';
}

export interface PayTechPaymentData {
  item_name: string;
  item_price: number;
  currency: 'XOF' | 'EUR';
  ref_command: string;
  command_name: string;
  success_url: string;
  cancel_url: string;
  ipn_url: string;
  env: 'test' | 'prod';
  custom_field?: Record<string, unknown>;
  buyer_name?: string;
  buyer_phone?: string;
  buyer_email?: string;
}

export interface PayTechResponse {
  success: 1 | 0;
  token?: string;
  redirect_url?: string;
  errors?: string[];
}

const PAYTECH_BASE_URL = 'https://paytech.sn/api/payment/request-payment';
const PAYTECH_VERIFY_URL = 'https://paytech.sn/api/payment/details';

export async function initiatePayTechPayment(
  data: PayTechPaymentData,
  apiKey: string,
  apiSecret: string
): Promise<PayTechResponse> {
  try {
    const response = await fetch('/api/payment/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken(),
      },
      credentials: 'same-origin',
      body: JSON.stringify({ data, apiKey, apiSecret }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur de paiement');
    }

    return response.json();
  } catch (error) {
    console.error('PayTech payment error:', error);
    throw error;
  }
}

export async function verifyPayTechPayment(token: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/payment/verify/${token}`, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

function getCsrfToken(): string {
  // In production, this would come from a meta tag or cookie
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

// Generate unique reference for each payment
export function generatePaymentRef(prefix = 'TS'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// Validate phone for mobile money
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '');
  // Senegalese phone numbers: 7x xxx xx xx
  return /^(221)?(7[0-9]{8})$/.test(cleaned);
}

// Format amount for PayTech (must be integer in XOF)
export function formatAmountXOF(amountEUR: number): number {
  // Approximate EUR to XOF conversion (1 EUR ≈ 655.957 XOF)
  return Math.round(amountEUR * 655.957);
}
