import React, { useRef } from 'react';
import { ArrowRight, Gift, Zap, Shield } from 'lucide-react';

export default function NewsletterCTA() {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      alert(`Merci ! Vous êtes inscrit avec ${emailRef.current.value}`);
      emailRef.current.value = '';
    }
  };

  return (
    <section className="py-20 px-5 lg:px-8" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', boxShadow: '0 24px 48px rgba(79,70,229,0.3)' }}>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.06)', transform: 'translate(30%,-30%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.04)', transform: 'translate(-30%,30%)' }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Gift size={14} style={{ color: '#FCD34D' }} />
              <span className="text-xs font-bold text-white" style={{ letterSpacing: '.08em' }}>
                −10% SUR VOTRE 1ère COMMANDE
              </span>
            </div>

            <h2 className="font-heading font-700 text-3xl md:text-4xl mb-3 text-white">
              Rejoignez la communauté TrendyShop
            </h2>
            <p className="mb-8 text-base" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 2rem' }}>
              Offres exclusives, nouveautés et conseils — directement dans votre boîte mail.
              Paiements toujours en <strong style={{ color: '#FCD34D' }}>FCFA</strong>.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input
                ref={emailRef}
                type="email"
                placeholder="votre@email.com"
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none font-body"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  color: 'white',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
              />
              <button type="submit" className="btn-accent whitespace-nowrap">
                S'inscrire <ArrowRight size={14} />
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-5">
              {[
                { icon: Zap,    text: 'Offres en avant-première' },
                { icon: Shield, text: 'Aucun spam, désabo en 1 clic' },
                { icon: Gift,   text: '−10% dès l\'inscription' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <Icon size={12} style={{ color: '#FCD34D' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
