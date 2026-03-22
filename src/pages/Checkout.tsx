import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, CheckCircle, ArrowRight, ArrowLeft, Loader, CreditCard, Smartphone, Zap } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { generatePaymentRef } from '../services/paytech';

type Step = 'info' | 'payment' | 'confirm';
type PayMethod = 'paytech' | 'orange' | 'wave';

const payMethods: { id: PayMethod; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
  {
    id: 'paytech',
    label: 'PayTech',
    desc: 'Carte Visa, Mastercard & plus',
    icon: <CreditCard size={20} />,
    color: '#4f6ef7',
  },
  {
    id: 'orange',
    label: 'Orange Money',
    desc: 'Paiement mobile Orange',
    icon: <Smartphone size={20} />,
    color: '#f97316',
  },
  {
    id: 'wave',
    label: 'Wave',
    desc: 'Portefeuille Wave',
    icon: <Zap size={20} />,
    color: '#06b6d4',
  },
];

export default function Checkout() {
  const { state, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('info');
  const [loading, setLoading] = useState(false);
  const [payMethod, setPayMethod] = useState<PayMethod>('paytech');
  const [phone, setPhone] = useState('');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'Sénégal',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = state.total >= 50 ? 0 : 5.99;
  const grandTotal = state.total + shipping;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Prénom requis';
    if (!form.lastName.trim()) e.lastName = 'Nom requis';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Email invalide';
    if (!form.phone.trim()) e.phone = 'Téléphone requis';
    if (!form.address.trim()) e.address = 'Adresse requise';
    if (!form.city.trim()) e.city = 'Ville requise';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInfoNext = () => {
    if (validate()) setStep('payment');
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (payMethod === 'paytech') {
        // Call our secure backend proxy (never expose keys client-side)
        const ref = generatePaymentRef();
        const res = await fetch('/api/payment/paytech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ref,
            amount: Math.round(grandTotal * 655.957), // EUR → XOF
            item_name: `Commande TrendyShop ${ref}`,
            buyer_name: `${form.firstName} ${form.lastName}`,
            buyer_email: form.email,
            buyer_phone: form.phone,
            items: state.items.map(i => ({ name: i.name, qty: i.quantity, price: i.price })),
          }),
        });

        if (!res.ok) throw new Error('Erreur serveur');
        const data = await res.json();

        if (data.success && data.redirect_url) {
          clearCart();
          window.location.href = data.redirect_url;
        } else {
          throw new Error(data.errors?.join(', ') || 'Erreur de paiement');
        }
      } else {
        // Orange Money / Wave simulation
        if (!phone.match(/^(221)?[0-9]{9}$/)) {
          addToast({ type: 'error', message: 'Numéro de téléphone invalide', duration: 3000 });
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/payment/${payMethod}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Math.round(grandTotal * 655.957), phone }),
        });
        if (!res.ok) throw new Error('Erreur paiement mobile');
        const data = await res.json();
        if (data.success) {
          clearCart();
          navigate('/success?ref=' + (data.ref || 'TS-' + Date.now()));
        } else {
          throw new Error(data.message || 'Échec du paiement');
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      addToast({ type: 'error', message, duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const Field = ({ label, name, type = 'text', placeholder }: { label: string; name: keyof typeof form; type?: string; placeholder?: string }) => (
    <div>
      <label className="text-xs font-mono mb-1.5 block" style={{ color: 'var(--gold)', letterSpacing: '0.08em' }}>{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: '' })); }}
        placeholder={placeholder}
        className="input-field"
        style={{ borderColor: errors[name] ? 'rgba(244,63,94,0.5)' : undefined }}
      />
      {errors[name] && <p className="text-xs mt-1" style={{ color: '#fb7185' }}>{errors[name]}</p>}
    </div>
  );

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: 'var(--obsidian)' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => step === 'info' ? navigate('/cart') : setStep('info')}
            className="p-2 rounded-xl transition-all hover:bg-white/5" style={{ color: 'var(--silver)' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display text-3xl" style={{ color: 'var(--ivory)' }}>Finaliser la commande</h1>
            <div className="flex items-center gap-3 mt-2">
              {(['info', 'payment', 'confirm'] as Step[]).map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all"
                      style={{
                        background: step === s ? 'var(--gradient-gold)' : ((['info', 'payment', 'confirm'].indexOf(step) > i) ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.08)'),
                        color: step === s ? 'var(--obsidian)' : ((['info', 'payment', 'confirm'].indexOf(step) > i) ? '#34d399' : 'var(--ash)'),
                      }}>
                      {['info', 'payment', 'confirm'].indexOf(step) > i ? <CheckCircle size={12} /> : i + 1}
                    </div>
                    <span className="text-xs hidden sm:block" style={{ color: step === s ? 'var(--ivory)' : 'var(--ash)' }}>
                      {s === 'info' ? 'Informations' : s === 'payment' ? 'Paiement' : 'Confirmation'}
                    </span>
                  </div>
                  {i < 2 && <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Step 1: Info */}
            {step === 'info' && (
              <div className="rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="font-display text-2xl mb-6" style={{ color: 'var(--ivory)' }}>Informations de livraison</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="PRÉNOM" name="firstName" placeholder="Amadou" />
                  <Field label="NOM" name="lastName" placeholder="Diallo" />
                  <Field label="EMAIL" name="email" type="email" placeholder="amadou@email.com" />
                  <Field label="TÉLÉPHONE" name="phone" type="tel" placeholder="+221 77 XXX XX XX" />
                  <div className="sm:col-span-2">
                    <Field label="ADRESSE" name="address" placeholder="123 Rue de la Paix" />
                  </div>
                  <Field label="VILLE" name="city" placeholder="Dakar" />
                  <Field label="CODE POSTAL" name="postalCode" placeholder="10000" />
                  <div className="sm:col-span-2">
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: 'var(--gold)', letterSpacing: '0.08em' }}>PAYS</label>
                    <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} className="input-field">
                      <option>Sénégal</option>
                      <option>Côte d'Ivoire</option>
                      <option>Mali</option>
                      <option>Guinée</option>
                      <option>Burkina Faso</option>
                      <option>France</option>
                    </select>
                  </div>
                </div>
                <button onClick={handleInfoNext} className="btn-primary mt-6 w-full justify-center">
                  Continuer vers le paiement <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <div className="rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="font-display text-2xl mb-6" style={{ color: 'var(--ivory)' }}>Choisir le paiement</h2>

                <div className="flex flex-col gap-3 mb-6">
                  {payMethods.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      className="flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                      style={{
                        background: payMethod === m.id ? `${m.color}10` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${payMethod === m.id ? m.color + '40' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: payMethod === m.id ? `${m.color}20` : 'rgba(255,255,255,0.05)', color: payMethod === m.id ? m.color : 'var(--ash)' }}>
                        {m.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-body font-semibold text-sm" style={{ color: 'var(--ivory)' }}>{m.label}</p>
                        <p className="text-xs" style={{ color: 'var(--ash)' }}>{m.desc}</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                        style={{ borderColor: payMethod === m.id ? m.color : 'rgba(255,255,255,0.2)' }}>
                        {payMethod === m.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Phone field for mobile payments */}
                {(payMethod === 'orange' || payMethod === 'wave') && (
                  <div className="mb-6 animate-slide-up">
                    <label className="text-xs font-mono mb-1.5 block" style={{ color: 'var(--gold)', letterSpacing: '0.08em' }}>
                      NUMÉRO {payMethod === 'orange' ? 'ORANGE MONEY' : 'WAVE'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+221 77 XXX XX XX"
                      className="input-field"
                    />
                    <p className="text-xs mt-2" style={{ color: 'var(--ash)' }}>
                      Un code de confirmation vous sera envoyé par SMS.
                    </p>
                  </div>
                )}

                {payMethod === 'paytech' && (
                  <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(79,110,247,0.06)', border: '1px solid rgba(79,110,247,0.2)' }}>
                    <div className="flex items-start gap-3">
                      <Lock size={16} style={{ color: '#818cf8', flexShrink: 0, marginTop: 2 }} />
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--silver)' }}>
                        Vous serez redirigé vers la plateforme sécurisée <strong style={{ color: '#818cf8' }}>PayTech.sn</strong> pour finaliser votre paiement. Vos informations bancaires sont cryptées SSL et ne transitent jamais par nos serveurs.
                      </p>
                    </div>
                  </div>
                )}

                {/* Security badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {['SSL 256-bit', 'HTTPS', '3D Secure', 'RGPD'].map(b => (
                    <span key={b} className="flex items-center gap-1 text-xs px-2 py-1 rounded font-mono" style={{ background: 'rgba(16,185,129,0.08)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                      <Shield size={10} /> {b}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: loading ? 0.8 : 1 }}
                >
                  {loading ? (
                    <><Loader size={16} className="animate-spin" /> Traitement en cours...</>
                  ) : (
                    <><Lock size={16} /> Payer {grandTotal.toFixed(2)} € en toute sécurité</>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl p-5 sticky top-28" style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-display text-lg mb-4" style={{ color: 'var(--ivory)' }}>Votre commande</h3>
              <div className="flex flex-col gap-3 mb-4">
                {state.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                        style={{ background: 'var(--gradient-gold)', color: 'var(--obsidian)', fontSize: '9px' }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-body truncate" style={{ color: 'var(--silver)' }}>{item.name}</p>
                    </div>
                    <span className="font-mono text-sm font-bold flex-shrink-0" style={{ color: 'var(--ivory)' }}>
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px my-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--silver)' }}>Sous-total</span>
                  <span className="font-mono" style={{ color: 'var(--ivory)' }}>{state.total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--silver)' }}>Livraison</span>
                  <span className="font-mono" style={{ color: shipping === 0 ? '#34d399' : 'var(--ivory)' }}>
                    {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}
                  </span>
                </div>
                <div className="h-px my-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="flex justify-between">
                  <span className="font-body font-semibold text-sm" style={{ color: 'var(--ivory)' }}>Total</span>
                  <span className="font-mono font-bold text-xl" style={{ color: 'var(--gold)' }}>{grandTotal.toFixed(2)} €</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--ash)' }}>
                  ≈ {Math.round(grandTotal * 655.957).toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
