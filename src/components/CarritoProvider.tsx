"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  guardarCarrito,
  keyDe,
  leerCarrito,
  piezas,
  subtotal,
  type LineaCarrito,
} from "@/lib/carrito";

/*
  Estado del carrito, compartido por toda la app.

  Va montado en el layout raíz para que el contador del menú y la página del
  carrito lean lo mismo. El primer render sale vacío a propósito: el export es
  estático, así que el HTML se genera sin saber qué hay en localStorage, y
  pintar líneas en el servidor que el cliente no tiene provoca un error de
  hidratación. Se lee en el efecto y `listo` avisa cuándo ya es de fiar.
*/

type Ctx = {
  lineas: LineaCarrito[];
  listo: boolean;
  agregar: (l: Omit<LineaCarrito, "key" | "cantidad"> & { cantidad?: number }) => void;
  quitar: (key: string) => void;
  cambiarCantidad: (key: string, cantidad: number) => void;
  vaciar: () => void;
  piezas: number;
  subtotal: number;
};

const CarritoCtx = createContext<Ctx | null>(null);

export function useCarrito() {
  const c = useContext(CarritoCtx);
  if (!c) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return c;
}

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [lineas, setLineas] = useState<LineaCarrito[]>([]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setLineas(leerCarrito());
    setListo(true);
  }, []);

  useEffect(() => {
    if (listo) guardarCarrito(lineas);
  }, [lineas, listo]);

  const agregar: Ctx["agregar"] = useCallback((entrada) => {
    const cantidad = entrada.cantidad ?? 1;
    const key = keyDe(entrada.productoId, entrada.color, entrada.motor, entrada.addons);
    setLineas((prev) => {
      const i = prev.findIndex((l) => l.key === key);
      if (i === -1) return [...prev, { ...entrada, key, cantidad }];
      const copia = [...prev];
      copia[i] = { ...copia[i], cantidad: copia[i].cantidad + cantidad };
      return copia;
    });
  }, []);

  const quitar = useCallback(
    (key: string) => setLineas((prev) => prev.filter((l) => l.key !== key)),
    [],
  );

  const cambiarCantidad = useCallback((key: string, cantidad: number) => {
    setLineas((prev) =>
      cantidad <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, cantidad } : l)),
    );
  }, []);

  const vaciar = useCallback(() => setLineas([]), []);

  return (
    <CarritoCtx.Provider
      value={{
        lineas,
        listo,
        agregar,
        quitar,
        cambiarCantidad,
        vaciar,
        piezas: piezas(lineas),
        subtotal: subtotal(lineas),
      }}
    >
      {children}
    </CarritoCtx.Provider>
  );
}
