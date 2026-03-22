import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { featuredProducts } from '../../data/products';

const marqueeItems = [
  '✓ Livraison express 48h Sénégal', '✓ Paiements en FCFA',
  '✓ PayTech · Orange Money · Wave', '✓ Retours gratuits 30 jours',
  '✓ +50 000 clients satisfaits', '✓ Produits 100% authentiques',
  '✓ Satisfait ou remboursé', '✓ Support 7j/7',
];

export default function FeaturedSection() {
  return (
    <section className="py-20" style={{ background: 'var(--bg-page)' }}>
      {/* Ticker */}
      <div className="overflow-hidden py-2.5 mb-16"
        style={{ background:'var(--primary)', color:'#fff' }}>
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {[...marqueeItems,...marqueeItems].map((item,i) => (
            <span key={i} className="text-xs font-medium px-8" style={{ letterSpacing:'.06em', opacity: i%2===0 ? 1 : 0.75 }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-label">
              <TrendingUp size={12} /> Tendances du moment
            </div>
            <h2 className="font-heading font-700 mt-2" style={{ color:'var(--text-900)', fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              Produits les plus populaires
            </h2>
          </div>
          <Link to="/shop" className="btn-ghost hidden md:flex" style={{ color:'var(--primary)' }}>
            Tout voir <ArrowRight size={15} />
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.slice(0,6).map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link to="/shop" className="btn-outline">Voir tous les produits <ArrowRight size={14}/></Link>
        </div>
      </div>
    </section>
  );
}
