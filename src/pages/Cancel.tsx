import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw, Shield } from 'lucide-react';

export default function Cancel() {
  return (
    <main className="min-h-screen pt-32 flex items-center justify-center px-6"
      style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-7"
          style={{ background: '#FEF2F2', border: '2px solid #FECACA' }}>
          <XCircle size={40} style={{ color: '#DC2626' }} />
        </div>
        <h1 className="font-heading font-700 text-4xl mb-3" style={{ color: 'var(--text-900)' }}>
          Paiement annulé
        </h1>
        <p className="mb-3" style={{ color: 'var(--text-500)' }}>
          Votre paiement a été annulé.{' '}
          <strong style={{ color: 'var(--text-700)' }}>Aucun montant n'a été débité.</strong>
        </p>
        <div className="flex items-center justify-center gap-2 mb-8 text-sm"
          style={{ color: '#059669' }}>
          <Shield size={14} /> Vos informations sont protégées
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/checkout" className="btn-primary">
            <RefreshCw size={14} /> Réessayer
          </Link>
          <Link to="/cart" className="btn-outline">
            <ArrowLeft size={14} /> Retour au panier
          </Link>
        </div>
      </div>
    </main>
  );
}
