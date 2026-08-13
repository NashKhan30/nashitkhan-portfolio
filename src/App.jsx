import React, { useState, useRef } from 'react';
import { useLenis } from './lib/lenis';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundParticles } from './components/BackgroundParticles';
import { FpsWidget } from './components/FpsWidget';
import { WelcomeIntro } from './components/WelcomeIntro';
import { Navbar } from './features/navbar/components/Navbar';
import { HeroIntro } from './features/hero/components/HeroIntro';
import { ShowcaseSection } from './features/showcase/components/ShowcaseSection';
import { TechStackSection } from './features/tech-stack/components/TechStackSection';
import { ContactSection } from './features/contact/components/ContactSection';
import { Footer } from './components/Footer';
import { MobileNavModal } from './features/navbar/components/MobileNavModal';
import { gsap } from './lib/gsap';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mainContentRef = useRef(null);

  useLenis();

  const handleIntroComplete = () => {
    setShowIntro(false);

    // Cinematic 3D Scale Entrance for Homepage
    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, scale: 1.08, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power4.out' }
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0b0e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 overflow-x-hidden">
      {/* 1. Welcome Intro Preloader Screen */}
      {showIntro && <WelcomeIntro onComplete={handleIntroComplete} />}

      {/* 2. Main Portfolio App Content */}
      <BackgroundParticles />
      <CustomCursor />
      <FpsWidget />

      <Navbar onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNavModal isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <main ref={mainContentRef} className="relative z-10">
        <HeroIntro />
        <ShowcaseSection />
        <TechStackSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
