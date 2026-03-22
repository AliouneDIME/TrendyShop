import React from 'react';
import Hero from '../components/sections/Hero';
import FeaturedSection from '../components/sections/FeaturedSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import NewArrivalsSection from '../components/sections/NewArrivalsSection';
import TrustSection from '../components/sections/TrustSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import NewsletterCTA from '../components/sections/NewsletterCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSection />
      <CategoriesSection />
      <NewArrivalsSection />
      <TrustSection />
      <TestimonialsSection />
      <NewsletterCTA />
    </main>
  );
}
