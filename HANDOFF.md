# HANDOFF — Website Mente Fria

> Documento de traspaso completo. Si estás leyendo esto, vas a continuar el desarrollo
> de este sitio. Aquí está TODO el contexto: el plan, el sistema de diseño, las reglas,
> el estado de cada página, los pendientes y los workflows. Léelo completo antes de
> tocar código. Última actualización: 2026-07-15.

---

## 1. Qué es este proyecto (y qué NO es)

Este repo es el **blueprint de diseño de alta fidelidad** del nuevo sitio de Mente Fria,
construido en **Next.js 16**. NO es el sitio de producción final.

**El plan completo, en orden:**

1. **Origen — 3 builds separados que se combinaron en uno:**
   - *mentefria.com actual (Shopify)* → aportó estructura, información, precios, flujo y copy real.
   - *Clon Next.js de eightsleep.com* → aportó la base técnica y el esqueleto multi-página (13 rutas).
   - *Diseño "site_v2" de Claude Design* → aportó la dirección visual: mundo metálico, liquid glass, azul hielo.
2. **Fase actual (esta):** pulir el diseño página por página con Rafa, usando solo material
   real de la marca (renders de fábrica, sesión lifestyle, manuales técnicos). El objetivo es
   dejar el diseño **100% cerrado**.
3. **Deploy actual:** GitHub (`rafabech-ux/mentefria-website`, público) + Netlify
   (mentefria-website.netlify.app) con CI: push a `main` = build + deploy automático.
   **Esto es solo un preview compartible / respaldo — NO se está "lanzando" nada ahí.**
4. **Destino final:** tema custom de **Shopify Online Store 2.0 en Liquid**, construido desde
   el Skeleton theme, siguiendo este blueprint pixel por pixel. **NO se convierte este código**
   — se construye el Liquid nuevo usando este sitio como referencia visual exacta. El plan
   técnico detallado del tema Liquid está en el vault:
   `Mente Fria Brain/75 Reports/2026-05-31 - Website Build Plan - Custom Shopify Liquid Theme.md`
   (tokens → 3 templates ancla → metaobjetos specs/FAQ → GSAP/Lenis → SEO/AEO es-MX).

**Por qué Shopify Liquid y no headless:** checkout/inventario nativos, apps (suscripciones,
reviews, widget WhatsApp de Respond.io) son app-blocks de Liquid, y el server-rendering es
mejor para SEO/AEO.

---

## 2. Stack y comandos

- Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · shadcn/ui · Lucide
- **Export estático**: `output: "export"` → carpeta `out/` (así lo publica Netlify)

```bash
npm run dev        # dev server (puerto 3000)
npx tsc --noEmit   # typecheck rápido
npm run build      # build de producción (lo mismo que corre Netlify)
```

**Gotcha #1 — Turbopack cache:** si el dev server sirve CSS/JS viejo después de editar
(pasa seguido), el fix es `rm -rf .next` + reiniciar el server.

**Gotcha #2 — archivo fantasma de tipos:** a veces aparece `.next/types/routes.d 2.ts`
(duplicado con espacio) que rompe `tsc`. Bórralo: `rm -f ".next/types/routes.d 2.ts"`.

---

## 3. Sistema de diseño (el corazón de todo)

Vive en **`src/app/metal.css`** (sistema "metal", portado del Claude Design site_v2) +
`src/app/globals.css` (capa base tipo Eight Sleep). Referencias de nivel: **Apple × Plunge ×
WHOOP × Eight Sleep**. Plunge es especialmente importante: **es el mismo proveedor/producto
que el MF ONE**, así que su forma de vender (PDP, accesorios, comparativas) es directamente
aplicable.

### Colores (LOCKED — no cambiar sin Rafa)
- **Acento principal**: azul hielo `#5B9BD5` (`--accent-ice` / `--m-blue`). Tonos: `--m-blue-600
  #4a86c4` (sobre blanco), `--m-blue-400 #8fbee6` (sobre oscuro), `--m-blue-ice #6fa8dc`.
- **Azul eléctrico `#001BFF`**: SOLO en gradientes y glows, nunca plano. (Es el azul oficial
  de marca, pero en web se usa como "chispa", ej. el gradiente de StatSpark.)
- **Bento/temperaturas**: frío `--mf-cold #4C90C6`, calor `--mf-heat #C0392B`. Números de
  temperatura llevan color; unidades no-temperatura van en blanco.
- Mundo neutro: plata/acero/cromo (gradientes `--grad-silver`, `--grad-steel`, `--grad-ink`),
  tinta `#0b0c0e`, paneles claros `--bg-panel`.

### Tipografía
- **Aileron** (self-hosted) en todo. Display = clase `mdisplay` con
  `WebkitTextStroke: var(--bold-stroke) currentColor` (0.5px — "Bold stroke" del design lock).
- Eyebrows: `m-eyebrow accent` (uppercase, tracking ancho, azul hielo).

### Componentes/clases clave de metal.css
- `msection` / `mwrap` / `msection-head` — secciones y contenedores.
- `panel` (fondo gris claro), `dark-s` (fondo gradiente ink oscuro — OJO: pinta el texto
  interior de blanco por herencia; las cards blancas dentro necesitan `text-foreground`).
- `mbtn` + variantes: `mbtn-primary` (negro), `mbtn-blue` (azul), `mbtn-ghost`.
- `glass-nav` — navbar liquid glass (backdrop blur + gradiente cromado).
- `stats-wrap` / `stats-grid` / `stat` con `.n .n-cold/.n-heat` — tiles de stats oscuros.

### Patrones de diseño establecidos (reutilízalos, no inventes nuevos)
- **Pop-out de producto**: panel gris como capa trasera (`absolute bottom-0 top-[45%]`),
  producto PNG transparente flotando encima con `drop-shadow`, rompiendo el marco por arriba
  (estilo WHOOP). Está en el landing (triángulo de productos) y en las cards de /productos.
- **Cards de features con imagen full-bleed** + degradado oscuro abajo + título/copy encima
  (estilo Plunge lineup) — en /productos "El mismo ADN en toda la línea".
- **Grid lifestyle 4-up** con columnas pares desfasadas (`lg:translate-y-6`) — sección
  "Mente Fria, en todas partes." en /productos, dividida por producto (Barrel/Horizon/ONE).
- **Díptico interactivo frío/calor** (`FrioCalor.tsx`): dos fotos que "respiran" alternándose
  cada 4s, hover expande, badges 0°C/40°C. En el PDP MF ONE.
- **Bento animado** (`MfOneBento.tsx`): diseño de Rafa ("Feature Cards Animated v2" de Claude
  Design), animaciones SVG en vivo con rAF. Sección sobre fondo BLANCO, cards negras.
- **MotorPicker** (`src/components/MotorPicker.tsx`): comparador Motor Pro 2.0 vs Premium 2.0,
  COMPARTIDO entre /productos, mf-barrel y mf-horizon — cualquier cambio ahí aplica a los 3.
  Features alineados por fila: 1 enfriamiento · 2 filtración · 3 WiFi · 4 calefacción · 5 ozono.
  Foto motor blanco en card Pro (izq), motor negro en Premium (der).
- **StatSpark** (`src/components/StatSpark.tsx`): stats con count-up al scroll y números en
  gradiente azul hielo→eléctrico; "0 hielos" cuenta HACIA ABAJO.
- **Stretched link**: las cards de /productos son 100% clickeables (Link `absolute inset-0
  z-[5]`; el botón va con `relative z-10`).

### Gotchas de CSS aprendidos a golpes
- `metal.css` tiene `img { max-width: 100% }` — para productos que deben desbordar usa
  `!max-w-none flex-none`.
- **`mix-blend-multiply` + z-index**: un `z-*` crea stacking context y AÍSLA el blend del
  fondo (aparecen cajas blancas). No pongas z-index en imágenes con multiply.
- **Sticky en grid**: la celda debe estar estirada (NO `self-start`) con un div interno
  `lg:sticky lg:top-24`. Así funciona la galería sticky del PDP.
- `scroll-behavior: smooth` global hace que la navegación entre páginas parezca scroll —
  ya está resuelto, no lo regreses.
- Los porcentajes de altura NO resuelven contra tiles con `aspect-ratio` (altura indefinida)
  — usa px fijos (así están las alturas del mega-menú).

---

## 4. Reglas duras de negocio y contenido (NUNCA romperlas)

1. **"Mente Fria" sin acento**, siempre. Decir **"cold plunge"**, no "tina helada".
   **ACTUALIZADO sep 2026 (Saul):** el género es **femenino** — "la cold plunge", "la mejor
   cold plunge que has probado" — para alinear con mentefria.com. La regla original de Rafa
   decía masculino; quedó sin efecto.
2. **MF ONE nunca se combina con Motor Pro/Premium/Comercial** — es all-in-one con chiller
   1 HP integrado. Los motores son SOLO para Barrel y Horizon.
3. **No inventar datos.** **ACTUALIZADO sep 2026 (Saul): el sitio vivo mentefria.com YA NO
   es fuente de verdad para información** — solo sirve de referencia para funcionalidad y para
   algunas fotos, porque el catálogo se está actualizando. Las fuentes vigentes del MF ONE son
   los tres documentos del **31 de agosto de 2026**: "MF ONE Ficha.pdf", "MF ONE MANUAL.pdf" y
   "MF ONE Garantia.pdf". Si un dato no está ahí, se omite: no se rellena con el sitio vivo ni
   con manuales de fábrica anteriores.
4. **Specs MF ONE · CP-ONE** (ficha y manual oficiales, ago 2026 — CORREGIDAS, las de
   jun 2026 estaban mal): **rango de ajuste 1 a 40 °C** (NO 0, NO 42) · temperatura ambiente de
   operación 3 a 40 °C · velocidad de enfriamiento 4 a 6 °C/h · 1 HP · enfriamiento 3,500 W ·
   calentamiento 1,000 W · 195×80×71 cm · 420 L · 135 kg · bomba 150 W a 8,000 L/h · 68 dB(A) ·
   **R32 · 500 g** · **filtro de papel + skimmer** (el de carbón viene en la caja pero es un
   extra, NO un requisito de operación) · ozono integrado · potencia de entrada 1,320 W ·
   **110 V/60 Hz, 12 A máx, contacto dedicado de 16 A con tierra** · app **Smart Life** (WiFi
   2.4 GHz) · espacio libre 100 cm al frente y 20 cm por lado · $169,000 MXN + IVA · garantía
   12 meses · envío $6,000 · hecho en China.
   **Lo que incluye:** unidad con módulo de enfriamiento integrado, cubierta aislante, filtros
   de papel y de carbón, llave de filtro, skimmer y portacelular. El PRO DECK va aparte.
   **NO decir:** certificación CE (no la tienen), hidromasaje (ya no lo trae), LED exterior
   (la iluminación es solo interior).
5. **Inflables** — **ACTUALIZADO sep 2026 contra el Manual Mente Fria v6, que Saul
   confirmó como fuente de verdad vigente.** Hay 30 unidades del modelo anterior en
   stock, así que estas specs siguen aplicando aunque el proveedor cambie pronto.
   · **MF Horizon** $74,000 — 160×70×65 cm · **12 kg** · **550 L máx / 400 L recomendado**
   · **MF Barrel** $69,000 — Ø90×90 cm · **11 kg** · **500 L máx / 350 L recomendado**
   · **Material: tejido drop-stitch de grado militar.** La "fibra de vidrio" que decía
     el sitio NO aparece en ningún documento de fábrica: era invención del sitio vivo.
     Rafa había prohibido "grado militar" y puso el dato sin respaldo en su lugar.
   · **Filtración: 3 capas — filtro de papel, filtro integrado y malla antipolvo.**
     NO decir "3 filtros de 1 a 5 micras": eso no está documentado y se presta a
     reclamación porque suena a tres cartuchos de ese micronaje.
   · garantía 6 meses · envío $1,500 · incluyen: mochila, bomba doble acción,
     cubierta con seguro para niños, filtros y kit de reparación.

6. **Motores 2.0** — Pro = 0.8 HP, enfría a 3 °C, SIN calor ni ozono, **55×42.5×53 cm**,
   39 kg, IPX4. Premium = 1 HP, enfría a 3 °C, **calienta a 42 °C**, ozono de alta
   eficiencia, 58.5×42.5×53 cm, 41.5 kg, IPX4. Ambos con la filtración de 3 capas.

   **CORREGIDO sep 2026 — el manual dice 43, el dato bueno es 42.** El Manual v6, tanto
   en inglés ("Heating Capability: 43ºC") como en español ("Capacidad de calentamiento:
   43°C"), dice 43. Saul corrigió: *"El Motor Premium no calienta hasta los 43, calienta
   hasta los 42."* Se publicó 42 en las 15 apariciones del sitio. Si alguien vuelve a
   revisar el manual y "corrige" a 43, está deshaciendo una corrección deliberada del
   dueño; el manual está mal, no el sitio.

   **Consumo eléctrico: FUERA del sitio.** Los 2,230 W / 2,700 W que estaban publicados
   no salen del manual. Se revisaron las 12 páginas de la v6 en ambos idiomas y **no hay
   un solo dato eléctrico**: ni watts, ni volts, ni amperes, ni Hz. Venían del handoff
   original sin fuente. Se eliminaron de /motores y de la PDP del Horizon. No volver a
   publicarlos hasta tener la ficha eléctrica del proveedor por escrito. Los tiempos de
   enfriamiento (~6 h / ~4 h) tampoco están en el manual y siguen sin respaldo.

7. ~~Decir "filtro de 20 micrones"~~ — **OBSOLETA.** La documentación de ago 2026 habla de
   **"filtro de papel"** en el MF ONE. Los "3 filtros de 1–5 micrones" siguen siendo de los
   inflables. Tampoco decir "cartucho plisado".
8. Comercial: 30 días de prueba · hasta 6 MSI Mercado Pago · WhatsApp +52 56 16 47 13 86
   (wa.me/5215616471386). **"Agendar demo" = WhatsApp; "Comprar/Agregar al carrito" ≠ WhatsApp**
   (apunta al producto del sitio vivo por ahora).
9. B2B/leasing (de /negocios): 12 o 24 meses, anticipo 10%, comisión apertura 2%, residual 5%,
   renta 100% deducible (siempre con disclaimer "según régimen fiscal — consulta a tu contador"),
   propuesta <24 h, aprobación 3–7 días. Clientes/activaciones REALES para case studies:
   **Hyrox Cancún 2026** (Recovery Zone oficial, Malecón Tajamar, carpa de atletas, ~20,000 L,
   coach en sitio; CDMX en negociación), **Westin Santa Fe** (activación con creadores jun 2026),
   ~~Casa Polanco~~ — **el proyecto NO se realizó (confirmado por Saul, sep 2026).
   Estuvo publicado como caso real con "60 días de inmersiones"; era falso y se eliminó.
   No volver a usarlo.**
10. El sitio vivo tiene contenido residual de "Edge Theory Labs" en el Centro de Ayuda —
    **NUNCA reproducirlo**.
11. **ACTUALIZADO sep 2026: la entidad legal YA EXISTE.** Comercializa y otorga la garantía
    **MFMF Wellnes and Lifestyle, S.A. de C.V.** (RFC MWL260414PHA), Calle Agustín Manuel
    Chávez 1 int. 102, Col. Santa Fe, C.P. 01210, Álvaro Obregón, CDMX. Importa **Laplace
    Business & Consulting, S.A. de C.V.** (RFC LBA260414C93), mismo domicilio. Aparece en
    /garantia, /terminos y /privacidad vía `src/components/LegalEntity.tsx` — cambiar ahí y se
    actualiza en las tres. **"Wellnes" va con una sola s**, tal como está en la póliza.
12. Sin números fabricados de reviews (no "4.9 estrellas / 1,240 reseñas" — eso se eliminó).
13. **Los rangos de temperatura del MF ONE y de los inflables NO son los mismos y no se
    mezclan.** MF ONE: 1 a 40 °C. Inflables con Motor Premium 2.0: 3 a 42 °C. Con Motor Pro
    2.0: hasta 3 °C y sin calor. Cualquier copy que hable de temperatura debe decir de qué
    producto habla.
14. **No hay certificación CE.** Se eliminó de los 20 lugares donde aparecía (jun 2026 la
    afirmaba sin respaldo). No volver a ponerla hasta que exista el certificado.
15. **Garantías independientes por producto**: MF ONE 12 meses con póliza propia y detallada;
    Barrel/Horizon 6 meses. NO atribuir a los inflables las condiciones del MF ONE. Falta
    redactar la póliza de los inflables.

---

16. **Fotografía real de la MF ONE nueva (sesión de patio, sep 2026).** Está en el Drive
    compartido, carpeta "FOTOS CC": 21 archivos DSC05xxx de 4128×6192 tomados con Sony
    FX30. Los recortes de web viven en `public/photography/mfone-patio/`. **Es la única
    fotografía real del producto que existe**: todo lo demás en `images/mfone-gallery/`,
    `prod-mfone.webp` y `hero/mf-one-concrete*.jpg` son renders CGI. Los renders muestran
    una rejilla redonda en el testero y el producto real trae una rejilla rectangular en
    el costado, así que **no son intercambiables**. Preferir la foto real siempre que la
    composición lo permita.

17. **La prueba de 30 días es real: usar el equipo NO descalifica. RESUELTO sep 2026.**
    `/devoluciones` se contradecía: prometía "pruébala 30 días sin compromiso" y tres
    párrafos después decía que el reembolso al 100% aplicaba al "producto sin abrir, sin
    usar y sin daños" y que el "producto usado no es elegible". Saul decidió a favor de la
    promesa publicada: *"déjala como el de sin preguntas"*. La página se reescribió y ahora
    dice explícitamente que llenarla, meterse y usarla todos los días del mes es el punto,
    y que el desgaste normal de un mes de uso no es daño. Lo único excluido es el daño por
    uso indebido, las piezas faltantes y las solicitudes fuera de plazo. **No volver a
    meter condiciones de "sin abrir" o "sin usar".**

18. **"Atención de por vida" se eliminó del sitio. Decisión de Saul sep 2026.** Se leía como
    mantenimiento vitalicio y no es lo que se ofrece: *"no es mantenimiento de por vida, es
    que les vamos a responder"*. Las 14 apariciones se reemplazaron por redacción menos
    absoluta —"cuando se acabe la garantía, nos sigues escribiendo", "siempre hay a quién
    escribirle", "y después, seguimos aquí"—. **No reintroducir "de por vida" ni "soporte
    vitalicio".**

    Sigue publicado y no lo tocamos porque es decisión comercial: **"la cold plunge #1 en
    México"**, que es una afirmación de superioridad no verificable. Conviene que legal la
    revise junto con los términos.

19. **Enlaces científicos: son de Saul, no generados.** Los 16 enlaces de `/aprender` y los
    6 del consejo científico se extrajeron uno a uno de las páginas del sitio vivo que él
    ligó a mano (`la-ciencia-detras-de-las-tinas-heladas` y
    `quien-recomienda-el-cold-plunging`). Viven en `src/lib/ciencia.ts`. Dos de los 16 son
    divulgación (Healthline y Psychology Today), no estudios: están marcados con
    `tipo: "divulgacion"` y la página ya no afirma que todas las referencias sean
    peer-reviewed. **"Mayor dopamina natural" es el único beneficio sin enlace**, igual
    que en el sitio vivo. No asignarle uno por parecido.


20. **El color NO identifica al modelo de motor.** Pro y Premium se piden los dos en blanco
    y en negro; lo confirmó Saul en sep 2026. El comparador tenía la foto blanca en la
    tarjeta del Pro y la negra en la del Premium, lo que sugería lo contrario. Además no
    consta cuál de los dos modelos es la unidad fotografiada, así que atribuirle una foto a
    uno u otro sería inventar. Ahora las fotos salieron de las tarjetas y viven en una
    figura compartida arriba del comparador, con pie que lo dice. Los archivos se
    renombraron a `motor-2-0-blanco.jpg` y `motor-2-0-negro.jpg` justo para que nadie los
    vuelva a leer como "el del Pro" y "el del Premium".

    **Solo se publica la foto del motor NEGRO.** La del blanco está bien encuadrada y sigue
    en el repo, pero su placa dice "MASTER THE MIND" (ver regla 21). El dato de los dos
    colores va en el pie de foto, que es texto.

    **Lo que sí distingue a los modelos** son los 0.8 vs 1 HP, la calefacción, el ozono, el
    tiempo de enfriamiento y las medidas (55 vs 58.5 cm de ancho, 39 vs 41.5 kg).

21. **"MASTER THE MIND" es el logo anterior y quedó abolido.** Confirmado por Saul en sep
    2026. El tagline vigente es **"MIND OVER BODY"**. Se revisaron las fotos de producto en
    uso: las tinas —MF ONE real de patio, MF ONE render de estudio, prod-barrel,
    prod-horizon— todas llevan el logo actual. **La única pieza con el logo viejo es
    `public/images/motor-2-0-blanco.jpg`**, que por eso salió del sitio. Si aparece otra
    unidad fotografiada con esa placa, no se publica.

    Ojo: "MIND OVER BODY" sí es el eslogan de la marca, pero eso no lo vuelve un titular
    válido en cualquier lado. Ya se corrigió una tarjeta de `/atletas` donde se usaba como
    si fuera el nombre de un beneficio.

22. **Quiz "Encuentra tu plunge" (`/quiz`).** Pedido por Saul y por Rafa, con el quiz de
    Plunge como referencia. No se copió su implementación: se armó con nuestras medidas.

    · **Descarta antes de puntuar.** Hay restricciones físicas, no preferencias: si el lado
      largo del espacio mide 1.4 m, la MF ONE no cabe (necesita 195 de tina + 100 de frente
      libre = 295 cm) y no hay puntaje que lo arregle. Se eliminan los imposibles y sólo
      después se puntúa entre los que quedan.
    · **Avisa lo incómodo.** Si alguien de 1.85 m quiere estirarse y su presupuesto sólo
      alcanza el Horizon, se lo recomienda pero le dice que el interior mide 160 cm. Un quiz
      que sólo halaga vende una devolución.
    · **Sin muro de correo.** El resultado se ve sin dar datos. Encerrarlo detrás de un
      formulario es la forma más rápida de que cierren la pestaña.

    **Lo que falta, y necesita decisión o backend:**
    a) **Captura de correo.** Hoy no hay a dónde mandar un formulario: el sitio es export
       estático. El resultado se manda por WhatsApp con el resumen ya escrito, que funciona
       sin servidor. Cuando esté en Shopify, ese mismo resumen es lo que hay que empujar a
       Klaviyo junto con el correo.
    b) **El PDF de regalo** que pidió Saul no existe todavía. No se anuncia lo que no hay.
    c) ~~Precio de los motores~~ — **RESUELTO.** Los $69,000 y $74,000 **ya incluyen el
       motor**: la tina y el motor no se venden por separado (Saul, sep 2026). El quiz
       muestra un solo precio y nunca habla de sumar el motor; sí recomienda cuál de los
       dos conviene, porque esa elección sigue existiendo.

23. **"MASTER THE MIND" también está en la carpeta Fotos Shopify.** Se revisaron las 20
    imágenes de esa carpeta del Drive: todas llevan el logo vigente MIND OVER BODY **menos
    `MOTORES/MOTOR NEGRO SHOPIFY.png`**, que trae el abolido. Junto con
    `images/motor-2-0-blanco.jpg` (ver regla 21), son las dos piezas conocidas con el logo
    viejo. Ninguna se publica.

24. **Carpeta "Fotos Shopify - Mente Fria" del Drive.** 20 PNG a 3125×3125, las que Saul
    subió al sitio vivo. Bajada a `~/Desktop/MENTE FRIA - Fotos Shopify`. Los accesorios
    vienen ya con transparencia de origen y son mejores que los recortes que se habían hecho
    a mano: de ahí salen el MF Mat, los dos Pro Deck y el juego de filtros del Motor Premium.
    También hay lifestyle real (Barrel junto a la chimenea, grupo en la alberca, golf,
    Horizon en la playa y en la van) que todavía no se usa en el sitio.

    Ojo con un cruce: `unnamed-removebg-preview.png` son TRES filtros, no uno. No sirve para
    "Filtro de papel" de la MF ONE, que es un solo cartucho.

## 5. Estado página por página

### `/` — Landing (`src/components/LandingV2.tsx`)
Completo. Hero (eyebrow azul claro #8FBEE6), announcement bar ("HASTA 6 MESES SIN INTERESES ·
PRUÉBALA 30 DÍAS SIN COMPROMISO"), features 0–40°, Ocho Razones, comparativa MF vs otras,
trust compacto, **triángulo de productos** (Barrel 88% / ONE 90% featured / Horizon 137% con
nudge — PNGs transparentes con pop-out), testimonios con video inline (sin lightbox),
sección B2B, chat FAB de WhatsApp.

### `/productos` (`src/app/productos/page.tsx`)
Rehecha por completo:
1. Header + 3 cards pop-out clickeables (orden: **Barrel → Horizon → ONE**), "Ver ahora",
   fondo de sección **dark-s (negro)** — Rafa lo dejó en negro "por ahora, quizá cambie a
   blanco después" (es 1 clase: `dark-s` ↔ `!bg-white`).
2. "El mismo ADN en toda la línea." — 4 tiles de features con imagen; el de "Agua cristalina"
   es un TRÍPTICO: filtro de carbón (vertical) | filtro 20 micrones | ozono (agua).
3. `MotorPicker` (compartido) con chip "Solo para MF Barrel y MF Horizon — el MF ONE no
   necesita motor".
4. "Tecnología que se paga sola." + `StatSpark` animado.
5. "Mente Fria, en todas partes." — 3 bloques de 4 fotos (Barrel/Horizon/ONE) con link a PDP.
6. CTA oscuro final.

### `/productos/mf-one` — PDP flagship
Nivel Plunge, COMPLETO y aprobado por Rafa: hero con galería sticky (11 slides por color:
frontal + 10 renders; slide 11 = cotas de dimensiones), buy box (color Negro/Blanco, add-on
**MF ONE PRO DECK $6,900** estilo Plunge Basin con total dinámico, 4 acordeones, 3 trust
cards), "La diferencia" (tiles oscuros + video 51MB gitignored), **bento animado**, "Accesorios
incluidos" (9 cards, 5 con foto real de fábrica — filtros, filtro de carbón, red, soporte
celular, patitos; 4 con placeholder), **díptico FrioCalor**, chiller "Siempre limpia. Siempre
fría. Siempre lista." (caja 19× + 6 features en lista editorial con puntos azules), carrusel
de beneficios, ficha técnica (20 filas, id `ficha-tecnica`), FAQ, **CTA final B2B claro**
(estilo B2BBand: "¿Y si el MF ONE se pagara solo?" + stats 100%/12–24/<24h + "Cotiza para tu
negocio"). SIN sticky buy bar (se eliminó a petición de Rafa).

### `/productos/mf-barrel` y `/productos/mf-horizon`
Construidos clonando la estructura del MF ONE (sin PRO DECK, sin B2B, sin bento): hero +
buy box (1-2 fotos por color `pdp-*-{negro,blanco}.png`), "La diferencia" (Barrel: foto
estudio con tapa; Horizon: foto del patio), `MotorPicker`, "Llévala a donde quieras."
(portabilidad — Barrel: golf + retrato moody; Horizon: playa + van), accesorios incluidos
(placeholders), beneficios, ficha, FAQ, CTA de compra. Contenido 100% del sitio vivo.

### `/accesorios`
Reestructurada: "Completa tu setup." (PRO DECK con foto, MF Mat placeholder, soporte celular)
→ **"Agua impecable, siempre."** (id `mantenimiento`: filtro 20 micrones, filtro de carbón,
kit filtros inflables, **Oxidante Sirona "Próximamente"** — espacio reservado estilo Plunge)
→ "Lo que ya viene en la caja." (kit MF ONE con fotos) → calendario de mantenimiento → CTA.

### Navbar (`src/components/Navbar.tsx`)
Liquid glass + mega-menú WHOOP de Productos: 3 tiles (alturas px fijas: ONE 100px, Horizon
107px con translate -20px, Barrel 116px) + columna de links: Explora todos los plunges /
Accesorios / **Kits de mantenimiento** (→ /accesorios#mantenimiento) / Para negocios.
Logo del nav a `h-9`.

### Footer (`src/components/Footer.tsx`)
Solo columnas de links + logo + bottom bar. El bloque "Mind over body + Compra el MF ONE +
newsletter" se ELIMINÓ a petición de Rafa.

### `/negocios`
Funcional (hero, calculadora ROI id `roi`, verticales, leasing, proceso, FAQ, form id
`cotizar`) pero tiene un **rework pendiente aprobado por Rafa** — ver Pendientes #1.

### Otras (`/aprender`, `/atletas`, `/resenas`, `/blog`, `/soporte`, legales)
Existen con contenido real pero **sin el restyle profundo** al sistema metal. Pendiente.

---

## 6. PENDIENTES (actualizado sep 2026)

### Hecho desde el handoff original
- **Rework de /negocios** — los 8 puntos completos, migrada al sistema metal, con gráfica de
  ROI (ingreso acumulado vs costo con el equilibrio marcado), verticales en horizontal, casos
  reales de Hyrox y Westin, proceso con números grandes y FAQ en variante `bold`.
- **Corrección total de datos del MF ONE** contra la documentación de ago 2026 (ver regla 4).
- **Entidad legal** en /garantia, /terminos y /privacidad.
- **/garantia rehecha**, con MF ONE e inflables separados.
- **Optimización de imágenes**: 26 archivos de 203 MB a 11 MB. Originales archivados en
  `~/Desktop/FOTOS-ORIGINALES-WEB/`. Diez cambiaron de extensión (PNG opaco → JPG).
- **Fondos transparentes** en las fotos de accesorios (WebP con alfa).
- **"PARA NEGOCIOS"** ya no se parte en dos líneas (`white-space: nowrap` en `.glass-nav .nl`).
- **Iconos de Instagram y TikTok** en el footer, enlazados.
- **Género femenino** de "cold plunge" unificado en todo el sitio.

### Pendientes
1. ~~Restyle profundo de subpáginas al sistema metal~~ — **HECHO.** Cero clases legacy en
   código vivo.
2. ~~Tarjetas de /soporte~~ — **HECHO dos veces.** Primero gráficos SVG animados azules;
   luego Saul pidió blanco y negro porque el azul competía con la identidad, y que cada
   gráfico dibujara el dato de su tarjeta en vez de ser adorno. Versión actual en
   `SoporteGraphics.tsx`.
3. **Comprimir videos** — falta `ffmpeg`; no hay Homebrew en la Mac de Saul y su instalación
   pide contraseña. Gitignored por peso: `mfone-diferencia.mp4` (el original está en el Drive
   de Saul, privado), testimoniales kevin/surf (PERDIDOS, ver abajo), instalación motor.
4. **Videos perdidos: son exactamente DOS, y ninguno más.** Se recorrió toda la historia de
   git (`git rev-list --all`, buscando cada ruta `/videos/*.mp4` citada en `src/` en cualquier
   commit) y sólo estos dos se referencian sin existir en disco. Todo lo demás está completo.

   | Archivo | Tarjeta a la que pertenecía | Foto que sigue en su lugar |
   |---|---|---|
   | `public/videos/testimonial-kevin.mp4` | Kevin · Runner · CDMX | `photography/action/running-02.jpg` |
   | `public/videos/testimonial-surf.mp4` | Ana · Surfista · Vallarta | `photography/lifestyle/surf-01.jpg` |

   Aparecen por primera vez en el commit inicial de Rafa (`5491fcd`, 5-jul-2026), en el array
   `TESTIMONIALS` de LandingV2. Nunca se versionaron: estaban gitignored por peso, así que el
   zip que Rafa mandó no los traía. No están en disco, papelera, WhatsApp, Drive ni en el
   sitio vivo.

   **Kevin es un atleta embajador de la marca**, confirmado por Saul en sep 2026 (NO es un
   cliente cualquiera ni un modelo contratado: es embajador, y por eso su testimonio sí vale).
   Ojo con un error que ya se cometió: hay una carpeta "Case 08 - Kevin Murko" en el Drive y
   **Kevin Murko es OTRA persona**. Coincidencia de nombre, nada más.

   **La foto ya se arregló** (sep 2026): la tarjeta llevaba una foto de archivo de **dos
   mujeres corriendo**. Ahora lleva un fotograma suyo sacado de su propio material del Drive,
   junto a un MF Barrel, en `photography/testimonios/kevin.jpg`. Su rol dice "Atleta ·
   Embajador Mente Fria", que es lo que es.

   El material de Kevin en el Drive son **anuncios actuados** —habla a cámara con guion y
   subtítulos quemados— no una entrevista de testimonio. Sirve para publicidad; para la fila
   de testimonios hace falta o un corte distinto o cambiar cómo se presenta la sección.

   De las cuatro tarjetas que quedan hoy, sólo **Patricio Ochoa** tiene video y foto real en un
   equipo Mente Fria. **Dani** es un hombre real en un MF Barrel (sesión propia). **Máximo,
   Golfista** es un primer plano de una mano poniendo una pelota en el tee: no se ve a nadie.

   Todo el material bajado del Drive está en `~/Desktop/MENTE FRIA - Material de video`, con
   su propio LEEME.

5. **Assets originales que Rafa nunca pasó y no están en esta Mac.** La carpeta
   `Mente Fria/Mente Fria Website/` completa (ver §7): manuales PDF, renders de fábrica,
   sesión lifestyle original, y `03 Brand & Assets/Videos/` con MF ESTUDIO 01/02 y
   MENTE FRIA X GUDSLIP. Nada de eso está en el repo ni en el disco.
6. **Peso del MF ONE**: Saul confirmó que siguen siendo 135 kg *de momento*, pero el proveedor
   cambió — reconfirmar antes de imprimir nada.
7. **Póliza de garantía de los inflables**: no existe documento equivalente al del MF ONE.
8. **Fotos del evento de Westin Santa Fe** (su caso es solo texto). No existen fotos ni de
   Westin ni de Casa Polanco; esta última además ya no aplica.
9. **Barrel agotado** en el sitio vivo. Decisión de Saul: **el inventario debe vivir en el
   backend**, porque al final el sitio se conecta a Shopify. No hardcodear disponibilidad.
9. **`_DSC02878.jpg` corrupto** — no está en esta Mac ni se referencia en el código; vive en la
   carpeta original de Rafa.
10. **Eventual: construir el tema Shopify Liquid** (Acto 2). Confirmado por Saul: cuando el
    blueprint esté cerrado, todo se pasa a código nativo de Shopify.
11. ~~Arreglar la contradicción de `/devoluciones`~~ — **RESUELTO** (ver regla 17). Queda
    un detalle menor: la página dice que se devuelve lo que pagaste y que la recolección no
    tiene costo, pero no aclara si el envío ORIGINAL se reembolsa, y en la MF ONE son
    $6,000. Confirmar y escribirlo.
12. **Revisión legal de `/privacidad` y `/terminos`.** Los dos están escritos completos y
    fundados —LFPDPPP art. 16 y Reglamento art. 24 el aviso, LFPC art. 76 bis los
    términos—, pero no los escribió un abogado. Falta confirmar: correo del departamento
    de datos personales, qué proveedores reciben datos realmente, si se tratan datos de
    salud, y el domicilio para efectos legales. La lista completa está comentada en la
    cabecera de cada archivo.
13. **Ficha eléctrica del proveedor** para poder volver a publicar el consumo de los
    motores (ver regla 6).
14. **Nuevos renders de la MF ONE.** Saul mencionó que existen. Los renders actuales del
    repo no corresponden al producto que se envía (ver regla 16); mientras tanto se usa
    la fotografía real donde la composición lo permite.
15. **Fotos de producto de MF Barrel y MF Horizon del nivel de la MF ONE.** Hoy las tres
    tarjetas de `/negocios` mezclan dos renders recortados con el render de estudio de la
    ONE. Funciona, pero una sesión de los inflables lo resolvería de raíz.

## 6.5 Cómo publicar una versión para revisar

**Ahora mismo NO hay nada publicado, a propósito.** El 8-sep-2026 se publicó el proyecto
`saul-mf/mentefria-web` para que Saul revisara y él pidió bajarlo enseguida: para revisar le
sirve el localhost, no un sitio en internet. El proyecto se borró completo. **No volver a
desplegar sin que Saul lo pida explícitamente** — "dame el link para revisarlo" significa
`npm run dev` y `http://localhost:3000`, no un deploy.

Lo que sigue es el recetario, ya probado, para cuando sí toque publicar.

Es un **deploy de archivos estáticos**, no un build de Next del lado de Vercel: se sube el
contenido de `out/` ya generado en la Mac. Vercel no detecta framework y solo sirve los
archivos, que es justo lo que queremos con `output: "export"`.

```
npm run build                       # genera out/
# copiar out/ a una carpeta temporal y BORRAR los videos que no se usan
npx vercel@latest deploy . --token=$VERCEL_TOKEN --scope=saul-mf --yes --prod
```

**Tres trampas que ya costaron un intento fallido cada una:**

1. **El `out/` completo pesa 155 MB y el CLI truena al final del upload** con
   `fetch failed / AbortError`, después de haber subido todo. 117 MB son videos.

   **Cuidado al decidir cuáles sobran.** Los seis `videos/original/en-accion-home-*.mp4`
   SÍ se usan: el carrusel "El frío, en la vida real" los arma con una plantilla,
   `` `/videos/original/en-accion-home-${n}.mp4` ``, así que un grep de cadenas literales
   NO los encuentra y parecen huérfanos. Los que de verdad no se referencian son
   `en-accion-producto-*`, `reel-*` y `edge-template-*`.

2. **Hace falta un `vercel.json` con `cleanUrls: true`** dentro de la carpeta que se sube.
   El export genera `productos.html`, no `productos/index.html`, así que sin eso la portada
   carga y **las 17 subpáginas dan 404**.

3. **El token es de Alan** (`alan2605261@hybridge.education`), con acceso al equipo
   `saul-mf`. Vive en `/Users/SaulP/mentefria/SISTEMA_MENTE_FRIA/web/.env.local`, gitignored.
   Es la misma trampa que documenta la memoria del despliegue del Sistema. Conectar el repo
   de GitHub al proyecto de Vercel **falla** porque la app de Vercel no tiene acceso a
   `alan2605261-web/Nueva-Pagina-`; por eso se sube por CLI y no por git.

**Ojo: la URL de Vercel es pública.** Cualquiera con el link entra, y ahí están las páginas
legales que todavía no revisa un abogado (pendientes 11 y 12). Prender Deployment Protection
antes de publicar, no después.

## 7. Assets — dónde vive todo

### En el repo (`public/`)
- `images/` — todo optimizado con pipeline PIL (ver §8). Convenciones de nombre:
  - `prod-*` = imágenes de producto para comparativas (`prod-mfone.webp` = frontal recortado
    sin fondo, 60KB; `prod-*-nobg.png` = transparentes; `prod-mfone-nodeck.webp` = sin deck,
    disponible pero no en uso).
  - `pdp-*` = fotos por color de los PDPs inflables.
  - `mfone-gallery/{negro,blanco}/front.jpg + 01..10.jpg` = galería PDP MF ONE (10 = cotas).
  - `acc-*` = accesorios de fábrica. `barrel-* / horizon-*` = sesión lifestyle 2026.
  - `motor-{blanco,negro}-studio.jpg` = motores (negro regradeado para quitar tinte cálido).
  - `mfone-{frio,calor}.jpg` = fotos de marca azul/roja (díptico + features).
- `videos/` — `original/` = clips scrapeados de mentefria.com (ligeros, en repo).
  Los >50MB están **gitignored** (ver `.gitignore`) — pásalos a mano si cambias de máquina.

### Fuera del repo — carpeta `Mente Fria/Mente Fria Website/` (assets originales, NO tocar sin archivar)
- `07 Product Docs/` — manuales PDF oficiales (fuente de verdad de specs).
- `Product Images/MFONE Renders Studio/{black,white}/` — renders originales de fábrica.
- `Product Images/MFONE Accessories/` — fotos de accesorios de fábrica.
- `Product Images/Lifestyle Shoot 2026/` — sesión DSC* original (13 fotos).
- `Product Images/Studio Junio 2026/` — fotos frío/calor originales.
- `03 Brand & Assets/Videos/` — MF ESTUDIO 01/02, MENTE FRIA X GUDSLIP (pesados, sin usar).
- `06 Claude Design Export/` — export del diseño site_v2 original (referencia).
- **Regla**: todo asset nuevo que mande Rafa → se archiva el original aquí Y se genera la
  versión web optimizada en `public/images/`.

### Conocimiento (fuera del repo)
- **Vault Obsidian** `Mente Fria/Mente Fria Brain/` — cerebro del negocio (leer su CLAUDE.md).
- `Mente Fria/CLAUDE.md` — instrucciones del proyecto para Claude.
- Reporte del plan Liquid: `75 Reports/2026-05-31 - Website Build Plan...md`.

---

## 8. Workflows

### Pipeline de imágenes (cada asset nuevo de Rafa)
1. Archivar el original en `Mente Fria Website/Product Images/...`.
2. Optimizar para web con Python/PIL: redimensionar (max ~1600-1800px), JPEG `quality=82-85,
   optimize=True, progressive=True` (objetivo <400KB). Transparencias → WebP `quality=88`.
3. Recortes/cutouts: flood-fill desde bordes para fondos uniformes (funciona con producto
   oscuro sobre fondo claro; NO con blanco sobre blanco), bbox + margen.
4. Verificar en preview antes de dar por bueno.

### Verificación (cada cambio visual)
Dev server corriendo → verificar por DOM/computed styles (los screenshots del preview a veces
salen en blanco — glitch conocido; los datos del DOM son la fuente confiable) → typecheck →
si es batch grande, `npm run build` completo antes de push.

### Git / deploy
- **Guardar = commit + push a `main`** (mensajes descriptivos en español, batch por sesión).
- El push **auto-publica en Netlify** (CI: build `npm run build`, publish `out/`). Rafa está
  OK con esto; no dedicar esfuerzo extra a Netlify (no verificar deploys salvo que se pida).
- Credencial GitHub: keychain de la Mac de Rafa (usuario `rafabech-ux`). En otra máquina,
  necesitas tu propio acceso al repo.
- Si el push rebota (non-fast-forward): `git pull --rebase origin main` — ha habido sesiones
  paralelas editando el repo.

### Cómo trabaja Rafa (importante para la colaboración)
- Feedback visual rápido, por screenshots anotados y dictado (a veces con typos de dictado —
  "MF Viral" = MF Barrel, "lonk" = link). Iteración fina: "5% más grande", "un pelito a la
  derecha" — se aplica, se verifica, se le muestra.
- Español e inglés intercambiables. Directo, sin rodeos.
- SIEMPRE etiquetar supuestos y reportar qué se verificó y qué falta.
- Cuando pide algo que contradice un dato real, se le dice (ej. fotos de Horizon etiquetadas
  como Barrel — él corrige con gusto).

---

## 9. Decisiones de diseño tomadas (para no re-litigarlas)

- Fondo de la sección de productos en /productos: **negro** (dark-s) por decisión de Rafa
  ("quizá lo cambie a blanco después").
- Botones de cards de producto: **"Ver ahora"** (Rafa vetó "Comprar ahora"). Alternativas que
  se le dieron por si quiere cambiar: Descúbrela / Conócela / Ver detalles / Explorar.
- El mega-menú NO lleva "Prueba de 30 días" (eso es mensaje de conversión, vive en el
  announcement bar) y dice "Accesorios" (no "Accesorios y motores").
- Sticky buy bar del PDP: eliminado. Sección "Todo en una sola pieza": eliminada. Pre-footer
  MIND OVER BODY con newsletter: eliminado.
- El CTA final del PDP MF ONE es B2B (claro, estilo B2BBand del landing) — NO un CTA de compra.
- Los PDPs de inflables NO mencionan al MF ONE, y viceversa (cada producto vende lo suyo).
- Las 7 cajas de la sección chiller son oscuras (se probó claro y gris — Rafa eligió volver
  al oscuro; las 6 features van en lista editorial sin cajas).
- El hero con video en /productos se probó y se descartó (el video queda en el repo).

---

## 10. Checklist para arrancar (nuevo desarrollador)

1. Clona el repo y corre `npm install && npm run dev` → http://localhost:3000.
2. Lee este documento completo + `Mente Fria/CLAUDE.md` + el CLAUDE.md del vault.
3. Recorre el sitio página por página comparando contra mentefria.com.
4. Consigue de Rafa: la carpeta `Mente Fria Website/` (assets originales), los videos
   gitignored, y acceso al repo GitHub.
5. Primer trabajo sugerido: el rework de /negocios (Pendiente #1 — está completamente
   especificado arriba).
6. Ante CUALQUIER dato de producto: verifica contra los manuales de `07 Product Docs/` o el
   sitio vivo. Ante cualquier duda de diseño: las referencias son Apple/Plunge/WHOOP/8Sleep
   y los patrones del §3. Ante duda de negocio: pregunta a Rafa, no asumas.
