import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, User, ChevronDown } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const navLinks = [
  { path: '/',           label: 'Accueil' },
  { path: '/shop',       label: 'Boutique' },
  { path: '/categories', label: 'Catégories' },
  { path: '/about',      label: 'À Propos' },
  { path: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const { state, toggleCart } = useCart();
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query,      setQuery]      = useState('');
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; }, [menuOpen]);

  const active = (p: string) => location.pathname === p;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${scrolled ? '#E2E8F0' : 'transparent'}`,
          boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm text-white"
                style={{ background: 'var(--grad-cta)' }}>
                TS
              </div>
              <span className="font-heading font-700 text-xl hidden sm:block" style={{ color: 'var(--text-900)' }}>
                Trendy<span style={{ color: 'var(--primary)' }}>Shop</span>
              </span>
            </Link>

            {/* Desktop nav — simple underline, no circles */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(l => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
                  style={{
                    color: active(l.path) ? 'var(--primary)' : 'var(--text-500)',
                    background: active(l.path) ? 'rgba(99,102,241,0.06)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!active(l.path)) (e.currentTarget as HTMLElement).style.color = 'var(--text-900)'; }}
                  onMouseLeave={e => { if (!active(l.path)) (e.currentTarget as HTMLElement).style.color = 'var(--text-500)'; }}
                >
                  {l.label}
                  {active(l.path) && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full"
                      style={{ background: 'var(--primary)' }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-0.5">
              <button onClick={() => setSearchOpen(s => !s)}
                className="p-2.5 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                aria-label="Rechercher">
                <Search size={18} />
              </button>
              <Link to="/wishlist"
                className="p-2.5 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors hidden sm:flex"
                aria-label="Favoris">
                <Heart size={18} />
              </Link>
              <Link to="/account"
                className="p-2.5 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors hidden sm:flex"
                aria-label="Mon compte">
                <User size={18} />
              </Link>
              <button onClick={toggleCart}
                className="relative p-2.5 rounded-xl transition-colors"
                style={{ color: state.itemCount > 0 ? 'var(--primary)' : 'var(--text-500)' }}
                onMouseEnter={e => !(state.itemCount > 0) && ((e.currentTarget as HTMLElement).style.color = 'var(--text-900)')}
                onMouseLeave={e => !(state.itemCount > 0) && ((e.currentTarget as HTMLElement).style.color = 'var(--text-500)')}
                aria-label="Panier">
                <ShoppingBag size={18} />
                {state.itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full text-white font-bold"
                    style={{ background: 'var(--primary)', fontSize: '9px' }}>
                    {state.itemCount > 9 ? '9+' : state.itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMenuOpen(m => !m)}
                className="lg:hidden p-2.5 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors ml-0.5"
                aria-label="Menu">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="border-t animate-fade-in" style={{ background: 'var(--bg-white)', borderColor: 'var(--border)' }}>
            <div className="max-w-xl mx-auto px-5 py-3 flex items-center gap-3">
              <Search size={15} style={{ color: 'var(--text-300)', flexShrink: 0 }} />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher un produit, une catégorie…"
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: 'var(--text-900)', fontFamily: 'var(--font-body)' }}
                onKeyDown={e => {
                  if (e.key === 'Escape') setSearchOpen(false);
                  if (e.key === 'Enter' && query.trim()) window.location.href = `/shop?q=${encodeURIComponent(query.trim())}`;
                }}
              />
              <kbd className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--bg-soft)', color: 'var(--text-400)', fontFamily: 'var(--font-body)' }}>ESC</kbd>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in" style={{ background: 'rgba(255,255,255,0.99)' }}>
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col">
              {navLinks.map((l, i) => (
                <Link key={l.path} to={l.path}
                  className="flex items-center justify-between py-4 border-b animate-slide-up"
                  style={{
                    borderColor: 'var(--border)',
                    color: active(l.path) ? 'var(--primary)' : 'var(--text-700)',
                    animationDelay: `${i * 50}ms`,
                    animationFillMode: 'both',
                  }}>
                  <span className="font-heading text-2xl font-600">{l.label}</span>
                  <ChevronDown size={16} style={{ transform: 'rotate(-90deg)', color: 'var(--text-300)' }} />
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-10 flex gap-3">
              <Link to="/account" className="flex-1 btn-primary text-center">Mon compte</Link>
              <Link to="/cart"    className="flex-1 btn-outline text-center">Panier ({state.itemCount})</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
