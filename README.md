# ¿Qué hay en la nevera?

Recorrido virtual  Taller Multimedia 1 Entrega 3
Isabela Pinzón Rodríguez

> Un recorrido en primera persona por el interior de una nevera, buscando
> ingredientes para preparar el desayuno.

- Concepto del recorrido
un recorrido virtuall suele ser algo como una casa o un museo, un apartamento modelo etc... Yo quise hacer algo mas cotidiano y de facil acceso debido a que al ser mi primer recorrido virtual queria algo que tambien me facilitara la idea y el proceso àra realizarlo de manera correcta. Tome una nevera como recorrido virtual, un electrodomestico con espacios pequños dentro. La nevera resulto ser perfecta para este primer recorrido virtual debido a que tiene todo lo necesario para poder acceder a varios espacios. 

Primero tiene comportamientos reales y diferencados. Estantes, puertas, cajones, congelador. No tuve que inventarme divisiones debido a que la nevera ya viene dividida. Tiene la luz propia, se prende sola cuando entras y se apaga cuando sales. Segundo el contendo cambia, en cada espacio de la nevera encuentras alimentos diferentes. Tercero y último en la nevera encontramos un motivo para entrar, es decir nadie abre la nevera sin razón. 

El recorrido es en primera persona: no se ve a nadie, no hay un avatar. La pantalla son los ojos de quien está parado frente a la nevera, y los botones son sus manos. Por eso los textos están escritos en primera persona y entre comillas, como pensamientos, no como narración de guía turístico.

- ¿Por qué una nevera?

Primera: tenía la foto. La actividad pedía espacios reales o ficticios, y me enfoque en trabajar con un espacio que de verdad existe y que puedo fotografiar. La nevera de la foto es la de mi casa. Es una side-by-side de acero inoxidable, con el dispensador de agua y hielo en la puerta izquierda y un mueble rojo encima. Todo eso terminó dentro del proyecto: el acero define la paleta de grises, el rojo del mueble es el color de acento de toda la interfaz, y el dispensador es un elemento interactivo.

Segunda: la nevera ya tiene estructura de recorrido. Si yo hubiera escogido "mi cuarto", habría tenido que inventarme seis zonas artificiales. La nevera, en cambio, viene de fábrica con dos puertas, varios estantes y dos cajones. Cada compartimento es un espacio distinto sin que yo lo fuerce.

Tercera: es un espacio con tensión. Abrir la nevera con hambre y sin saber qué hay es, literalmente, una pequeña exploración con incertidumbre. Eso es exactamente lo que pide un recorrido, que la persona no sepa de antemano qué va a encontrar.

-  La situación narrativa

Es básicamente como una secuencia que hacen todas las personas en un día. Tengo hambre → abro la nevera → busco → encuentro → preparo.

Son las siete de la mañana, no hice mercado esta semana, no tengo idea de qué quedó adentro, y tengo que desayunar con lo que haya. Decidí a propósito no decirle al usuario qué ingredientes hay ni dónde están. En la pantalla de inicio solo se dice que hay que buscar. Si uno supiera de entrada que los huevos están en el estante de arriba, no habría exploración, habría una lista de tareas. La gracia está en abrir un cajón sin saber qué va a salir.

Por eso el congelador no se anuncia como parte obligatoria del recorrido. Es una puerta más, y mucha gente va a terminar sin abrirlo. Los que lo abran encuentran cuatro ingredientes que nadie más tiene y recetas que los demás no van a ver.

-  El objetivo del usuario
Juntar ingredientes suficientes para que salga un desayuno.
Es un objetivo claro pero abierto, no hay una combinación correcta. Hay nueve recetas posibles programadas en js/script.js, y el final cambia según lo que la persona haya recogido:

Lo que llevas	          Lo que sale
Arepas + huevos + queso	  Desayuno paisa
Pan + huevos + leche	  Tostadas francesas
Yogur + frutos rojos	  Bowl de yogur y frutos rojos
Pan + aguacate	          Tostada de aguacate
Waffles + fresas	      Waffles con fresas
Pan + jamón + queso	      Sánduche de jamón y queso
Huevos + tocineta	      Huevos con tocineta
Yogur + banano	          Desayuno ligero de fruta
Huevos + arepas	          Huevos pericos con arepa

Si no alcanza para ninguna, igual hay un final. Un "Desayuno improvisado", que lista lo que sí trajo, le dice qué le faltó y en qué espacio estaba, con un enlace directo para ir por ello.

-  Cómo funciona la navegación
El recorrido tiene varios atajos, no de línea recta.

-	interior.html es el eje. Desde ahí se llega a todas las zonas, y desde todas las zonas se vuelve ahí con un clic.


-	Las cinco zonas también están enlazadas entre sí. Si estoy en los lácteos y me acuerdo de las frutas, voy directo sin pasar por el centro.

-	El congelador tiene dos entradas, desde la puerta izquierda en el inicio, o desde adentro del refrigerador. Es el camino alterno que pedía la actividad.

-	Desayuno.html es alcanzable desde cualquier punto, en cualquier momento, incluso con la canasta vacía. No hay que "terminar" para llegar.

-	Desde la mesa también se puede volver atrás y seguir buscando.


Hay cuatro formas de moverse, para que nadie se quede atascado:
1. Los hotspots sobre la imagen del interior (puntos rojos que pulsan).
2. La barra superior fija, con el botón de volver siempre a la vista.
3. La lista de enlaces al pie de cada página, que muestra todos los caminos disponibles desde ahí.
4. La tecla Escape, que sube un nivel.

Hay 19 ingredientes repartidos entre los espacios 3 y 7.
Por qué agregué dos espacios de más. El congelador (7) entró porque la nevera de la foto tiene dos puertas, y me pareció una lástima desaprovechar eso. Ignorarlo habría sido contradecir la referencia visual que yo misma puse como principal. Además, resolvió de una vez el requisito de los caminos alternos.

La mesa (8) entró porque un recorrido que termina diciendo "ya viste todo" no termina en ningún lado. Necesitaba un espacio donde el recorrido produjera algo, y donde se notará que las decisiones que uno tomó importaron.

- Decisiones visuales
La foto manda. La regla que me puse fue que todo color del proyecto tiene que poder justificarse señalando la foto. No escogí una paleta "bonita" para aplicarla después, saqué los colores de la fotografía.

Lo que más me gustó es que la mesa es el único espacio cálido de todo el recorrido. Los siete anteriores son fríos y azulados. El cambio de temperatura de color le avisa al cuerpo que ya saliste de la nevera, antes de leer una sola palabra.

El interior es 100 % CSS. No tengo fotos del interior de la nevera, y no quise usar fotos de archivo de imágenes de una nevera que no es la mía porque se habría notado el salto. El interior está construido con degradados, estantes de vidrio semitransparentes, cajones con sus agarraderas, los estantes de la puerta, una barra de luz LED arriba que parpadea cada siete segundos como las luces viejas, y puntos blancos de condensación repartidos por el fondo.

Tipografías. Dos, con trabajos distintos:

- Instrument Serif para los pensamientos y los nombres de las cosas. Es la voz de la persona.
- Space Grotesk para botones, etiquetas y navegación. Es la interfaz.


-  Decisiones de interacción

Abrir la nevera tiene que costar un gesto. El botón del inicio no lleva directo a la siguiente página. Primero las dos puertas giran sobre su eje en 3D con rotateY y perspectiva, se ve la luz encendiéndose adentro, suena el imán, y después cambia la página. Es segundo y medio, pero es la diferencia entre "navegar" y "abrir". Si uno hace clic en la puerta derecha, solo se abre esa; si hace clic en la izquierda, solo la izquierda.

Los hotspots se tienen que descubrir. Los puntos rojos pulsan para decir "aquí hay algo", pero el área clicable no se ve hasta que el mouse pasa por encima. Quise que explorar fuera mirar, no leer una lista de botones. Los hotspots de las zonas ya visitadas quedan en rojo sólido y dejan de pulsar, así uno sabe dónde ya estuvo sin que el sitio se lo diga con palabras.

Tomar un ingrediente es reversible. Cada ingrediente se "lleva" con un botón que dice Llevar, y el mismo botón pasa a decir Devolver. No hay decisiones permanentes en todo el recorrido. Si la persona se arrepiente, se arrepiente, y ya. Lo que lleva se guarda en una canasta que se abre desde la barra superior, con un contador siempre visible.

-  El sonido
El audio era el bonus de la actividad, así que quise que funcionara bien, no solo que estuviera.
El problema. Un recorrido que depende de ocho archivos .mp3 tiene ocho maneras de fallar en GitHub Pages, un nombre mal escrito, un archivo que no subió, etc... Y si fallan, el recorrido queda mudo sin explicación.

La solución. js/audio.js sintetiza todos los sonidos en el navegador con la Web Audio API. No hay un solo archivo de audio en el repositorio y aun así se escucha todo. Cada sonido imita el gesto físico que acompaña.

- Imágenes, textos e hipervínculos

Imágenes. Tres tipos, con tres funciones:
1. La fotografía real de la nevera, que ancla el proyecto en un lugar que existe.
2. Las imagenes de los 19 ingredientes.
3. Los compartimentos del interior, que no son imágenes sino CSS.

El recorrido está hecho con <a href> de verdad entre ocho archivos HTML separados, no con una sola página que simula ser varias. Eso significa que cada espacio tiene su propia URL, que el botón "atrás" del navegador funciona como se espera, y que se puede navegar sin JavaScript (se pierde la canasta y la receta final, pero no la navegación). Cada página tiene entre 8 y 12 enlaces.

-  Cómo se garantiza que siempre se pueda volver

1. Barra superior fija, en las ocho páginas, con el botón de volver a la izquierda. Desde una zona vuelve al interior; desde el interior, al inicio.
2. Lista de caminos al pie, con todos los enlaces disponibles desde ahí, incluyendo siempre "Cerrar la nevera".
3. Enlaces laterales entre zonas, para que nunca haya que retroceder para avanzar.
4. Tecla Escape, que sube un nivel desde cualquier punto.
5. Botón atrás del navegador, que funciona porque son páginas HTML reales con URLs reales.

Además, la pantalla final no es un callejón sin salida, desayuno.html enlaza a los siete espacios anteriores, y si al usuario le faltó un ingrediente, el resultado le dice cuál y le da el enlace directo. No existe ninguna página del recorrido sin al menos tres salidas.

-  Para hacer este proyecto usé inteligencia, como herramienta de apoyo. La usé para tres cosas:

1. Resolver dudas. Cuando no entendía algo (qué es GitHub Pages, qué hace un archivo .js, para qué sirve un comentario o un noscript, cómo cambiar el tamaño de una foto), le pedí que me lo explicara paso a paso, en palabras simples.

2. Saber cómo se hacían ciertos códigos de la página. Partes como la animación de las puertas, los puntos clicables sobre la nevera, la canasta que se conserva entre páginas, los sonidos y las recetas finales las construí con su ayuda, y me explicó qué hacía cada una.

3. Comprobar que todo funcionara bien, que siempre se pudiera volver atrás, que la página se viera bien en diferentes tamaños de pantalla y que no diera error al publicarla.
Las decisiones de contenido y de diseño son mías: el tema de la nevera, la foto de mi casa como referencia visual, la historia del desayuno, los ingredientes, la forma del recorrido, codificación y todo. La use como herramienta para las cosas que no sabía como debía hacer, que me explicara y ahí yo hacerlas. 







