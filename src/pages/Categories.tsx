import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const catMeta: Record<string, { image: string; color: string; bg: string }> = {
  Tech:   { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1400', color: '#6366F1', bg: '#EEF2FF' },
  Mode:   { image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1400', color: '#EC4899', bg: '#FDF2F8' },
  Maison: { image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1400', color: '#10B981', bg: '#ECFDF5' },
  Sport:  { image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1400', color: '#F59E0B', bg: '#FFFBEB' },
};

export default function Categories() {
  const [params]        = useSearchParams();
  const [active, setActive] = useState(params.get('cat') || 'Tech');
  const filtered = products.filter(p => p.category === active);
  const meta     = catMeta[active] ?? catMeta.Tech;

  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      {/* Hero banner */}
      <div className="relative overflow-hidden" style={{ height: 240 }}>
        <img src={meta.image} alt={active} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.9) 30%, rgba(15,23,42,0.4) 100%)' }} />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
          <span className="text-xs font-bold mb-2 px-3 py-1 rounded-full inline-block"
            style={{ background: meta.color + '30', color: '#fff', border: `1px solid ${meta.color}60`, width: 'fit-content' }}>
            CATÉGORIE
          </span>
          <h1 className="font-heading font-700 text-5xl text-white">{active}</h1>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {filtered.length} produit{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        {/* Category tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-10 scrollbar-hide">
          {categories.filter(c => c.id !== 'all').map(cat => {
            const m = catMeta[cat.id] ?? catMeta.Tech;
            return (
              <button key={cat.id} onClick={() => setActive(cat.id)}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 flex-shrink-0 font-medium text-sm border"
                style={{
                  background:  active === cat.id ? m.bg : 'var(--bg-white)',
                  color:       active === cat.id ? m.color : 'var(--text-500)',
                  borderColor: active === cat.id ? m.color + '50' : 'var(--border)',
                  boxShadow:   active === cat.id ? `0 4px 12px ${m.color}20` : 'none',
                }}>
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    background: active === cat.id ? m.color + '20' : 'var(--bg-soft)',
                    color:      active === cat.id ? m.color : 'var(--text-400)',
                  }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="product-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="mt-14 text-center">
          <Link to="/shop" className="btn-primary">
            Voir tous les produits <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}
