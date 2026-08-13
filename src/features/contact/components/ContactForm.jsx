import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '../../../components/MagneticButton';
import { sound } from '../../../lib/audioSynth';

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-mono text-cyan-400 mb-1.5 uppercase tracking-wider">
          Your Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nashit Khan"
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-400 mb-1.5 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="nashit@example.com"
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-400 mb-1.5 uppercase tracking-wider">
          Project Inquiry / Message
        </label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell me about your project, timeline, or opportunities..."
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
        />
      </div>

      {submitted ? (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-4 text-emerald-400 font-mono text-sm">
          <CheckCircle2 className="h-5 w-5" />
          <span>Message transmitted successfully! Nashit will get back to you shortly.</span>
        </div>
      ) : (
        <MagneticButton
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3.5 text-sm font-mono font-bold text-slate-950 uppercase tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all"
        >
          <span className="flex items-center gap-2">
            <span>Send Message</span>
            <Send className="h-4 w-4" />
          </span>
        </MagneticButton>
      )}
    </form>
  );
};