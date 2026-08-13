import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu } from 'lucide-react';
import { sound } from '../../../lib/audioSynth';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 md:p-8 shadow-[0_0_50px_rgba(0,242,254,0.3)]">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-slate-100">
                {project.title}
              </h3>
              <span className="text-xs font-mono text-cyan-400">{project.subtitle}</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Thumbnail Image */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-video mb-6">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-slate-300 font-sans leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Key Architectural Features */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
            Key Architectural Highlights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            {project.tags.map((t, i) => (
              <span key={i} className="rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-[10px] font-mono text-slate-400">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
            >
              <Github className="h-4 w-4" />
              <span>Source Code</span>
            </a>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2 text-xs font-mono font-bold text-slate-950 uppercase shadow-[0_0_15px_rgba(0,242,254,0.3)]"
            >
              <span>Launch Demo</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};