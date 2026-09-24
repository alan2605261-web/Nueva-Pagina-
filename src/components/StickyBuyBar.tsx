"use client";

import { useEffect, useState } from "react";
import { AddToCart, PrecioCompacto } from "@/components/ProductOptions";

/*
  Barra de compra fija.

  Sustituye a los botones de compra que estaban más abajo en las fichas de
  producto: uno en Especificaciones y otro en el cierre (Rafa y Saul, sep
  2026). Esos botones quedaban lejos del configurador, repetían la misma acción
  tres veces y ensuciaban el cierre de la página. La barra hace el mismo
  trabajo sin ocupar sitio en el diseño: aparece cuando el botón de arriba ya
  quedó fuera de pantalla y se retira sola al llegar al pie.

  Es deliberadamente discreta: 58px de alto, fondo translúcido, sin sombra
  fuerte y sin nada que cerrar. Mientras está puesta, el globo de WhatsApp
  sube para no encimarse.
*/

export function StickyBuyBar({ nombre }: { nombre: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alRodar = () => {
      const y = window.scrollY;
      const alFinal =
        y + window.innerHeight > document.documentElement.scrollHeight - 420;
      setVisible(y > 700 && !alFinal);
    };
    alRodar();
    window.addEventListener("scroll", alRodar, { passive: true });
    window.addEventListener("resize", alRodar);
    return () => {
      window.removeEventListener("scroll", alRodar);
      window.removeEventListener("resize", alRodar);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("con-barra-compra", visible);
    return () => document.documentElement.classList.remove("con-barra-compra");
  }, [visible]);

  return (
    <div className={`sticky-buy ${visible ? "show" : ""}`} aria-hidden={!visible}>
      <div className="mwrap flex items-center justify-between gap-4 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold leading-tight">{nombre}</p>
          <PrecioCompacto />
        </div>
        <AddToCart
          label="Agregar al carrito"
          nombre={nombre}
          conPaso
          className="!py-2.5 !px-5 !text-[11px] whitespace-nowrap"
        />
      </div>
    </div>
  );
}
