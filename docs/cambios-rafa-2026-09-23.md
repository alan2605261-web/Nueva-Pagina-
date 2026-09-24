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

Siete. Lo de abajo de la segunda tabla ya está en el tema borrador.

| # | Comentario | Qué se hizo | Archivos |
|---|---|---|---|
| 7 | Rafa: la comparativa sale cortada en celular, hay que deslizar de lado para ver "Otras". Que se vea todo a la vez. Saul eligió, entre tres propuestas, la de palomita y tache, y pidió que solo cambie en celular. | Solo abajo de 680px: la frase de Mente Fria se vuelve la etiqueta de la fila y las dos columnas se reducen a palomita y tache. Sin deslizamiento lateral, la tabla completa mide 358px y cabe en pantalla. De 681px para arriba queda exactamente como estaba, con las dos frases lado a lado. | LandingV2.tsx, metal.css |
| 8 | Rafa: en celular las tarjetas de 30 días, garantía y financiamiento están muy grandes y toscas; que sean mucho más chicas. Saul: en el iPad también acuéstalas. | Hasta 1023px la tarjeta se acuesta: el icono al lado y el texto a la izquierda. En celular pasan de 203 a 224px de alto a 91, y en iPad vertical de 289 a 75. El bloque completo baja de 712 a 356px en celular y de 950 a 316 en iPad. De 1024 para arriba quedan las tres de lado a lado, verticales y sin cambio. | LandingV2.tsx, metal.css |
| 9 | Rafa: las fotos de los tres plunges no coinciden en tamaño; volver a los tamaños de la primera versión. Saul mandó la captura de esa versión. | Medidos sobre su captura: el producto ocupa 70% del ancho de su caja en el Barrel, 78% en la MF ONE y 84% en el Horizon, con columnas iguales. Esos son los valores que quedaron. En escritorio la MF ONE va al 61% porque su columna es 1.25 veces más ancha, que equivale al mismo 78%. Antes iban 68, 76 y 100: en una sola columna eso dejaba la MF ONE como la foto más chica de las tres. | LandingV2.tsx |
| 10 | Rafa: entre MF Barrel y MF ONE hay un espacio en blanco muy grande. | La bandeja tenía un alto mínimo de 176px que sobraba cuando la foto era más chica, y la separación entre tarjetas era de 32px. Ahora la bandeja mide exactamente lo que pide la foto y la separación baja a 24. El blanco encima de cada foto quedó en cero. De paso, el tamaño del archivo va en el marcado para que el navegador reserve el hueco y la bandeja no brinque al cargar. | LandingV2.tsx |
| 11 | Rafa: en teléfono la MF ONE queda en segundo lugar; debe ir primero ONE, luego Horizon y luego Barrel. | Abajo de 1024px se reordenan solo visualmente. En pantalla ancha siguen Barrel, MF ONE y Horizon, con la estelar al centro del triángulo. | metal.css |
| 12 | Rafa: hay guiones largos en varios lugares; no debe haber ninguno, ni en celular ni en computadora, y no solo en ese bloque. | Se recorrió todo el código: 39 guiones en texto visible, en 18 archivos. Todos sustituidos por punto, coma, dos puntos o paréntesis según el caso, y los rangos numéricos pasan a "de X a Y". Queda un revisor, `npm run sin-guiones`, que recorre las 47 páginas ya construidas y falla si aparece uno; así se atrapa también lo que entre desde el blog o desde datos, no solo lo escrito a mano. | 18 archivos + scripts/sin-guiones.mjs |
| 13 | Rafa: quitaría el distintivo de "Cambia" del comparador de motores, siente que confunde, y el azul tampoco le gusta. En celular además lo desordena. | Fuera el distintivo y fuera el fondo azul de las filas que cambian. Con los tres motores puestos cambian diez de once filas, así que marcarlas no informaba de nada. También se quitó el interruptor "Solo diferencias", que con los tres motores solo escondía una fila. | ComparadorMotores.tsx |

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
