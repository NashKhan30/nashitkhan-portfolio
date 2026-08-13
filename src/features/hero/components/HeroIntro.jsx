import React, { useRef } from 'react';
import { HeroImageOverlay } from './HeroImageOverlay';
import { useHeroGSAP } from '../hooks/useHeroGSAP';
import { MagneticButton } from '../../../components/MagneticButton';
import { ArrowUpRight, Code2, Sparkles, Send } from 'lucide-react';

export const HeroIntro = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const headlineRef = useRef(null);
  const pitchRef = useRef(null);
  const quoteRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const overlayTextRef = useRef(null);

  useHeroGSAP({
    heroRef,
    titleRef,
    headlineRef,
    pitchRef,
    quoteRef,
    ctaRef,
    imageRef,
    overlayTextRef,
  });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 z-10 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Column: Headline, Pitch, Quote & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Animated Kinetic Role Scramble Badge */}
          <div className="mb-6 flex items-center gap-2.5 rounded-full border border-cyan-500/40 bg-slate-950/80 px-4 py-2 text-xs font-mono text-cyan-400 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.25)]">
            <Sparkles className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span ref={titleRef} className="font-bold tracking-widest uppercase">
              FRONTEND DEVELOPER
            </span>
          </div>

          {/* Hero Main Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-6xl font-black font-display tracking-tight leading-[1.1] text-slate-100 mb-6"
          >
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 drop-shadow-[0_0_25px_rgba(0,242,254,0.3)]">Fluid Interfaces</span> & Immersive Web Experiences
          </h1>

          {/* Sub-pitch intro text */}
          <p
            ref={pitchRef}
            className="text-base md:text-lg text-slate-300 font-sans leading-relaxed mb-6 max-w-2xl"
          >
            Hi, I’m <strong className="text-cyan-300 font-semibold">Nashit Khan</strong> — a Frontend Developer focused on building fast, responsive, and visually engaging web experiences with React, TypeScript, Tailwind CSS, and GSAP.
          </p>

          {/* Quote Highlight */}
          <blockquote
            ref={quoteRef}
            className="border-l-2 border-cyan-400 pl-4 py-1.5 mb-8 max-w-2xl text-sm md:text-base font-display italic text-slate-300 leading-relaxed bg-cyan-500/5 rounded-r-xl"
          >
            “I don’t just build interfaces — I craft digital experiences where clean code, thoughtful motion, and seamless interactions come together.”
          </blockquote>

          {/* Magnetic CTA Action Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#showcase"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-7 py-3.5 text-xs font-mono font-bold text-slate-950 uppercase tracking-wider shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] transition-all"
            >
              <span className="flex items-center gap-2">
                <span>Explore Showcase</span>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="rounded-full border border-cyan-500/40 bg-slate-900/80 px-7 py-3.5 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider hover:border-cyan-400 hover:bg-cyan-500/20 transition-all backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.2)]"
            >
              <span className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span>Contact Nashit</span>
                <Send className="h-3.5 w-3.5 text-cyan-400" />
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Image Reveal & Left-Sliding NASHIT KHAN Badge */}
        <div className="lg:col-span-5 w-full">
          <HeroImageOverlay imageRef={imageRef} overlayTextRef={overlayTextRef} />
        </div>
      </div>
    </section>
  );
};