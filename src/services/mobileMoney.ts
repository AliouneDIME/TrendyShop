interface PaymentData {
  amount: number;
  phone: string;
  provider: 'orange' | 'wave';
}

export async function processMobilePayment({ amount, phone, provider }: PaymentData) {
  // Simulation d'une requête API vers Orange Money ou Wave
  const response = await fetch(`/api/${provider}/payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, phone }),
  });

  if (!response.ok) {
    throw new Error(`Erreur de paiement ${provider}`);
  }

  return response.json();
}