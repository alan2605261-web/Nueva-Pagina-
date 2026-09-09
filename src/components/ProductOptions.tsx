"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Check, Truck, Wallet } from "lucide-react";
import { planesDe, type PlanShield } from "@/lib/garantia-extendida";

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
type Variant = { color: Color; images: string[] };
type Producto = "mf-one" | "mf-barrel" | "mf-horizon";
type Addon = { id: string; name: string; price: number };

const Ctx = createContext<{
  color: Color;
  setColor: (c: Color) => void;
  slide: number;
  setSlide: (i: number) => void;
  variants: Variant[];
  producto: Producto;
  basePrice: number;
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
  defaultColor = "Negro",
  children,
}: {
  variants: Variant[];
  producto: Producto;
  basePrice: number;
  defaultColor?: Color;
  children: React.ReactNode;
}) {
  const [color, setColorRaw] = useState<Color>(defaultColor);
  const [slide, setSlide] = useState(0);
  const [addons, setAddons] = useState<Addon[]>([]);

  const setColor = (c: Color) => {
    setColorRaw(c);
    setSlide(0); // al cambiar de color, regresa a la foto frontal
  };

  const toggleAddon = (a: Addon) =>
    setAddons((prev) =>
      prev.some((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a],
    );

  const total = useMemo(
    () => basePrice + addons.reduce((s, a) => s + a.price, 0),
    [basePrice, addons],
  );

  return (
    <Ctx.Provider
      value={{
        color,
        setColor,
        slide,
        setSlide,
        variants,
        producto,
        basePrice,
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
  const current = images[Math.min(slide, images.length - 1)];

  return (
    <div>
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[18px] [background:var(--grad-silver)] lg:aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current}
          src={current}
          alt={`${alt} — color ${color.toLowerCase()}`}
          className="h-full w-full object-cover mix-blend-multiply duration-500 animate-in fade-in"
        />
      </div>

      {/* Slides (solo si hay más de una imagen) */}
      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSlide(i)}
              aria-label={`Foto ${i + 1}`}
              aria-current={slide === i}
              className={`relative aspect-square w-[72px] flex-none overflow-hidden rounded-[10px] transition-all duration-200 ${
                slide === i
                  ? "ring-2 ring-[var(--accent-ice)] ring-offset-2 ring-offset-[var(--bg-metal)]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
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
          <img
            key={imgByColor[color]}
            src={imgByColor[color]}
            alt={name}
            className="h-full w-full object-contain mix-blend-multiply duration-300 animate-in fade-in"
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
        En los inflables el precio depende del motor, así que la card
        trae su propio selector Pro / Premium. ---- */
export function ShieldAddon() {
  const { producto, toggleAddon, hasAddon } = useProductOptions();
  const planes = planesDe(producto);
  const [motorIdx, setMotorIdx] = useState(0);
  const p: PlanShield = planes[Math.min(motorIdx, planes.length - 1)];
  const id = `shield-${p.id}`;
  const added = hasAddon(id);

  const cambiarMotor = (i: number) => {
    // Si ya estaba agregado, la selección se mueve al plan del otro motor.
    if (added) {
      const nuevo = planes[i];
      toggleAddon({ id, name: `MF Shield · ${p.equipo}`, price: p.precio });
      toggleAddon({
        id: `shield-${nuevo.id}`,
        name: `MF Shield · ${nuevo.equipo}`,
        price: nuevo.precio,
      });
    }
    setMotorIdx(i);
  };

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

      {planes.length > 1 && (
        <div className="mt-3 flex gap-2">
          {planes.map((op, i) => (
            <button
              key={op.id}
              onClick={() => cambiarMotor(i)}
              aria-pressed={i === motorIdx}
              className={`flex-1 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors duration-200 ${
                i === motorIdx
                  ? "border-[var(--accent-ice)] text-[var(--accent-ice)]"
                  : "border-[var(--line-2)] text-[var(--fg-muted)] hover:border-[var(--line-3,var(--line-2))]"
              }`}
            >
              Motor {op.motor} · {money(op.precio)}
            </button>
          ))}
        </div>
      )}

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

/* ---- Plan de pago (solo MF ONE): liquidar o apartar con 40 %.
        La MF ONE no está en inventario de forma recurrente, así que el
        apartado funciona como lista de espera: 40 % ahora, 60 % antes
        del envío, entrega estimada en 12 semanas. ---- */

const WHATSAPP = "5215616471386";
export const ANTICIPO = 0.4;
export const SEMANAS_ENTREGA = 12;

export function PaymentPlan({
  cartUrl,
  demoUrl,
}: {
  cartUrl: string;
  demoUrl: string;
}) {
  const { total, addons, color } = useProductOptions();
  const [modo, setModo] = useState<"completo" | "apartado">("completo");

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

  const opciones = [
    {
      k: "completo" as const,
      t: "Pago completo",
      d: "Liquidas hoy y entramos directo a programación de envío.",
      monto: total,
      pie: "Un solo cargo",
    },
    {
      k: "apartado" as const,
      t: "Apártala con 40 %",
      d: `Pagas el 40 % ahora y el 60 % antes del envío. Entrega estimada en ${SEMANAS_ENTREGA} semanas.`,
      monto: anticipo,
      pie: `Hoy · después ${money(resto)} MXN`,
    },
  ];

  return (
    <div className="mt-8 max-w-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
        Cómo lo pagas
      </p>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {opciones.map((o) => (
          <button
            key={o.k}
            onClick={() => setModo(o.k)}
            aria-pressed={modo === o.k}
            className={`rounded-[14px] border bg-white p-4 text-left transition-colors duration-200 ${
              modo === o.k ? "border-[var(--accent-ice)]" : "border-[var(--line-1)] hover:border-[var(--line-2)]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13.5px] font-semibold">{o.t}</span>
              <span
                className={`h-4 w-4 flex-none rounded-full border transition-colors duration-200 ${
                  modo === o.k
                    ? "border-[var(--accent-ice)] bg-[var(--accent-ice)] shadow-[inset_0_0_0_3px_white]"
                    : "border-[var(--line-2)]"
                }`}
              />
            </div>
            <p className="mt-1.5 text-[15px] font-semibold">
              {money(o.monto)} <span className="text-[11px] font-normal text-[var(--fg-subtle)]">MXN</span>
            </p>
            <p className="text-[11px] text-[var(--fg-subtle)]">{o.pie}</p>
            <p className="mt-2 text-[12px] leading-snug text-[var(--fg-muted)]">{o.d}</p>
          </button>
        ))}
      </div>

      {modo === "apartado" && (
        <div className="mt-3 rounded-[14px] border border-[var(--line-1)] bg-white p-4">
          <div className="space-y-2.5">
            {[
              { icon: Wallet, t: `Hoy: ${money(anticipo)} MXN`, d: "Reservas tu lugar en la lista y tu equipo entra a producción." },
              { icon: Truck, t: `Antes del envío: ${money(resto)} MXN`, d: "Te avisamos cuando tu MF ONE esté lista y liquidas para programar la entrega." },
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
            Entrega estimada: {SEMANAS_ENTREGA} semanas desde el anticipo. Los montos de arriba no
            incluyen el envío ($6,000 MXN a todo México) ni IVA.
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {modo === "completo" ? (
          <a href={cartUrl} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-primary">
            Agregar al carrito
          </a>
        ) : (
          <a
            href={`https://wa.me/${WHATSAPP}?text=${mensaje}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mbtn mbtn-primary"
          >
            Apartar con {money(anticipo)}
          </a>
        )}
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-ghost">
          Agendar demo
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
