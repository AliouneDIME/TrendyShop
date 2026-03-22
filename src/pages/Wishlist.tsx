import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const toCFA = (eur: number) => new Intl.NumberFormat('fr-SN', { maximumFractionDigits: 0 }).format(Math.round(eur * 655.957)) + ' FCFA';

export default function Wishlist() {
  const { addItem, openCart } = useCart();
  const { addToast }          = useToast();
  const [wishlist, setWishlist] = useState(products.slice(0, 4));

  const remove = (id: string) => {
    setWishlist(w => w.filter(p => p.id !== id));
    addToast({ type: 'info', message: 'Retiré des favoris', duration: 2000 });
  };
  const addToCart = (product: typeof products[0]) => {
    addItem(product);
    addToast({ type: 'success', message: `"${product.name}" ajouté au panier`, duration: 2500 });
    openCart();
  };

  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FEF2F2' }}>
            <Heart size={20} style={{ color: '#DC2626' }} fill="currentColor" />
          </div>
          <div>
            <h1 className="font-heading font-700 text-3xl" style={{ color: 'var(--text-900)' }}>Mes Favoris</h1>
            <p className="text-sm" style={{ color: 'var(--text-400)' }}>{wishlist.length} article{wishlist.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto mb-5" style={{ color: 'var(--text-200)' }} />
            <h3 className="font-heading font-700 text-2xl mb-3" style={{ color: 'var(--text-900)' }}>Aucun favori</h3>
            <p className="mb-7" style={{ color: 'var(--text-400)' }}>Ajoutez des produits en cliquant sur le ♥</p>
            <Link to="/shop" className="btn-primary">Explorer la boutique <ArrowRight size={15} /></Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlist.map(p => (
              <div key={p.id} className="card">
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--bg-soft)' }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                  <button onClick={() => remove(p.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--primary)' }}>{p.category}</p>
                  <h3 className="font-heading font-600 text-sm mb-2 truncate-2" style={{ color: 'var(--text-900)' }}>{p.name}</h3>
                  <p className="font-heading font-700 mb-3" style={{ color: 'var(--text-900)' }}>{toCFA(p.price)}</p>
                  <button onClick={() => addToCart(p)} className="btn-primary w-full" style={{ fontSize: '12px', padding: '9px 16px' }}>
                    <ShoppingBag size={13} /> Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
