# Carpeta `audio/` — qué va aquí exactamente

## Lo primero: el recorrido YA SUENA sin ningún archivo

`js/audio.js` sintetiza todos los sonidos en el navegador con la **Web Audio
API**. No hay ningún `.mp3` en el repositorio y aun así se escucha:

- el golpe sordo del imán al abrir la puerta,
- el zumbido grave y continuo del motor del refrigerador,
- un clic corto al tomar un ingrediente (y el mismo clic al revés al devolverlo),
- un soplo de aire al cambiar de espacio,
- el chorro del dispensador de agua,
- un acorde de tres notas al llegar a la mesa.

Esto se hizo así a propósito: el audio era un *bonus* de la actividad, y
depender de archivos externos que pueden no cargar en GitHub Pages era un
riesgo innecesario.

## Si quieres poner tus propios archivos

Pon un `.mp3` con **exactamente** estos nombres en esta carpeta. El
reproductor los detecta solo y deja de sintetizar ese sonido:

| Archivo | Cuándo suena | Duración sugerida |
|---|---|---|
| `abrir-nevera.mp3` | Al abrir la nevera o el congelador | 1 – 2 s |
| `cerrar-nevera.mp3` | Al volver al inicio ("cerrar la nevera") | 0.5 – 1 s |
| `tomar-ingrediente.mp3` | Al llevar un ingrediente | 0.2 – 0.4 s |
| `soltar-ingrediente.mp3` | Al devolver un ingrediente | 0.2 – 0.4 s |
| `paso.mp3` | Al cambiar de espacio | 0.4 – 0.8 s |
| `dispensador.mp3` | Al tocar el dispensador de agua del inicio | 1 – 2 s |
| `final.mp3` | Al llegar a la mesa con ingredientes | 1 – 3 s |
| `ambiente-cocina.mp3` | Ambiente continuo (reservado) | en bucle |

### Reglas que conviene respetar

1. **Formato `.mp3`.** Es el que todos los navegadores leen sin discusión.
2. **Volumen bajo.** Son sonidos de acompañamiento, no protagonistas.
3. **Archivos livianos** (menos de 200 KB cada uno). GitHub Pages es gratis
   pero no infinito, y el recorrido debe abrir rápido.
4. **Licencia libre.** Si los descargas, usa bancos como
   [freesound.org](https://freesound.org) o
   [pixabay.com/sound-effects](https://pixabay.com/sound-effects/) y revisa
   que permitan uso libre. Mejor aún: grábalos con el celular abriendo tu
   propia nevera. Encaja mejor con la idea del proyecto.

## El audio nunca bloquea la navegación

- Nada suena hasta que la persona hace el primer clic o toca una tecla
  (lo exigen los navegadores modernos, y además evita sustos).
- Hay un botón **Sonido** en la barra superior que silencia todo.
- La preferencia de silencio se recuerda mientras dure la visita.
- Si el navegador no soporta Web Audio y tampoco hay archivos, el recorrido
  funciona igual, simplemente en silencio.
