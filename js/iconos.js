/* =========================================================================
   iconos.js — Dibujos SVG en línea
   -------------------------------------------------------------------------
   ¿Por qué están aquí y no como archivos .svg sueltos?
   1. No generan peticiones extra al servidor (el recorrido carga más rápido).
   2. Funcionan igual si abres el proyecto con doble clic (file://) o en
      GitHub Pages.
   3. Sirven de respaldo visual: si todavía no has puesto una foto real en
      img/ingredientes/, aparece el dibujo con la ruta exacta del archivo
      que falta.

   Todos usan currentColor, así que heredan el color del contenedor.
   ========================================================================= */

window.ICONOS = (function () {
  'use strict';

  function svg(contenido) {
    return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" ' +
      'stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false">' + contenido + '</svg>';
  }

  return {
    /* --- Zona huevos --- */
    huevos: svg(
      '<ellipse cx="22" cy="34" rx="12" ry="16"/>' +
      '<ellipse cx="43" cy="39" rx="9.5" ry="12.5"/>' +
      '<path d="M16 28c1-4 3-6 5-7" opacity=".55"/>'
    ),
    mermelada: svg(
      '<path d="M20 24h24v26a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6z"/>' +
      '<path d="M17 16h30v8H17z"/>' +
      '<path d="M20 38c3-3 6 2 9-1s6 2 9-1 4 1 6 0" opacity=".65"/>' +
      '<path d="M28 10h8v6h-8z" opacity=".55"/>'
    ),
    aji: svg(
      '<path d="M44 18c-2 16-11 28-22 30-5 1-9-2-8-7 2-9 12-18 23-21"/>' +
      '<path d="M44 18c0-5 2-8 6-9" />' +
      '<path d="M44 18c-4-1-7 0-9 2" opacity=".6"/>'
    ),

    /* --- Zona lácteos --- */
    leche: svg(
      '<path d="M22 24h20v30a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z"/>' +
      '<path d="M22 24l5-12h10l5 12"/>' +
      '<path d="M27 12V7h10v5" opacity=".6"/>' +
      '<path d="M26 40h12" opacity=".5"/>'
    ),
    queso: svg(
      '<path d="M8 40l34-18 14 8v14H8z"/>' +
      '<path d="M8 40l34-18" opacity=".5"/>' +
      '<circle cx="20" cy="43" r="2.6"/>' +
      '<circle cx="33" cy="40" r="2"/>' +
      '<circle cx="45" cy="44" r="2.3"/>'
    ),
    mantequilla: svg(
      '<path d="M10 36l12-10h32l-12 10z"/>' +
      '<path d="M10 36h32v14H10z"/>' +
      '<path d="M42 36l12-10v14l-12 10z"/>' +
      '<path d="M18 42h10" opacity=".55"/>'
    ),
    yogur: svg(
      '<path d="M20 22h24l-3 30a5 5 0 0 1-5 4.5H28a5 5 0 0 1-5-4.5z"/>' +
      '<path d="M17 16h30v6H17z"/>' +
      '<path d="M28 34c2 2 6 2 8 0" opacity=".6"/>' +
      '<circle cx="27" cy="29" r="1.5" opacity=".6"/>' +
      '<circle cx="37" cy="29" r="1.5" opacity=".6"/>'
    ),

    /* --- Zona frutas --- */
    banano: svg(
      '<path d="M12 26c0 16 12 26 26 26 10 0 16-5 16-10 0-3-2-5-5-5-6 0-10-3-13-8"/>' +
      '<path d="M12 26c0-4 1-7 3-8" />' +
      '<path d="M36 29c-4 4-9 6-14 6" opacity=".5"/>'
    ),
    fresas: svg(
      '<path d="M32 20c10 0 16 7 16 15 0 9-8 17-16 17s-16-8-16-17c0-8 6-15 16-15z"/>' +
      '<path d="M24 18h16l-8 6z"/>' +
      '<path d="M32 12v6" opacity=".6"/>' +
      '<circle cx="26" cy="33" r="1.4" fill="currentColor" stroke="none"/>' +
      '<circle cx="37" cy="31" r="1.4" fill="currentColor" stroke="none"/>' +
      '<circle cx="32" cy="41" r="1.4" fill="currentColor" stroke="none"/>' +
      '<circle cx="40" cy="41" r="1.4" fill="currentColor" stroke="none"/>' +
      '<circle cx="24" cy="43" r="1.4" fill="currentColor" stroke="none"/>'
    ),
    aguacate: svg(
      '<path d="M32 10c9 0 16 9 16 21 0 13-7 23-16 23s-16-10-16-23c0-12 7-21 16-21z"/>' +
      '<path d="M32 20c5 0 9 6 9 14s-4 13-9 13-9-5-9-13 4-14 9-14z" opacity=".45"/>' +
      '<circle cx="32" cy="36" r="7"/>'
    ),
    naranja: svg(
      '<circle cx="32" cy="36" r="20"/>' +
      '<path d="M32 16v40M12 36h40" opacity=".4"/>' +
      '<path d="M18 22l28 28M46 22L18 50" opacity=".25"/>' +
      '<path d="M32 16c0-5 3-8 8-9" />'
    ),

    /* --- Cajón frío --- */
    arepas: svg(
      '<circle cx="32" cy="34" r="19"/>' +
      '<circle cx="32" cy="34" r="13" opacity=".4"/>' +
      '<path d="M24 28c2-2 5-2 7 0" opacity=".6"/>' +
      '<path d="M36 40c2-2 5-2 7 0" opacity=".6"/>'
    ),
    pan: svg(
      '<path d="M18 28c0-7 6-12 14-12s14 5 14 12v24a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z"/>' +
      '<path d="M18 30h28" opacity=".45"/>' +
      '<path d="M26 20c0-3 2-5 6-5s6 2 6 5" opacity=".5"/>'
    ),
    tocineta: svg(
      '<path d="M8 40c6-10 14-16 24-18 10-2 18 2 24 10"/>' +
      '<path d="M10 48c6-10 14-16 24-18 10-2 17 2 22 9"/>' +
      '<path d="M8 40c2 4 2 6 2 8M56 32c0 4 0 5 0 7" />' +
      '<path d="M20 34c4-3 9-5 14-6" opacity=".5"/>'
    ),
    jamon: svg(
      '<path d="M14 40c0-11 9-20 20-20h8a10 10 0 0 1 0 20H34c-6 0-10 4-10 9 0 3-2 5-5 5s-5-2-5-5z"/>' +
      '<circle cx="39" cy="30" r="4" opacity=".55"/>' +
      '<path d="M22 36c3-4 7-6 11-7" opacity=".5"/>'
    ),

    /* --- Congelador --- */
    frutosrojos: svg(
      '<circle cx="24" cy="38" r="10"/>' +
      '<circle cx="41" cy="42" r="8"/>' +
      '<circle cx="36" cy="26" r="7"/>' +
      '<path d="M36 19v-5M24 28v-6" opacity=".6"/>' +
      '<path d="M31 14h10" opacity=".5"/>'
    ),
    waffles: svg(
      '<rect x="12" y="16" width="40" height="32" rx="7"/>' +
      '<path d="M12 27h40M12 37h40M23 16v32M33 16v32M43 16v32" opacity=".45"/>' +
      '<path d="M20 54c6 3 18 3 24 0" opacity=".5"/>'
    ),
    hielo: svg(
      '<path d="M32 8v48M12 20l40 24M52 20L12 44"/>' +
      '<path d="M32 16l-5 5M32 16l5 5M32 48l-5-5M32 48l5-5" opacity=".7"/>' +
      '<path d="M18 23l1 7-6 2M46 23l-1 7 6 2" opacity=".55"/>'
    ),
    cafe: svg(
      '<path d="M14 24h30v16a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z"/>' +
      '<path d="M44 28h4a7 7 0 0 1 0 14h-4"/>' +
      '<path d="M22 16c0-3 3-3 3-6M31 16c0-3 3-3 3-6M40 16c0-3 3-3 3-6" opacity=".6"/>'
    ),

    /* --- Iconos de interfaz --- */
    flecha: svg('<path d="M12 32h38M36 18l14 14-14 14"/>'),
    atras: svg('<path d="M52 32H14M28 18L14 32l14 14"/>'),
    casa: svg('<path d="M10 30L32 12l22 18"/><path d="M16 28v24h32V28"/><path d="M27 52V38h10v14"/>'),
    nevera: svg('<rect x="18" y="6" width="28" height="52" rx="5"/><path d="M18 26h28"/><path d="M26 15v6M26 33v8"/>'),
    cajon: svg('<rect x="8" y="22" width="48" height="26" rx="5"/><path d="M24 35h16"/><path d="M14 22l6-8h24l6 8" opacity=".5"/>'),
    copo: svg('<path d="M32 10v44M14 21l36 22M50 21L14 43"/><path d="M32 17l-4 4M32 17l4 4M32 47l-4-4M32 47l4-4" opacity=".7"/>'),
    plato: svg('<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="13" opacity=".5"/>'),
    canasta: svg('<path d="M8 24h48l-5 26a6 6 0 0 1-6 5H19a6 6 0 0 1-6-5z"/><path d="M20 24l6-14M44 24l-6-14"/><path d="M26 34v10M38 34v10" opacity=".5"/>'),
    ojo: svg('<path d="M4 32s10-14 28-14 28 14 28 14-10 14-28 14S4 32 4 32z"/><circle cx="32" cy="32" r="7"/>'),
    gota: svg('<path d="M32 8s16 18 16 28a16 16 0 0 1-32 0C16 26 32 8 32 8z"/><path d="M24 38c0 5 3 8 7 9" opacity=".6"/>'),
    mano: svg('<path d="M24 34V14a4 4 0 0 1 8 0v16"/><path d="M32 30V12a4 4 0 0 1 8 0v18"/><path d="M40 32V18a4 4 0 0 1 8 0v22c0 10-7 16-16 16s-16-6-16-16v-8a4 4 0 0 1 8 0"/>')
  };
})();
