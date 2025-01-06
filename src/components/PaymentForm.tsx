import React, { useState } from 'react';
import CardPayment from './payments/CardPayment';
import MobilePayment from './payments/MobilePayment';
import { useCart } from '../contexts/CartContext';

type PaymentMethod = 'card' | 'orange' | 'wave';

export default function PaymentForm() {
  const { state, clearCart } = useCart();
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [error, setError] = useState<string>('');

  const handleSuccess = () => {
    clearCart();
    window.location.href = '/success';
  };

  const handleError = (error: Error) => {
    setError(error.message);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Choisir le mode de paiement</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === 'card'}
              onChange={() => setMethod('card')}
            />
            Carte bancaire
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === 'orange'}
              onChange={() => setMethod('orange')}
            />
            Orange Money
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === 'wave'}
              onChange={() => setMethod('wave')}
            />
            Wave
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-4">
        {method === 'card' && (
          <CardPayment
            amount={state.total}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
        {(method === 'orange' || method === 'wave') && (
          <MobilePayment
            amount={state.total}
            provider={method}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
}