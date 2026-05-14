# NEXUS — Premium 3D Interactive Website

A cinematic, Awwwards-style 3D interactive website built with React, Three.js (React Three Fiber), GSAP, Framer Motion, and TailwindCSS.

## Features

- **3D Scene** — Realistic torus knot with transmission material, orbiting rings, and inner glow
- **Smooth Scrolling** — Lenis-powered smooth scroll with GSAP ScrollTrigger
- **Particle System** — 2000 animated particles with additive blending
- **Post-Processing** — Bloom, chromatic aberration, and vignette effects
- **Mouse Tracking** — 3D object reacts to mouse movement with smooth interpolation
- **Scroll Animations** — Object transforms, camera moves, and parallax effects on scroll
- **Loading Screen** — Animated progress bar with gradient orbs
- **Responsive Design** — Mobile and desktop optimized
- **Premium UI** — Glass morphism cards, gradient text, hover animations

## Tech Stack

- React 19
- Vite
- Three.js + React Three Fiber + Drei
- GSAP + ScrollTrigger
- Framer Motion
- TailwindCSS v4
- Lenis (smooth scroll)
- Postprocessing

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── scene/          # 3D scene components
│   │   ├── Scene.jsx
│   │   ├── FloatingObject.jsx
│   │   ├── CameraRig.jsx
│   │   ├── Lights.jsx
│   │   ├── ParticleField.jsx
│   │   └── PostProcessing.jsx
│   ├── layout/         # Page sections
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── ShowcaseSection.jsx
│   │   ├── TechSection.jsx
│   │   └── FooterSection.jsx
│   ├── ui/             # UI components
│   │   ├── Navbar.jsx
│   │   └── LoadingScreen.jsx
│   └── effects/        # Visual effects
│       ├── BackgroundGradient.jsx
│       └── ScrollProgress.jsx
├── hooks/              # Custom hooks
│   ├── useMousePosition.js
│   ├── useSmoothScroll.js
│   └── useScrollProgress.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```
