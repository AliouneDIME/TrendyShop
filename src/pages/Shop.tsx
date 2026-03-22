import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, X, ChevronDown, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import type { FilterState } from '../types';

const toCFA = (eur: number) =>
  new Intl.NumberFormat('fr-SN', { maximumFractionDigits: 0 }).format(Math.round(eur * 655.957)) + ' FCFA';

const sortOptions = [
  { value: 'newest',    label: 'Nouveautés' },
  { value: 'popular',   label: 'Plus populaires' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc',label: 'Prix décroissant' },
  { value: 'rating',    label: 'Mieux notés' },
];

export default function Shop() {
  const [filters,     setFilters]     = useState<FilterState>({ category: 'all', priceRange: [0, 1000], rating: 0, sortBy: 'newest' });
  const [search,      setSearch]      = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let r = [...products];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }
    if (filters.category !== 'all') r = r.filter(p => p.category === filters.category);
    r = r.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (filters.rating > 0) r = r.filter(p => p.rating >= filters.rating);
    if (filters.badge)       r = r.filter(p => p.badge === filters.badge);
    switch (filters.sortBy) {
      case 'price-asc':  r.sort((a, b) => a.price - b.price); break;
      case 'price-desc': r.sort((a, b) => b.price - a.price); break;
      case 'rating':     r.sort((a, b) => b.rating - a.rating); break;
      case 'popular':    r.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default:           r.sort((a, b) => (a.badge === 'new' ? -1 : 1)); break;
    }
    return r;
  }, [filters, search]);

  const resetFilters = () => {
    setSearch('');
    setFilters({ category: 'all', priceRange: [0, 1000], rating: 0, sortBy: 'newest' });
  };

  const activeFilterCount = [
    filters.category !== 'all',
    filters.priceRange[1] < 1000,
    filters.rating > 0,
    !!filters.badge,
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      {/* Page header */}
      <div className="py-10 px-5 lg:px-8 border-b" style={{ background: 'var(--bg-white)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="section-label mb-2">Boutique</div>
          <h1 className="font-heading font-700" style={{ color: 'var(--text-900)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
            Tous nos produits
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-400)' }}>
            {filtered.length} produit{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        {/* Search + Sort + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-300)' }} />
            <input
              type="text"
              placeholder="Rechercher un produit…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-300)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-700)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-300)'}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative" style={{ minWidth: 190 }}>
            <select
              value={filters.sortBy}
              onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value as FilterState['sortBy'] }))}
              className="input-field pr-9 appearance-none cursor-pointer"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-400)' }} />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(s => !s)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border"
            style={{
              background:   showFilters ? '#EEF2FF' : 'var(--bg-white)',
              borderColor:  showFilters ? 'var(--primary)' : 'var(--border)',
              color:        showFilters ? 'var(--primary)' : 'var(--text-500)',
            }}
          >
            <SlidersHorizontal size={15} />
            Filtres
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full text-xs font-bold text-white flex items-center justify-center"
                style={{ background: 'var(--primary)', fontSize: '9px' }}>
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters(f => ({ ...f, category: cat.id }))}
              className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 flex-shrink-0 border"
              style={{
                background:   filters.category === cat.id ? 'var(--primary)' : 'var(--bg-white)',
                color:        filters.category === cat.id ? '#fff' : 'var(--text-500)',
                borderColor:  filters.category === cat.id ? 'var(--primary)' : 'var(--border)',
                boxShadow:    filters.category === cat.id ? 'var(--shadow-primary)' : 'none',
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
              <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={{
                  background: filters.category === cat.id ? 'rgba(255,255,255,0.25)' : 'var(--bg-soft)',
                  color:      filters.category === cat.id ? '#fff' : 'var(--text-400)',
                }}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-8 p-5 rounded-2xl border animate-slide-up"
            style={{ background: 'var(--bg-white)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price */}
              <div>
                <label className="text-xs font-bold mb-3 block uppercase tracking-wide"
                  style={{ color: 'var(--text-700)' }}>
                  Prix max : {toCFA(filters.priceRange[1])}
                </label>
                <input
                  type="range" min={0} max={1000} step={10}
                  value={filters.priceRange[1]}
                  onChange={e => setFilters(f => ({ ...f, priceRange: [0, +e.target.value] }))}
                  className="w-full" style={{ accentColor: 'var(--primary)' }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-300)' }}>
                  <span>0 FCFA</span><span>{toCFA(1000)}</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-xs font-bold mb-3 block uppercase tracking-wide"
                  style={{ color: 'var(--text-700)' }}>Note minimum</label>
                <div className="flex gap-2 flex-wrap">
                  {[0, 3, 4, 4.5].map(r => (
                    <button key={r}
                      onClick={() => setFilters(f => ({ ...f, rating: r }))}
                      className="px-3 py-1.5 rounded-lg text-xs font-600 transition-all duration-200 border"
                      style={{
                        background:  filters.rating === r ? 'var(--primary)' : 'var(--bg-soft)',
                        color:       filters.rating === r ? '#fff' : 'var(--text-500)',
                        borderColor: filters.rating === r ? 'var(--primary)' : 'var(--border)',
                      }}>
                      {r === 0 ? 'Tous' : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div>
                <label className="text-xs font-bold mb-3 block uppercase tracking-wide"
                  style={{ color: 'var(--text-700)' }}>Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: undefined, l: 'Tous' },
                    { v: 'new',     l: 'Nouveau' },
                    { v: 'sale',    l: 'Promo' },
                    { v: 'hot',     l: '🔥 Tendance' },
                    { v: 'limited', l: '⚡ Limité' },
                  ].map(({ v, l }) => (
                    <button key={l}
                      onClick={() => setFilters(f => ({ ...f, badge: v }))}
                      className="px-3 py-1.5 rounded-lg text-xs font-600 transition-all duration-200 border"
                      style={{
                        background:  filters.badge === v ? 'var(--primary)' : 'var(--bg-soft)',
                        color:       filters.badge === v ? '#fff' : 'var(--text-500)',
                        borderColor: filters.badge === v ? 'var(--primary)' : 'var(--border)',
                      }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={resetFilters}
              className="mt-4 flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--text-400)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--danger)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-400)'}>
              <X size={12} /> Réinitialiser tous les filtres
            </button>
          </div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-5">🔍</div>
            <h3 className="font-heading font-700 text-2xl mb-2" style={{ color: 'var(--text-900)' }}>
              Aucun résultat
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-400)' }}>
              Essayez d'autres termes ou réinitialisez les filtres.
            </p>
            <button onClick={resetFilters} className="btn-primary">Réinitialiser</button>
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
