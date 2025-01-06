import React from 'react';
import { ShoppingBag, Truck, Headphones, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">À Propos de Nous</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
          <p className="text-gray-600 mb-6">
            TrendyShop est né de la passion pour les produits innovants et tendance. 
            Notre mission est de vous offrir une sélection unique des meilleurs produits 
            du moment, soigneusement choisis pour leur qualité et leur style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <ShoppingBag className="h-8 w-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Produits Tendance</h3>
            <p className="text-gray-600">Sélection des meilleurs produits du moment</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Truck className="h-8 w-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Livraison Rapide</h3>
            <p className="text-gray-600">Expédition sous 24h pour toute commande</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Headphones className="h-8 w-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Support Client</h3>
            <p className="text-gray-600">Service client disponible 7j/7</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="h-8 w-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Paiement Sécurisé</h3>
            <p className="text-gray-600">Transactions 100% sécurisées</p>
          </div>
        </div>
      </div>
    </div>
  );
}