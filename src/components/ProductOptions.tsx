"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Flame, Snowflake, Sparkles, Truck, Wallet, Wifi, X } from "lucide-react";
import { planesDe, type PlanShield } from "@/lib/garantia-extendida";
import { useRouter } from "next/navigation";
import { useCarrito } from "@/components/CarritoProvider";
import { miniaturaDe, variantIdDe } from "@/lib/carrito";

/*
  Opciones de producto para los PDPs (patrón Plunge):
  el selector de color y los add-ons viven en la columna derecha,
  arriba de los CTAs; la galería del stage (columna izquierda)
  reacciona al color elegido vía contexto. Cada color tiene su
  propio set de imágenes (negro → solo negras, blanco → solo blancas).

  Los add-ons seleccionados viven en el contexto para que el bloque de
  pago pueda sumar el total real de la configuración.
*/

type Color = "Negro" | "Blanco";
type Motor = "Pro" | "Premium";
type PreciosMotor = { Pro: number; Premium: number };
type Variant = { color: Color; images: string[] };
type Producto = "mf-one" | "mf-barrel" | "mf-horizon";
type Addon = { id: string; name: string; price: number };

const Ctx = createContext<{
  color: Color;
  setColor: (c: Color) => void;
  motor: Motor;
  setMotor: (m: Motor) => void;
  /** null en la MF ONE: trae el chiller integrado, no se elige motor. */
  preciosMotor: PreciosMotor | null;
  /** Precio del equipo con el motor elegido. */
  precioBase: number;
  slide: number;
  setSlide: (i: number) => void;
  variants: Variant[];
  producto: Producto;
  addons: Addon[];
  toggleAddon: (a: Addon) => void;
  hasAddon: (id: string) => boolean;
  total: number;
} | null>(null);

function useProductOptions() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("ProductOptions.* debe usarse dentro de <ProductOptionsProvider>");
  return ctx;
}

export const money = (n: number) => "$" + n.toLocaleString("en-US");

export function ProductOptionsProvider({
  variants,
  producto,
  basePrice,
  preciosMotor,
  defaultColor = "Negro",
  defaultMotor = "Pro",
  children,
}: {
  variants: Variant[];
  producto: Producto;
  /** Precio cuando el equipo no lleva motor aparte (MF ONE). */
  basePrice: number;
  /** Inflables: el precio cambia con el motor. Si viene, manda sobre basePrice. */
  preciosMotor?: PreciosMotor;
  defaultColor?: Color;
  defaultMotor?: Motor;
  children: React.ReactNode;
}) {
  const [color, setColorRaw] = useState<Color>(defaultColor);
  const [motor, setMotorRaw] = useState<Motor>(defaultMotor);
  const [slide, setSlide] = useState(0);
  const [addons, setAddons] = useState<Addon[]>([]);

  const setColor = (c: Color) => {
    setColorRaw(c);
    setSlide(0); // al cambiar de color, regresa a la foto frontal
  };

  /*
    El MF Shield está atado al motor, no al revés: su precio y su cobertura
    dependen de qué motor trae el equipo. Por eso el cambio de motor reescribe
    el add-on de garantía que ya estuviera agregado, en lugar de dejar que el
    cliente combine un motor Premium con un Shield de motor Pro (que cuesta
    menos y cubre otra cosa).
  */
  const setMotor = (m: Motor) => {
    setMotorRaw(m);
    const nuevo = planesDe(producto).find((p) => p.motor === m);
    if (!nuevo) return;
    setAddons((prev) =>
      prev.map((a) =>
        a.id.startsWith("shield-")
          ? { id: `shield-${nuevo.id}`, name: `MF Shield · ${nuevo.equipo}`, price: nuevo.precio }
          : a,
      ),
    );
  };

  const toggleAddon = (a: Addon) =>
    setAddons((prev) =>
      prev.some((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a],
    );

  const precioBase = preciosMotor ? preciosMotor[motor] : basePrice;

  const total = useMemo(
    () => precioBase + addons.reduce((s, a) => s + a.price, 0),
    [precioBase, addons],
  );

  return (
    <Ctx.Provider
      value={{
        color,
        setColor,
        motor,
        setMotor,
        preciosMotor: preciosMotor ?? null,
        precioBase,
        slide,
        setSlide,
        variants,
        producto,
        addons,
        toggleAddon,
        hasAddon: (id) => addons.some((a) => a.id === id),
        total,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

/* ---- Columna izquierda: galería (imagen principal + slides) ---- */
export function ProductStage({ alt }: { alt: string }) {
  const { color, variants, slide, setSlide } = useProductOptions();
  const images = (variants.find((v) => v.color === color) ?? variants[0]).images;
  const actual = Math.min(slide, images.length - 1);
  const current = images[actual];
  const varias = images.length > 1;
  const tiraRef = useRef<HTMLDivElement>(null);

  /* Flechas sobre la foto. Antes la única forma de cambiar de foto era tocar
     la miniatura (Saul, sep 2026). Dan la vuelta: de la última pasan a la
     primera y al revés. */
  const ir = (paso: number) => setSlide((actual + paso + images.length) % images.length);

  /* Con muchas fotos la tira de miniaturas se desborda; al avanzar con la
     flecha, la miniatura activa se trae a la vista para que no quede oculta. */
  useEffect(() => {
    const tira = tiraRef.current;
    const activa = tira?.children[actual] as HTMLElement | undefined;
    if (!tira || !activa) return;
    /* Solo en horizontal y dentro de la tira. scrollIntoView movía también la
       página hacia arriba o abajo si la galería no estaba en pantalla. */
    const izq = activa.offsetLeft;
    const der = izq + activa.offsetWidth;
    if (izq < tira.scrollLeft) tira.scrollTo({ left: izq - 8, behavior: "smooth" });
    else if (der > tira.scrollLeft + tira.clientWidth)
      tira.scrollTo({ left: der - tira.clientWidth + 8, behavior: "smooth" });
  }, [actual]);

  const flecha =
    "absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/55 text-[var(--fg-metal)] shadow-[0_4px_18px_rgba(8,9,11,0.12)] backdrop-blur-md transition-all duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ice)]";

  return (
    <div>
      <div
        className="group/stage relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[18px] [background:var(--grad-silver)] lg:aspect-square"
        onKeyDown={(e) => {
          if (!varias) return;
          if (e.key === "ArrowLeft") ir(-1);
          if (e.key === "ArrowRight") ir(1);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img fetchPriority="high"
          key={current}
          src={current}
          alt={`${alt}, color ${color.toLowerCase()}`}
          className="h-full w-full object-cover mix-blend-multiply duration-500 animate-in fade-in"
        />

        {varias && (
          <>
            <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior" className={`${flecha} left-3`}>
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button type="button" onClick={() => ir(1)} aria-label="Foto siguiente" className={`${flecha} right-3`}>
              <ChevronRight size={20} strokeWidth={2} />
            </button>
            <span className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-medium tabular-nums text-[var(--fg-muted)] backdrop-blur-md">
              {actual + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Slides (solo si hay más de una imagen) */}
      {varias && (
        <div ref={tiraRef} className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSlide(i)}
              aria-label={`Foto ${i + 1}`}
              aria-current={actual === i}
              className={`relative aspect-square w-[72px] flex-none overflow-hidden rounded-[10px] transition-all duration-200 ${
                actual === i
                  ? "ring-2 ring-[var(--accent-ice)] ring-offset-2 ring-offset-[var(--bg-metal)]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Columna derecha: selector de color (arriba de los CTAs) ---- */
export function ColorPicker() {
  const { color, setColor, variants } = useProductOptions();
  return (
    <div className="mt-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
        Color · {color}
      </p>
      <div className="mt-3 flex gap-2.5">
        {variants.map((v) => (
          <button
            key={v.color}
            onClick={() => setColor(v.color)}
            aria-label={`Color ${v.color}`}
            aria-pressed={color === v.color}
            className={`h-9 w-9 rounded-full border transition-all duration-200 ${
              v.color === "Negro"
                ? "border-transparent bg-[#0e1013]"
                : "border-[var(--line-2)] bg-white"
            } ${
              color === v.color
                ? "ring-2 ring-[var(--accent-ice)] ring-offset-2 ring-offset-[var(--bg-metal)]"
                : "opacity-70 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- Precio del equipo, en vivo según el motor elegido ---- */
export function PrecioBase() {
  const { precioBase } = useProductOptions();
  return (
    <span className="mdisplay text-[clamp(34px,3.6vw,50px)] tabular-nums">{money(precioBase)}</span>
  );
}

/* ---- Selector de motor (solo inflables).
        Va arriba del MF Shield: el motor define el precio del equipo y
        también qué plan de garantía extendida aplica. ---- */
const MOTORES: { motor: Motor; nombre: string; nota: string }[] = [
  { motor: "Pro", nombre: "Motor Pro 2.0", nota: "Solo enfriamiento" },
  { motor: "Premium", nombre: "Motor Premium 2.0", nota: "Suma calor hasta 42 °C y ozono" },
];

export function MotorSelector() {
  const { motor, setMotor, preciosMotor } = useProductOptions();
  if (!preciosMotor) return null; // MF ONE: el chiller va integrado

  const activa = MOTORES.find((m) => m.motor === motor);

  return (
    <div className="mt-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
        Motor · {motor}
      </p>
      {/* Dos lineas por boton, no tres: la nota de cada motor se saco a un solo
          renglon debajo del par. Con la nota adentro cada boton medía 86px de
          alto y el bloque pesaba mas que el selector de color. */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {MOTORES.map((op) => {
          const on = op.motor === motor;
          return (
            <button
              key={op.motor}
              onClick={() => setMotor(op.motor)}
              aria-pressed={on}
              className={`rounded-[12px] border px-4 py-3 text-left transition-colors duration-200 ${
                on
                  ? "border-[var(--accent-ice)] bg-white"
                  : "border-[var(--line-1)] bg-white hover:border-[var(--line-2)]"
              }`}
            >
              <span className="block text-[13px] font-semibold leading-tight">{op.nombre}</span>
              <span className="mt-0.5 block text-[12.5px] tabular-nums text-[var(--fg-muted)]">
                {money(preciosMotor[op.motor])}
              </span>
            </button>
          );
        })}
      </div>
      {/* Qué trae el motor elegido, en una fila chica debajo del par. Versión
          discreta de la comparativa de "Elige tu motor": se pinta de azul lo
          que incluye el motor seleccionado y queda gris lo que no. Al pasar a
          Premium se encienden calor y ozono (Saul, sep 2026). */}
      {activa && (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`Lo que incluye el ${activa.nombre}`}>
          {RASGOS_MOTOR.map((r) => {
            const incluye = r.en.includes(motor);
            return (
              <li
                key={r.t}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors duration-300 ${
                  incluye
                    ? "border-[rgba(91,155,213,0.35)] bg-[rgba(91,155,213,0.1)] text-[var(--m-blue-600)]"
                    : "border-[var(--line-1)] bg-transparent text-[var(--fg-subtle)] line-through decoration-[var(--line-2)]"
                }`}
              >
                <r.icon size={13} strokeWidth={2} aria-hidden />
                {r.t}
                <span className="sr-only">{incluye ? "incluido" : "no incluido"}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* Lo que se compara en la fila chica del selector. Datos de SPECS_NUEVOS en
   src/lib/motores.ts: los dos enfrían y se controlan por app Wi-Fi; solo el
   Premium calienta y lleva ozono. */
const RASGOS_MOTOR: { t: string; icon: typeof Snowflake; en: Motor[] }[] = [
  { t: "Frío", icon: Snowflake, en: ["Pro", "Premium"] },
  { t: "App Wi-Fi", icon: Wifi, en: ["Pro", "Premium"] },
  { t: "Calor hasta 42 °C", icon: Flame, en: ["Premium"] },
  { t: "Ozono", icon: Sparkles, en: ["Premium"] },
];

/* ---- Shell compartida de los add-ons ---- */
function AddonShell({
  label,
  added,
  onToggle,
  children,
}: {
  label: string;
  added: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 max-w-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
        {label}
      </p>
      <div
        className={`mt-3 rounded-[14px] border bg-white p-4 transition-colors duration-200 ${
          added ? "border-[var(--accent-ice)]" : "border-[var(--line-1)]"
        }`}
      >
        {children}
        <button
          onClick={onToggle}
          aria-pressed={added}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-200 ${
            added
              ? "border-transparent bg-[var(--accent-ice)] text-white"
              : "border-[var(--line-2)] text-[var(--fg-metal)] hover:border-[var(--accent-ice)] hover:text-[var(--accent-ice)]"
          }`}
        >
          {added && <Check size={14} strokeWidth={2.5} />}
          {added ? "Agregado a tu pedido" : "Sí, quiero agregarlo"}
        </button>
      </div>
    </div>
  );
}

/* ---- Add-on estilo Plunge Basin (solo MF ONE): thumbnail + precio +
        botón checkbox "Sí, agregar". El thumbnail sigue el color elegido. ---- */
export function AddonCard({
  id = "prodeck",
  name,
  description,
  price,
  imgByColor,
}: {
  id?: string;
  name: string;
  description: string;
  price: number;
  imgByColor: Record<Color, string>;
}) {
  const { color, toggleAddon, hasAddon } = useProductOptions();
  const added = hasAddon(id);

  return (
    <AddonShell label="Complemento" added={added} onToggle={() => toggleAddon({ id, name, price })}>
      <div className="flex items-center gap-4">
        <div className="h-20 w-36 flex-none overflow-hidden rounded-[10px] bg-[var(--bg-panel)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            key={imgByColor[color]}
            src={imgByColor[color]}
            alt={name}
            className="h-full w-full object-cover duration-300 animate-in fade-in"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold">{name}</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-[var(--fg-muted)]">{description}</p>
          <p className="mt-1 text-[13px] font-semibold">
            {money(price)} <span className="font-normal text-[var(--fg-subtle)]">MXN</span>
          </p>
        </div>
      </div>
    </AddonShell>
  );
}

/* ---- Add-on MF Shield (garantía extendida).
        No elige motor: lo hereda. El plan que se muestra y se cobra es
        siempre el del motor seleccionado arriba, en <MotorSelector />, para
        que nadie termine con un equipo Premium y un Shield de motor Pro. ---- */
export function ShieldAddon() {
  const { producto, motor, toggleAddon, hasAddon } = useProductOptions();
  const planes = planesDe(producto);
  const p: PlanShield = planes.find((x) => x.motor === motor) ?? planes[0];
  const id = `shield-${p.id}`;
  const added = hasAddon(id);

  return (
    <AddonShell
      label="Garantía extendida"
      added={added}
      onToggle={() => toggleAddon({ id, name: `MF Shield · ${p.equipo}`, price: p.precio })}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 flex-none items-center justify-center rounded-[10px] bg-[var(--bg-panel)]">
          <ShieldMark />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold">MF SHIELD</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-[var(--fg-muted)]">
            {p.mesesExtra} meses más de cobertura al terminar tu garantía de {p.estandarMeses}.
            Del mes {p.desdeMes} al {p.hastaMes}, con refacciones originales y mano de obra.
          </p>
          <p className="mt-1 text-[13px] font-semibold">
            {money(p.precio)} <span className="font-normal text-[var(--fg-subtle)]">MXN, pago único</span>
          </p>
        </div>
      </div>

      <p className="mt-2.5 text-[11.5px] leading-snug text-[var(--fg-subtle)]">
        Cubre uso {p.uso}. Sujeta al programa de mantenimiento del contrato.{" "}
        <a href="/garantia/extendida" className="underline underline-offset-2 hover:text-[var(--accent-ice)]">
          Ver qué cubre
        </a>
      </p>
    </AddonShell>
  );
}

function ShieldMark() {
  return (
    <svg viewBox="0 0 48 56" className="h-11 w-11 text-[var(--accent-ice)]" aria-hidden="true">
      <path
        d="M24 2 4 10v20c0 12 8.7 20.4 20 24 11.3-3.6 20-12 20-24V10L24 2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="m15 27 6.5 6.5L33 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---- Plan de pago (solo MF ONE).

   La MF ONE no está en inventario de forma recurrente, así que hoy la
   única vía es el apartado: 40 % ahora, 60 % antes del envío, entrega
   estimada en 12 semanas. NO hay opción de entrega inmediata mientras
   no haya inventario; si algún día la hay, aquí vuelve el selector.

   El anticipo se cobra por Shopify con un permalink de carrito sobre una
   variante de $1 MXN, multiplicada por el monto: /cart/<variante>:<monto>.
   Mientras esa variante no exista, el botón manda la configuración por
   WhatsApp para cobrarla a mano. Es lo único que hay que cambiar aquí:
   pon el id numérico de la variante y el cobro queda en línea. ---- */

const WHATSAPP = "5215616471386";
const TIENDA = "https://mentefria.com";
export const ANTICIPO = 0.4;
export const SEMANAS_ENTREGA = 12;

/** Variante Shopify de $1 MXN para cobrar el anticipo. null = todavía no existe. */
const VARIANTE_APARTADO: string | null = null;

export function PaymentPlan({ llamadaUrl }: { llamadaUrl: string }) {
  const { total, addons, color } = useProductOptions();

  const anticipo = Math.round(total * ANTICIPO);
  const resto = total - anticipo;

  const extras = addons.length ? addons.map((a) => a.name).join(" + ") : "sin complementos";
  const mensaje = encodeURIComponent(
    `Hola, quiero apartar una MF ONE.\n\n` +
      `Color: ${color}\n` +
      `Complementos: ${extras}\n` +
      `Total: ${money(total)} MXN\n` +
      `Anticipo 40 %: ${money(anticipo)} MXN\n` +
      `Resto antes del envío: ${money(resto)} MXN`,
  );

  const checkout = VARIANTE_APARTADO
    ? `${TIENDA}/cart/${VARIANTE_APARTADO}:${anticipo}`
    : `https://wa.me/${WHATSAPP}?text=${mensaje}`;

  return (
    <div className="mt-8 max-w-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
        Cómo lo pagas
      </p>

      <div className="mt-3 rounded-[14px] border border-[var(--accent-ice)] bg-white p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[15px] font-semibold">Apártala con 40 %</p>
          <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--fg-subtle)]">
            {SEMANAS_ENTREGA} semanas
          </p>
        </div>

        <p className="mdisplay mt-2 text-[clamp(26px,2.8vw,34px)]">
          {money(anticipo)} <span className="text-[12px] font-normal text-[var(--fg-subtle)]">MXN hoy</span>
        </p>

        <div className="mt-4 space-y-2.5 border-t border-[var(--line-1)] pt-4">
          {[
            {
              icon: Wallet,
              t: `Hoy: ${money(anticipo)} MXN`,
              d: "Reservas tu lugar en la lista y tu equipo entra a producción.",
            },
            {
              icon: Truck,
              t: `Antes del envío: ${money(resto)} MXN`,
              d: "Te avisamos cuando tu MF ONE esté lista y liquidas para programar la entrega.",
            },
          ].map((s) => (
            <div key={s.t} className="flex items-start gap-3">
              <s.icon size={17} strokeWidth={1.8} className="mt-0.5 flex-none text-[var(--accent-ice)]" />
              <div>
                <p className="text-[13px] font-semibold">{s.t}</p>
                <p className="text-[12px] leading-snug text-[var(--fg-muted)]">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 border-t border-[var(--line-1)] pt-3 text-[11.5px] leading-snug text-[var(--fg-subtle)]">
          Entrega estimada: {SEMANAS_ENTREGA} semanas desde el anticipo. Los montos no
          incluyen el envío ($6,000 MXN a todo México) ni IVA.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href={checkout} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-primary">
          Apartar con {money(anticipo)}
        </a>
        <a href={llamadaUrl} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-ghost">
          Agendar llamada
        </a>
      </div>

      {addons.length > 0 && (
        <p className="mt-3 text-[12px] text-[var(--fg-muted)]">
          Tu configuración: <span className="font-semibold text-[var(--fg-metal)]">{money(total)} MXN</span>{" "}
          <span className="text-[var(--fg-subtle)]">({extras})</span>
        </p>
      )}
    </div>
  );
}

/* ---- Total corrido para los PDPs que no llevan plan de pago ---- */
export function ConfigTotal() {
  const { total, addons } = useProductOptions();
  if (!addons.length) return null;
  return (
    <p className="mt-4 text-[12.5px] text-[var(--fg-muted)]">
      Tu configuración: <span className="font-semibold text-[var(--fg-metal)]">{money(total)} MXN</span>{" "}
      <span className="text-[var(--fg-subtle)]">({addons.map((a) => a.name).join(" + ")})</span>
    </p>
  );
}

/* ---- Boton de compra: manda al carrito la configuracion viva ----
   Sustituye a los enlaces que se iban a mentefria.com o a WhatsApp.

   `conPaso` existe porque los botones de mas abajo (Especificaciones y cierre)
   quedan lejos del configurador: quien llega ahi no vio el selector de motor y
   no puede saber si esta comprando Pro o Premium, que son $15,000 de
   diferencia. Con `conPaso` se abre un paso corto para elegir antes de
   agregar. El boton de arriba no lo necesita: el selector esta a su lado. */
export function AddToCart({
  label,
  nombre,
  variante = "primary",
  conPaso = false,
  className = "",
}: {
  label: string;
  nombre: string;
  variante?: "primary" | "blue";
  conPaso?: boolean;
  className?: string;
}) {
  const { producto, color, motor, preciosMotor, precioBase, addons } = useProductOptions();
  const { agregar } = useCarrito();
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);

  const alCarrito = () => {
    const motorReal = preciosMotor ? motor : null;
    agregar({
      productoId: producto,
      nombre,
      color,
      motor: motorReal,
      precioUnitario: precioBase,
      img: miniaturaDe(producto, color),
      addons: addons.map((a) => ({
        id: a.id,
        nombre: a.name,
        precio: a.price,
        variantId: null,
      })),
      variantId: variantIdDe(producto, color, motorReal),
    });
    router.push("/carrito");
  };

  /* La MF ONE no lleva motor aparte: no hay nada que elegir, se salta el paso. */
  const necesitaPaso = conPaso && !!preciosMotor;

  return (
    <>
      <button
        onClick={() => (necesitaPaso ? setAbierto(true) : alCarrito())}
        className={`mbtn mbtn-${variante} ${className}`.trim()}
      >
        {label}
      </button>
      {abierto && (
        <PasoConfigurar
          nombre={nombre}
          onCerrar={() => setAbierto(false)}
          onConfirmar={alCarrito}
        />
      )}
    </>
  );
}

/* ---- Paso corto: color y motor antes de agregar ---- */
function PasoConfigurar({
  nombre,
  onCerrar,
  onConfirmar,
}: {
  nombre: string;
  onCerrar: () => void;
  onConfirmar: () => void;
}) {
  const { color, setColor, variants, motor, setMotor, preciosMotor, precioBase } =
    useProductOptions();

  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", alTeclear);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = overflow;
    };
  }, [onCerrar]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[rgba(8,9,11,0.55)] p-0 sm:items-center sm:p-6"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-label={`Configura tu ${nombre}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] rounded-t-[20px] bg-white p-6 text-[var(--fg-metal)] sm:rounded-[20px] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="m-eyebrow accent">Antes de agregar</span>
            <h2 className="mdisplay mt-2 text-[24px] leading-tight">Configura tu {nombre}</h2>
          </div>
          <button
            onClick={onCerrar}
            aria-label="Cerrar"
            className="-mr-1 -mt-1 flex-none rounded-full p-1.5 text-[var(--fg-subtle)] transition-colors hover:bg-[var(--bg-panel)] hover:text-[var(--fg-metal)]"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
          Color · {color}
        </p>
        <div className="mt-2.5 flex gap-2.5">
          {variants.map((v) => (
            <button
              key={v.color}
              onClick={() => setColor(v.color)}
              aria-label={`Color ${v.color}`}
              aria-pressed={color === v.color}
              className={`h-9 w-9 rounded-full border transition-all duration-200 ${
                v.color === "Negro"
                  ? "border-transparent bg-[#0e1013]"
                  : "border-[var(--line-2)] bg-white"
              } ${
                color === v.color
                  ? "ring-2 ring-[var(--accent-ice)] ring-offset-2 ring-offset-white"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>

        {preciosMotor && (
          <>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
              Motor · {motor}
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {MOTORES.map((op) => {
                const activo = op.motor === motor;
                return (
                  <button
                    key={op.motor}
                    onClick={() => setMotor(op.motor)}
                    aria-pressed={activo}
                    className={`rounded-[14px] border px-4 py-3 text-left transition-colors duration-200 ${
                      activo
                        ? "border-[var(--accent-ice)]"
                        : "border-[var(--line-1)] hover:border-[var(--line-2)]"
                    }`}
                  >
                    <span className="block text-[13px] font-semibold leading-tight">
                      {op.nombre}
                    </span>
                    <span className="mt-1 block text-[13px] font-semibold tabular-nums">
                      {money(preciosMotor[op.motor])}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-6 flex items-baseline justify-between gap-4">
          <span className="text-[12.5px] text-[var(--fg-muted)]">Total del equipo</span>
          <span className="text-[19px] font-semibold tabular-nums">
            {money(precioBase)} <span className="font-normal text-[var(--fg-subtle)]">MXN</span>
          </span>
        </div>

        <button onClick={onConfirmar} className="mbtn mbtn-primary mt-4 w-full justify-center">
          Agregar al carrito
        </button>
        <p className="mt-3 text-center text-[11.5px] leading-snug text-[var(--fg-subtle)]">
          La garantía extendida MF Shield se agrega desde la ficha, arriba.
        </p>
      </div>
    </div>
  );
}
