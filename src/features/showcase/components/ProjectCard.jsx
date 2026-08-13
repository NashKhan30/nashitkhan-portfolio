import React, { useRef, useEffect } from 'react';
import { GlassCard } from '../../../components/GlassCard';
import { ExternalLink, Github, Sparkles, Activity } from 'lucide-react';
import { sound } from '../../../lib/audioSynth';
import { gsap } from '../../../lib/gsap';

export const ProjectCard = ({ project, onOpenModal }) => {
  const cardRef = useRef(null);
  const floatRef = useRef(null);

  useEffect(() => {
    // Continuous subtle floating kinetic motion
    if (floatRef.current) {
      gsap.to(floatRef.current, {
        y: -6,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.easeInOut',
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotateY: (x / rect.width) * 10,
      rotateX: (-y / rect.height) * 10,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <div ref={floatRef} className="h-full transform-gpu">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full transform-gpu perspective-1000"
      >
        <GlassCard className="group flex flex-col justify-between h-full p-6 transition-all duration-300 border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(0,242,254,0.2)]">
          <div>
            {/* Project Thumbnail Image with Hover Zoom */}
            <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-video mb-6 border border-white/10 group-hover:border-cyan-500/40 transition-colors">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="rounded-full border border-cyan-500/40 bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-cyan-300 font-bold shadow-md">
                  {project.categoryTag}
                </span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-emerald-400 font-bold shadow-md">
                <Activity className="h-3 w-3 animate-pulse" />
                <span>{project.metrics.fps}</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-xl md:text-2xl font-bold font-display text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
              {project.title}
            </h3>

            <p className="text-xs font-mono text-cyan-400 mb-3">
              {project.subtitle}
            </p>

            <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-white/10 bg-slate-900/80 px-2.5 py-1 text-[11px] font-mono text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Card Actions */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenModal(project);
                }}
                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Inspect Spec</span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="p-2 rounded-lg border border-white/10 bg-slate-900/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  title="View GitHub Repository"
                >
                  <Github className="h-4 w-4" />
                </a>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                  title="Launch Live App"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};