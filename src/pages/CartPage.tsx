import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ArrowLeft, Shield, Truck, Tag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const toCFA = (eur: number) =>
  new Intl.NumberFormat('fr-SN', { maximumFractionDigits: 0 }).format(Math.round(eur * 655.957)) + ' FCFA';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center" style={{ background: 'var(--bg-page)' }}>
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: '#EEF2FF' }}>
            <ShoppingBag size={32} style={{ color: 'var(--primary)' }} />
          </div>
          <h1 className="font-heading font-700 text-3xl mb-2" style={{ color: 'var(--text-900)' }}>Panier vide</h1>
          <p className="mb-7 text-sm" style={{ color: 'var(--text-400)' }}>Découvrez notre sélection de produits premium</p>
          <Link to="/shop" className="btn-primary">Explorer la boutique <ArrowRight size={15} /></Link>
        </div>
      </main>
    );
  }

  const shipping   = state.total >= 50 ? 0 : 5.99;
  const grandTotal = state.total + shipping;

  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-700 text-3xl" style={{ color: 'var(--text-900)' }}>Mon Panier</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-400)' }}>
              {state.itemCount} article{state.itemCount > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Link to="/shop" className="btn-ghost hidden md:flex">
              <ArrowLeft size={14} /> Continuer
            </Link>
            <button onClick={clearCart}
              className="text-xs px-3 py-2 rounded-lg border transition-colors"
              style={{ color: 'var(--text-400)', borderColor: 'var(--border)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--danger)'; (e.currentTarget as HTMLElement).style.borderColor = '#FECACA'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-400)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}>
              Vider le panier
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {state.items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl border bg-white"
                style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-xs)' }}>
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ background: 'var(--bg-soft)' }}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--primary)' }}>{item.category}</p>
                      <h3 className="font-heading font-600 text-sm" style={{ color: 'var(--text-900)' }}>{item.name}</h3>
                    </div>
                    <button onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg transition-colors flex-shrink-0"
                      style={{ color: 'var(--text-300)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--danger)'; (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-300)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center gap-1 rounded-xl border p-1"
                      style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white"
                        style={{ color: 'var(--text-500)' }}>
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-700" style={{ color: 'var(--text-900)' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white"
                        style={{ color: 'var(--text-500)' }}>
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-heading font-700 text-base" style={{ color: 'var(--text-900)' }}>
                        {toCFA(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs" style={{ color: 'var(--text-400)' }}>
                          {toCFA(item.price)} / unité
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border sticky top-24"
              style={{ background: 'var(--bg-white)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="font-heading font-700 text-lg" style={{ color: 'var(--text-900)' }}>Récapitulatif</h2>
              </div>

              <div className="p-5">
                <div className="flex flex-col gap-3 mb-4">
                  {state.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate mr-2" style={{ color: 'var(--text-500)' }}>
                        {item.name} ×{item.quantity}
                      </span>
                      <span className="flex-shrink-0 font-medium" style={{ color: 'var(--text-700)' }}>
                        {toCFA(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="divider my-4" />

                <div className="flex flex-col gap-2.5 mb-5">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-500)' }}>Sous-total</span>
                    <span className="font-medium" style={{ color: 'var(--text-700)' }}>{toCFA(state.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-500)' }}>Livraison</span>
                    <span className="font-medium" style={{ color: shipping === 0 ? 'var(--success)' : 'var(--text-700)' }}>
                      {shipping === 0 ? '✓ Gratuite' : toCFA(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="flex items-start gap-2 text-xs p-2.5 rounded-xl"
                      style={{ background: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E' }}>
                      <Tag size={12} style={{ flexShrink: 0, marginTop: 1 }} />
                      Encore {toCFA(50 - state.total)} pour la livraison gratuite
                    </div>
                  )}
                </div>

                <div className="divider mb-4" />

                <div className="flex justify-between items-center mb-5">
                  <span className="font-heading font-700" style={{ color: 'var(--text-900)' }}>Total TTC</span>
                  <span className="font-heading font-700 text-xl" style={{ color: 'var(--primary)' }}>
                    {toCFA(grandTotal)}
                  </span>
                </div>

                <Link to="/checkout" className="btn-primary w-full mb-3">
                  Commander <ArrowRight size={15} />
                </Link>

                <div className="flex flex-col gap-1.5 text-xs">
                  {[
                    { icon: Shield, text: 'Paiement sécurisé · PayTech.sn' },
                    { icon: Truck,  text: 'Livraison express 24-48h' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5" style={{ color: 'var(--text-400)' }}>
                      <Icon size={11} style={{ color: 'var(--success)' }} /> {text}
                    </div>
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
