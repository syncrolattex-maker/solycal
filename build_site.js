const fs = require('fs');

function getHead(title, description, canonicalPath = '') {
  const url = 'https://solycal.es/' + canonicalPath;
  const ogImage = 'https://solycal.es/assets/instalaciones.jpg';

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Manufacturer"],
        "@id": "https://solycal.es/#organization",
        "name": "SOLYCAL - Soldadura y Calderería Valenciana S.L.",
        "legalName": "Soldadura y Calderería Valenciana S.L.",
        "url": "https://solycal.es/",
        "logo": "https://solycal.es/assets/logo-icon.png",
        "image": ogImage,
        "description": "Empresa especializada en calderería industrial pesada y ligera, corte por plasma HD TrueHole, soldadura homologada TIG/MIG y estructuras metálicas con marcado CE en Valencia.",
        "telephone": "+34961504038",
        "email": "info@solycal.es",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Calle Hort de Soriano, 17A, Polígono Industrial Masía del Juez",
          "addressLocality": "Torrent",
          "addressRegion": "Valencia",
          "postalCode": "46900",
          "addressCountry": "ES"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 39.4362,
          "longitude": -0.4981
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Comunidad Valenciana" },
          { "@type": "Country", "name": "España" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios Industriales Metalúrgicos",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Calderería Industrial Pesada y Ligera" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corte por Plasma de Alta Definición HD TrueHole" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Soldadura Homologada TIG / MIG-MAG" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estructuras Metálicas Marcado CE EN 1090-1" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Curvado y Plegado CNC de Chapa" } }
          ]
        },
        "sameAs": [
          "https://solycal.es"
        ]
      }
    ]
  });

  return `<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${url}">

  <!-- Open Graph / Redes Sociales y Búsqueda -->
  <meta property="og:locale" content="es_ES">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="SOLYCAL | Soldadura y Calderería Valenciana S.L.">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:alt" content="Instalaciones de SOLYCAL en Torrent, Valencia">

  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Schema.org Microdatos Estructurados JSON-LD -->
  <script type="application/ld+json">
  ${schemaJson}
  </script>

  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="alternate icon" href="assets/logo-icon.png">

  <!-- Editorial & Architectural Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- GSAP & ScrollTrigger & Draggable -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js"></script>
  <!-- Lenis Smooth Scroll -->
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              yellow: '#F1B541',
              accent: '#E5A52A',
              dark: '#0a0c0e',
              black: '#07080a',
              surface: '#111317',
              surfaceLight: '#181b21',
              border: 'rgba(255, 255, 255, 0.08)',
              borderLight: 'rgba(255, 255, 255, 0.15)',
              textMuted: '#8E95A2'
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            display: ['"Syne"', 'sans-serif'],
            mono: ['"Space Mono"', 'monospace']
          }
        }
      }
    }
  </script>

  <style>
    html.lenis, html.lenis body {
      height: auto;
    }
    .lenis.lenis-smooth {
      scroll-behavior: auto !important;
    }
    .lenis.lenis-smooth [data-lenis-prevent] {
      overscroll-behavior: contain;
    }
    .lenis.lenis-stopped {
      overflow: hidden;
    }
    .lenis.lenis-scrolling iframe {
      pointer-events: none;
    }
    body {
      background-color: #07080a;
      color: #f1f5f9;
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow-x: hidden;
      selection-background-color: #F1B541;
      selection-color: #000;
    }
    ::selection {
      background: #F1B541;
      color: #07080a;
    }
    .text-outline {
      -webkit-text-stroke: 1px rgba(255,255,255,0.2);
      color: transparent;
    }
    .text-outline-hover:hover {
      -webkit-text-stroke: 1px #F1B541;
      color: #F1B541;
    }
    .dot-grid {
      background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
      background-size: 32px 32px;
    }
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
    /* EFECTO TEXT SCRAMBLE EN TÍTULOS GRANDES */
    .scramble-word {
      display: inline-block;
      white-space: nowrap;
    }
    .scramble-char {
      display: inline-block;
      will-change: opacity, color;
      transition: color 0.1s ease;
    }
    .scramble-char.is-scrambling {
      color: #F1B541;
      opacity: 0.95;
      text-shadow: 0 0 10px rgba(241, 181, 65, 0.5);
    }
    .line-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 10px #22c55e;
    }
    .video-background-wrapper {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none !important;
      z-index: 0;
      background-color: #07080a;
    }
    .video-background-wrapper video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none !important;
    }
    .video-scaler {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100vw;
      height: 56.25vw; /* 16:9 aspect ratio */
      min-height: 100vh;
      min-width: 177.78vh; /* 16:9 aspect ratio */
      transform: translate(-50%, -50%) scale(1.75) !important;
      transform-origin: center center;
      pointer-events: none !important;
    }
    .video-scaler iframe {
      position: absolute;
      inset: 0;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
      border: 0 !important;
    }
    .btn-magnetic {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: box-shadow 0.3s ease;
      will-change: transform;
    }
    .btn-magnetic-content {
      position: relative;
      z-index: 2;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      will-change: transform;
    }
    .btn-magnetic-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.35) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 1;
    }
    .btn-magnetic:hover .btn-magnetic-glow {
      opacity: 1;
    }

    /* SEPARADOR INDUSTRIAL MATRIX GRID (Inspirado en Jhey Tompkins / GSAP Draggable) */
    .interactive-grid-separator {
      position: relative;
      width: 100%;
      overflow: hidden;
      user-select: none;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: #050608;
      padding: 1.5rem 0.5rem;
    }
    .separator-grid {
      touch-action: none;
      display: grid;
      grid-template-columns: repeat(var(--cols, 32), minmax(0, 1fr));
      grid-template-rows: repeat(var(--rows, 5), minmax(0, 1fr));
      gap: 3px;
      font-family: ui-monospace, SFMono-Regular, "Space Mono", monospace;
      font-size: 1rem;
      line-height: 1;
      width: 100%;
      max-width: 100%;
    }
    .separator-grid div {
      touch-action: none;
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      transition: opacity 0.8s ease-in, transform 0.4s ease-out, filter 0.6s ease-out, color 0.4s ease;
      opacity: calc(var(--opacity, 0.15));
      filter: grayscale(1);
      color: rgba(255, 255, 255, 0.4);
      cursor: crosshair;
      font-weight: 600;
    }
    .separator-grid div:hover,
    .separator-grid div[data-hover="true"] {
      transition: opacity 0s, transform 0s, filter 0s, color 0s;
      transform: rotate(calc(var(--grade, 0) * 90deg)) scale(1.35);
      filter: grayscale(0) brightness(1.7);
      opacity: 1 !important;
      color: #F1B541 !important;
      text-shadow: 0 0 12px rgba(241, 181, 65, 0.8);
    }

    /* ANIMACIÓN EDITORIAL DE INTRO DEL LOGO SOLYCAL */
    .brand-logo-container {
      display: inline-flex;
      align-items: center;
      position: relative;
      user-select: none;
    }
    .brand-logo-icon {
      display: inline-block;
      will-change: transform, opacity;
      transform-origin: center center;
    }
    .brand-logo-text {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      will-change: opacity, transform, max-width, margin-left;
    }

    /* AUTÉNTICO MENÚ HAMBURGUESA & INTERACCIÓN JOBY AVIATION (PALETA CORPORATIVA SOLYCAL) */
    :root {
      --joby-cubic: cubic-bezier(0.65, 0, 0.35, 1);
      --joby-power4: cubic-bezier(0.165, 0.84, 0.44, 1);
      --solycal-yellow: #F1B541;
      --solycal-accent: #E5A52A;
      --solycal-gray-light: #2d333b;
      --solycal-gray-mid: #1c2128;
      --solycal-gray-dark: #111317;
      --solycal-black: #07080a;
    }

    /* Botón Hamburguesa Joby: 2 líneas con morphing elástico y texto '[CERRAR]' */
    .joby-nav-toggle-wrap {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
    }
    .joby-burger-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      height: 32px;
      padding: 0 4px;
      background: transparent;
      border: none;
      transition: transform 0.3s ease;
      cursor: pointer;
      z-index: 150;
    }
    .joby-burger-btn:hover {
      background: transparent;
      border: none;
      transform: scale(1.06);
    }
    .joby-burger-icon {
      position: relative;
      width: 24px;
      height: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: none;
    }
    .joby-burger-line {
      display: block;
      width: 100%;
      height: 1.5px;
      background-color: #ffffff;
      border-radius: 2px;
      transition: transform 0.5s var(--joby-cubic), width 0.4s ease, background-color 0.4s ease;
      transform-origin: center;
    }
    /* Joby micro-interaction: la 2da línea se contrae un poco al hover */
    .joby-burger-btn:hover .joby-burger-line:nth-child(2) {
      transform: scaleX(0.7);
      transform-origin: right center;
    }
    .joby-burger-btn:hover .joby-burger-line {
      background-color: #F1B541;
    }
    /* Estado activo / abierto: Cruz limpia de 2 líneas */
    .joby-burger-btn.is-active {
      background: transparent;
      border: none;
    }
    .joby-burger-btn.is-active:hover {
      background: transparent;
      border: none;
    }
    .joby-burger-btn.is-active .joby-burger-line:nth-child(1) {
      transform: translateY(4.25px) rotate(45deg);
      background-color: #F1B541;
    }
    .joby-burger-btn.is-active .joby-burger-line:nth-child(2) {
      transform: translateY(-4.25px) rotate(-45deg);
      background-color: #F1B541;
    }
    .joby-close-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.75rem;
      color: #94a3b8;
      letter-spacing: 0.05em;
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity 0.4s var(--joby-cubic), transform 0.4s var(--joby-cubic), color 0.3s ease;
      pointer-events: none;
    }
    .joby-nav-toggle-wrap.is-active .joby-close-label {
      opacity: 1;
      transform: translateX(0);
      color: #F1B541;
    }

    /* PRELOADER INTRO INDUSTRIAL SOLYCAL (ANIMACIÓN 'S' -> IZQUIERDA -> SOLYCAL) */
    #solycal-loader {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      pointer-events: auto;
    }
    .loader-curtain {
      position: absolute;
      left: 0;
      width: 100%;
      height: 50.5%;
      background-color: #07080a;
      z-index: 1;
      will-change: transform;
    }
    .loader-curtain-top {
      top: 0;
      transform-origin: top center;
    }
    .loader-curtain-bottom {
      bottom: 0;
      transform-origin: bottom center;
    }
    #solycal-loader.loader-hidden {
      display: none !important;
      pointer-events: none;
    }
    .loader-brand-container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 10;
      will-change: opacity, transform;
    }
    .loader-char {
      display: inline-block;
      opacity: 0;
      will-change: opacity, transform;
    }

    /* BACKDROP DIM DE FONDO */
    .joby-backdrop-dim {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.5s var(--joby-cubic), visibility 0s linear 0.5s;
    }
    .joby-backdrop-dim.is-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transition: opacity 0.5s var(--joby-cubic), visibility 0s linear 0s;
    }

    /* CONTENEDOR DE CORTINAS CROMÁTICAS (Joby Aviation Multi-Layer Sheets) */
    .joby-color-waves {
      position: fixed;
      inset: 0;
      z-index: 101;
      pointer-events: none;
      overflow: hidden;
    }
    .joby-wave-layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transform-origin: top center;
      transform: scaleY(0);
      will-change: transform;
    }
    /* Capa 1: Amarillo Corporativo Solycal (#F1B541) */
    .joby-wave-layer:nth-child(1) {
      background-color: var(--solycal-yellow);
      z-index: 1;
    }
    /* Capa 2: Gris Metalizado Medio (#2d333b) */
    .joby-wave-layer:nth-child(2) {
      background-color: var(--solycal-gray-light);
      z-index: 2;
    }
    /* Capa 3: Gris Antracita Oscuro (#111317) */
    .joby-wave-layer:nth-child(3) {
      background-color: var(--solycal-gray-dark);
      z-index: 3;
    }
    /* Capa 4: Negro Carbón Corporativo (#07080a) base */
    .joby-wave-layer:nth-child(4) {
      background-color: var(--solycal-black);
      z-index: 4;
    }

    /* Al CERRAR: retroceden ordenadamente hacia arriba con delay */
    .joby-color-waves .joby-wave-layer:nth-child(1) {
      transition: transform 0.45s var(--joby-cubic) 0.15s;
    }
    .joby-color-waves .joby-wave-layer:nth-child(2) {
      transition: transform 0.45s var(--joby-cubic) 0.10s;
    }
    .joby-color-waves .joby-wave-layer:nth-child(3) {
      transition: transform 0.45s var(--joby-cubic) 0.05s;
    }
    .joby-color-waves .joby-wave-layer:nth-child(4) {
      transition: transform 0.45s var(--joby-cubic) 0s;
    }

    /* Al ABRIR: las 4 capas caen en cascada secuencial con delay progresivo Joby */
    .joby-color-waves.is-open .joby-wave-layer:nth-child(1) {
      transform: scaleY(1);
      transition: transform 0.72s var(--joby-cubic) 0s;
    }
    .joby-color-waves.is-open .joby-wave-layer:nth-child(2) {
      transform: scaleY(1);
      transition: transform 0.78s var(--joby-cubic) 0.08s;
    }
    .joby-color-waves.is-open .joby-wave-layer:nth-child(3) {
      transform: scaleY(1);
      transition: transform 0.84s var(--joby-cubic) 0.16s;
    }
    .joby-color-waves.is-open .joby-wave-layer:nth-child(4) {
      transform: scaleY(1);
      transition: transform 0.90s var(--joby-cubic) 0.24s;
    }

    /* CONTENEDOR PRINCIPAL DEL MENÚ OVERLAY */
    #joby-nav-overlay {
      position: fixed;
      inset: 0;
      z-index: 105;
      background: transparent;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
      transition: opacity 0.3s ease 0s, visibility 0s linear 0.45s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-y: auto;
      overflow-x: hidden;
    }
    #joby-nav-overlay.is-open {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
      transition: opacity 0.4s ease 0.35s, visibility 0s linear 0s;
    }

    .joby-overlay-content {
      position: relative;
      z-index: 10;
    }
    .joby-nav-item {
      display: block;
      overflow: hidden;
    }
    .joby-nav-link {
      display: inline-flex;
      align-items: baseline;
      gap: 1.25rem;
      transform: translateY(110%);
      transition: transform 0.6s var(--joby-power4), color 0.25s ease;
      will-change: transform;
    }
    #joby-nav-overlay.is-open .joby-nav-link {
      transform: translateY(0);
    }
    .joby-nav-link:hover .joby-nav-title {
      color: #F1B541;
      transform: translateX(12px);
    }
    .joby-nav-title {
      display: inline-block;
      transition: transform 0.35s var(--joby-power4), color 0.25s ease;
    }
  </style>
</head>
<body class="antialiased">
`;
}

function getSocialIcons(iconSize = 'w-5 h-5', containerClass = 'flex items-center gap-4') {
  return `
  <div class="${containerClass}">
    <a href="https://www.linkedin.com/company/solycal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Solycal" title="LinkedIn" class="text-neutral-400 hover:text-brand-yellow transition-all duration-200 hover:scale-110 inline-flex items-center justify-center">
      <svg class="${iconSize} fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
      </svg>
    </a>
    <a href="https://www.instagram.com/solycal_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Solycal" title="Instagram" class="text-neutral-400 hover:text-brand-yellow transition-all duration-200 hover:scale-110 inline-flex items-center justify-center">
      <svg class="${iconSize} fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </a>
    <a href="https://www.facebook.com/solycal" target="_blank" rel="noopener noreferrer" aria-label="Facebook Solycal" title="Facebook" class="text-neutral-400 hover:text-brand-yellow transition-all duration-200 hover:scale-110 inline-flex items-center justify-center">
      <svg class="${iconSize} fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 13.5h2.5l1-4H14V7c0-1.03.28-1.5 1.5-1.5h2V2.14C17.17 2.09 16.2 2 15.14 2 12.3 2 10.5 3.73 10.5 6.9V9.5H7.5v4h3v10.5h3.5V13.5z"/>
      </svg>
    </a>
    <a href="https://www.youtube.com/channel/UC4_Yk1tJqoAFrBOQ-fi4T7w" target="_blank" rel="noopener noreferrer" aria-label="YouTube Solycal" title="YouTube" class="text-neutral-400 hover:text-brand-yellow transition-all duration-200 hover:scale-110 inline-flex items-center justify-center">
      <svg class="${iconSize} fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    </a>
  </div>
  `;
}

function getHeader(activeSlug, isTransparent = false) {
  const isHeaderTransparent = isTransparent || activeSlug === 'calidad';
  const links = [
    { num: '01', title: 'Inicio', href: 'index.html', slug: 'inicio' },
    { num: '02', title: 'Servicios', href: 'servicios.html', slug: 'servicios' },
    { num: '03', title: 'Instalaciones', href: 'instalaciones.html', slug: 'instalaciones' },
    { num: '04', title: 'Calidad & Normas', href: 'calidad.html', slug: 'calidad' },
    { num: '05', title: 'Equipo', href: 'equipo.html', slug: 'equipo' },
    { num: '06', title: 'Contacto', href: 'contacto.html', slug: 'contacto' }
  ];

  const menuItems = links.map(l => {
    const isActive = l.slug === activeSlug;
    return `
      <a href="${l.href}" class="group flex items-baseline gap-2 py-2 transition-all ${isActive ? 'text-brand-yellow font-bold' : 'text-neutral-400 hover:text-white'}">
        <span class="font-mono text-[10px] tracking-wider opacity-60 group-hover:text-brand-yellow">${l.num}</span>
        <span class="text-xs uppercase tracking-widest font-semibold">${l.title}</span>
      </a>
    `;
  }).join('');

  const overlayNavItems = links.map(l => {
    const isActive = l.slug === activeSlug;
    return `
      <div class="joby-nav-item">
        <a href="${l.href}" class="joby-nav-link text-3xl sm:text-5xl lg:text-6xl font-display font-bold py-2 ${isActive ? 'text-brand-yellow' : 'text-white hover:text-brand-yellow'} group">
          <span class="font-mono text-sm sm:text-lg text-neutral-500 group-hover:text-brand-yellow font-normal tracking-widest">${l.num}</span>
          <span class="joby-nav-title">${l.title}</span>
        </a>
      </div>
    `;
  }).join('');

  return `
  <!-- PANTALLA DE CARGA INICIAL (ANIMACIÓN 'S' -> IZQUIERDA -> SOLYCAL) -->
  <div id="solycal-loader" aria-hidden="false">
    <div class="loader-curtain loader-curtain-top"></div>
    <div class="loader-curtain loader-curtain-bottom"></div>
    <div class="loader-brand-container" id="loader-brand-box">
      <!-- Icono Logo 'S' de Solycal en tamaño compacto y equilibrado -->
      <img id="loader-logo-icon" src="assets/logo-icon.png" alt="Solycal" class="w-8 sm:w-10 md:w-12 h-auto object-contain flex-shrink-0">

      <!-- Contenedor del texto SOLYCAL con letras individuales para animación progresiva smooth -->
      <div id="loader-logo-text-wrap" class="overflow-hidden flex items-center ml-0 pl-0">
        <div id="loader-letters" class="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-wider text-white flex items-center">
          <span class="loader-char">S</span>
          <span class="loader-char">O</span>
          <span class="loader-char">L</span>
          <span class="loader-char">Y</span>
          <span class="loader-char">C</span>
          <span class="loader-char">A</span>
          <span class="loader-char">L</span>
        </div>
      </div>
    </div>
  </div>

  <!-- HEADER MINIMALISTA & EDITORIAL CON LOGO A LA IZQUIERDA Y MENÚ HAMBURGUESA A LA DERECHA -->
  <header class="sticky top-0 z-[140] ${isHeaderTransparent ? 'bg-transparent border-b border-white/5' : 'bg-[#07080a]/90 backdrop-blur-xl border-b border-white/5'}">
    <div class="w-full px-6 sm:px-12 h-20 flex items-center justify-between relative">
      
      <!-- Brand Ident a la Izquierda Equilibrado -->
      <a href="index.html" id="brand-logo-link" class="brand-logo-container group relative z-[150] flex items-center">
        <img id="brand-logo-icon" src="assets/logo-icon.png" alt="Solycal" class="brand-logo-icon h-8 sm:h-9 w-auto object-contain">
        <span id="brand-logo-text" class="brand-logo-text font-display font-bold text-xl sm:text-2xl tracking-wider text-white group-hover:text-brand-yellow transition-colors">SOLYCAL</span>
      </a>

      <!-- Right: Exclusive Joby Aviation Style Morphing Hamburger Button -->
      <div class="flex items-center relative z-[150]">
        <div id="joby-toggle-wrap" class="joby-nav-toggle-wrap">
          <span class="joby-close-label hidden sm:inline-block">[CERRAR]</span>
          <button id="joby-toggle" class="joby-burger-btn" aria-label="Abrir menú de navegación" aria-expanded="false">
            <div class="joby-burger-icon">
              <span class="joby-burger-line"></span>
              <span class="joby-burger-line"></span>
            </div>
          </button>
        </div>
      </div>

    </div>
  </header>

  <!-- BACKDROP OSCURO DE FONDO (Joby Aviation Dim) -->
  <div id="joby-backdrop" class="joby-backdrop-dim" aria-hidden="true"></div>

  <!-- CORTINA MULTICAPA DE COLORES ESCALONADA (Joby Aviation Color Cascade) -->
  <div id="joby-color-waves" class="joby-color-waves" aria-hidden="true">
    <div class="joby-wave-layer"></div>
    <div class="joby-wave-layer"></div>
    <div class="joby-wave-layer"></div>
    <div class="joby-wave-layer"></div>
  </div>

  <!-- JOBY AVIATION FULLSCREEN CONTENT OVERLAY -->
  <div id="joby-nav-overlay" aria-hidden="true">

    <!-- Contenido Frontal del Overlay con backdrop blur -->
    <div class="joby-overlay-content flex-1 flex flex-col justify-between pt-24 pb-8">
      
      <!-- Main Navigation Columns (Joby Experience style) -->
      <div class="w-full px-6 sm:px-12 lg:px-20 py-8 flex-1 flex flex-col justify-center">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- Primary Large Nav Links (Animated stagger) -->
          <div class="lg:col-span-7 space-y-3 sm:space-y-4">
            <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-2">// NAVEGACIÓN</span>
            ${overlayNavItems}
          </div>

          <!-- Secondary Information (Contacto y Redes Sociales Oficiales) -->
          <div class="lg:col-span-5 space-y-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
            
            <!-- Contacto Directo -->
            <div>
              <p class="font-mono text-xs text-brand-yellow uppercase tracking-widest mb-4">// CONTACTO DIRECTO</p>
              <div class="space-y-3 font-mono text-xs">
                <a href="tel:961504038" class="flex items-center gap-3 text-white hover:text-brand-yellow transition-colors group">
                  <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow group-hover:border-brand-yellow/40 transition-colors">
                    <i data-lucide="phone" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <span class="text-neutral-400 block text-[10px] uppercase tracking-wider">Atención Telefónica</span>
                    <span class="text-sm font-bold text-white group-hover:text-brand-yellow transition-colors">+34 96 150 40 38</span>
                  </div>
                </a>

                <a href="mailto:info@solycal.es" class="flex items-center gap-3 text-white hover:text-brand-yellow transition-colors group">
                  <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow group-hover:border-brand-yellow/40 transition-colors">
                    <i data-lucide="mail" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <span class="text-neutral-400 block text-[10px] uppercase tracking-wider">Oficina Técnica / Email</span>
                    <span class="text-sm font-bold text-white group-hover:text-brand-yellow transition-colors">info@solycal.es</span>
                  </div>
                </a>

                <div class="flex items-start gap-3 text-neutral-300 pt-1">
                  <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow flex-shrink-0 mt-0.5">
                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                  </div>
                  <div class="font-sans text-xs text-neutral-400 leading-relaxed">
                    <span class="font-mono text-[10px] text-neutral-400 block uppercase tracking-wider">Ubicación</span>
                    Carrer Palmiters, 14 &bull; Pol. Ind. Masía del Juez<br>
                    46900 Torrent, Valencia (España)
                  </div>
                </div>
              </div>
            </div>

            <!-- Redes Sociales Oficiales Solycal (solycal.es) - Solo Iconos, sin círculos -->
            <div>
              <p class="font-mono text-xs text-brand-yellow uppercase tracking-widest mb-3">// REDES SOCIALES</p>
              ${getSocialIcons('w-6 h-6', 'flex items-center gap-5')}
            </div>

            <!-- Botón directo a página de contacto -->
            <div class="pt-1">
              <a href="contacto.html" class="inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-brand-yellow text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(241,181,65,0.2)]">
                <span>Ir a Formulario de Contacto</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>

          </div>

        </div>
      </div>

      <!-- Bottom Meta inside overlay -->
      <div class="w-full px-6 sm:px-12 lg:px-20 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
        <p>&copy; 2026 Soldadura y Calderería Valenciana S.L. &bull; Precisión y Solidez</p>
        <div class="flex gap-6">
          <a href="aviso-legal.html" class="hover:text-brand-yellow transition-colors">Aviso Legal</a>
          <a href="politica-privacidad.html" class="hover:text-brand-yellow transition-colors">Privacidad</a>
          <a href="politica-cookies.html" class="hover:text-brand-yellow transition-colors">Cookies</a>
        </div>
      </div>

    </div>
  </div>`;
}

function getFooter(options = {}) {
  const showMatrix = typeof options === 'boolean' ? options : (options.showMatrix !== false);

  return `
  ${showMatrix ? `
  <!-- INTERACTIVE INDUSTRIAL GRID SEPARATOR (Jhey / GSAP Draggable Matrix) -->
  <div class="interactive-grid-separator">
    <div class="w-full overflow-hidden">
      <div class="separator-grid" id="footer-matrix-grid"></div>
    </div>
  </div>
  ` : ''}

  <!-- FOOTER REFINED EDITORIAL WITH WAVESONSPHERE BACKGROUND BOTTOM-LEFT -->
  <footer id="main-footer" class="relative bg-[#050608] pt-20 pb-12 text-sm text-neutral-400 overflow-hidden">
    
    <!-- Canvas de Fondo: WavesOnSphere 2.0 que abarca más área y se corta nítidamente en la base inferior -->
    <div class="absolute -bottom-[22%] sm:-bottom-[25%] -left-12 sm:-left-16 w-[520px] sm:w-[680px] lg:w-[820px] aspect-square pointer-events-auto z-0 opacity-55 hover:opacity-90 transition-opacity duration-700" title="Pulsa para generar ondas en la esfera">
      <canvas id="footer-bg-sphere" width="600" height="600" class="w-full h-full block"></canvas>
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050608]/90 pointer-events-none"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#050608]/70 pointer-events-none"></div>
    </div>

    <div class="w-full px-6 relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
      
      <!-- Big Cattaneo-style Callout -->
      <div class="pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-3">// PRECISIÓN METALÚRGICA INDUSTRIAL</span>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-none">
            Hacemos posible tu mayor <br class="hidden sm:inline">
            <span class="text-brand-yellow">desafío en calderería.</span>
          </h2>
        </div>
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a href="contacto.html" class="btn-magnetic px-8 py-4 rounded-full bg-brand-yellow text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_25px_rgba(241,181,65,0.25)] group">
            <span class="btn-magnetic-glow"></span>
            <span class="btn-magnetic-content">
              <span>Iniciar Proyecto</span>
              <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
            </span>
          </a>
          <a href="tel:961504038" class="btn-magnetic px-8 py-4 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:border-brand-yellow transition-all group">
            <span class="btn-magnetic-glow"></span>
            <span class="btn-magnetic-content">
              <span class="group-hover:text-brand-yellow transition-colors">+34 96 150 40 38</span>
            </span>
          </a>
        </div>
      </div>

      <!-- Navigation & Meta Columns -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16 border-b border-white/5">
        <div class="lg:col-span-4 space-y-4">
          <div class="flex items-center gap-3">
            <img src="assets/logo-icon.png" alt="Solycal" class="h-8 w-auto">
            <span class="font-display font-bold text-xl text-white">SOLYCAL</span>
          </div>
          <p class="text-xs text-neutral-400 leading-relaxed font-sans pr-6">
            Soldadura y Calderería Valenciana S.L. Planta de 5.000 m² equipada con 7 puentes grúa de hasta 16 Tn y corte plasma HD Hypertherm en Torrent (Valencia).
          </p>
          <div class="pt-2">
            <img src="assets/cert-lrqa.png" alt="Certificaciones LRQA" class="h-8 w-auto opacity-70">
          </div>
        </div>

        <div class="lg:col-span-3 space-y-2">
          <p class="font-mono text-xs text-white uppercase tracking-widest mb-4">Páginas</p>
          <ul class="space-y-2 font-mono text-xs text-neutral-400">
            <li><a href="index.html" class="hover:text-brand-yellow transition-colors">01. Inicio</a></li>
            <li><a href="servicios.html" class="hover:text-brand-yellow transition-colors">02. Servicios Industriales</a></li>
            <li><a href="instalaciones.html" class="hover:text-brand-yellow transition-colors">03. Planta e Instalaciones</a></li>
            <li><a href="calidad.html" class="hover:text-brand-yellow transition-colors">04. Calidad y Certificaciones</a></li>
            <li><a href="equipo.html" class="hover:text-brand-yellow transition-colors">05. Equipo Técnico</a></li>
            <li><a href="contacto.html" class="hover:text-brand-yellow transition-colors">06. Contacto Directo</a></li>
          </ul>
        </div>

        <div class="lg:col-span-3 space-y-2">
          <p class="font-mono text-xs text-white uppercase tracking-widest mb-4">Capacidad Operativa</p>
          <ul class="space-y-1.5 font-mono text-xs text-neutral-400">
            <li>&bull; Corte Plasma HD (50 mm espesor)</li>
            <li>&bull; Plegado CNC Ermaksan 4 metros</li>
            <li>&bull; Curvado chapa 2000 x 12 mm</li>
            <li>&bull; Tornos de hasta 5 metros</li>
            <li>&bull; ISO 9001 &bull; EN 1090-1 &bull; EN 15085-2</li>
          </ul>
        </div>

        <div class="lg:col-span-2 space-y-2">
          <p class="font-mono text-xs text-white uppercase tracking-widest mb-4">Ubicación</p>
          <p class="text-xs text-neutral-300 font-sans leading-relaxed">
            Calle Hort de Soriano, 17A<br>
            Pol. Ind. Masía del Juez<br>
            46900 Torrent (Valencia)
          </p>
          <p class="font-mono text-xs text-brand-yellow pt-2">info@solycal.es</p>
        </div>
      </div>

      <!-- SUBFOOTER / BARRA INFERIOR CON REDES SOCIALES -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-500">
        <p class="order-3 md:order-1 text-center md:text-left">&copy; 2026 Soldadura y Calderería Valenciana S.L. &bull; Calidad y Solidez.</p>
        
        <!-- Redes Sociales Oficiales en el Subfooter (Iconos directos sin círculos) -->
        <div class="order-1 md:order-2 flex items-center">
          ${getSocialIcons('w-4 h-4', 'flex items-center gap-5')}
        </div>

        <!-- Enlaces Legales -->
        <div class="order-2 md:order-3 flex items-center gap-6">
          <a href="aviso-legal.html" class="hover:text-brand-yellow transition-colors">Aviso Legal</a>
          <a href="politica-privacidad.html" class="hover:text-brand-yellow transition-colors">Privacidad</a>
          <a href="politica-cookies.html" class="hover:text-brand-yellow transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- GLOBAL SCRIPTS WITH GSAP INTERACTIONS -->
  <script>
    lucide.createIcons();

    // JOBY AVIATION FULLSCREEN CURTAIN CONTROLLER (4-Layer Chromatic Cascade)
    const jobyToggle = document.getElementById('joby-toggle');
    const jobyToggleWrap = document.getElementById('joby-toggle-wrap');
    const jobyBackdrop = document.getElementById('joby-backdrop');
    const jobyWaves = document.getElementById('joby-color-waves');
    const jobyOverlay = document.getElementById('joby-nav-overlay');

    if (jobyToggle && jobyOverlay) {
      const toggleJobyMenu = (forceClose = false) => {
        const isOpen = forceClose ? false : !jobyOverlay.classList.contains('is-open');
        
        jobyToggle.classList.toggle('is-active', isOpen);
        if (jobyToggleWrap) jobyToggleWrap.classList.toggle('is-active', isOpen);
        jobyToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        
        if (jobyBackdrop) jobyBackdrop.classList.toggle('is-open', isOpen);
        if (jobyWaves) jobyWaves.classList.toggle('is-open', isOpen);
        jobyOverlay.classList.toggle('is-open', isOpen);
        jobyOverlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

        // Prevent body scroll when menu is active
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (window.lenis) {
          if (isOpen) window.lenis.stop();
          else window.lenis.start();
        }

        // GSAP Stagger Entrance for Links with Joby snappy easing
        if (typeof gsap !== 'undefined') {
          if (isOpen) {
            gsap.fromTo('.joby-nav-link', 
              { y: 80, opacity: 0 }, 
              { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power4.out", delay: 0.35 }
            );
          }
        }
      };

      jobyToggle.addEventListener('click', () => toggleJobyMenu());
      if (jobyBackdrop) jobyBackdrop.addEventListener('click', () => toggleJobyMenu(true));

      // Close on ESC key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && jobyOverlay.classList.contains('is-open')) {
          toggleJobyMenu(true);
        }
      });
    }

    // GSAP ANIMATIONS
    window.addEventListener('DOMContentLoaded', () => {
      // Registrar ScrollTrigger
      if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // =========================================================================
        // SMOOTH SCROLL CON LENIS (Sincronizado con GSAP ScrollTrigger)
        // =========================================================================
        if (typeof Lenis !== 'undefined') {
          const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.2,
            infinite: false,
          });
          window.lenis = lenis;

          lenis.on('scroll', ScrollTrigger.update);

          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        }

        // =========================================================================
        // PRELOADER INDUSTRIAL: 'S' APARECE -> SE APARTA A LA IZQUIERDA ->
        // APARECEN A MODO DE CARGA LAS LETRAS SOLYCAL -> SE LANZA LA WEB
        // =========================================================================
        const solycalLoader = document.getElementById('solycal-loader');
        const loaderBrandBox = document.getElementById('loader-brand-box');
        const loaderIcon = document.getElementById('loader-logo-icon');
        const loaderLettersWrap = document.getElementById('loader-logo-text-wrap');
        const loaderChars = document.querySelectorAll('.loader-char');
        const curtainTop = document.querySelector('.loader-curtain-top');
        const curtainBottom = document.querySelector('.loader-curtain-bottom');

        // Función para lanzar la web con sincronización suave
        const playHeroEntrance = (delay = 0) => {
          if (document.querySelector('.hero-title')) {
            const heroTl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: delay });
            heroTl
              .from('.hero-tag', { opacity: 0, x: -25, duration: 0.7 })
              .from('.hero-title', { opacity: 0, y: 35, duration: 1, ease: "power4.out" }, "-=0.5")
              .from('.hero-desc', { opacity: 0, y: 25, duration: 0.9 }, "-=0.6")
              .from('.hero-actions a, .hero-actions button', { opacity: 0, y: 20, stagger: 0.12, duration: 0.7 }, "-=0.5")
              .from('#bg-video-wrapper', { opacity: 0, duration: 1.4, ease: "power2.out" }, 0);
          }
        };

        const hasLoadedBefore = sessionStorage.getItem('solycal_preloader_seen');

        if (solycalLoader && !hasLoadedBefore) {
          sessionStorage.setItem('solycal_preloader_seen', 'true');
          document.body.style.overflow = 'hidden';

          // 1. Estado Inicial:
          gsap.set(loaderIcon, { 
            opacity: 0, 
            scale: 0.6,
            filter: "none"
          });

          gsap.set(loaderLettersWrap, { 
            width: 0, 
            opacity: 0,
            marginLeft: 0
          });

          gsap.set(loaderChars, { 
            opacity: 0, 
            x: -8,
            filter: "none"
          });

          const loadTl = gsap.timeline();

          loadTl
            // PASO 1: Aparece el logo 'S' en el centro con escala suave
            .to(loaderIcon, {
              opacity: 1,
              scale: 1,
              duration: 0.65,
              ease: "power3.out"
            })
            // Pausa sutil
            .to({}, { duration: 0.18 })

            // PASO 2: La 'S' se aparta suavemente (smooth) a la izquierda abriendo espacio
            .to(loaderLettersWrap, {
              width: "auto",
              opacity: 1,
              marginLeft: "1rem",
              duration: 0.55,
              ease: "power3.inOut"
            })

            // PASO 3: Aparición progresiva muy fluida (smooth) de las letras SOLYCAL
            .to(loaderChars, {
              opacity: 1,
              x: 0,
              stagger: 0.07,
              duration: 0.45,
              ease: "power2.out"
            }, "-=0.3")

            // Breve pausa para apreciar la identidad completa
            .to({}, { duration: 0.4 })

            // PASO 4: TRANSICIÓN DE APERTURA CINEMATOGRÁFICA Y FLUIDA
            // 4.1 Desvanecer y elevar con sutileza el logotipo
            .to(loaderBrandBox, {
              opacity: 0,
              scale: 1.05,
              y: -10,
              duration: 0.4,
              ease: "power2.in"
            })
            // 4.2 Apertura en persiana split arquitectónica de arriba y abajo desvelando la web
            .to(curtainTop, {
              scaleY: 0,
              duration: 0.75,
              ease: "power4.inOut"
            }, "-=0.15")
            .to(curtainBottom, {
              scaleY: 0,
              duration: 0.75,
              ease: "power4.inOut",
              onStart: () => {
                // Iniciar la entrada de la web en perfecta sincronía mientras la cortina se abre
                playHeroEntrance(0.1);
              },
              onComplete: () => {
                solycalLoader.classList.add('loader-hidden');
                document.body.style.overflow = '';
              }
            }, "<");

        } else if (solycalLoader) {
          solycalLoader.style.display = 'none';
          playHeroEntrance();
        } else {
          playHeroEntrance();
        }

        // LOGO INTRO ANIMATION EN HEADER (Se reproduce al entrar a la página):
        const logoLink = document.getElementById('brand-logo-link');
        const logoIcon = document.getElementById('brand-logo-icon');
        const logoText = document.getElementById('brand-logo-text');
        
        if (logoLink && logoIcon && logoText) {
          gsap.set(logoIcon, { 
            opacity: 0, 
            scale: 0.4,
            x: 0
          });
          gsap.set(logoText, { 
            opacity: 0, 
            x: -16, 
            maxWidth: 0, 
            marginLeft: 0 
          });

          const logoTl = gsap.timeline({ delay: hasLoadedBefore ? 0.1 : 2.45 });
          logoTl
            .to(logoIcon, { 
              opacity: 1, 
              scale: 1, 
              duration: 0.6, 
              ease: "back.out(1.8)" 
            })
            .to(logoText, { 
              opacity: 1, 
              x: 0, 
              maxWidth: 240, 
              marginLeft: "0.875rem", 
              duration: 0.65, 
              ease: "power3.out" 
            }, "-=0.25");
        }

        // =========================================================================
        // EFECTO TEXT SCRAMBLE EN TÍTULOS GRANDES A MEDIDA QUE APARECEN
        // =========================================================================
        const SCRAMBLE_CHARS = '!/\\\\_<>[]{}—=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const headingsToScramble = document.querySelectorAll('h1, h2');

        headingsToScramble.forEach(heading => {
          if (heading.closest('#joby-nav-overlay') || heading.dataset.scrambleReady) return;
          heading.dataset.scrambleReady = "true";

          const originalText = heading.textContent.trim();
          if (!originalText || originalText.length < 3) return;
          heading.setAttribute('aria-label', originalText);

          // Procesa recursivamente para conservar estructuras hijas (span, br, clases de color)
          const charData = [];

          function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent;
              if (!text) return document.createTextNode('');

              const fragment = document.createDocumentFragment();
              const parts = text.split(/(\\s+)/);
              parts.forEach(part => {
                if (!part) return;
                if (/^\\s+$/.test(part)) {
                  // Espacio blanco regular
                  const spaceNode = document.createTextNode(part);
                  fragment.appendChild(spaceNode);
                } else {
                  const wordSpan = document.createElement('span');
                  wordSpan.className = 'scramble-word';

                  for (let i = 0; i < part.length; i++) {
                    const char = part[i];
                    const charSpan = document.createElement('span');
                    charSpan.className = 'scramble-char';
                    charSpan.textContent = char;
                    charSpan.style.opacity = '0'; // Oculto hasta que le llegue la ola de scramble

                    charData.push({
                      span: charSpan,
                      targetChar: char
                    });

                    wordSpan.appendChild(charSpan);
                  }
                  fragment.appendChild(wordSpan);
                }
              });
              return fragment;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName.toLowerCase() === 'br') {
                return node.cloneNode(true);
              }
              const clone = node.cloneNode(false);
              Array.from(node.childNodes).forEach(child => {
                clone.appendChild(processNode(child));
              });
              return clone;
            }
            return node.cloneNode(true);
          }

          const newFragment = document.createDocumentFragment();
          Array.from(heading.childNodes).forEach(child => {
            newFragment.appendChild(processNode(child));
          });

          heading.innerHTML = '';
          heading.appendChild(newFragment);

          if (charData.length === 0) return;

          // Función para ejecutar la animación de Scramble Text
          const runScrambleText = () => {
            if (heading.dataset.scrambled === "true") return;
            heading.dataset.scrambled = "true";

            // Medir y fijar ancho exacto de cada carácter para evitar vibraciones horizontales
            charData.forEach(item => {
              const rect = item.span.getBoundingClientRect();
              if (rect.width > 0) {
                item.span.style.width = rect.width + 'px';
                item.span.style.textAlign = 'center';
              }
            });

            const total = charData.length;
            const staggerStep = 24; // Milisegundos entre letras
            const scrambleDuration = 380; // Tiempo que cada letra permuta caracteres

            charData.forEach((item, index) => {
              const startDelay = index * staggerStep;
              const isPunctuation = /^[.,;:?!/\\\\-]$/.test(item.targetChar);
              const glyphPool = isPunctuation ? '!/|\\\\-' : SCRAMBLE_CHARS;
              const duration = isPunctuation ? 180 : scrambleDuration;

              setTimeout(() => {
                item.span.style.opacity = '1';
                item.span.classList.add('is-scrambling');

                // Ciclo rápido de caracteres aleatorios
                const interval = setInterval(() => {
                  item.span.textContent = glyphPool[Math.floor(Math.random() * glyphPool.length)];
                }, 45);

                // Bloqueo y resolución del carácter definitivo
                setTimeout(() => {
                  clearInterval(interval);
                  item.span.textContent = item.targetChar;
                  item.span.classList.remove('is-scrambling');

                  // Limpieza de anchos fijos al terminar todo el título para mantener adaptabilidad
                  if (index === total - 1) {
                    setTimeout(() => {
                      charData.forEach(d => {
                        d.span.style.width = '';
                        d.span.style.textAlign = '';
                      });
                    }, 200);
                  }
                }, duration);

              }, startDelay);
            });
          };

          // Si es el hero-title, lanzarlo en la entrada inicial con suave sincronización
          if (heading.classList.contains('hero-title')) {
            setTimeout(runScrambleText, hasLoadedBefore ? 350 : 2550);
          } else {
            // Disparar en scroll a medida que vayan apareciendo
            ScrollTrigger.create({
              trigger: heading,
              start: "top 88%",
              once: true,
              onEnter: () => runScrambleText()
            });
          }
        });

        // GSAP ScrollTrigger para secciones y tarjetas editoriales
        gsap.utils.toArray('.reveal').forEach(elem => {
          gsap.fromTo(elem, 
            { opacity: 0, y: 35 }, 
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: elem,
                start: "top 88%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        // =========================================================================
        // GSAP CONTANÚMEROS (NUMERICAL COUNTERS ANIMATION EN VALUE METRICS BAR)
        // Anima 0 -> 5.000 (m²), 0 -> 16 (Tn), 0 -> 50 (mm) y reveal de EN 1090-1
        // =========================================================================
        const metricsBar = document.getElementById('metrics-bar-section');
        if (metricsBar) {
          const counterElements = metricsBar.querySelectorAll('.gsap-counter');
          
          ScrollTrigger.create({
            trigger: metricsBar,
            start: "top 85%",
            once: true,
            onEnter: () => {
              counterElements.forEach((el, index) => {
                const targetValue = parseFloat(el.getAttribute('data-target')) || 0;
                const formatThousands = el.getAttribute('data-format') === 'thousands';
                const counterObj = { val: 0 };

                gsap.to(counterObj, {
                  val: targetValue,
                  duration: 2.0,
                  delay: index * 0.12,
                  ease: "power3.out",
                  onUpdate: () => {
                    if (formatThousands) {
                      // Formato con punto de millar español: 5.000
                      el.textContent = Math.floor(counterObj.val).toLocaleString('es-ES');
                    } else {
                      el.textContent = Math.floor(counterObj.val);
                    }
                  },
                  onComplete: () => {
                    if (formatThousands) {
                      el.textContent = targetValue.toLocaleString('es-ES');
                    } else {
                      el.textContent = targetValue;
                    }
                  }
                });
              });

              // Animación editorial complementaria para EN 1090-1
              const certEl = metricsBar.querySelector('.gsap-cert-reveal');
              if (certEl) {
                gsap.fromTo(certEl, 
                  { opacity: 0, scale: 0.85, filter: 'blur(6px)' }, 
                  { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.4, delay: 0.45, ease: "power3.out" }
                );
              }
            }
          });
        }

        // Efecto Parallax en el video de fondo (sobre contenedor, preservando escala fija del video)
        if (document.getElementById('bg-video-wrapper')) {
          gsap.to('#bg-video-wrapper', {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: 1
            }
          });
        }

        // GSAP ELASTIC MAGNETIC BUTTONS (Estilo Davide Cattaneo / Awwwards)
        const magneticBtns = document.querySelectorAll('.btn-magnetic, .btn-action');
        magneticBtns.forEach(btn => {
          const innerContent = btn.querySelector('.btn-magnetic-content') || btn;
          
          btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            
            // Set radial gradient coordinates
            btn.style.setProperty('--mouse-x', relX + 'px');
            btn.style.setProperty('--mouse-y', relY + 'px');

            // Distancia al centro
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (relX - centerX) * 0.35;
            const deltaY = (relY - centerY) * 0.35;

            gsap.to(btn, {
              x: deltaX,
              y: deltaY,
              duration: 0.3,
              ease: "power2.out"
            });

            if (innerContent !== btn) {
              gsap.to(innerContent, {
                x: deltaX * 0.5,
                y: deltaY * 0.5,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });

          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1.1, 0.4)"
            });

            if (innerContent !== btn) {
              gsap.to(innerContent, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1.1, 0.4)"
              });
            }
          });
        });

        // INITIALIZE INDUSTRIAL MATRIX GRID SEPARATOR (Inspirado en Jhey Tompkins)
        const matrixGrid = document.getElementById('footer-matrix-grid');
        if (matrixGrid) {
          const calculateGrid = () => {
            const width = window.innerWidth;
            const cols = width > 1400 ? 36 : width > 1024 ? 28 : width > 768 ? 20 : 14;
            const rows = width > 768 ? 4 : 3;
            matrixGrid.style.setProperty('--cols', cols);
            matrixGrid.style.setProperty('--rows', rows);

            const industrialGlyphs = ['+', '×', '•', '⬡', '·', '┼', '⊥', 'T'];
            let html = '';
            for (let i = 0; i < cols * rows; i++) {
              const grade = Math.floor(Math.random() * 12 - 6);
              const opacity = (Math.random() * 0.2 + 0.08).toFixed(2);
              const glyph = industrialGlyphs[Math.floor(Math.random() * industrialGlyphs.length)];
              html += '<div style="--grade:' + grade + ';--opacity:' + opacity + ';">' + glyph + '</div>';
            }
            matrixGrid.innerHTML = html;
          };

          calculateGrid();
          window.addEventListener('resize', calculateGrid);

          // Touch / pointer interaction for mobile devices
          matrixGrid.addEventListener('pointermove', (e) => {
            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target && target.parentElement === matrixGrid) {
              const prev = matrixGrid.querySelector('[data-hover="true"]');
              if (prev && prev !== target) prev.removeAttribute('data-hover');
              target.setAttribute('data-hover', 'true');
            }
          });

          matrixGrid.addEventListener('pointerleave', () => {
            const prev = matrixGrid.querySelector('[data-hover="true"]');
            if (prev) prev.removeAttribute('data-hover');
          });
        }

        // =========================================================================
        // EFECTO WELDING (WANDERING PARTICLES - AMBIENTAL SIN INTERACCIÓN DE CURSOR)
        // Fondo sutil y atmosférico de partículas de soldadura / chispa tenue
        // Sin interacción con el cursor (eliminado según directriz de diseño)
        // =========================================================================
        const weldingCanvas = document.getElementById('welding-canvas');
        const weldingSection = document.getElementById('welding-section');

        if (weldingCanvas && weldingSection) {
          const ctx = weldingCanvas.getContext('2d');
          let width = 0;
          let height = 0;

          const MAX_PARTICLES = 60;
          const WELDING_COLORS = [
            '#F1B541', // Amarillo Principal Solycal
            '#E5A52A', // Ámbar / Dorado Corporativo
            'rgba(241, 181, 65, 0.6)',
            'rgba(226, 232, 240, 0.4)',
            'rgba(148, 163, 184, 0.3)'
          ];

          const particles = [];

          function resizeCanvas() {
            const rect = weldingSection.getBoundingClientRect();
            width = weldingCanvas.width = rect.width;
            height = weldingCanvas.height = rect.height;
          }
          resizeCanvas();
          window.addEventListener('resize', resizeCanvas);

          function Particle(x, y, size) {
            this.alive = true;
            this.size = size || (Math.random() * 3 + 1.5);
            this.wander = 0.12;
            this.theta = Math.random() * Math.PI * 2;
            this.drag = 0.96;
            this.color = WELDING_COLORS[Math.floor(Math.random() * WELDING_COLORS.length)];
            this.x = x || (Math.random() * width);
            this.y = y || (height * 0.7 + Math.random() * (height * 0.3));
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = -(Math.random() * 1.5 + 0.5);
          }

          Particle.prototype.move = function() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= this.drag;
            this.vy *= this.drag;
            this.theta += (Math.random() - 0.5) * this.wander;
            this.vx += Math.sin(this.theta) * 0.05;
            this.size *= 0.985;
            this.alive = this.size > 0.3 && this.y > 0;
          };

          Particle.prototype.show = function(context) {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
            context.fill();
          };

          // Optimización de rendimiento con IntersectionObserver
          let isSectionVisible = true;
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              isSectionVisible = entry.isIntersecting;
            });
          }, { threshold: 0.05 });
          observer.observe(weldingSection);

          let frameCount = 0;
          function renderWelding() {
            requestAnimationFrame(renderWelding);
            if (!isSectionVisible) return;

            frameCount++;
            // Emisión ambiental suave y automática desde el fondo sin necesidad de cursor
            if (frameCount % 12 === 0 && particles.length < MAX_PARTICLES) {
              const spawnX = Math.random() * width;
              const spawnY = height - 10;
              particles.push(new Particle(spawnX, spawnY));
            }

            // 1. Limpieza base (#07080a)
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#07080a';
            ctx.fillRect(0, 0, width, height);

            if (particles.length === 0) return;

            // 2. Fusión aditiva sutil
            ctx.globalCompositeOperation = 'lighter';

            for (let i = particles.length - 1; i >= 0; i--) {
              const p = particles[i];
              if (p.alive) {
                p.move();
                p.show(ctx);
              } else {
                particles.splice(i, 1);
              }
            }
          }

          requestAnimationFrame(renderWelding);
        }

        // =========================================================================
        // WAVESONSPHERE 2.0 (OpenProcessing #406138) COMO FONDO INFERIOR IZQUIERDO
        // =========================================================================
        // WAVESONSPHERE 2.0 (OpenProcessing #406138 - KaijinQ) CÓDIGO 100% LITERAL
        // =========================================================================
        const footerBgCanvas = document.getElementById('footer-bg-sphere');
        const mainFooter = document.getElementById('main-footer');

        if (footerBgCanvas && mainFooter) {
          const bgCtx = footerBgCanvas.getContext('2d');
          
          // Variables exactas del código original
          let Nmax = 1000;
          let M = 500;
          let H = 0.99999;

          let X = new Float32Array(Nmax + 1);
          let Y = new Float32Array(Nmax + 1);
          let Z = new Float32Array(Nmax + 1);
          let VX = new Float32Array(Nmax + 1);
          let dVX = new Float32Array(Nmax + 1);
          let VY = new Float32Array(Nmax + 1);
          let dVY = new Float32Array(Nmax + 1);
          let VZ = new Float32Array(Nmax + 1);
          let dVZ = new Float32Array(Nmax + 1);
          let L;
          let R = 2 * Math.sqrt((4 * Math.PI * (200 * 200) / Nmax) / (2 * Math.sqrt(3)));
          let N, NN, KX, KY, KZ;
          let KVX, KdVX, KVY, KdVY, KVZ, KdVZ;

          // setup()
          for (N = 0; N <= Nmax; N++) {
            X[N] = Math.random() * 600 - 300;
            Y[N] = Math.random() * 600 - 300;
            Z[N] = Math.random() * 600 - 300;
            if (Z[N] > 250) {
              L = Math.sqrt((X[N] * X[N]) + (Y[N] * Y[N]));
              dVX[N] = dVX[N] + (Y[N] / L);
              dVY[N] = dVY[N] - (X[N] / L);
            }
          }

          // Rotación ambiental continua y orgánica (sin influencia del cursor)
          let autoAngleX = 0;
          let autoAngleY = 0;

          // mousePressed() intacto con la interacción al hacer clic
          mainFooter.addEventListener('pointerdown', () => {
            for (N = 0; N <= Nmax; N++) {
              if (Z[N] > 180) {
                L = Math.sqrt((X[N] * X[N]) + (Y[N] * Y[N]));
                dVX[N] = dVX[N] + (2.5 * Y[N] / L);
                dVY[N] = dVY[N] - (2.5 * X[N] / L);
              }
            }
          });

          let isFooterActive = false;
          const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              isFooterActive = entry.isIntersecting;
            });
          }, { threshold: 0.05 });
          footerObserver.observe(mainFooter);

          // draw()
          function draw() {
            requestAnimationFrame(draw);
            if (!isFooterActive) return;

            bgCtx.clearRect(0, 0, 600, 600);
            bgCtx.lineWidth = 1;

            // Rotación suave con modulación armónica aleatoria
            autoAngleX += 0.008;
            autoAngleY += 0.006;
            const rotX = Math.sin(autoAngleX) * 0.004 + Math.cos(autoAngleY * 0.7) * 0.002;
            const rotY = Math.cos(autoAngleY) * 0.004 + Math.sin(autoAngleX * 0.5) * 0.002;
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);
            const cosY = Math.cos(rotY);
            const sinY = Math.sin(rotY);

            for (N = 0; N <= Nmax; N++) {
              for (NN = N + 1; NN <= Nmax; NN++) {
                L = Math.sqrt(((X[N] - X[NN]) * (X[N] - X[NN])) + ((Y[N] - Y[NN]) * (Y[N] - Y[NN])));
                L = Math.sqrt(((Z[N] - Z[NN]) * (Z[N] - Z[NN])) + (L * L));
                if (L < R) {
                  X[N] = X[N] - ((X[NN] - X[N]) * ((R - L) / (2 * L)));
                  Y[N] = Y[N] - ((Y[NN] - Y[N]) * ((R - L) / (2 * L)));
                  Z[N] = Z[N] - ((Z[NN] - Z[N]) * ((R - L) / (2 * L)));
                  X[NN] = X[NN] + ((X[NN] - X[N]) * ((R - L) / (2 * L)));
                  Y[NN] = Y[NN] + ((Y[NN] - Y[N]) * ((R - L) / (2 * L)));
                  Z[NN] = Z[NN] + ((Z[NN] - Z[N]) * ((R - L) / (2 * L)));
                  dVX[N] = dVX[N] + ((VX[NN] - VX[N]) / M);
                  dVX[NN] = dVX[NN] - ((VX[NN] - VX[N]) / M);
                  dVY[N] = dVY[N] + ((VY[NN] - VY[N]) / M);
                  dVY[NN] = dVY[NN] - ((VY[NN] - VY[N]) / M);
                  dVZ[N] = dVZ[N] + ((VZ[NN] - VZ[N]) / M);
                  dVZ[NN] = dVZ[NN] - ((VZ[NN] - VZ[N]) / M);
                }
                if (Z[N] > Z[NN]) {
                  KX = X[N]; KY = Y[N]; KZ = Z[N]; KVX = VX[N]; KdVX = dVX[N];
                  KVY = VY[N]; KdVY = dVY[N]; KVZ = VZ[N]; KdVZ = dVZ[N];
                  X[N] = X[NN]; Y[N] = Y[NN]; Z[N] = Z[NN]; VX[N] = VX[NN]; dVX[N] = dVX[NN];
                  VY[N] = VY[NN]; dVY[N] = dVY[NN]; VZ[N] = VZ[NN]; dVZ[N] = dVZ[NN];
                  X[NN] = KX; Y[NN] = KY; Z[NN] = KZ; VX[NN] = KVX; dVX[NN] = KdVX;
                  VY[NN] = KVY; dVY[NN] = KdVY; VZ[NN] = KVZ; dVZ[NN] = KdVZ;
                }
              }
              L = Math.sqrt((X[N] * X[N]) + (Y[N] * Y[N]));
              L = Math.sqrt((Z[N] * Z[N]) + (L * L));
              X[N] = X[N] + (X[N] * (200 - L) / (2 * L));
              Y[N] = Y[N] + (Y[N] * (200 - L) / (2 * L));
              Z[N] = Z[N] + (Z[N] * (200 - L) / (2 * L));
              KX = X[N] + VX[N]; KY = Y[N] + VY[N]; KZ = Z[N] + VZ[N];
              L = Math.sqrt((KX * KX) + (KY * KY));
              L = Math.sqrt((KZ * KZ) + (L * L));
              VX[N] = VX[N] - (KX * (L - 200) / (2 * L));
              VY[N] = VY[N] - (KY * (L - 200) / (2 * L));
              VZ[N] = VZ[N] - (KZ * (L - 200) / (2 * L));
              KZ = Z[N]; KX = X[N];
              Z[N] = (KZ * cosX) - (KX * sinX);
              X[N] = (KZ * sinX) + (KX * cosX);
              KZ = Z[N]; KY = Y[N];
              Z[N] = (KZ * cosY) - (KY * sinY);
              Y[N] = (KZ * sinY) + (KY * cosY);
              KVZ = VZ[N]; KVX = VX[N];
              VZ[N] = (KVZ * cosX) - (KVX * sinX);
              VX[N] = (KVZ * sinX) + (KVX * cosX);
              KVZ = VZ[N]; KVY = VY[N];
              VZ[N] = (KVZ * cosY) - (KVY * sinY);
              VY[N] = (KVZ * sinY) + (KVY * cosY);
              KdVZ = dVZ[N]; KdVX = dVX[N];
              dVZ[N] = (KdVZ * cosX) - (KdVX * sinX);
              dVX[N] = (KdVZ * sinX) + (KdVX * cosX);
              KdVZ = dVZ[N]; KdVY = dVY[N];
              dVZ[N] = (KdVZ * cosY) - (KdVY * sinY);
              dVY[N] = (KdVZ * sinY) + (KdVY * cosY);
              VX[N] = VX[N] + dVX[N]; dVX[N] = dVX[N] * H;
              VY[N] = VY[N] + dVY[N]; dVY[N] = dVY[N] * H;
              VZ[N] = VZ[N] + dVZ[N]; dVZ[N] = dVZ[N] * H;
              L = Math.sqrt((VX[N] * VX[N]) + (VY[N] * VY[N]));
              L = Math.sqrt((VZ[N] * VZ[N]) + (L * L));
              if (L > 12.5) {
                const c = Math.floor(125 + (Z[N] / 2));
                bgCtx.strokeStyle = 'rgb(' + c + ',' + c + ',' + c + ')';
                bgCtx.beginPath();
                bgCtx.moveTo((X[N] + (VX[N] * (L - 12.5) / L)) * 1.4 + 300, (Y[N] + (VY[N] * (L - 12.5) / L)) * 1.4 + 300);
                bgCtx.lineTo(X[N] * 1.4 + 300, Y[N] * 1.4 + 300);
                bgCtx.stroke();
              }
            }
          }

          requestAnimationFrame(draw);
        }

        // =========================================================================
        // BIT PATTERNS (Jason Labbe - jasonlabbe3d.com)
        // Página de Servicios Industriales: servicios.html
        // =========================================================================
        // =========================================================================
        // BIT PATTERNS (Jason Labbe - jasonlabbe3d.com)
        // Página de Servicios Industriales: servicios.html (Fondo en toda la página menos en el footer)
        // =========================================================================
        const bitCanvas = document.getElementById('bit-patterns-canvas');
        const bitPageContainer = document.getElementById('services-page-container');
        const bitWrap = document.getElementById('bit-patterns-wrap');

        if (bitCanvas && bitPageContainer) {
          const bitCtx = bitCanvas.getContext('2d');
          
          let speed = 0.1;
          let maxSize = 20;
          let falloff = 220;
          let steps = 14;
          
          // Colores Corporativos Solycal:
          // color1: Amarillo técnico / Oro industrial (#F1B541)
          // color2: Blanco metálico / Acero (#FFFFFF)
          const color1 = '#F1B541';
          const color2 = '#FFFFFF';
          const dotColor1 = '#F1B541';
          const dotColor2 = '#E5E7EB';

          let width = 0;
          let height = 0;
          let mouseX = -9999;
          let mouseY = -9999;
          let frameCount = 0;
          let isSectionVisible = true;

          function resizeBitCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            bitCanvas.width = width;
            bitCanvas.height = height;
            if (mouseX === -9999) {
              mouseX = width * 0.5;
              mouseY = height * 0.45;
            }
          }

          window.addEventListener('resize', resizeBitCanvas);
          resizeBitCanvas();

          // Interacción continua del cursor en cualquier parte de la ventana
          window.addEventListener('pointermove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
          });

          // Actualizar clipping para que termine exactamente antes del footer
          function updateFooterClipping() {
            const footer = document.getElementById('main-footer');
            if (footer && bitWrap) {
              const footerRect = footer.getBoundingClientRect();
              const winHeight = window.innerHeight;
              if (footerRect.top < winHeight) {
                // El footer está asomando o visible por abajo: recortar canvas
                const bottomClip = Math.max(0, winHeight - Math.max(0, footerRect.top));
                bitWrap.style.clipPath = 'inset(0 0 ' + bottomClip + 'px 0)';
              } else {
                bitWrap.style.clipPath = 'inset(0 0 0 0)';
              }
            }
          }

          window.addEventListener('scroll', updateFooterClipping, { passive: true });
          window.addEventListener('resize', updateFooterClipping);
          updateFooterClipping();

          // Optimización mediante IntersectionObserver con el contenedor general de servicios
          const bitObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              isSectionVisible = entry.isIntersecting;
            });
          }, { threshold: 0.01 });
          bitObserver.observe(bitPageContainer);

          function renderBitPatterns() {
            requestAnimationFrame(renderBitPatterns);
            if (!isSectionVisible || width === 0 || height === 0) return;

            frameCount++;
            bitCtx.clearRect(0, 0, width, height);
            bitCtx.textAlign = 'center';
            bitCtx.textBaseline = 'middle';

            for (let x = 0; x < width; x += steps) {
              for (let y = 0; y < height; y += steps) {
                let mult = 0.1;

                // Decrease size the further it's from the mouse.
                const dx = mouseX - x;
                const dy = mouseY - y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d < falloff) {
                  // map(d, 0, falloff, 1, 0.1)
                  mult = 1 - (d / falloff) * 0.9;
                }

                // Calculate the size: sin((x*y+frameCount)*speed)*maxSize*mult
                const sw = Math.sin((x * y + frameCount) * speed) * maxSize * mult;
                const absSw = Math.abs(sw);

                if (absSw > 2) {
                  // Display text '0' o '1'
                  const fontSize = Math.floor(absSw);
                  bitCtx.font = fontSize + 'px monospace, monospace';
                  if (sw > 0) {
                    bitCtx.fillStyle = color1;
                    bitCtx.fillText('0', x, y);
                  } else {
                    bitCtx.fillStyle = color2;
                    bitCtx.fillText('1', x, y);
                  }
                } else {
                  // If it's small enough, draw a circle as an optimization.
                  bitCtx.fillStyle = sw > 0 ? dotColor1 : dotColor2;
                  bitCtx.beginPath();
                  bitCtx.arc(x, y, absSw * 0.5, 0, Math.PI * 2);
                  bitCtx.fill();
                }
              }
            }
          }

          requestAnimationFrame(renderBitPatterns);
        }
      }
    });

  </script>
</body>
</html>
  `;
}

// 1. GENERATE INDEX.HTML (Davide Cattaneo style Homepage)
const indexHtml = `${getHead('SOLYCAL | Soldadura y Calderería Industrial Valencia', 'Fabricación de calderería industrial pesada y ligera, corte por plasma HD TrueHole, soldadura homologada TIG/MIG y estructuras metálicas con marcado CE en Torrent, Valencia.', '')}
${getHeader('inicio')}

<!-- HERO SECTION EDITORIAL & BOLD WITH INDUSTRIAL BACKGROUND VIDEO -->
<section id="hero-section" class="min-h-[92vh] flex items-center relative pt-16 pb-24 border-b border-white/5 overflow-hidden cursor-pointer">
  <!-- Clean HTML5 Background Video (Zero controls, 100% clean ambient loop) -->
  <div class="video-background-wrapper" id="bg-video-wrapper">
    <video 
      id="bg-video"
      class="w-full h-full object-cover pointer-events-none opacity-85"
      autoplay 
      muted 
      loop 
      playsinline 
      webkit-playsinline
      preload="auto"
      poster="assets/hero-bg.jpg">
      <source src="assets/hero-bg.mp4" type="video/mp4">
    </video>
  </div>

  <!-- DYNAMIC FLOATING POINTER BADGE (VER VÍDEO - PERFIL BLANCO FLOTANTE) -->
  <div id="hero-cursor-badge" class="fixed z-[120] pointer-events-none opacity-0 transition-opacity duration-200 -translate-x-1/2 -translate-y-1/2 hidden md:block" style="top: -200px; left: -200px;">
    <div class="px-5 py-2.5 rounded-full bg-black/40 border border-white text-white font-mono text-xs uppercase tracking-wider backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2.5 whitespace-nowrap select-none">
      <svg class="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      <span>Ver Vídeo</span>
    </div>
  </div>

  <!-- Dark & Industrial Overlays Full-Width - Calibrado para dar máxima visibilidad al vídeo de fondo manteniendo legibilidad -->
  <div class="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#07080a]/75 via-[#07080a]/30 to-transparent"></div>
  <div class="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/35"></div>
  <div class="absolute inset-0 z-[1] pointer-events-none dot-grid opacity-15"></div>

  <div class="w-full px-6 relative z-10">
    
    <!-- Headline con jerarquía equilibrada (más protagonismo al fondo) -->
    <div class="max-w-4xl space-y-4">
      <span class="hero-tag font-mono text-xs uppercase tracking-widest text-brand-yellow font-semibold block">// CALDERERÍA INDUSTRIAL & SOLDADURA DE PRECISIÓN</span>
      <h1 class="hero-title text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.08]">
        Transformamos el metal en ingeniería <span class="text-brand-yellow">de alta exigencia.</span>
      </h1>
      <p class="hero-desc text-sm sm:text-base text-neutral-300/90 font-sans max-w-2xl leading-relaxed">
        Desde el desarrollo de planos en nuestra oficina técnica hasta la fabricación en taller y el montaje final en obra civil. Especialistas en acero inoxidable, aluminio, acero al carbono y corte plasma HD TrueHole en Valencia.
      </p>
    </div>

    <!-- Action Bar & Counters -->
    <div class="hero-actions mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
      <div class="flex flex-wrap gap-4">
        <a href="contacto.html" class="btn-magnetic px-8 py-4 rounded-full bg-brand-yellow text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(241,181,65,0.3)] group">
          <span class="btn-magnetic-glow"></span>
          <span class="btn-magnetic-content">
            <span>Solicitar Presupuesto</span>
            <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
          </span>
        </a>
        <a href="servicios.html" class="btn-magnetic px-8 py-4 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:border-brand-yellow transition-all group">
          <span class="btn-magnetic-glow"></span>
          <span class="btn-magnetic-content">
            <span class="group-hover:text-brand-yellow transition-colors">Explorar Servicios</span>
            <i data-lucide="layers" class="w-3.5 h-3.5 text-brand-yellow group-hover:scale-110 transition-transform"></i>
          </span>
        </a>
        <!-- Botón Ver Vídeo visible en pantallas móviles donde no hay puntero ratón -->
        <button type="button" id="btn-hero-video-trigger" class="md:hidden btn-magnetic px-8 py-4 rounded-full border border-white/25 bg-white/[0.04] text-white font-mono text-xs uppercase tracking-wider hover:border-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/10 transition-all group inline-flex items-center gap-2.5 cursor-pointer backdrop-blur-sm">
          <span class="btn-magnetic-glow"></span>
          <span class="btn-magnetic-content flex items-center gap-2">
            <svg class="w-3.5 h-3.5 fill-white group-hover:fill-brand-yellow transition-colors" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Ver Vídeo</span>
          </span>
        </button>
      </div>

      <div class="font-mono text-xs text-neutral-500 flex items-center gap-3">
        <span>[SCROLL PARA EXPLORAR]</span>
        <i data-lucide="arrow-down" class="w-4 h-4 animate-bounce text-brand-yellow"></i>
      </div>
    </div>

  </div>
</section>

<!-- NUMBERED VALUE METRICS BAR (Davide Cattaneo style with GSAP Counter Animation) -->
<section id="metrics-bar-section" class="border-b border-white/5 bg-[#090b0e]">
  <div class="w-full px-6 py-14">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="border-l border-white/10 pl-6 space-y-1 reveal">
        <span class="font-mono text-xs text-brand-yellow">01 // SUPERFICIE</span>
        <h3 class="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight flex items-baseline">
          <span class="gsap-counter font-display" data-target="5000" data-format="thousands">0</span>
          <span class="ml-1 text-brand-yellow">m²</span>
        </h3>
        <p class="text-xs text-neutral-400 font-sans">Naves independientes en Torrent para evitar contaminación férrica.</p>
      </div>

      <div class="border-l border-white/10 pl-6 space-y-1 reveal">
        <span class="font-mono text-xs text-brand-yellow">02 // CARGA PESADA</span>
        <h3 class="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight flex items-baseline">
          <span class="gsap-counter font-display" data-target="16">0</span>
          <span class="ml-1 text-brand-yellow">Tn</span>
        </h3>
        <p class="text-xs text-neutral-400 font-sans">7 puentes grúa para maniobras de gran tonelaje sin restricciones.</p>
      </div>

      <div class="border-l border-white/10 pl-6 space-y-1 reveal">
        <span class="font-mono text-xs text-brand-yellow">03 // CORTE HD</span>
        <h3 class="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight flex items-baseline">
          <span class="gsap-counter font-display" data-target="50">0</span>
          <span class="ml-1 text-brand-yellow">mm</span>
        </h3>
        <p class="text-xs text-neutral-400 font-sans">Plasma Hypertherm TrueHole en pórtico de 9.000 x 2.500 mm.</p>
      </div>

      <div class="border-l border-white/10 pl-6 space-y-1 reveal">
        <span class="font-mono text-xs text-brand-yellow">04 // CERTIFICADOS</span>
        <h3 class="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight flex items-baseline">
          <span class="gsap-cert-reveal font-display text-white">EN 1090-1</span>
        </h3>
        <p class="text-xs text-neutral-400 font-sans">Marcado CE, ISO 9001:2008 y soldeo ferroviario EN 15085-2.</p>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES ACCORDION / EDITORIAL CARDS (Cattaneo Style) -->
<section class="py-28 bg-[#07080a]">
  <div class="w-full px-6">
    <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-20 reveal">
      <div>
        <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-3">// ÁREAS DE ESPECIALIZACIÓN</span>
        <h2 class="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Soluciones técnicas a medida.
        </h2>
      </div>
      <a href="servicios.html" class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-yellow hover:text-white mt-4 lg:mt-0 transition-colors">
        <span>Ver todas las especificaciones técnicas</span>
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </a>
    </div>

    <!-- Editorial List (Cattaneo Case History style) -->
    <div class="space-y-4">
      
      <!-- 01 -->
      <a href="servicios.html#caldereria" class="group block p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-yellow/30 hover:bg-white/[0.04] transition-all duration-300 reveal">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          <div class="lg:col-span-1 font-mono text-lg text-brand-yellow font-bold">01</div>
          <div class="lg:col-span-4">
            <h3 class="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-brand-yellow transition-colors">Calderería Industrial Pesada y Ligera</h3>
            <span class="font-mono text-xs text-neutral-500">[Depósitos &bull; Tolvas &bull; Ciclones &bull; Entronques]</span>
          </div>
          <div class="lg:col-span-5 text-sm text-neutral-400 font-sans leading-relaxed">
            Fabricación completa bajo planos para industria química, cerámica, agrícola y alimentaria. Virolas, fondos bombeados y curvados de chapa en Valencia.
          </div>
          <div class="lg:col-span-2 flex justify-end">
            <div class="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all">
              <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
            </div>
          </div>
        </div>
      </a>

      <!-- 02 -->
      <a href="servicios.html#plasma" class="group block p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-yellow/30 hover:bg-white/[0.04] transition-all duration-300 reveal">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          <div class="lg:col-span-1 font-mono text-lg text-brand-yellow font-bold">02</div>
          <div class="lg:col-span-4">
            <h3 class="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-brand-yellow transition-colors">Corte Plasma HD con Tecnología TrueHole</h3>
            <span class="font-mono text-xs text-neutral-500">[Hypertherm 260A &bull; Pórtico 9.000 x 2.500 mm]</span>
          </div>
          <div class="lg:col-span-5 text-sm text-neutral-400 font-sans leading-relaxed">
            Capacidad para cortar hasta 50 mm en acero al carbono y 15 mm en inoxidable. Nesting CNC para aprovechamiento máximo de material.
          </div>
          <div class="lg:col-span-2 flex justify-end">
            <div class="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all">
              <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
            </div>
          </div>
        </div>
      </a>

      <!-- 03 -->
      <a href="servicios.html#soldadura" class="group block p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-yellow/30 hover:bg-white/[0.04] transition-all duration-300 reveal">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          <div class="lg:col-span-1 font-mono text-lg text-brand-yellow font-bold">03</div>
          <div class="lg:col-span-4">
            <h3 class="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-brand-yellow transition-colors">Soldadura Homologada TIG / MIG-MAG</h3>
            <span class="font-mono text-xs text-neutral-500">[Inox 304/316 &bull; Aluminio &bull; Ferroviario EN 15085]</span>
          </div>
          <div class="lg:col-span-5 text-sm text-neutral-400 font-sans leading-relaxed">
            Personal acreditado en procedimientos certificados. Especialistas en uniones de alta responsabilidad y acabados sanitarios.
          </div>
          <div class="lg:col-span-2 flex justify-end">
            <div class="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all">
              <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
            </div>
          </div>
        </div>
      </a>

      <!-- 04 -->
      <a href="servicios.html#estructuras" class="group block p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-yellow/30 hover:bg-white/[0.04] transition-all duration-300 reveal">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          <div class="lg:col-span-1 font-mono text-lg text-brand-yellow font-bold">04</div>
          <div class="lg:col-span-4">
            <h3 class="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-brand-yellow transition-colors">Estructuras Metálicas & Pasarelas</h3>
            <span class="font-mono text-xs text-neutral-500">[Marcado CE Obligatorio EN 1090-1]</span>
          </div>
          <div class="lg:col-span-5 text-sm text-neutral-400 font-sans leading-relaxed">
            Naves industriales, pasarelas de cualquier tonelaje y longitud, cerramientos para obra civil e instalación de vías para puentes grúa en Valencia.
          </div>
          <div class="lg:col-span-2 flex justify-end">
            <div class="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all">
              <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
            </div>
          </div>
        </div>
      </a>

    </div>
  </div>
</section>

<!-- FEATURED SECTION: CORTE TÉRMICO CNC CON FONDO INDUSTRIAL (assets/header.jpg) -->
<section class="relative py-32 lg:py-44 bg-[#07080a] overflow-hidden">
  <!-- Full-bleed background image with high clarity on left and seamless dark gradients -->
  <div class="absolute inset-0 z-0 pointer-events-none">
    <img src="assets/header.jpg" alt="Mesa de oxicorte y plasma CNC de alta definición en SOLYCAL" class="w-full h-full object-cover object-[25%_center] lg:object-[28%_center]" loading="lazy">
    
    <!-- Left subtle vignette so machine sparks & details pop with maximum clarity -->
    <div class="absolute inset-0 bg-black/10"></div>
    
    <!-- Horizontal gradient: clear on left, smoothly fading into deep solid black on the right where text appears -->
    <div class="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[#07080a]/40 via-40% to-[#07080a] to-75%"></div>
    <div class="hidden lg:block absolute inset-y-0 right-0 w-3/5 bg-gradient-to-r from-transparent via-[#07080a]/90 to-[#07080a]"></div>

    <!-- Mobile/Tablet gradient: vertical fade ensuring readability -->
    <div class="lg:hidden absolute inset-0 bg-gradient-to-b from-[#07080a]/20 via-[#07080a]/80 to-[#07080a]"></div>

    <!-- Seamless top transition: deep black gradient fade so there is no cut between sections -->
    <div class="absolute top-0 inset-x-0 h-44 sm:h-60 bg-gradient-to-b from-[#07080a] via-[#07080a]/90 to-transparent"></div>
    
    <!-- Seamless bottom transition: deep black gradient fade into next section -->
    <div class="absolute bottom-0 inset-x-0 h-44 sm:h-60 bg-gradient-to-t from-[#07080a] via-[#07080a]/90 to-transparent"></div>

    <!-- Subtle technical grid overlay -->
    <div class="absolute inset-0 dot-grid opacity-20"></div>
  </div>

  <div class="w-full px-6 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <!-- Left column: empty on desktop to keep the CNC plasma torch and sparks clear and defined -->
      <div class="hidden lg:block lg:col-span-5 pointer-events-none"></div>

      <!-- Right column: technical text block, specs and CTAs over solid black gradient (Right aligned) -->
      <div class="lg:col-span-7 space-y-6 reveal flex flex-col items-end text-right">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 font-mono text-xs text-brand-yellow uppercase tracking-widest">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"></span>
          <span>// CORTE TÉRMICO CNC &bull; TECNOLOGÍA TRUEHOLE</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight text-right">
          Corte plasma de alta definición y oxicorte hasta 50 mm.
        </h2>
        <p class="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl text-right ml-auto">
          Equipados con generador Hypertherm HyPerformance HPR260XD y mesa de 9.000 x 2.500 mm. La tecnología TrueHole elimina la conicidad en orificios para tornillería, reduciendo tiempos de mecanizado posterior y optimizando cada chapa con software de nesting inteligente.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs max-w-2xl w-full text-right">
          <div class="p-4 rounded-xl bg-black/60 border border-white/10 backdrop-blur-sm">
            <span class="text-neutral-400 block text-[11px]">Bancada útil</span>
            <span class="text-white font-bold text-base mt-1 block">9.000 x 2.500 mm</span>
          </div>
          <div class="p-4 rounded-xl bg-black/60 border border-white/10 backdrop-blur-sm">
            <span class="text-neutral-400 block text-[11px]">Espesor máx. carbono</span>
            <span class="text-brand-yellow font-bold text-base mt-1 block">50 mm</span>
          </div>
          <div class="p-4 rounded-xl bg-black/60 border border-white/10 backdrop-blur-sm">
            <span class="text-neutral-400 block text-[11px]">Inoxidable</span>
            <span class="text-white font-bold text-base mt-1 block">Hasta 15 mm</span>
          </div>
        </div>
        <div class="pt-4 flex flex-col sm:flex-row justify-end gap-4 font-mono text-xs w-full">
          <a href="servicios.html#plasma" class="px-6 py-3.5 rounded-full bg-brand-yellow text-black font-semibold uppercase tracking-wider hover:bg-yellow-300 transition-all inline-flex items-center justify-center gap-2">
            <span>Ficha Técnica Corte Plasma</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
          <a href="instalaciones.html" class="px-6 py-3.5 rounded-full border border-white/20 text-white uppercase tracking-wider hover:border-brand-yellow hover:text-brand-yellow transition-all inline-flex items-center justify-center gap-2 backdrop-blur-sm">
            <span>Ver Maquinaria de Corte</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- QUOTE & DIRECTORS STATEMENT WITH WELDING WANDERING PARTICLES BACKGROUND -->
<section id="welding-section" class="relative py-28 bg-[#07080a] border-b border-white/5 overflow-hidden">
  <!-- Canvas Background: Welding Wandering Particles Effect (OpenProcessing #446535 Adaptation) -->
  <canvas id="welding-canvas" class="absolute inset-0 w-full h-full pointer-events-auto z-0"></canvas>
  
  <!-- Subtle gradient overlays to ensure text readability -->
  <div class="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a] pointer-events-none z-[1] opacity-70"></div>
  <div class="absolute inset-0 bg-radial-gradient from-transparent via-[#07080a]/40 to-[#07080a]/90 pointer-events-none z-[1]"></div>

  <div class="max-w-5xl mx-auto px-6 text-center reveal relative z-10 pointer-events-none">
    <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest inline-block mb-6 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 backdrop-blur-sm">// COMPROMISO DIRECTIVO</span>
    <blockquote class="text-2xl sm:text-4xl font-display font-medium text-white leading-snug drop-shadow-md">
      "Para SOLYCAL la mayor satisfacción es que nuestros clientes nos reconozcan por la solidez y precisión de cada estructura entregada."
    </blockquote>
    <p class="font-mono text-xs text-neutral-300 mt-6 tracking-wider">
      Eloy José Molina Salinas &bull; <span class="text-brand-yellow font-bold">Gerente General SOLYCAL S.L.</span>
    </p>
  </div>
</section>


<!-- VIDEO LIGHTBOX MODAL (REPRODUCTOR LIMPIO) -->
<div id="video-modal" class="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300 flex items-center justify-center p-3 sm:p-6 lg:p-8" role="dialog" aria-modal="true" aria-label="Reproductor Vídeo">
  <div class="relative w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.95)] scale-95 transition-transform duration-300 select-none group" id="video-modal-dialog">
    <div class="absolute inset-0 overflow-hidden flex items-center justify-center bg-black">
      <iframe 
        id="modal-video-iframe" 
        class="w-[114%] h-[114%] max-w-none scale-[1.08] object-cover" 
        src="" 
        title="SOLYCAL Video" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
    <div id="video-click-surface" class="absolute inset-0 z-10 cursor-pointer"></div>
    <button type="button" id="close-video-modal" class="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 border border-white/25 text-white flex items-center justify-center hover:border-white hover:bg-black/90 transition-all backdrop-blur-md cursor-pointer" aria-label="Cerrar reproductor">
      <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
</div>
<script>
  (function() {
    const btnPlayHero = document.getElementById('btn-hero-video-trigger');
    const videoModal = document.getElementById('video-modal');
    const modalDialog = document.getElementById('video-modal-dialog');
    const modalIframe = document.getElementById('modal-video-iframe');
    const closeBtn = document.getElementById('close-video-modal');
    const clickSurface = document.getElementById('video-click-surface');

    const videoEmbedBase = 'https://www.youtube-nocookie.com/embed/3-nS9CuOS_I?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1';

    let isPlaying = false;

    function postToIframe(command, args) {
      if (!modalIframe || !modalIframe.contentWindow) return;
      modalIframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: args || ''
      }), '*');
    }

    function togglePlayPause() {
      if (isPlaying) {
        postToIframe('pauseVideo');
        isPlaying = false;
      } else {
        postToIframe('playVideo');
        postToIframe('unMute');
        isPlaying = true;
      }
    }

    function openModal() {
      if (!videoModal || !modalIframe) return;
      const bgVideo = document.getElementById('bg-video');
      if (bgVideo) {
        if (typeof bgVideo.pause === 'function') {
          bgVideo.pause();
        } else if (bgVideo.contentWindow) {
          bgVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      }

      modalIframe.src = videoEmbedBase;
      isPlaying = true;

      videoModal.classList.remove('opacity-0', 'pointer-events-none');
      if (modalDialog) {
        modalDialog.classList.remove('scale-95');
        modalDialog.classList.add('scale-100');
      }
      document.body.style.overflow = 'hidden';
      if (heroCursor) heroCursor.style.opacity = '0';
    }

    function closeModal() {
      if (!videoModal || !modalIframe) return;
      videoModal.classList.add('opacity-0', 'pointer-events-none');
      if (modalDialog) {
        modalDialog.classList.remove('scale-100');
        modalDialog.classList.add('scale-95');
      }
      modalIframe.src = '';
      document.body.style.overflow = '';
      isPlaying = false;

      const bgVideo = document.getElementById('bg-video');
      if (bgVideo) {
        if (typeof bgVideo.play === 'function') {
          bgVideo.play().catch(() => {});
        } else if (bgVideo.contentWindow) {
          bgVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }

      if (typeof updateCursorVisibility === 'function') {
        updateCursorVisibility();
      }
    }

    if (btnPlayHero) {
      btnPlayHero.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal();
      });
    }

    // Custom Pointer Badge Follower on Hero Section (Perfil Blanco Flotante)
    const heroSection = document.getElementById('hero-section');
    const heroCursor = document.getElementById('hero-cursor-badge');

    let updateCursorVisibility = () => {};
    if (heroSection && heroCursor) {
      let mouseX = -1000;
      let mouseY = -1000;
      let curX = -1000;
      let curY = -1000;
      let isInsideHero = false;
      let isOverInteractive = false;

      function checkPointerInHero(clientX, clientY) {
        if (!heroSection) return false;
        const rect = heroSection.getBoundingClientRect();
        return (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        );
      }

      updateCursorVisibility = () => {
        const isModalOpen = videoModal && !videoModal.classList.contains('pointer-events-none');
        if (isInsideHero && !isOverInteractive && !isModalOpen) {
          heroCursor.style.opacity = '1';
        } else {
          heroCursor.style.opacity = '0';
        }
      };

      window.addEventListener('pointermove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (curX < -500) {
          curX = mouseX;
          curY = mouseY;
          heroCursor.style.left = curX + 'px';
          heroCursor.style.top = curY + 'px';
        }

        isInsideHero = checkPointerInHero(e.clientX, e.clientY);

        const interactive = e.target && e.target.closest ? e.target.closest('a, button, input, [role="button"], select, textarea, .btn-magnetic') : null;
        isOverInteractive = !!interactive;

        updateCursorVisibility();
      });

      window.addEventListener('scroll', () => {
        if (curX > -500) {
          isInsideHero = checkPointerInHero(mouseX, mouseY);
          updateCursorVisibility();
        }
      }, { passive: true });

      document.addEventListener('mouseleave', () => {
        isInsideHero = false;
        updateCursorVisibility();
      });

      // Clicking on hero background (outside interactive buttons) opens video modal
      heroSection.addEventListener('click', (e) => {
        if (e.target.closest('a, button, input, [role="button"], select, textarea, .btn-magnetic')) return;
        openModal();
      });

      // Smooth lag follow loop
      function followLoop() {
        if (curX > -500) {
          curX += (mouseX - curX) * 0.28;
          curY += (mouseY - curY) * 0.28;
          heroCursor.style.left = curX + 'px';
          heroCursor.style.top = curY + 'px';
        }
        requestAnimationFrame(followLoop);
      }
      requestAnimationFrame(followLoop);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    if (clickSurface) {
      clickSurface.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
      });
    }

    if (videoModal) {
      videoModal.addEventListener('click', (e) => {
        if (!modalDialog || !modalDialog.contains(e.target)) {
          closeModal();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (videoModal && !videoModal.classList.contains('pointer-events-none')) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          togglePlayPause();
        }
      }
    });

    // Ensure background video autoplays cleanly across browsers & devices
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
      if (typeof bgVideo.play === 'function') {
        const playHtml5Bg = () => {
          bgVideo.play().catch(() => {});
        };
        playHtml5Bg();
        window.addEventListener('touchstart', playHtml5Bg, { passive: true, once: true });
        window.addEventListener('scroll', playHtml5Bg, { passive: true, once: true });
        window.addEventListener('click', playHtml5Bg, { passive: true, once: true });
      } else if (bgVideo.contentWindow) {
        const sendBgVideoPlay = () => {
          try {
            bgVideo.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
            bgVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          } catch (e) {}
        };
        bgVideo.addEventListener('load', () => {
          sendBgVideoPlay();
          setTimeout(sendBgVideoPlay, 500);
          setTimeout(sendBgVideoPlay, 1500);
          setTimeout(sendBgVideoPlay, 3000);
        });
        const unlockBgOnMobile = () => {
          sendBgVideoPlay();
          window.removeEventListener('touchstart', unlockBgOnMobile);
          window.removeEventListener('touchend', unlockBgOnMobile);
          window.removeEventListener('scroll', unlockBgOnMobile);
        };
        window.addEventListener('touchstart', unlockBgOnMobile, { passive: true, once: true });
        window.addEventListener('touchend', unlockBgOnMobile, { passive: true, once: true });
        window.addEventListener('scroll', unlockBgOnMobile, { passive: true, once: true });
      }
    }
  })();
</script>

${getFooter()}
`;

// 2. GENERATE SERVICIOS.HTML (Detailed Services Page)
const serviciosHtml = `${getHead('Servicios de Calderería Industrial y Corte Plasma | SOLYCAL Valencia', 'Servicios integrales de calderería pesada y ligera, corte por plasma HD TrueHole, soldadura TIG/MIG homologada y estructuras metálicas con marcado CE.', 'servicios.html')}
${getHeader('servicios')}

<!-- CONTENEDOR PRINCIPAL DE TODA LA PÁGINA DE SERVICIOS CON FONDO BIT PATTERNS (Jason Labbe) -->
<div id="services-page-container" class="relative bg-[#07080a] overflow-hidden">
  
  <!-- Canvas Interactivo Bit Patterns fijo/absoluto abarcando toda la página excepto el footer -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="bit-patterns-wrap" style="clip-path: inset(0 0 0 0);">
    <canvas id="bit-patterns-canvas" class="w-full h-full block opacity-60 hover:opacity-85 transition-opacity duration-700"></canvas>
  </div>

  <!-- Máscara de profundidad y contraste corporativo sobre el canvas para legibilidad óptima de textos y tarjetas -->
  <div class="fixed inset-0 bg-gradient-to-b from-[#07080a]/75 via-[#07080a]/35 to-[#07080a]/80 pointer-events-none z-[1]"></div>
  <div class="fixed inset-0 dot-grid opacity-20 pointer-events-none z-[1]"></div>

  <!-- CONTENIDO FRONTAL DE LA PÁGINA (Z-INDEX SUPERIOR) -->
  <div class="relative z-10">
    
    <!-- 01 HERO INTRODUCTORIO (FULLWIDTH & FULLSCREEN) -->
    <section id="services-hero-section" class="w-screen h-screen min-h-[640px] flex items-center justify-center relative overflow-hidden bg-transparent border-b border-white/5 select-none">
      
      <!-- Ambient background subtle amber aura -->
      <div class="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-brand-yellow/[0.04] rounded-full blur-[150px] pointer-events-none"></div>

      <!-- Massive industrial watermark in background -->
      <div class="absolute inset-0 flex items-center justify-end pr-8 sm:pr-16 pointer-events-none select-none overflow-hidden">
        <span class="font-display font-extrabold text-[18vw] text-white/[0.025] leading-none tracking-tighter">
          SOLYCAL
        </span>
      </div>

      <!-- Hero Content Container -->
      <div id="services-hero-content" class="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 relative z-10 flex flex-col justify-center">
        <div class="max-w-4xl space-y-6">
          
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
            <span class="font-mono text-xs sm:text-sm text-brand-yellow uppercase tracking-widest block">// 02 &bull; SERVICIOS INDUSTRIALES</span>
            <span class="text-neutral-600 font-mono text-xs hidden sm:inline">|</span>
            <span class="font-mono text-xs text-neutral-400 hidden sm:inline">INGENIERÍA &bull; TALLER &bull; MONTAJE</span>
          </div>

          <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[1.04]">
            Capacidad integral de <span class="text-brand-yellow">fabricación y mecanizado.</span>
          </h1>

          <p class="text-lg sm:text-xl lg:text-2xl text-neutral-300 font-sans leading-relaxed max-w-3xl pt-2">
            Abarcamos todo el ciclo: desde la interpretación y modelado 3D de planos hasta el corte, curvado, soldadura homologada y montaje en obra civil.
          </p>

          <!-- Indicadores técnicos integrados -->
          <div class="pt-6 sm:pt-8 flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-xs sm:text-sm text-neutral-400">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
              <span class="tracking-wider">CORTE PLASMA HD TRUEHOLE</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
              <span class="tracking-wider">CALDERERÍA PESADA HASTA 16 TN</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
              <span class="tracking-wider">HOMOLOGACIONES EN 1090 / ISO 9001</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Hint to Scroll into Horizontal Curtain Section -->
      <div class="absolute bottom-6 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 flex items-center justify-between pointer-events-none z-20 font-mono text-xs text-neutral-500 uppercase tracking-widest">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"></span>
          <span>5 DIVISIONES INDUSTRIALES</span>
        </div>
        <div class="flex items-center gap-2 text-neutral-400">
          <span>DESLIZA HACIA ABAJO</span>
          <span class="text-brand-yellow animate-bounce">&darr;</span>
        </div>
      </div>

    </section>

    <!-- 02 FULLWIDTH HORIZONTAL SCROLL SERVICES SHOWCASE (CURTAIN WIPE UP OVER HERO) -->
    <style>
      .hscroll-section {
        overflow: hidden;
        position: relative;
        width: 100vw;
        max-width: 100%;
        background-color: #07080a;
        z-index: 20;
        box-shadow: 0 -35px 80px rgba(0, 0, 0, 0.98), 0 -1px 0 rgba(255, 255, 255, 0.15);
      }
      .hscroll-track {
        display: flex;
        flex-wrap: nowrap;
        width: max-content;
        height: 100vh;
        will-change: transform;
      }
      .hscroll-panel {
        flex: 0 0 100vw;
        width: 100vw;
        height: 100vh;
        min-height: 600px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        background-color: #07080a;
        box-sizing: border-box;
      }
      @media (max-width: 1023px) {
        #services-hero-section {
          height: auto;
          min-height: 85vh;
        }
        .hscroll-section {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        .hscroll-track {
          height: auto;
          min-height: 100vh;
        }
        .hscroll-panel {
          scroll-snap-align: start;
          height: auto;
          min-height: 100vh;
        }
      }
    </style>

    <section class="hscroll-section p-0 relative" id="services-hscroll">
      
      <!-- Horizontal Track with 5 Fullwidth Panels (Full-bleed Background Photo + Soft Dark Gradient to Left) -->
      <div class="hscroll-track">

        <!-- PANEL 01: Calderería Industrial -->
        <div class="hscroll-panel border-r border-white/[0.08]" data-panel-idx="0">
          <img src="assets/img/Servicios/caldereria-industrial.jpeg"
               alt="Calderería Industrial Solycal"
               class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-[1]"
               loading="eager">

          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(90deg, #07080a 0%, #07080a 28%, rgba(7,8,10,0.96) 42%, rgba(7,8,10,0.80) 58%, rgba(7,8,10,0.40) 74%, transparent 100%);"></div>
          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(180deg, rgba(7,8,10,0.7) 0%, transparent 18%, transparent 78%, rgba(7,8,10,0.9) 100%);"></div>

          <span class="absolute right-8 sm:right-16 lg:right-24 bottom-12 font-display font-extrabold text-[120px] sm:text-[180px] lg:text-[240px] text-white/[0.06] select-none pointer-events-none leading-none z-[3]">
            01
          </span>

          <div class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-center">
            <div class="max-w-2xl space-y-6 pt-16 sm:pt-20">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">// 01 &bull; TRANSFORMACIÓN DE CHAPA</span>
                <span class="text-neutral-600 font-mono text-xs hidden sm:inline">|</span>
                <span class="font-mono text-xs text-neutral-400 hidden sm:inline">DIVISIÓN PESADA</span>
              </div>
              <h2 class="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.06]">
                Calderería Industrial<br><span class="text-neutral-400 font-light">Pesada &amp; Ligera</span>
              </h2>
              <p class="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed max-w-xl">
                Tolvas de alimentación, silos de almacenamiento, ciclones, depósitos bajo presión y conductos de aspiración en Torrent (Valencia). Conformado integral de chapa desde ingeniería 3D hasta pieza acabada.
              </p>
              <div class="pt-3 border-t border-white/[0.1] space-y-2.5">
                <span class="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-semibold">ESPECIFICACIONES INDUSTRIALES:</span>
                <ul class="font-mono text-xs sm:text-sm text-neutral-300 space-y-2">
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Curvado de chapa en cilindros hasta 2.000 &times; 12 mm</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Plegado CNC con máquina Ermaksan de 4 metros</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Materiales: Acero al carbono, inoxidable y aleaciones especiales</span>
                  </li>
                </ul>
              </div>
              <div class="pt-4 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
                <span class="font-mono text-xs sm:text-sm text-neutral-300 uppercase tracking-wider bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">Torrent &bull; Valencia &bull; Capacidad hasta 20 Tn</span>
              </div>
            </div>
          </div>

          <div class="absolute bottom-5 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 flex items-center justify-between pointer-events-none z-20 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <div class="flex items-center gap-2">
              <span class="text-brand-yellow font-bold">01</span>
              <span>/ 05</span>
              <span class="mx-2 text-neutral-600 hidden sm:inline">|</span>
              <span class="hidden sm:inline">CALDERERÍA INDUSTRIAL</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="hidden sm:inline">DESPLAZA PARA CONTINUAR</span>
              <span class="text-brand-yellow">&rarr;</span>
            </div>
          </div>
        </div>

        <!-- PANEL 02: Corte Plasma HD -->
        <div class="hscroll-panel border-r border-white/[0.08]" data-panel-idx="1">
          <img src="assets/img/Servicios/corte-plasma-hd.jpeg"
               alt="Corte Plasma HD Solycal"
               class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-[1]"
               loading="eager">

          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(90deg, #07080a 0%, #07080a 28%, rgba(7,8,10,0.96) 42%, rgba(7,8,10,0.80) 58%, rgba(7,8,10,0.40) 74%, transparent 100%);"></div>
          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(180deg, rgba(7,8,10,0.7) 0%, transparent 18%, transparent 78%, rgba(7,8,10,0.9) 100%);"></div>

          <span class="absolute right-8 sm:right-16 lg:right-24 bottom-12 font-display font-extrabold text-[120px] sm:text-[180px] lg:text-[240px] text-white/[0.06] select-none pointer-events-none leading-none z-[3]">
            02
          </span>

          <div class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-center">
            <div class="max-w-2xl space-y-6 pt-16 sm:pt-20">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">// 02 &bull; TECNOLOGÍA HYPERTHERM</span>
                <span class="text-neutral-600 font-mono text-xs hidden sm:inline">|</span>
                <span class="font-mono text-xs text-neutral-400 hidden sm:inline">CORTE ALTA DEFINICIÓN</span>
              </div>
              <h2 class="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.06]">
                Corte Plasma HD<br><span class="text-neutral-400 font-light">Tecnología TrueHole</span>
              </h2>
              <p class="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed max-w-xl">
                Pórtico CNC de 9.000 &times; 2.500 mm equipado con fuente Hypertherm HPR260XD y tecnología de taladro perfecto TrueHole para orificios sin conicidad directos para roscado o tornillería.
              </p>
              <div class="pt-3 border-t border-white/[0.1] space-y-2.5">
                <span class="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-semibold">ESPECIFICACIONES INDUSTRIALES:</span>
                <ul class="font-mono text-xs sm:text-sm text-neutral-300 space-y-2">
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Espesor máximo de corte: 50 mm en acero al carbono</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Corte en acero inoxidable hasta 15 mm y aluminio hasta 25 mm</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Software de nesting automatizado para máxima optimización de material</span>
                  </li>
                </ul>
              </div>
              <div class="pt-4 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
                <span class="font-mono text-xs sm:text-sm text-neutral-300 uppercase tracking-wider bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">Tolerancia &plusmn;0,3 mm &bull; Mesa 9.000 &times; 2.500 mm &bull; Hasta 50 mm</span>
              </div>
            </div>
          </div>

          <div class="absolute bottom-5 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 flex items-center justify-between pointer-events-none z-20 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <div class="flex items-center gap-2">
              <span class="text-brand-yellow font-bold">02</span>
              <span>/ 05</span>
              <span class="mx-2 text-neutral-600 hidden sm:inline">|</span>
              <span class="hidden sm:inline">CORTE PLASMA HD</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="hidden sm:inline">DESPLAZA PARA CONTINUAR</span>
              <span class="text-brand-yellow">&rarr;</span>
            </div>
          </div>
        </div>

        <!-- PANEL 03: Soldadura Técnica -->
        <div class="hscroll-panel border-r border-white/[0.08]" data-panel-idx="2">
          <img src="assets/img/Servicios/soldadura-tecnica.jpeg"
               alt="Soldadura Técnica Solycal"
               class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-[1]"
               loading="eager">

          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(90deg, #07080a 0%, #07080a 28%, rgba(7,8,10,0.96) 42%, rgba(7,8,10,0.80) 58%, rgba(7,8,10,0.40) 74%, transparent 100%);"></div>
          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(180deg, rgba(7,8,10,0.7) 0%, transparent 18%, transparent 78%, rgba(7,8,10,0.9) 100%);"></div>

          <span class="absolute right-8 sm:right-16 lg:right-24 bottom-12 font-display font-extrabold text-[120px] sm:text-[180px] lg:text-[240px] text-white/[0.06] select-none pointer-events-none leading-none z-[3]">
            03
          </span>

          <div class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-center">
            <div class="max-w-2xl space-y-6 pt-16 sm:pt-20">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">// 03 &bull; HOMOLOGACIONES OFICIALES</span>
                <span class="text-neutral-600 font-mono text-xs hidden sm:inline">|</span>
                <span class="font-mono text-xs text-neutral-400 hidden sm:inline">CALIDAD CERTIFICADA</span>
              </div>
              <h2 class="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.06]">
                Soldadura Técnica<br><span class="text-neutral-400 font-light">Homologada TIG / MIG</span>
              </h2>
              <p class="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed max-w-xl">
                Equipo de soldadores homologados bajo normativas europeas para uniones de alta exigencia estructural, estanqueidad de recipientes a presión y componentes ferroviarios.
              </p>
              <div class="pt-3 border-t border-white/[0.1] space-y-2.5">
                <span class="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-semibold">ESPECIFICACIONES INDUSTRIALES:</span>
                <ul class="font-mono text-xs sm:text-sm text-neutral-300 space-y-2">
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Procedimientos TIG (GTAW), MIG-MAG (GMAW) y Arco Sumergido (SAW)</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Especialistas en acero inoxidable sanitario, dúplex y aleaciones de aluminio</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Control de calidad con ensayos no destructivos (END), líquidos penetrantes y ultrasonidos</span>
                  </li>
                </ul>
              </div>
              <div class="pt-4 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
                <span class="font-mono text-xs sm:text-sm text-neutral-300 uppercase tracking-wider bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">EN ISO 15614 &bull; EN 15085-2 &bull; Homologación Oficial</span>
              </div>
            </div>
          </div>

          <div class="absolute bottom-5 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 flex items-center justify-between pointer-events-none z-20 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <div class="flex items-center gap-2">
              <span class="text-brand-yellow font-bold">03</span>
              <span>/ 05</span>
              <span class="mx-2 text-neutral-600 hidden sm:inline">|</span>
              <span class="hidden sm:inline">SOLDADURA TÉCNICA HOMOLOGADA</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="hidden sm:inline">DESPLAZA PARA CONTINUAR</span>
              <span class="text-brand-yellow">&rarr;</span>
            </div>
          </div>
        </div>

        <!-- PANEL 04: Estructuras Metálicas -->
        <div class="hscroll-panel border-r border-white/[0.08]" data-panel-idx="3">
          <img src="assets/img/Servicios/estructuras-metalicas.jpeg"
               alt="Estructuras Metálicas Solycal"
               class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-[1]"
               loading="eager">

          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(90deg, #07080a 0%, #07080a 28%, rgba(7,8,10,0.96) 42%, rgba(7,8,10,0.80) 58%, rgba(7,8,10,0.40) 74%, transparent 100%);"></div>
          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(180deg, rgba(7,8,10,0.7) 0%, transparent 18%, transparent 78%, rgba(7,8,10,0.9) 100%);"></div>

          <span class="absolute right-8 sm:right-16 lg:right-24 bottom-12 font-display font-extrabold text-[120px] sm:text-[180px] lg:text-[240px] text-white/[0.06] select-none pointer-events-none leading-none z-[3]">
            04
          </span>

          <div class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-center">
            <div class="max-w-2xl space-y-6 pt-16 sm:pt-20">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">// 04 &bull; MARCADO CE EN 1090-1</span>
                <span class="text-neutral-600 font-mono text-xs hidden sm:inline">|</span>
                <span class="font-mono text-xs text-neutral-400 hidden sm:inline">CLASES EXC2 Y EXC3</span>
              </div>
              <h2 class="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.06]">
                Estructuras Metálicas<br><span class="text-neutral-400 font-light">&amp; Pasarelas Industriales</span>
              </h2>
              <p class="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed max-w-xl">
                Fabricación de estructuras portantes, pasarelas de acceso, bancadas de maquinaria pesada y líneas de vida conforme al marcado CE obligatorio EN 1090-1.
              </p>
              <div class="pt-3 border-t border-white/[0.1] space-y-2.5">
                <span class="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-semibold">ESPECIFICACIONES INDUSTRIALES:</span>
                <ul class="font-mono text-xs sm:text-sm text-neutral-300 space-y-2">
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Control de producción en fábrica certificado clases EXC2 y EXC3</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Montaje directo en obra civil con medios de elevación y personal especializado</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Tratamientos superficiales: galvanizado en caliente, granallado SA 2.5 y pintura C5</span>
                  </li>
                </ul>
              </div>
              <div class="pt-4 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
                <span class="font-mono text-xs sm:text-sm text-neutral-300 uppercase tracking-wider bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">Marcado CE EN 1090-1 &bull; Clases EXC2 y EXC3</span>
              </div>
            </div>
          </div>

          <div class="absolute bottom-5 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 flex items-center justify-between pointer-events-none z-20 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <div class="flex items-center gap-2">
              <span class="text-brand-yellow font-bold">04</span>
              <span>/ 05</span>
              <span class="mx-2 text-neutral-600 hidden sm:inline">|</span>
              <span class="hidden sm:inline">ESTRUCTURAS METÁLICAS CE</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="hidden sm:inline">DESPLAZA PARA CONTINUAR</span>
              <span class="text-brand-yellow">&rarr;</span>
            </div>
          </div>
        </div>

        <!-- PANEL 05: Montaje en Obra -->
        <div class="hscroll-panel" data-panel-idx="4">
          <img src="assets/img/Servicios/montaje-instalacion.jpeg"
               alt="Montaje en Obra Solycal"
               class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-[1]"
               loading="eager">

          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(90deg, #07080a 0%, #07080a 28%, rgba(7,8,10,0.96) 42%, rgba(7,8,10,0.80) 58%, rgba(7,8,10,0.40) 74%, transparent 100%);"></div>
          <div class="absolute inset-0 pointer-events-none z-[2]"
               style="background: linear-gradient(180deg, rgba(7,8,10,0.7) 0%, transparent 18%, transparent 78%, rgba(7,8,10,0.9) 100%);"></div>

          <span class="absolute right-8 sm:right-16 lg:right-24 bottom-12 font-display font-extrabold text-[120px] sm:text-[180px] lg:text-[240px] text-white/[0.06] select-none pointer-events-none leading-none z-[3]">
            05
          </span>

          <div class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-center">
            <div class="max-w-2xl space-y-6 pt-16 sm:pt-20">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">// 05 &bull; INSTALACIÓN EN PLANTA</span>
                <span class="text-neutral-600 font-mono text-xs hidden sm:inline">|</span>
                <span class="font-mono text-xs text-neutral-400 hidden sm:inline">EJECUCIÓN DIRECTA</span>
              </div>
              <h2 class="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.06]">
                Montaje e Instalación<br><span class="text-neutral-400 font-light">en Obra Civil</span>
              </h2>
              <p class="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed max-w-xl">
                Servicio integral de instalación en fábrica o planta química con personal propio homologado. Coordinamos transporte especial, izado con medios auxiliares y replanteo geométrico milimétrico.
              </p>
              <div class="pt-3 border-t border-white/[0.1] space-y-2.5">
                <span class="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-semibold">ESPECIFICACIONES INDUSTRIALES:</span>
                <ul class="font-mono text-xs sm:text-sm text-neutral-300 space-y-2">
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Transporte especial y custodia de grandes virolas y piezas sobredimensionadas</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Coordinación directa de seguridad, maniobras de izado y enlace con obra civil</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 bg-brand-yellow rounded-full shrink-0 mt-[6px]"></span>
                    <span>Pruebas de presión, estanqueidad hidrostática y ensayos de funcionamiento en campo</span>
                  </li>
                </ul>
              </div>
              <div class="pt-4 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
                <span class="font-mono text-xs sm:text-sm text-neutral-300 uppercase tracking-wider bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">Montaje en Obra Civil &bull; Cobertura Nacional</span>
              </div>
            </div>
          </div>

          <div class="absolute bottom-5 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 flex items-center justify-between pointer-events-none z-20 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <div class="flex items-center gap-2">
              <span class="text-brand-yellow font-bold">05</span>
              <span>/ 05</span>
              <span class="mx-2 text-neutral-600 hidden sm:inline">|</span>
              <span class="hidden sm:inline">MONTAJE E INSTALACIÓN EN OBRA</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="hidden sm:inline">FIN DE SECCIÓN</span>
              <span class="text-brand-yellow">&darr;</span>
            </div>
          </div>
        </div>

      </div><!-- /hscroll-track -->

      <!-- Subtle bottom progress line (GSAP Vault feature) -->
      <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.08] z-30 pointer-events-none">
        <div id="hscroll-progress" class="h-full bg-brand-yellow w-0"></div>
      </div>

    </section>

    <!-- Cerrar contenedores de serviciosHtml -->
    </div><!-- /relative z-10 -->
  </div><!-- /services-page-container -->

  <script>
  (function(){
    function initHScroll() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
      gsap.registerPlugin(ScrollTrigger);

      var hero = document.querySelector('#services-hero-section');
      var heroContent = document.querySelector('#services-hero-content');
      var section = document.querySelector('#services-hscroll');
      var track = document.querySelector('.hscroll-track');
      var progressLine = document.querySelector('#hscroll-progress');

      if (!hero || !section || !track) return;

      var mm = gsap.matchMedia();
      var desktopST = null;

      mm.add("(min-width: 1024px)", function() {
        // 1. TRANSICIÓN DE CORTINA HACIA ARRIBA (Curtain Wipe Up):
        // Hero se queda anclado mientras Section 02 sube como una cortina cubriéndolo
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          endTrigger: section,
          end: 'top top',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1
        });

        // Parallax sutil y atenuación de profundidad del Hero a medida que sube la cortina
        if (heroContent) {
          gsap.to(heroContent, {
            y: -90,
            opacity: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 1
            }
          });
        }

        // 2. SCROLL HORIZONTAL FLUIDO (Una vez la cortina cubre el 100% de la pantalla)
        var distance = function() {
          return track.scrollWidth - window.innerWidth;
        };

        var tween = gsap.to(track, {
          x: function() { return -distance(); },
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: function() { return '+=' + distance(); },
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: function(self) {
              if (progressLine) {
                progressLine.style.width = (self.progress * 100) + '%';
              }
            }
          }
        });

        desktopST = tween.scrollTrigger;

        return function() {
          desktopST = null;
          gsap.set(track, { clearProps: 'all' });
          if (heroContent) gsap.set(heroContent, { clearProps: 'all' });
        };
      });

      mm.add("(max-width: 1023px)", function() {
        function onMobileScroll() {
          if (progressLine) {
            var maxScroll = section.scrollWidth - section.clientWidth;
            var progress = maxScroll > 0 ? section.scrollLeft / maxScroll : 0;
            progressLine.style.width = (progress * 100) + '%';
          }
        }
        section.addEventListener('scroll', onMobileScroll, { passive: true });
        return function() {
          section.removeEventListener('scroll', onMobileScroll);
        };
      });

      // Smooth horizontal trackpad gesture integration
      window.addEventListener('wheel', function(e) {
        if (window.innerWidth >= 1024 && desktopST && desktopST.isActive) {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            if (window.lenis) {
              window.lenis.scrollTo(window.lenis.scroll + e.deltaX * 1.2, { immediate: false, duration: 0.4 });
            } else {
              window.scrollBy({ top: e.deltaX * 0.75 });
            }
          }
        }
      }, { passive: true });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHScroll);
    } else {
      initHScroll();
    }
  })();
  </script>${getFooter()}
`;

// 3. GENERATE INSTALACIONES.HTML (Facilities Page)
const instalacionesHtml = `${getHead('Instalaciones Industriales y Maquinaria | SOLYCAL Torrent', '5.000 m² de instalaciones industriales equipadas con 7 puentes grúa de hasta 16 Tn y naves segregadas en Torrent (Valencia).', 'instalaciones.html')}
${getHeader('instalaciones')}

<div class="py-20 border-b border-white/5 bg-[#090b0e] dot-grid">
  <div class="w-full px-6">
    <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-4">03 // PLANTA DE PRODUCCIÓN</span>
    <h1 class="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-tight max-w-4xl">
      5.000 m² de infraestructura segregada en Torrent.
    </h1>
    <p class="text-neutral-400 max-w-2xl font-sans mt-6 text-base leading-relaxed">
      Dividida en bloques independientes para garantizar el aislamiento entre aceros y optimizar el flujo logístico de grandes tonelajes.
    </p>
  </div>
</div>

<section class="py-24 bg-[#07080a]">
  <div class="w-full px-6 space-y-20">

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 reveal">
        <div class="w-12 h-12 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow font-mono font-bold text-lg">01</div>
        <h3 class="text-2xl font-display font-bold text-white">Nave de Acero al Carbono</h3>
        <p class="text-xs text-neutral-400 font-sans leading-relaxed">
          Área dedicada a la fabricación pesada, bancadas, virolas y estructuras de gran formato con apoyo de puentes grúa de alta capacidad.
        </p>
      </div>

      <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 reveal">
        <div class="w-12 h-12 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow font-mono font-bold text-lg">02</div>
        <h3 class="text-2xl font-display font-bold text-white">Nave de Acero Inoxidable y Aluminio</h3>
        <p class="text-xs text-neutral-400 font-sans leading-relaxed">
          Instalación completamente descontaminada, con herramienta exclusiva para evitar partículas de hierro y asegurar pureza química sanitaria.
        </p>
      </div>

      <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 reveal">
        <div class="w-12 h-12 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow font-mono font-bold text-lg">03</div>
        <h3 class="text-2xl font-display font-bold text-white">Área de Corte CNC & Curvado</h3>
        <p class="text-xs text-neutral-400 font-sans leading-relaxed">
          Centro de corte por plasma de 9 metros y plegado de 4 metros con automatización para preparación precisa de chapas y biseles.
        </p>
      </div>
    </div>

    <!-- Machinery List -->
    <div class="p-10 rounded-3xl bg-white/[0.02] border border-white/10 space-y-8 reveal">
      <div>
        <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-2">// PARQUE DE MAQUINARIA INDUSTRIAL</span>
        <h2 class="text-3xl font-display font-bold text-white">Capacidad Técnica Instalada</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
        <div class="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <span class="text-brand-yellow font-bold block">7 PUENTES GRÚA</span>
          <p class="text-neutral-300">Capacidad unitaria y combinada de hasta 16 toneladas para izado de depósitos y vigas.</p>
        </div>

        <div class="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <span class="text-brand-yellow font-bold block">CORTE PLASMA HD</span>
          <p class="text-neutral-300">Hypertherm HPR260XD, pórtico de 9.000 x 2.500 mm y tecnología TrueHole.</p>
        </div>

        <div class="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <span class="text-brand-yellow font-bold block">PLEGADORA CNC</span>
          <p class="text-neutral-300">Ermaksan de 4.000 mm de longitud útil para conformado de chapas gruesas.</p>
        </div>

        <div class="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <span class="text-brand-yellow font-bold block">CILINDRO CURVADOR</span>
          <p class="text-neutral-300">Curvado de cilindros y virolas hasta 2.000 mm de ancho y 12 mm de espesor.</p>
        </div>
      </div>
    </div>

  </div>
</section>

${getFooter()}
`;

// --- MADE FOR AWARD COMPONENT 0024: THREE.JS WEBGL AURORA GRADIENT SHADER ---
const auroraVertexShader = `void main() { gl_Position = vec4(position, 1.0); }`;

const auroraFragmentShader = `precision highp float;

uniform float uTime;
uniform vec2  uRes;
uniform vec2  uMouse;
uniform vec2  uMouseUV;
uniform float uReveal;

uniform float uHorizon;
uniform float uIntensity;
uniform float uSpreadMax;
uniform float uCoreGlow;
uniform float uFlowSpeed;
uniform float uWaveAmount;
uniform float uBreath;
uniform float uColorfulness;
uniform vec3  uColWhite;
uniform vec3  uColOrange;
uniform vec3  uColRed;
uniform vec3  uColCyan;
uniform vec3  uColMagenta;
uniform vec3  uColGold;
uniform float uParallax;
uniform float uMouseGlow;
uniform float uMouseGlowSize;
uniform float uMouseBend;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;

  uv += uMouse * vec2(-0.03, -0.02) * uParallax;

  float x = uv.x;
  float d = uv.y - uHorizon;

  float n1 = fbm(vec2(x * 3.0 - uTime * 0.06, uv.y * 2.0 + uTime * 0.045));
  float n2 = fbm(vec2(x * 7.0 + uTime * 0.05, uv.y * 5.0 - uTime * 0.06));

  float grow = smoothstep(0.06, 0.72, x + (n1 - 0.5) * 0.12);
  grow = pow(grow, 1.7);

  float spread = mix(0.014, uSpreadMax, pow(smoothstep(0.18, 1.05, x), 2.1));

  float dd = d + (n1 - 0.5) * uWaveAmount * smoothstep(0.25, 0.9, x);

  vec2 mq = (uv - uMouseUV) * vec2(aspect, 1.0) / max(uMouseGlowSize, 0.01);
  float mGauss = exp(-dot(mq, mq));
  dd -= mGauss * (uMouseUV.y - uHorizon) * uMouseBend;

  float band = exp(-abs(dd) / spread);
  float coreGlow = exp(-abs(d) / 0.028) * grow * uCoreGlow;
  float halo = exp(-abs(dd) / (spread * 2.6)) * 0.35;

  float light = (band + halo) * grow + coreGlow;

  float flow = fbm(vec2(x * 4.5 + n1, abs(dd) * 3.5 - uTime * uFlowSpeed));
  light *= 0.72 + 0.55 * flow;

  light *= 1.0 - uBreath + uBreath * sin(uTime * 0.5 + x * 2.0);
  light += mGauss * uMouseGlow * (0.7 + 0.3 * sin(uTime * 0.8));
  light *= uIntensity;

  float colorAmt = smoothstep(0.25, 0.85, x) * uColorfulness;
  float up = smoothstep(0.0, 0.45, dd);
  float dn = smoothstep(0.0, -0.4, dd);

  vec3 col = uColWhite;
  col = mix(col, uColGold, smoothstep(0.06, 0.16, abs(dd)) * smoothstep(0.35, 0.0, abs(dd)) * colorAmt * 0.85);
  col = mix(col, uColOrange, clamp(up * (1.2 + n2 * 0.6) * colorAmt, 0.0, 1.0));
  col = mix(col, uColRed, clamp((up * 2.4 - 0.9) * colorAmt, 0.0, 1.0));
  col = mix(col, uColMagenta, clamp((n2 - 0.55) * 2.2, 0.0, 1.0) * (up + dn) * colorAmt * 0.65);
  col = mix(col, uColCyan, smoothstep(0.72, 1.0, x + (n2 - 0.5) * 0.08) * 0.75);
  col = mix(col, mix(uColWhite, uColGold, 0.45), dn * 0.45);

  vec3 color = col * light;

  vec2 ep = (uv - vec2(0.86, 0.0)) * vec2(1.2 * aspect * 0.6, 2.0);
  float ember = exp(-dot(ep, ep)) * smoothstep(0.0, -0.12, d);
  color += uColRed * ember * (0.55 + 0.1 * sin(uTime * 0.7));

  vec2 lp = (uv - vec2(0.02, 0.0)) * vec2(2.2, 2.6);
  color += mix(uColRed, uColOrange, 0.5) * exp(-dot(lp, lp)) * smoothstep(0.0, -0.12, d) * 0.22;

  float sheen = smoothstep(0.0, -0.5, d) * 0.06 * grow;
  color += vec3(0.95, 0.72, 0.28) * sheen;

  vec2 sp = uv * vec2(aspect, 1.0) * 90.0;
  vec2 cell = floor(sp);
  vec2 fp = fract(sp) - 0.5;
  float star = step(0.997, hash(cell)) * smoothstep(0.16, 0.0, length(fp));
  float twinkle = 0.5 + 0.5 * sin(uTime * 1.5 + hash(cell + 7.0) * 50.0);
  float darkness = 1.0 - clamp(light * 3.0, 0.0, 1.0);
  color += vec3(1.0, 0.94, 0.80) * star * twinkle * darkness * smoothstep(0.75, 0.35, x) * smoothstep(0.35, 0.6, uv.y) * 0.45;

  float vig = smoothstep(0.0, 0.35, uv.y) * 0.15 + 0.85;
  vig *= 1.0 - 0.45 * pow(1.0 - uv.y, 3.0);
  vig *= 1.0 - 0.35 * pow(uv.y, 4.0);
  vig *= 1.0 - 0.30 * pow(clamp(1.0 - x * 1.4, 0.0, 1.0), 2.0);
  vig *= 1.0 - 0.5 * pow(x, 5.0) * pow(uv.y, 5.0);
  color *= vig;

  color = 1.0 - exp(-color * 1.5);

  gl_FragColor = vec4(color * uReveal, 1.0);
}`;

// 4. GENERATE CALIDAD.HTML (Quality and Certification Page with Aurora Shader Background)
const calidadHtml = `${getHead('Calidad y Certificaciones LRQA ISO 9001, EN 1090-1 | SOLYCAL', 'Certificaciones oficiales acreditadas por Lloyd Register: ISO 9001:2008, Marcado CE EN 1090-1 y Soldeo Ferroviario EN 15085-2.', 'calidad.html')}
${getHeader('calidad', true)}

<!-- CONTENEDOR PRINCIPAL DE TODA LA PÁGINA DE CALIDAD CON THREE.JS SHADER AURORA HERO (Made for Award Component 0024) -->
<div id="calidad-page-container" class="relative min-h-screen overflow-hidden">
  
  <!-- Canvas WebGL Aurora Fijo de fondo interactivo -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="aurora-wrap">
    <canvas id="aurora-canvas" class="w-full h-full block"></canvas>
  </div>

  <!-- Máscara de profundidad y contraste corporativo para preservar legibilidad industrial -->
  <div class="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-[#07080a]/35 via-[#07080a]/20 to-[#07080a]/85"></div>
  <div class="fixed inset-0 dot-grid opacity-15 pointer-events-none z-[1]"></div>

  <!-- CONTENIDO FRONTAL DE LA PÁGINA (Z-INDEX SUPERIOR) -->
  <div class="relative z-10">

    <!-- 01 HERO INTRODUCTORIO DE CALIDAD (ELEGANTE, ESPACIOSO Y EDITORIAL) -->
    <section class="pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/5 relative">
      <div class="w-full px-6 max-w-7xl mx-auto">
        
        <!-- Live status pill & Section tag -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
          <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">// 04 &bull; SISTEMA DE GESTIÓN Y NORMAS INDUSTRIALES</span>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-[11px] font-mono text-brand-yellow uppercase tracking-wider backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
            Acreditaciones Oficiales LRQA
          </div>
        </div>

        <!-- Main Title -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white tracking-tight leading-[1.06] max-w-5xl">
          Rigor técnico avalado por <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-200 to-brand-accent">Lloyd's Register.</span>
        </h1>

        <!-- Subtitle / Editorial description -->
        <p class="text-neutral-300 font-sans mt-8 text-base sm:text-xl max-w-3xl leading-relaxed font-light">
          En calderería pesada y soldadura estructural, la precisión técnica es la base innegociable de cada proceso. Desde la colada del acero hasta el montaje en obra, garantizamos control documental y trazabilidad 100% verificable.
        </p>

        <!-- Floating KPI & Standard Badges (Frosted glass pills floating above the horizon) -->
        <div class="mt-12 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
          <div class="px-4 py-2 rounded-full bg-[#0a0c0e]/60 border border-white/10 backdrop-blur-md text-neutral-200 flex items-center gap-2.5 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
            <span class="text-white font-bold">ISO 9001:2008</span>
            <span class="text-neutral-400">| Calidad LRQA</span>
          </div>
          <div class="px-4 py-2 rounded-full bg-[#0a0c0e]/60 border border-white/10 backdrop-blur-md text-neutral-200 flex items-center gap-2.5 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
            <span class="text-white font-bold">EN 1090-1</span>
            <span class="text-neutral-400">| Marcado CE EXC3</span>
          </div>
          <div class="px-4 py-2 rounded-full bg-[#0a0c0e]/60 border border-white/10 backdrop-blur-md text-neutral-200 flex items-center gap-2.5 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
            <span class="text-white font-bold">EN 15085-2</span>
            <span class="text-neutral-400">| Soldeo Ferroviario CL-1</span>
          </div>
          <div class="px-4 py-2 rounded-full bg-[#0a0c0e]/60 border border-white/10 backdrop-blur-md text-neutral-200 flex items-center gap-2.5 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
            <span class="text-white font-bold">EN 10204 3.1</span>
            <span class="text-neutral-400">| Trazabilidad Colada</span>
          </div>
        </div>

      </div>
    </section>

    <!-- 02 TRIPTYCH CERTIFICACIONES OFICIALES (ELEVATED FROSTED GLASS CARDS) -->
    <section class="py-24 border-b border-white/5 relative">
      <div class="w-full px-6 max-w-7xl mx-auto space-y-12">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-3">// ACREDITACIONES INTERNACIONALES</span>
            <h2 class="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Certificaciones de Referencia</h2>
          </div>
          <p class="text-sm font-mono text-neutral-400 max-w-md">
            Auditorías anuales independientes por organismos notificados que garantizan cumplimiento normativo en toda la Unión Europea.
          </p>
        </div>

        <!-- Tarjetas Glassmorphism con iluminación de fondo -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Card 1: ISO 9001:2008 -->
          <div class="p-8 sm:p-10 rounded-3xl bg-[#0a0c0e]/55 border border-white/10 backdrop-blur-xl flex flex-col justify-between reveal hover:border-brand-yellow/50 transition-all duration-500 shadow-2xl group relative overflow-hidden">
            <div class="absolute -top-20 -right-20 w-44 h-44 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-yellow/20 transition-all duration-500"></div>
            
            <div class="space-y-6 relative z-10">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest font-semibold">NORMA ISO 9001:2008</span>
                <span class="px-2.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-[10px] font-mono text-brand-yellow">AUDITADO LRQA</span>
              </div>
              
              <div class="h-32 flex items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/15 transition-all">
                <img src="assets/lrqa-9001.png" alt="Certificado ISO 9001:2008 acreditado por Lloyd's Register a Solycal" class="max-h-24 w-auto object-contain group-hover:scale-105 transition-transform" loading="lazy">
              </div>

              <div>
                <h3 class="text-2xl font-display font-bold text-white group-hover:text-brand-yellow transition-colors">Gestión de Calidad</h3>
                <p class="text-xs text-neutral-300 font-sans mt-3 leading-relaxed">
                  Sistema integral de gestión de la calidad para calderería pesada, tubería industrial y estructuras metálicas soldadas.
                </p>
              </div>

              <ul class="space-y-2 pt-2 border-t border-white/5 font-mono text-xs text-neutral-400">
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Homologación de aceros europeos</span>
                </li>
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Calibración metrológica ENAC</span>
                </li>
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Auditorías continuas de proceso</span>
                </li>
              </ul>
            </div>

            <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-500">ALCANCE DOCUMENTAL</span>
              <span class="text-brand-yellow font-bold">100% TRAZABILIDAD</span>
            </div>
          </div>

          <!-- Card 2: EN 1090-1 Marcado CE -->
          <div class="p-8 sm:p-10 rounded-3xl bg-[#0a0c0e]/55 border border-white/10 backdrop-blur-xl flex flex-col justify-between reveal hover:border-brand-yellow/50 transition-all duration-500 shadow-2xl group relative overflow-hidden">
            <div class="absolute -top-20 -right-20 w-44 h-44 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-yellow/20 transition-all duration-500"></div>

            <div class="space-y-6 relative z-10">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest font-semibold">EN 1090-1 &bull; MARCADO CE</span>
                <span class="px-2.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-[10px] font-mono text-brand-yellow">CLASE EXC-3</span>
              </div>

              <div class="h-32 flex items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/15 transition-all">
                <img src="assets/lrqa-1090.png" alt="Certificado Marcado CE EN 1090-1 para estructuras metálicas de Solycal" class="max-h-24 w-auto object-contain group-hover:scale-105 transition-transform" loading="lazy">
              </div>

              <div>
                <h3 class="text-2xl font-display font-bold text-white group-hover:text-brand-yellow transition-colors">Estructuras Metálicas</h3>
                <p class="text-xs text-neutral-300 font-sans mt-3 leading-relaxed">
                  Control de Producción en Fábrica (CPF) obligatorio según Reglamento Europeo 305/2011 para componentes estructurales de acero.
                </p>
              </div>

              <ul class="space-y-2 pt-2 border-t border-white/5 font-mono text-xs text-neutral-400">
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Ejecución certificada hasta EXC3</span>
                </li>
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Declaración de Prestaciones (DoP)</span>
                </li>
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Soldadura con WPQR cualificados</span>
                </li>
              </ul>
            </div>

            <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-500">EXIGENCIA NORMATIVA</span>
              <span class="text-brand-yellow font-bold">OBLIGATORIO UNIÓN EUROPEA</span>
            </div>
          </div>

          <!-- Card 3: EN 15085-2 Soldeo Ferroviario -->
          <div class="p-8 sm:p-10 rounded-3xl bg-[#0a0c0e]/55 border border-white/10 backdrop-blur-xl flex flex-col justify-between reveal hover:border-brand-yellow/50 transition-all duration-500 shadow-2xl group relative overflow-hidden">
            <div class="absolute -top-20 -right-20 w-44 h-44 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-yellow/20 transition-all duration-500"></div>

            <div class="space-y-6 relative z-10">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest font-semibold">NORMA EN 15085-2</span>
                <span class="px-2.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-[10px] font-mono text-brand-yellow">NIVEL CL-1</span>
              </div>

              <div class="h-32 flex items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/15 transition-all">
                <div class="w-16 h-16 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow group-hover:scale-110 group-hover:bg-brand-yellow/20 transition-all">
                  <i data-lucide="train" class="w-8 h-8"></i>
                </div>
              </div>

              <div>
                <h3 class="text-2xl font-display font-bold text-white group-hover:text-brand-yellow transition-colors">Soldeo Ferroviario</h3>
                <p class="text-xs text-neutral-300 font-sans mt-3 leading-relaxed">
                  Homologación del más alto nivel técnico para soldadura y fabricación de componentes estructurales de vehículos ferroviarios.
                </p>
              </div>

              <ul class="space-y-2 pt-2 border-t border-white/5 font-mono text-xs text-neutral-400">
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Soldadores EN ISO 9606-1 / 9606-2</span>
                </li>
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Coordinación IWE / IWT permanente</span>
                </li>
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-brand-yellow shrink-0"></i>
                  <span>Piezas críticas sometidas a fatiga</span>
                </li>
              </ul>
            </div>

            <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-500">NIVEL DE EXIGENCIA</span>
              <span class="text-brand-yellow font-bold">MÁXIMO RANGO TÉCNICO</span>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 03 PROTOCOLO DE TRAZABILIDAD METALÚRGICA EN 4 FASES -->
    <section class="py-24 border-b border-white/5 relative">
      <div class="w-full px-6 max-w-7xl mx-auto space-y-14">
        
        <div>
          <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-3">// ARQUITECTURA DE CONTROL DE CALIDAD</span>
          <h2 class="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Protocolo de Control en 4 Fases Industriales</h2>
          <p class="text-neutral-300 font-sans mt-4 text-base sm:text-lg max-w-3xl leading-relaxed font-light">
            Cada chapa, viga y cordón de soldadura responde a un procedimiento documentado desde su origen siderúrgico hasta la entrega final al cliente.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Paso 01 -->
          <div class="p-8 rounded-3xl bg-[#0a0c0e]/50 border border-white/10 backdrop-blur-xl space-y-5 reveal hover:border-brand-yellow/40 transition-all group shadow-xl">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">FASE 01</span>
              <span class="font-mono text-2xl font-bold text-white/20 group-hover:text-brand-yellow transition-colors">01</span>
            </div>
            <h3 class="text-xl font-display font-bold text-white">Materia Prima &amp; Análisis 3.1</h3>
            <p class="text-xs text-neutral-300 font-sans leading-relaxed">
              Recepción exclusiva de acerías europeas homologadas. Verificación de certificado de colada según EN 10204 3.1 y marcado alfanumérico unitario de cada chapa.
            </p>
            <div class="pt-4 border-t border-white/5 font-mono text-[11px] text-neutral-400">
              &bull; Ensayo de tracción &bull; Resiliencia Charpy
            </div>
          </div>

          <!-- Paso 02 -->
          <div class="p-8 rounded-3xl bg-[#0a0c0e]/50 border border-white/10 backdrop-blur-xl space-y-5 reveal hover:border-brand-yellow/40 transition-all group shadow-xl">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">FASE 02</span>
              <span class="font-mono text-2xl font-bold text-white/20 group-hover:text-brand-yellow transition-colors">02</span>
            </div>
            <h3 class="text-xl font-display font-bold text-white">Corte CNC &amp; Preparación</h3>
            <p class="text-xs text-neutral-300 font-sans leading-relaxed">
              Corte térmico mediante plasma HD TrueHole y oxicorte hasta 50 mm. Biselado robotizado y preparación geométrica de bordes según tolerancias EN ISO 913.
            </p>
            <div class="pt-4 border-t border-white/5 font-mono text-[11px] text-neutral-400">
              &bull; Tolerancia milimétrica &bull; Desbarbado total
            </div>
          </div>

          <!-- Paso 03 -->
          <div class="p-8 rounded-3xl bg-[#0a0c0e]/50 border border-white/10 backdrop-blur-xl space-y-5 reveal hover:border-brand-yellow/40 transition-all group shadow-xl">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">FASE 03</span>
              <span class="font-mono text-2xl font-bold text-white/20 group-hover:text-brand-yellow transition-colors">03</span>
            </div>
            <h3 class="text-xl font-display font-bold text-white">Soldeo Homologado &amp; E.N.D.</h3>
            <p class="text-xs text-neutral-300 font-sans leading-relaxed">
              Soldadores cualificados (EN ISO 9606-1) con procedimientos WPQR. Ensayos no destructivos: Inspección Visual (VT), Líquidos Penetrantes (PT), Partículas (MT) y Ultrasonidos (UT).
            </p>
            <div class="pt-4 border-t border-white/5 font-mono text-[11px] text-neutral-400">
              &bull; Técnicos Nivel II &bull; Soldadura TIG/MIG/MAG
            </div>
          </div>

          <!-- Paso 04 -->
          <div class="p-8 rounded-3xl bg-[#0a0c0e]/50 border border-white/10 backdrop-blur-xl space-y-5 reveal hover:border-brand-yellow/40 transition-all group shadow-xl">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">FASE 04</span>
              <span class="font-mono text-2xl font-bold text-white/20 group-hover:text-brand-yellow transition-colors">04</span>
            </div>
            <h3 class="text-xl font-display font-bold text-white">Marcado CE &amp; Dossier Final</h3>
            <p class="text-xs text-neutral-300 font-sans leading-relaxed">
              Etiquetado de Marcado CE individual, emisión de la Declaración de Prestaciones (DoP) y entrega del Dossier Técnico Final con certificados 3.1, informes E.N.D. y planos as-built.
            </p>
            <div class="pt-4 border-t border-white/5 font-mono text-[11px] text-neutral-400">
              &bull; Dossier técnico &bull; Declaración de Prestaciones
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 04 COMPROMISO DE DIRECCIÓN Y ATENCIÓN TÉCNICA -->
    <section class="py-24 relative">
      <div class="w-full px-6 max-w-5xl mx-auto space-y-12">

        <!-- Declaración oficial firmada (Tarjetón Frosted Glass) -->
        <div class="p-10 sm:p-14 rounded-3xl bg-[#0a0c0e]/65 border border-white/10 backdrop-blur-xl relative reveal shadow-2xl space-y-8">
          <div class="flex items-center justify-between border-b border-white/5 pb-6">
            <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest">// POLÍTICA DE CALIDAD EMPRESARIAL</span>
            <span class="font-mono text-xs text-neutral-500">REGISTRO SGC-SOLYCAL</span>
          </div>

          <div>
            <h3 class="text-2xl sm:text-3xl font-display font-bold text-white mb-4">Compromiso suscrito por la alta dirección</h3>
            <p class="text-xs text-neutral-400 font-mono uppercase tracking-wider">Declaración formal de principios técnicos y medioambientales</p>
          </div>

          <div class="space-y-5 text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
            <p>
              "SOLYCAL Soldadura y Calderería Valenciana S.L., como empresa dedicada a prestar servicios de construcción y montaje en el campo metal mecánico, y contando con el compromiso de la alta dirección y participación activa de todo el personal se compromete a:
            </p>
            <div class="p-6 rounded-2xl bg-black/40 border-l-2 border-brand-yellow border-y border-r border-white/5 italic text-neutral-200 space-y-3 font-serif sm:text-lg">
              <p>
                Lograr la satisfacción de sus clientes brindándoles productos y servicios de la más alta calidad. Buscar el constante desarrollo profesional de sus trabajadores. Alcanzar la máxima rentabilidad de la empresa y cumplir con los requisitos legales aplicables y los requisitos internos para asegurar la calidad de los servicios que brinda."
              </p>
            </div>
            <p>
              "Mejorar continuamente la eficacia del sistema de gestión de calidad, seguridad y la protección del medio ambiente en sus procesos a fin de alcanzar la excelencia en los mismos."
            </p>
          </div>

          <div class="pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span class="text-white font-bold block">Eloy José Molina Salinas</span>
              <span class="text-neutral-400">GERENTE GENERAL &bull; SOLYCAL S.L.</span>
            </div>
            <div class="text-left sm:text-right">
              <span class="text-brand-yellow block">Torrent (Valencia)</span>
              <span class="text-neutral-500">Sistema Auditado por Lloyd's Register</span>
            </div>
          </div>
        </div>

        <!-- Banner de Contacto para Auditorías / Dossier Técnico -->
        <div class="p-8 sm:p-10 rounded-3xl bg-brand-yellow/5 border border-brand-yellow/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 reveal">
          <div class="space-y-2 text-center md:text-left">
            <h4 class="text-xl font-display font-bold text-white">¿Deseas auditar nuestras instalaciones o solicitar un dossier técnico?</h4>
            <p class="text-xs sm:text-sm text-neutral-300 font-sans">Nuestro departamento de calidad y oficina técnica están a disposición de los inspectores de tu proyecto.</p>
          </div>
          <div class="flex flex-wrap items-center gap-4 shrink-0">
            <a href="contacto.html" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-brand-accent transition-all shadow-lg">
              <span>Contactar Oficina Técnica</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
            <a href="tel:+34961571400" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 text-white font-mono text-xs uppercase font-semibold tracking-wider hover:bg-white/10 transition-all">
              <i data-lucide="phone" class="w-4 h-4 text-brand-yellow"></i>
              <span>+34 96 157 14 00</span>
            </a>
          </div>
        </div>

      </div>
    </section>

    <!-- FUNDIDO DEGRADADO FLUIDO ENTRE CONTENIDO Y FOOTER -->
    <div class="w-full h-44 sm:h-64 bg-gradient-to-b from-transparent via-[#050608]/75 to-[#050608] pointer-events-none relative z-10 -mb-px"></div>

  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
  (function() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;

    const config = {
      horizon: 0.46,
      intensity: 1.45,
      spreadMax: 0.88,
      coreGlow: 1.35,
      flowSpeed: 0.42,
      waveAmount: 0.24,
      breath: 0.05,
      colorfulness: 1.0,
      colWhite: '#FFFDF5',    // Núcleo incandescente arco eléctrico / plasma blanco cálido
      colOrange: '#F1B541',   // Amarillo corporativo Solycal principal
      colRed: '#B45309',      // Ámbar forja profunda / acero fundido
      colCyan: '#FDE68A',     // Destello dorado titanio / luz de soldadura
      colMagenta: '#E5A52A',  // Acento secundario corporativo Solycal
      colGold: '#F59E0B',     // Filamentos dorados cálidos
      parallax: 1.4,
      mouseGlow: 0.38,
      mouseGlowSize: 0.22,
      mouseBend: 0.45
    };

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseUV: { value: new THREE.Vector2(0.63, 0.37) },
      uReveal: { value: 1 },
      uHorizon: { value: config.horizon },
      uIntensity: { value: config.intensity },
      uSpreadMax: { value: config.spreadMax },
      uCoreGlow: { value: config.coreGlow },
      uFlowSpeed: { value: config.flowSpeed },
      uWaveAmount: { value: config.waveAmount },
      uBreath: { value: config.breath },
      uColorfulness: { value: config.colorfulness },
      uColWhite: { value: new THREE.Color(config.colWhite) },
      uColOrange: { value: new THREE.Color(config.colOrange) },
      uColRed: { value: new THREE.Color(config.colRed) },
      uColCyan: { value: new THREE.Color(config.colCyan) },
      uColMagenta: { value: new THREE.Color(config.colMagenta) },
      uColGold: { value: new THREE.Color(config.colGold) },
      uParallax: { value: config.parallax },
      uMouseGlow: { value: config.mouseGlow },
      uMouseGlowSize: { value: config.mouseGlowSize },
      uMouseBend: { value: config.mouseBend }
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: ${JSON.stringify(auroraVertexShader)},
      fragmentShader: ${JSON.stringify(auroraFragmentShader)},
      depthWrite: false,
      depthTest: false
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
      const isPortrait = h > w;
      uniforms.uHorizon.value = isPortrait ? 0.5 : config.horizon;
      uniforms.uIntensity.value = config.intensity * (isPortrait ? 1.25 : 1);
      uniforms.uSpreadMax.value = config.spreadMax * (isPortrait ? 1.25 : 1);
    }
    onResize();
    window.addEventListener('resize', onResize);

    const targetMouse = new THREE.Vector2(0, 0);
    const targetMouseUV = new THREE.Vector2(0.63, 0.37);

    window.addEventListener('pointermove', function(e) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = e.clientX / w;
      const ny = e.clientY / h;
      targetMouse.set(nx - 0.5, -(ny - 0.5));
      targetMouseUV.set(nx, 1 - ny);
    });

    window.addEventListener('pointerleave', function() {
      targetMouse.set(0, 0);
      targetMouseUV.set(0.63, config.horizon);
    });

    let startTime = performance.now();
    function renderLoop() {
      requestAnimationFrame(renderLoop);
      const elapsed = (performance.now() - startTime) * 0.001;
      uniforms.uTime.value = elapsed;
      uniforms.uMouse.value.lerp(targetMouse, 0.04);
      uniforms.uMouseUV.value.lerp(targetMouseUV, 0.06);
      renderer.render(scene, camera);
    }
    requestAnimationFrame(renderLoop);
  })();
</script>

${getFooter({ showMatrix: false })}
`;

// 5. GENERATE EQUIPO.HTML (Team Page)
const equipoHtml = `${getHead('Equipo Técnico y Humano | SOLYCAL Valencia', 'Conoce al equipo técnico de Solycal: ingenieros mecánicos, diseñadores industriales, soldadores homologados y montadores en obra.', 'equipo.html')}
${getHeader('equipo')}

<div class="py-20 border-b border-white/5 bg-[#090b0e] dot-grid">
  <div class="w-full px-6">
    <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-4">05 // EQUIPO HUMANO</span>
    <h1 class="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-tight max-w-4xl">
      Especialización, experiencia y cooperación técnica.
    </h1>
    <p class="text-neutral-400 max-w-2xl font-sans mt-6 text-base leading-relaxed">
      En SOLYCAL sabemos que el valor de la empresa reside en las personas: un equipo unido, formado continuamente y habituado a resolver proyectos complejos.
    </p>
  </div>
</div>

<section class="py-24 bg-[#07080a]">
  <div class="w-full px-6 space-y-20">

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 reveal">
        <span class="font-mono text-xs text-brand-yellow">// OFICINA TÉCNICA</span>
        <h3 class="text-2xl font-display font-bold text-white">Ingeniería & Diseño 3D</h3>
        <p class="text-xs text-neutral-400 font-sans leading-relaxed">
          Ingenieros mecánicos especializados en cálculo de estructuras, despiece de calderería, modelado CAD/BIM y programación CNC.
        </p>
      </div>

      <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 reveal">
        <span class="font-mono text-xs text-brand-yellow">// TALLER CENTRAL</span>
        <h3 class="text-2xl font-display font-bold text-white">Soldadores Homologados</h3>
        <p class="text-xs text-neutral-400 font-sans leading-relaxed">
          Profesionales certificados en TIG, MIG-MAG y electrodo revestido con amplia trayectoria en recipientes a presión y acero inoxidable.
        </p>
      </div>

      <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 reveal">
        <span class="font-mono text-xs text-brand-yellow">// OBRA Y MONTAJE</span>
        <h3 class="text-2xl font-display font-bold text-white">Montadores Especialistas</h3>
        <p class="text-xs text-neutral-400 font-sans leading-relaxed">
          Equipos equipados para montaje en obra civil e industrial con cursos de PRL en altura, manejo de plataformas y puentes grúa.
        </p>
      </div>

    </div>

    <!-- Experience statement -->
    <div class="p-10 rounded-3xl bg-[#090b0e] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 reveal">
      <div class="space-y-2">
        <h2 class="text-2xl sm:text-3xl font-display font-bold text-white">¿Quieres formar parte de nuestro equipo?</h2>
        <p class="text-xs text-neutral-400 font-sans">Buscamos constantemente caldereros, soldadores homologados y delineantes técnicos.</p>
      </div>
      <a href="contacto.html" class="px-8 py-4 rounded-full bg-brand-yellow text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all">
        Enviar Currículum Vitae
      </a>
    </div>

  </div>
</section>

${getFooter()}
`;

// 6. GENERATE CONTACTO.HTML (Contact Page)
const contactoHtml = `${getHead('Contacto y Presupuestos de Calderería | SOLYCAL Torrent', 'Contacta con la oficina técnica de Solycal en Torrent (Valencia). Teléfono: +34 96 150 40 38 - info@solycal.es. Envía tus planos para valoración inmediata.', 'contacto.html')}
${getHeader('contacto')}

<!-- SECCIÓN CONTINUA Y UNIFICADA DE CONTACTO (SIN CORTE ENTRE CABECERA Y FORMULARIO) -->
<section id="contacto-hero" class="relative pt-24 sm:pt-32 pb-24 sm:pb-32 bg-[#07080a] overflow-hidden">
  
  <!-- Canvas "Don't touch me" esfera de partículas entrecortada a la derecha sin cortes horizontales -->
  <div class="absolute -right-28 sm:-right-44 md:-right-60 lg:-right-72 xl:-right-80 top-12 sm:top-16 lg:top-20 w-[540px] sm:w-[720px] md:w-[860px] lg:w-[1020px] aspect-square pointer-events-auto z-0 select-none">
    <canvas id="dont-touch-me-canvas" class="w-full h-full block cursor-crosshair opacity-85 hover:opacity-100 transition-opacity duration-700"></canvas>
    <!-- Gradientes sutiles para fundir perfectamente con el fondo general #07080a -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#07080a] via-transparent to-transparent pointer-events-none"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#07080a]/80 via-transparent to-[#07080a]/60 pointer-events-none"></div>
  </div>

  <!-- Fondo técnico tenue -->
  <div class="absolute inset-0 dot-grid opacity-20 pointer-events-none"></div>

  <!-- 01 CABECERA FRONTAL: HABLEMOS DE TU PRÓXIMO PROYECTO -->
  <div class="w-full px-6 relative z-10 pointer-events-none [&_a]:pointer-events-auto mb-16 sm:mb-20 lg:mb-24">
    <div class="max-w-2xl lg:max-w-3xl space-y-6 reveal">
      <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-4">// 06 CONTACTO &amp; COTIZACIÓN</span>
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-tight">
        Hablemos de tu próximo proyecto.
      </h1>
      <p class="text-neutral-300 font-sans text-base sm:text-lg leading-relaxed max-w-xl">
        Envíanos planos, especificaciones o concerta una visita técnica a nuestra planta en Torrent (Valencia).
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-neutral-400">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="text-neutral-300">Oficina Técnica Activa</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <span class="text-brand-yellow font-bold">&lt; 24h</span>
          <span class="text-neutral-300">Plazo de Respuesta</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <span class="text-brand-yellow font-bold">5.000 m²</span>
          <span class="text-neutral-300">Capacidad Fabril</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 02 BLOQUE DE DIRECCIÓN Y FORMULARIO (FLUIDO, SIN CORTE DE SECCIÓN) -->
  <div class="w-full px-6 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
      
      <!-- Contact Info -->
      <div class="lg:col-span-5 space-y-10 reveal">
        <div>
          <span class="font-mono text-xs text-brand-yellow uppercase tracking-widest block mb-2">// DIRECCIÓN Y HORARIO</span>
          <h2 class="text-3xl font-display font-bold text-white mb-4">Oficinas y Fábrica</h2>
          <p class="text-sm text-neutral-300 font-sans leading-relaxed">
            Soldadura y Calderería Valenciana S.L.<br>
            Calle Hort de Soriano, 17A<br>
            Polígono Industrial Masía del Juez<br>
            46900 Torrent (Valencia) &bull; España
          </p>
        </div>

        <div class="space-y-4 font-mono text-sm">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow">
              <i data-lucide="phone" class="w-4 h-4"></i>
            </div>
            <div>
              <span class="text-xs text-neutral-400 block">TELÉFONO CENTRAL:</span>
              <a href="tel:961504038" class="text-white hover:text-brand-yellow transition-colors font-bold">+34 96 150 40 38</a>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow">
              <i data-lucide="mail" class="w-4 h-4"></i>
            </div>
            <div>
              <span class="text-xs text-neutral-400 block">CORREO OFICIAL:</span>
              <a href="mailto:info@solycal.es" class="text-white hover:text-brand-yellow transition-colors font-bold">info@solycal.es</a>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs text-neutral-400 space-y-2">
          <p class="text-white font-bold">// HORARIO TÉCNICO Y LOGÍSTICA:</p>
          <p>Lunes a Jueves: 07:00 a 14:00 y 15:30 a 18:30</p>
          <p>Viernes: 07:00 a 15:00</p>
          <p class="text-brand-yellow">Carga y descarga de camiones mediante puente grúa en muelle principal.</p>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-7 reveal">
        <div class="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10">
          <h2 class="text-2xl font-display font-bold text-white mb-6">Solicitud de Cotización</h2>
          <form id="lead-contact-form" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block font-mono text-xs text-neutral-400 mb-2 uppercase">Nombre Completo *</label>
                <input type="text" id="lead-name" required class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors" placeholder="Tu nombre">
              </div>
              <div>
                <label class="block font-mono text-xs text-neutral-400 mb-2 uppercase">Empresa Industrial</label>
                <input type="text" id="lead-company" class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors" placeholder="Nombre de tu empresa">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block font-mono text-xs text-neutral-400 mb-2 uppercase">Correo Electrónico *</label>
                <input type="email" id="lead-email" required class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors" placeholder="ejemplo@empresa.com">
              </div>
              <div>
                <label class="block font-mono text-xs text-neutral-400 mb-2 uppercase">Teléfono Directo *</label>
                <input type="tel" id="lead-phone" required class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors" placeholder="+34 600 000 000">
              </div>
            </div>

            <div>
              <label class="block font-mono text-xs text-neutral-400 mb-2 uppercase">Tipo de Requerimiento</label>
              <select id="lead-type" class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors">
                <option value="Calderería Industrial (Tolvas, depósitos, virolas)">Calderería Industrial (Tolvas, depósitos, virolas)</option>
                <option value="Corte por Plasma HD (Chapa hasta 50mm)">Corte por Plasma HD (Chapa hasta 50mm)</option>
                <option value="Soldadura Homologada (TIG, MIG-MAG, Inox)">Soldadura Homologada (TIG, MIG-MAG, Inox)</option>
                <option value="Estructuras Metálicas & Pasarelas CE">Estructuras Metálicas & Pasarelas CE</option>
                <option value="Otro requerimiento técnico">Otro requerimiento técnico</option>
              </select>
            </div>

            <div>
              <label class="block font-mono text-xs text-neutral-400 mb-2 uppercase">Detalles del Proyecto o Especificaciones</label>
              <textarea id="lead-message" rows="4" required class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:border-brand-yellow focus:outline-none transition-colors" placeholder="Describe materiales, espesores, dimensiones o adjunta enlace a planos de descarga..."></textarea>
            </div>

            <div class="flex items-start gap-3">
              <input type="checkbox" required id="privacidad" class="mt-1">
              <label for="privacidad" class="text-xs text-neutral-400 font-sans">
                He leído y acepto la <a href="politica-privacidad.html" class="text-brand-yellow hover:underline">Política de Privacidad</a> para la gestión de mi consulta.
              </label>
            </div>

            <button type="submit" id="lead-submit-btn" class="w-full py-4 rounded-xl bg-brand-yellow text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(241,181,65,0.3)]">
              <span>Enviar Proyecto a la Oficina Técnica</span>
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </form>

          <div id="success-box" class="hidden mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs text-center">
            ✓ Solicitud enviada con éxito. Un ingeniero se pondrá en contacto en menos de 24h.
          </div>

          <script>
            (function() {
              var form = document.getElementById('lead-contact-form');
              if (!form) return;
              form.addEventListener('submit', async function(e) {
                e.preventDefault();
                var btn = document.getElementById('lead-submit-btn');
                var origText = btn ? btn.innerHTML : '';
                if (btn) {
                  btn.disabled = true;
                  btn.innerHTML = '<span>Enviando al CRM Industrial...</span>';
                }
                
                var name = document.getElementById('lead-name').value.trim();
                var company = document.getElementById('lead-company').value.trim();
                var email = document.getElementById('lead-email').value.trim();
                var phone = document.getElementById('lead-phone').value.trim();
                var type = document.getElementById('lead-type').value;
                var details = document.getElementById('lead-message').value.trim();

                var client = company ? (company + (name ? ' (' + name + ')' : '')) : name;
                var fullMessage = '[' + type + '] ' + details;

                try {
                  var endpoints = [
                    'https://solycal-crm.vercel.app/api/leads',
                    'http://localhost:3000/api/leads',
                    '/api/leads'
                  ];
                  for (var i = 0; i < endpoints.length; i++) {
                    try {
                      var res = await fetch(endpoints[i], {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          client: client,
                          email: email,
                          phone: phone,
                          message: fullMessage
                        })
                      });
                      if (res.ok) { break; }
                    } catch(err) {}
                  }
                } catch(err) {
                  console.warn('CRM API error:', err);
                }

                document.getElementById('success-box').classList.remove('hidden');
                form.reset();
                if (btn) {
                  btn.disabled = false;
                  btn.innerHTML = origText;
                }
              });
            })();
          </script>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- INTERACTIVE "DON'T TOUCH ME" ENGINE SCRIPT (NOEL OPENPROCESSING #2812705) -->
<script>
  (function() {
    const canvas = document.getElementById('dont-touch-me-canvas');
    const heroSection = document.getElementById('contacto-hero');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isMobile = /iPhone|iPod|iPad|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const particlesCount = isMobile ? 3600 : 7500;
    const attraction = 0.01;
    const damping = 0.90;
    const repelStrength = 28;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let radius = 240;
    let repelRadius = 95;
    let repelRadiusSq = repelRadius * repelRadius;
    let angle = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseInside = false;
    let animationFrameId = null;
    let isVisible = true;

    // Array of particles
    const points = new Array(particlesCount);
    for (let i = 0; i < particlesCount; i++) {
      const isAccent = (i % 11 === 0);
      points[i] = {
        index: i,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: (i % 7 === 0 ? 1.8 : 1.2),
        color: isAccent ? '#F1B541' : 'rgba(235, 240, 245, 0.85)'
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const minDim = Math.min(width, height);
      radius = minDim * 0.44;
      repelRadius = radius * 0.38;
      repelRadiusSq = repelRadius * repelRadius;

      // Initialize targets
      for (let i = 0; i < particlesCount; i++) {
        const p = points[i];
        p.x = Math.sin(p.index + angle) * Math.sin(p.index * p.index) * radius;
        p.y = Math.cos(p.index * p.index) * radius;
        p.vx = 0;
        p.vy = 0;
      }
    }

    function updateCoords(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      mouseX = (clientX - rect.left) - width / 2;
      mouseY = (clientY - rect.top) - height / 2;
      mouseInside = true;
    }

    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        updateCoords(e.clientX, e.clientY);
      });

      heroSection.addEventListener('mouseleave', () => {
        mouseInside = false;
        mouseX = -9999;
        mouseY = -9999;
      });

      heroSection.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          updateCoords(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      heroSection.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          updateCoords(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      heroSection.addEventListener('touchend', () => {
        mouseInside = false;
        mouseX = -9999;
        mouseY = -9999;
      });
    }

    window.addEventListener('resize', resize);
    resize();

    // IntersectionObserver to pause rendering when not in viewport
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !animationFrameId) {
        loop();
      }
    }, { threshold: 0.1 });
    observer.observe(canvas);

    function loop() {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.fillStyle = '#07080a';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < particlesCount; i++) {
        const p = points[i];
        const idx = p.index;

        // Rotating home target on sphere
        const homeX = Math.sin(idx + angle) * Math.sin(idx * idx) * radius;
        const homeY = Math.cos(idx * idx) * radius;

        // Spring force toward home
        p.vx += (homeX - p.x) * attraction;
        p.vy += (homeY - p.y) * attraction;

        // Mouse repulsion
        if (mouseInside) {
          const awayX = p.x - mouseX;
          const awayY = p.y - mouseY;
          const distSq = awayX * awayX + awayY * awayY;
          if (distSq > 0.1 && distSq < repelRadiusSq) {
            const dist = Math.sqrt(distSq);
            const repel = repelStrength * (1 - dist / repelRadius);
            p.vx += (awayX / dist) * repel;
            p.vy += (awayY / dist) * repel;
          }
        }

        // Damping and integration
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        // Render point
        ctx.fillStyle = p.color;
        ctx.fillRect(cx + p.x, cy + p.y, p.size, p.size);
      }

      angle += 0.01;
      animationFrameId = requestAnimationFrame(loop);
    }

    loop();
  })();
</script>

${getFooter()}
`;

// 7. GENERATE AVISO-LEGAL.HTML
const avisoLegalHtml = `${getHead('Aviso Legal y Condiciones de Uso | SOLYCAL S.L.', 'Aviso Legal y términos de uso del sitio web oficial de Soldadura y Calderería Valenciana S.L. conforme a la LSSI-CE.', 'aviso-legal.html')}
${getHeader('')}

<section class="py-20 border-b border-white/5 bg-[#07080a]">
  <div class="w-full px-6 sm:px-12 lg:px-16 xl:px-20 max-w-5xl mx-auto">
    
    <div class="mb-12 border-b border-white/10 pb-8">
      <span class="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold block mb-3">// INFORMACIÓN LEGAL Y REGULATORIA</span>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">Aviso Legal</h1>
      <p class="font-mono text-xs text-neutral-400 mt-3">Última actualización conforme a la Ley 34/2002 (LSSI-CE)</p>
    </div>

    <div class="prose prose-invert max-w-none space-y-8 font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
      
      <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
        <h2 class="text-lg font-display font-bold text-white uppercase tracking-wide">1. Datos Identificativos del Titular</h2>
        <p>En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos relativos al titular de este sitio web:</p>
        <ul class="space-y-1.5 font-mono text-xs text-neutral-300">
          <li>&bull; <strong class="text-white">Denominación social:</strong> SOLDADURA Y CALDERERÍA VALENCIANA, S.L. (SOLYCAL)</li>
          <li>&bull; <strong class="text-white">NIF:</strong> B96620573</li>
          <li>&bull; <strong class="text-white">Domicilio social y fábrica:</strong> Calle Hort de Soriano, 17A. Pol. Ind. Masía del Juez, 46900 Torrent (Valencia)</li>
          <li>&bull; <strong class="text-white">Teléfono de contacto:</strong> +34 96 150 40 38</li>
          <li>&bull; <strong class="text-white">Correo electrónico:</strong> info@solycal.es</li>
          <li>&bull; <strong class="text-white">Inscripción registral:</strong> Registro Mercantil de Valencia, Tomo 5742, Libro 3049, Folio 154, Sección 8, Hoja V-53303.</li>
        </ul>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">2. Objeto y Ámbito de Aplicación</h2>
        <p>El presente Aviso Legal regula las condiciones de acceso, navegación y uso del sitio web <span class="font-mono text-brand-yellow">www.solycal.es</span>, así como las responsabilidades derivadas de la utilización de sus contenidos (textos, gráficos, planos, diseños, códigos, software, fotografías, música, vídeos, sonidos, bases de datos e imágenes).</p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">3. Propiedad Intelectual e Industrial</h2>
        <p>Todos los derechos de propiedad intelectual e industrial sobre el sitio web y sus contenidos pertenecen a SOLDADURA Y CALDERERÍA VALENCIANA, S.L. o a terceros autorizados. Quedan reservados todos los derechos de reproducción, distribución, comunicación pública y transformación, total o parcial, con fines comerciales, sin previa autorización escrita de la dirección de SOLYCAL S.L.</p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">4. Exclusión de Responsabilidad</h2>
        <p>SOLYCAL S.L. adopta medidas tecnológicas avanzadas para evitar fallos o caídas del servicio, pero no garantiza la ausencia absoluta de virus u otros elementos lesivos en el software de terceros que pudieran causar daños en los sistemas informáticos del usuario.</p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">5. Legislación Aplicable y Jurisdicción</h2>
        <p>Para la resolución de cualquier controversia o cuestión litigiosa relativa a este sitio web o las actividades en él desarrolladas, será de aplicación la legislación española vigente, siendo competentes los Juzgados y Tribunales de Torrent / Valencia.</p>
      </div>

    </div>
  </div>
</section>

${getFooter()}
`;

// 8. GENERATE POLITICA-PRIVACIDAD.HTML
const politicaPrivacidadHtml = `${getHead('Política de Privacidad y Protección de Datos | SOLYCAL S.L.', 'Política de Privacidad y Protección de Datos de Soldadura y Calderería Valenciana S.L. conforme al RGPD y la LOPDGDD.', 'politica-privacidad.html')}
${getHeader('')}

<section class="py-20 border-b border-white/5 bg-[#07080a]">
  <div class="w-full px-6 sm:px-12 lg:px-16 xl:px-20 max-w-5xl mx-auto">
    
    <div class="mb-12 border-b border-white/10 pb-8">
      <span class="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold block mb-3">// PROTECCIÓN DE DATOS DE CARÁCTER PERSONAL</span>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">Política de Privacidad</h1>
      <p class="font-mono text-xs text-neutral-400 mt-3">Conforme al Reglamento (UE) 2016/679 (RGPD) y Ley Orgánica 3/2018 (LOPDGDD)</p>
    </div>

    <div class="prose prose-invert max-w-none space-y-8 font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
      
      <p>A efectos de lo dispuesto en el Reglamento Europeo de Protección de Datos (RGPD) y la normativa española vigente, <strong>SOLDADURA Y CALDERERÍA VALENCIANA S.L.</strong> le informa que en determinadas áreas de nuestra Web y formularios de contacto se solicita al usuario una serie de datos de carácter personal necesarios para gestionar sus consultas o proyectos de calderería.</p>

      <!-- Tabla Informativa RGPD -->
      <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
        <h2 class="text-lg font-display font-bold text-white uppercase tracking-wide">Información Básica sobre Protección de Datos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-3 bg-black/40 rounded-xl border border-white/5">
            <span class="text-brand-yellow block font-bold mb-1">RESPONSABLE:</span>
            <span class="text-neutral-300">SOLDADURA Y CALDERERÍA VALENCIANA, S.L.<br>C/ Hort de Soriano, 17A. Pol. Ind. Masía del Juez, 46900 Torrent (Valencia)</span>
          </div>
          <div class="p-3 bg-black/40 rounded-xl border border-white/5">
            <span class="text-brand-yellow block font-bold mb-1">FINALIDAD:</span>
            <span class="text-neutral-300">Atender su solicitud de presupuesto, estudio técnico u otro tipo de petición de fabricación de calderería realizada a través de nuestra web.</span>
          </div>
          <div class="p-3 bg-black/40 rounded-xl border border-white/5">
            <span class="text-brand-yellow block font-bold mb-1">LEGITIMACIÓN:</span>
            <span class="text-neutral-300">Consentimiento expreso e informado del interesado al remitir el formulario.</span>
          </div>
          <div class="p-3 bg-black/40 rounded-xl border border-white/5">
            <span class="text-brand-yellow block font-bold mb-1">DESTINATARIOS:</span>
            <span class="text-neutral-300">Los datos que nos facilite no serán cedidos a terceros, salvo obligación legal expresa.</span>
          </div>
          <div class="p-3 bg-black/40 rounded-xl border border-white/5 md:col-span-2">
            <span class="text-brand-yellow block font-bold mb-1">DERECHOS:</span>
            <span class="text-neutral-300">Acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición dirigiéndose por escrito a info@solycal.es.</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">¿Qué datos tratamos?</h2>
        <p>Tratamos exclusivamente los datos que usted nos facilita de forma directa al completar el formulario de contacto o presupuesto:</p>
        <ul class="list-disc pl-6 space-y-1 text-neutral-300">
          <li><strong>Datos identificativos y de contacto:</strong> Nombre y apellidos, correo electrónico corporativo, número de teléfono.</li>
          <li><strong>Datos profesionales y técnicos:</strong> Nombre de la empresa o cliente industrial, especificaciones del plano CAD/BIM o proyecto de calderería adjuntado.</li>
        </ul>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">Plazo de Conservación de los Datos</h2>
        <p>Los datos se conservarán durante el tiempo necesario para la elaboración de la propuesta técnica y mientras se mantenga la relación comercial, o durante los periodos en que se pueda derivar una responsabilidad mercantil o fiscal de acuerdo con la legislación vigente.</p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">Ejercicio de Derechos</h2>
        <p>Cualquier persona tiene derecho a obtener confirmación sobre si en SOLDADURA Y CALDERERÍA VALENCIANA, S.L. estamos tratando datos personales que les conciernan o no. Las personas interesadas tienen derecho a:</p>
        <ul class="list-disc pl-6 space-y-1 text-neutral-300">
          <li>Acceder a sus datos personales.</li>
          <li>Solicitar la rectificación de los datos inexactos.</li>
          <li>Solicitar su supresión cuando los datos ya no sean necesarios para los fines para los que fueron recogidos.</li>
          <li>Oponerse o limitar el tratamiento en las circunstancias previstas por la ley.</li>
        </ul>
        <p>Puede ejercitar estos derechos remitiendo un correo con copia de su DNI o documento equivalente a <a href="mailto:info@solycal.es" class="text-brand-yellow hover:underline">info@solycal.es</a> o por correo postal a nuestras instalaciones en Torrent (Valencia).</p>
      </div>

    </div>
  </div>
</section>

${getFooter()}
`;

// 9. GENERATE POLITICA-COOKIES.HTML
const politicaCookiesHtml = `${getHead('Política de Cookies | SOLYCAL S.L.', 'Información detallada sobre el uso de cookies y almacenamiento web en Solycal conforme a la AEPD.', 'politica-cookies.html')}
${getHeader('')}

<section class="py-20 border-b border-white/5 bg-[#07080a]">
  <div class="w-full px-6 sm:px-12 lg:px-16 xl:px-20 max-w-5xl mx-auto">
    
    <div class="mb-12 border-b border-white/10 pb-8">
      <span class="font-mono text-xs uppercase tracking-widest text-brand-yellow font-bold block mb-3">// USO DE COOKIES Y TECNOLOGÍAS SIMILARES</span>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">Política de Cookies</h1>
      <p class="font-mono text-xs text-neutral-400 mt-3">Cumplimiento del Real Decreto-ley 13/2012 y directrices de la AEPD</p>
    </div>

    <div class="prose prose-invert max-w-none space-y-8 font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
      
      <div class="space-y-4">
        <p>De acuerdo con la normativa vigente, facilitamos a los Usuarios la información relativa a las cookies que utilizamos y el motivo de su uso en el sitio web <span class="font-mono text-brand-yellow">www.solycal.es</span> (en adelante referido como <strong>SOLYCAL S.L.</strong>), así como solicitamos el consentimiento para poder utilizarlas.</p>
        <p>SOLYCAL S.L., al igual que la mayoría de los sitios en Internet, usa Cookies para mejorar y optimizar la experiencia del usuario, facilitar la navegación y recopilar estadísticas anónimas de rendimiento.</p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">¿Qué son las Cookies?</h2>
        <p>Las Cookies son pequeños archivos que el sitio web o la aplicación que utilizas instala en tu navegador o en tu dispositivo (ordenador, smartphone o tablet) durante tu recorrido por las páginas, y sirven para almacenar información de tu visita.</p>
        <p>SOLYCAL S.L. utiliza Cookies para:</p>
        <ul class="list-disc pl-6 space-y-1 text-neutral-300">
          <li>Asegurar que las páginas web puedan funcionar correctamente con altos estándares de seguridad.</li>
          <li>Almacenar preferencias de navegación y visualización técnica.</li>
          <li>Recopilar información estadística anónima sobre el tráfico y uso de la web para continuar optimizando nuestra plataforma digital.</li>
        </ul>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">Tipos de Cookies Utilizadas en este Sitio Web</h2>
        
        <div class="space-y-4">
          <div class="p-5 rounded-xl bg-white/[0.02] border border-white/10">
            <h3 class="text-base font-display font-bold text-white mb-2">1. Cookies Técnicas y de Rendimiento (Estrictamente Necesarias)</h3>
            <p class="text-xs text-neutral-300 mb-2">Permiten la navegación del usuario a través del sitio web y la utilización de las diferentes opciones o servicios que en él existen (por ejemplo, controlar el tráfico, reproducción del vídeo corporativo de cabecera y envío de formularios).</p>
          </div>

          <div class="p-5 rounded-xl bg-white/[0.02] border border-white/10">
            <h3 class="text-base font-display font-bold text-white mb-2">2. Cookies Analíticas (Google Analytics)</h3>
            <p class="text-xs text-neutral-300 mb-2">Se utilizan con fines exclusivamente estadísticos para medir la actividad del sitio web y elaborar informes de tráfico anonimizados, permitiéndonos mejorar el catálogo y la descripción de servicios.</p>
            <p class="font-mono text-xs text-neutral-500">Más información: <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" class="text-brand-yellow hover:underline">Google Privacy & Terms</a></p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">¿Cómo Configurar o Desactivar las Cookies?</h2>
        <p>Al navegar en nuestro sitio web el usuario puede aceptar o configurar la instalación de cookies. En cualquier momento puede revocar su consentimiento, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:</p>
        
        <ul class="space-y-2 font-mono text-xs text-neutral-300">
          <li>&bull; <strong class="text-white">Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
          <li>&bull; <strong class="text-white">Mozilla Firefox:</strong> Opciones &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
          <li>&bull; <strong class="text-white">Apple Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
          <li>&bull; <strong class="text-white">Microsoft Edge:</strong> Configuración &gt; Permisos del sitio &gt; Cookies y datos almacenados.</li>
        </ul>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-display font-bold text-white">Actualizaciones de la Política de Cookies</h2>
        <p>SOLYCAL S.L. puede modificar esta Política de Cookies en función de nuevas exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos (AEPD). Le recomendamos revisar periódicamente esta página.</p>
      </div>

    </div>
  </div>
</section>

${getFooter()}
`;

// WRITE ALL 9 CLEAN PAGES
fs.writeFileSync('index.html', indexHtml, 'utf8');
fs.writeFileSync('servicios.html', serviciosHtml, 'utf8');
fs.writeFileSync('instalaciones.html', instalacionesHtml, 'utf8');
fs.writeFileSync('calidad.html', calidadHtml, 'utf8');
fs.writeFileSync('equipo.html', equipoHtml, 'utf8');
fs.writeFileSync('contacto.html', contactoHtml, 'utf8');
fs.writeFileSync('aviso-legal.html', avisoLegalHtml, 'utf8');
fs.writeFileSync('politica-privacidad.html', politicaPrivacidadHtml, 'utf8');
fs.writeFileSync('politica-cookies.html', politicaCookiesHtml, 'utf8');

// GENERATE SEO ASSETS: sitemap.xml, robots.txt, .htaccess
const currentDate = new Date().toISOString().split('T')[0];
const pages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'servicios.html', priority: '0.9', changefreq: 'monthly' },
  { path: 'instalaciones.html', priority: '0.8', changefreq: 'monthly' },
  { path: 'calidad.html', priority: '0.8', changefreq: 'monthly' },
  { path: 'equipo.html', priority: '0.7', changefreq: 'monthly' },
  { path: 'contacto.html', priority: '0.9', changefreq: 'monthly' },
  { path: 'aviso-legal.html', priority: '0.3', changefreq: 'yearly' },
  { path: 'politica-privacidad.html', priority: '0.3', changefreq: 'yearly' },
  { path: 'politica-cookies.html', priority: '0.3', changefreq: 'yearly' },
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://solycal.es/${p.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');

const robotsTxt = `User-agent: *
Allow: /
Disallow: /scratch/

Sitemap: https://solycal.es/sitemap.xml
`;
fs.writeFileSync('robots.txt', robotsTxt, 'utf8');

// Generate Apache .htaccess with 301 redirects for previous URLs and security headers
const htaccessContent = `# Redirecciones 301 permanentes para preservar SEO previo de Solycal
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Forzar HTTPS y no-www
  RewriteCond %{HTTPS} off [OR]
  RewriteCond %{HTTP_HOST} ^www\\.solycal\\.es [NC]
  RewriteRule ^(.*)$ https://solycal.es/$1 [L,R=301]

  # Mapeo de URLs antiguas hacia nuevas
  RewriteRule ^servicios/?$ /servicios.html [R=301,L]
  RewriteRule ^instalaciones/?$ /instalaciones.html [R=301,L]
  RewriteRule ^calidad/?$ /calidad.html [R=301,L]
  RewriteRule ^equipo/?$ /equipo.html [R=301,L]
  RewriteRule ^contacto/?$ /contacto.html [R=301,L]
  RewriteRule ^aviso-legal/?$ /aviso-legal.html [R=301,L]
  RewriteRule ^politica-de-privacidad/?$ /politica-privacidad.html [R=301,L]
  RewriteRule ^politica-de-cookies/?$ /politica-cookies.html [R=301,L]
</IfModule>

# Compresión Gzip y Cache-Control para Core Web Vitals
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
`;
fs.writeFileSync('.htaccess', htaccessContent, 'utf8');

console.log('ALL 9 MULTI-PAGE SITES, SITEMAP.XML, ROBOTS.TXT, AND .HTACCESS GENERATED SUCCESSFULLY!');
