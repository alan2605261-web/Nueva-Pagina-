"use client";

import { useEffect, useRef, useState } from "react";

/*
  StatSpark — fila de stats con chispa (ref: Apple / WHOOP / Eight Sleep).
  Números en gradiente azul hielo → azul eléctrico con glow sutil y
  count-up al entrar en viewport ("0 hielos" cuenta HACIA ABAJO hasta 0).
  Respeta prefers-reduced-motion.
*/

const STATS = [
  { from: 0, to: 3, suffix: "×", label: "más potentes que cualquier otro motor en México" },
  { from: 15, to: 0, suffix: "hielos", label: "que ya no compras cada semana" },
  { from: 0, to: 30, suffix: "días", label: "de prueba sin preguntas" },
];

const DURATION = 1400;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function StatSpark() {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(STATS.map((s) => s.from));
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValues(STATS.map((s) => s.to));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = easeOut(Math.min(1, (now - t0) / DURATION));
          setValues(STATS.map((s) => Math.round(s.from + (s.to - s.from) * p)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-y-10 border-t border-[var(--line-1)] pt-12 sm:grid-cols-3"
    >
      {STATS.map((s, i) => (
        <div key={s.label} className={`text-center ${i > 0 ? "sm:border-l sm:border-[var(--line-1)]" : ""}`}>
          <div className="relative inline-block">
            {/* glow frío detrás del número */}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 blur-2xl"
              style={{ background: "radial-gradient(closest-side, rgba(91,155,213,0.28), transparent)" }}
            />
            <span
              className="mdisplay text-[clamp(56px,7vw,84px)] leading-none"
              style={{
                WebkitTextStroke: "var(--bold-stroke) transparent",
                background:
                  "linear-gradient(135deg, var(--m-blue) 0%, var(--m-blue-600) 55%, var(--grad-blue-end, #001bff) 130%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {values[i]}
            </span>
            <span className="ml-2 align-baseline text-[clamp(18px,2vw,24px)] font-semibold text-[var(--fg-muted)]">
              {s.suffix}
            </span>
          </div>
          <p className="mx-auto mt-3 max-w-[26ch] text-[13px] leading-relaxed text-[var(--fg-muted)]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
