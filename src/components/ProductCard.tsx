import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Zap } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const EUR_CFA = 655.957;
const toCFA = (eur: number) =>
  new Intl.NumberFormat('fr-SN',{ maximumFractionDigits:0 }).format(Math.round(eur * EUR_CFA)) + ' FCFA';

const badgeConf: Record<string, { label: string; cls: string }> = {
  new:     { label: 'Nouveau',       cls: 'badge-new' },
  sale:    { label: 'Promo',         cls: 'badge-sale' },
  hot:     { label: 'Tendance',      cls: 'badge-hot' },
  limited: { label: 'Stock limité',  cls: 'badge-limited' },
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const { addToast }          = useToast();
  const [liked,    setLiked]    = useState(false);
  const [adding,   setAdding]   = useState(false);
  const [imgLoaded,setImgLoaded]= useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (adding || product.stock === 0) return;
    setAdding(true);
    addItem(product);
    addToast({ type:'success', message:`"${product.name}" ajouté au panier`, duration:2800 });
    setTimeout(() => { setAdding(false); openCart(); }, 500);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setLiked(l => !l);
    addToast({ type: liked ? 'info' : 'success', message: liked ? 'Retiré des favoris' : 'Ajouté aux favoris', duration:2000 });
  };

  return (
    <article className="card group" style={{ cursor: 'pointer' }}>
      {/* Image container */}
      <div className="relative overflow-hidden" style={{ aspectRatio:'4/3', background:'var(--bg-soft)' }}>
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={product.image} alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`badge ${badgeConf[product.badge].cls}`}>{badgeConf[product.badge].label}</span>
          )}
          {discount > 0 && (
            <span className="badge badge-sale">−{discount}%</span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="badge badge-limited"><Zap size={9} />{product.stock} restants</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: liked ? '#FEE2E2' : 'rgba(255,255,255,0.9)',
            boxShadow: 'var(--shadow-sm)',
            color: liked ? '#DC2626' : 'var(--text-400)',
            border: '1px solid',
            borderColor: liked ? '#FECACA' : 'var(--border)',
          }}
          aria-label="Favoris"
        >
          <Heart size={13} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {/* Add to cart — appears on hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={handleAdd}
            disabled={adding || product.stock === 0}
            className="btn-primary w-full"
            style={{ fontSize: '12px', padding: '9px 16px' }}
          >
            {product.stock === 0 ? 'Rupture de stock'
              : adding ? <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />Ajout…</>
              : <><ShoppingBag size={13} />Ajouter au panier</>
            }
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category tag */}
        <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--primary)' }}>
          {product.category}{product.subcategory ? ` · ${product.subcategory}` : ''}
        </span>

        {/* Name */}
        <h3 className="font-heading font-600 text-sm mt-1 mb-2 truncate-2 transition-colors duration-150 group-hover:text-primary"
          style={{ color: 'var(--text-800)', lineHeight: 1.4 }}>
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({length:5}).map((_,i) => (
              <Star key={i} size={11}
                fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'}
                style={{ color: i < Math.floor(product.rating) ? '#F59E0B' : '#CBD5E1' }}
              />
            ))}
          </div>
          <span className="text-xs" style={{ color:'var(--text-400)' }}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading font-700 text-base" style={{ color:'var(--text-900)' }}>
              {toCFA(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-xs price-strike">{toCFA(product.originalPrice)}</p>
            )}
          </div>
          {/* Mobile quick-add */}
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background:'var(--primary)', color:'#fff', boxShadow:'var(--shadow-primary)' }}
            aria-label="Ajouter"
          >
            {adding
              ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <ShoppingBag size={14} />
            }
          </button>
        </div>
      </div>
    </article>
  );
}
