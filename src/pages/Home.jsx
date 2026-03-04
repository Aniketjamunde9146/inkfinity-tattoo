import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   GOOGLE FONTS loaded via @import inside <style>
───────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #faf8f5;
    --white: #ffffff;
    --ink: #1a1a1a;
    --ink-light: #3d3d3d;
    --ink-muted: #7a7a7a;
    --gold: #c9a84c;
    --gold-light: #e8d4a0;
    --pearl: #e8e4de;
    --border: rgba(26,26,26,0.1);
    --shadow: 0 4px 40px rgba(0,0,0,0.08);
    --shadow-lg: 0 20px 60px rgba(0,0,0,0.12);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 0 40px;
    height: 72px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(250,248,245,0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.3s;
  }
  .nav.scrolled { box-shadow: 0 2px 30px rgba(0,0,0,0.06); }
  .nav-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 700; letter-spacing: 0.5px;
    color: var(--ink); text-decoration: none;
    display: flex; align-items: center; gap: 10px;
  }
  .nav-brand-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--gold); flex-shrink: 0;
  }
  .nav-links {
    display: flex; align-items: center; gap: 36px;
    list-style: none;
  }
  .nav-links a {
    font-size: 13px; font-weight: 500; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--ink-light);
    text-decoration: none; transition: color 0.2s;
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
    height: 1px; background: var(--gold);
    transform: scaleX(0); transition: transform 0.3s;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-links a:hover::after { transform: scaleX(1); }
  .nav-cta {
    background: var(--ink); color: var(--white) !important;
    padding: 10px 22px; border-radius: 2px;
    font-size: 12px !important; letter-spacing: 2px !important;
    transition: background 0.3s !important;
  }
  .nav-cta::after { display: none !important; }
  .nav-cta:hover { background: var(--gold) !important; color: var(--ink) !important; }
  .nav-hamburger {
    display: none; flex-direction: column; gap: 5px;
    cursor: pointer; background: none; border: none; padding: 4px;
  }
  .nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: var(--ink);
    transition: all 0.3s;
  }
  .mobile-menu {
    display: none; position: fixed; top: 72px; left: 0; right: 0;
    background: var(--white); z-index: 99;
    border-bottom: 1px solid var(--border);
    padding: 20px 40px;
    flex-direction: column; gap: 20px;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    font-size: 14px; font-weight: 500; letter-spacing: 1px;
    text-transform: uppercase; color: var(--ink-light); text-decoration: none;
  }
  .mobile-book-btn {
    background: var(--ink); color: var(--white);
    padding: 12px 24px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
    border-radius: 2px; align-self: flex-start;
    transition: background 0.3s;
  }
  .mobile-book-btn:hover { background: var(--gold); color: var(--ink); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 100px 40px 60px;
    position: relative; overflow: hidden;
    background: var(--cream);
  }
  .hero-bg-text {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(120px, 18vw, 280px);
    font-weight: 700; letter-spacing: -5px;
    color: rgba(201,168,76,0.06);
    white-space: nowrap; pointer-events: none;
    user-select: none; z-index: 0;
  }
  .hero-inner {
    max-width: 1200px; margin: 0 auto; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center; position: relative; z-index: 1;
  }
  .hero-label {
    display: inline-flex; align-items: center; gap: 12px;
    margin-bottom: 28px;
    font-size: 11px; font-weight: 600; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gold);
  }
  .hero-label-line {
    width: 40px; height: 1px; background: var(--gold);
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 7vw, 90px);
    font-weight: 700; line-height: 1.0;
    color: var(--ink); margin-bottom: 24px;
  }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-subtitle {
    font-size: 16px; line-height: 1.8; color: var(--ink-muted);
    margin-bottom: 44px; max-width: 420px; font-weight: 300;
  }
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
  .btn-primary {
    background: var(--ink); color: var(--white);
    padding: 15px 32px; border: none; border-radius: 2px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.3s; text-decoration: none;
    display: inline-flex; align-items: center; gap: 10px;
  }
  .btn-primary:hover { background: var(--gold); color: var(--ink); transform: translateY(-2px); }
  .btn-primary svg { transition: transform 0.3s; }
  .btn-primary:hover svg { transform: translateX(4px); }
  .btn-ghost {
    background: transparent; color: var(--ink);
    padding: 14px 28px; border: 1px solid var(--border);
    border-radius: 2px; font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 500; letter-spacing: 1.5px;
    text-transform: uppercase; cursor: pointer; transition: all 0.3s;
    text-decoration: none;
  }
  .btn-ghost:hover { border-color: var(--ink); background: var(--ink); color: var(--white); }
  .hero-stats {
    display: flex; gap: 40px; margin-top: 56px;
    padding-top: 40px; border-top: 1px solid var(--border);
  }
  .stat { display: flex; flex-direction: column; gap: 4px; }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px; font-weight: 700; color: var(--ink); line-height: 1;
  }
  .stat-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-muted); }
  .hero-visual {
    position: relative; display: flex;
    justify-content: center; align-items: center;
  }
  .hero-logo-frame {
    width: 420px; height: 420px;
    border: 1px solid var(--border);
    border-radius: 4px; background: var(--white);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    box-shadow: var(--shadow-lg);
  }
  .hero-logo-frame::before {
    content: '';
    position: absolute; inset: 12px;
    border: 1px solid var(--gold-light); border-radius: 2px;
    pointer-events: none;
  }
  .hero-logo-frame img {
    width: 70%; height: 70%; object-fit: contain;
    animation: float 8s ease-in-out infinite;
  }
  .hero-logo-placeholder {
    width: 70%; height: 70%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 12px;
  }
  .hero-logo-placeholder svg { opacity: 0.15; }
  .hero-logo-placeholder span {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 700; color: var(--ink);
    text-align: center; line-height: 1.2;
  }
  .hero-logo-placeholder small {
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold);
  }
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  .hero-accent-1 {
    position: absolute; top: -20px; right: -20px;
    width: 80px; height: 80px;
    border: 1px solid var(--gold-light); border-radius: 50%;
  }
  .hero-accent-2 {
    position: absolute; bottom: 30px; left: -30px;
    width: 120px; height: 120px;
    border: 1px solid var(--border); border-radius: 50%;
  }
  .hero-tag {
    position: absolute; bottom: -16px; right: 30px;
    background: var(--white); border: 1px solid var(--border);
    padding: 12px 20px; border-radius: 2px; box-shadow: var(--shadow);
    display: flex; align-items: center; gap: 10px;
  }
  .hero-tag-dot { width: 8px; height: 8px; border-radius: 50%; background: #4caf50; flex-shrink: 0; }
  .hero-tag-text { font-size: 12px; font-weight: 500; letter-spacing: 0.5px; }

  /* ── SECTION COMMONS ── */
  .section { padding: 100px 40px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-header { margin-bottom: 64px; }
  .section-label {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 11px; font-weight: 600; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 16px;
  }
  .section-label-line { width: 30px; height: 1px; background: var(--gold); }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 56px); font-weight: 700;
    color: var(--ink); line-height: 1.1;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-desc { font-size: 16px; color: var(--ink-muted); line-height: 1.8; margin-top: 16px; max-width: 500px; font-weight: 300; }

  /* ── SERVICES ── */
  .services { background: var(--white); }
  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; border: 1px solid var(--border);
    border-radius: 4px; overflow: hidden;
  }
  .service-card {
    padding: 40px 36px;
    background: var(--white);
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    transition: all 0.35s;
    cursor: default; position: relative; overflow: hidden;
  }
  .service-card:last-child { border-right: none; }
  .service-card:nth-child(3n) { border-right: none; }
  .service-card:hover { background: var(--ink); }
  .service-card::before {
    content: '';
    position: absolute; bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: var(--gold);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s;
  }
  .service-card:hover::before { transform: scaleX(1); }
  .service-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px; font-weight: 300;
    color: var(--gold-light); line-height: 1;
    margin-bottom: 20px; transition: color 0.35s;
  }
  .service-card:hover .service-num { color: rgba(201,168,76,0.4); }
  .service-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600;
    color: var(--ink); margin-bottom: 12px; transition: color 0.35s;
  }
  .service-card:hover .service-name { color: var(--white); }
  .service-desc {
    font-size: 14px; line-height: 1.7; color: var(--ink-muted);
    font-weight: 300; transition: color 0.35s;
  }
  .service-card:hover .service-desc { color: rgba(255,255,255,0.6); }

  /* ── GALLERY ── */
  .gallery { background: var(--cream); }
  .gallery-track-wrapper {
    position: relative; display: flex;
    align-items: center; gap: 16px;
  }
  .gallery-track {
    display: flex; gap: 16px; overflow-x: auto;
    scroll-behavior: smooth; scrollbar-width: none;
    padding: 8px 0; flex: 1;
    scroll-snap-type: x mandatory;
  }
  .gallery-track::-webkit-scrollbar { display: none; }
  .gallery-card {
    flex: 0 0 320px; height: 400px;
    border-radius: 4px; overflow: hidden;
    background: var(--white); border: 1px solid var(--border);
    position: relative; cursor: pointer;
    transition: all 0.3s; scroll-snap-align: start;
  }
  .gallery-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--gold-light); }
  .gallery-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .gallery-card:hover img { transform: scale(1.04); }
  .gallery-card-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 20px 20px 18px;
    background: linear-gradient(transparent, rgba(26,26,26,0.85));
    transform: translateY(100%); transition: transform 0.35s;
  }
  .gallery-card:hover .gallery-card-caption { transform: translateY(0); }
  .gallery-card-title { font-size: 15px; font-weight: 500; color: var(--white); letter-spacing: 0.5px; }
  .gallery-card-placeholder {
    width: 100%; height: 100%; display: flex;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 12px; background: var(--pearl);
  }
  .gallery-card-placeholder span { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-muted); }
  .gallery-nav-btn {
    width: 44px; height: 44px; border-radius: 50%;
    background: var(--white); border: 1px solid var(--border);
    color: var(--ink); cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; transition: all 0.3s; box-shadow: var(--shadow);
  }
  .gallery-nav-btn:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }
  .gallery-thumbnails {
    display: flex; gap: 8px; margin-top: 24px;
    overflow-x: auto; scrollbar-width: none; padding-bottom: 4px;
  }
  .gallery-thumbnails::-webkit-scrollbar { display: none; }
  .gallery-thumb {
    flex: 0 0 56px; height: 56px; border-radius: 3px;
    overflow: hidden; cursor: pointer;
    border: 1.5px solid transparent; transition: all 0.3s; opacity: 0.5;
  }
  .gallery-thumb.active { border-color: var(--gold); opacity: 1; }
  .gallery-thumb:hover { opacity: 0.8; }
  .gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .gallery-thumb-placeholder { width: 100%; height: 100%; background: var(--pearl); }
  .gallery-counter { margin-top: 20px; font-size: 12px; letter-spacing: 2px; color: var(--ink-muted); }

  /* ── CONTACT ── */
  .contact { background: var(--white); }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: start;
  }
  .contact-cards { display: flex; flex-direction: column; gap: 16px; }
  .contact-card {
    padding: 24px 28px; border: 1px solid var(--border);
    border-radius: 4px; display: flex; gap: 20px;
    align-items: flex-start; transition: all 0.3s; background: var(--cream);
  }
  .contact-card:hover { border-color: var(--gold-light); box-shadow: var(--shadow); background: var(--white); }
  .contact-card-icon {
    width: 44px; height: 44px; border-radius: 3px;
    background: var(--ink); color: var(--white);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
    transition: background 0.3s;
  }
  .contact-card:hover .contact-card-icon { background: var(--gold); color: var(--ink); }
  .contact-card-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 6px; }
  .contact-card-value { font-size: 16px; font-weight: 500; color: var(--ink); text-decoration: none; display: block; transition: color 0.2s; }
  .contact-card-value:hover { color: var(--gold); }
  .contact-card-sub { font-size: 13px; color: var(--ink-muted); margin-top: 4px; }
  .map-block {
    border-radius: 4px; overflow: hidden;
    border: 1px solid var(--border); transition: border-color 0.3s;
  }
  .map-block:hover { border-color: var(--gold-light); box-shadow: var(--shadow); }
  .map-block iframe { display: block; }
  .map-link-row { padding: 14px 20px; background: var(--cream); display: flex; align-items: center; justify-content: space-between; }
  .map-link-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: color 0.2s;
  }
  .map-link-btn:hover { color: var(--gold); }

  /* ── FORM MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(26,26,26,0.5);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .modal-overlay.open { opacity: 1; pointer-events: all; }
  .modal {
    background: var(--white); max-width: 520px; width: 100%;
    border-radius: 4px; padding: 48px;
    position: relative; box-shadow: 0 40px 80px rgba(0,0,0,0.2);
    transform: translateY(20px); transition: transform 0.3s;
    max-height: 90vh; overflow-y: auto;
  }
  .modal-overlay.open .modal { transform: translateY(0); }
  .modal-close {
    position: absolute; top: 20px; right: 20px;
    background: none; border: 1px solid var(--border);
    width: 36px; height: 36px; border-radius: 2px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: var(--ink-muted); transition: all 0.2s;
  }
  .modal-close:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }
  .modal-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 700; color: var(--ink); margin-bottom: 32px; line-height: 1.1;
  }
  .form-field { margin-bottom: 20px; }
  .form-field label { display: block; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 8px; }
  .form-input {
    width: 100%; padding: 13px 16px;
    background: var(--cream); border: 1px solid var(--border);
    border-radius: 2px; color: var(--ink);
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    transition: all 0.2s; outline: none;
  }
  .form-input::placeholder { color: var(--ink-muted); }
  .form-input:focus { background: var(--white); border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.1); }
  .form-textarea { resize: vertical; min-height: 110px; }
  .form-submit {
    width: 100%; padding: 15px;
    background: var(--ink); color: var(--white);
    border: none; border-radius: 2px; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; margin-top: 8px;
    transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .form-submit:hover { background: var(--gold); color: var(--ink); transform: translateY(-2px); }
  .form-success {
    padding: 16px; background: rgba(76,175,80,0.08);
    border: 1px solid rgba(76,175,80,0.3); border-radius: 2px;
    color: #2e7d32; font-size: 14px; font-weight: 500;
    margin-bottom: 20px; display: flex; align-items: center; gap: 10px;
  }
  .form-alt { text-align: center; margin-top: 20px; font-size: 13px; color: var(--ink-muted); }
  .form-alt a { color: var(--gold); font-weight: 600; text-decoration: none; }
  .form-alt a:hover { text-decoration: underline; }

  /* ── FOOTER ── */
  .footer {
    background: var(--ink); color: var(--white);
    padding: 60px 40px 30px;
  }
  .footer-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1.5fr 1fr 1fr;
    gap: 60px; padding-bottom: 48px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .footer-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 700; color: var(--white); margin-bottom: 12px;
  }
  .footer-brand-tag { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; font-weight: 300; max-width: 260px; }
  .footer-socials { display: flex; gap: 12px; margin-top: 28px; }
  .footer-social {
    width: 38px; height: 38px; border-radius: 2px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.6); font-size: 16px; text-decoration: none;
    transition: all 0.3s;
  }
  .footer-social:hover { background: var(--gold); color: var(--ink); border-color: var(--gold); }
  .footer-col-title { font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer-links a { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; font-weight: 300; }
  .footer-links a:hover { color: var(--white); }
  .footer-bottom {
    max-width: 1200px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 28px; flex-wrap: wrap; gap: 12px;
  }
  .footer-copy { font-size: 12px; color: rgba(255,255,255,0.3); letter-spacing: 0.5px; }
  .footer-dev a { font-size: 12px; color: var(--gold); text-decoration: none; font-weight: 500; }
  .footer-dev a:hover { text-decoration: underline; }

  /* ── RESPONSIVE ── */
  @media (max-width: 968px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .hero { padding: 90px 20px 60px; }
    .hero-inner { grid-template-columns: 1fr; gap: 48px; text-align: center; }
    .hero-visual { order: -1; }
    .hero-logo-frame { width: 280px; height: 280px; }
    .hero-actions { justify-content: center; }
    .hero-stats { justify-content: center; }
    .hero-label { justify-content: center; }
    .section { padding: 70px 20px; }
    .services-grid { grid-template-columns: 1fr; }
    .service-card { border-right: none; }
    .contact-grid { grid-template-columns: 1fr; gap: 48px; }
    .footer-inner { grid-template-columns: 1fr; gap: 36px; }
    .footer-bottom { justify-content: center; text-align: center; }
    .hero-tag { display: none; }
    .hero-bg-text { display: none; }
  }
  @media (max-width: 600px) {
    .gallery-card { flex: 0 0 260px; height: 320px; }
    .section-title { font-size: 32px; }
    .modal { padding: 32px 24px; }
  }
`;

// ─── DATA ───────────────────────────────────────────────────────────────────
const SERVICES = [
  { num: "01", name: "Custom Designs", desc: "Unique artworks created exclusively for you — tailored to your vision, body placement, and personality." },
  { num: "02", name: "Realism & Portraits", desc: "Hyper-realistic portraits, animal studies, and detailed illustrative work with stunning depth and precision." },
  { num: "03", name: "Traditional & Neo-Trad", desc: "Bold lines, rich colors, and timeless imagery rooted in the golden age of tattooing, with a modern twist." },
  { num: "04", name: "Blackwork & Dotwork", desc: "Striking geometric patterns, mandalas, and ornamental blackwork that commands attention." },
  { num: "05", name: "Script & Lettering", desc: "From fine script to bold typography — meaningful words rendered with artistry and permanence." },
  { num: "06", name: "Cover-ups & Reworks", desc: "Transform or reimagine existing tattoos with skilled artistry and clever design solutions." },
];

const IMAGES = [
  { id: 1, src: "/assets/tattoo1.png", title: "Rose Tattoo" },
  { id: 2, src: "/assets/tattoo2.png", title: "Dragon Style" },
  { id: 3, src: "/assets/tattoo3.png", title: "Buddhist Art" },
  { id: 4, src: "/assets/tattoo4.png", title: "Architecture" },
  { id: 5, src: "/assets/tattoo5.png", title: "Geometric" },
  { id: 6, src: "/assets/tattoo6.png", title: "Rider Tattoo" },
  { id: 7, src: "/assets/tattoo7.png", title: "Shree Ram" },
  { id: 8, src: "/assets/tattoo8.png", title: "Mahadev" },
  { id: 9, src: "/assets/tattoo9.png", title: "Anime Art" },
  { id: 10, src: "/assets/tattoo10.png", title: "Evil Eye" },
  { id: 11, src: "/assets/tattoo11.png", title: "Illusion" },
  { id: 12, src: "/assets/tattoo12.png", title: "Ganesha" },
  { id: 13, src: "/assets/tattoo13.png", title: "Portrait" },
  { id: 14, src: "/assets/tattoo14.png", title: "Infinity" },
];

const WA_LINK = `https://wa.me/918830911547?text=${encodeURIComponent("Hello! I'm interested in getting a tattoo at Black Pearl Tattoo Studio. 🎨")}`;
const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.47!2d73.850313!3d18.458188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb2ac0e66491:0xa7ba330f576941f4!2sBlack%20Pearl%20Tattoo%20Studio%20%26%20Training%20Institute!5e0!3m2!1sen!2sin!4v1709000000000";
const MAP_LINK = "https://www.google.com/maps/place/Black+Pearl+Tattoo+Studio+%26+Training+Institute/@18.595428,73.4977089,11z";

// ─── ICON COMPONENTS ────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.099 1.515 5.827L.057 23.16a.75.75 0 00.916.916l5.333-1.458A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.714 9.714 0 01-4.961-1.357l-.356-.211-3.169.866.865-3.169-.211-.356A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const InstaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const FbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-brand" href="#home">
          <span className="nav-brand-dot"></span>
          Black Pearl Tattoo
        </a>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>Home</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Services</a></li>
          <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>Gallery</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
          <li><a href="#book" className="nav-cta" onClick={(e) => { e.preventDefault(); onBook(); }}>Book Now</a></li>
        </ul>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={menuOpen ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}}></span>
          <span style={menuOpen ? { opacity: 0 } : {}}></span>
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(4px, -4px)" } : {}}></span>
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a onClick={() => scrollTo("home")}>Home</a>
        <a onClick={() => scrollTo("services")}>Services</a>
        <a onClick={() => scrollTo("gallery")}>Gallery</a>
        <a onClick={() => scrollTo("contact")}>Contact</a>
        <button className="mobile-book-btn" onClick={() => { onBook(); setMenuOpen(false); }}>Book Appointment</button>
      </div>
    </>
  );
}

function Hero({ onBook }) {
  return (
    <section id="home" className="hero">
      <div className="hero-bg-text">TATTOO</div>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-label">
            <span className="hero-label-line"></span>
            Pune's Premier Tattoo Studio
          </div>
          <h1 className="hero-title">
            Art that lives<br />
            <em>on your skin.</em>
          </h1>
          <p className="hero-subtitle">
            At Black Pearl Tattoo Studio, every design is a conversation between your story and our craft. We create tattoos that transcend trends and stand the test of time.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onBook}>
              Book Appointment <ArrowRight />
            </button>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              WhatsApp Us
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">8+</span>
              <span className="stat-label">Years Active</span>
            </div>
            <div className="stat">
              <span className="stat-num">1k+</span>
              <span className="stat-label">Satisfied Clients</span>
            </div>
            <div className="stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">Custom Work</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-logo-frame">
            <div className="hero-logo-placeholder">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M40 8C22.327 8 8 22.327 8 40s14.327 32 32 32 32-14.327 32-32S57.673 8 40 8zm0 58C24.536 66 14 55.464 14 40S24.536 14 40 14s26 10.536 26 26-10.536 26-26 26z" fill="#1a1a1a"/>
                <path d="M40 20c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20zm0 34c-7.732 0-14-6.268-14-14s6.268-14 14-14 14 6.268 14 14-6.268 14-14 14z" fill="#c9a84c"/>
              </svg>
              <span>Black Pearl<br/>Tattoo Studio</span>
              <small>Pune, Maharashtra</small>
            </div>
          </div>
          <div className="hero-accent-1"></div>
          <div className="hero-accent-2"></div>
          <div className="hero-tag">
            <div className="hero-tag-dot"></div>
            <span className="hero-tag-text">Currently Accepting Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="section-inner">
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div className="section-label"><span className="section-label-line"></span>What We Do</div>
            <h2 className="section-title">Our <em>Specialties</em></h2>
          </div>
          <p className="section-desc">Every style, mastered. Every vision, realised with precision and care.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="service-card" key={s.num}>
              <div className="service-num">{s.num}</div>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState(0);
  const galleryRef = useRef(null);
  const thumbRef = useRef(null);

  const scrollGallery = (dir) => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
    }
  };

  const goTo = (idx) => {
    setActive(idx);
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = idx * (320 + 16);
    }
    if (thumbRef.current) {
      thumbRef.current.scrollLeft = idx * (56 + 8) - 100;
    }
  };

  return (
    <section id="gallery" className="section gallery">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-label"><span className="section-label-line"></span>Our Portfolio</div>
          <h2 className="section-title">The <em>Gallery</em></h2>
          <p className="section-desc">A curated glimpse into our studio's finest work.</p>
        </div>
        <div className="gallery-track-wrapper">
          <button className="gallery-nav-btn" onClick={() => scrollGallery("left")} aria-label="Previous">
            <ChevronLeft />
          </button>
          <div className="gallery-track" ref={galleryRef}>
            {IMAGES.map((img, i) => (
              <div
                key={img.id}
                className="gallery-card"
                onClick={() => goTo(i)}
                style={{ outline: i === active ? "2px solid #c9a84c" : "none", outlineOffset: "2px" }}
              >
                <div className="gallery-card-placeholder">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.25">
                    <rect x="2" y="2" width="28" height="28" rx="2" stroke="#1a1a1a" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="3" stroke="#1a1a1a" strokeWidth="1.5"/>
                    <path d="M2 22l8-6 6 5 5-4 9 7" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{img.title}</span>
                </div>
                <div className="gallery-card-caption">
                  <div className="gallery-card-title">{img.title}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="gallery-nav-btn" onClick={() => scrollGallery("right")} aria-label="Next">
            <ChevronRight />
          </button>
        </div>
        <div className="gallery-thumbnails" ref={thumbRef}>
          {IMAGES.map((img, i) => (
            <div
              key={img.id}
              className={`gallery-thumb${i === active ? " active" : ""}`}
              onClick={() => goTo(i)}
            >
              <div className="gallery-thumb-placeholder"></div>
            </div>
          ))}
        </div>
        <div className="gallery-counter">
          {String(active + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}

function Contact({ onBook }) {
  return (
    <section id="contact" className="section contact">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-label"><span className="section-label-line"></span>Find Us</div>
          <h2 className="section-title">Get In <em>Touch</em></h2>
          <p className="section-desc">We're here to make your tattoo journey smooth, memorable, and entirely yours.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-card-icon"><LocationIcon /></div>
              <div>
                <div className="contact-card-label">Location</div>
                <span className="contact-card-value">Black Pearl Tattoo Studio & Training Institute</span>
                <div className="contact-card-sub">Pune, Maharashtra, India</div>
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer"
                   style={{ display:"inline-flex", alignItems:"center", gap:"6px", marginTop:"10px", fontSize:"12px", fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--gold)", textDecoration:"none" }}>
                  Open in Maps <ArrowRight />
                </a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon"><PhoneIcon /></div>
              <div>
                <div className="contact-card-label">Call Us</div>
                <a href="tel:+918830911547" className="contact-card-value">+91 88309 11547</a>
                <div className="contact-card-sub">Mon – Sun, 10 AM – 8 PM</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon"><WhatsAppIcon /></div>
              <div>
                <div className="contact-card-label">WhatsApp</div>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="contact-card-value">+91 88309 11547</a>
                <div className="contact-card-sub">Quick replies guaranteed</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon"><ClockIcon /></div>
              <div>
                <div className="contact-card-label">Working Hours</div>
                <span className="contact-card-value">10:00 AM – 8:00 PM</span>
                <div className="contact-card-sub">Appointments recommended</div>
              </div>
            </div>
            <button className="btn-primary" onClick={onBook} style={{ marginTop: "8px", justifyContent: "center" }}>
              Book Your Session <ArrowRight />
            </button>
          </div>
          <div>
            <div className="map-block">
              <iframe
                src={MAP_EMBED}
                width="100%" height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Black Pearl Tattoo Studio Location"
              />
              <div className="map-link-row">
                <span style={{ fontSize:"12px", color:"var(--ink-muted)", letterSpacing:"0.5px" }}>Black Pearl Tattoo Studio, Pune</span>
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="map-link-btn">
                  Get Directions <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Form({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", style: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", style: "", message: "" });
      onClose();
    }, 3000);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className={`modal-overlay${isOpen ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        <div className="modal-label">Book a Session</div>
        <h2 className="modal-title">Let's create something extraordinary.</h2>
        {submitted && (
          <div className="form-success">
            <CheckIcon /> Thank you! We'll be in touch very soon.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Your Name</label>
            <input className="form-input" type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Phone Number</label>
            <input className="form-input" type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Tattoo Style</label>
            <select className="form-input" name="style" value={form.style} onChange={handleChange} style={{ cursor:"pointer" }}>
              <option value="">Select a style...</option>
              <option>Custom Design</option>
              <option>Realism / Portrait</option>
              <option>Traditional / Neo-Trad</option>
              <option>Blackwork / Dotwork</option>
              <option>Script / Lettering</option>
              <option>Cover-up / Rework</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="form-field">
            <label>Tell us your idea</label>
            <textarea className="form-input form-textarea" name="message" placeholder="Describe your tattoo idea, placement, size..." value={form.message} onChange={handleChange} />
          </div>
          <button type="submit" className="form-submit">
            Send Request <ArrowRight />
          </button>
        </form>
        <p className="form-alt">
          Prefer instant contact?{" "}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer">Message us on WhatsApp →</a>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand-name">Black Pearl Tattoo</div>
          <p className="footer-brand-tag">Premium custom tattoo artistry in Pune, Maharashtra. Where your story becomes permanent art.</p>
          <div className="footer-socials">
            <a href="#" className="footer-social" aria-label="Instagram"><InstaIcon /></a>
            <a href="#" className="footer-social" aria-label="Facebook"><FbIcon /></a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="WhatsApp"><WhatsAppIcon /></a>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Navigate</div>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>Home</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Services</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>Gallery</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <ul className="footer-links">
            <li><a href="tel:+918830911547">+91 88309 11547</a></li>
            <li><a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href={MAP_LINK} target="_blank" rel="noopener noreferrer">Get Directions</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Find Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© {year} Black Pearl Tattoo Studio & Training Institute. All rights reserved.</span>
        <span className="footer-dev">Made by <a href="https://shauryait.vercel.app" target="_blank" rel="noreferrer">shauryait.vercel.app</a></span>
      </div>
    </footer>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <style>{STYLES}</style>
      <Navbar onBook={() => setFormOpen(true)} />
      <Hero onBook={() => setFormOpen(true)} />
      <Services />
      <Gallery />
      <Contact onBook={() => setFormOpen(true)} />
      <Footer />
      <Form isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}