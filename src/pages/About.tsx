import React from 'react';
import { ShoppingBag, Truck, Headphones, Shield, Star, Users, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      {/* Hero */}
      <div className="py-20 px-5 lg:px-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#EEF2FF 0%,#F8FAFC 50%,#F5F3FF 100%)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="section-label mx-auto mb-4" style={{ display: 'inline-flex' }}>Notre histoire</div>
          <h1 className="font-heading font-700 mb-5"
            style={{ color: 'var(--text-900)', fontSize: 'clamp(2.2rem,5vw,4rem)' }}>
            Plus qu'une boutique,{' '}
            <span className="text-gradient">une expérience</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-500)', lineHeight: 1.7 }}>
            TrendyShop est né de la conviction que les consommateurs africains méritent accès aux meilleurs produits mondiaux,
            avec des prix transparents en <strong style={{ color: 'var(--text-700)' }}>FCFA</strong> et des paiements locaux simples.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-5 lg:px-8 -mt-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users,   value: '50K+',  label: 'Clients satisfaits' },
            { icon: Package, value: '1200+', label: 'Produits premium' },
            { icon: Star,    value: '4.9/5', label: 'Note moyenne' },
            { icon: Truck,   value: '48h',   label: 'Livraison express' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="card p-5 text-center">
              <Icon size={20} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
              <p className="font-heading font-700 text-2xl text-gradient mb-0.5">{value}</p>
              <p className="text-xs" style={{ color: 'var(--text-400)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <div className="section-label mx-auto mb-3" style={{ display: 'inline-flex' }}>Nos valeurs</div>
          <h2 className="font-heading font-700" style={{ color: 'var(--text-900)', fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
            Ce qui nous <span className="text-gradient">différencie</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: ShoppingBag, title: 'Sélection premium',    desc: 'Chaque produit est testé et validé par notre équipe.',               color: '#6366F1', bg: '#EEF2FF' },
            { icon: Truck,       title: 'Livraison express',    desc: 'Réseau logistique optimisé pour 24-48h dans tout le Sénégal.',        color: '#10B981', bg: '#ECFDF5' },
            { icon: Headphones,  title: 'Support 7j/7',        desc: 'Équipe francophone disponible par téléphone, email et chat.',          color: '#F59E0B', bg: '#FFFBEB' },
            { icon: Shield,      title: 'Paiement FCFA',       desc: 'PayTech, Orange Money, Wave — transparent, sans frais cachés.',        color: '#8B5CF6', bg: '#F5F3FF' },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="card p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <h3 className="font-heading font-600 mb-1.5" style={{ color: 'var(--text-900)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-500)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-5 text-center border-t" style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
        <h2 className="font-heading font-700 text-3xl mb-3" style={{ color: 'var(--text-900)' }}>
          Prêt à découvrir ?
        </h2>
        <p className="mb-7" style={{ color: 'var(--text-500)' }}>
          +1200 produits premium livrés chez vous au Sénégal.
        </p>
        <Link to="/shop" className="btn-primary">
          Explorer la boutique <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}
