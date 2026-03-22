import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  { cat: 'Commandes',  q: 'Comment passer une commande ?',               a: 'Ajoutez vos articles au panier, cliquez "Commander" et remplissez vos informations. Le popup PayTech sécurisé s\'ouvrira pour choisir votre moyen de paiement (Orange Money, Wave, Carte…).' },
  { cat: 'Paiement',   q: 'Quels modes de paiement acceptez-vous ?',    a: 'PayTech, Orange Money, Wave, Visa, Mastercard, Free Money, Joni Joni. Tous les paiements sont affichés en FCFA. Aucun frais caché.' },
  { cat: 'Paiement',   q: 'Le paiement est-il sécurisé ?',              a: 'Oui, 100%. PayTech.sn utilise un cryptage SSL 256-bit. Vos informations bancaires ne transitent jamais par nos serveurs.' },
  { cat: 'Livraison',  q: 'Quels sont les délais de livraison ?',       a: 'Livraison express 24-48h dans tout le Sénégal. Dakar et banlieue : souvent le lendemain avant midi.' },
  { cat: 'Livraison',  q: 'La livraison est-elle gratuite ?',           a: 'Gratuite pour toute commande supérieure à 32 780 FCFA (≈50€). En dessous, des frais de 3 929 FCFA s\'appliquent.' },
  { cat: 'Retours',    q: 'Puis-je retourner un article ?',             a: '30 jours pour retourner un article en parfait état dans son emballage d\'origine. Les retours sont gratuits.' },
  { cat: 'Retours',    q: 'Comment obtenir un remboursement ?',         a: 'Dès réception et vérification du retour, remboursement sous 5-7 jours ouvrés sur votre moyen de paiement initial.' },
  { cat: 'Compte',     q: 'Dois-je créer un compte pour commander ?',   a: 'Non, vous pouvez commander en tant qu\'invité. Un compte vous permet de suivre vos commandes et sauvegarder vos favoris.' },
  { cat: 'Produits',   q: 'Les produits sont-ils authentiques ?',       a: '100% authentiques, sourcés directement auprès des marques ou de leurs distributeurs officiels. Garantie qualité.' },
];

const cats = ['Tous', ...Array.from(new Set(faqs.map(f => f.cat)))];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [catF,   setCatF]   = useState('Tous');
  const [open,   setOpen]   = useState<number | null>(null);

  const visible = faqs.filter(f =>
    (catF === 'Tous' || f.cat === catF) &&
    (!search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      <div className="py-12 px-5 lg:px-8 border-b" style={{ background: 'var(--bg-white)', borderColor: 'var(--border)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="section-label mx-auto mb-3" style={{ display: 'inline-flex' }}>FAQ</div>
          <h1 className="font-heading font-700 mb-5" style={{ color: 'var(--text-900)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
            Questions <span className="text-gradient">fréquentes</span>
          </h1>
          <div className="relative max-w-md mx-auto">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-300)' }} />
            <input type="text" placeholder="Rechercher une question…" value={search}
              onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {cats.map(c => (
              <button key={c} onClick={() => setCatF(c)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border"
                style={{
                  background:  catF === c ? 'var(--primary)' : 'var(--bg-white)',
                  color:       catF === c ? '#fff' : 'var(--text-500)',
                  borderColor: catF === c ? 'var(--primary)' : 'var(--border)',
                }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-12">
        <div className="flex flex-col gap-3">
          {visible.map((faq, i) => (
            <div key={i} className="rounded-2xl border overflow-hidden transition-all duration-200"
              style={{
                background:   'var(--bg-white)',
                borderColor:  open === i ? 'var(--primary)' : 'var(--border)',
                boxShadow:    open === i ? '0 0 0 3px rgba(99,102,241,0.08)' : 'var(--shadow-xs)',
              }}>
              <button className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}>
                <div className="flex items-center gap-3">
                  <span className="badge badge-new flex-shrink-0">{faq.cat}</span>
                  <span className="font-heading font-600 text-sm" style={{ color: 'var(--text-900)' }}>{faq.q}</span>
                </div>
                <ChevronDown size={16} className="flex-shrink-0 transition-transform duration-200"
                  style={{ color: 'var(--text-400)', transform: open === i ? 'rotate(180deg)' : 'none' }} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 animate-slide-up">
                  <div className="divider mb-4" />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-500)' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
          {visible.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'var(--text-400)' }}>Aucune question trouvée pour "{search}"</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 p-7 rounded-2xl text-center"
          style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
          <MessageCircle size={28} className="mx-auto mb-3" style={{ color: 'var(--primary)' }} />
          <h3 className="font-heading font-700 text-xl mb-2" style={{ color: 'var(--text-900)' }}>
            Votre question n'est pas là ?
          </h3>
          <p className="mb-5 text-sm" style={{ color: 'var(--text-500)' }}>
            Notre équipe est disponible 7j/7 pour vous aider.
          </p>
          <Link to="/contact" className="btn-primary">Nous contacter →</Link>
        </div>
      </div>
    </main>
  );
}
