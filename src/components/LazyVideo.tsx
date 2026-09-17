"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/*
  Video que no descarga nada hasta que entra en pantalla.

  El problema que resuelve: seis videos en autoplay al pie del home
  arrancaban su descarga en cuanto cargaba la página, saturaban las
  conexiones del navegador y dejaban esperando a todo lo que venía
  después — entre otras cosas, "Encuentra tu plunge".

  El poster se pinta desde el HTML estático, así que la sección se ve
  completa desde el primer frame, se reproduzca el video o no.

  Arrancan silenciados, como en el sitio vivo: seis videos en bucle con
  sonido serían insoportables, y de todos modos el navegador bloquea el
  autoplay con audio. Lo que sí se puede es hacer clic para escuchar uno,
  y al hacerlo se silencian los demás.
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
  const [conSonido, setConSonido] = useState(false);

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

  /* Un clic enciende el sonido de este y apaga el de todos los demás, para
     que nunca suenen dos a la vez. Volver a hacer clic lo silencia. */
  function alternarSonido() {
    const yo = ref.current;
    if (!yo) return;
    const encender = yo.muted;
    document.querySelectorAll("video").forEach((v) => {
      if (v === yo) return;
      if (!v.muted) v.muted = true;
      if (v.hasAttribute("controls") && !v.paused) v.pause();
    });
    yo.muted = !encender;
    setConSonido(encender);
    if (encender) yo.play().catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={alternarSonido}
      aria-label={conSonido ? "Silenciar video" : "Escuchar video"}
      className="group relative block h-full w-full cursor-pointer border-0 p-0"
    >
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
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
        style={{ opacity: conSonido ? 1 : undefined }}
      >
        {conSonido ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </span>
    </button>
  );
}
