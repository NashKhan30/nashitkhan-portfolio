import React, { useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

export const PinnedProjectStack = ({ projects, onOpenModal }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!container || cards.length === 0) return;

    // Refresh ScrollTrigger after DOM render to ensure perfect pin measurements
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const ctx = gsap.context(() => {
      // Card 0 (AETHER) is visible at yPercent: 0.
      // Cards 1 (NEXUS), 2 (QUANTUM), 3 (HYPERION) start offscreen at yPercent: 100.
      cards.forEach((card, idx) => {
        if (idx > 0) {
          gsap.set(card, { yPercent: 100, scale: 1, opacity: 1 });
        } else {
          gsap.set(card, { yPercent: 0, scale: 1, opacity: 1 });
        }
      });

      // Pinned GSAP ScrollTrigger Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${cards.length * 100}%`, // Scroll distance proportional to card count
          pin: true,
          pinSpacing: true,
          scrub: 0.8, // Responsive scrub tracking mouse wheel / touch
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        // Slide Card i UP from bottom over Card i-1
        tl.to(card, {
          yPercent: 0,
          duration: 1,
          ease: 'none',
        });

        // Scale down & dim previous Card i-1 underneath
        tl.to(
          cards[i - 1],
          {
            scale: 0.93,
            opacity: 0.4,
            duration: 1,
            ease: 'none',
          },
          '<'
        );
      });
    }, container);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [projects]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden py-4"
    >
      {projects.map((project, idx) => (
        <div
          key={project.id}
          ref={(el) => (cardsRef.current[idx] = el)}
          className="absolute inset-0 flex items-center justify-center p-3 md:p-6"
          style={{ zIndex: 10 + idx }}
        >
          <div className="w-full max-w-4xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950/95">
            <ProjectCard project={project} onOpenModal={onOpenModal} />
          </div>
        </div>
      ))}
    </div>
  );
};
