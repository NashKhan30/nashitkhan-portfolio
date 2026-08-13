import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { projectsData } from '../data/projectsData';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { sound } from '../../../lib/audioSynth';
import { RefreshCw, CheckCircle2, ChevronDown, Layers, Unlock } from 'lucide-react';

export const ShowcaseSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const bannerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const categories = ['All', 'React & GSAP', '3D Web', 'Interactive Motion'];

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const handleToggleExpand = () => {
    sound.playClick();
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    // Banner Entrance Animation on scroll down & scroll up
    if (bannerRef.current) {
      const banner = bannerRef.current;
      const trigger = ScrollTrigger.create({
        trigger: banner,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => {
          gsap.fromTo(
            banner,
            { opacity: 0, y: 70, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power4.out' }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(
            banner,
            { opacity: 0, y: -70, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power4.out' }
          );
        },
        onLeave: () => {
          gsap.to(banner, { opacity: 0, y: -40, duration: 0.35 });
        },
        onLeaveBack: () => {
          gsap.to(banner, { opacity: 0, y: 40, duration: 0.35 });
        },
      });

      return () => trigger.kill();
    }
  }, []);

  useEffect(() => {
    // Animate Cards when expanded or when category changes
    if (isExpanded && cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.project-card-item');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }
  }, [isExpanded, activeCategory]);

  return (
    <section id="showcase" className="relative py-24 px-6 z-10 max-w-7xl mx-auto">
      <SectionHeader
        badge="Curated Portfolio Showcase"
        title="Featured Projects & Spatial Web Apps"
        subtitle="Explore production-grade React case studies, GSAP motion systems, and interactive WebGL experiences."
      />

      {/* 1. HIGH-TECH FEATURED PROJECTS "COMING SOON / POLISHING STAGE" BANNER */}
      <div
        ref={bannerRef}
        className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-950 via-slate-900/90 to-purple-950/40 p-8 md:p-10 mb-12 shadow-[0_10px_50px_rgba(0,242,254,0.15)]"
      >
        {/* Glow background ambient */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-3xl">
            {/* Live Lab Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-bold text-amber-300 mb-4 shadow-inner">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>IN THE LAB // CURRENTLY POLISHING FEATURED CASE STUDIES</span>
            </div>

            <h3 className="text-2xl md:text-4xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-200 to-purple-300 mb-3">
              Featured React JS & Next.js Case Studies Coming Soon!
            </h3>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans mb-6">
              I am currently polishing deep-dive <span className="text-cyan-300 font-semibold">React JS, Next.js, and GSAP Motion</span> case studies with full architectural breakdowns, performance benchmarks, and live interactive demos.
            </p>

            {/* Polishing Checklist Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-slate-900/80 px-3 py-1.5 text-xs font-mono text-cyan-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>React JS & Next.js Apps</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-slate-900/80 px-3 py-1.5 text-xs font-mono text-purple-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                <span>GSAP 3 ScrollTrigger Timelines</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-slate-900/80 px-3 py-1.5 text-xs font-mono text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>60 FPS WebGL & 3D Canvas</span>
              </div>
            </div>
          </div>

          {/* Interactive Expand / Unlock Button */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-3">
            <button
              onClick={handleToggleExpand}
              className={`w-full sm:w-auto rounded-2xl px-8 py-4 text-sm font-mono font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                isExpanded
                  ? 'border border-cyan-500/50 bg-slate-900 text-cyan-300 shadow-[0_0_30px_rgba(0,242,254,0.3)] hover:bg-slate-800'
                  : 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-600 text-slate-950 shadow-[0_0_40px_rgba(0,242,254,0.4)] hover:brightness-110 hover:scale-[1.02]'
              }`}
            >
              {isExpanded ? (
                <>
                  <Unlock className="h-4 w-4 text-cyan-400" />
                  <span>Hide Projects</span>
                  <ChevronDown className="h-4 w-4 transform rotate-180 transition-transform" />
                </>
              ) : (
                <>
                  <Layers className="h-4 w-4 text-slate-950 animate-bounce" />
                  <span>Click to Expand & View Projects</span>
                  <ChevronDown className="h-4 w-4 animate-bounce" />
                </>
              )}
            </button>
            <span className="text-[11px] font-mono text-slate-400">
              {isExpanded ? 'Click to hide portfolio showcase' : 'Click to reveal 4 curated project cards!'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. COLLAPSIBLE FEATURED PROJECTS GRID (Revealed Only On Click) */}
      {isExpanded && (
        <div className="space-y-8 animate-fadeIn">
          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat);
                }}
                className={`rounded-full px-5 py-2 text-xs font-mono font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.3)]'
                    : 'border border-white/10 bg-slate-900/60 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid with 3D Tilt Cards */}
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card-item">
                <ProjectCard
                  project={project}
                  onOpenModal={(proj) => setSelectedProject(proj)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};