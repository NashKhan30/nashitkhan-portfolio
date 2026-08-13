# 🚀 Nashit Khan — Spatial Frontend Portfolio & Motion Showcase

A high-performance, spatial web portfolio engineered with **React 19**, **Vite**, **GSAP 3**, and **Tailwind CSS**. Built to showcase modern frontend architecture, 60 FPS interactive motion systems, and custom Web Audio FX.

![Portfolio Preview](public/nashit_khan.jpg)

---

## ✨ Overview & Core Features

- **⚡ Instant 60 FPS Performance**: Powered by Vite 5 and GSAP ScrollTrigger engine for sub-second page loads.
- **🎨 Modern Dark Glassmorphic Aesthetic**: Deep dark canvas (`#0a0b0e`) with HSL neon glows, frosted glass cards (`backdrop-blur-2xl`), and sleek typography.
- **🔊 Web Audio API Sound FX**: Integrated Web Audio synthesizer for tactile click, hover, and system status chime feedback.
- **📱 100% Fully Responsive**: Pixel-perfect layout optimization for Mobile, Tablet, Laptop, and 4K Ultra-wide displays.
- **♿ WCAG Accessible**: Semantic HTML5, accessible contrast ratios, keyboard navigation support, and clean ARIA attributes.

---

## 🎭 Comprehensive Animation & Motion Architecture

### 1. 🌟 Welcome Intro Preloader (`WelcomeIntro.jsx`)
- **Kinetic Energy Reactor Ring**: Continuous dual-ring revolving SVG animation with pulsating neon glow.
- **Digital Progress Counter**: Smooth non-linear `0% → 100%` system initialization countup (~3.8s).
- **Split-Gate Curtain Reveal**: GSAP `power4.inOut` bi-directional curtain gate transition unveiling the main homepage.
- **Audio Power-Up Chime**: Web Audio synthesizer chime plays upon reaching 100% initialization.

### 2. ⚡ Hero Intro Stage (`HeroIntro.jsx` & `HeroImageOverlay.jsx`)
- **Slanted ALL-CAPS Logo Badge**: Tilted 3D typography for **NASHIT KHAN** with a glowing light shimmer effect.
- **3D Mouse Perspective Tilt**: Interactive card mouse-tracking (`rotateX`, `rotateY`) using GSAP `power2.out`.
- **Continuous 360° Revolving Kinetic Orbit**: Orbital dashed border continuously rotates 360° (`duration: 20s`).
- **Kinetic Wave Floating Motion**: Smooth infinite y-axis floating motion (`sine.easeInOut`) keeping the hero section alive.

### 3. 🃏 Project Showcase (`ShowcaseSection.jsx` & `ProjectCard.jsx`)
- **3D Interactive Card Tilt**: Smooth mouse tracking that dynamically tilts project cards in 3D space on hover.
- **Hover Thumbnail Zoom**: Project preview images scale smoothly (`scale: 1.10`) on cursor hover.
- **Bi-Directional GSAP Entrance**: Cards animate into view cleanly on scroll down (`onEnter`) AND scroll back up (`onEnterBack`).
- **Interactive Telemetry Modal**: Modal dialog for deep-dive architectural case study breakdowns.

### 4. ⚛️ 360° Tech Stack Matrix (`TechStackSection.jsx`)
- **Continuous Revolving Orbital Ticker**: Technology nodes continuously orbit around the central core using `gsap.ticker`.
- **Interactive Telemetry Inspector**: Hovering over any technology node pauses orbit and renders live code snippets & mastery meters.
- **3D Canvas Perspective Tilt**: Mouse movement dynamically tilts the entire orbital canvas up to 25 degrees.

### 5. ✉️ Contact & Interactive Controls (`ContactSection.jsx` & `Navbar.jsx`)
- **Magnetic Action Buttons**: Buttons pull magnetic cursor towards center using GSAP physics (`MagneticButton.jsx`).
- **Floating Glass Nav Pill Bar**: Scroll-aware navbar with active pill tracking and sound toggle controls.

---

## 🛠️ Technology Stack & Dependencies

| Category | Technology / Library |
| :--- | :--- |
| **Core Framework** | React 19, JavaScript (ESNext) |
| **Build System** | Vite 5 |
| **Styling & Design** | Vanilla CSS, Tailwind CSS |
| **Animation Engine** | GSAP 3 (ScrollTrigger, Ticker, Timelines) |
| **Icons & UI** | Lucide React |
| **Audio FX** | Custom Web Audio API Synthesizer (`audioSynth.js`) |
| **Smooth Scroll** | Lenis Smooth Scroll |

---

## 💻 Getting Started Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nashitkhan/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or `http://localhost:3018`) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled bundle will be generated in the `dist/` directory.

---

## 🚀 Deployment

This project is configured for one-click deployment on **Vercel**, **Netlify**, or **GitHub Pages**:

```bash
# Vercel Deployment
npx vercel

# Netlify Deployment
npx netlify deploy --prod --dir=dist
```

---

## 👤 Author & Credits

**Nashit Khan** — *Frontend Developer*
- **Portfolio**: [Nashit Khan Portfolio](http://localhost:3018/)
- **GitHub**: [@nashitkhan](https://github.com/)

---
*Designed & Engineered with ❤️ by Nashit Khan.*
