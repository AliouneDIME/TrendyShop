import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Eye, Zap } from 'lucide-react';
import type { Product } from '../../src/types/index';
import { useCart } from '../../src/contexts/CartContext';
import { useToast } from '../../src/contexts/ToastContext';

const badgeConfig = {
  new: { label: 'Nouveau', class: 'badge-new' },
  sale: { label: 'Promo', class: 'badge-sale' },
  hot: { label: '🔥 Tendance', class: 'badge-gold' },
  limited: { label: '⚡ Limité', class: 'badge-sale' },
};

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAdding(true);
    addItem(product);
    
    addToast({
      type: 'success',
      message: `"${product.name}" ajouté au panier`,
      duration: 3000,
    });

    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
    addToast({
      type: wishlisted ? 'info' : 'success',
      message: wishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris ♥',
      duration: 2000,
    });
  };

  return (
    <article
      className="card group relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #1a1a24 0%, #111118 100%)' }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {/* Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className={`badge ${badgeConfig[product.badge].class}`}>
              {badgeConfig[product.badge].label}
            </span>
          )}
          {discount > 0 && (
            <span className="badge badge-sale">-{discount}%</span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="badge" style={{ background: 'rgba(251,146,60,0.15)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.3)' }}>
              <Zap size={10} className="mr-1" />
              {product.stock} restants
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: wishlisted ? 'rgba(244,63,94,0.2)' : 'rgba(10,10,15,0.5)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${wishlisted ? 'rgba(244,63,94,0.4)' : 'rgba(255,255,255,0.1)'}`,
            color: wishlisted ? '#fb7185' : 'var(--silver)',
          }}
          aria-label={wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart
            size={15}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>

        {/* Quick actions on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className={`btn-primary w-full justify-center ${adding ? 'opacity-80' : ''}`}
            style={{ fontSize: '13px', padding: '11px 20px' }}
          >
            {product.stock === 0 ? (
              'Rupture de stock'
            ) : adding ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Ajout...
              </>
            ) : (
              <>
                <ShoppingBag size={15} />
                Ajouter au panier
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-mono mb-1.5" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
          {product.category.toUpperCase()} {product.subcategory ? `/ ${product.subcategory.toUpperCase()}` : ''}
        </p>

        {/* Name */}
        <h3
          className="font-body font-semibold text-sm leading-snug mb-2 truncate-2 transition-colors duration-200 group-hover:text-gold"
          style={{ color: 'var(--ivory)' }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < Math.floor(product.rating) ? 'var(--gold)' : 'none'}
                style={{ color: i < Math.floor(product.rating) ? 'var(--gold)' : 'var(--mist)' }}
              />
            ))}
          </div>
          <span className="text-xs font-mono" style={{ color: 'var(--ash)' }}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg" style={{ color: 'var(--gold)' }}>
              {product.price.toFixed(2)} €
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono price-original">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>

          {/* Quick add button (mobile/non-hover) */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'var(--gradient-gold)',
              color: 'var(--obsidian)',
            }}
            aria-label="Ajouter au panier"
          >
            {adding ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingBag size={15} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
