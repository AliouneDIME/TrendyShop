import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { id:1, name:'Amadou Diallo',   loc:'Dakar',       av:'AD', rating:5, comment:'Commande reçue en 24h parfaitement emballée. Les écouteurs sont de qualité premium. Le paiement Orange Money était simple. Je recommande vivement TrendyShop !',       product:'Écouteurs Pro Max ANC',   date:'3 jours' },
  { id:2, name:'Fatou Ndiaye',    loc:'Saint-Louis',  av:'FN', rating:5, comment:'La montre connectée est exactement comme décrite. Le paiement Wave en FCFA sans surprise. La livraison a été plus rapide que prévu. Service client au top !',              product:'Montre Connectée Elite',  date:'1 semaine' },
  { id:3, name:'Moussa Seck',     loc:'Thiès',        av:'MS', rating:5, comment:'Le popup PayTech est simple et sécurisé. J\'ai choisi Orange Money en 30 secondes. Produit authentique, livraison soignée. TrendyShop c\'est sérieux.',                   product:'Tablette Ultra HD 10"',  date:'2 semaines' },
  { id:4, name:'Aissatou Ba',     loc:'Ziguinchor',   av:'AB', rating:5, comment:'Sneakers identiques aux photos, taille parfaite. Le prix en FCFA affiché clairement, sans conversion surprenante. Retour facile car j\'ai changé de taille. Merci !',    product:'Sneakers Luxury Edition', date:'1 mois' },
  { id:5, name:'Ibrahim Touré',   loc:'Kaolack',      av:'IT', rating:5, comment:'Support client a résolu mon problème en moins de 2h. C\'est rare ce niveau de réactivité. La qualité des produits est au rendez-vous. TrendyShop est ma boutique N°1 !',  product:'Drone 4K Pro',            date:'2 mois' },
];

const avatarColors = ['#6366F1','#EC4899','#10B981','#F59E0B','#8B5CF6'];

export default function TestimonialsSection() {
  const [cur, setCur] = useState(0);
  const visible = [testimonials[cur], testimonials[(cur+1)%testimonials.length], testimonials[(cur+2)%testimonials.length]];

  return (
    <section className="py-20" style={{ background:'var(--bg-soft)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-label">Avis clients vérifiés</div>
            <h2 className="font-heading font-700 mt-2" style={{ color:'var(--text-900)', fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              Ils nous font <span className="text-gradient">confiance</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCur(i => (i-1+testimonials.length)%testimonials.length)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 border"
              style={{ background:'var(--bg-white)', borderColor:'var(--border)', color:'var(--text-500)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--primary)'; (e.currentTarget as HTMLElement).style.color='var(--primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.color='var(--text-500)'; }}>
              <ChevronLeft size={16}/>
            </button>
            <button onClick={() => setCur(i => (i+1)%testimonials.length)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background:'var(--primary)', color:'#fff', boxShadow:'var(--shadow-primary)' }}>
              <ChevronRight size={16}/>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div key={t.id} className="rounded-2xl p-6 transition-all duration-300"
              style={{
                background:'var(--bg-white)',
                border:`1px solid ${i===1?'#C7D2FE':'var(--border)'}`,
                boxShadow: i===1 ? 'var(--shadow-lg)' : 'var(--shadow-xs)',
                transform: i===1 ? 'translateY(-4px) scale(1.01)' : 'scale(0.98)',
                opacity: i===1 ? 1 : 0.7,
              }}>
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({length:5}).map((_,si) => (
                  <Star key={si} size={14} fill={si<t.rating?'#F59E0B':'none'}
                    style={{color:si<t.rating?'#F59E0B':'#CBD5E1'}}/>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color:'var(--text-500)' }}>"{t.comment}"</p>
              <div className="flex items-center gap-1.5 mb-4 text-xs px-2.5 py-1.5 rounded-lg"
                style={{ background:'#EEF2FF', color:'var(--primary)', width:'fit-content' }}>
                <span>✦</span> {t.product}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor:'var(--border)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: avatarColors[t.id % avatarColors.length] }}>
                  {t.av}
                </div>
                <div className="flex-1">
                  <p className="font-heading font-600 text-sm" style={{ color:'var(--text-900)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color:'var(--text-400)' }}>{t.loc} · il y a {t.date}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background:'#ECFDF5', color:'#059669', border:'1px solid #A7F3D0' }}>
                  ✓ Vérifié
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {testimonials.map((_,i) => (
            <button key={i} onClick={() => setCur(i)}
              className="rounded-full transition-all duration-200"
              style={{ width:i===cur?'24px':'8px', height:'8px', background:i===cur?'var(--primary)':'var(--border)' }}/>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{v:'4.9/5',l:'Note moyenne',s:'Sur 2 847 avis vérifiés'},{v:'98%',l:'Recommandent',s:'Le taux de satisfaction'},{v:'50K+',l:'Commandes',s:'Livrées en Afrique de l\'Ouest'}].map(({v,l,s})=>(
            <div key={l} className="text-center p-5 rounded-2xl" style={{ background:'var(--bg-white)', border:'1px solid var(--border)', boxShadow:'var(--shadow-xs)' }}>
              <p className="font-heading font-700 text-3xl text-gradient mb-1">{v}</p>
              <p className="font-600 text-sm mb-0.5" style={{ color:'var(--text-700)' }}>{l}</p>
              <p className="text-xs" style={{ color:'var(--text-400)' }}>{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
