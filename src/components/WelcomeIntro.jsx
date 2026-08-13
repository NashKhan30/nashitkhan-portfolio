import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Terminal, ShieldCheck, Zap, Activity, Cpu, Volume2 } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { sound } from '../lib/audioSynth';

export const WelcomeIntro = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);
  const contentRef = useRef(null);
  const voiceTriggeredRef = useRef(false);

  useEffect(() => {
    // Smooth cinematic progress counter (0% -> 100% over ~3.8 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = prev < 60 ? 1 : prev < 85 ? 2 : 1;
        return prev + step;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Trigger voice greeting when progress hits ~30%
    if (progress >= 30 && !voiceTriggeredRef.current) {
      voiceTriggeredRef.current = true;
      sound.speakWelcome('Welcome to my portfolio');
    }

    if (progress === 100) {
      // Play high-tech power up chime
      sound.playPowerUp();

      // Giant Split-Gate Curtain Reveal Animation
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      tl.to(contentRef.current, {
        scale: 1.12,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
      })
        .to(
          topCurtainRef.current,
          {
            yPercent: -100,
            duration: 1.0,
            ease: 'power4.inOut',
          },
          '-=0.2'
        )
        .to(
          bottomCurtainRef.current,
          {
            yPercent: 100,
            duration: 1.0,
            ease: 'power4.inOut',
          },
          '<'
        );
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      onClick={() => sound.speakWelcome('Welcome to my portfolio')}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-auto select-none bg-[#050608] cursor-pointer"
    >
      {/* Top Split Gate Curtain */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#06070a] border-b border-cyan-500/40 z-10 shadow-[0_10px_50px_rgba(0,242,254,0.2)]"
      />

      {/* Bottom Split Gate Curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#06070a] border-t border-cyan-500/40 z-10 shadow-[0_-10px_50px_rgba(0,242,254,0.2)]"
      />

      {/* Giant Ambient Background Radial Glows */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none z-20 animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none z-20 animate-pulse" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] z-20 pointer-events-none" />

      {/* Central Full-Screen Impressive Content Stage */}
      <div
        ref={contentRef}
        className="relative z-30 flex flex-col items-center justify-center px-6 max-w-4xl w-full text-center"
      >
        {/* Giant Kinetic Energy Orbital Reactor */}
        <div className="relative h-44 w-44 md:h-56 md:w-56 mb-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-3 rounded-full border-b-4 border-l-4 border-purple-500 animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />
          <div className="absolute inset-6 rounded-full border border-cyan-300/40 animate-pulse" />
          
          <div className="absolute inset-8 rounded-full bg-slate-950/90 backdrop-blur-2xl border border-cyan-500/40 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,242,254,0.4)]">
            <span className="font-mono text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-300 to-purple-300 tracking-tighter">
              {progress}%
            </span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase mt-1 flex items-center gap-1">
              <Volume2 className="h-3 w-3 text-cyan-400 animate-pulse" />
              <span>VOICE READY</span>
            </span>
          </div>
        </div>

        {/* Live System Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-2 text-xs font-mono font-bold text-cyan-300 mb-6 shadow-[0_0_25px_rgba(0,242,254,0.25)]">
          <Zap className="h-4 w-4 text-cyan-400 animate-bounce" />
          <span className="tracking-wider">INITIALIZING NASHIT KHAN SPATIAL PORTFOLIO</span>
        </div>

        {/* IMPRESSIVE GIANT HEADING */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-200 to-purple-300 mb-4 shadow-sm">
          WELCOME TO MY PORTFOLIO
        </h1>

        <p className="text-sm md:text-lg font-mono text-slate-300 tracking-[0.25em] uppercase mb-10">
          NASHIT KHAN // FRONTEND DEVELOPER & GSAP MOTION ENGINEER
        </p>

        {/* Full-Width Neon Progress Bar */}
        <div className="w-full max-w-xl h-2.5 rounded-full bg-slate-950 border border-cyan-500/30 overflow-hidden relative shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-600 transition-all duration-200 ease-out shadow-[0_0_25px_rgba(0,242,254,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* High-Tech Diagnostics Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-1.5">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>CORE: REACT 19</span>
          </span>
          <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-1.5">
            <Volume2 className="h-3.5 w-3.5 text-purple-400" />
            <span>VOICE: SYNTHESIZED</span>
          </span>
          <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>FPS: 60 MAX</span>
          </span>
        </div>
      </div>
    </div>
  );
};
