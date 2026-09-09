"use client";

import { useEffect, useRef, useState } from "react";

/*
  Frío. Calor. Un solo equipo. — díptico interactivo.
  Dos fotos de estudio (misma escena: azul = frío, rojo = calor).
  Idle: las mitades "respiran" alternándose cada 4 s.
  Hover / tap: la mitad activa se expande y la otra se atenúa.
*/

const PANELS = [
  {
    key: "frio",
    img: "/images/mfone-frio.jpg",
    temp: "1 °C",
    label: "Frío",
    color: "var(--mf-cold, #4C90C6)",
  },
  {
    key: "calor",
    img: "/images/mfone-calor.jpg",
    temp: "40 °C",
    label: "Calor",
    color: "var(--mf-heat, #C0392B)",
  },
] as const;

type PanelKey = (typeof PANELS)[number]["key"];

export function FrioCalor() {
  const [hovered, setHovered] = useState<PanelKey | null>(null);
  const [idleSide, setIdleSide] = useState<PanelKey>("frio");
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const id = setInterval(
      () => setIdleSide((s) => (s === "frio" ? "calor" : "frio")),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  const active = hovered ?? (reduced.current ? null : idleSide);

  return (
    <div className="relative overflow-hidden rounded-[18px] bg-[#08090b]">
      <div className="flex h-[clamp(480px,74vh,760px)] flex-col sm:flex-row">
        {PANELS.map((p) => {
          const isActive = active === p.key;
          const isDimmed = active !== null && !isActive;
          return (
            <button
              key={p.key}
              type="button"
              aria-label={`${p.label} — ${p.temp}`}
              onMouseEnter={() => setHovered(p.key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(p.key)}
              onBlur={() => setHovered(null)}
              onTouchStart={() => setHovered(p.key)}
              className="relative min-h-0 min-w-0 cursor-default overflow-hidden transition-[flex-grow,opacity] duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ flexGrow: isActive ? 1.45 : 1, flexBasis: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={p.img}
                alt={`MF ONE en modo ${p.label.toLowerCase()} (${p.temp})`}
                className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-1000"
                style={{
                  objectPosition: "center 32%",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                  opacity: isDimmed ? 0.55 : 1,
                }}
              />
              {/* Badge de temperatura */}
              <span
                className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-opacity duration-700"
                style={{ opacity: isDimmed ? 0.4 : 1 }}
              >
                <span
                  aria-hidden
                  className="h-[7px] w-[7px] rounded-full transition-transform duration-700"
                  style={{
                    background: p.color,
                    boxShadow: `0 0 10px ${p.color}`,
                    transform: isActive ? "scale(1.3)" : "scale(1)",
                  }}
                />
                {p.temp} · {p.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Overlay de texto */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(8,9,11,0.92)] via-[rgba(8,9,11,0.55)] to-transparent p-8 text-center sm:p-12">
        <h2
          className="mdisplay mx-auto max-w-2xl text-[clamp(28px,4vw,52px)] text-white"
          style={{
            WebkitTextStroke: "var(--bold-stroke) currentColor",
            textShadow: "0 2px 22px rgba(0,0,0,0.55)",
          }}
        >
          Frío. Calor. Un solo equipo.
        </h2>
        <p
          className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/90"
          style={{ textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}
        >
          El mismo equipo baja a 1 °C para recuperar y sube a 40 °C para relajar.
          Zero Setup: sin obra, sin plomería.
        </p>
      </div>
    </div>
  );
}
