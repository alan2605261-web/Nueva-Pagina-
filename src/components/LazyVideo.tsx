"use client";

import { useEffect, useRef, useState } from "react";

/*
  Video que no descarga nada hasta que entra en pantalla.

  El problema que resuelve: seis videos en autoplay al pie del home
  arrancaban su descarga en cuanto cargaba la página, saturaban las
  conexiones del navegador y dejaban esperando a todo lo que venía
  después — entre otras cosas, "Encuentra tu plunge".

  El poster se pinta desde el HTML estático, así que la sección se ve
  completa desde el primer frame, se reproduzca el video o no.
*/

export function LazyVideo({
  src,
  poster,
  className,
  margin = "300px",
}: {
  src: string;
  poster: string;
  className?: string;
  /** Cuánto antes de entrar en pantalla empieza a cargar. */
  margin?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cargar, setCargar] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setCargar(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCargar(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  useEffect(() => {
    if (cargar) ref.current?.play().catch(() => {});
  }, [cargar]);

  return (
    <video
      ref={ref}
      src={cargar ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
