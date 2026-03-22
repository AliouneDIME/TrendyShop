import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '50K+',  label: 'Clients' },
  { value: '1200+', label: 'Produits' },
  { value: '4.9★',  label: 'Note' },
  { value: '48h',   label: 'Livraison' },
];

const trust = [
  { icon: ShieldCheck, text: 'Paiement sécurisé' },
  { icon: Truck,       text: 'Livraison 48h' },
  { icon: Star,        text: 'Garantie qualité' },
];

export default function Hero() {
  return (
    <section className="pt-16" style={{ background: 'var(--grad-hero)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">

          {/* Left — Text */}
          <div>
            {/* Label */}
            <div className="section-label animate-slide-up mb-4">
              <Zap size={12} />
              Nouvelle Collection 2024
            </div>

            {/* H1 */}
            <h1
              className="font-heading font-700 leading-tight mb-5 animate-slide-up delay-100"
              style={{ color: 'var(--text-900)', fontSize: 'clamp(2.4rem,5vw,3.8rem)', animationFillMode: 'both' }}
            >
              Votre boutique{' '}
              <span className="text-gradient">premium</span>
              <br />en Afrique de l'Ouest
            </h1>

            <p
              className="text-lg mb-8 animate-slide-up delay-200"
              style={{ color: 'var(--text-500)', lineHeight: 1.7, animationFillMode: 'both', maxWidth: '480px' }}
            >
              Tech, Mode, Maison, Sport — les meilleurs produits livrés sous 48h au Sénégal.
              Paiements en <strong style={{ color: 'var(--text-700)' }}>FCFA</strong> via PayTech, Orange Money & Wave.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8 animate-slide-up delay-300" style={{ animationFillMode: 'both' }}>
              <Link to="/shop" className="btn-primary text-base px-7 py-3.5">
                Explorer la boutique <ArrowRight size={16} />
              </Link>
              <Link to="/categories" className="btn-outline text-base px-7 py-3.5">
                Voir les catégories
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 animate-fade-in delay-400" style={{ animationFillMode: 'both' }}>
              {trust.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: '#EEF2FF' }}>
                    <Icon size={14} style={{ color: 'var(--primary)' }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-500)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bento image block */}
          <div className="relative animate-fade-in delay-200" style={{ animationFillMode: 'both' }}>
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800&h=500"
                alt="Shopping premium"
                className="w-full object-cover"
                style={{ height: '360px' }}
              />
              {/* Floating card — top left */}
              <div className="absolute top-4 left-4 rounded-xl px-3 py-2.5 flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-md)', backdropFilter: 'blur(8px)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#ECFDF5' }}>
                  <ShieldCheck size={16} style={{ color: '#059669' }} />
                </div>
                <div>
                  <p className="font-heading font-700 text-xs" style={{ color: 'var(--text-900)' }}>Paiement sécurisé</p>
                  <p className="text-xs" style={{ color: 'var(--text-400)' }}>PayTech · Orange Money · Wave</p>
                </div>
              </div>
              {/* Floating card — bottom right */}
              <div className="absolute bottom-4 right-4 rounded-xl px-3 py-2.5 flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-md)', backdropFilter: 'blur(8px)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FFFBEB' }}>
                  <Truck size={16} style={{ color: 'var(--accent-dark)' }} />
                </div>
                <div>
                  <p className="font-heading font-700 text-xs" style={{ color: 'var(--text-900)' }}>Livraison express</p>
                  <p className="text-xs" style={{ color: 'var(--text-400)' }}>24-48h dans tout le Sénégal</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="rounded-xl p-3 text-center" style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
                  <p className="font-heading font-700 text-lg" style={{ color: 'var(--primary)' }}>{value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-400)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
