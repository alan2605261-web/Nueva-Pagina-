/*
  Catálogo de accesorios — fuente única.

  Antes cada tarjeta vivía escrita a mano dentro de accesorios/page.tsx y de
  cada PDP, así que dar de alta un producto obligaba a tocar varias páginas y
  a dejar tarjetas "Próximamente" ocupando lugar mientras llegaba la foto.

  Ahora: agregar un accesorio es agregar un objeto a estas listas. Mientras
  `activo` sea false la tarjeta no se pinta en ningún lado — no se anuncia lo
  que todavía no se vende. Cuando llegue la foto se pone `img` y la tarjeta
  cambia sola de diseño (ver AccessoryCard).
*/

export type Accesorio = {
  /** Ruta de su página: /accesorios/<slug>. */
  slug: string;
  title: string;
  body: string;
  /** Precio en MXN. null = no se vende en línea: se consulta por WhatsApp. */
  precio: number | null;
  /** Texto del chip: se arma solo a partir del precio. */
  tag?: string | null;
  /** Foto principal. Sin foto la tarjeta usa su variante tipográfica. */
  img?: string | null;
  /** Galería de su página. La primera debería ser la misma que img. */
  imgs?: string[];
  /** true cuando las fotos son renders con fondo propio: se muestran a
      sangre (object-cover, sin margen) en lugar de flotar sobre el panel. */
  render?: boolean;
  /** Puntos concretos de la página del producto. Solo datos verificados. */
  detalle?: string[];
  /** En false no se muestra en ninguna página. */
  activo: boolean;
};

const chip = (precio: number | null) =>
  precio === null ? "Consultar" : `$${precio.toLocaleString("en-US")} MXN`;

/* ── Accesorios de venta ─────────────────────────────────────────────── */
/*
  Precios (sep 2026): Pro Deck $6,900 del catálogo corroborado con el
  cotizador; MF Mat $650 del sitio vivo. El soporte para celular no se vende
  en el sitio vivo y no tiene precio: queda en tienda con "Consultar" y botón a
  WhatsApp, sin carrito (decisión de Saul).
*/
export const ACCESORIOS: Accesorio[] = [
  {
    slug: "mf-one-pro-deck",
    title: "MF ONE Pro Deck",
    body: "El escalón de acceso diseñado para tu MF ONE. Eleva y estabiliza el setup, y te da una superficie firme para entrar y salir.",
    precio: 6900,
    /* Renders "con Pro Deck" de la carpeta Renders (Saul, sep 2026). Las fotos
       anteriores eran una tira con solo la plataforma y no le gustaban. La
       tarjeta usa el recorte horizontal; la galería, los tres ángulos por color. */
    img: "/images/accesorios/pro-deck/negro-mini.webp",
    imgs: [
      "/images/accesorios/pro-deck/negro-1.webp",
      "/images/accesorios/pro-deck/negro-2.webp",
      "/images/accesorios/pro-deck/negro-3.webp",
      "/images/accesorios/pro-deck/blanco-1.webp",
      "/images/accesorios/pro-deck/blanco-2.webp",
      "/images/accesorios/pro-deck/blanco-3.webp",
    ],
    render: true,
    detalle: ["Diseñado para la MF ONE", "Superficie firme para entrar y salir de la tina"],
    activo: true,
  },
  {
    slug: "mf-mat",
    title: "MF Mat",
    body: "Tapete antideslizante para la salida de tu cold plunge. Protege el piso alrededor de la tina y te da una superficie segura con los pies mojados.",
    precio: 650,
    img: "/images/accesorios/mf-mat-1.webp",
    imgs: ["/images/accesorios/mf-mat-1.webp", "/images/accesorios/mf-mat-2.webp", "/images/accesorios/mf-mat-3.webp"],
    detalle: ["Superficie antideslizante", "Protege el área alrededor de la tina", "Compatible con MF ONE, MF Barrel y MF Horizon"],
    activo: true,
  },
  {
    slug: "soporte-para-celular",
    title: "Soporte para celular",
    body: "Se monta en el borde de la tina. Tu cronómetro, tu música o tu respiración guiada a la vista, sin mojar el teléfono.",
    precio: null,
    img: "/images/acc-soporte-celular.webp",
    imgs: ["/images/acc-soporte-celular.webp"],
    detalle: ["Se monta en el borde de la tina", "Viene incluido con la MF ONE"],
    activo: true,
  },
].map((a) => ({ ...a, tag: chip(a.precio) }));

/* ── Consumibles y mantenimiento ─────────────────────────────────────── */
/*
  Se venden SIEMPRE en paquete de tres (Saul, sep 2026), con la foto de los
  tres. Nombres y precios del sitio vivo: Filtros MF ONE $750 y Filtros Motor
  Pro y Premium 2.0 $490. Este último ES el kit de filtros de los inflables: un
  solo producto para los dos motores, igual que en el sitio vivo.

  El filtro de carbón se quitó de la tienda: no se vende suelto, solo viene en
  la caja de la MF ONE.

  Sin plazos de cambio: dependen de cuántas inmersiones al día tenga el equipo,
  y afirmar "cada 3 a 4 semanas" era falso (Saul lo corrigió en las fichas).
*/
export const CONSUMIBLES: Accesorio[] = [
  {
    slug: "filtros-mf-one",
    title: "Filtros MF ONE",
    body: "Paquete de tres filtros de papel para tu MF ONE. Retienen los sólidos del agua; cada cuánto se cambian depende de cuántas inmersiones tenga el equipo al día.",
    precio: 750,
    img: "/images/acc-filtros-mfone.webp",
    imgs: ["/images/acc-filtros-mfone.webp"],
    detalle: ["Paquete con 3 filtros", "Compatible con MF ONE", "Se cambian sin técnico, con la llave de filtro incluida en la caja"],
    activo: true,
  },
  {
    slug: "filtros-motor-pro-y-premium",
    title: "Filtros Motor Pro y Premium 2.0",
    body: "El kit de filtros de los inflables. Paquete de tres filtros de papel plisado de 20 micras para el Motor Pro 2.0 y el Motor Premium 2.0, los motores de MF Barrel y MF Horizon.",
    precio: 490,
    img: "/images/acc-filtros-motor.webp",
    imgs: ["/images/acc-filtros-motor.webp"],
    detalle: ["Paquete con 3 filtros", "Papel plisado de 20 micras", "Compatible con Motor Pro 2.0 y Motor Premium 2.0"],
    activo: true,
  },
].map((a) => ({ ...a, tag: chip(a.precio) }));

export const TODOS_LOS_ACCESORIOS = [...ACCESORIOS, ...CONSUMIBLES];
export const accesorioPorSlug = (slug: string) =>
  TODOS_LOS_ACCESORIOS.find((a) => a.slug === slug);

/* ── Lo que ya viene en la caja de la MF ONE ─────────────────────────── */
export const INCLUIDO_MF_ONE: Accesorio[] = [
  {
    slug: "incluido-filtros",
    title: "Filtros de papel",
    body: "Vienen tres. Son los filtros de operación de la MF ONE; cada cuánto se cambian depende de cuántas inmersiones tenga el equipo al día.",
    precio: null,
    img: "/images/acc-filtros-mfone.webp",
    activo: true,
  },
  {
    slug: "incluido-filtro-de-carbon",
    title: "Filtro de carbón",
    body: "Se conecta a la manguera al llenar la tina y retiene impurezas desde el primer litro.",
    img: "/images/acc-filtro-prellenado.webp",
    precio: null,
    activo: true,
  },
  {
    slug: "incluido-red-de-limpieza",
    title: "Red de limpieza",
    body: "Retira hojas e impurezas de la superficie en segundos, sin vaciar la tina.",
    img: "/images/acc-red-limpieza.webp",
    precio: null,
    activo: true,
  },
  {
    slug: "incluido-soporte-para-celular",
    title: "Soporte para celular",
    body: "Se monta en el borde de la tina para tener a la vista el cronómetro o la respiración guiada.",
    img: "/images/acc-soporte-celular.webp",
    precio: null,
    activo: true,
  },
  {
    slug: "incluido-patitos-de-hule",
    title: "Patitos de hule",
    body: "Sí, vienen incluidos. Porque el frío se toma en serio, pero no tanto.",
    img: "/images/acc-patitos.webp",
    precio: null,
    activo: true,
  },
  {
    slug: "incluido-el-kit-completo",
    title: "El kit completo",
    body: "Todo lo que llega en la caja de la MF ONE, listo desde el día uno.",
    img: "/images/acc-kit-completo.webp",
    precio: null,
    activo: true,
  },
];

export const activos = (xs: Accesorio[]) => xs.filter((x) => x.activo);
