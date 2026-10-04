/* =========================================================================
   script.js — Lógica del recorrido
   -------------------------------------------------------------------------
   Responsabilidades:
     A. Datos (ingredientes, espacios, recetas)
     B. Guardado del estado entre páginas (con 3 niveles de respaldo)
     C. Construcción de la barra superior (HUD) y el panel de canasta
     D. Ingredientes: tomar / devolver
     E. Imágenes: placeholder automático si la foto todavía no existe
     F. Transiciones y sonido
     G. Pantalla final: cálculo del desayuno

   IMPORTANTE: el recorrido funciona también SIN JavaScript. Todas las
   páginas están enlazadas con <a href> reales; lo que se pierde sin JS es
   la canasta y la receta final, no la navegación.
   ========================================================================= */

(function () {
  'use strict';

  /* ================== A. DATOS ======================================== */

  var ESPACIOS = {
    inicio:     { nombre: 'Frente a la nevera', archivo: 'index.html',               raiz: true  },
    interior:   { nombre: 'Interior de la nevera', archivo: 'espacios/interior.html' },
    huevos:     { nombre: 'Estante de los huevos', archivo: 'espacios/huevos.html' },
    lacteos:    { nombre: 'La puerta: lácteos',    archivo: 'espacios/lacteos.html' },
    frutas:     { nombre: 'El cajón de las frutas',archivo: 'espacios/frutas.html' },
    cajon:      { nombre: 'El cajón frío',         archivo: 'espacios/cajon.html' },
    congelador: { nombre: 'El congelador',         archivo: 'espacios/congelador.html' },
    desayuno:   { nombre: 'La mesa',               archivo: 'espacios/desayuno.html' }
  };

  var INGREDIENTES = {
    huevos:      { nombre: 'Huevos',                   zona: 'huevos',     icono: 'huevos' },
    mermelada:   { nombre: 'Mermelada de mora',        zona: 'huevos',     icono: 'mermelada' },
    aji:         { nombre: 'Ají casero',               zona: 'huevos',     icono: 'aji' },

    leche:       { nombre: 'Leche',                    zona: 'lacteos',    icono: 'leche' },
    queso:       { nombre: 'Queso campesino',          zona: 'lacteos',    icono: 'queso' },
    mantequilla: { nombre: 'Mantequilla',              zona: 'lacteos',    icono: 'mantequilla' },
    yogur:       { nombre: 'Yogur natural',            zona: 'lacteos',    icono: 'yogur' },

    banano:      { nombre: 'Banano',                   zona: 'frutas',     icono: 'banano' },
    fresas:      { nombre: 'Fresas',                   zona: 'frutas',     icono: 'fresas' },
    aguacate:    { nombre: 'Aguacate',                 zona: 'frutas',     icono: 'aguacate' },
    naranja:     { nombre: 'Naranjas',                 zona: 'frutas',     icono: 'naranja' },

    arepas:      { nombre: 'Arepas',                   zona: 'cajon',      icono: 'arepas' },
    pan:         { nombre: 'Pan tajado',               zona: 'cajon',      icono: 'pan' },
    tocineta:    { nombre: 'Tocineta',                 zona: 'cajon',      icono: 'tocineta' },
    jamon:       { nombre: 'Jamón',                    zona: 'cajon',      icono: 'jamon' },

    frutosrojos: { nombre: 'Frutos rojos congelados',  zona: 'congelador', icono: 'frutosrojos' },
    waffles:     { nombre: 'Waffles congelados',       zona: 'congelador', icono: 'waffles' },
    hielo:       { nombre: 'Hielo',                    zona: 'congelador', icono: 'hielo' },
    cafe:        { nombre: 'Café en grano',            zona: 'congelador', icono: 'cafe' }
  };

  /* Recetas: 'pide' es obligatorio, 'suma' son extras que mejoran el puntaje */
  var RECETAS = [
    {
      id: 'paisa',
      nombre: 'Desayuno paisa',
      pide: ['arepas', 'huevos', 'queso'],
      suma: ['tocineta', 'aji', 'cafe'],
      texto: 'Arepa asada, huevos revueltos y queso encima hasta que se derrita. Si la tocineta entró a la canasta, el desayuno pasa de bueno a serio.',
      pasos: [
        'Pon la arepa en el asador hasta que se dore por los dos lados.',
        'Revuelve los huevos a fuego bajo, sin apuro.',
        'Desmenuza el queso sobre la arepa caliente para que se funda.',
        'Sirve todo junto y come antes de que se enfríe.'
      ]
    },
    {
      id: 'pericos',
      nombre: 'Huevos pericos con arepa',
      pide: ['huevos', 'arepas'],
      suma: ['queso', 'aji', 'mantequilla', 'cafe'],
      texto: 'El clásico de cualquier cocina colombiana a las siete de la mañana.',
      pasos: [
        'Bate los huevos con una pizca de sal.',
        'Cuaja los huevos moviéndolos poco, que queden cremosos.',
        'Calienta la arepa y úntale mantequilla si la tienes.',
        'Sirve los huevos sobre la arepa.'
      ]
    },
    {
      id: 'francesas',
      nombre: 'Tostadas francesas',
      pide: ['pan', 'huevos', 'leche'],
      suma: ['mantequilla', 'mermelada', 'fresas', 'cafe'],
      texto: 'El pan de ayer se vuelve el mejor desayuno de hoy: huevo, leche y sartén.',
      pasos: [
        'Mezcla los huevos con la leche en un plato hondo.',
        'Remoja cada tajada de pan unos segundos por lado.',
        'Dóralas en la sartén con un poco de mantequilla.',
        'Sirve con mermelada o fruta encima.'
      ]
    },
    {
      id: 'bowl',
      nombre: 'Bowl de yogur y frutos rojos',
      pide: ['yogur', 'frutosrojos'],
      suma: ['banano', 'fresas', 'leche', 'hielo'],
      texto: 'Frío, rápido y sin encender la estufa. Los frutos rojos se descongelan solos en el yogur.',
      pasos: [
        'Saca los frutos rojos del congelador diez minutos antes.',
        'Sirve el yogur en un bowl hondo.',
        'Reparte los frutos rojos y la fruta fresca encima.',
        'Come de una vez, mientras todavía está frío.'
      ]
    },
    {
      id: 'aguacate',
      nombre: 'Tostada de aguacate',
      pide: ['pan', 'aguacate'],
      suma: ['huevos', 'aji', 'queso', 'naranja'],
      texto: 'Pan tostado, aguacate aplastado, sal. El huevo encima lo convierte en almuerzo.',
      pasos: [
        'Tuesta el pan hasta que suene al golpearlo.',
        'Aplasta el aguacate con un tenedor y échale sal.',
        'Úntalo generoso sobre el pan.',
        'Si tienes huevo, ponlo encima; si tienes ají, una gota.'
      ]
    },
    {
      id: 'waffles',
      nombre: 'Waffles con fresas',
      pide: ['waffles', 'fresas'],
      suma: ['mantequilla', 'mermelada', 'yogur', 'cafe'],
      texto: 'Del congelador al tostador. Es trampa, pero funciona un martes.',
      pasos: [
        'Mete los waffles congelados al tostador.',
        'Corta las fresas en láminas mientras tanto.',
        'Pon la mantequilla sobre el waffle recién salido.',
        'Corona con las fresas.'
      ]
    },
    {
      id: 'sanduche',
      nombre: 'Sánduche de jamón y queso',
      pide: ['pan', 'jamon', 'queso'],
      suma: ['mantequilla', 'huevos', 'cafe'],
      texto: 'Tres ingredientes, cuatro minutos, cero complicaciones.',
      pasos: [
        'Unta mantequilla por fuera de las dos tajadas de pan.',
        'Arma el sánduche con el jamón y el queso adentro.',
        'Dóralo en la sartén con la tapa puesta.',
        'Córtalo en diagonal, que así sabe mejor.'
      ]
    },
    {
      id: 'ligero',
      nombre: 'Desayuno ligero de fruta',
      pide: ['yogur', 'banano'],
      suma: ['fresas', 'naranja', 'mermelada'],
      texto: 'Cuando no hay hambre de verdad pero el cuerpo pide algo.',
      pasos: [
        'Corta el banano en rodajas.',
        'Sírvelo sobre el yogur.',
        'Agrega la fruta que tengas a mano.'
      ]
    },
    {
      id: 'huevostocineta',
      nombre: 'Huevos con tocineta',
      pide: ['huevos', 'tocineta'],
      suma: ['pan', 'queso', 'aji', 'cafe'],
      texto: 'La tocineta primero, y los huevos en la misma grasa. No hay más ciencia.',
      pasos: [
        'Dora la tocineta a fuego medio hasta que cruja.',
        'Sácala y deja la grasa en la sartén.',
        'Cuaja ahí mismo los huevos.',
        'Sirve los dos juntos, con pan si tienes.'
      ]
    }
  ];

  var ACOMPANA = {
    cafe:    'un café recién pasado',
    naranja: 'un jugo de naranja',
    hielo:   'agua bien fría',
    leche:   'un vaso de leche'
  };

  /* ================== B. ESTADO ======================================= */
  /* Tres niveles de respaldo para que no se pierda la canasta:
     1) sessionStorage  2) localStorage  3) el hash de la URL           */

  var CLAVE = 'recorridoNevera.v1';
  var estado = { tomados: [], visitados: [], silencio: false };
  var almacen = (function () {
    var pruebas = [];
    try { pruebas.push(window.sessionStorage); } catch (e) {}
    try { pruebas.push(window.localStorage); } catch (e) {}
    for (var i = 0; i < pruebas.length; i++) {
      try {
        var a = pruebas[i];
        if (!a) continue;
        a.setItem('__p', '1'); a.removeItem('__p');
        return a;
      } catch (e) {}
    }
    return null;
  })();

  function leerEstado() {
    var crudo = null;
    if (almacen) { try { crudo = almacen.getItem(CLAVE); } catch (e) {} }
    if (!crudo && location.hash.indexOf('e=') > -1) {
      try { crudo = decodeURIComponent(location.hash.split('e=')[1].split('&')[0]); } catch (e) {}
    }
    if (crudo) {
      try {
        var o = JSON.parse(crudo);
        estado.tomados   = Array.isArray(o.tomados)   ? o.tomados   : [];
        estado.visitados = Array.isArray(o.visitados) ? o.visitados : [];
        estado.silencio  = !!o.silencio;
      } catch (e) {}
    }
    estado.tomados = estado.tomados.filter(function (k) { return !!INGREDIENTES[k]; });
  }

  function guardarEstado() {
    var txt = JSON.stringify(estado);
    if (almacen) { try { almacen.setItem(CLAVE, txt); return; } catch (e) {} }
    // Respaldo: lo colgamos del hash y lo propagamos a los enlaces internos
    try { history.replaceState(null, '', '#e=' + encodeURIComponent(txt)); } catch (e) {}
    propagarHash(txt);
  }

  function propagarHash(txt) {
    var h = '#e=' + encodeURIComponent(txt);
    var enlaces = document.querySelectorAll('a[href]');
    for (var i = 0; i < enlaces.length; i++) {
      var a = enlaces[i];
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^(https?:|mailto:)/.test(href)) continue;
      a.setAttribute('href', href.split('#')[0] + h);
    }
  }

  function tieneIngrediente(k) { return estado.tomados.indexOf(k) > -1; }

  function marcarVisitado(id) {
    if (id && estado.visitados.indexOf(id) === -1) {
      estado.visitados.push(id);
      guardarEstado();
    }
  }

  /* ================== UTILIDADES ====================================== */

  var cuerpo = document.body;
  var espacioActual = cuerpo.getAttribute('data-espacio') || 'inicio';
  var enRaiz = cuerpo.getAttribute('data-nivel') === 'raiz';
  var P = enRaiz ? '' : '../';   // prefijo de rutas relativas

  function ruta(clave) {
    var e = ESPACIOS[clave];
    if (!e) return P + 'index.html';
    return e.raiz ? (P + 'index.html') : (enRaiz ? e.archivo : e.archivo.replace('espacios/', ''));
  }

  function icono(nombre) {
    return (window.ICONOS && window.ICONOS[nombre]) || (window.ICONOS && window.ICONOS.plato) || '';
  }

  function crear(etiqueta, clase, html) {
    var el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (html != null) el.innerHTML = html;
    return el;
  }

  /* ================== C. HUD Y CANASTA ================================ */

  var elContador, elLista, elVacio;

  function construirHUD() {
    var hud = crear('header', 'hud');
    hud.setAttribute('role', 'banner');

    var volverA = espacioActual === 'inicio' ? null
      : (espacioActual === 'interior' ? 'inicio' : 'interior');

    if (volverA) {
      var a = crear('a', 'hud__volver',
        icono('atras') + '<span>' + (volverA === 'inicio' ? 'Salir de la nevera' : 'Volver al interior') + '</span>');
      a.href = ruta(volverA);
      a.setAttribute('data-sonido', volverA === 'inicio' ? 'cerrar' : 'paso');
      hud.appendChild(a);
    } else {
      var casa = crear('span', 'hud__volver', icono('casa') + '<span>Inicio</span>');
      hud.appendChild(casa);
    }

    var ruta2 = crear('p', 'hud__ruta',
      'Recorrido · ' + (ESPACIOS[espacioActual] ? ESPACIOS[espacioActual].nombre : ''));
    hud.appendChild(ruta2);

    var der = crear('div', 'hud__derecha');

    // Botón de sonido
    var bSon = crear('button', 'hud__boton hud__sonido',
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 9v6h4l5 4V5L8 9H4z"/>' +
      '<path class="onda" d="M16.5 8.5a5 5 0 0 1 0 7"/>' +
      '<path class="onda" d="M19 6a9 9 0 0 1 0 12"/>' +
      '<path class="tachado" d="M3 3l18 18" stroke="#ff6b6b"/>' +
      '</svg><span class="texto-boton">Sonido</span>');
    bSon.type = 'button';
    bSon.setAttribute('aria-pressed', String(!estado.silencio));
    bSon.title = 'Activar o silenciar el sonido';
    bSon.addEventListener('click', function () {
      estado.silencio = !estado.silencio;
      cuerpo.classList.toggle('sin-sonido', estado.silencio);
      bSon.setAttribute('aria-pressed', String(!estado.silencio));
      window.Sonido.silenciar(estado.silencio);
      guardarEstado();
      aviso(estado.silencio ? 'Sonido en silencio' : 'Sonido activado');
    });
    der.appendChild(bSon);

    // Botón de canasta
    var bCan = crear('button', 'hud__boton hud__canasta',
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 8h18l-2 11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M8 8l2-5M16 8l-2-5"/>' +
      '</svg><span class="texto-boton">Canasta</span>' +
      '<span class="hud__contador" id="contadorCanasta">0</span>');
    bCan.type = 'button';
    bCan.setAttribute('aria-expanded', 'false');
    bCan.addEventListener('click', function () {
      var abierto = cuerpo.classList.toggle('inventario-abierto');
      bCan.setAttribute('aria-expanded', String(abierto));
    });
    der.appendChild(bCan);

    // Acceso directo a la mesa
    if (espacioActual !== 'desayuno') {
      var bMesa = crear('a', 'hud__boton',
        icono('plato') +
        '<span class="texto-boton">La mesa</span>');
      bMesa.href = ruta('desayuno');
      bMesa.setAttribute('data-sonido', 'paso');
      der.appendChild(bMesa);
    }

    hud.appendChild(der);
    cuerpo.insertBefore(hud, cuerpo.firstChild);
    elContador = document.getElementById('contadorCanasta');
  }

  function construirPanelCanasta() {
    var panel = crear('aside', 'inventario');
    panel.setAttribute('aria-label', 'Ingredientes que llevas');

    var cerrar = crear('button', 'inventario__cerrar',
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>');
    cerrar.type = 'button';
    cerrar.setAttribute('aria-label', 'Cerrar la canasta');
    cerrar.addEventListener('click', cerrarCanasta);
    panel.appendChild(cerrar);

    panel.appendChild(crear('p', 'etiqueta', 'Lo que llevo'));
    panel.appendChild(crear('h2', 'titulo titulo--m', 'En la canasta'));

    elVacio = crear('div', 'inventario__vacio',
      'Todavía no has tomado nada. Entra a la nevera y toca los ingredientes que te sirvan ' +
      'para el desayuno. Puedes devolverlos cuando quieras.');
    panel.appendChild(elVacio);

    elLista = crear('ul', 'inventario__lista');
    panel.appendChild(elLista);

    var irMesa = crear('a', 'enlace-camino enlace-camino--fuerte',
      icono('plato') + 'Ir a preparar el desayuno');
    irMesa.href = ruta('desayuno');
    irMesa.style.marginTop = 'auto';
    irMesa.setAttribute('data-sonido', 'paso');
    panel.appendChild(irMesa);

    cuerpo.appendChild(panel);
  }

  function cerrarCanasta() {
    cuerpo.classList.remove('inventario-abierto');
    var b = document.querySelector('.hud__canasta');
    if (b) b.setAttribute('aria-expanded', 'false');
  }

  function pintarCanasta() {
    if (!elLista) return;
    elLista.innerHTML = '';
    var n = estado.tomados.length;

    if (elContador) {
      elContador.textContent = String(n);
      elContador.setAttribute('data-vacio', n === 0 ? 'si' : 'no');
    }
    elVacio.style.display = n === 0 ? '' : 'none';

    estado.tomados.forEach(function (k) {
      var ing = INGREDIENTES[k];
      var li = crear('li', 'inventario__item',
        icono(ing.icono) +
        '<div><b>' + ing.nombre + '</b><small>' +
        (ESPACIOS[ing.zona] ? ESPACIOS[ing.zona].nombre : '') + '</small></div>');
      var quitar = crear('button', 'inventario__quitar', 'devolver');
      quitar.type = 'button';
      quitar.addEventListener('click', function () { alternar(k, false); });
      li.appendChild(quitar);
      elLista.appendChild(li);
    });
  }

  /* ================== D. TOMAR / DEVOLVER ============================= */

  function alternar(clave, forzar) {
    var ing = INGREDIENTES[clave];
    if (!ing) return;
    var tenia = tieneIngrediente(clave);
    var quiere = (forzar === undefined) ? !tenia : forzar;

    if (quiere && !tenia) {
      estado.tomados.push(clave);
      window.Sonido.tocar('tomar');
      aviso('Tomaste: ' + ing.nombre);
    } else if (!quiere && tenia) {
      estado.tomados.splice(estado.tomados.indexOf(clave), 1);
      window.Sonido.tocar('soltar');
      aviso('Devolviste: ' + ing.nombre);
    } else { return; }

    guardarEstado();
    pintarCanasta();
    sincronizarTarjetas();
  }

  function sincronizarTarjetas() {
    var tarjetas = document.querySelectorAll('.tarjeta[data-ingrediente]');
    for (var i = 0; i < tarjetas.length; i++) {
      var t = tarjetas[i];
      var k = t.getAttribute('data-ingrediente');
      var tomado = tieneIngrediente(k);
      t.setAttribute('data-tomado', tomado ? 'si' : 'no');
      var b = t.querySelector('.tarjeta__tomar');
      if (b) {
        b.setAttribute('aria-pressed', String(tomado));
        var txt = b.querySelector('.texto-tomar');
        if (txt) txt.textContent = tomado ? 'Devolver' : 'Llevar';
      }
    }
  }

  function conectarTarjetas() {
    var botones = document.querySelectorAll('.tarjeta__tomar');
    for (var i = 0; i < botones.length; i++) {
      (function (b) {
        var tarjeta = b.closest ? b.closest('.tarjeta') : null;
        if (!tarjeta) return;
        var k = tarjeta.getAttribute('data-ingrediente');
        b.addEventListener('click', function (ev) { ev.preventDefault(); alternar(k); });
      })(botones[i]);
    }
    sincronizarTarjetas();
  }

  /* ================== E. IMÁGENES CON PLACEHOLDER ===================== */
  /* Si la foto no existe todavía, mostramos un marcador que dice
     exactamente qué archivo falta y dónde ponerlo.                    */

  function marcadorDe(img) {
    var nombreIcono = img.getAttribute('data-icono') || 'plato';
    var archivo = img.getAttribute('data-ruta') || img.getAttribute('src') || '';
    var d = crear('div', 'marcador',
      icono(nombreIcono) +
      '<b>Falta la foto</b>' +
      '<code>' + archivo.replace(/^\.\.\//, '') + '</code>');
    return d;
  }

  function prepararImagenes() {
    var imgs = document.querySelectorAll('img[data-icono]');
    for (var i = 0; i < imgs.length; i++) {
      (function (img) {
        if (!img.getAttribute('data-ruta')) img.setAttribute('data-ruta', img.getAttribute('src') || '');
        function fallar() {
          if (img.parentNode && !img.parentNode.querySelector('.marcador')) {
            img.parentNode.appendChild(marcadorDe(img));
          }
          img.style.display = 'none';
        }
        if (img.complete && img.naturalWidth === 0) { fallar(); }
        img.addEventListener('error', fallar);
        img.addEventListener('load', function () {
          if (img.naturalWidth === 0) fallar();
        });
      })(imgs[i]);
    }

    // Imágenes opcionales (ej. la foto real de la nevera en el inicio):
    // si no están, simplemente se ocultan y queda la versión dibujada con CSS.
    var opcionales = document.querySelectorAll('img[data-opcional]');
    for (var j = 0; j < opcionales.length; j++) {
      (function (img) {
        var caja = img.parentNode;
        function ocultar() {
          img.hidden = true;
          if (caja && caja.classList) caja.classList.remove('con-foto');
        }
        function mostrar() {
          if (img.naturalWidth === 0) { ocultar(); return; }
          if (caja && caja.classList) caja.classList.add('con-foto');
        }
        if (img.complete) { img.naturalWidth === 0 ? ocultar() : mostrar(); }
        img.addEventListener('error', ocultar);
        img.addEventListener('load', mostrar);
      })(opcionales[j]);
    }
  }

  /* ================== F. TRANSICIONES, AVISOS Y SONIDO ================ */

  var contenedorAvisos;

  function aviso(texto, rojo) {
    if (!contenedorAvisos) {
      contenedorAvisos = crear('div', 'avisos');
      contenedorAvisos.setAttribute('role', 'status');
      contenedorAvisos.setAttribute('aria-live', 'polite');
      cuerpo.appendChild(contenedorAvisos);
    }
    var a = crear('div', 'aviso' + (rojo ? ' aviso--rojo' : ''), texto);
    contenedorAvisos.appendChild(a);
    setTimeout(function () {
      a.classList.add('saliendo');
      setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 320);
    }, 2300);
  }

  function esEnlaceInterno(a) {
    if (!a) return false;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false;
    if (/^(https?:|mailto:|tel:)/.test(href)) return false;
    if (a.target === '_blank') return false;
    return true;
  }

  function conectarTransiciones() {
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!esEnlaceInterno(a)) return;
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;

      // La animación de apertura de puertas se maneja aparte
      if (a.getAttribute('data-abrir')) return;

      var son = a.getAttribute('data-sonido');
      window.Sonido.tocar(son || 'paso');

      ev.preventDefault();
      cuerpo.classList.add('saliendo');
      var destino = a.href;
      setTimeout(function () { location.href = destino; }, 290);
    });

    // Si la persona vuelve con el botón "atrás" del navegador
    window.addEventListener('pageshow', function () { cuerpo.classList.remove('saliendo'); });
  }

  function conectarAperturaPuertas() {
    var disparadores = document.querySelectorAll('[data-abrir]');
    for (var i = 0; i < disparadores.length; i++) {
      (function (el) {
        el.addEventListener('click', function (ev) {
          if (ev.metaKey || ev.ctrlKey) return;
          ev.preventDefault();
          if (cuerpo.classList.contains('abriendo')) return;

          var lado = el.getAttribute('data-abrir'); // 'ambas' | 'derecha' | 'izquierda'
          cuerpo.classList.add('abriendo');
          if (lado === 'derecha') cuerpo.classList.add('abriendo-derecha');
          if (lado === 'izquierda') cuerpo.classList.add('abriendo-izquierda');

          window.Sonido.tocar('abrir');
          var destino = el.href;
          var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          setTimeout(function () {
            cuerpo.classList.add('saliendo');
            setTimeout(function () { location.href = destino; }, 280);
          }, reducido ? 60 : 1150);
        });
      })(disparadores[i]);
    }
  }

  function conectarDispensador() {
    var d = document.querySelector('.dispensador');
    if (!d) return;
    d.addEventListener('click', function () {
      window.Sonido.tocar('agua');
      aviso('Un vaso de agua helada. Primero lo primero.');
    });
  }

  function conectarTeclado() {
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') {
        if (cuerpo.classList.contains('inventario-abierto')) { cerrarCanasta(); return; }
        if (espacioActual !== 'inicio' && espacioActual !== 'interior') {
          location.href = ruta('interior');
        } else if (espacioActual === 'interior') {
          location.href = ruta('inicio');
        }
      }
    });
  }

  function marcarHotspotsVisitados() {
    var hs = document.querySelectorAll('.hotspot[data-destino]');
    for (var i = 0; i < hs.length; i++) {
      var d = hs[i].getAttribute('data-destino');
      if (estado.visitados.indexOf(d) > -1) hs[i].setAttribute('data-visitado', 'si');
    }
  }

  /* ================== G. PANTALLA FINAL =============================== */

  function evaluarRecetas() {
    var posibles = [], cercanas = [];
    RECETAS.forEach(function (r) {
      var faltan = r.pide.filter(function (k) { return !tieneIngrediente(k); });
      var extras = r.suma.filter(function (k) { return tieneIngrediente(k); });
      var info = { receta: r, faltan: faltan, extras: extras };
      if (faltan.length === 0) {
        info.puntaje = r.pide.length * 3 + extras.length;
        posibles.push(info);
      } else if (faltan.length <= 2 && r.pide.length - faltan.length >= 1) {
        info.puntaje = (r.pide.length - faltan.length) * 2 - faltan.length;
        cercanas.push(info);
      }
    });
    posibles.sort(function (a, b) { return b.puntaje - a.puntaje; });
    cercanas.sort(function (a, b) { return b.puntaje - a.puntaje; });
    return { posibles: posibles, cercanas: cercanas };
  }

  function listaAcompanamientos() {
    var out = [];
    for (var k in ACOMPANA) {
      if (tieneIngrediente(k)) out.push(ACOMPANA[k]);
    }
    return out;
  }

  function pintarDesayuno() {
    var cont = document.getElementById('resultadoDesayuno');
    if (!cont) return;
    cont.innerHTML = '';

    var n = estado.tomados.length;
    var r = evaluarRecetas();

    /* --- Bloque del plato --- */
    var caja = crear('div', 'resultado');

    if (n === 0) {
      caja.appendChild(crear('p', 'etiqueta', 'La mesa está vacía'));
      caja.appendChild(crear('h2', 'resultado__plato', 'Nada todavía'));
      caja.appendChild(crear('p', 'resultado__texto',
        'Volviste a la cocina con las manos vacías. No pasa nada: la nevera sigue ahí. ' +
        'Entra otra vez y toca los ingredientes que te sirvan — con dos o tres ya sale algo.'));
    } else if (r.posibles.length) {
      var g = r.posibles[0];
      caja.appendChild(crear('p', 'etiqueta', 'Con lo que encontraste puedes preparar'));
      caja.appendChild(crear('h2', 'resultado__plato', g.receta.nombre));
      var extra = '';
      if (g.extras.length) {
        extra = ' Además llevas ' + listaEnTexto(g.extras.map(function (k) {
          return INGREDIENTES[k].nombre.toLowerCase();
        })) + ', así que el plato queda completo.';
      }
      caja.appendChild(crear('p', 'resultado__texto', g.receta.texto + extra));

      var acomp = listaAcompanamientos();
      if (acomp.length) {
        caja.appendChild(crear('p', 'resultado__texto',
          '<em>Para acompañar: ' + listaEnTexto(acomp) + '.</em>'));
      }

      var ol = crear('ol', 'pasos');
      g.receta.pasos.forEach(function (p) { ol.appendChild(crear('li', null, p)); });
      caja.appendChild(ol);
      window.Sonido.tocar('final');
    } else {
      caja.appendChild(crear('p', 'etiqueta', 'Resultado del recorrido'));
      caja.appendChild(crear('h2', 'resultado__plato', 'Desayuno improvisado'));
      caja.appendChild(crear('p', 'resultado__texto',
        'Lo que trajiste no arma ninguna receta completa, pero tampoco te vas a quedar sin comer: ' +
        listaEnTexto(estado.tomados.map(function (k) { return INGREDIENTES[k].nombre.toLowerCase(); })) +
        '. Con eso se improvisa. Si quieres algo más armado, todavía puedes volver a la nevera.'));
      window.Sonido.tocar('final');
    }
    cont.appendChild(caja);

    /* --- Canasta --- */
    if (n > 0) {
      var sec = crear('section', 'canasta');
      sec.appendChild(crear('h3', 'titulo titulo--m canasta__titulo',
        'Lo que sacaste de la nevera (' + n + ')'));
      var rej = crear('div', 'canasta__rejilla');
      estado.tomados.forEach(function (k) {
        var ing = INGREDIENTES[k];
        rej.appendChild(crear('div', 'canasta__item',
          icono(ing.icono) + '<span>' + ing.nombre + '</span>'));
      });
      sec.appendChild(rej);
      cont.appendChild(sec);
    }

    /* --- Alternativas: qué más podrías haber hecho --- */
    var alt = crear('section', 'alternativas');
    var hayAlgo = false;
    var ul = crear('ul');

    r.posibles.slice(1, 4).forEach(function (p) {
      hayAlgo = true;
      ul.appendChild(crear('li', null,
        'Con lo mismo también sale <strong>' + p.receta.nombre + '</strong>.'));
    });

    r.cercanas.slice(0, 3).forEach(function (c) {
      hayAlgo = true;
      var faltantes = c.faltan.map(function (k) {
        var ing = INGREDIENTES[k];
        return '<a href="' + ruta(ing.zona) + '" data-sonido="paso">' + ing.nombre.toLowerCase() + '</a>';
      });
      ul.appendChild(crear('li', null,
        'Para <strong>' + c.receta.nombre + '</strong> solo te falta ' +
        listaEnTexto(faltantes) + '. Está en ' +
        listaEnTexto(c.faltan.map(function (k) {
          return ESPACIOS[INGREDIENTES[k].zona].nombre.toLowerCase();
        }).filter(unicos)) + '.'));
    });

    if (hayAlgo) {
      alt.appendChild(crear('h3', null, 'Otros caminos que tenías'));
      alt.appendChild(ul);
      cont.appendChild(alt);
    }
  }

  function unicos(v, i, a) { return a.indexOf(v) === i; }

  function listaEnTexto(arr) {
    if (!arr.length) return '';
    if (arr.length === 1) return arr[0];
    return arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1];
  }

  /* ================== ARRANQUE ======================================== */

  function iniciar() {
    leerEstado();
    cuerpo.classList.toggle('sin-sonido', estado.silencio);
    window.Sonido.iniciar(P, estado.silencio);

    construirHUD();
    construirPanelCanasta();
    prepararImagenes();
    conectarTarjetas();
    conectarTransiciones();
    conectarAperturaPuertas();
    conectarDispensador();
    conectarTeclado();
    marcarHotspotsVisitados();
    pintarCanasta();
    marcarVisitado(espacioActual);
    pintarDesayuno();

    if (!almacen) propagarHash(JSON.stringify(estado));

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { cuerpo.classList.add('cargado'); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
