import React, { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Shield, Bell } from 'lucide-react';

const tabs = [
  { id: 'profile',  icon: User,    label: 'Mon profil' },
  { id: 'orders',   icon: Package, label: 'Mes commandes' },
  { id: 'wishlist', icon: Heart,   label: 'Mes favoris' },
  { id: 'security', icon: Shield,  label: 'Sécurité' },
  { id: 'notifs',   icon: Bell,    label: 'Notifications' },
];

export default function Account() {
  const [active] = useState('profile');
  const [logged] = useState(false);

  if (!logged) return (
    <main className="min-h-screen pt-24 flex items-center justify-center px-6" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-sm w-full">
        <div className="text-center mb-7">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: '#EEF2FF' }}>
            <User size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <h1 className="font-heading font-700 text-3xl mb-1" style={{ color: 'var(--text-900)' }}>Connexion</h1>
          <p style={{ color: 'var(--text-400)' }}>Accédez à votre compte TrendyShop</p>
        </div>
        <div className="card p-6 flex flex-col gap-4">
          {[['Email', 'email', 'amadou@email.com'], ['Mot de passe', 'password', '••••••••']].map(([label, type, placeholder]) => (
            <div key={label}>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-700)' }}>{label}</label>
              <input type={type} placeholder={placeholder} defaultValue="" className="input-field" />
            </div>
          ))}
          <button className="btn-primary w-full justify-center">Se connecter</button>
          <div className="divider" />
          <button className="btn-outline w-full justify-center">Créer un compte</button>
          <a href="#" className="text-center text-xs" style={{ color: 'var(--text-400)' }}>Mot de passe oublié ?</a>
        </div>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10">
        <h1 className="font-heading font-700 text-3xl mb-8" style={{ color: 'var(--text-900)' }}>Mon Compte</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-3 h-fit">
            {tabs.map(t => (
              <button key={t.id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left border"
                style={{
                  background:   active === t.id ? '#EEF2FF' : 'transparent',
                  color:        active === t.id ? 'var(--primary)' : 'var(--text-500)',
                  borderColor:  active === t.id ? '#C7D2FE' : 'transparent',
                  marginBottom: '2px',
                }}>
                <t.icon size={15} />
                <span className="flex-1">{t.label}</span>
                <ChevronRight size={13} style={{ opacity: 0.4 }} />
              </button>
            ))}
            <div className="divider my-2" />
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors"
              style={{ color: 'var(--danger)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FEF2F2'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
              <LogOut size={15} /> Déconnexion
            </button>
          </div>
          <div className="md:col-span-3 card p-6">
            <p className="font-heading font-700 text-xl mb-3" style={{ color: 'var(--text-900)' }}>
              {tabs.find(t => t.id === active)?.label}
            </p>
            <p style={{ color: 'var(--text-400)' }}>
              Connectez-vous pour accéder à toutes les fonctionnalités.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
