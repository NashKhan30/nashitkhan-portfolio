import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const xDotSet = gsap.quickSetter(dot, 'x', 'px');
    const yDotSet = gsap.quickSetter(dot, 'y', 'px');

    const xRingSet = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power2.out' });
    const yRingSet = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xDotSet(mouseX);
      yDotSet(mouseY);
      xRingSet(mouseX);
      yRingSet(mouseY);
    };

    const handleMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.7, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.15 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2fe]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-cyan-400/50 transition-colors"
      />
    </div>
  );
};