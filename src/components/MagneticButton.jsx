import React, { useRef } from 'react';
import { gsap } from '../lib/gsap';
import { sound } from '../lib/audioSynth';

export const MagneticButton = ({ children, className = '', onClick, href, strength = 0.3, ...props }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;

    gsap.to(btn, {
      x,
      y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleClick = (e) => {
    sound.playClick();
    if (onClick) onClick(e);
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-transform ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};