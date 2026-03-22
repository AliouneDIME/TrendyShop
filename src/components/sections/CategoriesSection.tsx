import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid } from 'lucide-react';

const cats = [
  { id:'Tech',   name:'Tech & Gadgets',  desc:'Innovations technologiques',  image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', color:'#6366F1', bg:'#EEF2FF', count:6,  big:true },
  { id:'Mode',   name:'Mode & Style',    desc:'Fashion haut de gamme',        image:'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=600', color:'#EC4899', bg:'#FDF2F8', count:5,  big:false },
  { id:'Maison', name:'Maison & Déco',   desc:'Design intérieur moderne',     image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600', color:'#10B981', bg:'#ECFDF5', count:3,  big:false },
  { id:'Sport',  name:'Sport & Fitness', desc:'Équipements performance',      image:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800', color:'#F59E0B', bg:'#FFFBEB', count:4,  big:false, wide:true },
];

export default function CategoriesSection() {
  return (
    <section className="py-20" style={{ background:'var(--bg-soft)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-label"><Grid size={12} />Explorer par univers</div>
            <h2 className="font-heading font-700 mt-2" style={{ color:'var(--text-900)', fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              Nos univers produits
            </h2>
          </div>
          <Link to="/categories" className="btn-ghost hidden md:flex" style={{ color:'var(--primary)' }}>
            Toutes catégories <ArrowRight size={15} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows:'220px' }}>
          {cats.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/categories?cat=${cat.id}`}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
              style={{
                gridColumn: cat.big || cat.wide ? 'span 2' : 'span 1',
                gridRow:    cat.big ? 'span 2' : 'span 1',
                boxShadow:  'var(--shadow-md)',
              }}
            >
              <img src={cat.image} alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0"
                style={{ background:'linear-gradient(to top,rgba(15,23,42,.88) 0%,rgba(15,23,42,.3) 65%,transparent 100%)' }} />
              {/* Color accent on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none"
                style={{ boxShadow:`inset 0 0 0 2px ${cat.color}` }} />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="inline-block text-xs font-bold mb-2 px-2 py-0.5 rounded-full"
                      style={{ background: cat.color + '25', color: '#fff', border:`1px solid ${cat.color}60` }}>
                      {cat.count} produits
                    </span>
                    <h3 className="font-heading font-700 leading-tight mb-1 text-white"
                      style={{ fontSize: cat.big ? '1.75rem' : '1.3rem' }}>
                      {cat.name}
                    </h3>
                    <p className="text-sm text-white" style={{ opacity:.8 }}>{cat.desc}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center ml-4 flex-shrink-0 translate-x-1 group-hover:translate-x-0 transition-transform duration-200"
                    style={{ background: cat.color, color:'#fff' }}>
                    <ArrowRight size={15} />
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
