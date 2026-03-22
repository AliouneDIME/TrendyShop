import React from 'react';
import Hero from '../components/sections/Hero';
import FeaturedSection from '../components/sections/FeaturedSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import TrustSection from '../components/sections/TrustSection';
import NewArrivalsSection from '../components/sections/NewArrivalsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSection />
      <CategoriesSection />
      <NewArrivalsSection />
      <TrustSection />
      <TestimonialsSection />
    </main>
  );
}
