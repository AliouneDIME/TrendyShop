import React from 'react';
import { TrendingUp } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function Home() {
  const trendingProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Découvrez les Tendances du Moment</h1>
          <p className="text-xl mb-8">Les meilleurs produits sélectionnés pour vous</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Produits Tendances</h2>
        </div>
        <ProductGrid products={trendingProducts} />
      </div>
    </div>
  );
}