/*
  CARRITO — modelo de datos y persistencia local.

  Estado (sep 2026): el carrito vive solo en el navegador. Guarda las líneas en
  localStorage y calcula totales, pero NO cobra: el botón de pagar está
  deshabilitado a propósito y la página lo dice con todas sus letras. Se
  construyó ahora para que, cuando se conecte Shopify, solo haya que rellenar
  las costuras marcadas abajo en vez de rehacer la interfaz.

  ── Las tres costuras para Shopify ─────────────────────────────────────────
  1. `variantId`  — hoy null. Shopify identifica cada combinación
     color × motor con un ID de variante propio. Al conectar, `VARIANTES`
     deja de devolver null y devuelve ese ID.
  2. `addons`     — MF Shield y los extras son productos aparte en Shopify.
     Cada uno necesitará su propio variantId; hoy viajan como líneas sueltas
     con precio, que es suficiente para pintar el total.
  3. `irAPagar()` — hoy no hace nada. Ahí va la llamada que crea el checkout
     en Shopify y manda al cliente a su pasarela, que es donde ya están
     configurados los MSI de Mercado Pago.

  Nada de esto toca el precio: los importes salen de las mismas constantes que
  usan las fichas de producto, así que el carrito no puede desincronizarse.
*/

export type ProductoId = "mf-one" | "mf-barrel" | "mf-horizon";
export type Motor = "Pro" | "Premium";
export type Color = "Negro" | "Blanco";

export type LineaAddon = {
  id: string;
  nombre: string;
  precio: number;
  /** Costura 2: el variantId del add-on en Shopify. */
  variantId: string | null;
};

export type LineaCarrito = {
  /** Clave local. Dos configuraciones distintas del mismo modelo no se juntan. */
  key: string;
  /** Una tina ("mf-one"…) o un accesorio ("acc:mf-mat"). Ver esAccesorio. */
  productoId: ProductoId | `acc:${string}`;
  nombre: string;
  /** Los accesorios no tienen color: van en null. */
  color: Color | null;
  /** La MF ONE trae el chiller integrado: no lleva motor aparte. */
  motor: Motor | null;
  precioUnitario: number;
  cantidad: number;
  img: string;
  addons: LineaAddon[];
  /** Costura 1: el variantId de color × motor en Shopify. */
  variantId: string | null;
};

/*
  Costura 1. Cuando exista la tienda conectada, este mapa devuelve el ID de
  variante de Shopify para cada combinación. Mientras tanto devuelve null y el
  carrito funciona igual, solo que sin poder cobrar.
*/
export function variantIdDe(
  _producto: ProductoId,
  _color: Color,
  _motor: Motor | null,
): string | null {
  return null;
}

/** La clave agrupa por configuración: mismo modelo + color + motor se suma. */
export function keyDe(
  producto: LineaCarrito["productoId"],
  color: Color | null,
  motor: Motor | null,
  addons: LineaAddon[],
): string {
  const ids = addons.map((a) => a.id).sort().join(",");
  return [producto, color ?? "sin-color", motor ?? "sin-motor", ids].join("|");
}

export const subtotalLinea = (l: LineaCarrito) =>
  (l.precioUnitario + l.addons.reduce((s, a) => s + a.precio, 0)) * l.cantidad;

export const subtotal = (lineas: LineaCarrito[]) =>
  lineas.reduce((s, l) => s + subtotalLinea(l), 0);

export const piezas = (lineas: LineaCarrito[]) =>
  lineas.reduce((s, l) => s + l.cantidad, 0);

/*
  Envío. Los inflables van a $1,500 y la MF ONE a $6,000 con maniobra — los
  mismos importes que publican las fichas. Si el pedido mezcla, manda el más
  caro porque viajan juntos.
*/
export const ENVIO: Record<ProductoId, number> = {
  "mf-one": 6000,
  "mf-barrel": 1500,
  "mf-horizon": 1500,
};

/* Accesorios y filtros sueltos: $200 (Saul, 17 ago 2026). Si viajan junto con
   una tina, manda el envío de la tina. */
export const ENVIO_ACCESORIO = 200;

export const esAccesorio = (id: LineaCarrito["productoId"]): id is `acc:${string}` =>
  id.startsWith("acc:");

export const envioDe = (lineas: LineaCarrito[]) =>
  lineas.length
    ? Math.max(
        ...lineas.map((l) => (esAccesorio(l.productoId) ? ENVIO_ACCESORIO : ENVIO[l.productoId])),
      )
    : 0;

/*
  Miniatura del carrito.

  En negro existe el render recortado sin fondo y se usa ese. En blanco no:
  recortar un producto blanco sobre fondo blanco sale roto (se probó en
  sep 2026 y agujereaba la tina), asi que se usa la foto de estudio, que ya
  trae fondo blanco. Por eso el hueco de la miniatura va en blanco y no en
  gris: asi la foto de estudio se funde con el fondo y se ve igual de limpia
  que el recorte.
*/
export const MINIATURAS: Record<ProductoId, Record<Color, string>> = {
  "mf-one": {
    Negro: "/images/prod-mfone.webp",
    Blanco: "/images/mfone-gallery/blanco/front.jpg",
  },
  "mf-barrel": {
    Negro: "/images/prod-barrel-nobg.png",
    Blanco: "/images/barrel-gallery/blanco/01.jpg",
  },
  "mf-horizon": {
    Negro: "/images/prod-horizon-negro-nobg.png",
    Blanco: "/images/horizon-gallery/blanco/01.jpg",
  },
};

export const miniaturaDe = (p: ProductoId, c: Color) => MINIATURAS[p][c];

export const money = (n: number) => "$" + n.toLocaleString("en-US");

/* ── Persistencia ──────────────────────────────────────────────────────────
   localStorage y no cookie: el sitio es export estático, no hay servidor que
   lea una cookie. Se envuelve en try/catch porque en modo privado de Safari
   escribir revienta, y un carrito que no guarda es mejor que una página que
   truena. */
const LLAVE = "mf-carrito-v1";

export function leerCarrito(): LineaCarrito[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LLAVE);
    if (!raw) return [];
    const datos = JSON.parse(raw);
    return Array.isArray(datos) ? (datos as LineaCarrito[]) : [];
  } catch {
    return [];
  }
}

export function guardarCarrito(lineas: LineaCarrito[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LLAVE, JSON.stringify(lineas));
  } catch {
    /* sin espacio o modo privado: el carrito sigue vivo en memoria */
  }
}
