import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
