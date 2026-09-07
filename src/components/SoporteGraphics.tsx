import type { CSSProperties } from "react";

/*
  Gráficos animados de /soporte.

  Reemplazan al componente Placeholder, que dejaba seis rectángulos grises con
  una etiqueta encima y hacía ver la página barata.

  Mismo lenguaje que el bento del MF ONE: fondo tinta, acento azul hielo, una
  animación en vivo por tarjeta y cero dependencias externas. Todo es SVG
  inline con clases de metal.css, así que no pesa nada y no hay imágenes que
  cargar.
*/

const AZUL = "var(--m-blue-400)";
const AZUL_FUERTE = "var(--accent-ice)";
const TENUE = "rgba(255,255,255,0.16)";
const TEXTO = "rgba(255,255,255,0.5)";

const wrap = "block h-full w-full";
const vb = "0 0 300 200";

/* ── 01 · Pagos ─────────────────────────────────────────────────────────
   Tres tarjetas apiladas que se encienden en secuencia, con el candado. */
function Pagos() {
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Métodos de pago seguros">
      {[0, 1, 2].map((i) => (
        <g key={i} className="mf-seq" style={{ animationDelay: `${i * 1.6}s` } as CSSProperties}>
          <rect
            x={72 + i * 14}
            y={54 + i * 20}
            width={150}
            height={62}
            rx={9}
            fill="rgba(255,255,255,0.05)"
            stroke={i === 1 ? AZUL : TENUE}
            strokeWidth={1.3}
          />
          <rect x={84 + i * 14} y={70 + i * 20} width={26} height={18} rx={3} fill={AZUL} opacity={0.8} />
          <rect x={84 + i * 14} y={96 + i * 20} width={70} height={5} rx={2.5} fill="rgba(255,255,255,0.35)" />
        </g>
      ))}
      <g transform="translate(150 168)">
        <circle r={15} fill="none" stroke={TENUE} />
        <circle r={15} fill="none" stroke={AZUL_FUERTE} opacity={0.5} className="mf-pulse-dot" />
        <path
          d="M -5 1 h 10 v 8 h -10 z M -3 1 v -4 a 3 3 0 0 1 6 0 v 4"
          fill="none"
          stroke={AZUL}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </g>
      <text x={150} y={196} textAnchor="middle" fontSize={9} letterSpacing="0.18em" fill={TEXTO}>
        PAGO SEGURO
      </text>
    </svg>
  );
}

/* ── 02 · Envíos ────────────────────────────────────────────────────────
   La caja recorre la ruta del origen al destino. */
function Envios() {
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Envíos a todo México">
      <line x1={54} y1={104} x2={246} y2={104} stroke={TENUE} strokeWidth={1.5} strokeDasharray="5 5" />
      <circle cx={54} cy={104} r={6} fill="none" stroke={AZUL} strokeWidth={1.5} />
      <circle cx={54} cy={104} r={2.5} fill={AZUL} />
      <path d="M 238 104 v -13 l 8 -7 l 8 7 v 13 z" fill="none" stroke={AZUL} strokeWidth={1.5} strokeLinejoin="round" />

      {/* dos cajas: motor y tina */}
      <g className="sop-travel" style={{ "--sop-dx": "170px" } as CSSProperties}>
        <rect x={62} y={82} width={20} height={16} rx={2.5} fill="rgba(255,255,255,0.08)" stroke={AZUL_FUERTE} strokeWidth={1.3} />
        <line x1={62} y1={88} x2={82} y2={88} stroke={AZUL_FUERTE} strokeWidth={1} opacity={0.7} />
        <rect x={62} y={102} width={20} height={16} rx={2.5} fill="rgba(255,255,255,0.08)" stroke={AZUL_FUERTE} strokeWidth={1.3} />
        <line x1={62} y1={108} x2={82} y2={108} stroke={AZUL_FUERTE} strokeWidth={1} opacity={0.7} />
      </g>

      <text x={54} y={140} textAnchor="middle" fontSize={9} letterSpacing="0.14em" fill={TEXTO}>
        CDMX
      </text>
      <text x={246} y={140} textAnchor="middle" fontSize={9} letterSpacing="0.14em" fill={TEXTO}>
        TU CASA
      </text>
      <text x={150} y={176} textAnchor="middle" fontSize={9} letterSpacing="0.18em" fill={TEXTO}>
        2 CAJAS · 3 A 7 DÍAS
      </text>
    </svg>
  );
}

/* ── 03 · Garantía ──────────────────────────────────────────────────────
   Dos arcos: el largo del MF ONE y el corto de los inflables. */
function Garantia() {
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Cobertura de garantía por producto">
      <g transform="translate(150 96)">
        <circle r={58} fill="none" stroke={TENUE} strokeWidth={7} />
        <circle
          r={58}
          fill="none"
          stroke={AZUL_FUERTE}
          strokeWidth={7}
          strokeLinecap="round"
          transform="rotate(-90)"
          strokeDasharray={364}
          className="sop-fill"
          style={{ "--sop-len": "364", "--sop-off": "0" } as CSSProperties}
        />
        <circle r={40} fill="none" stroke={TENUE} strokeWidth={5} />
        <circle
          r={40}
          fill="none"
          stroke={AZUL}
          strokeWidth={5}
          strokeLinecap="round"
          transform="rotate(-90)"
          strokeDasharray={251}
          className="sop-fill"
          style={{ "--sop-len": "251", "--sop-off": "126" } as CSSProperties}
        />
        <text y={-4} textAnchor="middle" fontSize={26} fill="#fff" style={{ fontFamily: "var(--font-display)" }}>
          12
        </text>
        <text y={14} textAnchor="middle" fontSize={9} letterSpacing="0.16em" fill={TEXTO}>
          MESES · MF ONE
        </text>
      </g>
      <text x={150} y={188} textAnchor="middle" fontSize={9} letterSpacing="0.16em" fill={TEXTO}>
        6 MESES · INFLABLES
      </text>
    </svg>
  );
}

/* ── 04 · Mantenimiento ─────────────────────────────────────────────────
   Ciclo girando y la gota cayendo. */
function Mantenimiento() {
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Calendario de mantenimiento">
      <g transform="translate(150 92)">
        <g className="mf-spin" style={{ "--mf-dur": "22s" } as CSSProperties}>
          <circle r={52} fill="none" stroke={TENUE} strokeWidth={1.4} strokeDasharray="2 9" />
          <circle r={52} fill="none" stroke={AZUL_FUERTE} strokeWidth={2} strokeLinecap="round" strokeDasharray="46 281" />
          <circle cx={0} cy={-52} r={3.5} fill={AZUL_FUERTE} />
        </g>
        <g className="sop-drop">
          <path d="M 0 -18 C 7 -8, 9 -2, 0 2 C -9 -2, -7 -8, 0 -18 Z" fill={AZUL} opacity={0.9} />
        </g>
        <ellipse cy={26} rx={22} ry={4} fill="none" stroke={TENUE} />
      </g>
      <text x={150} y={176} textAnchor="middle" fontSize={9} letterSpacing="0.18em" fill={TEXTO}>
        AGUA CADA 3 A 5 SEMANAS
      </text>
      <text x={150} y={192} textAnchor="middle" fontSize={9} letterSpacing="0.18em" fill={TEXTO}>
        FILTRO EN CADA CAMBIO
      </text>
    </svg>
  );
}

/* ── 05 · Servicio técnico ──────────────────────────────────────────────
   Diagnóstico remoto: la señal viva. */
function Servicio() {
  const alturas = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.8, 0.55];
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Diagnóstico remoto y servicio técnico">
      <g transform="translate(0 4)">
        {alturas.map((h, i) => (
          <rect
            key={i}
            x={86 + i * 15}
            y={56}
            width={7}
            height={62}
            rx={3.5}
            fill={i === 4 ? AZUL_FUERTE : AZUL}
            opacity={i === 4 ? 1 : 0.55}
            className="sop-bar"
            style={{ "--sop-h": String(h), animationDelay: `${i * 0.11}s`, transformBox: "fill-box" } as CSSProperties}
          />
        ))}
      </g>
      <line x1={70} y1={132} x2={230} y2={132} stroke={TENUE} />
      <g transform="translate(150 158)">
        <circle r={6} fill={AZUL_FUERTE} className="mf-pulse-dot" />
        <circle r={13} fill="none" stroke={AZUL_FUERTE} opacity={0.4} className="mf-pulse-dot" />
      </g>
      <text x={150} y={192} textAnchor="middle" fontSize={9} letterSpacing="0.18em" fill={TEXTO}>
        DIAGNÓSTICO REMOTO · 24/7
      </text>
    </svg>
  );
}

/* ── 06 · Contacto ──────────────────────────────────────────────────────
   Los mensajes que van llegando. */
function Contacto() {
  const burbujas = [
    { x: 58, y: 44, w: 118, h: 30, propia: false },
    { x: 128, y: 84, w: 114, h: 30, propia: true },
    { x: 58, y: 124, w: 96, h: 30, propia: false },
  ];
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Atención por WhatsApp las 24 horas">
      {burbujas.map((b, i) => (
        <g key={i} className="sop-rise" style={{ animationDelay: `${i * 0.9}s` } as CSSProperties}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={13}
            fill={b.propia ? "rgba(91,155,213,0.22)" : "rgba(255,255,255,0.06)"}
            stroke={b.propia ? AZUL : TENUE}
            strokeWidth={1.2}
          />
          <rect x={b.x + 14} y={b.y + 11} width={b.w - 42} height={4} rx={2} fill="rgba(255,255,255,0.4)" />
          <rect x={b.x + 14} y={b.y + 19} width={b.w - 62} height={4} rx={2} fill="rgba(255,255,255,0.22)" />
        </g>
      ))}
      <text x={150} y={186} textAnchor="middle" fontSize={9} letterSpacing="0.18em" fill={TEXTO}>
        WHATSAPP · RESPUESTA 24/7
      </text>
    </svg>
  );
}

const GRAFICOS: Record<string, () => React.JSX.Element> = {
  Pagos,
  Envíos: Envios,
  Garantía: Garantia,
  Mantenimiento,
  "Servicio técnico": Servicio,
  Contacto,
};

export function SoporteGrafico({ titulo }: { titulo: string }) {
  const G = GRAFICOS[titulo];
  if (!G) return null;
  return (
    <div className="sop-media absolute inset-0 grid place-items-center p-5">
      <G />
    </div>
  );
}

export function tieneGrafico(titulo: string) {
  return titulo in GRAFICOS;
}
