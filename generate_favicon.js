const fs = require('fs');

// Generar favicon SVG con el logo exacto de Solycal tintado en color acento (#F1B541 / #E5A52A)
// La imagen base64 de logo-icon.png se inserta en un canvas SVG y se tiñe mediante filtro SVG
const imgBuffer = fs.readFileSync('assets/logo-icon.png');
const base64Png = imgBuffer.toString('base64');

// Creamos un favicon SVG que proyecta el isotipo en color #F1B541 puro
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <defs>
    <!-- Filtro para colorear la imagen blanca original al amarillo/acento de Solycal (#F1B541) -->
    <filter id="accentColor" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="
        0 0 0 0 0.945
        0 0 0 0 0.709
        0 0 0 0 0.254
        0 0 0 1 0" />
    </filter>
  </defs>
  <!-- Fondo redondeado sutil estilo app moderna -->
  <rect width="120" height="120" rx="28" fill="#07080a" stroke="#F1B541" stroke-width="3" stroke-opacity="0.25"/>
  <!-- Logo original de Solycal en color acento #F1B541 -->
  <image href="data:image/png;base64,${base64Png}" x="22" y="16" width="76" height="88" filter="url(#accentColor)" />
</svg>`;

fs.writeFileSync('assets/favicon.svg', svgContent, 'utf8');
console.log('Favicon SVG creado con éxito en assets/favicon.svg');
