import React from 'react';
import { processCardPayment } from '../../services/stripe';

interface CardPaymentProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function CardPayment({ amount, onSuccess, onError }: CardPaymentProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await processCardPayment(amount);
      onSuccess();
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Numéro de carte</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2"
          placeholder="4242 4242 4242 4242"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date d'expiration</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVC</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            placeholder="123"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Payer {amount.toFixed(2)} €
      </button>
    </form>
  );
}