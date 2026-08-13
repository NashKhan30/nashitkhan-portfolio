import React, { useEffect, useRef } from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { GlassCard } from '../../../components/GlassCard';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { sound } from '../../../lib/audioSynth';
import { Code2, Sparkles, Layout, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServicesSection = () => {
  const containerRef = useRef(null);

  const services = [
    {
      id: 'react-next',
      icon: <Code2 className="h-8 w-8 text-cyan-400" />,
      badge: 'Architecture',
      title: 'Full-Stack React & Next.js Web Development',
      description:
        'Building scalable, high-performance web applications with Next.js App Router, React 19, Server Components, and clean modular state management.',
      capabilities: ['Server-Side Rendering (SSR)', 'TypeScript & Type Safety', 'State Management (Zustand/Redux)', 'REST & GraphQL API Integration'],
      accentColor: 'from-cyan-500/20 to-purple-600/10',
      borderColor: 'border-cyan-500/40',
    },
    {
      id: 'gsap-3d',
      icon: <Sparkles className="h-8 w-8 text-purple-400" />,
      badge: 'Motion & WebGL',
      title: 'GSAP 3D Motion & Spatial Web Engineering',
      description:
        'Crafting smooth 60 FPS interactive scroll timelines, 3D WebGL canvas shaders, orbital matrices, and micro-interactions that wow visitors.',
      capabilities: ['GSAP 3 ScrollTrigger Timelines', '3D WebGL & Canvas Shaders', 'Bi-Directional Scroll Physics', 'Interactive Kinetic UI Animations'],
      accentColor: 'from-purple-500/20 to-pink-600/10',
      borderColor: 'border-purple-500/40',
    },
    {
      id: 'ui-ux',
      icon: <Layout className="h-8 w-8 text-pink-400" />,
      badge: 'Design Systems',
      title: 'UI/UX Systems & High-Fidelity Glassmorphism',
      description:
        'Designing sleek dark modes, vibrant color palettes, glassmorphism UI components, responsive layout grids, and WCAG accessible design systems.',
      capabilities: ['Tailwind CSS v4 Utilities', 'Glassmorphism & Neon Design', 'Fluid Responsive Layouts', 'A11y Accessibility Standards'],
      accentColor: 'from-pink-500/20 to-amber-600/10',
      borderColor: 'border-pink-500/40',
    },
    {
      id: 'performance',
      icon: <Zap className="h-8 w-8 text-emerald-400" />,
      badge: 'Optimization',
      title: 'Core Web Vitals & Performance Engineering',
      description:
        'Optimizing LCP, INP, and CLS performance metrics through code-splitting, asset compression, lazy loading, and Lighthouse audit optimization.',
      capabilities: ['Lighthouse 100 Performance Audit', 'Image & Asset Compression', 'Vite & Webpack Optimization', 'Sub-second Instant Page Loads'],
      accentColor: 'from-emerald-500/20 to-cyan-600/10',
      borderColor: 'border-emerald-500/40',
    },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.service-card-wrapper');

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      end: 'bottom 15%',
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18, duration: 1.0, ease: 'power4.out' }
        );
      },
      onEnterBack: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: -80, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18, duration: 1.0, ease: 'power4.out' }
        );
      },
      onLeave: () => {
        gsap.to(cards, { opacity: 0, y: -40, duration: 0.35 });
      },
      onLeaveBack: () => {
        gsap.to(cards, { opacity: 0, y: 40, duration: 0.35 });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative py-28 px-6 z-10 max-w-7xl mx-auto">
      <SectionHeader
        badge="Engineering Solutions & Services"
        title="Specialized Frontend & Motion Engineering"
        subtitle="Transforming complex ideas into high-performance, interactive, and visually stunning digital products."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);
  const floatRef = useRef(null);

  useEffect(() => {
    // Continuous subtle floating kinetic motion
    if (floatRef.current) {
      gsap.to(floatRef.current, {
        y: -5,
        duration: 3.5 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.easeInOut',
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotateY: (x / rect.width) * 12,
      rotateX: (-y / rect.height) * 12,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <div ref={floatRef} className="service-card-wrapper h-full transform-gpu">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full transform-gpu perspective-1000"
      >
        <GlassCard className="group flex flex-col justify-between h-full p-8 transition-all duration-300 border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(0,242,254,0.2)] relative overflow-hidden">
          {/* Subtle Ambient Background Gradient Aura */}
          <div className={`absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br ${service.accentColor} blur-3xl rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />

          <div className="relative z-10">
            {/* Header / Icon & Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300 shadow-lg">
                {service.icon}
              </div>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 font-bold">
                {service.badge}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-bold font-display text-slate-100 group-hover:text-cyan-300 transition-colors mb-3">
              {service.title}
            </h3>

            <p className="text-sm font-sans text-slate-300 leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Capability Checklist */}
            <div className="space-y-2.5 mb-8">
              {service.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Footer Action */}
          <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Available for Freelance / Hire</span>
            <a
              href="#contact"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group/btn"
            >
              <span>Inquire Solution</span>
              <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
