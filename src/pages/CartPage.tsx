import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ArrowLeft, Shield, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <main className="min-h-screen pt-32 flex items-center justify-center" style={{ background: 'var(--obsidian)' }}>
        <div className="text-center px-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(201,168,92,0.08)', border: '1px solid rgba(201,168,92,0.2)' }}>
            <ShoppingBag size={36} style={{ color: 'var(--gold)' }} />
          </div>
          <h1 className="font-display text-4xl mb-3" style={{ color: 'var(--ivory)' }}>Panier vide</h1>
          <p className="mb-8 text-base" style={{ color: 'var(--ash)' }}>Découvrez notre sélection de produits premium</p>
          <Link to="/shop" className="btn-primary">
            Explorer la boutique <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const shipping = state.total >= 50 ? 0 : 5.99;
  const grandTotal = state.total + shipping;

  return (
    <main className="min-h-screen pt-24" style={{ background: 'var(--obsidian)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl" style={{ color: 'var(--ivory)' }}>
              Mon Panier
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--ash)' }}>
              {state.itemCount} article{state.itemCount > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/shop" className="btn-ghost hidden md:flex">
              <ArrowLeft size={16} /> Continuer
            </Link>
            <button
              onClick={clearCart}
              className="text-xs px-3 py-2 rounded-lg transition-colors"
              style={{ color: 'var(--ash)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fb7185'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--ash)'}
            >
              Vider le panier
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {state.items.map(item => (
              <div
                key={item.id}
                className="flex gap-4 p-5 rounded-2xl"
                style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono mb-1" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>{item.category}</p>
                      <h3 className="font-body font-semibold text-sm" style={{ color: 'var(--ivory)' }}>{item.name}</h3>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg flex-shrink-0 transition-all" style={{ color: 'var(--ash)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fb7185'; (e.currentTarget as HTMLElement).style.background = 'rgba(244,63,94,0.1)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--ash)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                        style={{ color: 'var(--silver)' }}>
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-sm" style={{ color: 'var(--ivory)' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                        style={{ color: 'var(--silver)' }}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-lg" style={{ color: 'var(--gold)' }}>
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-xs" style={{ color: 'var(--ash)' }}>{item.price.toFixed(2)} € / unité</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl p-6 sticky top-28" style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-display text-xl mb-6" style={{ color: 'var(--ivory)' }}>Récapitulatif</h2>

              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--silver)' }}>Sous-total</span>
                  <span className="font-mono" style={{ color: 'var(--ivory)' }}>{state.total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--silver)' }}>Livraison</span>
                  <span className="font-mono" style={{ color: shipping === 0 ? '#34d399' : 'var(--ivory)' }}>
                    {shipping === 0 ? 'Gratuite ✓' : `${shipping.toFixed(2)} €`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs px-3 py-2 rounded-lg" style={{ background: 'rgba(201,168,92,0.06)', color: 'var(--gold)', border: '1px solid rgba(201,168,92,0.12)' }}>
                    ✦ Plus que {(50 - state.total).toFixed(2)} € pour la livraison gratuite
                  </p>
                )}
              </div>

              <div className="h-px my-4" style={{ background: 'rgba(255,255,255,0.06)' }} />

              <div className="flex justify-between mb-6">
                <span className="font-body font-semibold" style={{ color: 'var(--ivory)' }}>Total TTC</span>
                <span className="font-mono font-bold text-xl" style={{ color: 'var(--gold)' }}>{grandTotal.toFixed(2)} €</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full justify-center mb-3">
                Passer la commande <ArrowRight size={16} />
              </Link>

              {/* Trust */}
              <div className="flex flex-col gap-2 mt-4">
                {[
                  { icon: Shield, text: 'Paiement 100% sécurisé' },
                  { icon: Truck, text: 'Livraison express 24-48h' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs" style={{ color: 'var(--ash)' }}>
                    <Icon size={13} style={{ color: 'var(--gold)' }} />
                    {text}
                  </div>
                ))}
              </div>

              {/* Payment logos */}
              <div className="mt-5 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <p className="text-xs mb-2 font-mono text-center" style={{ color: 'var(--mist)', letterSpacing: '0.1em' }}>MOYENS DE PAIEMENT</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['PayTech', 'Orange Money', 'Wave'].map(m => (
                    <span key={m} className="text-xs px-2 py-1 rounded font-mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--ash)' }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
