"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCarrito } from "@/components/CarritoProvider";
import { envioDe, money, subtotalLinea } from "@/lib/carrito";

/*
  Página del carrito.

  Pinta lo que hay, deja cambiar cantidades y calcula el total. Lo que NO hace
  es cobrar: el botón de pagar está deshabilitado y el aviso de arriba explica
  por qué, para que nadie —ni Rafa revisando ni un cliente en una demo— crea
  que la compra se completó. Ver las tres costuras en src/lib/carrito.ts.
*/

export function CarritoVista() {
  const { lineas, listo, quitar, cambiarCantidad, subtotal } = useCarrito();
  const envio = envioDe(lineas);
  const total = subtotal + envio;

  /* Hasta que el efecto lea localStorage no sabemos si hay algo: mostrar
     "tu carrito está vacío" mientras tanto sería mentira a medias. */
  if (!listo) {
    return (
      <div className="py-20 text-center text-[14px] text-[var(--fg-subtle)]">
        Cargando tu carrito…
      </div>
    );
  }

  if (!lineas.length) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <span className="m-eyebrow accent">Carrito</span>
        <h1
          className="mdisplay mt-4 text-[clamp(32px,4.4vw,54px)]"
          style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
        >
          Tu carrito está vacío.
        </h1>
        <p className="mt-5 text-[15.5px] leading-relaxed text-[var(--fg-muted)]">
          Elige tu plunge y configúralo a tu gusto: color, motor y garantía extendida.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/productos" className="mbtn mbtn-primary">
            Ver los plunges
          </Link>
          <Link href="/quiz" className="mbtn mbtn-ghost">
            Encuentra tu plunge
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <span className="m-eyebrow accent">Carrito</span>
      <h1
        className="mdisplay mt-4 text-[clamp(32px,4.4vw,54px)]"
        style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
      >
        Tu carrito
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        {/* Líneas */}
        <ul className="space-y-4">
          {lineas.map((l) => (
            <li
              key={l.key}
              className="flex gap-5 rounded-[16px] border border-[var(--line-1)] bg-white p-5"
            >
              <div className="flex h-[104px] w-[128px] flex-none items-center justify-center overflow-hidden rounded-[12px] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.img}
                  alt={l.nombre}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mdisplay text-[19px] leading-tight">{l.nombre}</h2>
                    <p className="mt-1 text-[12.5px] text-[var(--fg-muted)]">
                      {l.color ?? "Accesorio"}
                      {l.motor ? ` · Motor ${l.motor} 2.0` : null}
                    </p>
                  </div>
                  <button
                    onClick={() => quitar(l.key)}
                    aria-label={`Quitar ${l.nombre}`}
                    className="flex-none rounded-full p-1.5 text-[var(--fg-subtle)] transition-colors hover:bg-[var(--bg-panel)] hover:text-[var(--fg-metal)]"
                  >
                    <X size={16} />
                  </button>
                </div>

                {l.addons.length > 0 && (
                  <ul className="mt-2.5 space-y-1">
                    {l.addons.map((a) => (
                      <li
                        key={a.id}
                        className="flex justify-between gap-4 text-[12.5px] text-[var(--fg-muted)]"
                      >
                        <span>+ {a.nombre}</span>
                        <span className="tabular-nums">{money(a.precio)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-full border border-[var(--line-2)]">
                    <button
                      onClick={() => cambiarCantidad(l.key, l.cantidad - 1)}
                      aria-label="Quitar uno"
                      className="px-3 py-2 text-[var(--fg-muted)] transition-colors hover:text-[var(--fg-metal)]"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[28px] text-center text-[13.5px] font-semibold tabular-nums">
                      {l.cantidad}
                    </span>
                    <button
                      onClick={() => cambiarCantidad(l.key, l.cantidad + 1)}
                      aria-label="Agregar uno"
                      className="px-3 py-2 text-[var(--fg-muted)] transition-colors hover:text-[var(--fg-metal)]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-[15px] font-semibold tabular-nums">
                    {money(subtotalLinea(l))}{" "}
                    <span className="font-normal text-[var(--fg-subtle)]">MXN</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Resumen */}
        <aside className="rounded-[16px] border border-[var(--line-1)] bg-white p-6 lg:sticky lg:top-24">
          <h2 className="mdisplay text-[20px]">Resumen</h2>

          <dl className="mt-5 space-y-2.5 text-[13.5px]">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--fg-muted)]">Subtotal</dt>
              <dd className="font-semibold tabular-nums">{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--fg-muted)]">Envío</dt>
              <dd className="font-semibold tabular-nums">{money(envio)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[var(--line-1)] pt-3 text-[16px]">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold tabular-nums">
                {money(total)} <span className="font-normal text-[var(--fg-subtle)]">MXN</span>
              </dd>
            </div>
          </dl>

          <p className="mt-2 text-[11.5px] leading-snug text-[var(--fg-subtle)]">
            Precios en pesos, IVA no incluido. Hasta 6 meses sin intereses con Mercado Pago.
          </p>

          {/* Costura 3: aquí va la llamada que crea el checkout en Shopify. */}
          <button
            disabled
            className="mbtn mbtn-primary mt-6 w-full cursor-not-allowed justify-center opacity-45"
          >
            Pagar
          </button>

          <div className="mt-4 rounded-[12px] border border-[var(--line-1)] bg-[var(--bg-panel)] p-4">
            <p className="text-[12px] font-semibold">Pago todavía no conectado</p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-[var(--fg-muted)]">
              El carrito ya guarda tu configuración, pero el cobro sigue pendiente de
              conectarse. Para cerrar una compra hoy, escríbenos por WhatsApp y lo
              terminamos contigo.
            </p>
            <a
              href="https://wa.me/5215616471386"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[12px] font-semibold underline underline-offset-2 hover:text-[var(--accent-ice)]"
            >
              Escribir por WhatsApp
            </a>
          </div>

          <Link
            href="/productos"
            className="mt-5 block text-center text-[13px] text-[var(--fg-muted)] underline underline-offset-4 hover:text-[var(--fg-metal)]"
          >
            Seguir viendo
          </Link>
        </aside>
      </div>
    </div>
  );
}
