import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col animate-slide-up"
        style={{
          background: 'var(--carbon)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          animation: 'slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} style={{ color: 'var(--gold)' }} />
            <span className="font-display text-xl" style={{ color: 'var(--ivory)' }}>
              Panier
            </span>
            {state.itemCount > 0 && (
              <span
                className="badge badge-gold"
              >
                {state.itemCount} article{state.itemCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors"
            style={{ color: 'var(--ash)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(201,168,92,0.08)', border: '1px solid rgba(201,168,92,0.2)' }}
              >
                <ShoppingBag size={32} style={{ color: 'var(--gold)' }} />
              </div>
              <div>
                <p className="font-display text-2xl mb-2" style={{ color: 'var(--ivory)' }}>
                  Panier vide
                </p>
                <p className="text-sm" style={{ color: 'var(--ash)' }}>
                  Découvrez notre sélection de produits tendance
                </p>
              </div>
              <button onClick={closeCart} className="btn-outline">
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm truncate" style={{ color: 'var(--ivory)' }}>
                      {item.name}
                    </p>
                    <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--ash)' }}>
                      {item.category}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div
                        className="flex items-center gap-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.05)', padding: '4px' }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center transition-all hover:bg-white/10"
                          style={{ color: 'var(--silver)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-mono font-bold" style={{ color: 'var(--ivory)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center transition-all hover:bg-white/10"
                          style={{ color: 'var(--silver)' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm" style={{ color: 'var(--gold)' }}>
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg transition-all hover:bg-rose-500/10"
                          style={{ color: 'var(--ash)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div
            className="px-6 py-6 flex flex-col gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="font-body text-sm" style={{ color: 'var(--silver)' }}>Sous-total</span>
              <span className="font-mono font-bold text-lg" style={{ color: 'var(--ivory)' }}>
                {state.total.toFixed(2)} €
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-xs" style={{ color: 'var(--ash)' }}>livraison calculée au checkout</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* CTA */}
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center"
            >
              Commander maintenant
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/cart"
              onClick={closeCart}
              className="text-center text-sm transition-colors"
              style={{ color: 'var(--ash)' }}
            >
              Voir le panier complet
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
