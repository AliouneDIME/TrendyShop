import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Categories() {
  const [params] = useSearchParams();
  const [active, setActive] = useState(params.get('cat') || 'Tech');

  const filtered = products.filter(p => p.category === active);

  const catImages: Record<string, string> = {
    Tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    Mode: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200',
    Maison: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    Sport: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
  };

  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--obsidian)' }}>
      {/* Hero banner for active category */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={catImages[active]}
          alt={active}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,15,0.95) 40%, rgba(10,10,15,0.4) 100%)' }} />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <p className="text-xs font-mono mb-2" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>CATÉGORIE</p>
          <h1 className="font-display text-5xl md:text-6xl" style={{ color: 'var(--ivory)' }}>{active}</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--silver)' }}>{filtered.length} produits disponibles</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-12">
          {categories.filter(c => c.id !== 'all').map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="flex items-center gap-3 px-6 py-3 rounded-xl whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: active === cat.id ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.04)',
                color: active === cat.id ? 'var(--obsidian)' : 'var(--silver)',
                border: active === cat.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                fontWeight: 600,
              }}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="font-body text-sm">{cat.name}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono"
                style={{ background: active === cat.id ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)' }}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="product-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/shop" className="btn-primary">
            Voir tous les produits <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
