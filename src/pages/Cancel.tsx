import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function Cancel() {
  return (
    <main className="min-h-screen pt-32 flex items-center justify-center px-6" style={{ background: 'var(--obsidian)' }}>
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }}>
          <XCircle size={48} style={{ color: '#fb7185' }} />
        </div>
        <h1 className="font-display text-5xl mb-4" style={{ color: 'var(--ivory)' }}>Paiement annulé</h1>
        <p className="mb-8" style={{ color: 'var(--ash)' }}>
          Votre paiement a été annulé. Aucun montant n'a été débité. Votre panier est toujours disponible.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/checkout" className="btn-primary">
            <RefreshCw size={16} /> Réessayer
          </Link>
          <Link to="/cart" className="btn-outline">
            <ArrowLeft size={16} /> Retour au panier
          </Link>
        </div>
      </div>
    </main>
  );
}
