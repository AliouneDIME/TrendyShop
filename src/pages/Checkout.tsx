import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, ArrowRight, ArrowLeft, Loader, CheckCircle, X, ExternalLink } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { initiatePayment, generatePaymentRef, eurToXof, isPayTechUrl } from '../services/paytech';

const toCFA = (eur: number) =>
  new Intl.NumberFormat('fr-SN', { maximumFractionDigits: 0 }).format(Math.round(eur * 655.957)) + ' FCFA';

/* ── Champ non-contrôlé — évite le saut de curseur ── */
const Field = React.memo(function Field({
  label, name, type = 'text', placeholder, required, error, onChange, autoComplete,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  required?: boolean; error?: string; onChange: (n: string, v: string) => void; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
        style={{ color: 'var(--text-700)' }}>
        {label}{required && <span style={{ color: 'var(--danger)' }}> *</span>}
      </label>
      <input
        id={name} name={name} type={type} placeholder={placeholder}
        defaultValue="" autoComplete={autoComplete}
        className={`input-field${error ? ' error' : ''}`}
        onChange={e => onChange(name, e.target.value)}
      />
      {error && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{error}</p>}
    </div>
  );
});

/* ── Popup PayTech sécurisé ── */
function PayTechPopup({ url, onClose, onSuccess }: {
  url: string; onClose: () => void; onSuccess: () => void;
}) {
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (typeof e.data === 'string' && e.data.includes('success')) onSuccess();
      if (typeof e.data === 'object' && e.data?.status === 'success') onSuccess();
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onSuccess]);

  // Sécurité : ne jamais afficher une iframe d'une URL non-PayTech
  const isSafe = url === '' || isPayTechUrl(url);
  if (!isSafe) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden flex flex-col animate-scale-in"
        style={{ background: 'var(--bg-white)', boxShadow: '0 32px 64px rgba(0,0,0,0.25)', maxHeight: '90vh' }}>

        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--grad-cta)' }}>
              <Lock size={15} color="#fff" />
            </div>
            <div>
              <p className="font-heading font-700 text-sm" style={{ color: 'var(--text-900)' }}>Paiement sécurisé</p>
              <p className="text-xs" style={{ color: 'var(--text-400)' }}>Propulsé par PayTech.sn</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-neutral-100 transition-colors" style={{ color: 'var(--text-400)' }}>
            <X size={16} />
          </button>
        </div>

        <div className="flex gap-3 px-5 py-2.5 border-b" style={{ borderColor: 'var(--border)', background: '#ECFDF5' }}>
          {['🔒 SSL 256-bit', '✓ 3D Secure', '✓ HTTPS', '✓ RGPD'].map(b => (
            <span key={b} className="text-xs font-medium" style={{ color: '#059669' }}>{b}</span>
          ))}
        </div>

        <div className="flex-1 overflow-auto">
          {url ? (
            <>
              <iframe src={url} className="w-full border-none" style={{ minHeight: '460px' }}
                title="Paiement PayTech sécurisé"
                sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation"
              />
              <div className="px-5 py-3 flex items-center justify-center gap-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs" style={{ color: 'var(--text-400)' }}>Le paiement ne s'affiche pas ?</span>
                <a href={url} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--primary)' }}>
                  Ouvrir dans un onglet <ExternalLink size={11} />
                </a>
              </div>
            </>
          ) : (
            /* Mode développement sans clés PayTech */
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'var(--grad-cta)' }}>
                <Lock size={26} color="#fff" />
              </div>
              <h3 className="font-heading font-700 text-xl mb-2" style={{ color: 'var(--text-900)' }}>
                Choisissez votre moyen de paiement
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-400)' }}>
                PayTech accepte toutes les méthodes suivantes :
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { name: 'Orange Money', emoji: '🟠', color: '#FF7600', bg: '#FFF7ED' },
                  { name: 'Wave',         emoji: '💧', color: '#00A3FF', bg: '#EFF6FF' },
                  { name: 'Carte Visa',   emoji: '💳', color: '#1A1F71', bg: '#EEF2FF' },
                  { name: 'Mastercard',   emoji: '💳', color: '#EB001B', bg: '#FEF2F2' },
                  { name: 'Free Money',   emoji: '📱', color: '#8B5CF6', bg: '#F5F3FF' },
                  { name: 'Joni Joni',    emoji: '💚', color: '#059669', bg: '#ECFDF5' },
                ].map(m => (
                  <div key={m.name} className="flex flex-col items-center gap-2 p-3 rounded-xl border"
                    style={{ background: m.bg, borderColor: m.color + '30' }}>
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-xs font-bold" style={{ color: m.color }}>{m.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mb-5" style={{ color: 'var(--text-300)' }}>
                Mode développement — configurez PAYTECH_API_KEY dans .env pour le vrai tunnel
              </p>
              <button onClick={onSuccess} className="btn-primary w-full justify-center">
                <CheckCircle size={15} /> Simuler un paiement réussi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page Checkout principale ── */
export default function Checkout() {
  const { state, clearCart } = useCart();
  const { addToast }         = useToast();
  const navigate             = useNavigate();

  // Formulaire non-contrôlé (pas de re-render par frappe → pas de saut curseur)
  const formRef = useRef({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'Sénégal',
  });
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [loading,   setLoading]   = useState(false);
  const [paytechUrl,setPaytechUrl]= useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Pré-charger le token CSRF en arrière-plan
  useEffect(() => {
    fetch('/api/csrf-token', { credentials: 'same-origin' })
      .then(r => r.json())
      .then(d => {
        if (d.token) sessionStorage.setItem('csrf_token', d.token);
      })
      .catch(() => {}); // Silencieux en dev sans backend
  }, []);

  const shipping   = state.total >= 50 ? 0 : 5.99;
  const grandTotal = state.total + shipping;

  const handleField = useCallback((name: string, value: string) => {
    (formRef.current as Record<string, string>)[name] = value;
    setErrors(prev => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const validate = (): boolean => {
    const f = formRef.current;
    const e: Record<string, string> = {};
    if (!f.firstName.trim()) e.firstName = 'Prénom requis';
    if (!f.lastName.trim())  e.lastName  = 'Nom requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Email invalide';
    if (!f.phone.trim())     e.phone     = 'Téléphone requis';
    if (!f.address.trim())   e.address   = 'Adresse requise';
    if (!f.city.trim())      e.city      = 'Ville requise';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = async () => {
    if (!validate()) {
      addToast({ type: 'error', message: 'Veuillez remplir tous les champs obligatoires', duration: 3500 });
      return;
    }
    setLoading(true);

    try {
      const f   = formRef.current;
      const ref = generatePaymentRef();

      const result = await initiatePayment({
        ref,
        amount:      eurToXof(grandTotal),
        item_name:   `Commande TrendyShop ${ref}`,
        buyer_name:  `${f.firstName} ${f.lastName}`,
        buyer_email: f.email,
        buyer_phone: f.phone,
        items: state.items.map(i => ({
          name:  i.name,
          qty:   i.quantity,
          price: eurToXof(i.price),
        })),
      });

      // La validation de l'URL est faite dans paytech.ts et server/index.ts
      setPaytechUrl(result.redirect_url ?? '');
      setShowPopup(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      addToast({ type: 'error', message, duration: 5000 });
      // Si pas de backend, ouvrir quand même le popup démo
      setPaytechUrl('');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = useCallback(() => {
    clearCart();
    setShowPopup(false);
    navigate('/success?ref=TS-' + Date.now().toString(36).toUpperCase());
  }, [clearCart, navigate]);

  if (state.items.length === 0) { navigate('/cart'); return null; }

  return (
    <>
      {showPopup && (
        <PayTechPopup
          url={paytechUrl ?? ''}
          onClose={() => setShowPopup(false)}
          onSuccess={handleSuccess}
        />
      )}

      <main className="min-h-screen pt-20" style={{ background: 'var(--bg-page)' }}>
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10">
          <Link to="/cart" className="inline-flex items-center gap-2 mb-7 text-sm font-medium transition-colors"
            style={{ color: 'var(--text-400)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--primary)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-400)'}>
            <ArrowLeft size={14} /> Retour au panier
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border p-6"
                style={{ background: 'var(--bg-white)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}>
                <h1 className="font-heading font-700 text-2xl mb-6" style={{ color: 'var(--text-900)' }}>
                  Informations de livraison
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Prénom"    name="firstName" placeholder="Amadou"              required autoComplete="given-name"    error={errors.firstName} onChange={handleField} />
                  <Field label="Nom"       name="lastName"  placeholder="Diallo"              required autoComplete="family-name"   error={errors.lastName}  onChange={handleField} />
                  <Field label="Email"     name="email"     placeholder="amadou@email.com"    required type="email" autoComplete="email"    error={errors.email}    onChange={handleField} />
                  <Field label="Téléphone" name="phone"     placeholder="+221 77 000 00 00"   required type="tel"   autoComplete="tel"      error={errors.phone}    onChange={handleField} />
                  <div className="sm:col-span-2">
                    <Field label="Adresse" name="address"   placeholder="123 Rue de la Paix"  required autoComplete="street-address" error={errors.address}  onChange={handleField} />
                  </div>
                  <Field label="Ville"       name="city"       placeholder="Dakar"  required autoComplete="address-level2" error={errors.city} onChange={handleField} />
                  <Field label="Code postal" name="postalCode" placeholder="10000"            autoComplete="postal-code"    onChange={handleField} />
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-700)' }}>Pays</label>
                    <select defaultValue="Sénégal" onChange={e => handleField('country', e.target.value)} className="input-field">
                      {['Sénégal', "Côte d'Ivoire", 'Mali', 'Guinée', 'Burkina Faso', 'France', 'Autre'].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 p-4 rounded-xl border flex items-start gap-3"
                  style={{ background: '#EEF2FF', borderColor: '#C7D2FE' }}>
                  <Lock size={14} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                  <p className="text-xs leading-relaxed" style={{ color: '#3730A3' }}>
                    En cliquant sur <strong>Passer la commande</strong>, une fenêtre PayTech sécurisée s'ouvrira.
                    Vous y choisirez votre mode de paiement (Orange Money, Wave, Carte…) et finaliserez en <strong>FCFA</strong>.
                  </p>
                </div>

                <button onClick={handleOrder} disabled={loading}
                  className="btn-primary w-full justify-center mt-6"
                  style={{ padding: '14px 24px', fontSize: '15px', fontWeight: 700 }}>
                  {loading
                    ? <><Loader size={16} className="animate-spin" /> Préparation…</>
                    : <><Lock size={15} /> Passer la commande — {toCFA(grandTotal)}</>
                  }
                </button>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['PayTech', 'Orange Money', 'Wave', 'Visa', 'Mastercard'].map(m => (
                    <span key={m} className="text-xs px-2.5 py-1 rounded-lg border font-medium"
                      style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)', color: 'var(--text-400)' }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Résumé commande */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border sticky top-24"
                style={{ background: 'var(--bg-white)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}>
                <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
                  <h2 className="font-heading font-700 text-lg" style={{ color: 'var(--text-900)' }}>Votre commande</h2>
                </div>
                <div className="p-5">
                  <div className="flex flex-col gap-3 mb-4">
                    {state.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--bg-soft)' }}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ background: 'var(--primary)', fontSize: '8px' }}>
                            {item.quantity}
                          </span>
                        </div>
                        <p className="flex-1 text-xs truncate font-medium" style={{ color: 'var(--text-600)' }}>{item.name}</p>
                        <span className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--text-900)' }}>
                          {toCFA(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="divider my-3" />
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-500)' }}>Sous-total</span>
                      <span className="font-medium" style={{ color: 'var(--text-700)' }}>{toCFA(state.total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-500)' }}>Livraison</span>
                      <span style={{ color: shipping === 0 ? 'var(--success)' : 'var(--text-700)' }}>
                        {shipping === 0 ? 'Gratuite ✓' : toCFA(shipping)}
                      </span>
                    </div>
                  </div>
                  <div className="divider mb-4" />
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-heading font-700" style={{ color: 'var(--text-900)' }}>Total TTC</span>
                    <span className="font-heading font-700 text-lg" style={{ color: 'var(--primary)' }}>{toCFA(grandTotal)}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-xs">
                    {[
                      { icon: Shield,        text: 'Paiement sécurisé PayTech.sn' },
                      { icon: CheckCircle,   text: 'Livraison express 24-48h' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-1.5" style={{ color: 'var(--text-400)' }}>
                        <Icon size={11} style={{ color: 'var(--success)' }} /> {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
