import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export const SectionHeader = ({ badge, title, subtitle, align = 'left' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll('.animate-header-item'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
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
