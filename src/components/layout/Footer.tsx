import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--void)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Newsletter Section */}
      <div
        className="py-16 px-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-mono mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>
            NEWSLETTER
          </p>
          <h3 className="font-display text-4xl mb-4" style={{ color: 'var(--ivory)' }}>
            Restez dans la tendance
          </h3>
          <p className="text-sm mb-8" style={{ color: 'var(--silver)' }}>
            Recevez en exclusivité nos nouvelles collections, offres spéciales et conseils style.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="input-field flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              S'inscrire <ArrowRight size={14} />
            </button>
          </div>
          <p className="mt-4 text-xs" style={{ color: 'var(--mist)' }}>
            Aucun spam. Désabonnement en un clic. 🔒 RGPD conforme.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--gradient-gold)' }}
              >
                <span className="text-obsidian font-mono font-bold text-sm">TS</span>
              </div>
              <span className="font-display text-2xl" style={{ color: 'var(--ivory)' }}>
                Trendy<span style={{ color: 'var(--gold)' }}>Shop</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--ash)' }}>
              La boutique premium pour les produits tech, mode et lifestyle les plus tendances du moment.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:border-gold/30"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--silver)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#c9a85c';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,92,0.3)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--silver)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body font-semibold text-sm mb-6" style={{ color: 'var(--pearl)', letterSpacing: '0.05em' }}>
              BOUTIQUE
            </h4>
            <ul className="flex flex-col gap-3">
              {['Nouveautés', 'Tech & Gadgets', 'Mode & Style', 'Maison & Déco', 'Sport & Fitness', 'Promotions'].map(item => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-sm transition-colors duration-200 hover:text-gold"
                    style={{ color: 'var(--ash)' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-body font-semibold text-sm mb-6" style={{ color: 'var(--pearl)', letterSpacing: '0.05em' }}>
              SUPPORT
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'FAQ', path: '/faq' },
                { label: 'Livraison & Retours', path: '/shipping' },
                { label: 'Suivi de commande', path: '/tracking' },
                { label: 'Politique de confidentialité', path: '/privacy' },
                { label: 'Conditions générales', path: '/terms' },
                { label: 'Contact', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--ash)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a85c'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--ash)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-sm mb-6" style={{ color: 'var(--pearl)', letterSpacing: '0.05em' }}>
              CONTACT
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { icon: Mail, text: 'support@trendyshop.sn' },
                { icon: Phone, text: '+221 77 XXX XX XX' },
                { icon: MapPin, text: 'Dakar, Sénégal' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: 'var(--ash)' }}>{text}</span>
                </li>
              ))}
            </ul>

            {/* Payment methods */}
            <div className="mt-8">
              <p className="text-xs mb-3 font-mono" style={{ color: 'var(--mist)', letterSpacing: '0.1em' }}>
                PAIEMENTS ACCEPTÉS
              </p>
              <div className="flex flex-wrap gap-2">
                {['PayTech', 'Orange Money', 'Wave', 'Visa', 'Mastercard'].map(method => (
                  <span
                    key={method}
                    className="text-xs px-2 py-1 rounded font-mono"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--ash)',
                    }}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="px-6 py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--mist)' }}>
            © 2024 TrendyShop. Tous droits réservés. Fait avec ♥ au Sénégal.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs hover:text-gold transition-colors" style={{ color: 'var(--mist)' }}>
              Confidentialité
            </Link>
            <Link to="/terms" className="text-xs hover:text-gold transition-colors" style={{ color: 'var(--mist)' }}>
              CGV
            </Link>
            <span className="text-xs font-mono" style={{ color: 'var(--mist)' }}>
              🔒 SSL Sécurisé
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
