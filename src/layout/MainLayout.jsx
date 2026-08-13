import React, { useState } from 'react';
import { useLenis } from '../shared/lib/lenis';
import { CustomCursor } from '../shared/ui/CustomCursor';
import { BackgroundParticles } from '../shared/ui/BackgroundParticles';
import { FpsWidget } from '../shared/ui/FpsWidget';
import { Navbar } from '../shared/ui/Navbar';
import { Footer } from '../shared/ui/Footer';
import { MobileNavModal } from '../features/navbar/components/MobileNavModal';

export const MainLayout = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useLenis();

  return (
    <div className="relative min-h-screen bg-[#0a0b0e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 overflow-x-hidden">
      <BackgroundParticles />
      <CustomCursor />
      <FpsWidget />

      <Navbar onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNavModal isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <main className="relative z-10">{children}</main>

      <Footer />
    </div>
  );
};
