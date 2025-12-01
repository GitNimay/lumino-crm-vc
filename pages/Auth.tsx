import React, { useState } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { ProductShowcase } from '../components/landing/ProductShowcase';
import { Workflow } from '../components/landing/Workflow';
import { Pricing } from '../components/landing/Pricing';
import { Footer } from '../components/landing/Footer';
import { AuthModal } from '../components/AuthModal';
import { SmoothScroll } from '../components/SmoothScroll';

export const Auth: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openAuth = (login: boolean) => {
    setIsLogin(login);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <SmoothScroll />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <Navbar onOpenAuth={openAuth} />

      <main>
        <Hero onOpenAuth={openAuth} />
        <Features />
        <ProductShowcase />
        <Workflow />
        <Pricing />
      </main>

      <Footer onOpenAuth={openAuth} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultIsLogin={isLogin}
      />
    </div>
  );
};