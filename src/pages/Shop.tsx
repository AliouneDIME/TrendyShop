import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import type { FilterState } from '../types';

const sortOptions = [
  { value: 'newest', label: 'Nouveautés' },
  { value: 'popular', label: 'Populaires' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
];

export default function Shop() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    sortBy: 'newest',
  });
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating);
    }

    switch (filters.sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: result.sort((a, b) => (a.badge === 'new' ? -1 : 1)); break;
    }

    return result;
  }, [filters, search]);

  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--obsidian)' }}>
      {/* Header */}
      <div
        className="py-16 px-6 relative overflow-hidden"
        style={{ background: 'var(--void)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(79,110,247,0.06) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs font-mono mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>BOUTIQUE</p>
          <h1 className="font-display mb-3" style={{ color: 'var(--ivory)', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Tous nos{' '}
            <span style={{ background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              produits
            </span>
          </h1>
          <p style={{ color: 'var(--ash)' }}>{filtered.length} produit{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--ash)' }} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-11 pr-10"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: 'var(--ash)' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value as FilterState['sortBy'] }))}
              className="input-field pr-10 appearance-none cursor-pointer"
              style={{ minWidth: '200px' }}
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ash)' }} />
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all"
            style={{
              background: showFilters ? 'rgba(201,168,92,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${showFilters ? 'rgba(201,168,92,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: showFilters ? 'var(--gold)' : 'var(--silver)',
            }}
          >
            <SlidersHorizontal size={16} />
            <span className="text-sm font-body">Filtres</span>
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters(f => ({ ...f, category: cat.id }))}
              className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all flex-shrink-0"
              style={{
                background: filters.category === cat.id ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.04)',
                color: filters.category === cat.id ? 'var(--obsidian)' : 'var(--silver)',
                border: filters.category === cat.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                fontWeight: filters.category === cat.id ? 700 : 400,
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                style={{
                  background: filters.category === cat.id ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)',
                }}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div
            className="mb-8 p-6 rounded-2xl animate-slide-up"
            style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price range */}
              <div>
                <label className="text-xs font-mono mb-3 block" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                  PRIX MAX : {filters.priceRange[1]} €
                </label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={10}
                  value={filters.priceRange[1]}
                  onChange={e => setFilters(f => ({ ...f, priceRange: [0, +e.target.value] }))}
                  className="w-full accent-yellow-500"
                  style={{ accentColor: 'var(--gold)' }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--ash)' }}>
                  <span>0 €</span><span>1000 €</span>
                </div>
              </div>

              {/* Min rating */}
              <div>
                <label className="text-xs font-mono mb-3 block" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                  NOTE MINIMUM
                </label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map(r => (
                    <button
                      key={r}
                      onClick={() => setFilters(f => ({ ...f, rating: r }))}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        background: filters.rating === r ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.05)',
                        color: filters.rating === r ? 'var(--obsidian)' : 'var(--silver)',
                        border: filters.rating === r ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        fontWeight: 600,
                      }}
                    >
                      {r === 0 ? 'Tous' : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge filter */}
              <div>
                <label className="text-xs font-mono mb-3 block" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                  TYPE
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: undefined, l: 'Tous' },
                    { v: 'new', l: 'Nouveau' },
                    { v: 'sale', l: 'Promo' },
                    { v: 'hot', l: '🔥 Tendance' },
                    { v: 'limited', l: '⚡ Limité' },
                  ].map(({ v, l }) => (
                    <button
                      key={l}
                      onClick={() => setFilters(f => ({ ...f, badge: v }))}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        background: filters.badge === v ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.05)',
                        color: filters.badge === v ? 'var(--obsidian)' : 'var(--silver)',
                        border: filters.badge === v ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        fontWeight: 600,
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => setFilters({ category: 'all', priceRange: [0, 1000], rating: 0, sortBy: 'newest' })}
              className="mt-4 text-xs flex items-center gap-1 transition-colors"
              style={{ color: 'var(--ash)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fb7185'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--ash)'}
            >
              <X size={12} /> Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--ivory)' }}>Aucun résultat</h3>
            <p className="mb-6" style={{ color: 'var(--ash)' }}>Essayez d'autres filtres ou termes de recherche.</p>
            <button
              onClick={() => { setSearch(''); setFilters({ category: 'all', priceRange: [0, 1000], rating: 0, sortBy: 'newest' }); }}
              className="btn-outline"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
