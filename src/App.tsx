import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CartPage from './pages/CartPage';
import About from './pages/About';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar onCartClick={() => setShowCart(true)} />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>

          {showCart && <Cart onClose={() => setShowCart(false)} />}
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;