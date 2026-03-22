import React from 'react';
import { ShoppingBag, Truck, Headphones, Shield, Star, Users, Package } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--obsidian)' }}>
      {/* Hero */}
      <div className="relative py-24 px-6 overflow-hidden" style={{ background: 'var(--void)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,92,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-xs font-mono mb-4" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>NOTRE HISTOIRE</p>
          <h1 className="font-display mb-6" style={{ color: 'var(--ivory)', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Plus qu'une boutique,{' '}
            <span style={{ background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              une expérience
            </span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--silver)' }}>
            TrendyShop est né de la conviction que les consommateurs africains méritent accès aux meilleurs produits mondiaux, sans compromis sur la qualité, la sécurité ou le service.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, value: '50K+', label: 'Clients satisfaits' },
            { icon: Package, value: '1200+', label: 'Produits premium' },
            { icon: Star, value: '4.9/5', label: 'Note moyenne' },
            { icon: Truck, value: '48h', label: 'Livraison express' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="card p-6 text-center">
              <Icon size={24} className="mx-auto mb-3" style={{ color: 'var(--gold)' }} />
              <div className="font-mono font-bold text-2xl mb-1" style={{ background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{value}</div>
              <p className="text-xs" style={{ color: 'var(--ash)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-xs font-mono mb-3 text-center" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>NOS VALEURS</p>
        <h2 className="font-display text-center mb-16" style={{ color: 'var(--ivory)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Ce qui nous différencie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: ShoppingBag, title: 'Sélection premium', desc: 'Chaque produit est soigneusement testé et sélectionné par notre équipe d\'experts.', color: '#4f6ef7' },
            { icon: Truck, title: 'Livraison express', desc: 'Réseau logistique optimisé pour une livraison en 24-48h dans tout le Sénégal.', color: '#c9a85c' },
            { icon: Headphones, title: 'Support dédié', desc: 'Une équipe francophone disponible 7j/7 pour vous accompagner avant et après l\'achat.', color: '#10b981' },
            { icon: Shield, title: 'Paiement sécurisé', desc: 'Partenariat PayTech.sn pour des transactions 100% sécurisées et conformes RGPD.', color: '#f43f5e' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="font-body font-semibold mb-2" style={{ color: 'var(--ivory)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ash)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
