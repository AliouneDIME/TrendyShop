import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Cart({ onClose }: { onClose: () => void }) {
  const { state, removeItem, updateQuantity } = useCart();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Panier</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          {state.items.length === 0 ? (
            <p className="text-center text-gray-500">Votre panier est vide</p>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.price.toFixed(2)} €</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 border rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 border rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-bold">{state.total.toFixed(2)} €</span>
          </div>
          <button
            onClick={() => window.location.href = '/checkout'}
            disabled={state.items.length === 0}
            className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-400"
          >
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  );
}