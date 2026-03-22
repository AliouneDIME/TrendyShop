import React from 'react';
import { Truck, Shield, RotateCcw, Headphones, CreditCard, Zap } from 'lucide-react';

const features = [
  { icon:Truck,       title:'Livraison 24-48h',    desc:'Dans tout le Sénégal. Suivi SMS en temps réel.',     color:'#6366F1', bg:'#EEF2FF' },
  { icon:Shield,      title:'Paiement sécurisé',   desc:'PayTech SSL, Orange Money, Wave — en FCFA, sans frais cachés.',color:'#10B981', bg:'#ECFDF5' },
  { icon:RotateCcw,   title:'Retours 30 jours',    desc:'Insatisfait ? Retournez gratuitement dans les 30 jours.',  color:'#F59E0B', bg:'#FFFBEB' },
  { icon:Headphones,  title:'Support 7j/7',         desc:'Équipe francophone disponible par téléphone, email et chat.',color:'#EC4899', bg:'#FDF2F8' },
  { icon:CreditCard,  title:'Paiement 3x sans frais', desc:'Étalez vos achats via nos partenaires financiers locaux.', color:'#8B5CF6', bg:'#F5F3FF' },
  { icon:Zap,         title:'Offres exclusives',   desc:'Abonnez-vous pour des offres avant tout le monde.',     color:'#EF4444', bg:'#FEF2F2' },
];

export default function TrustSection() {
  return (
    <section className="py-20" style={{ background:'var(--bg-page)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label mx-auto" style={{ display:'inline-flex' }}>Pourquoi nous choisir</div>
          <h2 className="font-heading font-700 mt-3" style={{ color:'var(--text-900)', fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
            L'expérience shopping <span className="text-gradient">premium</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color:'var(--text-500)' }}>
            Chaque détail pensé pour votre satisfaction et votre sécurité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon:Icon, title, desc, color, bg }) => (
            <div key={title} className="group p-6 rounded-2xl border transition-all duration-250 cursor-default"
              style={{ background:'var(--bg-white)', borderColor:'var(--border)', boxShadow:'var(--shadow-xs)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = 'var(--shadow-lg)';
                el.style.borderColor = color + '40';
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = 'var(--shadow-xs)';
                el.style.borderColor = 'var(--border)';
                el.style.transform = 'none';
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background:bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="font-heading font-600 mb-2" style={{ color:'var(--text-900)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:'var(--text-500)' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* PayTech banner */}
        <div className="mt-12 p-7 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
          style={{ background:'linear-gradient(135deg,#EEF2FF,#F5F3FF)', border:'1px solid #C7D2FE' }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background:'var(--grad-cta)' }}>
            <Shield size={24} color="#fff" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-700 text-xl mb-1" style={{ color:'var(--text-900)' }}>
              Paiement 100% sécurisé via PayTech.sn
            </h3>
            <p className="text-sm" style={{ color:'var(--text-500)' }}>
              PayTech.sn — la référence fintech d'Afrique de l'Ouest. Transactions chiffrées SSL. Prix en{' '}
              <strong style={{ color:'var(--text-700)' }}>FCFA</strong>. Aucune information bancaire stockée.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end flex-shrink-0">
            {['PayTech','Orange Money','Wave','Visa','Mastercard'].map(m => (
              <span key={m} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ background:'var(--bg-white)', border:'1px solid var(--border)', color:'var(--text-500)' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
