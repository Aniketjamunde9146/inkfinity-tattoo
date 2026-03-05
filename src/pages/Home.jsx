import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   INKFINITY TATTOO STUDIO — by Abhi Borge
   Single-file React component (drop into Home.jsx)
   Theme: Midnight Ink — Deep black + electric cyan + white
═══════════════════════════════════════════════════════════ */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:          #09090b;
    --bg2:         #0f0f12;
    --bg3:         #141417;
    --surface:     #1a1a1f;
    --surface2:    #222228;
    --white:       #ffffff;
    --white-60:    rgba(255,255,255,0.6);
    --white-30:    rgba(255,255,255,0.3);
    --white-10:    rgba(255,255,255,0.08);
    --white-05:    rgba(255,255,255,0.04);
    --cyan:        #00e5ff;
    --cyan-dim:    #00b8cc;
    --cyan-glow:   rgba(0,229,255,0.15);
    --cyan-subtle: rgba(0,229,255,0.06);
    --border:      rgba(255,255,255,0.07);
    --border-cyan: rgba(0,229,255,0.2);
    --shadow:      0 4px 30px rgba(0,0,0,0.4);
    --shadow-lg:   0 20px 60px rgba(0,0,0,0.6);
    --glow:        0 0 30px rgba(0,229,255,0.2);
    --radius:      2px;
    --font-display: 'Bebas Neue', 'Arial Narrow', sans-serif;
    --font-head:    'Syne', system-ui, sans-serif;
    --font-body:    'Syne', system-ui, sans-serif;
    --font-serif:   'Crimson Pro', Georgia, serif;
    --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--white);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: var(--cyan); color: var(--bg); }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

  /* ════════════════════════════════════
     NAVBAR
  ════════════════════════════════════ */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 68px;
    padding: 0 48px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(9,9,11,0.8);
    backdrop-filter: blur(24px) saturate(1.5);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid transparent;
    transition: border-color 0.4s, box-shadow 0.4s;
  }
  .nav.scrolled {
    border-color: var(--border);
    box-shadow: 0 1px 0 rgba(0,229,255,0.05), 0 4px 24px rgba(0,0,0,0.5);
  }

  .nav-brand {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none; cursor: pointer;
    background: none; border: none;
  }
  .nav-brand-icon {
    width: 34px; height: 34px;
    border: 1.5px solid var(--cyan);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--cyan); font-size: 14px;
    transition: all 0.3s;
    box-shadow: 0 0 10px rgba(0,229,255,0.2);
  }
  .nav-brand:hover .nav-brand-icon {
    background: var(--cyan); color: var(--bg);
    box-shadow: 0 0 20px rgba(0,229,255,0.4);
  }
  .nav-brand-text {
    font-family: var(--font-display);
    font-size: 22px; letter-spacing: 2px;
    color: var(--white);
    line-height: 1;
  }
  .nav-brand-text span { color: var(--cyan); }

  .nav-links {
    display: flex; align-items: center; gap: 6px;
    list-style: none;
  }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    padding: 8px 14px; border-radius: var(--radius);
    font-family: var(--font-body);
    font-size: 12px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--white-60);
    transition: color 0.2s, background 0.2s;
    position: relative;
  }
  .nav-links button::after {
    content: ''; position: absolute;
    bottom: 2px; left: 14px; right: 14px;
    height: 1px; background: var(--cyan);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s var(--ease-out);
  }
  .nav-links button:hover { color: var(--white); }
  .nav-links button:hover::after { transform: scaleX(1); }

  .nav-cta-btn {
    background: var(--cyan) !important;
    color: var(--bg) !important;
    padding: 10px 22px !important;
    font-weight: 700 !important;
    transition: all 0.3s !important;
  }
  .nav-cta-btn::after { display: none !important; }
  .nav-cta-btn:hover {
    background: var(--white) !important;
    color: var(--bg) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 8px 24px rgba(0,229,255,0.3) !important;
  }

  .nav-hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .nav-hamburger span {
    display: block; width: 22px; height: 1.5px; background: var(--white);
    transition: all 0.3s;
  }

  /* Mobile menu */
  .mobile-overlay {
    display: none; position: fixed;
    inset: 0; background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px);
    z-index: 98; opacity: 0; transition: opacity 0.3s;
    pointer-events: none;
  }
  .mobile-overlay.open { opacity: 1; pointer-events: all; }
  .mobile-drawer {
    display: none; position: fixed;
    top: 0; right: 0;
    width: min(340px, 85vw); height: 100dvh;
    background: var(--bg2);
    border-left: 1px solid var(--border);
    z-index: 99;
    transform: translateX(100%);
    transition: transform 0.4s var(--ease-out);
    padding: 88px 32px 40px;
    flex-direction: column; gap: 0;
  }
  .mobile-drawer.open { transform: translateX(0); }
  .mobile-drawer button.mob-link {
    display: flex; align-items: center; gap: 16px;
    padding: 18px 0;
    border-bottom: 1px solid var(--border);
    background: none; border-top: none; border-left: none; border-right: none;
    cursor: pointer; text-align: left; width: 100%;
    font-family: var(--font-display);
    font-size: 32px; letter-spacing: 2px;
    color: var(--white);
    transition: color 0.2s;
  }
  .mobile-drawer button.mob-link:hover { color: var(--cyan); }
  .mob-num {
    font-family: var(--font-body); font-size: 10px;
    letter-spacing: 2px; color: var(--cyan);
    min-width: 22px;
  }
  .mob-book-btn {
    margin-top: 32px;
    padding: 15px 24px;
    background: var(--cyan); color: var(--bg);
    border: none; cursor: pointer;
    font-family: var(--font-body);
    font-size: 12px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; border-radius: var(--radius);
    transition: all 0.3s;
    display: flex; align-items: center; gap: 10px; justify-content: center;
  }
  .mob-book-btn:hover { background: var(--white); }
  .mob-contact-info {
    margin-top: auto;
    display: flex; flex-direction: column; gap: 6px;
  }
  .mob-contact-info a {
    font-family: var(--font-serif);
    font-size: 20px; font-style: italic;
    color: var(--white-60); text-decoration: none;
    transition: color 0.2s;
  }
  .mob-contact-info a:hover { color: var(--cyan); }
  .mob-contact-info span {
    font-size: 11px; letter-spacing: 1.5px; color: var(--white-30);
  }

  /* ════════════════════════════════════
     HERO
  ════════════════════════════════════ */
  .hero {
    min-height: 100vh;
    padding: 88px 48px 80px;
    background: var(--bg);
    position: relative; overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
  }

  /* Noise texture */
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  /* Glow blob */
  .hero-glow {
    position: absolute; top: -100px; right: -100px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }
  .hero-glow-2 {
    position: absolute; bottom: -200px; left: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }

  /* Grid lines */
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none; z-index: 0;
  }

  /* BG word */
  .hero-bg-word {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-display);
    font-size: clamp(100px, 20vw, 280px);
    letter-spacing: 10px;
    color: rgba(255,255,255,0.015);
    white-space: nowrap;
    pointer-events: none; user-select: none;
    z-index: 0;
  }

  .hero-inner {
    max-width: 1200px; margin: 0 auto; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
    position: relative; z-index: 1;
  }

  /* ── LEFT ── */
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase;
    color: var(--cyan);
  }
  .hero-eyebrow-line { width: 36px; height: 1px; background: var(--cyan); }
  .hero-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--cyan);
    animation: pulseDot 2s ease-in-out infinite;
  }
  @keyframes pulseDot {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.6); opacity: 0.5; }
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(72px, 10vw, 140px);
    line-height: 0.92;
    letter-spacing: 3px;
    color: var(--white);
    margin-bottom: 8px;
  }
  .hero-title-sub {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 64px);
    line-height: 1;
    letter-spacing: 8px;
    color: transparent;
    -webkit-text-stroke: 1px var(--white-30);
    margin-bottom: 32px;
  }

  .hero-desc {
    font-family: var(--font-serif);
    font-size: 18px; font-style: italic;
    line-height: 1.8; color: var(--white-60);
    font-weight: 300; margin-bottom: 44px;
    max-width: 440px;
  }
  .hero-desc strong { font-style: normal; color: var(--white); font-weight: 600; }

  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; margin-bottom: 56px; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 30px;
    background: var(--cyan); color: var(--bg);
    border: none; border-radius: var(--radius);
    font-family: var(--font-body);
    font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; cursor: pointer;
    text-decoration: none;
    transition: all 0.3s var(--ease-out);
    box-shadow: 0 0 0 rgba(0,229,255,0);
  }
  .btn-primary:hover {
    background: var(--white);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0,229,255,0.3);
  }
  .btn-primary svg { transition: transform 0.3s; }
  .btn-primary:hover svg { transform: translateX(4px); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 28px;
    background: transparent; color: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-family: var(--font-body);
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer; text-decoration: none;
    transition: all 0.3s;
  }
  .btn-ghost:hover {
    border-color: var(--cyan);
    color: var(--cyan);
    background: var(--cyan-subtle);
  }

  /* Stats */
  .hero-stats {
    display: flex; gap: 0;
    padding-top: 40px;
    border-top: 1px solid var(--border);
  }
  .stat {
    flex: 1; padding-right: 32px;
    border-right: 1px solid var(--border);
    margin-right: 32px;
  }
  .stat:last-child { border-right: none; margin-right: 0; padding-right: 0; }
  .stat-num {
    font-family: var(--font-display);
    font-size: 44px; letter-spacing: 1px;
    color: var(--white); line-height: 1;
    margin-bottom: 6px;
  }
  .stat-num span { color: var(--cyan); }
  .stat-label {
    font-size: 10px; font-weight: 600;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--white-30);
  }

  /* ── RIGHT VISUAL ── */
  .hero-visual {
    position: relative; display: flex;
    align-items: center; justify-content: center;
    height: 500px;
  }

  /* Outer ring */
  .ring-outer {
    position: absolute;
    width: 400px; height: 400px;
    border: 1px solid var(--border-cyan);
    border-radius: 50%;
    animation: rotateCW 40s linear infinite;
  }
  .ring-inner {
    position: absolute;
    width: 320px; height: 320px;
    border: 1px dashed rgba(0,229,255,0.08);
    border-radius: 50%;
    animation: rotateCCW 25s linear infinite;
  }
  @keyframes rotateCW  { to { transform: rotate(360deg); } }
  @keyframes rotateCCW { to { transform: rotate(-360deg); } }

  /* Orbiting dots */
  .orbit { position: absolute; width: 400px; height: 400px; animation: rotateCW 15s linear infinite; }
  .orbit-dot {
    position: absolute; top: 50%; left: 50%;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--cyan); margin: -3px;
    box-shadow: 0 0 8px var(--cyan);
  }

  /* Logo card */
  .hero-card {
    width: 270px; height: 270px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 2;
    box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.05);
    animation: floatY 7s ease-in-out infinite;
    overflow: hidden;
  }
  .hero-card::before {
    content: ''; position: absolute;
    inset: 12px; border: 1px solid var(--border-cyan);
    border-radius: 2px; pointer-events: none;
    opacity: 0.5;
  }
  /* Scan line animation */
  .hero-card::after {
    content: ''; position: absolute;
    left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, transparent, var(--cyan), transparent);
    top: -4px;
    animation: scanLine 4s ease-in-out infinite;
    opacity: 0.6;
  }
  @keyframes scanLine {
    0%   { top: -4px; opacity: 0; }
    10%  { opacity: 0.6; }
    90%  { opacity: 0.6; }
    100% { top: calc(100% + 4px); opacity: 0; }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-16px); }
  }

  .hero-card-inner {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px; text-align: center;
    padding: 24px;
  }
  .hero-card-icon {
    width: 64px; height: 64px;
    display: flex; align-items: center; justify-content: center;
  }
  .hero-card-name {
    font-family: var(--font-display);
    font-size: 28px; letter-spacing: 3px;
    color: var(--white); line-height: 1;
  }
  .hero-card-name span { color: var(--cyan); }
  .hero-card-sub {
    font-size: 9px; letter-spacing: 4px;
    text-transform: uppercase; color: var(--white-30);
    border-top: 1px solid var(--border);
    padding-top: 10px; margin-top: 2px; width: 100%;
  }
  .hero-card-artist {
    font-family: var(--font-serif);
    font-size: 13px; font-style: italic;
    color: var(--cyan-dim); margin-top: 2px;
  }

  /* Floating badges */
  .hero-badge-1 {
    position: absolute; bottom: 60px; right: -20px;
    background: var(--bg2); border: 1px solid var(--border);
    padding: 10px 16px; border-radius: 2px;
    box-shadow: var(--shadow);
    display: flex; align-items: center; gap: 10px;
    animation: floatY 5s ease-in-out infinite 1s;
    z-index: 3;
  }
  .hero-badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #22c55e;
    animation: pulseDot 2s ease-in-out infinite;
  }
  .hero-badge-text { font-size: 11px; font-weight: 600; color: var(--white); letter-spacing: 0.5px; }

  .hero-badge-2 {
    position: absolute; top: 60px; right: -32px;
    background: var(--cyan); color: var(--bg);
    padding: 8px 14px; border-radius: 2px;
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase;
    box-shadow: var(--glow);
    animation: floatY 5s ease-in-out infinite 0.5s;
    z-index: 3;
  }

  /* Scroll indicator */
  .scroll-indicator {
    position: absolute; bottom: 32px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    z-index: 1;
  }
  .scroll-line {
    width: 1px; height: 48px;
    background: linear-gradient(to bottom, var(--cyan), transparent);
    animation: floatY 2.5s ease-in-out infinite;
  }
  .scroll-text {
    font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--white-30);
  }

  /* ════════════════════════════════════
     SECTION COMMONS
  ════════════════════════════════════ */
  .section { padding: 110px 48px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .sec-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 4px;
    text-transform: uppercase; color: var(--cyan);
    margin-bottom: 14px;
  }
  .sec-label-line { width: 28px; height: 1px; background: var(--cyan); }
  .sec-title {
    font-family: var(--font-display);
    font-size: clamp(44px, 6vw, 80px);
    letter-spacing: 2px; color: var(--white); line-height: 0.95;
  }
  .sec-title-outline {
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.2);
  }
  .sec-desc {
    font-family: var(--font-serif);
    font-size: 17px; font-style: italic;
    color: var(--white-60); line-height: 1.8; font-weight: 300;
  }

  /* Divider */
  .divider {
    width: 100%; height: 1px;
    background: linear-gradient(to right, transparent, var(--border-cyan), transparent);
  }

  /* ════════════════════════════════════
     SERVICES
  ════════════════════════════════════ */
  .services-section { background: var(--bg2); }
  .services-header {
    display: flex; justify-content: space-between;
    align-items: flex-end; gap: 32px;
    margin-bottom: 64px; flex-wrap: wrap;
  }
  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--border);
    border-radius: 4px; overflow: hidden;
  }
  .svc-card {
    padding: 40px 36px;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--bg2);
    position: relative; overflow: hidden;
    cursor: default; transition: background 0.4s var(--ease-out);
  }
  .svc-card:nth-child(3n) { border-right: none; }
  .svc-card:nth-child(n+4) { border-bottom: none; }
  .svc-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, var(--cyan), var(--cyan-dim));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s var(--ease-out);
  }
  .svc-card::after {
    content: ''; position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(0,229,255,0.05) 0%, transparent 70%);
    opacity: 0; transition: opacity 0.4s;
  }
  .svc-card:hover { background: var(--surface); }
  .svc-card:hover::before { transform: scaleX(1); }
  .svc-card:hover::after { opacity: 1; }
  .svc-num {
    font-family: var(--font-display);
    font-size: 56px; letter-spacing: 1px;
    color: rgba(255,255,255,0.04); line-height: 1;
    margin-bottom: 20px; transition: color 0.4s;
    position: relative; z-index: 1;
  }
  .svc-card:hover .svc-num { color: rgba(0,229,255,0.1); }
  .svc-name {
    font-family: var(--font-head);
    font-size: 18px; font-weight: 700;
    color: var(--white); margin-bottom: 12px;
    transition: color 0.3s;
    position: relative; z-index: 1;
  }
  .svc-card:hover .svc-name { color: var(--cyan); }
  .svc-desc {
    font-family: var(--font-serif);
    font-size: 15px; font-style: italic;
    color: var(--white-30); line-height: 1.7; font-weight: 300;
    transition: color 0.3s;
    position: relative; z-index: 1;
  }
  .svc-card:hover .svc-desc { color: var(--white-60); }
  .svc-arrow {
    position: absolute; bottom: 20px; right: 24px;
    font-size: 18px; color: var(--cyan);
    opacity: 0; transform: translateY(4px);
    transition: opacity 0.3s, transform 0.3s;
    z-index: 1;
  }
  .svc-card:hover .svc-arrow { opacity: 1; transform: translateY(0); }

  /* Tag strip */
  .svc-strip {
    display: flex; gap: 24px; align-items: center;
    margin-top: 48px; padding-top: 32px;
    border-top: 1px solid var(--border);
    overflow-x: auto; scrollbar-width: none; white-space: nowrap;
  }
  .svc-strip::-webkit-scrollbar { display: none; }
  .svc-tag {
    font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--white-30); flex-shrink: 0;
  }
  .svc-tag-sep {
    width: 3px; height: 3px; border-radius: 50%;
    background: var(--cyan); flex-shrink: 0; opacity: 0.6;
  }

  /* ════════════════════════════════════
     GALLERY
  ════════════════════════════════════ */
  .gallery-section { background: var(--bg); }
  .gallery-header {
    display: flex; justify-content: space-between;
    align-items: flex-end; gap: 24px; margin-bottom: 48px;
    flex-wrap: wrap;
  }
  .gallery-controls {
    display: flex; align-items: center; gap: 14px; flex-shrink: 0;
  }
  .gal-nav {
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--white-60); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s;
  }
  .gal-nav:hover:not(:disabled) {
    background: var(--cyan-subtle);
    border-color: var(--border-cyan);
    color: var(--cyan);
    box-shadow: 0 0 12px rgba(0,229,255,0.15);
  }
  .gal-nav:disabled { opacity: 0.2; cursor: not-allowed; }
  .gal-counter {
    font-family: var(--font-display);
    font-size: 20px; letter-spacing: 2px; color: var(--white);
    min-width: 68px; text-align: center;
  }
  .gal-counter span { color: var(--white-30); margin: 0 3px; font-weight: 300; }

  .gallery-track {
    display: flex; gap: 16px;
    overflow-x: auto; scroll-behavior: smooth;
    scrollbar-width: none; padding: 8px 0 16px;
    scroll-snap-type: x mandatory;
  }
  .gallery-track::-webkit-scrollbar { display: none; }

  .gal-card {
    flex: 0 0 320px; height: 400px;
    border-radius: 4px; overflow: hidden;
    background: var(--surface);
    border: 1px solid var(--border);
    position: relative; cursor: pointer;
    transition: all 0.35s var(--ease-out);
    scroll-snap-align: start;
  }
  .gal-card:hover {
    transform: translateY(-8px);
    border-color: var(--border-cyan);
    box-shadow: var(--shadow-lg), 0 0 30px rgba(0,229,255,0.08);
  }
  .gal-card.active {
    border-color: var(--cyan) !important;
    box-shadow: 0 0 0 2px rgba(0,229,255,0.15), var(--shadow-lg) !important;
  }
  .gal-placeholder {
    width: 100%; height: 100%;
    background: var(--surface2);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 14px;
    color: var(--white-30);
  }
  .gal-placeholder span {
    font-family: var(--font-head);
    font-size: 13px; font-weight: 600;
    letter-spacing: 1px; color: var(--white-30);
  }
  .gal-overlay {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 24px 20px 18px;
    background: linear-gradient(transparent, rgba(9,9,11,0.92));
    transform: translateY(100%);
    transition: transform 0.4s var(--ease-out);
  }
  .gal-card:hover .gal-overlay { transform: translateY(0); }
  .gal-style { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--cyan); font-weight: 700; margin-bottom: 4px; }
  .gal-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; color: var(--white); }

  .gallery-thumbs {
    display: flex; gap: 8px; margin-top: 20px;
    overflow-x: auto; scrollbar-width: none; padding-bottom: 2px;
  }
  .gallery-thumbs::-webkit-scrollbar { display: none; }
  .gal-thumb {
    flex: 0 0 52px; height: 52px;
    border-radius: 3px; overflow: hidden;
    cursor: pointer; border: 1.5px solid transparent;
    opacity: 0.35; transition: all 0.25s;
    background: var(--surface2); padding: 0;
  }
  .gal-thumb:hover { opacity: 0.65; border-color: var(--border-cyan); }
  .gal-thumb.active { border-color: var(--cyan); opacity: 1; box-shadow: 0 0 8px rgba(0,229,255,0.2); }
  .gal-thumb-inner { width: 100%; height: 100%; background: var(--surface2); }

  /* ════════════════════════════════════
     ARTIST SECTION
  ════════════════════════════════════ */
  .artist-section {
    background: var(--bg2);
    padding: 100px 48px;
  }
  .artist-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
  }
  .artist-img-frame {
    aspect-ratio: 3/4; max-width: 360px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px; overflow: hidden;
    position: relative;
    box-shadow: var(--shadow-lg);
  }
  .artist-img-frame::before {
    content: ''; position: absolute;
    inset: 14px; border: 1px solid var(--border-cyan);
    border-radius: 2px; pointer-events: none; z-index: 1; opacity: 0.5;
  }
  .artist-placeholder {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
  }
  .artist-placeholder span {
    font-family: var(--font-display);
    font-size: 20px; letter-spacing: 3px;
    color: var(--white-30);
  }
  .artist-corner {
    position: absolute;
    width: 20px; height: 20px;
  }
  .artist-corner-tl { top: 8px; left: 8px; border-top: 2px solid var(--cyan); border-left: 2px solid var(--cyan); }
  .artist-corner-tr { top: 8px; right: 8px; border-top: 2px solid var(--cyan); border-right: 2px solid var(--cyan); }
  .artist-corner-bl { bottom: 8px; left: 8px; border-bottom: 2px solid var(--cyan); border-left: 2px solid var(--cyan); }
  .artist-corner-br { bottom: 8px; right: 8px; border-bottom: 2px solid var(--cyan); border-right: 2px solid var(--cyan); }

  .artist-content { display: flex; flex-direction: column; gap: 0; }
  .artist-pre {
    font-size: 10px; font-weight: 700; letter-spacing: 4px;
    text-transform: uppercase; color: var(--cyan); margin-bottom: 16px;
  }
  .artist-name {
    font-family: var(--font-display);
    font-size: clamp(52px, 7vw, 80px); letter-spacing: 2px;
    color: var(--white); line-height: 0.9; margin-bottom: 6px;
  }
  .artist-title {
    font-size: 13px; font-weight: 600;
    letter-spacing: 4px; text-transform: uppercase;
    color: var(--white-30); margin-bottom: 32px;
  }
  .artist-bio {
    font-family: var(--font-serif);
    font-size: 17px; font-style: italic;
    line-height: 1.8; color: var(--white-60);
    font-weight: 300; margin-bottom: 40px;
    border-left: 2px solid var(--cyan);
    padding-left: 20px;
  }
  .artist-skills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px; }
  .artist-skill {
    padding: 6px 14px;
    background: var(--cyan-subtle);
    border: 1px solid var(--border-cyan);
    border-radius: 100px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--cyan);
  }
  .artist-social {
    display: inline-flex; align-items: center; gap: 10px;
    text-decoration: none; color: var(--white-60);
    font-size: 13px; font-weight: 600; letter-spacing: 1px;
    transition: color 0.2s;
    border: 1px solid var(--border);
    padding: 12px 20px; border-radius: var(--radius);
  }
  .artist-social:hover { color: var(--cyan); border-color: var(--border-cyan); background: var(--cyan-subtle); }

  /* ════════════════════════════════════
     CONTACT
  ════════════════════════════════════ */
  .contact-section { background: var(--bg); }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1.1fr;
    gap: 80px; align-items: start;
  }
  .contact-cards { display: flex; flex-direction: column; gap: 12px; }
  .c-card {
    display: flex; gap: 18px; align-items: flex-start;
    padding: 22px 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    transition: all 0.3s var(--ease-out);
  }
  .c-card:hover {
    background: var(--surface2);
    border-color: var(--border-cyan);
    transform: translateX(4px);
    box-shadow: -4px 0 0 var(--cyan);
  }
  .c-icon {
    width: 42px; height: 42px; border-radius: var(--radius);
    background: var(--cyan-subtle); border: 1px solid var(--border-cyan);
    display: flex; align-items: center; justify-content: center;
    color: var(--cyan); flex-shrink: 0;
    transition: background 0.3s;
  }
  .c-card:hover .c-icon { background: var(--cyan); color: var(--bg); }
  .c-label {
    font-size: 9px; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: var(--white-30); margin-bottom: 5px;
  }
  .c-val {
    font-size: 15px; font-weight: 600;
    color: var(--white); text-decoration: none; display: block;
    transition: color 0.2s;
  }
  a.c-val:hover { color: var(--cyan); }
  .c-sub { font-size: 12px; color: var(--white-30); margin-top: 3px; }
  .c-link {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 8px; font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--cyan); text-decoration: none;
    transition: gap 0.2s;
  }
  .c-link:hover { gap: 9px; }

  .map-wrap {
    border: 1px solid var(--border); border-radius: 4px;
    overflow: hidden; transition: border-color 0.3s;
  }
  .map-wrap:hover { border-color: var(--border-cyan); box-shadow: var(--glow); }
  .map-wrap iframe { display: block; }
  .map-footer {
    padding: 14px 20px;
    background: var(--surface);
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--border);
  }
  .map-status { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--white-30); }
  .map-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: pulseDot 2s ease-in-out infinite; }
  .map-dir {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--white-60); text-decoration: none;
    transition: color 0.2s;
  }
  .map-dir:hover { color: var(--cyan); }

  /* ════════════════════════════════════
     BOOKING MODAL
  ════════════════════════════════════ */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    opacity: 0; pointer-events: none; transition: opacity 0.35s;
  }
  .modal-overlay.open { opacity: 1; pointer-events: all; }
  .modal {
    background: var(--bg2);
    border: 1px solid var(--border);
    max-width: 500px; width: 100%;
    border-radius: 4px;
    box-shadow: var(--shadow-lg), 0 0 60px rgba(0,229,255,0.05);
    max-height: 90dvh; overflow-y: auto;
    transform: translateY(24px) scale(0.97);
    transition: transform 0.4s var(--ease-out);
    position: relative;
  }
  .modal-overlay.open .modal { transform: translateY(0) scale(1); }

  /* Top cyan line */
  .modal::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, transparent, var(--cyan), transparent);
  }

  .modal-header { padding: 32px 36px 0; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  .modal-label-top { font-size: 9px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--cyan); margin-bottom: 10px; }
  .modal-title {
    font-family: var(--font-display);
    font-size: 32px; letter-spacing: 1px;
    color: var(--white); line-height: 1.1;
  }
  .modal-close-btn {
    width: 36px; height: 36px; border-radius: var(--radius);
    background: var(--surface); border: 1px solid var(--border);
    color: var(--white-60); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; flex-shrink: 0; margin-top: 2px;
  }
  .modal-close-btn:hover { background: var(--white-10); color: var(--white); border-color: var(--white-30); }

  .modal-steps { padding: 20px 36px 0; display: flex; align-items: center; gap: 10px; }
  .m-step { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; letter-spacing: 1px; color: var(--white-30); transition: color 0.3s; }
  .m-step.active { color: var(--white); }
  .m-step-num { font-family: var(--font-display); font-size: 18px; letter-spacing: 1px; }
  .m-step.active .m-step-num { color: var(--cyan); }
  .m-step-line { flex: 1; height: 1px; background: var(--border); }

  .modal-form { padding: 24px 36px 8px; display: flex; flex-direction: column; gap: 16px; }
  .f-label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--white-30); margin-bottom: 8px; }
  .f-input {
    width: 100%; padding: 12px 16px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); color: var(--white);
    font-family: var(--font-body); font-size: 14px;
    transition: all 0.2s; outline: none;
  }
  .f-input::placeholder { color: var(--white-30); }
  .f-input:focus { background: var(--surface2); border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(0,229,255,0.08); }
  .f-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

  .f-actions { display: flex; gap: 10px; margin-top: 4px; }
  .f-back {
    padding: 12px 20px; background: none;
    border: 1px solid var(--border); border-radius: var(--radius);
    font-family: var(--font-body); font-size: 12px; font-weight: 600;
    color: var(--white-30); cursor: pointer; transition: all 0.2s;
    letter-spacing: 1px; text-transform: uppercase;
  }
  .f-back:hover { border-color: var(--white-30); color: var(--white); }
  .f-submit, .f-next {
    flex: 1; padding: 13px 20px;
    background: var(--cyan); color: var(--bg);
    border: none; border-radius: var(--radius);
    font-family: var(--font-body); font-size: 11px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
    transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .f-submit:hover, .f-next:hover { background: var(--white); }
  .f-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  .f-spinner {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(9,9,11,0.3); border-top-color: var(--bg);
    animation: spin 0.7s linear infinite; display: block;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .f-success { padding: 32px 36px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; }
  .f-success-icon {
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--cyan-subtle); border: 1px solid var(--border-cyan);
    display: flex; align-items: center; justify-content: center;
    color: var(--cyan); animation: scaleIn 0.5s var(--ease-out);
  }
  @keyframes scaleIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .f-success h3 { font-family: var(--font-display); font-size: 28px; letter-spacing: 1px; color: var(--white); }
  .f-success p { font-family: var(--font-serif); font-size: 15px; font-style: italic; color: var(--white-60); line-height: 1.7; max-width: 300px; }
  .f-success p strong { font-style: normal; color: var(--white); }
  .f-wa-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; background: #25D366; color: var(--white);
    border-radius: var(--radius); font-size: 12px; font-weight: 700;
    text-decoration: none; letter-spacing: 1px; text-transform: uppercase;
    transition: all 0.3s; margin-top: 4px;
  }
  .f-wa-btn:hover { filter: brightness(1.1); transform: translateY(-2px); }

  .modal-footer { padding: 14px 36px 28px; text-align: center; font-size: 12px; color: var(--white-30); }
  .modal-footer a { color: var(--cyan); text-decoration: none; font-weight: 600; }
  .modal-footer a:hover { text-decoration: underline; }

  /* ════════════════════════════════════
     FOOTER
  ════════════════════════════════════ */
  .footer { background: var(--bg2); }

  /* CTA band */
  .footer-cta {
    background: var(--cyan);
    padding: 52px 48px;
  }
  .footer-cta-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    gap: 32px; flex-wrap: wrap;
  }
  .footer-cta-pre { font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: rgba(9,9,11,0.5); margin-bottom: 8px; }
  .footer-cta-title { font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); letter-spacing: 2px; color: var(--bg); line-height: 1; }
  .footer-cta-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 30px;
    background: var(--bg); color: var(--cyan);
    border-radius: var(--radius); text-decoration: none;
    font-family: var(--font-body); font-size: 11px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; white-space: nowrap;
    transition: all 0.3s; flex-shrink: 0;
  }
  .footer-cta-btn:hover { background: var(--white); color: var(--bg); transform: translateY(-2px); }

  .footer-main { padding: 64px 48px 0; }
  .footer-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px; padding-bottom: 56px;
    border-bottom: 1px solid var(--border);
  }
  .footer-brand-icon {
    width: 40px; height: 40px;
    border: 1.5px solid var(--cyan); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--cyan); margin-bottom: 16px;
  }
  .footer-brand-name { font-family: var(--font-display); font-size: 28px; letter-spacing: 3px; color: var(--white); margin-bottom: 4px; }
  .footer-brand-name span { color: var(--cyan); }
  .footer-brand-by { font-family: var(--font-serif); font-size: 13px; font-style: italic; color: var(--white-30); margin-bottom: 16px; }
  .footer-brand-desc { font-size: 13px; line-height: 1.8; color: var(--white-30); font-weight: 300; max-width: 260px; }
  .footer-socials { display: flex; gap: 10px; margin-top: 24px; }
  .footer-social {
    width: 36px; height: 36px; border-radius: var(--radius);
    background: var(--white-05); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--white-60); text-decoration: none;
    transition: all 0.3s;
  }
  .footer-social:hover { background: var(--cyan-subtle); border-color: var(--border-cyan); color: var(--cyan); }
  .footer-col-title { font-size: 9px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--cyan); margin-bottom: 20px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer-links a { font-size: 13px; color: var(--white-30); text-decoration: none; transition: color 0.2s; font-weight: 400; }
  .footer-links a:hover { color: var(--white); }
  .footer-hours { display: flex; flex-direction: column; gap: 12px; }
  .footer-hr {
    display: flex; justify-content: space-between; gap: 12px;
    font-size: 13px; color: var(--white-30);
    padding-bottom: 12px; border-bottom: 1px solid var(--border);
  }
  .footer-hr-time { color: var(--white); font-weight: 500; }
  .footer-open { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--cyan); font-weight: 700; opacity: 0.7; }

  .footer-bottom {
    max-width: 1200px; margin: 0 auto;
    padding: 24px 0; display: flex; justify-content: space-between;
    align-items: center; flex-wrap: wrap; gap: 12px;
  }
  .footer-copy { font-size: 11px; color: var(--white-30); letter-spacing: 0.3px; }
  .footer-credit { font-size: 11px; color: var(--white-30); }
  .footer-credit a { color: var(--cyan); text-decoration: none; font-weight: 600; }
  .footer-credit a:hover { text-decoration: underline; }

  /* ════════════════════════════════════
     RESPONSIVE
  ════════════════════════════════════ */
  @media (max-width: 1024px) {
    .hero-badge-2 { display: none; }
    .hero-badge-1 { right: 0; }
  }
  @media (max-width: 960px) {
    .nav { padding: 0 24px; }
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .mobile-overlay { display: block; pointer-events: none; }
    .mobile-overlay.open { pointer-events: all; }
    .mobile-drawer { display: flex; }

    .hero { padding: 90px 24px 72px; }
    .hero-inner { grid-template-columns: 1fr; gap: 56px; text-align: center; }
    .hero-visual { order: -1; height: 360px; }
    .hero-card { width: 210px; height: 210px; }
    .ring-outer { width: 300px; height: 300px; }
    .ring-inner { width: 240px; height: 240px; }
    .orbit { width: 300px; height: 300px; }
    .hero-eyebrow { justify-content: center; }
    .hero-desc { margin: 0 auto 44px; }
    .hero-actions { justify-content: center; }
    .hero-stats { justify-content: center; }
    .hero-bg-word { display: none; }

    .section { padding: 80px 24px; }
    .services-header { flex-direction: column; align-items: flex-start; }
    .services-grid { grid-template-columns: 1fr 1fr; }
    .svc-card:nth-child(3n) { border-right: 1px solid var(--border); }
    .svc-card:nth-child(2n) { border-right: none; }

    .artist-section { padding: 80px 24px; }
    .artist-inner { grid-template-columns: 1fr; gap: 48px; }
    .artist-img-frame { max-width: 280px; margin: 0 auto; }

    .contact-grid { grid-template-columns: 1fr; gap: 48px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
    .footer-cta { padding: 40px 24px; }
    .footer-main { padding: 56px 24px 0; }
  }
  @media (max-width: 600px) {
    .hero { padding: 88px 20px 64px; }
    .hero-card { width: 180px; height: 180px; }
    .ring-outer { width: 260px; height: 260px; }
    .ring-inner { width: 200px; height: 200px; }
    .orbit { width: 260px; height: 260px; }
    .section { padding: 64px 20px; }
    .services-grid { grid-template-columns: 1fr; }
    .svc-card { border-right: none !important; }
    .gal-card { flex: 0 0 260px; height: 320px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .footer-bottom { justify-content: center; text-align: center; }
    .modal-header, .modal-form, .modal-footer, .f-success { padding-left: 24px; padding-right: 24px; }
    .modal-steps { padding-left: 24px; padding-right: 24px; }
  }
`;

/* ════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════ */
const PHONE_RAW     = "+919673340204";
const PHONE_DISPLAY = "+91 96733 40204";
const WA_LINK       = `https://wa.me/919673340204?text=${encodeURIComponent("Hello! I'm interested in getting a tattoo at Inkfinity Tattoo Studio. 🎨")}`;
const MAP_LINK      = "https://www.google.com/maps/search/%E0%A4%87%E0%A4%82%E0%A4%95%E0%A4%AB%E0%A4%BF%E0%A4%A8%E0%A4%BF%E0%A4%9F%E0%A5%80+%E0%A4%9F%E0%A5%88%E0%A4%9F%E0%A5%82+%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A5%82%E0%A4%A1%E0%A4%BF%E0%A4%AF%E0%A5%8B/@18.4535,73.856,17z";
const MAP_EMBED     = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.2835667539824!2d73.85341007524658!3d18.453508982617116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb5b9e2fc7a1%3A0x0!2z4AQH4ASf4AS-4ASV4AS-4ASo4AS-4ASf4AS%2B4ASZ4ASwIOCkn-CkqOCkuOCljeCkleCmiyDgpJ_gpLLgpJXgpKo!5e0!3m2!1shi!2sin!4v1709100000000";
const INSTAGRAM     = "https://www.instagram.com/inkfinity_tattoostudios";

const SERVICES = [
  { num: "01", name: "Custom Designs",      desc: "Bespoke artwork created exclusively for you — from first sketch to final needle, your vision guides everything." },
  { num: "02", name: "Realism & Portraits", desc: "Hyper-realistic portraits, wildlife, and figure work with cinematic depth and stunning photographic precision." },
  { num: "03", name: "Blackwork & Dotwork", desc: "Striking geometric patterns, mandalas, and ornamental blackwork rendered with obsessive detail and care." },
  { num: "04", name: "Traditional & Trad+", desc: "Bold outlines, rich colour fills, and timeless imagery with a modern twist — the classics, elevated." },
  { num: "05", name: "Script & Lettering",  desc: "From delicate fine-line scripts to bold statement typography — words made permanent with artistry." },
  { num: "06", name: "Cover-ups & Reworks", desc: "Transform ageing or unwanted tattoos with clever design solutions and expert application technique." },
];

const IMAGES = [
  { id: 1,  src: "/assets/tattoo1.png",  title: "Custom Floral",     style: "Botanical" },
  { id: 2,  src: "/assets/tattoo2.png",  title: "Dragon",            style: "Japanese" },
  { id: 3,  src: "/assets/tattoo3.png",  title: "Spiritual Art",     style: "Spiritual" },
  { id: 4,  src: "/assets/tattoo4.png",  title: "Geometric",         style: "Blackwork" },
  { id: 5,  src: "/assets/tattoo5.png",  title: "Realism Study",     style: "Realism" },
  { id: 6,  src: "/assets/tattoo6.png",  title: "Portrait",          style: "Realism" },
  { id: 7,  src: "/assets/tattoo7.png",  title: "Mandala",           style: "Dotwork" },
  { id: 8,  src: "/assets/tattoo8.png",  title: "Neo-Traditional",   style: "Neo-Trad" },
  { id: 9,  src: "/assets/tattoo9.png",  title: "Anime Art",         style: "Illustrative" },
  { id: 10, src: "/assets/tattoo10.png", title: "Ornamental",        style: "Ornamental" },
  { id: 11, src: "/assets/tattoo11.png", title: "Fine Line",         style: "Fine Line" },
  { id: 12, src: "/assets/tattoo12.png", title: "Surrealism",        style: "Surreal" },
  { id: 13, src: "/assets/tattoo13.png", title: "Blackwork",         style: "Blackwork" },
  { id: 14, src: "/assets/tattoo14.png", title: "Custom Piece",      style: "Custom" },
];


const STYLES_LIST = [
  "Custom Design", "Realism / Portrait", "Blackwork / Dotwork",
  "Traditional / Neo-Trad", "Script / Lettering", "Cover-up / Rework",
  "Spiritual / Religious", "Anime / Illustrative", "Not sure yet",
];

/* ════════════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════════════ */
const Ico = ({ d, fill = false, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} aria-hidden="true">
    {Array.isArray(d)
      ? d.map((p, i) => <path key={i} d={p} stroke={!fill ? "currentColor" : undefined} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={fill ? "currentColor" : "none"} />)
      : <path d={d} stroke={!fill ? "currentColor" : undefined} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={fill ? "currentColor" : "none"} />}
  </svg>
);

const ArrowRight  = () => <Ico d="M5 12h14M13 6l6 6-6 6" />;
const ChevLeft    = () => <Ico d="M15 18l-6-6 6-6" />;
const ChevRight   = () => <Ico d="M9 6l6 6-6 6" />;
const CloseX      = () => <Ico d="M18 6L6 18M6 6l12 12" />;
const CheckMark   = () => <Ico d="M4 12l5 5 11-9" />;
const PinIcon     = () => <Ico d={["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z", "M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0"]} />;
const PhoneIcon   = () => <Ico d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />;
const ClockIcon   = () => <Ico d={["M12 2a10 10 0 100 20A10 10 0 0012 2z", "M12 6v6l4 2"]} />;
const ExtLink     = () => <Ico d={["M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6", "M15 3h6v6", "M10 14L21 3"]} />;
const MenuIcon    = () => <Ico d={["M3 6h18", "M3 12h18", "M3 18h18"]} />;
const XMenuIcon   = () => <Ico d={["M18 6L6 18", "M6 6l12 12"]} />;

const InstaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.099 1.515 5.827L.057 23.16a.75.75 0 00.916.916l5.333-1.458A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.714 9.714 0 01-4.961-1.357l-.356-.211-3.169.866.865-3.169-.211-.356A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
);

/* ════════════════════════════════════════════════════════
   COMPONENTS
════════════════════════════════════════════════════════ */

function Navbar({ onBook }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "home",     label: "Home"     },
    { id: "services", label: "Services" },
    { id: "gallery",  label: "Gallery"  },
    { id: "artist",   label: "Artist"   },
    { id: "contact",  label: "Contact"  },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <button className="nav-brand" onClick={() => scrollTo("home")} aria-label="Home">
          <div className="nav-brand-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 2v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="nav-brand-text">INK<span>FINITY</span></span>
        </button>

        <ul className="nav-links">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)}>{label}</button>
            </li>
          ))}
          <li>
            <button className="nav-cta-btn" onClick={onBook}>Book Now</button>
          </li>
        </ul>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <XMenuIcon /> : <MenuIcon />}
        </button>
      </nav>

      <div className={`mobile-overlay${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-drawer${menuOpen ? " open" : ""}`}>
        {navLinks.map(({ id, label }, i) => (
          <button key={id} className="mob-link" onClick={() => scrollTo(id)}>
            <span className="mob-num">0{i + 1}</span>
            {label}
          </button>
        ))}
        <button className="mob-book-btn" onClick={() => { onBook(); setMenuOpen(false); }}>
          Book a Session <ArrowRight />
        </button>
        <div className="mob-contact-info">
          <a href={`tel:${PHONE_RAW}`}>{PHONE_DISPLAY}</a>
          <span>Daily · 11 AM – 10 PM</span>
        </div>
      </div>
    </>
  );
}

function Hero({ onBook }) {
  const orbitDots = [0, 72, 144, 216, 288];
  return (
    <section id="home" className="hero" aria-label="Hero">
      <div className="hero-glow" />
      <div className="hero-glow-2" />
      <div className="hero-grid" />
      <div className="hero-bg-word" aria-hidden="true">TATTOO</div>

      <div className="hero-inner">
        {/* LEFT */}
        <div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-dot" />
            Pune's Finest Tattoo Studio
          </div>
          <h1 className="hero-title">INK<br/>FINITY</h1>
          <div className="hero-title-sub">TATTOO STUDIO</div>
          <p className="hero-desc">
            By <strong>Abhi Borge</strong> — where ink becomes identity.
            Premium custom tattoos crafted with precision, passion, and permanent artistry.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onBook}>
              Book Appointment <ArrowRight />
            </button>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WaIcon /> WhatsApp
            </a>
          </div>
          <div className="hero-stats">
            {[
              { num: "7+",   sup: "",  label: "Years Active" },
              { num: "800",  sup: "+", label: "Clients Inked" },
              { num: "100",  sup: "%", label: "Custom Work" },
            ].map(({ num, sup, label }) => (
              <div className="stat" key={label}>
                <div className="stat-num">{num}<span>{sup}</span></div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-visual">
          <div className="ring-outer" />
          <div className="ring-inner" />
          <div className="orbit">
            {orbitDots.map((deg, i) => (
              <div
                key={i}
                className="orbit-dot"
                style={{ transform: `rotate(${deg}deg) translateY(-200px) rotate(-${deg}deg)` }}
              />
            ))}
          </div>

          <div className="hero-card">
            <div className="hero-card-inner">
              <div className="hero-card-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                  <circle cx="28" cy="28" r="26" stroke="#00e5ff" strokeWidth="1" strokeDasharray="6 4" opacity="0.6"/>
                  <path d="M28 8l4 12h13l-10.5 7.5 4 12L28 32l-10.5 7.5 4-12L11 20h13z" stroke="#00e5ff" strokeWidth="1.2" fill="none" opacity="0.8"/>
                  <circle cx="28" cy="28" r="4" fill="#00e5ff" opacity="0.9"/>
                </svg>
              </div>
              <div className="hero-card-name">INK<span>FINITY</span></div>
              <div className="hero-card-artist">by Abhi Borge</div>
              <div className="hero-card-sub">Pune, Maharashtra · Est. 2017</div>
            </div>
          </div>

          <div className="hero-badge-1">
            <div className="hero-badge-dot" />
            <span className="hero-badge-text">Open 11 AM – 10 PM</span>
          </div>
          <div className="hero-badge-2">
            ★ 4.9 &nbsp; Google Rating
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="section-inner">
        <div className="services-header">
          <div>
            <div className="sec-label"><span className="sec-label-line" />What We Do</div>
            <h2 className="sec-title">OUR<br /><span className="sec-title-outline">SPECIALTIES</span></h2>
          </div>
          <p className="sec-desc" style={{ maxWidth: 360 }}>
            Every style, mastered with care. Every vision realised with precision that stands the test of time.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="svc-card" key={s.num}>
              <div className="svc-num">{s.num}</div>
              <div className="svc-name">{s.name}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-arrow">→</div>
            </div>
          ))}
        </div>
        <div className="svc-strip">
          {["Hygienic Studio", "Premium Inks", "Sterile Equipment", "Walk-ins Welcome", "All Skill Levels", "Free Consultation"].map((t, i, arr) => (
            <>
              <span key={t} className="svc-tag">{t}</span>
              {i < arr.length - 1 && <span key={`sep-${i}`} className="svc-tag-sep" />}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const thumbsRef = useRef(null);

  const goTo = (idx) => {
    setActive(idx);
    if (trackRef.current)  trackRef.current.scrollLeft  = idx * (320 + 16);
    if (thumbsRef.current) thumbsRef.current.scrollLeft = idx * (52 + 8) - 100;
  };
  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(IMAGES.length - 1, active + 1));

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-inner">
        <div className="gallery-header">
          <div>
            <div className="sec-label"><span className="sec-label-line" />Portfolio</div>
            <h2 className="sec-title">THE<br /><span className="sec-title-outline">GALLERY</span></h2>
          </div>
          <div className="gallery-controls">
            <button className="gal-nav" onClick={prev} disabled={active === 0} aria-label="Previous">
              <ChevLeft />
            </button>
            <span className="gal-counter">
              {String(active + 1).padStart(2, "0")}
              <span>/</span>
              {String(IMAGES.length).padStart(2, "0")}
            </span>
            <button className="gal-nav" onClick={next} disabled={active === IMAGES.length - 1} aria-label="Next">
              <ChevRight />
            </button>
          </div>
        </div>

        <div className="gallery-track" ref={trackRef}>
          {IMAGES.map((img, i) => (
            <div
              key={img.id}
              className={`gal-card${i === active ? " active" : ""}`}
              onClick={() => goTo(i)}
            >
              {/* ← Real image instead of placeholder */}
              <img
                src={img.src}
                alt={img.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
              <div className="gal-overlay">
                <div className="gal-style">{img.style}</div>
                <div className="gal-title">{img.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-thumbs" ref={thumbsRef}>
          {IMAGES.map((img, i) => (
            <button
              key={img.id}
              className={`gal-thumb${i === active ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to ${img.title}`}
            >
              <img
                src={img.src}
                alt={img.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Artist() {
  const skills = ["Realism", "Blackwork", "Geometric", "Custom Design", "Cover-ups", "Fine Line"];
  return (
    <section id="artist" className="artist-section">
      <div className="artist-inner">
        {/* Photo frame */}
        <div className="artist-img-frame">
          <div className="artist-placeholder">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.2" aria-hidden="true">
              <circle cx="24" cy="16" r="10" stroke="white" strokeWidth="1.5"/>
              <path d="M4 44c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>ARTIST PHOTO</span>
          </div>
          {["tl","tr","bl","br"].map(pos => (
            <div key={pos} className={`artist-corner artist-corner-${pos}`} />
          ))}
        </div>

        {/* Content */}
        <div className="artist-content">
          <div className="artist-pre">Meet the Artist</div>
          <h2 className="artist-name">ABHI<br />BORGE</h2>
          <div className="artist-title">Founder & Lead Tattoo Artist</div>
          <blockquote className="artist-bio">
            With over 7 years of tattooing experience in Pune, Abhi Borge has built Inkfinity into one of the city's most respected studios. His work spans realism, blackwork, and intricate custom designs — each piece a collaboration between artist and client.
          </blockquote>
          <div className="artist-skills">
            {skills.map(s => <span key={s} className="artist-skill">{s}</span>)}
          </div>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="artist-social">
            <InstaIcon />
            @inkfinity_tattoostudios
            <ExtLink />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact({ onBook }) {
  const cards = [
    {
      icon: <PinIcon />,
      label: "Studio Address",
      value: "Inkfinity Tattoo Studio",
      sub: "Gultekdi, Pune 411037, Maharashtra",
      link: { href: MAP_LINK, text: "Open in Maps", external: true },
    },
    {
      icon: <PhoneIcon />,
      label: "Call Us",
      value: PHONE_DISPLAY,
      sub: "Daily — 11:00 AM to 10:00 PM",
      link: { href: `tel:${PHONE_RAW}`, text: "Call Now" },
    },
    {
      icon: <WaIcon />,
      label: "WhatsApp",
      value: PHONE_DISPLAY,
      sub: "Quick replies · Share reference images",
      link: { href: WA_LINK, text: "Chat Now", external: true },
    },
    {
      icon: <ClockIcon />,
      label: "Working Hours",
      value: "11:00 AM – 10:00 PM",
      sub: "Every day · Appointments preferred",
    },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <div style={{ marginBottom: 64 }}>
          <div className="sec-label"><span className="sec-label-line" />Find Us</div>
          <h2 className="sec-title">GET IN<br /><span className="sec-title-outline">TOUCH</span></h2>
          <p className="sec-desc" style={{ marginTop: 16, maxWidth: 500 }}>
            Consultations are always free. Come visit us or reach out — we're excited to hear your ideas.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-cards">
            {cards.map((card, i) => (
              <div key={i} className="c-card">
                <div className="c-icon">{card.icon}</div>
                <div>
                  <div className="c-label">{card.label}</div>
                  {card.link ? (
                    <a
                      href={card.link.href}
                      className="c-val"
                      target={card.link.external ? "_blank" : undefined}
                      rel={card.link.external ? "noopener noreferrer" : undefined}
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="c-val">{card.value}</span>
                  )}
                  <div className="c-sub">{card.sub}</div>
                  {card.link && (
                    <a
                      href={card.link.href}
                      className="c-link"
                      target={card.link.external ? "_blank" : undefined}
                      rel={card.link.external ? "noopener noreferrer" : undefined}
                    >
                      {card.link.text} <ArrowRight />
                    </a>
                  )}
                </div>
              </div>
            ))}
            <button className="btn-primary" onClick={onBook} style={{ justifyContent: "center", marginTop: 8 }}>
              Book Your Session <ArrowRight />
            </button>
          </div>

          <div>
            <div className="map-wrap">
              <iframe
                src={MAP_EMBED}
                width="100%" height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Inkfinity Tattoo Studio Location"
              />
              <div className="map-footer">
                <div className="map-status">
                  <div className="map-dot" />
                  <span>Inkfinity Tattoo, Gultekdi, Pune</span>
                </div>
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="map-dir">
                  Directions <ExtLink />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingModal({ isOpen, onClose }) {
  const [form, setForm]         = useState({ name: "", phone: "", style: "", placement: "", message: "" });
  const [step, setStep]         = useState(1);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) { setStep(1); setSubmitted(false); setForm({ name: "", phone: "", style: "", placement: "", message: "" }); }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleStep1 = (e) => { e.preventDefault(); setStep(2); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
    setTimeout(onClose, 4000);
  };

  const waLink = `https://wa.me/919673340204?text=${encodeURIComponent(
    `Hi! I'm ${form.name || "there"}, interested in a ${form.style || "tattoo"} at Inkfinity. ${form.message || ""}`
  )}`;

  return (
    <div
      className={`modal-overlay${isOpen ? " open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog" aria-modal="true"
    >
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-label-top">Studio Booking</div>
            <h2 className="modal-title">
              {submitted ? "REQUEST SENT" : step === 1 ? "YOUR DETAILS" : "YOUR VISION"}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <CloseX />
          </button>
        </div>

        {!submitted && (
          <div className="modal-steps">
            <div className={`m-step${step >= 1 ? " active" : ""}`}>
              <span className="m-step-num">01</span> Contact
            </div>
            <div className="m-step-line" />
            <div className={`m-step${step === 2 ? " active" : ""}`}>
              <span className="m-step-num">02</span> Design
            </div>
          </div>
        )}

        {submitted ? (
          <div className="f-success">
            <div className="f-success-icon"><CheckMark /></div>
            <h3>We'll contact you soon!</h3>
            <p>Thank you, <strong>{form.name}</strong>. Your request is confirmed. Abhi will reach out shortly to discuss your design.</p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="f-wa-btn">
              <WaIcon /> Also message on WhatsApp
            </a>
          </div>
        ) : step === 1 ? (
          <form className="modal-form" onSubmit={handleStep1}>
            <div>
              <label className="f-label" htmlFor="name">Full Name *</label>
              <input id="name" className="f-input" type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required autoComplete="name" />
            </div>
            <div>
              <label className="f-label" htmlFor="phone">Phone Number *</label>
              <input id="phone" className="f-input" type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required autoComplete="tel" />
            </div>
            <div>
              <label className="f-label" htmlFor="placement">Body Placement</label>
              <input id="placement" className="f-input" type="text" name="placement" placeholder="e.g. Forearm, Chest, Shoulder..." value={form.placement} onChange={handleChange} />
            </div>
            <div className="f-actions">
              <button type="submit" className="f-next">Continue <ArrowRight /></button>
            </div>
          </form>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div>
              <label className="f-label" htmlFor="style">Tattoo Style</label>
              <select id="style" className="f-input" name="style" value={form.style} onChange={handleChange} style={{ cursor: "pointer" }}>
                <option value="">Select a style...</option>
                {STYLES_LIST.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="f-label" htmlFor="message">Describe Your Idea</label>
              <textarea id="message" className="f-input f-textarea" name="message" placeholder="Tell us about your tattoo idea — references, size, meaning..." value={form.message} onChange={handleChange} />
            </div>
            <div className="f-actions">
              <button type="button" className="f-back" onClick={() => setStep(1)}>← Back</button>
              <button type="submit" className="f-submit" disabled={loading}>
                {loading ? <span className="f-spinner" /> : <>Send Request <ArrowRight /></>}
              </button>
            </div>
          </form>
        )}

        {!submitted && (
          <div className="modal-footer">
            Prefer instant chat?{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp us directly →</a>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="footer">
      {/* CTA Banner */}
      <div className="footer-cta">
        <div className="footer-cta-inner">
          <div>
            <div className="footer-cta-pre">Ready to get inked?</div>
            <h3 className="footer-cta-title">BOOK YOUR FREE CONSULTATION.</h3>
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="footer-cta-btn">
            WhatsApp Now <ArrowRight />
          </a>
        </div>
      </div>

      {/* Main */}
      <div className="footer-main">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="#00e5ff" strokeWidth="1"/>
                <path d="M8 2v6l3.5 2" stroke="#00e5ff" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="footer-brand-name">INK<span>FINITY</span></div>
            <div className="footer-brand-by">by Abhi Borge</div>
            <div className="footer-brand-desc">
              Premium custom tattoo artistry in Pune. Where ink becomes identity and art becomes permanent.
            </div>
            <div className="footer-socials">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram"><InstaIcon /></a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="WhatsApp"><WaIcon /></a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Navigate</div>
            <ul className="footer-links">
              {["home","services","gallery","artist","contact"].map(id => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a href={`tel:${PHONE_RAW}`}>{PHONE_DISPLAY}</a></li>
              <li><a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp Chat</a></li>
              <li><a href={MAP_LINK} target="_blank" rel="noopener noreferrer">Get Directions</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Hours</div>
            <div className="footer-hours">
              <div className="footer-hr">
                <span>Mon – Sun</span>
                <span className="footer-hr-time">11 AM – 10 PM</span>
              </div>
              <div className="footer-open">Open Today</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {year} Inkfinity Tattoo Studio. All rights reserved.</span>
          <span className="footer-credit">Made by <a href="https://shauryait.vercel.app" target="_blank" rel="noreferrer">shauryait.vercel.app</a></span>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════
   APP
════════════════════════════════════════════════════════ */
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <style>{STYLES}</style>
      <Navbar    onBook={() => setModalOpen(true)} />
      <Hero      onBook={() => setModalOpen(true)} />
      <Services />
      <Gallery />
      <Artist />
      <Contact   onBook={() => setModalOpen(true)} />
      <Footer />
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}