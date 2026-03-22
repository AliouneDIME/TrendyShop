import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background:'var(--bg-dark)', color:'var(--text-200)' }}>
      {/* Newsletter */}
      <div className="py-14 px-6 border-b" style={{ borderColor:'rgba(255,255,255,0.07)' }}>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color:'var(--accent)' }}>Newsletter</p>
          <h3 className="font-heading font-700 text-3xl mb-3 text-white">Restez dans la tendance</h3>
          <p className="text-sm mb-6" style={{ color:'var(--text-300)' }}>Offres exclusives et nouveautés en avant-première.</p>
          <div className="flex gap-3">
            <input type="email" placeholder="votre@email.com" className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'white', fontFamily:'var(--font-body)' }}/>
            <button className="btn-accent whitespace-nowrap">S'inscrire <ArrowRight size={14}/></button>
          </div>
          <p className="mt-3 text-xs" style={{ color:'#475569' }}>Désabonnement en 1 clic. RGPD conforme.</p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm text-white"
                style={{ background:'var(--grad-cta)' }}>TS</div>
              <span className="font-heading font-700 text-xl text-white">Trendy<span style={{ color:'var(--primary-light)' }}>Shop</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color:'var(--text-400)' }}>
              La boutique e-commerce premium au Sénégal. Paiements en FCFA, livraison express.
            </p>
            <div className="flex gap-2.5">
              {[Instagram,Twitter,Youtube].map((Icon,i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', color:'#94A3B8' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#818CF8'; (e.currentTarget as HTMLElement).style.borderColor='rgba(99,102,241,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='#94A3B8'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.1)'; }}>
                  <Icon size={15}/>
                </a>
              ))}
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-wider text-white">Boutique</h4>
            <ul className="flex flex-col gap-2.5">
              {['Nouveautés','Tech & Gadgets','Mode & Style','Maison & Déco','Sport & Fitness','Promotions'].map(item => (
                <li key={item}>
                  <Link to="/shop" className="text-sm transition-colors duration-150" style={{ color:'#64748B' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='#818CF8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='#64748B'}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-wider text-white">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {[['FAQ','/faq'],['Livraison','/shop'],['Retours','/shop'],['Confidentialité','/shop'],['CGV','/shop'],['Contact','/contact']].map(([l,p]) => (
                <li key={l}>
                  <Link to={p} className="text-sm transition-colors duration-150" style={{ color:'#64748B' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='#818CF8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='#64748B'}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-wider text-white">Contact</h4>
            <ul className="flex flex-col gap-3.5">
              {[[Mail,'support@trendyshop.sn'],[Phone,'+221 77 XXX XX XX'],[MapPin,'Dakar, Sénégal']].map(([Icon,txt],i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span><Icon size={14} style={{ color:'var(--primary-light)' }}/></span>
                  <span className="text-sm" style={{ color:'#64748B' }}>{txt as string}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color:'#475569' }}>Paiements FCFA</p>
              <div className="flex flex-wrap gap-1.5">
                {['PayTech','Orange Money','Wave','Visa','MC'].map(m => (
                  <span key={m} className="text-xs px-2 py-0.5 rounded"
                    style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#64748B' }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-6 py-4 border-t" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color:'#475569' }}>© 2024 TrendyShop. Tous droits réservés. Fait avec ♥ au Sénégal.</p>
          <div className="flex items-center gap-1.5 text-xs" style={{ color:'#475569' }}>
            <Shield size={11} style={{ color:'#059669' }}/> SSL Sécurisé · Paiements en FCFA
          </div>
        </div>
      </div>
    </footer>
  );
}
