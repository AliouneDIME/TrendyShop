import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function processCardPayment(amount: number) {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe not initialized');

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: 'price_id', quantity: 1 }],
    mode: 'payment',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  });

  if (error) throw error;
}