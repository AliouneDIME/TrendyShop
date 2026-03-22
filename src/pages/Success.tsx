import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package, Mail } from 'lucide-react';

export default function Success() {
  const [params] = useSearchParams();
  const ref = params.get('ref') || 'TS-' + Date.now().toString(36).toUpperCase();

  useEffect(() => {
    // Confetti effect
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: { x: number; y: number; vx: number; vy: number; color: string; size: number; angle: number; va: number }[] = [];
    const colors = ['#c9a85c', '#e8c97a', '#4f6ef7', '#10b981', '#f43f5e', '#a855f7'];

    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.2,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.va;
        p.vy += 0.1;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.4);
        ctx.restore();
      });
      if (alive) frame = requestAnimationFrame(animate);
      else { canvas.remove(); }
    };
    animate();
    setTimeout(() => { cancelAnimationFrame(frame); canvas.remove(); }, 5000);
    return () => { cancelAnimationFrame(frame); canvas.remove(); };
  }, []);

  return (
    <main className="min-h-screen pt-32 flex items-center justify-center px-6" style={{ background: 'var(--obsidian)' }}>
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <CheckCircle size={48} style={{ color: '#34d399' }} />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'rgba(16,185,129,0.3)' }} />
        </div>

        <h1 className="font-display text-5xl mb-4" style={{ color: 'var(--ivory)' }}>
          Commande confirmée !
        </h1>
        <p className="text-base mb-2" style={{ color: 'var(--silver)' }}>
          Merci pour votre achat. Votre paiement a été accepté.
        </p>
        <p className="font-mono text-sm mb-8 px-4 py-2 rounded-xl inline-block" style={{ background: 'rgba(201,168,92,0.08)', border: '1px solid rgba(201,168,92,0.2)', color: 'var(--gold)' }}>
          Référence : {ref}
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-10 text-left">
          {[
            { icon: Mail, title: 'Email de confirmation', desc: 'Un reçu détaillé vous a été envoyé par email.' },
            { icon: Package, title: 'Préparation en cours', desc: 'Votre commande est en cours de préparation par notre équipe.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,92,0.1)', border: '1px solid rgba(201,168,92,0.2)' }}>
                <Icon size={18} style={{ color: 'var(--gold)' }} />
              </div>
              <div>
                <p className="font-body font-semibold text-sm" style={{ color: 'var(--ivory)' }}>{title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--ash)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/" className="btn-primary">
          Retour à la boutique <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
