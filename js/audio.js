/* =========================================================================
   audio.js — Sonido del recorrido
   -------------------------------------------------------------------------
   Funciona de dos maneras, en este orden:

   1. SI EXISTE UN ARCHIVO en la carpeta audio/ con el nombre esperado,
      se reproduce ese archivo. (Ver audio/LEEME-AUDIO.md para la lista.)

   2. SI NO EXISTE, el navegador SINTETIZA el sonido con la Web Audio API.
      Así el recorrido ya suena desde el primer momento, sin descargar nada.

   Reglas que se respetan siempre:
   - El audio NUNCA es obligatorio para navegar.
   - No suena nada hasta que la persona interactúa (lo exigen los
     navegadores modernos, y además evita sustos).
   - Hay un botón de silencio en la barra superior y la preferencia se
     recuerda mientras dure la visita.
   ========================================================================= */

window.Sonido = (function () {
  'use strict';

  var ctx = null;            // AudioContext
  var zumbidoNodos = null;   // nodos del zumbido ambiente del motor
  var silencio = false;
  var listo = false;
  var cache = {};            // archivos mp3 encontrados
  var base = '';             // prefijo de ruta ('' o '../')

  /* Nombres de archivo que el proyecto buscará en la carpeta audio/ */
  var ARCHIVOS = {
    abrir:    'abrir-nevera',
    cerrar:   'cerrar-nevera',
    tomar:    'tomar-ingrediente',
    soltar:   'soltar-ingrediente',
    paso:     'paso',
    agua:     'dispensador',
    final:    'final',
    ambiente: 'ambiente-cocina'
  };

  function crearContexto() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { ctx = null; }
    return ctx;
  }

  /* ---------- Intento de cargar un .mp3 real (si el usuario lo puso) ----- */
  function intentarArchivo(clave) {
    if (cache[clave] !== undefined) return cache[clave];
    var nombre = ARCHIVOS[clave];
    if (!nombre) { cache[clave] = null; return null; }
    var a = new Audio();
    a.preload = 'auto';
    a.src = base + 'audio/' + nombre + '.mp3';
    a.addEventListener('error', function () { cache[clave] = null; });
    cache[clave] = a;
    return a;
  }

  function reproducirArchivo(clave, volumen, enBucle) {
    var a = intentarArchivo(clave);
    if (!a) return false;
    // readyState 0 + error => no existe; dejamos que falle en silencio
    try {
      var copia = enBucle ? a : a.cloneNode(true);
      copia.volume = volumen == null ? 0.6 : volumen;
      copia.loop = !!enBucle;
      var p = copia.play();
      if (p && p.catch) p.catch(function () { /* sin archivo: usamos síntesis */ });
      return true;
    } catch (e) {
      return false;
    }
  }

  function existeArchivo(clave) {
    var a = cache[clave];
    return !!(a && a.readyState > 0 && !a.error);
  }

  /* ----------------------- Síntesis con Web Audio ----------------------- */

  function ganancia(valor, dur) {
    var g = ctx.createGain();
    var t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(valor, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(ctx.destination);
    return g;
  }

  function tono(frec, dur, tipo, vol, desliz) {
    if (!ctx) return;
    var o = ctx.createOscillator();
    o.type = tipo || 'sine';
    o.frequency.setValueAtTime(frec, ctx.currentTime);
    if (desliz) {
      o.frequency.exponentialRampToValueAtTime(desliz, ctx.currentTime + dur);
    }
    o.connect(ganancia(vol || 0.12, dur));
    o.start();
    o.stop(ctx.currentTime + dur + 0.05);
  }

  function bufferRuido(segundos) {
    var n = Math.floor(ctx.sampleRate * segundos);
    var buf = ctx.createBuffer(1, n, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  function ruido(dur, frecFiltro, vol, tipoFiltro) {
    if (!ctx) return;
    var src = ctx.createBufferSource();
    src.buffer = bufferRuido(dur);
    var f = ctx.createBiquadFilter();
    f.type = tipoFiltro || 'lowpass';
    f.frequency.setValueAtTime(frecFiltro, ctx.currentTime);
    src.connect(f);
    f.connect(ganancia(vol || 0.1, dur));
    src.start();
    src.stop(ctx.currentTime + dur);
  }

  /* Cada sonido sintetizado imita el gesto físico correspondiente */
  var sintetizados = {
    // Succión del empaque + golpe seco del imán de la puerta
    abrir: function () {
      ruido(0.45, 900, 0.16);
      tono(120, 0.28, 'sine', 0.14, 62);
      setTimeout(function () { tono(74, 0.2, 'triangle', 0.1, 48); }, 110);
    },
    // Golpe de cierre más corto y sordo
    cerrar: function () {
      tono(95, 0.16, 'sine', 0.16, 46);
      ruido(0.14, 420, 0.1);
    },
    // Pequeño "clic" ascendente al tomar algo
    tomar: function () {
      tono(620, 0.09, 'triangle', 0.09, 980);
      setTimeout(function () { tono(980, 0.1, 'sine', 0.06, 1240); }, 55);
    },
    // El mismo clic, pero descendente, al devolver algo
    soltar: function () {
      tono(620, 0.1, 'triangle', 0.07, 320);
    },
    // Transición entre espacios: un soplo de aire frío
    paso: function () {
      ruido(0.5, 2200, 0.05, 'bandpass');
    },
    // Dispensador: chorro de agua
    agua: function () {
      ruido(0.9, 3400, 0.07, 'bandpass');
      setTimeout(function () { ruido(0.5, 1800, 0.05, 'bandpass'); }, 220);
    },
    // Final: acorde cálido de tres notas
    final: function () {
      [523.25, 659.25, 783.99].forEach(function (f, i) {
        setTimeout(function () { tono(f, 0.85, 'sine', 0.085); }, i * 130);
      });
    }
  };

  /* Zumbido continuo del motor del refrigerador */
  function iniciarZumbido() {
    if (!ctx || zumbidoNodos || silencio) return;
    var src = ctx.createBufferSource();
    src.buffer = bufferRuido(2.5);
    src.loop = true;

    var paso = ctx.createBiquadFilter();
    paso.type = 'lowpass';
    paso.frequency.value = 230;

    var grave = ctx.createOscillator();
    grave.type = 'sine';
    grave.frequency.value = 58;

    var gRuido = ctx.createGain(); gRuido.gain.value = 0.030;
    var gGrave = ctx.createGain(); gGrave.gain.value = 0.022;
    var maestro = ctx.createGain(); maestro.gain.value = 0;

    src.connect(paso); paso.connect(gRuido); gRuido.connect(maestro);
    grave.connect(gGrave); gGrave.connect(maestro);
    maestro.connect(ctx.destination);

    src.start(); grave.start();
    maestro.gain.linearRampToValueAtTime(1, ctx.currentTime + 2.2);

    zumbidoNodos = { src: src, grave: grave, maestro: maestro };
  }

  function detenerZumbido() {
    if (!zumbidoNodos) return;
    try {
      zumbidoNodos.maestro.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      var n = zumbidoNodos;
      setTimeout(function () {
        try { n.src.stop(); n.grave.stop(); } catch (e) {}
      }, 600);
    } catch (e) {}
    zumbidoNodos = null;
  }

  /* ------------------------------ API pública --------------------------- */

  return {
    /** Se llama una vez por página. prefijo = '' o '../' */
    iniciar: function (prefijo, mudo) {
      base = prefijo || '';
      silencio = !!mudo;
      // El contexto se crea con el primer gesto real de la persona
      var despertar = function () {
        crearContexto();
        if (ctx && ctx.state === 'suspended') ctx.resume();
        listo = true;
        if (!silencio) iniciarZumbido();
        document.removeEventListener('pointerdown', despertar);
        document.removeEventListener('keydown', despertar);
      };
      document.addEventListener('pointerdown', despertar, { once: true });
      document.addEventListener('keydown', despertar, { once: true });
    },

    /** Reproduce un efecto puntual por su clave */
    tocar: function (clave, volumen) {
      if (silencio) return;
      if (!listo) { crearContexto(); listo = true; }
      if (ctx && ctx.state === 'suspended') ctx.resume();
      if (existeArchivo(clave)) { reproducirArchivo(clave, volumen); return; }
      // Si el archivo no está disponible, lo sintetizamos
      intentarArchivo(clave);
      var f = sintetizados[clave];
      if (f && ctx) f();
    },

    silenciar: function (valor) {
      silencio = !!valor;
      if (silencio) detenerZumbido();
      else { crearContexto(); if (ctx) { if (ctx.state === 'suspended') ctx.resume(); iniciarZumbido(); } }
    },

    estaSilenciado: function () { return silencio; },

    /** Lista de nombres de archivo que el proyecto buscará */
    archivosEsperados: ARCHIVOS
  };
})();
