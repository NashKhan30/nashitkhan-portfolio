import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, Sparkles, Send, Code2 } from 'lucide-react';
import { sound } from '../../../lib/audioSynth';
import { gsap } from '../../../lib/gsap';

export const MobileNavModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
      );

      const links = linksRef.current.filter(Boolean);
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = (href) => {
    sound.playClick();
    onClose();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/98 backdrop-blur-3xl p-6 md:hidden overflow-y-auto"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <div className="h-full w-full rounded-[10px] bg-slate-950 flex items-center justify-center font-display font-black text-cyan-400 text-base">
              NK
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-slate-100 text-sm">NASHIT KHAN</span>
            <span className="text-[10px] font-mono text-cyan-400/80">Frontend Developer</span>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="p-2.5 rounded-full border border-cyan-500/30 bg-slate-900/90 text-slate-300 hover:text-cyan-400 active:scale-95 transition-all"
          aria-label="Close Mobile Navigation"
        >
          <X className="h-5 w-5 text-cyan-400" />
        </button>
      </div>

      {/* Nav Menu Links */}
      <nav className="flex flex-col gap-5 my-auto py-4">
        {[
          { number: '01', label: 'Home', href: '#hero', tag: 'HERO STAGE' },
          { number: '02', label: 'Projects', href: '#showcase', tag: 'PORTFOLIO' },
          { number: '03', label: 'Expertise', href: '#tech-stack', tag: '3D MATRIX' },
          { number: '04', label: 'Contact', href: '#contact', tag: 'GET IN TOUCH' },
        ].map((item, idx) => (
          <button
            key={idx}
            ref={(el) => (linksRef.current[idx] = el)}
            onClick={() => handleLinkClick(item.href)}
            className="group p-4 rounded-2xl border border-white/5 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-cyan-400 font-bold">{item.number}</span>
              <span className="text-xl font-display font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500 tracking-wider group-hover:text-cyan-400">
                {item.tag}
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </div>
          </button>
        ))}
      </nav>

      {/* Bottom Action Footer */}
      <div className="border-t border-white/10 pt-6 mt-auto space-y-4">
        <a
          href="#contact"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-600 py-4 text-xs font-mono font-bold text-slate-950 uppercase shadow-[0_0_25px_rgba(0,242,254,0.4)] active:scale-98 transition-all"
        >
          <Send className="h-4 w-4" />
          <span>Let's Build Something Amazing</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-2">
          <span>STATUS: AVAILABLE FOR HIRE</span>
          <span>NASHIT KHAN © 2026</span>
        </div>
      </div>
    </div>
  );
};