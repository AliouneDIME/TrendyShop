import React from 'react';
import { Check } from 'lucide-react';

interface PaymentMethodProps {
  id: string;
  name: string;
  selected: boolean;
  onSelect: () => void;
}

export default function PaymentMethod({ id, name, selected, onSelect }: PaymentMethodProps) {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between ${
        selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
        }`}>
          {selected && <Check className="h-3 w-3 text-white" />}
        </div>
        <span className="font-medium">{name}</span>
      </div>
    </div>
  );
}