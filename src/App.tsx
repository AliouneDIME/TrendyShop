import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/layout/Navbar';
import CartDrawer from './components/layout/CartDrawer';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ToastContainer from './components/ui/Toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <CustomCursor />
          <div className="min-h-screen flex flex-col" style={{ background: 'var(--obsidian)' }}>
            <Navbar />
            <CartDrawer />
            <ToastContainer />

            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
