"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";

/*
  Compáralos: comparador de motores.

  Historia (Saul, sep 2026): primero hubo tarjetas oscuras con lista, luego un
  selector Pro/Premium con cuatro rasgos, luego tarjetas horizontales con
  cuatro cifras cada una. Con esas últimas "ya no se aprecian las diferencias":
  cada tarjeta mostraba cifras distintas ("Filtración 3 capas" en el Pro,
  "Ozono 24/7" en el Premium) y parecía que el Premium no filtraba. Aquí todos
  los motores contestan LAS MISMAS filas, alineadas, y se leen de corrido.

  No hay distintivo de "Cambia", ni fondo de color en las filas que cambian, ni
  interruptor de "Solo diferencias" (Rafa y Saul, sep 2026). Los tres existieron
  y los tres se quitaron por lo mismo: con los tres motores puestos cambian diez
  de once filas, así que marcar las diferencias no decía nada y el interruptor
  solo escondía una fila.

  Reglas de datos:
  · Premium 2.0: 3 a 42 °C (vigente). Las fichas de "1 a 40 °C" son de modelos
    futuros; no se usan.
  · No se incluyen watts, medidas, peso ni tiempos de enfriamiento de los
    inflables: vienen de esas fichas o no están verificados.
  · Material e iluminación se agregaron para que se vea lo que distingue a la
    MF ONE (Saul, sep 2026). Salen de las fichas: acrílico con acero inoxidable
    contra tejido drop-stitch. No se escribe "PVC" porque la ficha de los
    inflables no lo dice.
  · Sin "Más popular": lo más vendido es la MF ONE, no un motor.
*/

export type MotorId = "pro" | "premium" | "mfone";

type Valor = { t: string; ok?: boolean } | null; // null = no incluye

type Fila = { label: string; valores: Record<MotorId, Valor> };

const MOTORES: Record<MotorId, { nombre: string; img: string }> = {
  /* Las dos de motor salen de la carpeta que dejo Saul con una foto por color
     (sep 2026): antes eran recortes con franjas negras a los lados. Van sobre
     blanco, en cuadrado y con 14% de aire alrededor del equipo, para que en la
     miniatura no se vean pegadas a la orilla.
     La de la MF ONE se queda como estaba: se probo el render de ficha y Saul
     prefirio la anterior. */
  pro: { nombre: "Motor Pro 2.0", img: "/images/motor-2-0-blanco.jpg" },
  premium: { nombre: "Motor Premium 2.0", img: "/images/motor-2-0-negro.jpg" },
  mfone: { nombre: "Motor MF ONE", img: "/images/mfone-gallery/negro/01.jpg" },
};

const FILAS: Fila[] = [
  {
    label: "Para",
    valores: {
      pro: { t: "MF Barrel y MF Horizon" },
      premium: { t: "MF Barrel y MF Horizon" },
      mfone: { t: "MF ONE" },
    },
  },
  {
    label: "Compresor",
    valores: { pro: { t: "0.8 HP" }, premium: { t: "1 HP" }, mfone: { t: "1 HP" } },
  },
  {
    label: "Frío",
    valores: { pro: { t: "Hasta 3 °C", ok: true }, premium: { t: "Hasta 3 °C", ok: true }, mfone: { t: "Hasta 1 °C", ok: true } },
  },
  {
    label: "Calor",
    valores: { pro: null, premium: { t: "Hasta 42 °C", ok: true }, mfone: { t: "Hasta 40 °C", ok: true } },
  },
  {
    label: "Desinfección con ozono",
    valores: { pro: null, premium: { t: "Incluida", ok: true }, mfone: { t: "Incluida", ok: true } },
  },
  {
    label: "Filtración",
    valores: {
      pro: { t: "3 capas: papel, integrado y malla", ok: true },
      premium: { t: "3 capas: papel, integrado y malla", ok: true },
      mfone: { t: "Filtro de papel y skimmer", ok: true },
    },
  },
  {
    label: "Material del cuerpo",
    valores: {
      pro: { t: "Tejido drop-stitch de grado militar" },
      premium: { t: "Tejido drop-stitch de grado militar" },
      mfone: { t: "Acrílico con acabados en acero inoxidable" },
    },
  },
  {
    label: "Iluminación LED interior",
    valores: { pro: null, premium: null, mfone: { t: "Incluida", ok: true } },
  },
  {
    label: "Control",
    valores: { pro: { t: "Panel y app Wi-Fi", ok: true }, premium: { t: "Panel y app Wi-Fi", ok: true }, mfone: { t: "Panel y app Wi-Fi", ok: true } },
  },
  {
    label: "Dónde va",
    valores: {
      pro: { t: "Junto a la tina, con mangueras" },
      premium: { t: "Junto a la tina, con mangueras" },
      mfone: { t: "En la misma pieza de la tina" },
    },
  },
  {
    label: "Garantía",
    valores: { pro: { t: "6 meses" }, premium: { t: "6 meses" }, mfone: { t: "12 meses" } },
  },
];

export function ComparadorMotores({ disponibles }: { disponibles: MotorId[] }) {
  const [elegidos, setElegidos] = useState<MotorId[]>(disponibles);
  const puedeElegir = disponibles.length > 2;

  const alternar = (id: MotorId) => {
    setElegidos((prev) => {
      if (prev.includes(id)) return prev.length > 2 ? prev.filter((x) => x !== id) : prev;
      return disponibles.filter((x) => x === id || prev.includes(x));
    });
  };

  const cols = elegidos.length;
  const gridValores = cols === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--line-1)] bg-white">
      {/* Controles */}
      <div className="flex flex-col gap-4 border-b border-[var(--line-1)] bg-[var(--bg-panel)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-muted)]">
            Compáralos
          </p>
          {puedeElegir && (
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Motores a comparar">
              {disponibles.map((id) => {
                const activo = elegidos.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={activo}
                    onClick={() => alternar(id)}
                    className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-[12.5px] font-semibold transition-colors ${
                      activo
                        ? "border-[var(--m-ink)] bg-[var(--m-ink)] text-white"
                        : "border-[var(--line-2)] bg-white text-[var(--fg-muted)] hover:border-[var(--fg-muted)]"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full ${
                        activo ? "bg-[var(--accent-ice)] text-white" : "border border-[var(--line-2)]"
                      }`}
                    >
                      {activo && <Check size={12} strokeWidth={3} />}
                    </span>
                    {MOTORES[id].nombre}
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Encabezados de columna */}
      <div className="grid grid-cols-1 border-b border-[var(--line-1)] md:grid-cols-[200px_minmax(0,1fr)]">
        <div className="hidden md:block" />
        <div className={`grid ${gridValores}`}>
          {elegidos.map((id, i) => (
            <div key={id} className={`flex flex-col items-center px-3 py-5 text-center ${i > 0 ? "border-l border-[var(--line-1)]" : ""}`}>
              {/* object-contain, no cover: con cover se recortaba el equipo y
                  quedaban las franjas negras del archivo a los lados. */}
              <div className="grid h-16 w-20 place-items-center overflow-hidden rounded-[10px] bg-white p-1.5 sm:h-20 sm:w-28">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MOTORES[id].img} alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
              </div>
              <p className="mt-3 text-[12.5px] font-semibold leading-tight sm:text-[14px]">{MOTORES[id].nombre}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filas, en computadora: una rejilla con la característica a la
          izquierda y un valor por motor. */}
      <div className="hidden md:block">
        {FILAS.map((f) => (
          <div
            key={f.label}
            className="grid grid-cols-[200px_minmax(0,1fr)] border-b border-[var(--line-1)] last:border-b-0"
          >
            <div className="flex min-h-[72px] items-center px-8 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                {f.label}
              </span>
            </div>
            <div className={`grid ${gridValores}`}>
              {elegidos.map((id, i) => {
                const v = f.valores[id];
                return (
                  <div
                    key={id}
                    className={`flex min-h-[72px] items-center justify-center gap-1.5 px-3 py-4 text-center ${
                      i > 0 ? "border-l border-[var(--line-1)]" : ""
                    }`}
                  >
                    {v === null ? (
                      <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--fg-subtle)]">
                        <Minus size={14} strokeWidth={2.4} /> No incluye
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[14px] font-medium leading-snug">
                        {v.ok && (
                          <Check size={15} strokeWidth={2.6} className="flex-none text-[var(--accent-ice)]" />
                        )}
                        {v.t}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Filas, en celular: sin rejilla. Cada característica es un bloque y
          cada motor un renglón con su nombre a la izquierda y su respuesta a la
          derecha. En dos columnas angostas esto se leía como hoja de cálculo
          (Saul, sep 2026: "parece tabla de Excel"); así se lee como ficha. */}
      <div className="md:hidden">
        {FILAS.map((f) => (
          <div key={f.label} className="border-b border-[var(--line-1)] px-5 py-4 last:border-b-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
              {f.label}
            </p>
            <dl className="mt-2.5 space-y-2">
              {elegidos.map((id) => {
                const v = f.valores[id];
                return (
                  <div key={id} className="flex items-baseline justify-between gap-4">
                    <dt className="flex-none text-[12.5px] text-[var(--fg-muted)]">
                      {MOTORES[id].nombre}
                    </dt>
                    <dd className="text-right text-[13.5px] font-medium leading-snug">
                      {v === null ? (
                        <span className="text-[var(--fg-subtle)]">No incluye</span>
                      ) : (
                        v.t
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
