import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/90 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-black text-cyan-400 text-lg tracking-wider">
            NK // NASHIT KHAN
          </span>
          <span className="text-xs font-mono text-slate-400 mt-1">
            Architected with React & GSAP 3 (Feature Architecture)
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>Crafted by Nashit Khan</span>
          <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
