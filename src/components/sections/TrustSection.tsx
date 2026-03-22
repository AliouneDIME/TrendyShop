import React from 'react';
import { Truck, Shield, RotateCcw, Headphones, CreditCard, Zap } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Livraison Express',
    desc: 'Livraison sous 24-48h dans tout le Sénégal. Suivi en temps réel de votre commande.',
    color: '#4f6ef7',
  },
  {
    icon: Shield,
    title: 'Paiement Sécurisé',
    desc: 'Transactions cryptées SSL. PayTech, Orange Money, Wave, Visa & Mastercard acceptés.',
    color: '#c9a85c',
  },
  {
    icon: RotateCcw,
    title: 'Retours 30 Jours',
    desc: 'Pas satisfait ? Retournez votre commande gratuitement dans les 30 jours.',
    color: '#10b981',
  },
  {
    icon: Headphones,
    title: 'Support 7j/7',
    desc: 'Notre équipe est disponible 7j/7 par téléphone, email ou chat en direct.',
    color: '#f43f5e',
  },
  {
    icon: CreditCard,
    title: 'Paiement en 3x',
    desc: 'Étalez vos paiements en 3 fois sans frais via nos partenaires financiers.',
    color: '#a855f7',
  },
  {
    icon: Zap,
    title: 'Offres Exclusives',
    desc: 'Abonnez-vous à notre newsletter pour recevoir les meilleures offres en avant-première.',
    color: '#f59e0b',
  },
];

export default function TrustSection() {
  return (
    <section className="py-24" style={{ background: 'var(--obsidian)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-mono mb-3"
            style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            POURQUOI NOUS CHOISIR
          </p>
          <h2
            className="font-display mb-4"
            style={{ color: 'var(--ivory)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            L'expérience{' '}
            <span
              style={{
                background: 'var(--gradient-gold)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              premium
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--ash)' }}>
            Chaque détail pensé pour votre satisfaction et votre sécurité.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="card p-6 hover-lift group"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              {/* Content */}
              <h3
                className="font-body font-semibold text-base mb-2"
                style={{ color: 'var(--ivory)' }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ash)' }}>
                {desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* PayTech badge */}
        <div
          className="mt-16 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,92,0.08) 0%, rgba(79,110,247,0.08) 100%)',
            border: '1px solid rgba(201,168,92,0.15)',
          }}
        >
          <div className="flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--gradient-gold)' }}
            >
              <Shield size={28} style={{ color: 'var(--obsidian)' }} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--ivory)' }}>
              Paiement 100% sécurisé via PayTech.sn
            </h3>
            <p className="text-sm" style={{ color: 'var(--silver)' }}>
              Nous utilisons PayTech, la solution de paiement numérique de référence en Afrique de l'Ouest. 
              Toutes vos transactions sont cryptées et protégées. Nous n'accédons jamais à vos informations bancaires.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {['PayTech', 'Orange Money', 'Wave', 'Visa', 'Mastercard'].map(m => (
              <span
                key={m}
                className="text-xs px-3 py-1.5 rounded-lg font-mono font-bold"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--silver)',
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
