import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider }   from './contexts/CartContext';
import { ToastProvider }  from './contexts/ToastContext';
import Navbar             from './components/layout/Navbar';
import CartDrawer         from './components/layout/CartDrawer';
import Footer             from './components/layout/Footer';
import ToastContainer     from './components/ui/Toast';
import Home       from './pages/Home';
import Shop       from './pages/Shop';
import Categories from './pages/Categories';
import CartPage   from './pages/CartPage';
import Checkout   from './pages/Checkout';
import Success    from './pages/Success';
import Cancel     from './pages/Cancel';
import About      from './pages/About';
import Contact    from './pages/Contact';
import FAQ        from './pages/FAQ';
import Wishlist   from './pages/Wishlist';
import Account    from './pages/Account';

/* Slide-in on every route change */
function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateX(24px)';
    el.style.transition = 'none';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = 'opacity .28s ease, transform .28s ease';
      el.style.opacity    = '1';
      el.style.transform  = 'translateX(0)';
    }));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return <div ref={ref} style={{ willChange: 'transform,opacity' }}>{children}</div>;
}

function AppInner() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <CartDrawer />
      <ToastContainer />

      <div className="flex-1">
        <Routes location={location}>
          {[
            ['/',           <Home />],
            ['/shop',       <Shop />],
            ['/categories', <Categories />],
            ['/cart',       <CartPage />],
            ['/checkout',   <Checkout />],
            ['/success',    <Success />],
            ['/cancel',     <Cancel />],
            ['/about',      <About />],
            ['/contact',    <Contact />],
            ['/faq',        <FAQ />],
            ['/wishlist',   <Wishlist />],
            ['/account',    <Account />],
          ].map(([path, el]) => (
            <Route key={path as string} path={path as string}
              element={<PageTransition>{el as React.ReactNode}</PageTransition>} />
          ))}
          <Route path="*" element={
            <PageTransition>
              <main className="min-h-screen pt-32 flex items-center justify-center text-center px-6"
                style={{ background: 'var(--bg-page)' }}>
                <div>
                  <p className="font-heading font-700 text-8xl text-gradient mb-4">404</p>
                  <h1 className="font-heading font-700 text-3xl mb-3" style={{ color: 'var(--text-900)' }}>
                    Page introuvable
                  </h1>
                  <p className="mb-7" style={{ color: 'var(--text-400)' }}>Cette page n'existe pas.</p>
                  <a href="/" className="btn-primary">Retour à l'accueil →</a>
                </div>
              </main>
            </PageTransition>
          } />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <AppInner />
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
