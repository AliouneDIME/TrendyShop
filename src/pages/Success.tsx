import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package, Mail, Truck } from 'lucide-react';

export default function Success() {
  const [params] = useSearchParams();
  const ref = params.get('ref') || 'TS-' + Date.now().toString(36).toUpperCase();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#6366F1','#8B5CF6','#10B981','#F59E0B','#EC4899','#3B82F6'];
    const pieces = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width, y: -30 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 4, vy: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4, angle: Math.random() * Math.PI * 2, va: (Math.random() - 0.5) * 0.2,
    }));
    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.angle += p.va; p.vy += 0.1;
        if (p.y < canvas.height + 30) alive = true;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
        ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();
      });
      if (alive) frame = requestAnimationFrame(draw); else canvas.remove();
    };
    draw();
    setTimeout(() => { cancelAnimationFrame(frame); canvas.remove(); }, 5000);
    return () => { cancelAnimationFrame(frame); canvas.remove(); };
  }, []);

  return (
    <main className="min-h-screen pt-32 flex items-center justify-center px-6"
      style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-md w-full text-center">
        <div className="relative w-20 h-20 mx-auto mb-7">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: '#ECFDF5', border: '2px solid #A7F3D0' }}>
            <CheckCircle size={40} style={{ color: '#059669' }} />
          </div>
        </div>

        <h1 className="font-heading font-700 text-4xl mb-3" style={{ color: 'var(--text-900)' }}>
          Commande confirmée !
        </h1>
        <p className="mb-3" style={{ color: 'var(--text-500)' }}>
          Merci pour votre achat. Votre paiement a bien été accepté.
        </p>
        <div className="inline-block px-4 py-2 rounded-xl mb-8 text-sm font-semibold"
          style={{ background: '#EEF2FF', color: 'var(--primary)', border: '1px solid #C7D2FE' }}>
          Référence : {ref}
        </div>

        <div className="flex flex-col gap-3 mb-8 text-left">
          {[
            { icon: Mail,    title: 'Email de confirmation', desc: 'Un reçu vous a été envoyé par email.', color: '#6366F1', bg: '#EEF2FF' },
            { icon: Package, title: 'Préparation en cours',  desc: 'Notre équipe prépare votre commande.',  color: '#8B5CF6', bg: '#F5F3FF' },
            { icon: Truck,   title: 'Livraison sous 48h',    desc: 'Suivi en temps réel par SMS.',           color: '#10B981', bg: '#ECFDF5' },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="flex gap-3 p-4 rounded-2xl border"
              style={{ background: 'var(--bg-white)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p className="font-heading font-600 text-sm" style={{ color: 'var(--text-900)' }}>{title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-400)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/" className="btn-primary">
          Retour à la boutique <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}
