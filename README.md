# Nashit Khan // Frontend Developer Portfolio

A high-performance, animation-heavy portfolio built with **React**, **TypeScript**, **Tailwind CSS**, and **GSAP 3**, organized under a **4-Layer Feature-Based Architecture (FSD style)**.

---

## 📁 Clean Directory Structure

```
quick-archimedes/
├── 📄 index.html              # HTML5 Shell with Google Fonts & Meta Tags
├── 📄 package.json            # Project dependencies & scripts
├── 📄 vite.config.js          # Vite configuration
├── 📄 tailwind.config.js      # Tailwind CSS configuration
├── 📄 postcss.config.js       # PostCSS configuration
├── 📁 public/
│   └── 🖼️ nashit_khan.jpg     # Profile avatar asset
└── 📁 src/                    # SINGLE SOURCE OF TRUTH (REACT APP)
    ├── 📄 main.jsx            # Entry point (rendered without StrictMode for clean GSAP timelines)
    ├── 📄 index.css           # Tailwind directives & custom glass styling
    │
    ├── 📁 app/                # LAYER 1: Application Providers & App Shell
    │   └── 📄 App.jsx         # Main Layout with Lenis scroll & Custom Cursor
    │
    ├── 📁 features/           # LAYER 2: Business Feature Modules
    │   ├── 📁 hero/           # Hero Entrance Feature (Image First + Left Overlay)
    │   ├── 📁 navbar/         # Navigation Feature (GSAP Animated Sticky Glass Pill)
    │   ├── 📁 showcase/       # Active Development Lab & Future Projects Teasers
    │   ├── 📁 tech-stack/     # 3D 360° Revolving Kinetic Orbital Tech Matrix
    │   └── 📁 contact/        # Direct Contact & Interactive Form
    │
    ├── 📁 components/         # LAYER 3: Shared UI Primitives
    │   ├── 📄 CustomCursor.jsx
    │   ├── 📄 MagneticButton.jsx
    │   ├── 📄 GlassCard.jsx
    │   ├── 📄 SectionHeader.jsx
    │   ├── 📄 BackgroundParticles.jsx
    │   └── 📄 FpsWidget.jsx
    │
    └── 📁 lib/                # LAYER 4: Shared Motion Engines & Utilities
        ├── 📄 gsap.js         # GSAP 3 & ScrollTrigger registration
        ├── 📄 lenis.js        # Lenis smooth inertia scroll manager
        ├── 📄 textScramble.js # Kinetic text scramble engine
        └── 📄 audioSynth.js   # Web Audio API sound synthesizer
```

---

## 🚀 How to Run the Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open **`http://localhost:5173/`** in your browser!
