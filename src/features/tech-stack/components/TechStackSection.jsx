import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { GlassCard } from '../../../components/GlassCard';
import { techStackItems } from '../data/techData';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { sound } from '../../../lib/audioSynth';
import { Cpu, Terminal } from 'lucide-react';

export const TechStackSection = () => {
  const [selectedTech, setSelectedTech] = useState(techStackItems[0]);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const orbitalRingRef = useRef(null);
  const orbitAngleRef = useRef(0);
  const nodesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const ring = orbitalRingRef.current;
    if (!container || !ring) return;

    // 1. Heavy GSAP 3D Assembly Timeline on ScrollTrigger
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
        },
      });

      // Central core pulse animation
      tl.fromTo(
        '.tech-core-nucleus',
        { scale: 0, opacity: 0, rotate: -180 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.7)' }
      );

      // Nodes entrance
      tl.fromTo(
        '.tech-orbital-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 1.0,
          ease: 'back.out(1.5)',
        },
        '-=0.8'
      );
    }, container);

    // 2. CONTINUOUS 360 DEGREE REVOLVING ORBITAL MOTION TICKER (RAZOR SHARP MOBILE RENDERING)
    const isMobile = window.innerWidth < 640;
    const radius = isMobile ? 125 : 190;

    const tickerCallback = (time, deltaTime) => {
      if (!isPaused) {
        // Increment global angle smoothly over time
        orbitAngleRef.current += deltaTime * 0.00035;
      }

      const currentAngle = orbitAngleRef.current;
      const count = techStackItems.length;

      nodesRef.current.forEach((node, idx) => {
        if (!node) return;
        const angle = currentAngle + (idx / count) * 2 * Math.PI;
        // Snap to integer pixels to eliminate subpixel font blur on mobile GPUs
        const x = Math.round(Math.cos(angle) * radius);
        const y = Math.round(Math.sin(angle) * radius);

        // Position nodes using translate3d for hardware acceleration without text blur
        node.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
      });
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
    };
  }, [isPaused]);

  // 3D Tilt Effect on Orbit Canvas based on mouse position
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const ring = orbitalRingRef.current;
    if (!container || !ring) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(ring, {
      rotateY: (x / rect.width) * 18,
      rotateX: (-y / rect.height) * 18,
      duration: 0.5,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (!orbitalRingRef.current) return;
    gsap.to(orbitalRingRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const handleNodeClick = (tech) => {
    sound.playClick();
    setSelectedTech(tech);
  };

  const handleNodeMouseEnter = (tech) => {
    sound.playHover();
    setIsPaused(true); // Pause orbit on hover so user can interact cleanly
  };

  return (
    <section
      id="tech-stack"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-20 sm:py-28 px-4 sm:px-6 z-10 max-w-7xl mx-auto overflow-hidden"
    >
      <SectionHeader
        badge="Expertise & Technologies"
        title="Modern Tech Stack & Core Competencies"
        subtitle="Production-tested frontend ecosystem powering fast, scalable, and responsive web applications."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column / Revolving 3D Circle Canvas (7 Cols) */}
        <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center">
          {/* Orbital Laser SVG Path Lines Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 600 600">
            {/* Outer Revolving Circle */}
            <circle
              cx="300"
              cy="300"
              r="220"
              fill="none"
              stroke="rgba(0, 242, 254, 0.2)"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-spin"
              style={{ animationDuration: '30s' }}
            />
            {/* Inner Ring */}
            <circle
              cx="300"
              cy="300"
              r="140"
              fill="none"
              stroke="rgba(139, 92, 246, 0.25)"
              strokeWidth="1.5"
              className="animate-spin"
              style={{ animationDuration: '20s', animationDirection: 'reverse' }}
            />
          </svg>

          {/* Central Power Core */}
          <div className="tech-core-nucleus absolute z-10 h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full bg-slate-950 border-2 border-cyan-400/60 p-2 shadow-[0_0_50px_rgba(0,242,254,0.4)] flex flex-col items-center justify-center text-center">
            <Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 animate-pulse mb-1" />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-slate-200 uppercase">
              NASHIT // CORE
            </span>
          </div>

          {/* 3D Revolving Circle Container */}
          <div
            ref={orbitalRingRef}
            className="relative z-20 w-full max-w-[420px] sm:max-w-[540px] aspect-square flex items-center justify-center transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {techStackItems.map((tech, idx) => {
              const isSelected = selectedTech?.id === tech.id;

              return (
                <div
                  key={tech.id}
                  ref={(el) => (nodesRef.current[idx] = el)}
                  onClick={() => handleNodeClick(tech)}
                  onMouseEnter={() => handleNodeMouseEnter(tech)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={`tech-orbital-node absolute cursor-pointer rounded-xl border p-2.5 sm:p-3.5 transition-all duration-300 transform-gpu [backface-visibility:hidden] [will-change:transform] [-webkit-font-smoothing:antialiased] group ${
                    isSelected
                      ? 'border-cyan-400 bg-slate-950 shadow-[0_0_35px_rgba(0,242,254,0.5)] scale-110 z-30'
                      : 'border-white/15 bg-slate-950/95 hover:border-cyan-400/60 hover:scale-105 z-20'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="text-lg sm:text-2xl group-hover:scale-115 transition-transform">
                      {tech.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display font-extrabold text-xs sm:text-sm text-slate-100 group-hover:text-cyan-300 whitespace-nowrap">
                        {tech.name}
                      </span>
                      <span className="text-[9px] font-mono text-cyan-400 font-bold">
                        {tech.level}% Mastery
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column / Holographic Inspector Box (5 Cols) */}
        <div className="lg:col-span-5 relative">
          <GlassCard className="p-6 sm:p-8 space-y-6 border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,254,0.15)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">{selectedTech.icon}</span>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                    Telemetry Inspector
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-100">{selectedTech.name}</h3>
                </div>
              </div>
              <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-xs font-mono text-purple-300">
                {selectedTech.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
              {selectedTech.tagline}
            </p>

            {/* Proficiency Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Production Proficiency</span>
                <span className="font-bold text-cyan-400">{selectedTech.level}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_15px_#00f2fe] transition-all duration-500"
                  style={{ width: `${selectedTech.level}%` }}
                />
              </div>
            </div>

            {/* Live Code Snippet Box */}
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-[11px] sm:text-xs text-slate-200 overflow-x-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/5 pb-2 mb-3">
                <span>{selectedTech.id}-telemetry.ts</span>
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <pre className="text-cyan-300/90 whitespace-pre-wrap leading-relaxed">{selectedTech.snippet}</pre>
            </div>

            {/* Tech Selector Pills */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-3">
                Select Node:
              </span>
              <div className="flex flex-wrap gap-2">
                {techStackItems.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => handleNodeClick(tech)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-mono transition-all ${
                      selectedTech.id === tech.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                        : 'border border-white/10 bg-slate-900 text-slate-300 hover:border-cyan-400/50'
                    }`}
                  >
                    {tech.name}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
