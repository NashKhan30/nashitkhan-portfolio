import React, { useEffect, useState } from 'react';
import { Activity, Zap } from 'lucide-react';
import { gsap } from '../lib/gsap';

export const FpsWidget = () => {
  const [fps, setFps] = useState(60);
  const [tweens, setTweens] = useState(0);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const ticker = () => {
      frames++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
        setTweens(gsap.globalTimeline.getChildren().length);
      }
    };

    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden lg:flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-slate-300 shadow-xl">
      <div className="flex items-center gap-1.5 text-cyan-400">
        <Activity className="h-3.5 w-3.5 animate-pulse" />
        <span>{fps} FPS</span>
      </div>
      <span className="h-3 w-px bg-white/10" />
      <div className="flex items-center gap-1.5 text-purple-400">
        <Zap className="h-3.5 w-3.5" />
        <span>{tweens} Active Tweens</span>
      </div>
    </div>
  );
};