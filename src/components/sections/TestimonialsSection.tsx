import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Amadou Diallo', role: 'Client vérifié', rating: 5, location: 'Dakar', avatar: 'AD', comment: 'Service exceptionnel ! Ma commande est arrivée en 24h parfaitement emballée. Les écouteurs sont de qualité premium. Je recommande vivement TrendyShop pour tous vos achats tech.', product: 'Écouteurs Pro Max ANC', date: 'Il y a 3 jours' },
  { id: 2, name: 'Fatou Ndiaye', role: 'Cliente fidèle', rating: 5, location: 'Saint-Louis', avatar: 'FN', comment: 'J\'ai commandé la montre connectée et je suis bluffée par la qualité. Le paiement via Orange Money était super simple et sécurisé. TrendyShop est désormais ma boutique préférée !', product: 'Montre Connectée Elite', date: 'Il y a 1 semaine' },
  { id: 3, name: 'Moussa Seck', role: 'Client vérifié', rating: 5, location: 'Thiès', avatar: 'MS', comment: 'Très bonne expérience d\'achat. Le site est rapide, les produits sont authentiques et le service client m\'a aidé à choisir le bon produit. Livraison rapide et soignée.', product: 'Tablette Ultra HD 10"', date: 'Il y a 2 semaines' },
  { id: 4, name: 'Aissatou Ba', role: 'Cliente vérifiée', rating: 5, location: 'Ziguinchor', avatar: 'AB', comment: 'Les sneakers sont arrivées exactement comme sur les photos. Qualité au rendez-vous et taille parfaite. Le paiement Wave était instantané. J\'ai déjà passé une 2ème commande !', product: 'Sneakers Luxury Edition', date: 'Il y a 1 mois' },
  { id: 5, name: 'Ibrahim Touré', role: 'Client vérifié', rating: 5, location: 'Kaolack', avatar: 'IT', comment: 'J\'ai eu un souci avec ma commande et le support client a résolu le problème en moins de 2h. C\'est rare de voir un tel niveau de service en Afrique de l\'Ouest. Bravo TrendyShop !', product: 'Drone 4K Pro', date: 'Il y a 2 mois' },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(i => (i + 1) % testimonials.length);

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="py-24 overflow-hidden" style={{ background: 'var(--carbon)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-mono mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>AVIS CLIENTS</p>
            <h2 className="font-display leading-none" style={{ color: 'var(--ivory)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Ils nous font{' '}
              <span style={{ background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                confiance
              </span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={prev} className="w-11 h-11 rounded-xl flex items-center justify-center transition-all" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--silver)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,92,0.4)'; (e.currentTarget as HTMLElement).style.color = '#c9a85c'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--silver)'; }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="w-11 h-11 rounded-xl flex items-center justify-center transition-all" style={{ background: 'var(--gradient-gold)', color: 'var(--obsidian)' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <div
              key={t.id}
              className="card p-6 relative"
              style={{
                opacity: i === 1 ? 1 : 0.6,
                transform: i === 1 ? 'scale(1.02)' : 'scale(0.98)',
                transition: 'all 0.4s ease',
                borderColor: i === 1 ? 'rgba(201,168,92,0.2)' : 'rgba(255,255,255,0.06)',
              }}
            >
              <Quote size={24} style={{ color: 'var(--gold)', opacity: 0.3 }} className="mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={14} fill={si < t.rating ? 'var(--gold)' : 'none'} style={{ color: si < t.rating ? 'var(--gold)' : 'var(--mist)' }} />
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--silver)' }}>"{t.comment}"</p>

              {/* Product */}
              <div className="mb-5 px-3 py-2 rounded-lg text-xs font-mono" style={{ background: 'rgba(201,168,92,0.06)', border: '1px solid rgba(201,168,92,0.12)', color: 'var(--gold)' }}>
                ✦ {t.product}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm flex-shrink-0" style={{ background: 'var(--gradient-gold)', color: 'var(--obsidian)' }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm" style={{ color: 'var(--ivory)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--ash)' }}>{t.location} · {t.date}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs px-2 py-1 rounded font-mono" style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>✓ Vérifié</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                background: i === current ? 'var(--gold)' : 'var(--steel)',
              }}
            />
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: '4.9/5', label: 'Note moyenne', sub: 'Sur 2 847 avis' },
            { value: '98%', label: 'Clients satisfaits', sub: 'Recommandent TrendyShop' },
            { value: '50K+', label: 'Commandes livrées', sub: 'Dans toute l\'Afrique de l\'Ouest' },
          ].map(({ value, label, sub }) => (
            <div key={label}>
              <div className="font-mono font-bold text-3xl mb-1" style={{ background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{value}</div>
              <div className="font-body font-semibold text-sm mb-0.5" style={{ color: 'var(--ivory)' }}>{label}</div>
              <div className="text-xs" style={{ color: 'var(--ash)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
