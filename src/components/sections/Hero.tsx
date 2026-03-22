import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '50K+', label: 'Clients satisfaits' },
  { value: '1200+', label: 'Produits premium' },
  { value: '4.9★', label: 'Note moyenne' },
  { value: '48h', label: 'Livraison express' },
];

const floatingBadges = [
  { text: 'Livraison gratuite', icon: '🚚', delay: '0s', x: '8%', y: '20%' },
  { text: 'Paiement sécurisé', icon: '🔒', delay: '1.5s', x: '85%', y: '15%' },
  { text: 'Retours 30j', icon: '↩', delay: '3s', x: '80%', y: '70%' },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const colors = ['rgba(201,168,92,', 'rgba(79,110,247,', 'rgba(255,255,255,'];
    
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(201,168,92,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Radial glow that follows mouse */}
      <div
        className="absolute pointer-events-none transition-all duration-700"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(79,110,247,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Floating badges */}
      {floatingBadges.map(badge => (
        <div
          key={badge.text}
          className="absolute hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl text-xs animate-float"
          style={{
            left: badge.x,
            top: badge.y,
            background: 'rgba(26,26,36,0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--silver)',
            animationDelay: badge.delay,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span>{badge.icon}</span>
          <span className="font-body font-medium">{badge.text}</span>
        </div>
      ))}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 relative z-10">
        {/* Pre-heading badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-slide-up"
          style={{
            background: 'rgba(201,168,92,0.08)',
            border: '1px solid rgba(201,168,92,0.2)',
          }}
        >
          <Sparkles size={14} style={{ color: 'var(--gold)' }} />
          <span className="text-xs font-mono font-medium" style={{ color: 'var(--gold)', letterSpacing: '0.12em' }}>
            NOUVELLE COLLECTION 2024
          </span>
          <TrendingUp size={14} style={{ color: 'var(--gold)' }} />
        </div>

        {/* Main Heading */}
        <h1
          className="font-display text-center mb-6 animate-slide-up delay-100 leading-none"
          style={{
            color: 'var(--ivory)',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            animationFillMode: 'both',
          }}
        >
          L'Excellence
          <br />
          <span
            style={{
              background: 'var(--gradient-gold)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            À Votre Portée
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="font-body text-lg md:text-xl max-w-2xl mb-10 animate-slide-up delay-200"
          style={{
            color: 'var(--silver)',
            lineHeight: 1.7,
            animationFillMode: 'both',
          }}
        >
          Découvrez une sélection premium de produits tech, mode et lifestyle.
          Livraison express au Sénégal. Paiement 100% sécurisé via PayTech.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up delay-300" style={{ animationFillMode: 'both' }}>
          <Link to="/shop" className="btn-primary text-base px-8 py-4">
            Explorer la boutique
            <ArrowRight size={18} />
          </Link>
          <Link to="/categories" className="btn-outline text-base px-8 py-4">
            Voir les catégories
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 animate-fade-in delay-400" style={{ animationFillMode: 'both' }}>
          {[
            { icon: '🚚', text: 'Livraison 48h' },
            { icon: '🔒', text: 'Paiement sécurisé' },
            { icon: '↩', text: 'Retours 30 jours' },
            { icon: '⭐', text: 'Garantie qualité' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span className="text-sm" style={{ color: 'var(--ash)' }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-px animate-fade-in delay-500"
          style={{ animationFillMode: 'both' }}
        >
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="px-6 py-5 text-center"
              style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: i === 0 ? '16px 0 0 16px' : i === 3 ? '0 16px 16px 0' : '0',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRight: i < 3 ? 'none' : undefined,
              }}
            >
              <div
                className="font-mono font-bold text-2xl md:text-3xl mb-1"
                style={{
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </div>
              <div className="text-xs" style={{ color: 'var(--ash)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float" style={{ opacity: 0.5 }}>
        <span className="text-xs font-mono" style={{ color: 'var(--ash)', letterSpacing: '0.2em' }}>DÉFILER</span>
        <ChevronDown size={16} style={{ color: 'var(--ash)' }} />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--obsidian))' }}
      />
    </section>
  );
}
