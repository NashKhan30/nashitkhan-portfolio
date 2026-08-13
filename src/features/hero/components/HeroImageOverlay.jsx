import React, { useRef, useEffect } from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import { gsap } from '../../../lib/gsap';

export const HeroImageOverlay = ({ imageRef, overlayTextRef }) => {
  const orbitRingRef = useRef(null);
  const cardFloatRef = useRef(null);

  useEffect(() => {
    // 1. Continuous Revolving Kinetic Circle Animation
    if (orbitRingRef.current) {
      gsap.to(orbitRingRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }

    // 2. Subtle 3D Floating Wave
    if (cardFloatRef.current) {
      gsap.to(cardFloatRef.current, {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.easeInOut',
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    const card = cardFloatRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotateY: (x / rect.width) * 12,
      rotateX: (-y / rect.height) * 12,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const card = cardFloatRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardFloatRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto lg:max-w-none flex flex-col items-center justify-center transform-gpu perspective-1000 py-6"
    >
      {/* Background Soft Neon Glow Aura */}
      <div className="hero-image-glow absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-600/20 to-pink-500/20 blur-3xl opacity-50 pointer-events-none" />

      {/* CONTINUOUS REVOLVING KINETIC CIRCLE ANIMATION */}
      <div
        ref={orbitRingRef}
        className="pointer-events-none absolute -inset-6 rounded-full border border-dashed border-cyan-400/40 shadow-[0_0_30px_rgba(0,242,254,0.2)] opacity-70"
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* 1. Main Portrait Avatar Picture Stage */}
        <div
          ref={imageRef}
          className="relative group rounded-3xl p-1.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(0,242,254,0.3)] transition-transform duration-500 group-hover:scale-102"
        >
          <div className="relative overflow-hidden rounded-[22px] bg-slate-950 max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-square">
            <img
              src="/nashit_khan.jpg"
              alt="Nashit Khan Profile"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-cyan-300 shadow-lg">
              <Cpu className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>React & GSAP</span>
            </div>
          </div>
        </div>

        {/* 2. NASHIT KHAN BOLD ALL-CAPS TILTED OVERLAY BADGE WITH FRONTEND DEVELOPER DOWN UNDERNEATH */}
        <div
          ref={overlayTextRef}
          className="relative -mt-14 sm:-mt-16 z-20 w-full text-center lg:text-left pointer-events-none px-2"
        >
          <div className="inline-block rounded-2xl border border-cyan-500/40 bg-slate-950/95 backdrop-blur-xl px-4 sm:px-8 py-3.5 sm:py-5 shadow-[0_15px_50px_rgba(0,0,0,0.9)] relative overflow-hidden max-w-full">
            {/* Shimmer Light Bar */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-shimmer" />

            {/* BOLD ALL-CAPS TILTED / SLANTED LOGO TYPOGRAPHY FOR NASHIT KHAN */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-slate-100 to-purple-400 drop-shadow-[0_0_35px_rgba(0,242,254,0.6)] transform -rotate-3 -skew-x-6 inline-block leading-none py-1">
              NASHIT KHAN
            </h1>

            {/* FRONTEND DEVELOPER DOWN UNDERNEATH */}
            <div className="flex items-center gap-2 mt-2 justify-center lg:justify-start">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <p className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
                FRONTEND DEVELOPER
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
