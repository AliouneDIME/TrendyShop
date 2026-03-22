import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { featuredProducts } from '../../data/products';

const marqueeItems = [
  '✦ LIVRAISON EXPRESS AU SÉNÉGAL',
  '◈ NOUVEAUTÉS CHAQUE SEMAINE',
  '⚡ PAIEMENT SÉCURISÉ PAYTECH',
  '★ GARANTIE SATISFAIT OU REMBOURSÉ',
  '◎ +50 000 CLIENTS SATISFAITS',
  '✦ RETOURS GRATUITS 30 JOURS',
];

export default function FeaturedSection() {
  return (
    <section className="py-24 relative" style={{ background: 'var(--obsidian)' }}>
      {/* Marquee ticker */}
      <div
        className="overflow-hidden py-3 mb-20 border-y"
        style={{
          background: 'rgba(201,168,92,0.05)',
          borderColor: 'rgba(201,168,92,0.15)',
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-xs font-mono px-8"
              style={{
                color: i % 6 === 0 ? 'var(--gold)' : 'var(--ash)',
                letterSpacing: '0.15em',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} style={{ color: 'var(--gold)' }} />
              <span
                className="text-xs font-mono"
                style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
              >
                TENDANCES DU MOMENT
              </span>
            </div>
            <h2
              className="font-display leading-none"
              style={{ color: 'var(--ivory)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Produits{' '}
              <span
                style={{
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                phares
              </span>
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-body font-medium transition-all duration-200 group"
            style={{ color: 'var(--silver)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a85c'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--silver)'}
          >
            Tout voir
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Product grid */}
        <div className="product-grid">
          {featuredProducts.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile see all */}
        <div className="mt-10 text-center md:hidden">
          <Link to="/shop" className="btn-outline">
            Voir tous les produits
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
