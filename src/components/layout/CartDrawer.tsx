import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const toCFA = (eur: number) =>
  new Intl.NumberFormat('fr-SN',{maximumFractionDigits:0}).format(Math.round(eur*655.957))+' FCFA';

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity } = useCart();
  if (!state.isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 animate-fade-in" style={{ background:'rgba(15,23,42,0.4)', backdropFilter:'blur(2px)' }} onClick={closeCart} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
        style={{ background:'var(--bg-white)', borderLeft:'1px solid var(--border)', boxShadow:'var(--shadow-xl)', animation:'slideInRight .32s cubic-bezier(.4,0,.2,1) both' }}>
        <style>{`@keyframes slideInRight{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor:'var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} style={{ color:'var(--primary)' }}/>
            <span className="font-heading font-700 text-lg" style={{ color:'var(--text-900)' }}>Panier</span>
            {state.itemCount>0 && <span className="badge badge-new">{state.itemCount} article{state.itemCount>1?'s':''}</span>}
          </div>
          <button onClick={closeCart} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors" style={{ color:'var(--text-400)' }}>
            <X size={17}/>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {state.items.length===0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:'#EEF2FF' }}>
                <ShoppingBag size={28} style={{ color:'var(--primary)' }}/>
              </div>
              <div>
                <p className="font-heading font-700 text-lg mb-1" style={{ color:'var(--text-900)' }}>Panier vide</p>
                <p className="text-sm" style={{ color:'var(--text-400)' }}>Découvrez nos produits premium</p>
              </div>
              <button onClick={closeCart} className="btn-outline">Continuer mes achats</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {state.items.map(item => (
                <div key={item.id} className="flex gap-3 p-3 rounded-xl border" style={{ borderColor:'var(--border)', background:'var(--bg-soft)' }}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ background:'var(--bg-muted)' }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium mb-0.5" style={{ color:'var(--primary)' }}>{item.category}</p>
                    <p className="text-sm font-600 truncate" style={{ color:'var(--text-800)' }}>{item.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 rounded-lg px-1" style={{ background:'var(--bg-white)', border:'1px solid var(--border)' }}>
                        <button onClick={()=>updateQuantity(item.id,item.quantity-1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-neutral-100 transition-colors" style={{ color:'var(--text-500)' }}>
                          <Minus size={11}/>
                        </button>
                        <span className="w-5 text-center text-sm font-700" style={{ color:'var(--text-900)' }}>{item.quantity}</span>
                        <button onClick={()=>updateQuantity(item.id,item.quantity+1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-neutral-100 transition-colors" style={{ color:'var(--text-500)' }}>
                          <Plus size={11}/>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-700" style={{ color:'var(--text-900)' }}>{toCFA(item.price*item.quantity)}</span>
                        <button onClick={()=>removeItem(item.id)} className="p-1 rounded-lg transition-colors hover:bg-red-50" style={{ color:'var(--text-300)' }}>
                          <Trash2 size={13}/>
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
        {state.items.length>0 && (
          <div className="px-5 py-5 border-t" style={{ borderColor:'var(--border)', background:'var(--bg-soft)' }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm" style={{ color:'var(--text-500)' }}>Total</span>
              <span className="font-heading font-700 text-xl" style={{ color:'var(--text-900)' }}>{toCFA(state.total)}</span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="btn-primary w-full mb-2.5">
              Commander <ArrowRight size={15}/>
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-xs" style={{ color:'var(--text-400)' }}>
              <Shield size={11} style={{ color:'var(--success)' }}/> Paiement 100% sécurisé · PayTech · Orange Money · Wave
            </div>
          </div>
        )}
      </div>
    </>
  );
}
