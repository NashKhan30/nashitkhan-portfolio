import React, { useEffect, useRef } from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { GlassCard } from '../../../components/GlassCard';
import { ContactForm } from './ContactForm';
import { Mail, MapPin, Globe, Github, Linkedin, Twitter } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

export const ContactSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.contact-card-animate');

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      end: 'bottom 10%',
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1.0, ease: 'power4.out' }
        );
      },
      onEnterBack: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: -80, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1.0, ease: 'power4.out' }
        );
      },
      onLeave: () => {
        gsap.to(cards, { opacity: 0, y: -40, duration: 0.35, ease: 'power2.in' });
      },
      onLeaveBack: () => {
        gsap.to(cards, { opacity: 0, y: 40, duration: 0.35, ease: 'power2.in' });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="relative py-24 px-6 z-10 max-w-7xl mx-auto">
      <SectionHeader
        badge="Initiate Transmission"
        title="Let's Build Something Exceptional"
        subtitle="Have a project in mind, a freelance inquiry, or full-time opportunities? Reach out below!"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 contact-card-animate">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold font-display text-slate-100 mb-6">
              Contact & Social Channels
            </h3>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 uppercase">Direct Email</span>
                  <a href="mailto:nashitkhan.dev@gmail.com" className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                    nashitkhan.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 uppercase">Location</span>
                  <span className="text-sm font-semibold text-slate-200">Available Worldwide (Remote / Hybrid)</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 uppercase">Availability</span>
                  <span className="text-sm font-semibold text-emerald-400 font-mono">Open for Immediate Hire</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <span className="block text-xs font-mono text-slate-400 uppercase mb-4">Connect Elsewhere</span>
              <div className="flex items-center gap-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Form Card */}
        <div className="lg:col-span-7 contact-card-animate">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold font-display text-slate-100 mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </GlassCard>
        </div>
      </div>
    </section>
  );
};