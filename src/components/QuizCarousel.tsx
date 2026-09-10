"use client";

import { useEffect, useRef, useState } from "react";

/*
  Las tres tinas rotando en la sección del quiz.

  La idea es que quede claro que la recomendación no está cantada de antemano:
  si ahí vive una sola foto, el visitante asume que le vamos a vender esa.

  Rota cada 3.5 s. Se probó con intervalos largos y no sirven: nadie pasa dos
  minutos en esta sección, así que vería una sola imagen y el punto se pierde.

  Se detiene cuando la sección no está en pantalla, y también cuando el sistema
  pide menos movimiento.
*/

/* Fotos por modelo y color. Todas salen de la misma ventana de recorte, así que
   la escala entre modelos es real: el Barrel se ve más alto que el Horizon
   porque lo es.

   Las dos de MF ONE salen de mfone-gallery (negro/front y blanco/05), que son
   el mismo ángulo con Pro Deck. Saul confirmó en sep 2026 que la galería es el
   modelo NUEVO. Las de pdp-one-*.png siguen siendo del anterior: no usarlas. */
export const FOTOS: Record<string, { src: string; color: string }[]> = {
  "MF ONE": [
    { src: "/images/quiz/one-negro.jpg", color: "Negra" },
    { src: "/images/quiz/one-blanco.jpg", color: "Blanca" },
  ],
  "MF Horizon": [
    { src: "/images/quiz/horizon-negro.jpg", color: "Negra" },
    { src: "/images/quiz/horizon-blanco.jpg", color: "Blanca" },
  ],
  "MF Barrel": [
    { src: "/images/quiz/barrel-negro.jpg", color: "Negra" },
    { src: "/images/quiz/barrel-blanco.jpg", color: "Blanca" },
  ],
};

const MODELOS = [
  { src: "/images/quiz/one-negro.jpg", nombre: "MF ONE", color: "Negra" },
  { src: "/images/quiz/horizon-negro.jpg", nombre: "MF Horizon", color: "Negra" },
  { src: "/images/quiz/barrel-negro.jpg", nombre: "MF Barrel", color: "Negra" },
];

const INTERVALO = 3500;

export function QuizCarousel() {
  const [i, setI] = useState(0);
  const [activo, setActivo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // solo rota mientras la sección se ve
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActivo(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => setActivo(es.some((e) => e.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!activo) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % MODELOS.length), INTERVALO);
    return () => clearInterval(t);
  }, [activo]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[560px]">
      <div className="relative aspect-[4/3]">
        {MODELOS.map((m, n) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={m.src}
            src={m.src}
            alt={`${m.nombre} ${m.color.toLowerCase()}`}
            loading="lazy"
            decoding="async"
            aria-hidden={n !== i}
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
            style={{ opacity: n === i ? 1 : 0 }}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {MODELOS.map((m, n) => (
          <button
            key={m.src}
            onClick={() => setI(n)}
            aria-label={`Ver ${m.nombre} ${m.color.toLowerCase()}`}
            aria-current={n === i}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: n === i ? 22 : 7,
              background: n === i ? "var(--accent-ice)" : "var(--line-2)",
            }}
          />
        ))}
      </div>

      <p
        key={MODELOS[i].src}
        className="mt-3 text-center text-[12px] uppercase tracking-[0.18em] duration-500 animate-in fade-in"
        style={{ color: "var(--fg-subtle)" }}
      >
        {MODELOS[i].nombre}
      </p>
    </div>
  );
}
