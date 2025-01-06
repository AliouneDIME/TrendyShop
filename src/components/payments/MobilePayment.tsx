import React, { useState } from 'react';
import { processMobilePayment } from '../../services/mobileMoney';

interface MobilePaymentProps {
  amount: number;
  provider: 'orange' | 'wave';
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function MobilePayment({ amount, provider, onSuccess, onError }: MobilePaymentProps) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await processMobilePayment({ amount, phone, provider });
      onSuccess();
    } catch (error) {
      onError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Numéro de téléphone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg p-2"
          placeholder="77 123 45 67"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Traitement...' : `Payer avec ${provider === 'orange' ? 'Orange Money' : 'Wave'}`}
      </button>
    </form>
  );
}