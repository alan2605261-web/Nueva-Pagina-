# Cambios de la revisión final — 23 de septiembre de 2026

Fecha límite puesta por Rafa: hoy.

Cómo se trabaja: cada comentario se resuelve uno por uno, con su propio commit.
La publicación a Shopify se hace por tandas, cada diez cambios o cuando Saul lo
pida. Saul revisa mientras tanto en `http://localhost:3000`.

**Antes de publicar a Shopify se consulta este archivo**, se revisa que la lista
de pendientes esté vacía y se corre:

```bash
export PATH=/Users/SaulP/.local/opt/node/bin:$PATH && cd ~/mentefria/mentefria-shopify && node scripts/shopify/generar-tema.mjs
```

---

## Pendientes de publicar a Shopify

Veintidós. Lo de abajo de la segunda tabla ya está en el tema borrador.

| # | Comentario | Qué se hizo | Archivos |
|---|---|---|---|
| 7 | Rafa: la comparativa sale cortada en celular, hay que deslizar de lado para ver "Otras". Que se vea todo a la vez. Saul eligió, entre tres propuestas, la de palomita y tache, y pidió que solo cambie en celular. | Solo abajo de 680px: la frase de Mente Fria se vuelve la etiqueta de la fila y las dos columnas se reducen a palomita y tache. Sin deslizamiento lateral, la tabla completa mide 358px y cabe en pantalla. De 681px para arriba queda exactamente como estaba, con las dos frases lado a lado. | LandingV2.tsx, metal.css |
| 8 | Rafa: en celular las tarjetas de 30 días, garantía y financiamiento están muy grandes y toscas; que sean mucho más chicas. Saul: en el iPad también acuéstalas. | Hasta 1023px la tarjeta se acuesta: el icono al lado y el texto a la izquierda. En celular pasan de 203 a 224px de alto a 91, y en iPad vertical de 289 a 75. El bloque completo baja de 712 a 356px en celular y de 950 a 316 en iPad. De 1024 para arriba quedan las tres de lado a lado, verticales y sin cambio. | LandingV2.tsx, metal.css |
| 9 | Rafa: las fotos de los tres plunges no coinciden en tamaño; volver a los tamaños de la primera versión. Saul mandó la captura de esa versión. | Medidos sobre su captura: el producto ocupa 70% del ancho de su caja en el Barrel, 78% en la MF ONE y 84% en el Horizon, con columnas iguales. Esos son los valores que quedaron. En escritorio la MF ONE va al 61% porque su columna es 1.25 veces más ancha, que equivale al mismo 78%. Antes iban 68, 76 y 100: en una sola columna eso dejaba la MF ONE como la foto más chica de las tres. | LandingV2.tsx |
| 10 | Rafa: entre MF Barrel y MF ONE hay un espacio en blanco muy grande. | La bandeja tenía un alto mínimo de 176px que sobraba cuando la foto era más chica, y la separación entre tarjetas era de 32px. Ahora la bandeja mide exactamente lo que pide la foto y la separación baja a 24. El blanco encima de cada foto quedó en cero. De paso, el tamaño del archivo va en el marcado para que el navegador reserve el hueco y la bandeja no brinque al cargar. | LandingV2.tsx |
| 11 | Rafa: en teléfono la MF ONE queda en segundo lugar; debe ir primero ONE, luego Horizon y luego Barrel. | Abajo de 1024px se reordenan solo visualmente. En pantalla ancha siguen Barrel, MF ONE y Horizon, con la estelar al centro del triángulo. | metal.css |
| 12 | Rafa: hay guiones largos en varios lugares; no debe haber ninguno, ni en celular ni en computadora, y no solo en ese bloque. | Se recorrió todo el código: 39 guiones en texto visible, en 18 archivos. Todos sustituidos por punto, coma, dos puntos o paréntesis según el caso, y los rangos numéricos pasan a "de X a Y". Queda un revisor, `npm run sin-guiones`, que recorre las 47 páginas ya construidas y falla si aparece uno; así se atrapa también lo que entre desde el blog o desde datos, no solo lo escrito a mano. | 18 archivos + scripts/sin-guiones.mjs |
| 13 | Rafa: quitaría el distintivo de "Cambia" del comparador de motores, siente que confunde, y el azul tampoco le gusta. En celular además lo desordena. | Fuera el distintivo y fuera el fondo azul de las filas que cambian. Con los tres motores puestos cambian diez de once filas, así que marcarlas no informaba de nada. También se quitó el interruptor "Solo diferencias", que con los tres motores solo escondía una fila. | ComparadorMotores.tsx |
| 14 | En la página de productos el orden en teléfono sigue mal: debe ir MF ONE, luego Horizon y al final Barrel. | El reordenamiento del 11 solo estaba en la reja del inicio; la página de productos es otra reja. Ahora usa la misma clase, así que abajo de 1024px va MF ONE, Horizon y Barrel, tanto en una columna como en dos. En tres columnas sigue Barrel, MF ONE y Horizon. | app/productos/page.tsx |
| 15 | Los tamaños de la referencia deben aplicar en TODOS los lugares donde aparecen los tres productos, no solo en el inicio. En productos se sigue viendo chica. | Se aplicaron los mismos 70, 78 y 84% en las otras cuatro reja: /productos, /negocios, el menú desplegable y /garantia. En /garantia además estaban ajustadas al alto de la caja, así que las tres salían del mismo tamaño. En /productos la caja medía 270px fijos y sobraban entre 79 y 120px de blanco encima de cada foto; ahora mide lo que pide la foto. | 4 archivos |
| 16 | Siguen chicas, sobre todo en computadora, y el Horizon se ve más chico que el Barrel cuando en realidad es más grande. | Cambió el criterio: ya no se iguala el ancho sino el tamaño general en pantalla. Las tres fotos tienen recortes distintos, así que al mismo ancho el Barrel, que es alto y estrecho, se veía más grande que el Horizon, que es plano y largo. Ahora el ancho sale de la media geométrica de largo y alto del equipo real: 65% el Barrel, 100% la MF ONE y 93% el Horizon. Todo crece alrededor de 28% y el orden visual queda MF ONE, Horizon y Barrel, como en la realidad. | 5 archivos |
| 17 | El Horizon sigue viéndose más chico que el Barrel, y es muy notorio. | La causa estaba en los archivos, no en los números: el del Horizon traía 24% de ancho vacío alrededor del producto y el de la MF ONE solo 6%, así que al fijar el ancho de la caja el Horizon salía mucho más chico de lo que decía el porcentaje. Se recortaron los tres archivos al ras del producto y se recalcularon los anchos: 64% el Barrel, 100% la MF ONE y 95% el Horizon. A 1440 quedan en 208, 325 y 309px de ancho. | 3 imágenes + 5 archivos |
| 18 | El Horizon sigue viéndose más chico que el Barrel, también en el menú desplegable. | El criterio pasa a ser el largo real de la tina. Medido: la tina ocupa 62.2% del ancho del archivo en el Barrel, 98.8% en la MF ONE y 73.4% en el Horizon, porque dos de las tres comparten cuadro con su motor. De ahí salen 66% el Barrel, 91% la MF ONE y 100% el Horizon, así cada tina mide a lo largo lo que mide en la realidad. Revisadas las 47 páginas construidas: todas con los mismos valores. | 3 imágenes + 5 archivos |
| 19 | Un punto intermedio entre A y B: la MF ONE como en A, el Barrel como en B y el Horizon en medio. Además el piso se ve de distinto tamaño en cada tarjeta. | Quedaron MF ONE 100%, Horizon 97% y Barrel 66%. Y la caja del piso pasa a ser la misma en las cuatro rejas: proporción 3 a 2, 4% de aire a los lados y 11% abajo, todo en porcentaje. Antes cada reja tenía su propia caja (una con alto mínimo, otra 4:3, otra con relleno en píxeles) y el piso gris salía distinto en cada una. Medido a 1440: las tres cajas miden 325 x 217. | 5 archivos |
| 20 | Ningún producto debe tener botón de compra abajo; ensucia el diseño. Rafa propone un sticky add to cart discreto en las dos versiones. | Fuera los botones de compra de la parte baja de las tres fichas: el de Especificaciones y el del cierre. En su lugar hay una barra fija de 58px que aparece al pasar los 700px de recorrido y se retira sola al llegar al pie, con nombre, precio vivo y agregar al carrito. El globo de WhatsApp sube mientras está puesta. | 5 archivos |
| 21 | El comparador de motores en celular parece tabla de Excel. | En angosto se va la rejilla: cada característica es un bloque y cada motor un renglón con su nombre a la izquierda y su respuesta a la derecha, sin líneas verticales ni celdas. En computadora no cambia nada. | ComparadorMotores.tsx |
| 22 | Rafa quiere dos fotos más del Barrel negro, de la carpeta BARREL ESTUDIO BLANCO del escritorio. | Elegidas dos de las quince: una con el modelo de pie detrás de la tina y el motor a la vista, y otra entrando a la tina. Recortadas a cuadrado 1500x1500 como las otras cuatro. La galería del negro pasa de cuatro a seis. | 2 imágenes + mf-barrel |
| 23 | Cambiar la foto del Pro Deck del bloque Complemento por una donde solo salga el escalón con sus letras MIND OVER BODY. | Recortadas de los renders: la negra de negro-1 y la blanca de blanco-2, que es donde el escalón sale separado de la tina. Puestas sobre el mismo gris del render en formato 1.8 a 1, que es el de la caja de la tarjeta. | 2 imágenes + mf-one |
| 24 | En el resultado del quiz la foto de la MF ONE blanca tiene fondo gris y desentona. | Era la única de las seis con fondo. Se rehicieron las dos de la MF ONE a partir de los renders de ficha, que están sobre blanco, así que ahora las seis van sobre blanco y la pareja negra y blanca es el mismo render en dos colores. | 2 imágenes |
| 25 | El pie de página en teléfono está sobresaturado, mucha información desde el inicio y mal acomodada. | Los cinco grupos pasan a estar plegados: se ve la estructura y se abre lo que se busca. Antes eran 24 enlaces de golpe en dos columnas de distinto largo, con huecos entre ellas. El pie baja de 1239 a 594px. En computadora no cambia nada. | Footer.tsx, metal.css |
| 26 | Las fotos de los motores en el comparador se ven espantosas por los bordes negros. Dejó una carpeta con una foto por color. | Las dos fotos nuevas, recortadas al ras y centradas sobre blanco en cuadrado. Y la caja deja de recortar: pasa de object-cover a object-contain, que era lo que dejaba las franjas a los lados. Las dos llevan 14% de aire alrededor del equipo para que en la miniatura no queden pegadas a la orilla. La del Motor MF ONE se queda como estaba: se probó el render de ficha y Saul prefirió la anterior. | 2 imágenes + ComparadorMotores |
| 27 | La foto del Motor MF ONE sigue viéndose mal junto a las otras dos. | Es la misma toma de siempre, la del chiller integrado, pero recortada del fondo gris y puesta sobre blanco con el mismo aire que las otras dos. Las tres se ven ya como una sola serie. | motor-mfone.jpg + ComparadorMotores |
| 28 | Cambiar el video de la MF ONE por el de "MF ONE - Video Diferencia 01" del escritorio. | El original es vertical de 1080x1920 y el hueco es horizontal. Se recortó la banda donde vive el producto y quedó en 1280x720, sin audio, 3.8 MB. Poster nuevo del mismo video. **Al publicar hay que volver a subir este video a Shopify Files y actualizar videos-shopify.json**, porque el tema apunta a la URL del archivo viejo. | video-pagina.mp4 + poster |

---

## Ya en Shopify

| # | Comentario | Qué se hizo | Commit |
|---|---|---|---|
| 1 | La portada en teléfono se ve estúpidamente grande | El hero medía una pantalla completa y vive debajo del anuncio y del menú, así que siempre se pasaba del pliegue. Pasa a 72% del alto real de la pantalla, con tope de 720px, el texto baja al pie y se agregó un recorte de la foto para vertical. | af18b93 |
| 2 | El cambio afectó la vista en computadora | El corte era por ancho más orientación vertical, y una ventana de computadora angosta y alta también es vertical. Queda por ancho solo, hasta 840px. | af18b93 |
| 3 | En teléfono hay muchos espacios muertos | Productos: la bandeja de cada tarjeta era de 300px fijos y la foto solo mide entre 121 y 150px. Ahora la bandeja mide lo que pide la foto. Características: la columna pagaba 93px de relleno por lado. | b183ce6 |
| 4 | Tampoco espacios muertos en computadora | La bandeja de producto ahora sigue al ancho de la ventana, y la reja pasa a tres columnas hasta 1024 y no desde 768, porque en iPad vertical dejaba fotos de 94px con 110 de blanco encima. | c41ceb1, 7444a78 |
| 5 | Filtración está muy larga, que se parezca a Temperatura y Control | Era un párrafo más dos palomitas con su explicación. Pasa a un párrafo del mismo largo. Al emparejarse los tres, volvió la rotación automática en teléfono y se borró el código que solo existía para tapar la diferencia. | 15589de |
| 6 | Déjalo más abstracto, sin especificar por modelo | "Cada modelo trae su propio sistema de filtración. El agua se mantiene limpia entre una inmersión y la siguiente, sin cloro de alberca." Sin la palabra "garantiza" para no comprometernos con una promesa absoluta, y sin mencionar ozono porque el Motor Pro 2.0 no lo trae. | 01c589e |

---

## Decisiones que siguen abiertas

Estas no bloquean los cambios de diseño, pero sí la publicación.

- Cómo se cobra el anticipo del 40%.
- A dónde manda el formulario de Negocios. Hoy no manda el contacto a ningún lado.
- Peso de envío de los ocho productos nuevos. Siguen en cero, así que la MF ONE
  cobraría $200 de envío en lugar de $6,000.
- Fichas vigentes de los motores.
- Visto bueno de los nueve títulos para Google.
