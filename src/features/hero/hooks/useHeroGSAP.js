import { useEffect } from 'react';
import { gsap } from '../../../lib/gsap';
import { TextScramble } from '../../../lib/textScramble';

export const useHeroGSAP = ({
  heroRef,
  titleRef,
  headlineRef,
  pitchRef,
  quoteRef,
  ctaRef,
  imageRef,
  overlayTextRef,
}) => {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

      // 1. IMAGE CONTAINER REVEALS FIRST
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 0.85, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.4)' }
        );
      }

      // 2. NASHIT KHAN OVERLAY BADGE SLIDES IN FROM LEFT
      if (overlayTextRef.current) {
        tl.fromTo(
          overlayTextRef.current,
          { x: -120, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
          '-=0.6'
        );
      }

      // 3. HEADLINE, PITCH, QUOTE & CTAS REVEAL
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.7'
        );
      }

      if (pitchRef.current) {
        tl.fromTo(
          pitchRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.7'
        );
      }

      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
          '-=0.6'
        );
      }

      // 4. Kinetic Text Scramble Loop for Title Badge
      if (titleRef.current) {
        const scrambler = new TextScramble(titleRef.current);
        const roles = [
          'FRONTEND DEVELOPER',
          'REACT & TYPESCRIPT ENGINEER',
          'GSAP MOTION ARCHITECT',
        ];
        let counter = 0;

        const nextRole = () => {
          scrambler.setText(roles[counter]).then(() => {
            setTimeout(nextRole, 3000);
          });
          counter = (counter + 1) % roles.length;
        };

        setTimeout(nextRole, 1200);
      }
    }, hero);

    return () => ctx.revert();
  }, []);
};