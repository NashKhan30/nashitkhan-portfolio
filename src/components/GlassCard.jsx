import React, { useRef } from 'react';
import { gsap } from '../lib/gsap';

export const GlassCard = ({ children, className = '', tilt = true, ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tilt || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power1.out',
      transformPerspective: 1000,
    });

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!tilt || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6 transition-shadow hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};