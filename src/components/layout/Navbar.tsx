import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const navLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/shop', label: 'Boutique' },
  { path: '/categories', label: 'Catégories' },
  { path: '/about', label: 'À Propos' },
];

export default function Navbar() {
  const { state, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10, 10, 15, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--gradient-gold)' }}
                >
                  <span className="text-obsidian font-mono font-bold text-sm">TS</span>
                </div>
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 20px rgba(201,168,92,0.5)' }}
                />
              </div>
              <span
                className="font-display text-2xl tracking-wide hidden sm:block"
                style={{ color: 'var(--ivory)' }}
              >
                Trendy<span style={{ color: 'var(--gold)' }}>Shop</span>
              </span>
            </Link>

            {/* Center nav - desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-5 py-2 text-sm font-body font-medium transition-colors duration-200"
                  style={{ color: isActive(link.path) ? 'var(--gold)' : 'var(--silver)' }}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span
                      className="absolute bottom-0 left-5 right-5 h-px"
                      style={{ background: 'var(--gradient-gold)' }}
                    />
                  )}
                  <span className="absolute inset-0 rounded-lg hover:bg-white/5 transition-colors" />
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                style={{ color: 'var(--silver)' }}
                aria-label="Rechercher"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-3 rounded-xl transition-all duration-200 hover:bg-white/5 hidden sm:flex"
                style={{ color: 'var(--silver)' }}
                aria-label="Liste de souhaits"
              >
                <Heart size={20} />
              </Link>

              {/* Account */}
              <Link
                to="/account"
                className="p-3 rounded-xl transition-all duration-200 hover:bg-white/5 hidden sm:flex"
                style={{ color: 'var(--silver)' }}
                aria-label="Mon compte"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-3 rounded-xl transition-all duration-200 hover:bg-white/5 ml-1"
                style={{ color: state.itemCount > 0 ? 'var(--gold)' : 'var(--silver)' }}
                aria-label={`Panier (${state.itemCount} articles)`}
              >
                <ShoppingBag size={20} />
                {state.itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                    style={{ background: 'var(--gradient-gold)', color: 'var(--obsidian)' }}
                  >
                    {state.itemCount > 9 ? '9+' : state.itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-3 rounded-xl transition-all duration-200 hover:bg-white/5 ml-1"
                style={{ color: 'var(--silver)' }}
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div
            className="border-t animate-slide-up"
            style={{ background: 'rgba(10,10,15,0.98)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="max-w-2xl mx-auto px-6 py-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--ash)' }}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Rechercher un produit..."
                  autoFocus
                  className="input-field pl-12"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchOpen(false);
                    if (e.key === 'Enter' && searchValue) {
                      window.location.href = `/shop?search=${encodeURIComponent(searchValue)}`;
                    }
                  }}
                />
                <kbd
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded font-mono"
                  style={{ background: 'var(--steel)', color: 'var(--ash)' }}
                >
                  ESC
                </kbd>
              </div>
              {searchValue && (
                <p className="mt-3 text-xs font-body" style={{ color: 'var(--ash)' }}>
                  Appuyez sur Entrée pour rechercher "{searchValue}"
                </p>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden animate-fade-in"
          style={{ background: 'rgba(10,10,15,0.98)' }}
        >
          <div className="flex flex-col h-full pt-24 px-8">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="py-4 border-b flex items-center justify-between group animate-slide-up"
                  style={{
                    borderColor: 'rgba(255,255,255,0.06)',
                    color: isActive(link.path) ? 'var(--gold)' : 'var(--ivory)',
                    animationDelay: `${i * 80}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <span className="font-display text-3xl">{link.label}</span>
                  <span style={{ color: 'var(--ash)' }}>→</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pb-12 flex gap-4">
              <Link
                to="/account"
                className="flex-1 btn-outline text-center justify-center"
              >
                Mon compte
              </Link>
              <Link
                to="/wishlist"
                className="flex-1 btn-ghost text-center justify-center border rounded-lg"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--silver)' }}
              >
                Favoris
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
