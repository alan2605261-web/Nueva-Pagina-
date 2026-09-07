"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/*
  Calculadora de ROI para leasing B2B de Mente Fria.

  Matemática (la misma de siempre, verificada contra las reglas de negocio):
    inversión inicial = precio × 12%          (anticipo 10% + comisión apertura 2%)
    renta mensual     = precio × 90% × factor / plazo
    ingreso mensual   = inmersiones/día × 30 × precio por inmersión
    utilidad mensual  = ingreso − renta

  La gráfica compara ingreso acumulado contra costo acumulado y marca el mes
  en que se cruzan (punto de equilibrio). SVG inline: sin librerías.
*/

const MODELS = [
  { name: "Barrel Pro", price: 69000 },
  { name: "Barrel Premium", price: 84000 },
  { name: "Barrel Comercial", price: 114000 },
  { name: "Horizon Pro", price: 74000 },
  { name: "Horizon Premium", price: 89000 },
  { name: "Horizon Comercial", price: 119000 },
  { name: "MF ONE", price: 169000 },
];

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

/* Etiquetas cortas para los ejes: $1.2M / $450k / $0 */
function compactMxn(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${Math.round(v / 1_000)}k`;
  return `$${Math.round(v)}`;
}

/* ─── Gráfica de ROI ──────────────────────────────────────────────────────
   Ingreso acumulado vs costo acumulado, con el punto de equilibrio marcado.
   Coordenadas en un viewBox fijo; el SVG escala solo al ancho del contenedor.
────────────────────────────────────────────────────────────────────────── */

const VB_W = 760;
const VB_H = 340;
const PAD = { top: 24, right: 22, bottom: 44, left: 66 };

function RoiChart({
  plazo,
  inversionInicial,
  rentaMensual,
  ingresoMensual,
  breakEvenMes,
}: {
  plazo: number;
  inversionInicial: number;
  rentaMensual: number;
  ingresoMensual: number;
  breakEvenMes: number | null;
}) {
  const innerW = VB_W - PAD.left - PAD.right;
  const innerH = VB_H - PAD.top - PAD.bottom;

  const costoEn = (m: number) => inversionInicial + rentaMensual * m;
  const ingresoEn = (m: number) => ingresoMensual * m;

  const yMax = Math.max(costoEn(plazo), ingresoEn(plazo), 1);

  const x = (m: number) => PAD.left + (m / plazo) * innerW;
  const y = (v: number) => PAD.top + innerH - (v / yMax) * innerH;

  const meses = Array.from({ length: plazo + 1 }, (_, i) => i);
  const linea = (f: (m: number) => number) =>
    meses.map((m) => `${x(m).toFixed(1)},${y(f(m)).toFixed(1)}`).join(" ");

  /* Ticks del eje X: cada 3 meses a 24, cada 2 a 12 */
  const paso = plazo > 12 ? 3 : 2;
  const ticksX = meses.filter((m) => m % paso === 0);
  const ticksY = [0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax);

  const beDentroDelPlazo =
    breakEvenMes !== null && breakEvenMes <= plazo && breakEvenMes >= 0;

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full"
        role="img"
        aria-label={
          beDentroDelPlazo
            ? `Gráfica de retorno: el ingreso acumulado supera al costo acumulado en el mes ${Math.ceil(
                breakEvenMes,
              )} de ${plazo}.`
            : `Gráfica de retorno: con estos parámetros el ingreso acumulado no alcanza al costo dentro de los ${plazo} meses.`
        }
      >
        {/* Rejilla horizontal + etiquetas del eje Y */}
        {ticksY.map((v, i) => (
          <g key={i}>
            <line
              x1={PAD.left}
              x2={VB_W - PAD.right}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--line-1)"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 12}
              y={y(v) + 4}
              textAnchor="end"
              fontSize={11}
              fill="var(--fg-subtle)"
            >
              {compactMxn(v)}
            </text>
          </g>
        ))}

        {/* Eje X */}
        {ticksX.map((m) => (
          <text
            key={m}
            x={x(m)}
            y={VB_H - PAD.bottom + 22}
            textAnchor="middle"
            fontSize={11}
            fill="var(--fg-subtle)"
          >
            {m}
          </text>
        ))}
        <text
          x={PAD.left + innerW / 2}
          y={VB_H - 6}
          textAnchor="middle"
          fontSize={10}
          letterSpacing="0.18em"
          fill="var(--fg-subtle)"
        >
          MESES
        </text>

        {/* Área bajo el ingreso, para dar peso visual a la ganancia */}
        <polygon
          points={`${x(0)},${y(0)} ${linea(ingresoEn)} ${x(plazo)},${y(0)}`}
          fill="var(--accent-ice)"
          opacity={0.1}
        />

        {/* Costo acumulado */}
        <polyline
          points={linea(costoEn)}
          fill="none"
          stroke="var(--m-steel)"
          strokeWidth={2}
          strokeDasharray="6 5"
          strokeLinecap="round"
        />

        {/* Ingreso acumulado */}
        <polyline
          points={linea(ingresoEn)}
          fill="none"
          stroke="var(--accent-ice)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Punto de equilibrio */}
        {beDentroDelPlazo && (
          <g>
            <line
              x1={x(breakEvenMes)}
              x2={x(breakEvenMes)}
              y1={PAD.top}
              y2={PAD.top + innerH}
              stroke="var(--m-ink)"
              strokeWidth={1}
              strokeDasharray="3 4"
              opacity={0.45}
            />
            <circle
              cx={x(breakEvenMes)}
              cy={y(ingresoEn(breakEvenMes))}
              r={5.5}
              fill="var(--m-ink)"
            />
            <circle
              cx={x(breakEvenMes)}
              cy={y(ingresoEn(breakEvenMes))}
              r={10}
              fill="none"
              stroke="var(--m-ink)"
              strokeWidth={1}
              opacity={0.3}
            />
            <text
              x={Math.min(x(breakEvenMes) + 14, VB_W - PAD.right - 4)}
              y={PAD.top + 14}
              textAnchor={
                x(breakEvenMes) > PAD.left + innerW * 0.72 ? "end" : "start"
              }
              fontSize={11.5}
              fontWeight={600}
              fill="var(--m-ink)"
            >
              Equilibrio · mes {Math.ceil(breakEvenMes)}
            </text>
          </g>
        )}
      </svg>

      {/* Leyenda */}
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px]">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-[3px] w-6 rounded-full"
            style={{ background: "var(--accent-ice)" }}
          />
          <span style={{ color: "var(--fg-metal)" }}>Ingreso acumulado</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-[3px] w-6 rounded-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--m-steel) 0 6px, transparent 6px 11px)",
            }}
          />
          <span style={{ color: "var(--fg-muted)" }}>
            Costo acumulado (enganche + rentas)
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* ─── Tarjeta de resultado ────────────────────────────────────────────── */

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div
      className="rounded-[14px] border p-6"
      style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
    >
      <p className="m-eyebrow">{label}</p>
      <p
        className="mdisplay mt-3 text-[26px]"
        style={{ color: "var(--fg-metal)" }}
      >
        {value}
      </p>
      <p className="mt-2 text-xs" style={{ color: "var(--fg-subtle)" }}>
        {note}
      </p>
    </div>
  );
}

/* ─── Calculadora ─────────────────────────────────────────────────────── */

export function RoiCalculator() {
  const [modelIndex, setModelIndex] = useState(3); // Horizon Pro por default
  const [plazo, setPlazo] = useState<12 | 24>(24);
  const [inmDia, setInmDia] = useState(5);
  const [precioInm, setPrecioInm] = useState(200);

  const r = useMemo(() => {
    const precio = MODELS[modelIndex].price;
    const inversionInicial = precio * 0.12;
    const rentaMensual = (precio * 0.9 * (plazo === 24 ? 1.3 : 1.15)) / plazo;
    const ingresoMensual = inmDia * 30 * precioInm;
    const utilidadMensual = ingresoMensual - rentaMensual;
    const breakEvenInmDia = Math.ceil(rentaMensual / (30 * precioInm));
    const breakEvenMes =
      utilidadMensual > 0 ? inversionInicial / utilidadMensual : null;
    const mesesRecuperarEnganche =
      breakEvenMes !== null ? Math.ceil(breakEvenMes) : null;
    const flujoAcumuladoFinal = utilidadMensual * plazo - inversionInicial;
    return {
      inversionInicial,
      rentaMensual,
      ingresoMensual,
      utilidadMensual,
      breakEvenInmDia,
      breakEvenMes,
      mesesRecuperarEnganche,
      flujoAcumuladoFinal,
    };
  }, [modelIndex, plazo, inmDia, precioInm]);

  const rentable = r.utilidadMensual > 0;
  const dentroDelPlazo =
    r.mesesRecuperarEnganche !== null && r.mesesRecuperarEnganche <= plazo;

  const inputClasses =
    "w-full rounded-[10px] border px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--accent-ice)]";
  const inputStyle = {
    borderColor: "var(--line-1)",
    background: "var(--m-white)",
    color: "var(--fg-metal)",
  } as const;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      {/* ── Parámetros ──────────────────────────────────────── */}
      <div
        className="h-fit rounded-[18px] border p-7"
        style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
      >
        <p className="m-eyebrow accent mb-6">Parámetros</p>

        <div className="space-y-6">
          {/* Modelo */}
          <div>
            <label htmlFor="roi-modelo" className="m-eyebrow mb-2 block">
              Modelo
            </label>
            <select
              id="roi-modelo"
              value={modelIndex}
              onChange={(e) => setModelIndex(Number(e.target.value))}
              className={inputClasses}
              style={inputStyle}
            >
              {MODELS.map((m, i) => (
                <option key={m.name} value={i}>
                  {m.name} · {mxn.format(m.price)}
                </option>
              ))}
            </select>
          </div>

          {/* Plazo */}
          <div>
            <p className="m-eyebrow mb-2">Plazo del leasing</p>
            <div
              className="grid grid-cols-2 gap-1 rounded-[10px] border p-1"
              style={{
                borderColor: "var(--line-1)",
                background: "var(--bg-metal)",
              }}
            >
              {([12, 24] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlazo(p)}
                  className={cn(
                    "rounded-[7px] py-2.5 text-sm font-medium transition-colors",
                    plazo === p ? "text-white" : "hover:opacity-70",
                  )}
                  style={
                    plazo === p
                      ? { background: "var(--m-ink)" }
                      : { color: "var(--fg-muted)" }
                  }
                >
                  {p} meses
                </button>
              ))}
            </div>
          </div>

          {/* Inmersiones por día */}
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <label htmlFor="roi-inmersiones" className="m-eyebrow">
                Inmersiones por día
              </label>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--fg-metal)" }}
              >
                {inmDia}/día
              </span>
            </div>
            <input
              id="roi-inmersiones"
              type="range"
              min={1}
              max={40}
              value={inmDia}
              onChange={(e) => setInmDia(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "var(--accent-ice)" }}
            />
            <p className="mt-2 text-xs" style={{ color: "var(--fg-subtle)" }}>
              Contando 30 días al mes. Una sesión dura ~3 minutos.
            </p>
          </div>

          {/* Precio por inmersión */}
          <div>
            <label htmlFor="roi-precio" className="m-eyebrow mb-2 block">
              Precio por inmersión (MXN)
            </label>
            <input
              id="roi-precio"
              type="number"
              min={1}
              value={precioInm}
              onChange={(e) =>
                setPrecioInm(Math.max(1, Number(e.target.value) || 1))
              }
              className={inputClasses}
              style={inputStyle}
            />
            <p className="mt-2 text-xs" style={{ color: "var(--fg-subtle)" }}>
              Cobro por sesión individual de cold plunge.
            </p>
          </div>
        </div>
      </div>

      {/* ── Proyección ──────────────────────────────────────── */}
      <div>
        {/* Titular del resultado */}
        <div
          className="rounded-[18px] border p-7"
          style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
        >
          <p className="m-eyebrow accent">Punto de equilibrio</p>
          {rentable ? (
            <>
              <p
                className="mdisplay mt-3 text-[clamp(30px,4.4vw,52px)]"
                style={{
                  color: "var(--fg-metal)",
                  WebkitTextStroke: "var(--bold-stroke) currentColor",
                }}
              >
                Mes {r.mesesRecuperarEnganche}
              </p>
              <p
                className="mt-3 max-w-[54ch] text-[15px] leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                {dentroDelPlazo
                  ? `A partir de ahí el equipo ya se pagó solo y sigue produciendo durante los ${
                      plazo - (r.mesesRecuperarEnganche ?? 0)
                    } meses restantes del leasing.`
                  : `Con estos parámetros el equilibrio llega después de los ${plazo} meses del leasing. Sube las inmersiones por día o el precio por sesión para adelantarlo.`}
              </p>

              <div className="mt-7">
                <RoiChart
                  plazo={plazo}
                  inversionInicial={r.inversionInicial}
                  rentaMensual={r.rentaMensual}
                  ingresoMensual={r.ingresoMensual}
                  breakEvenMes={r.breakEvenMes}
                />
              </div>
            </>
          ) : (
            <>
              <p
                className="mdisplay mt-3 text-[clamp(24px,3vw,36px)]"
                style={{ color: "var(--fg-metal)" }}
              >
                Aún no se cubre la renta
              </p>
              <p
                className="mt-3 max-w-[54ch] text-[15px] leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                Con {inmDia} inmersiones al día a {mxn.format(precioInm)} el
                ingreso no alcanza la renta mensual. Necesitas al menos{" "}
                <strong style={{ color: "var(--fg-metal)" }}>
                  {r.breakEvenInmDia} inmersiones al día
                </strong>{" "}
                a ese precio para empezar a generar utilidad.
              </p>
            </>
          )}
        </div>

        {/* Desglose */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Inversión inicial"
            value={mxn.format(r.inversionInicial)}
            note="Anticipo 10% + comisión de apertura 2%"
          />
          <StatCard
            label="Renta mensual"
            value={mxn.format(r.rentaMensual)}
            note={`${plazo} meses de leasing`}
          />
          <StatCard
            label="Ingreso mensual"
            value={mxn.format(r.ingresoMensual)}
            note={`${inmDia} inmersiones/día × 30 × ${mxn.format(precioInm)}`}
          />
          <StatCard
            label="Utilidad mensual neta"
            value={mxn.format(r.utilidadMensual)}
            note="Ingreso menos renta"
          />
        </div>

        {/* Cierre */}
        <div
          className="mt-4 rounded-[14px] border p-6"
          style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
        >
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Cubres la renta con{" "}
            <strong style={{ color: "var(--fg-metal)" }}>
              {r.breakEvenInmDia} inmersiones al día
            </strong>
            . Al cerrar los {plazo} meses tu flujo acumulado es{" "}
            <strong style={{ color: "var(--fg-metal)" }}>
              {mxn.format(r.flujoAcumuladoFinal)}
            </strong>{" "}
            después de pagar el leasing y recuperar el enganche.
          </p>
          <a href="#cotizar" className="mbtn mbtn-primary mt-6">
            Quiero esta proyección para mi negocio
          </a>
        </div>

        <p
          className="mt-5 text-xs leading-relaxed"
          style={{ color: "var(--fg-subtle)" }}
        >
          Cifras informativas en pesos mexicanos. La proyección asume que cada
          inmersión se cobra al precio definido y que tu negocio absorbe la
          renta del equipo. No incluye costos operativos, consumo eléctrico ni
          impuestos. La cotización formal se entrega tras evaluación crediticia.
        </p>
      </div>
    </div>
  );
}
