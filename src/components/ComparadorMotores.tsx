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
  los motores contestan LAS MISMAS filas, alineadas, y se marcan las que
  cambian.

  Reglas de datos:
  · Premium 2.0: 3 a 42 °C (vigente). Las fichas de "1 a 40 °C" son de modelos
    futuros; no se usan.
  · No se incluyen watts, medidas, peso ni tiempos de enfriamiento de los
    inflables: vienen de esas fichas o no están verificados.
  · Sin "Más popular": lo más vendido es la MF ONE, no un motor.
*/

export type MotorId = "pro" | "premium" | "mfone";

type Valor = { t: string; ok?: boolean } | null; // null = no incluye

type Fila = { label: string; valores: Record<MotorId, Valor> };

const MOTORES: Record<MotorId, { nombre: string; img: string }> = {
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

const clave = (v: Valor) => (v ? v.t : "—");

export function ComparadorMotores({ disponibles }: { disponibles: MotorId[] }) {
  const [elegidos, setElegidos] = useState<MotorId[]>(disponibles);
  const [soloDiferencias, setSoloDiferencias] = useState(false);
  const puedeElegir = disponibles.length > 2;

  const alternar = (id: MotorId) => {
    setElegidos((prev) => {
      if (prev.includes(id)) return prev.length > 2 ? prev.filter((x) => x !== id) : prev;
      return disponibles.filter((x) => x === id || prev.includes(x));
    });
  };

  const filas = FILAS.map((f) => ({
    ...f,
    cambia: new Set(elegidos.map((id) => clave(f.valores[id]))).size > 1,
  })).filter((f) => !soloDiferencias || f.cambia);

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

        <label className="inline-flex cursor-pointer select-none items-center gap-2.5 text-[12.5px] font-medium text-[var(--fg-metal)]">
          <span className="relative inline-flex">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={soloDiferencias}
              onChange={(e) => setSoloDiferencias(e.target.checked)}
            />
            <span className="h-6 w-10 rounded-full bg-[var(--line-2)] transition-colors peer-checked:bg-[var(--accent-ice)]" />
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
          </span>
          Solo diferencias
        </label>
      </div>

      {/* Encabezados de columna */}
      <div className="grid grid-cols-1 border-b border-[var(--line-1)] md:grid-cols-[200px_minmax(0,1fr)]">
        <div className="hidden md:block" />
        <div className={`grid ${gridValores}`}>
          {elegidos.map((id, i) => (
            <div key={id} className={`flex flex-col items-center px-3 py-5 text-center ${i > 0 ? "border-l border-[var(--line-1)]" : ""}`}>
              <div className="h-16 w-20 overflow-hidden rounded-[10px] bg-[var(--bg-panel)] sm:h-20 sm:w-28">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MOTORES[id].img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <p className="mt-3 text-[12.5px] font-semibold leading-tight sm:text-[14px]">{MOTORES[id].nombre}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filas */}
      <div>
        {filas.map((f) => (
          <div
            key={f.label}
            className={`grid grid-cols-1 border-b border-[var(--line-1)] last:border-b-0 md:grid-cols-[200px_minmax(0,1fr)] ${
              f.cambia ? "bg-[rgba(91,155,213,0.06)]" : ""
            }`}
          >
            <div className="flex items-center gap-2 px-5 pt-4 md:px-8 md:py-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                {f.label}
              </span>
              {f.cambia && (
                <span className="rounded-full bg-[var(--accent-ice)] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white">
                  Cambia
                </span>
              )}
            </div>
            <div className={`grid ${gridValores}`}>
              {elegidos.map((id, i) => {
                const v = f.valores[id];
                return (
                  <div
                    key={id}
                    className={`flex items-start justify-center gap-1.5 px-3 py-3 text-center md:py-4 ${
                      i > 0 ? "border-l border-[var(--line-1)]" : ""
                    }`}
                  >
                    {v === null ? (
                      <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--fg-subtle)]">
                        <Minus size={14} strokeWidth={2.4} /> No incluye
                      </span>
                    ) : (
                      <span className="inline-flex items-start gap-1.5 text-[13px] font-medium leading-snug sm:text-[14px]">
                        {v.ok && (
                          <Check size={15} strokeWidth={2.6} className="mt-[2px] hidden flex-none text-[var(--accent-ice)] sm:block" />
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
        {filas.length === 0 && (
          <p className="px-8 py-8 text-center text-[13.5px] text-[var(--fg-muted)]">
            Con esta selección no hay diferencias.
          </p>
        )}
      </div>
    </div>
  );
}
