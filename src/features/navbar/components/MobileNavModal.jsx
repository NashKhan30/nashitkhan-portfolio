import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { sound } from '../../../lib/audioSynth';

export const MobileNavModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleLinkClick = (href) => {
    sound.playClick();
    onClose();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-2xl p-6 md:hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
            <div className="h-full w-full rounded-[10px] bg-slate-950 flex items-center justify-center font-display font-black text-cyan-400">
              NK
            </div>
          </div>
          <span className="font-display font-bold text-slate-100">NASHIT KHAN</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-col gap-6 my-auto">
        {[
          { label: 'Home', href: '#hero' },
          { label: 'Projects', href: '#showcase' },
          { label: 'Expertise', href: '#tech-stack' },
          { label: 'Contact', href: '#contact' },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleLinkClick(item.href)}
            className="text-left text-2xl font-display font-bold text-slate-200 hover:text-cyan-400 transition-colors flex items-center justify-between"
          >
            <span>{item.label}</span>
            <ArrowUpRight className="h-5 w-5 text-cyan-400" />
          </button>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-6 mt-auto">
        <a
          href="#contact"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 text-sm font-mono font-bold text-slate-950 uppercase"
        >
          <span>Let's Talk</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};