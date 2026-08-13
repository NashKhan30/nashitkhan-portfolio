import React, { useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

export const StackedProjectCards = ({ projects, onOpenModal }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.stacked-card-wrapper');

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card doesn't scale down

        const inner = card.querySelector('.stacked-card-inner');

        gsap.to(inner, {
          scale: 0.92,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 85%',
            end: 'top 30%',
            scrub: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={containerRef} className="space-y-20 py-8 max-w-4xl mx-auto">
      {projects.map((project, idx) => (
        <div
          key={project.id}
          className="stacked-card-wrapper sticky top-24 transform-gpu"
          style={{ zIndex: 10 + idx }}
        >
          <div className="stacked-card-inner rounded-3xl border border-cyan-500/30 bg-slate-950/95 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300">
            <ProjectCard project={project} onOpenModal={onOpenModal} />
          </div>
        </div>
      ))}
    </div>
  );
};
