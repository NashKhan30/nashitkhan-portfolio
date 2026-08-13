import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Menu } from 'lucide-react';
import { MagneticButton } from '../../../components/MagneticButton';
import { sound } from '../../../lib/audioSynth';
import { gsap } from '../../../lib/gsap';

export const Navbar = ({ onOpenMobileNav }) => {
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(false);
  const headerRef = useRef(null);
  const navContainerRef = useRef(null);
  const hoverPillRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header.children,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power4.out', delay: 0.1 }
    );

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavMouseEnter = (e) => {
    sound.playHover();
    const pill = hoverPillRef.current;
    if (!pill) return;
    const rect = e.target.getBoundingClientRect();
    const containerRect = navContainerRef.current.getBoundingClientRect();

    gsap.to(pill, {
      left: rect.left - containerRect.left,
      width: rect.width,
      opacity: 1,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleNavMouseLeave = () => {
    const pill = hoverPillRef.current;
    if (!pill) return;
    gsap.to(pill, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleToggleSound = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 px-2 sm:px-6 transition-all duration-500 transform-gpu ${
        scrolled ? 'py-2.5' : 'py-4 sm:py-6'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'rounded-full border border-cyan-500/30 bg-slate-950/90 backdrop-blur-2xl py-2 px-3.5 sm:px-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
            : 'bg-slate-950/50 backdrop-blur-md rounded-full py-2 px-3.5 sm:px-6 border border-white/10'
        }`}
      >
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="h-full w-full rounded-[10px] bg-slate-950 flex items-center justify-center font-display font-black text-cyan-400 text-sm sm:text-lg">
              NK
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xs sm:text-base tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
              NASHIT KHAN
            </span>
            <span className="hidden sm:block text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
              Frontend Developer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          ref={navContainerRef}
          onMouseLeave={handleNavMouseLeave}
          className="relative hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 shadow-inner"
        >
          <div
            ref={hoverPillRef}
            className="pointer-events-none absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-600/30 border border-cyan-400/50 opacity-0 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
          />

          {[
            { label: 'Home', href: '#hero' },
            { label: 'Projects', href: '#showcase' },
            { label: 'Expertise', href: '#tech-stack' },
            { label: 'Contact', href: '#contact' },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onMouseEnter={handleNavMouseEnter}
              className="relative z-10 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for Hire</span>
          </div>

          <button
            onClick={handleToggleSound}
            aria-label="Toggle Audio FX"
            className="p-2 sm:p-2.5 rounded-full border border-white/10 bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors backdrop-blur-md"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400" /> : <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400" />}
          </button>

          <MagneticButton
            href="#contact"
            className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2 text-xs font-mono font-semibold tracking-wider text-slate-950 uppercase shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all"
          >
            <span className="flex items-center gap-1.5">
              <span>Let's Talk</span>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </MagneticButton>

          {/* Sleek Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenMobileNav();
            }}
            className="md:hidden p-2 sm:p-2.5 rounded-full border border-cyan-500/40 bg-slate-900/90 text-cyan-400 flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.2)] active:scale-95 transition-transform"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
            <span className="hidden sm:inline font-mono text-xs font-bold">MENU</span>
          </button>
        </div>
      </div>
    </header>
  );
};