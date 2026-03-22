import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export default function Contact() {
  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      <div className="py-12 px-5 lg:px-8 border-b" style={{ background: 'var(--bg-white)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="section-label mb-3">Contactez-nous</div>
          <h1 className="font-heading font-700" style={{ color: 'var(--text-900)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
            On est là pour <span className="text-gradient">vous aider</span>
          </h1>
          <p className="mt-2" style={{ color: 'var(--text-400)' }}>Réponse garantie en moins de 2h, 7j/7.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Mail,   label: 'Email',    value: 'support@trendyshop.sn', color: '#6366F1', bg: '#EEF2FF' },
              { icon: Phone,  label: 'Téléphone',value: '+221 77 XXX XX XX',      color: '#10B981', bg: '#ECFDF5' },
              { icon: MapPin, label: 'Adresse',  value: 'Dakar, Sénégal',         color: '#F59E0B', bg: '#FFFBEB' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="card p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-400)' }}>{label}</p>
                  <p className="font-heading font-600" style={{ color: 'var(--text-900)' }}>{value}</p>
                </div>
              </div>
            ))}

            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} style={{ color: 'var(--primary)' }} />
                <p className="font-heading font-600" style={{ color: 'var(--text-900)' }}>Horaires support</p>
              </div>
              {[['Lun – Ven', '8h – 20h'], ['Samedi', '9h – 17h'], ['Dimanche', '10h – 16h']].map(([day, hrs]) => (
                <div key={day} className="flex justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-500)' }}>{day}</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-900)' }}>{hrs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card p-6">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#ECFDF5' }}>
                  <CheckCircle size={32} style={{ color: '#059669' }} />
                </div>
                <h3 className="font-heading font-700 text-2xl" style={{ color: 'var(--text-900)' }}>Message envoyé !</h3>
                <p style={{ color: 'var(--text-400)' }}>Nous vous répondrons dans les 2 heures.</p>
                <button onClick={() => setSent(false)} className="btn-outline mt-2">Nouveau message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="font-heading font-700 text-xl mb-2" style={{ color: 'var(--text-900)' }}>
                  Envoyez-nous un message
                </h2>
                {[
                  { ref: nameRef,    label: 'Nom complet', placeholder: 'Amadou Diallo',      type: 'text'  },
                  { ref: emailRef,   label: 'Email',       placeholder: 'amadou@email.com',    type: 'email' },
                  { ref: subjectRef, label: 'Sujet',       placeholder: 'Ma question concerne…',type: 'text' },
                ].map(({ ref, label, placeholder, type }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-700)' }}>{label}</label>
                    <input ref={ref} type={type} placeholder={placeholder} defaultValue="" required className="input-field" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-700)' }}>Message</label>
                  <textarea ref={messageRef} placeholder="Décrivez votre question…" rows={5} defaultValue="" required className="input-field resize-none" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary justify-center">
                  {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Envoi…</> : <><Send size={14} />Envoyer</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
