import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export const SectionHeader = ({ badge, title, subtitle, align = 'left' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll('.animate-header-item');

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'bottom 15%',
      onEnter: () => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 70, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.9, ease: 'power4.out' }
        );
      },
      onEnterBack: () => {
        gsap.fromTo(
          items,
          { opacity: 0, y: -70, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.9, ease: 'power4.out' }
        );
      },
      onLeave: () => {
        gsap.to(items, { opacity: 0, y: -40, duration: 0.3, ease: 'power2.in' });
      },
      onLeaveBack: () => {
        gsap.to(items, { opacity: 0, y: 40, duration: 0.3, ease: 'power2.in' });
      },
    });

    return () => trigger.kill();
  }, []);

  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div ref={containerRef} className={`flex flex-col ${alignClass} mb-12`}>
      {badge && (
        <span className="animate-header-item inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono font-medium tracking-wider text-cyan-400 uppercase backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className="animate-header-item text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 font-display">
        {title}
      </h2>
      {subtitle && (
        <p className="animate-header-item mt-4 max-w-2xl text-base md:text-lg text-slate-400 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};