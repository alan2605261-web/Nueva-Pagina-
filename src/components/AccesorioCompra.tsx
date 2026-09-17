"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { useCarrito } from "@/components/CarritoProvider";
import { WHATSAPP_NUMERO } from "@/lib/whatsapp";

/*
  Piezas de cliente de la página de un accesorio: la galería y el botón de
  compra. Van aparte porque la página es estática y solo esto necesita estado.

  Un accesorio con precio se agrega al carrito como una línea "acc:<slug>", sin
  color ni motor. Uno sin precio (hoy, el soporte para celular) no tiene
  carrito: manda a WhatsApp con el nombre del producto en el mensaje.
*/

export function GaleriaAccesorio({ imgs, alt, render }: { imgs: string[]; alt: string; render?: boolean }) {
  const [i, setI] = useState(0);
  const varias = imgs.length > 1;
  const ir = (paso: number) => setI((i + paso + imgs.length) % imgs.length);
  const flecha =
    "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/60 text-[var(--fg-metal)] shadow-[0_4px_18px_rgba(8,9,11,0.1)] backdrop-blur-md transition-colors hover:bg-white/90";

  return (
    <div>
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[18px] bg-[var(--bg-panel)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={imgs[i]} src={imgs[i]} alt={alt} className={`h-full w-full ${render ? "object-cover" : "object-contain p-[8%]"}`} />
        {varias && (
          <>
            <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior" className={`${flecha} left-3`}>
              <ChevronLeft size={19} />
            </button>
            <button type="button" onClick={() => ir(1)} aria-label="Foto siguiente" className={`${flecha} right-3`}>
              <ChevronRight size={19} />
            </button>
          </>
        )}
      </div>
      {varias && (
        <div className="mt-3 flex gap-2.5">
          {imgs.map((src, n) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Foto ${n + 1}`}
              aria-current={i === n}
              className={`aspect-square w-[72px] overflow-hidden rounded-[10px] bg-[var(--bg-panel)] transition-all ${
                i === n ? "ring-2 ring-[var(--accent-ice)] ring-offset-2" : "opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className={`h-full w-full ${render ? "object-cover" : "object-contain p-1.5"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CompraAccesorio({
  slug,
  nombre,
  precio,
  img,
}: {
  slug: string;
  nombre: string;
  precio: number | null;
  img: string;
}) {
  const { agregar } = useCarrito();
  const router = useRouter();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  if (precio === null) {
    const texto = `Hola, vi el ${nombre} en su página y me interesa. ¿Me pueden dar informes?`;
    return (
      <a
        href={`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mbtn mbtn-primary w-full justify-center sm:w-auto"
      >
        Consultar por WhatsApp
      </a>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="inline-flex items-center rounded-full border border-[var(--line-2)]">
        <button
          type="button"
          onClick={() => setCantidad((c) => Math.max(1, c - 1))}
          aria-label="Quitar uno"
          className="grid h-11 w-11 place-items-center text-[var(--fg-muted)] hover:text-[var(--fg-metal)]"
        >
          <Minus size={15} />
        </button>
        <span className="w-8 text-center text-[15px] font-semibold tabular-nums" aria-live="polite">
          {cantidad}
        </span>
        <button
          type="button"
          onClick={() => setCantidad((c) => c + 1)}
          aria-label="Agregar uno"
          className="grid h-11 w-11 place-items-center text-[var(--fg-muted)] hover:text-[var(--fg-metal)]"
        >
          <Plus size={15} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          agregar({
            productoId: `acc:${slug}`,
            nombre,
            color: null,
            motor: null,
            precioUnitario: precio,
            cantidad,
            img,
            addons: [],
            variantId: null,
          });
          setAgregado(true);
          router.push("/carrito");
        }}
        className="mbtn mbtn-primary"
      >
        {agregado ? (
          <>
            <Check size={16} /> Agregado
          </>
        ) : (
          "Agregar al carrito"
        )}
      </button>
    </div>
  );
}
