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
  title: string;
  body: string;
  /** Precio, "Incluido", o null si todavía no hay precio público. */
  tag?: string | null;
  /** Ruta de la foto. Sin foto la tarjeta usa su variante tipográfica. */
  img?: string | null;
  /** En false no se muestra en ninguna página. */
  activo: boolean;
};

/* ── Accesorios de venta ─────────────────────────────────────────────── */
export const ACCESORIOS: Accesorio[] = [
  {
    title: "MF ONE Pro Deck",
    body: "El escalón de acceso diseñado para tu MF ONE. Eleva y estabiliza el setup, y te da una superficie firme para entrar y salir.",
    tag: "$6,900 MXN",
    img: "/images/prodeck-negro.webp",
    activo: true,
  },
  {
    title: "MF Mat",
    body: "Tapete antiderrapante para el piso de tu setup. Absorbe el agua que escurre al salir y evita resbalones con los pies mojados.",
    tag: "Consultar",
    img: "/images/acc-mf-mat.webp",
    activo: true,
  },
  {
    title: "Soporte para celular",
    body: "Se monta en el borde de la tina. Tu cronómetro, tu música o tu respiración guiada a la vista, sin mojar el teléfono.",
    tag: "Consultar",
    img: "/images/acc-soporte-celular.webp",
    activo: true,
  },
];

/* ── Consumibles y mantenimiento ─────────────────────────────────────── */
export const CONSUMIBLES: Accesorio[] = [
  {
    title: "Filtro de papel",
    body: "Cartucho reemplazable de la MF ONE. Se cambia cada 3 a 4 semanas y es lo que mantiene el agua clara entre vaciados.",
    tag: "Consultar",
    img: "/images/acc-filtro-cartucho-uno.webp",
    activo: true,
  },
  {
    title: "Filtro de carbón",
    body: "Se conecta a la manguera al llenar la tina y retiene impurezas desde el primer litro, así el agua entra limpia.",
    tag: "Consultar",
    img: "/images/acc-filtro-prellenado.webp",
    activo: true,
  },
  {
    title: "Kit de filtros para inflables",
    body: "Repuestos del sistema de 3 capas de MF Barrel y MF Horizon: filtro de papel, filtro integrado y malla antipolvo.",
    tag: "Consultar",
    img: "/images/acc-filtros-cartucho.webp",
    activo: true,
  },
];

/* ── Lo que ya viene en la caja de la MF ONE ─────────────────────────── */
export const INCLUIDO_MF_ONE: Accesorio[] = [
  {
    title: "Filtro de papel",
    body: "El filtro de operación de la MF ONE. Cámbialo cada 3 a 4 semanas.",
    img: "/images/acc-filtros-cartucho.webp",
    activo: true,
  },
  {
    title: "Filtro de carbón",
    body: "Se conecta a la manguera al llenar la tina y retiene impurezas desde el primer litro.",
    img: "/images/acc-filtro-prellenado.webp",
    activo: true,
  },
  {
    title: "Red de limpieza",
    body: "Retira hojas e impurezas de la superficie en segundos, sin vaciar la tina.",
    img: "/images/acc-red-limpieza.webp",
    activo: true,
  },
  {
    title: "Soporte para celular",
    body: "Se monta en el borde de la tina para tener a la vista el cronómetro o la respiración guiada.",
    img: "/images/acc-soporte-celular.webp",
    activo: true,
  },
  {
    title: "Patitos de hule",
    body: "Sí, vienen incluidos. Porque el frío se toma en serio, pero no tanto.",
    img: "/images/acc-patitos.webp",
    activo: true,
  },
  {
    title: "El kit completo",
    body: "Todo lo que llega en la caja de la MF ONE, listo desde el día uno.",
    img: "/images/acc-kit-completo.webp",
    activo: true,
  },
];

export const activos = (xs: Accesorio[]) => xs.filter((x) => x.activo);
