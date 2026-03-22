import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { newArrivals } from '../../data/products';

export default function NewArrivalsSection() {
  return (
    <section className="py-20" style={{ background: 'var(--bg-soft)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-label">
              <Sparkles size={12} /> Tout juste arrivé
            </div>
            <h2 className="font-heading font-700 mt-2" style={{ color: 'var(--text-900)', fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
              Nouvelles arrivées
            </h2>
          </div>
          <Link to="/shop?filter=new" className="btn-ghost hidden md:flex" style={{ color: 'var(--primary)' }}>
            Voir tout <ArrowRight size={15} />
          </Link>
        </div>
        <div className="product-grid">
          {newArrivals.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
