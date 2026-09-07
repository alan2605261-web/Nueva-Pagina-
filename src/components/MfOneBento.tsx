"use client";

import { useEffect, useRef, useState } from "react";

/*
  Bento animado v2 — port fiel del diseño de Rafa en Claude Design
  ("Feature Cards Animated v2", proyecto Animation design system).
  Dark premium con datos en vivo: curva de enfriamiento con punto viajero,
  curva de calentamiento, waveform de sonido, sistema orbital all-in-one,
  teléfono con arc gauge, escaneo estructural del acrílico y radar CE.

  Ajustes de datos vs el design (manual v1.04): calienta hasta 40 °C
  (no 42) y ruido real 68 dB(A).
*/

const COLD = "var(--mf-cold)";
const HEAT = "var(--mf-heat)";
const COLD_GLOW = "var(--mf-cold-glow)";
const HEAT_GLOW = "var(--mf-heat-glow)";

export function MfOneBento() {
  const [now, setNow] = useState(0);
  const t0 = useRef(0);
  const chartRef = useRef<SVGPathElement>(null);
  const heatRef = useRef<SVGPathElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const lens = useRef({ chart: 0, heat: 0, arc: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t0.current = performance.now();
    if (reduced.current) {
      setNow(1); // un solo render en estado final
      return;
    }
    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      setNow(t);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---- valores del frame (misma lógica que el design) ---- */
  const P = 14000;
  const elapsed = reduced.current ? P * 0.62 : Math.max(0, now - t0.current);
  const t = reduced.current ? 0.62 : (elapsed % P) / P;
  const raw = Math.min(t / 0.62, 1);
  const p = 1 - Math.pow(1 - raw, 3);
  let fade = 1;
  if (t > 0.955) fade = Math.max(0, 1 - (t - 0.955) / 0.03);
  else if (t < 0.025) fade = t / 0.025;

  // A — curva de enfriamiento (20° → 0°)
  let dotX = 34, dotY = 15, chartDash = 1, chartOff = 1;
  if (chartRef.current) {
    if (!lens.current.chart) lens.current.chart = chartRef.current.getTotalLength();
    const L = lens.current.chart;
    const pt = chartRef.current.getPointAtLength(L * p);
    dotX = pt.x; dotY = pt.y; chartDash = L; chartOff = L * (1 - p);
  }
  const tempA = Math.round(20 - 20 * p);

  // F — curva de calentamiento (8° → 40°, manual v1.04)
  let hDotX = 34, hDotY = 115, heatDash = 1, heatOff = 1;
  if (heatRef.current) {
    if (!lens.current.heat) lens.current.heat = heatRef.current.getTotalLength();
    const L = lens.current.heat;
    const pt = heatRef.current.getPointAtLength(L * p);
    hDotX = pt.x; hDotY = pt.y; heatDash = L; heatOff = L * (1 - p);
  }
  const tempHeat = Math.round(8 + 32 * p);

  // C — arc del teléfono (temp actual 8° → 3°)
  let arcDash = 227, arcOff = 227;
  if (arcRef.current) {
    if (!lens.current.arc) lens.current.arc = arcRef.current.getTotalLength();
    arcDash = lens.current.arc;
    arcOff = lens.current.arc * (1 - p * fade);
  }
  const phoneTemp = Math.round(8 - 5 * p);

  // D — escaneo estructural (ping-pong)
  const Ps = 9000;
  const ts = (elapsed % Ps) / Ps;
  const tri = ts < 0.5 ? ts * 2 : 2 - ts * 2;
  const sm = tri * tri * (3 - 2 * tri);
  const scanX = 20 + 260 * sm;
  const scanW = Math.max(0, scanX - 21);
  const scanPct = Math.round(100 * sm);

  // G — waveform silencioso + dB reales (68 dB(A) del manual)
  const phase = elapsed / 900;
  const amp = 3.2 + 1.6 * Math.sin(elapsed / 2600);
  let wavePath = "M0,36";
  for (let x = 6; x <= 300; x += 6) {
    const y = 36 + amp * Math.sin(x / 21 - phase) + 1.2 * Math.sin(x / 7.5 + phase * 1.7);
    wavePath += ` L${x},${y.toFixed(1)}`;
  }
  const dB = Math.round(68 + 1.8 * Math.sin(elapsed / 1700));

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <div className="grid gap-3 md:grid-cols-[1fr_1.15fr_1fr] md:grid-rows-[repeat(6,auto)]">
        {/* ── A · Enfría hasta 1°C ── */}
        <div className="bento2-card md:col-start-1 md:row-start-1 md:row-span-2">
          <span className="bento2-label">Cooling</span>
          <div className="flex items-start justify-between gap-3">
            <div className="bento2-title">Enfría hasta 1°C</div>
            <div className="flex items-baseline gap-0.5">
              <span className="tabular-nums" style={{ fontFamily: "var(--font-display)", fontSize: 27, letterSpacing: "-0.03em", lineHeight: 1, color: COLD, textShadow: `0 0 28px ${COLD_GLOW}` }}>{tempA}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: COLD, opacity: 0.8 }}>°</span>
            </div>
          </div>
          <div className="flex flex-1 items-end">
            <svg viewBox="0 0 300 132" className="block w-full overflow-visible">
              <g opacity={fade}>
                <line x1="34" y1="15" x2="300" y2="15" stroke="rgba(255,255,255,0.07)" />
                <line x1="34" y1="65" x2="300" y2="65" stroke="rgba(255,255,255,0.07)" />
                <line x1="34" y1="115" x2="300" y2="115" stroke="rgba(255,255,255,0.07)" />
                <text x="0" y="18" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="rgba(255,255,255,0.30)">20°</text>
                <text x="0" y="68" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="rgba(255,255,255,0.30)">10°</text>
                <text x="6" y="118" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="rgba(255,255,255,0.30)">0°</text>
                <clipPath id="coldClip"><rect x="0" y="0" width={dotX} height="132" /></clipPath>
                <path d="M34,15 C95,18 125,42 172,66 C216,88 252,110 300,113 L300,132 L34,132 Z" fill={COLD} opacity="0.10" clipPath="url(#coldClip)" />
                <path ref={chartRef} d="M34,15 C95,18 125,42 172,66 C216,88 252,110 300,113" fill="none" stroke={COLD} strokeWidth="2" strokeLinecap="round" strokeDasharray={chartDash} strokeDashoffset={chartOff} style={{ filter: `drop-shadow(0 0 6px ${COLD_GLOW})` }} />
                <circle cx={dotX} cy={dotY} r="9" fill="none" stroke={COLD} strokeWidth="1" opacity="0.35" />
                <circle cx={dotX} cy={dotY} r="3.5" fill={COLD} style={{ filter: `drop-shadow(0 0 8px ${COLD_GLOW})` }} />
              </g>
            </svg>
          </div>
          <span className="bento2-foot">Agua · en vivo</span>
        </div>

        {/* ── F · Calienta hasta 40°C ── */}
        <div className="bento2-card md:col-start-1 md:row-start-3 md:row-span-2">
          <span className="bento2-label">Heat</span>
          <div className="flex items-start justify-between gap-3">
            <div className="bento2-title">Calienta hasta 40°C</div>
            <div className="flex items-baseline gap-0.5">
              <span className="tabular-nums" style={{ fontFamily: "var(--font-display)", fontSize: 27, letterSpacing: "-0.03em", lineHeight: 1, color: HEAT, textShadow: `0 0 28px ${HEAT_GLOW}` }}>{tempHeat}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: HEAT, opacity: 0.8 }}>°</span>
            </div>
          </div>
          <div className="flex flex-1 items-end">
            <svg viewBox="0 0 300 132" className="block w-full overflow-visible">
              <g opacity={fade}>
                <line x1="34" y1="15" x2="300" y2="15" stroke="rgba(255,255,255,0.07)" />
                <line x1="34" y1="65" x2="300" y2="65" stroke="rgba(255,255,255,0.07)" />
                <line x1="34" y1="115" x2="300" y2="115" stroke="rgba(255,255,255,0.07)" />
                <text x="0" y="18" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="rgba(255,255,255,0.30)">40°</text>
                <text x="0" y="68" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="rgba(255,255,255,0.30)">24°</text>
                <text x="6" y="118" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="rgba(255,255,255,0.30)">8°</text>
                <clipPath id="heatClip"><rect x="0" y="0" width={hDotX} height="132" /></clipPath>
                <path d="M34,115 C90,112 130,90 172,64 C214,40 252,18 300,15 L300,132 L34,132 Z" fill={HEAT} opacity="0.10" clipPath="url(#heatClip)" />
                <path ref={heatRef} d="M34,115 C90,112 130,90 172,64 C214,40 252,18 300,15" fill="none" stroke={HEAT} strokeWidth="2" strokeLinecap="round" strokeDasharray={heatDash} strokeDashoffset={heatOff} style={{ filter: `drop-shadow(0 0 6px ${HEAT_GLOW})` }} />
                <circle cx={hDotX} cy={hDotY} r="9" fill="none" stroke={HEAT} strokeWidth="1" opacity="0.35" />
                <circle cx={hDotX} cy={hDotY} r="3.5" fill={HEAT} style={{ filter: `drop-shadow(0 0 8px ${HEAT_GLOW})` }} />
              </g>
            </svg>
          </div>
          <span className="bento2-foot">Modo jacuzzi · en vivo</span>
        </div>

        {/* ── G · Ultra silencioso ── */}
        <div className="bento2-card md:col-start-1 md:row-start-5 md:row-span-2">
          <span className="bento2-label">Sound</span>
          <div className="flex items-start justify-between gap-3">
            <div className="bento2-title">Ultra silencioso</div>
            <div className="flex items-baseline gap-1">
              <span className="tabular-nums" style={{ fontFamily: "var(--font-display)", fontSize: 27, letterSpacing: "-0.03em", lineHeight: 1, color: "rgba(255,255,255,0.92)", textShadow: "0 0 24px rgba(255,255,255,0.30)" }}>{dB}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "rgba(255,255,255,0.55)" }}>dB</span>
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <svg viewBox="0 0 300 72" className="block w-full overflow-visible">
              <line x1="0" y1="36" x2="300" y2="36" stroke="rgba(255,255,255,0.07)" />
              <path d={wavePath} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.35))" }} />
            </svg>
          </div>
          <span className="bento2-foot">Motor · en vivo</span>
        </div>

        {/* ── C · Controla desde tu celular (centro, full height) ── */}
        <div className="bento2-card items-center !p-6 md:col-start-2 md:row-start-1 md:row-span-6">
          <span className="bento2-label">Smart Control</span>
          <div className="bento2-title text-center !text-[20px]">Controla desde tu celular</div>
          <p className="m-0 max-w-[40ch] text-center text-[14px] leading-relaxed text-white/50">
            Programa tu cold plunge con tu rutina diaria, para que siempre esté lista desde tu
            celular.
          </p>
          <div className="flex flex-1 items-center justify-center pt-2">
            <div className="w-[168px] rounded-[32px] border border-white/10 bg-[#1A1A1E] p-2 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)]">
              <div className="flex justify-center pb-2.5 pt-2">
                <div className="h-[5px] w-[72px] rounded-full bg-white/15" />
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-[30px] bg-black px-3.5 py-4">
                <div className="text-[15px] font-semibold text-white">Temperatura</div>
                <div className="text-[9px] uppercase tracking-[0.1em] text-white/35">
                  Selecciona tu temperatura deseada
                </div>
                <svg viewBox="0 0 184 100" className="mt-1.5 block w-full overflow-visible">
                  <path d="M20,92 A72,72 0 0 1 164,92" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="5" strokeLinecap="round" />
                  <path ref={arcRef} d="M20,92 A72,72 0 0 1 164,92" fill="none" stroke={COLD} strokeWidth="5" strokeLinecap="round" strokeDasharray={arcDash} strokeDashoffset={arcOff} style={{ filter: `drop-shadow(0 0 8px ${COLD_GLOW})` }} />
                </svg>
                <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/35">Enfriar a:</div>
                <div className="flex items-start gap-0.5 leading-none text-white">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 34, letterSpacing: "-0.03em" }}>3</span>
                  <span className="mt-1.5" style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>°C</span>
                </div>
                <div className="tabular-nums text-[10px] text-white/50">Temperatura actual {phoneTemp}°</div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[9px] text-white/35">1°</span>
                  <div className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-[16px] text-white">−</div>
                  <div className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-[16px] text-white">+</div>
                  <span className="text-[9px] text-white/35">10°</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="mf-pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: COLD, boxShadow: `0 0 10px ${COLD_GLOW}` }} />
                  <span className="text-[8px] uppercase tracking-[0.16em] text-white/55">Enfriando</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── D · Acrílico + acero inoxidable — corte de materiales ── */}
        <div className="bento2-card md:col-start-3 md:row-start-1 md:row-span-2">
          <span className="bento2-label">Build</span>
          <div className="bento2-title">Acrílico + acero inoxidable</div>
          <div className="flex flex-1 items-end">
            <svg viewBox="0 0 300 120" className="block w-full overflow-visible">
              {/* capa 1: acrílico (panel translúcido) */}
              <rect x="20" y="16" width="260" height="36" rx="9" fill="rgba(76,144,198,0.07)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25" />
              <text x="30" y="38" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.85)">ACRÍLICO</text>
              <text x="270" y="38" textAnchor="end" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" letterSpacing="1" fill="rgba(255,255,255,0.40)">CUERPO</text>
              {/* capa 2: acero inoxidable (cepillado) */}
              <rect x="20" y="60" width="260" height="36" rx="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25" />
              <line x1="24" y1="68" x2="276" y2="68" stroke="rgba(255,255,255,0.10)" />
              <line x1="24" y1="74" x2="276" y2="74" stroke="rgba(255,255,255,0.08)" />
              <line x1="24" y1="88" x2="276" y2="88" stroke="rgba(255,255,255,0.08)" />
              <text x="30" y="82" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.85)">ACERO INOXIDABLE</text>
              <text x="270" y="82" textAnchor="end" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" letterSpacing="1" fill="rgba(255,255,255,0.40)">COMPONENTES</text>
              {/* sheen recorriendo ambas capas */}
              <clipPath id="matClip">
                <rect x="21" y="17" width="258" height="34" rx="8" />
                <rect x="21" y="61" width="258" height="34" rx="8" />
              </clipPath>
              <line x1={scanX} y1="10" x2={scanX} y2="102" stroke={COLD} strokeWidth="1.5" strokeLinecap="round" clipPath="url(#matClip)" style={{ filter: `drop-shadow(0 0 7px ${COLD_GLOW})` }} />
              {/* base */}
              <line x1="20" y1="110" x2="280" y2="110" stroke="rgba(255,255,255,0.14)" />
              <text x="150" y="118" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" letterSpacing="2" fill="rgba(255,255,255,0.45)">USO CONTINUO · GRADO COMERCIAL</text>
            </svg>
          </div>
        </div>

        {/* ── E · Ozono integrado — radar ── */}
        <div className="bento2-card md:col-start-3 md:row-start-3 md:row-span-2">
          <span className="bento2-label">Water</span>
          <div className="bento2-title">Ozono integrado</div>
          <div className="flex flex-1 flex-col items-center justify-center gap-3.5">
            <svg viewBox="0 0 150 150" className="block h-24 w-24 overflow-visible">
              <circle cx="75" cy="75" r="54" fill="none" stroke="rgba(255,255,255,0.12)" />
              <circle cx="75" cy="75" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 5" />
              <g className="mf-spin" style={{ "--mf-dur": "14s" } as React.CSSProperties}>
                <circle cx="75" cy="21" r="2.5" fill={COLD} style={{ filter: `drop-shadow(0 0 8px ${COLD_GLOW})` }} />
              </g>
              <text x="75" y="88" textAnchor="middle" fontSize="36" letterSpacing="2" fill="rgba(255,255,255,0.92)" style={{ fontFamily: "var(--font-display)" }}>O₃</text>
            </svg>
            <div className="relative flex h-3.5 w-full justify-center">
              <span className="mf-status-a absolute text-[9px] uppercase tracking-[0.18em] text-white/40">Circulando agua</span>
              <span className="mf-status-b absolute text-[9px] uppercase tracking-[0.18em] text-white/75">Ozono activo · Sin químicos</span>
            </div>
          </div>
        </div>

        {/* ── B · Sistema All in One — orbital ── */}
        <div className="bento2-card md:col-start-3 md:row-start-5 md:row-span-2">
          <span className="bento2-label">All-in-One</span>
          <div className="bento2-title">Sistema All in One</div>
          <p className="m-0 text-[13px] leading-relaxed text-white/50">
            Todos los componentes integrados en una sola unidad, diseñado para uso continuo.
          </p>
          <div className="flex flex-1 items-center justify-center">
            <svg viewBox="0 0 300 200" className="block w-full max-w-[320px] overflow-visible">
              <circle cx="150" cy="100" r="72" fill="none" stroke="rgba(255,255,255,0.16)" strokeDasharray="3 6" className="mf-spin" style={{ "--mf-dur": "60s" } as React.CSSProperties} />
              <rect x="120" y="70" width="60" height="60" rx="14" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.25" />
              <text x="150" y="104" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" letterSpacing="2" fill="#ffffff">MF ONE</text>
              <g className="mf-seq" style={{ animationDelay: "0s" }}>
                <text x="18" y="32" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.85)">CHILLER</text>
                <line x1="52" y1="40" x2="102" y2="72" stroke="rgba(255,255,255,0.35)" />
              </g>
              <g className="mf-seq" style={{ animationDelay: "4s" }}>
                <text x="282" y="32" textAnchor="end" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.85)">FILTRO 20μ</text>
                <line x1="248" y1="40" x2="198" y2="72" stroke="rgba(255,255,255,0.35)" />
              </g>
              <g className="mf-seq" style={{ animationDelay: "8s" }}>
                <text x="282" y="176" textAnchor="end" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.85)">OZONO</text>
                <line x1="248" y1="162" x2="198" y2="128" stroke="rgba(255,255,255,0.35)" />
              </g>
              <g className="mf-seq" style={{ animationDelay: "12s" }}>
                <text x="18" y="176" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.85)">WIFI</text>
                <line x1="52" y1="162" x2="102" y2="128" stroke="rgba(255,255,255,0.35)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
