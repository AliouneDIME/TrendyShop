import React from 'react';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Paiement échoué</h1>
        <p className="text-gray-600 mb-6">
          Une erreur est survenue lors du paiement. Veuillez réessayer ou contacter le support.
        </p>
        <Link
          to="/checkout"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Réessayer
        </Link>
      </div>
    </div>
  );
}