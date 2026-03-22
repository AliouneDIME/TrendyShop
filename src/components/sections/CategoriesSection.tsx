import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categoryCards = [
  {
    id: 'Tech',
    name: 'Tech & Gadgets',
    description: 'Les dernières innovations technologiques',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    count: 6,
    accent: '#4f6ef7',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 'Mode',
    name: 'Mode & Style',
    description: 'Tendances fashion premium',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800',
    count: 5,
    accent: '#c9a85c',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 'Maison',
    name: 'Maison & Déco',
    description: 'Design intérieur moderne',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    count: 3,
    accent: '#10b981',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 'Sport',
    name: 'Sport & Fitness',
    description: 'Équipements haute performance',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    count: 4,
    accent: '#f43f5e',
    span: 'col-span-2 row-span-1',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24" style={{ background: 'var(--void)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs font-mono mb-3"
              style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              EXPLORER PAR UNIVERS
            </p>
            <h2
              className="font-display leading-none"
              style={{ color: 'var(--ivory)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Nos{' '}
              <span
                style={{
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                univers
              </span>
            </h2>
          </div>

          <Link
            to="/categories"
            className="hidden md:flex items-center gap-2 text-sm group"
            style={{ color: 'var(--silver)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a85c'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--silver)'}
          >
            Toutes catégories
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows: '250px' }}>
          {categoryCards.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/categories?cat=${cat.id}`}
              className="relative overflow-hidden rounded-2xl group cursor-pointer block"
              style={{
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                gridRow: i === 0 ? 'span 2' : 'span 1',
                ...(i === 3 ? { gridColumn: 'span 2' } : {}),
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.4) 60%, transparent 100%)`,
                  }}
                />
              </div>

              {/* Accent border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${cat.accent}40` }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span
                      className="text-xs font-mono mb-2 block"
                      style={{ color: cat.accent, letterSpacing: '0.15em' }}
                    >
                      {cat.count} PRODUITS
                    </span>
                    <h3
                      className="font-display leading-tight mb-2"
                      style={{
                        color: 'var(--ivory)',
                        fontSize: i === 0 ? '2.2rem' : '1.5rem',
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className="text-sm font-body"
                      style={{ color: 'var(--silver)', opacity: i === 0 ? 1 : 0.8 }}
                    >
                      {cat.description}
                    </p>
                  </div>

                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                    style={{
                      background: `${cat.accent}20`,
                      border: `1px solid ${cat.accent}40`,
                      color: cat.accent,
                    }}
                  >
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
