"use client";

import { useState } from "react";
import { Flame, Gauge, Minus, Snowflake, Sparkles, type LucideIcon } from "lucide-react";

/*
  Comparativa interactiva Pro 2.0 / Premium 2.0.

  Historia: primero las diferencias vivían como renglones dentro de dos
  tarjetas casi iguales ("está muy oculto"). Luego fueron cuatro columnas
  estáticas. Saul pidió (sep 2026) un selector arriba: al elegir Pro se pintan
  de azul solo las características que trae el Pro; al elegir Premium, todas.

  Datos de SPECS_NUEVOS en src/lib/motores.ts. Temperatura: el Premium 2.0 que
  se vende hoy va de 3 a 42 °C (Saul, sep 2026). Las fichas que dicen "1 a 40 °C"
  son de modelos futuros, otra cosa: no mezclarlas ni ponerles aviso.
*/

type Motor = "Pro" | "Premium";

type Rasgo = {
  icon: LucideIcon;
  t: string;
  valores: Record<Motor, string | null>;
  nota: string;
};

export const RASGOS: Rasgo[] = [
  { icon: Snowflake, t: "Enfriamiento", valores: { Pro: "2,050 W", Premium: "2,600 W" }, nota: "Capacidad" },
  { icon: Gauge, t: "Potencia", valores: { Pro: "0.8 HP", Premium: "1 HP" }, nota: "Compresor" },
  { icon: Flame, t: "Calor", valores: { Pro: null, Premium: "Hasta 42 °C" }, nota: "Agua caliente en el mismo equipo" },
  { icon: Sparkles, t: "Ozono", valores: { Pro: null, Premium: "Integrado" }, nota: "Desinfecta sin cloro de alberca" },
];

export function DiferenciasMotor() {
  const [motor, setMotor] = useState<Motor>("Premium");

  return (
    <div className="mb-8 overflow-hidden rounded-[18px] border border-[var(--line-1)] bg-[var(--bg-panel)]">
      <div className="flex flex-col items-center gap-3 border-b border-[var(--line-1)] px-6 py-5 sm:flex-row sm:justify-between sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          Compara lo que trae cada motor
        </p>

        <div
          role="radiogroup"
          aria-label="Elige un motor para comparar"
          className="relative inline-grid grid-cols-2 rounded-full border border-[var(--line-1)] bg-white p-1"
        >
          {/* Píldora que se desliza detrás de la opción elegida */}
          <span
            aria-hidden="true"
            className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full bg-[var(--m-ink)] shadow-[0_4px_14px_rgba(8,9,11,0.18)]"
            style={{
              left: motor === "Pro" ? 4 : "50%",
              transition: "left 0.38s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          />
          {(["Pro", "Premium"] as Motor[]).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={motor === m}
              onClick={() => setMotor(m)}
              className={`relative z-10 rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                motor === m ? "text-white" : "text-[var(--fg-muted)] hover:text-[var(--m-ink)]"
              }`}
            >
              {m} 2.0
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {RASGOS.map((r, i) => {
          const valor = r.valores[motor];
          const incluye = valor !== null;
          return (
            <div
              key={r.t}
              className={`flex flex-col p-6 transition-colors duration-300 sm:p-7 ${
                i % 2 === 1 ? "border-l" : ""
              } ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} border-[var(--line-1)] ${
                incluye ? "bg-[rgba(91,155,213,0.07)]" : ""
              }`}
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ${
                  incluye
                    ? "bg-[var(--accent-ice)] text-white shadow-[0_6px_18px_rgba(91,155,213,0.35)]"
                    : "bg-white text-[var(--fg-subtle)]"
                }`}
              >
                <r.icon size={20} strokeWidth={1.8} />
              </span>
              <p
                className={`mt-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                  incluye ? "text-[var(--accent-ice)]" : "text-[var(--fg-subtle)]"
                }`}
              >
                {r.t}
              </p>
              <p
                className={`mdisplay mt-2 text-[clamp(26px,2.6vw,34px)] leading-none transition-colors duration-300 ${
                  incluye ? "text-[var(--m-ink)]" : "text-[var(--fg-subtle)]"
                }`}
              >
                {valor ?? (
                  <span className="inline-flex items-center gap-2 text-[clamp(20px,2vw,24px)]">
                    <Minus size={18} strokeWidth={2.4} aria-hidden /> No incluye
                  </span>
                )}
              </p>
              <p className="mt-1.5 text-[12.5px] text-[var(--fg-muted)]">
                {incluye ? r.nota : "Solo en el Premium 2.0"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
