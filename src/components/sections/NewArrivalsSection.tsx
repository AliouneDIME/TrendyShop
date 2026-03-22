import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { newArrivals } from '../../data/products';

export default function NewArrivalsSection() {
  return (
    <section className="py-24" style={{ background: 'var(--void)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} style={{ color: 'var(--gold)' }} />
              <span className="text-xs font-mono" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>
                NOUVEAUTÉS
              </span>
            </div>
            <h2
              className="font-display leading-none"
              style={{ color: 'var(--ivory)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Tout juste{' '}
              <span style={{ background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                arrivé
              </span>
            </h2>
          </div>
          <Link
            to="/shop?filter=new"
            className="hidden md:flex items-center gap-2 text-sm group"
            style={{ color: 'var(--silver)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a85c'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--silver)'}
          >
            Voir tout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="product-grid">
          {newArrivals.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
