import type { CSSProperties } from "react";

/*
  Gráficos animados de /soporte.

  Segunda versión. La primera era azul y decorativa: barras que no medían
  nada, un círculo de garantía tan chico que cortaba su propia etiqueta y un
  pie que prometía "2 cajas" para toda la línea cuando eso solo aplica a los
  inflables.

  Reglas de esta versión:
  · Blanco y negro. Es la identidad de la marca; el azul se reservaba para
    acentos de interfaz y aquí competía con el producto.
  · Cada gráfico dibuja EL DATO de su tarjeta, no un adorno. Los meses sin
    intereses son seis tramos, la garantía son dos barras sobre una escala de
    meses reales, el servicio técnico es el embudo de escalamiento que
    describe el texto.
  · Nada de cifras que no apliquen a toda la línea.

  Todo es SVG inline con keyframes de metal.css: sin dependencias, sin
  imágenes que cargar.
*/

const LINEA = "rgba(255,255,255,0.20)";
const LINEA_F = "rgba(255,255,255,0.42)";
const TRAZO = "rgba(255,255,255,0.88)";
const TEXTO = "rgba(255,255,255,0.52)";
const TEXTO_F = "rgba(255,255,255,0.80)";
const RELLENO = "rgba(255,255,255,0.07)";

const wrap = "block h-full w-full";
const vb = "0 0 300 200";

const pie = (y: number) => ({
  x: 150, y, textAnchor: "middle" as const, fontSize: 8.5,
  letterSpacing: "0.18em", fill: TEXTO,
});

/* ── 01 · Pagos ───────────────────────────────────────────────────────────
   El precio se parte en seis tramos iguales que se encienden en orden:
   los seis meses sin intereses, que es el dato de la tarjeta. */
function Pagos() {
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="El pago se divide hasta en seis mensualidades sin intereses">
      <text x={52} y={56} fontSize={9} letterSpacing="0.16em" fill={TEXTO}>TOTAL</text>
      <rect x={52} y={64} width={196} height={16} rx={8} fill={RELLENO} stroke={LINEA} />

      <path d="M 150 92 v 16 m 0 0 -5 -5 m 5 5 5 -5" fill="none" stroke={LINEA_F} strokeWidth={1.4} strokeLinecap="round" />

      <text x={52} y={128} fontSize={9} letterSpacing="0.16em" fill={TEXTO}>6 MENSUALIDADES</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect
            x={52 + i * 33.5} y={136} width={28} height={16} rx={5}
            fill={RELLENO} stroke={LINEA}
          />
          <rect
            x={52 + i * 33.5} y={136} width={28} height={16} rx={5}
            fill="rgba(255,255,255,0.82)"
            className="sop-step"
            style={{ animationDelay: `${i * 0.42}s` } as CSSProperties}
          />
        </g>
      ))}
      <text {...pie(180)}>SIN INTERESES</text>
    </svg>
  );
}

/* ── 02 · Envíos ──────────────────────────────────────────────────────────
   La ventana de entrega sobre una regla de días hábiles. El pie ya no dice
   cuántas cajas: la MF ONE viaja como una sola unidad y los inflables no. */
function Envios() {
  const x0 = 40, x1 = 260, dias = 10;
  const px = (d: number) => x0 + (x1 - x0) * (d / dias);
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Entrega en un rango de tres a siete días hábiles">
      {/* regla */}
      <line x1={x0} y1={116} x2={x1} y2={116} stroke={LINEA} strokeWidth={1.2} />
      {Array.from({ length: dias + 1 }, (_, d) => (
        <line key={d} x1={px(d)} y1={116} x2={px(d)} y2={d % 5 === 0 ? 124 : 121} stroke={LINEA} />
      ))}
      <text x={px(0)} y={139} textAnchor="middle" fontSize={8} fill={TEXTO}>0</text>
      <text x={px(5)} y={139} textAnchor="middle" fontSize={8} fill={TEXTO}>5</text>
      <text x={px(10)} y={139} textAnchor="middle" fontSize={8} fill={TEXTO}>10</text>

      {/* ventana 3–7 */}
      <rect x={px(3)} y={96} width={px(7) - px(3)} height={20} rx={4} fill="rgba(255,255,255,0.14)" stroke={TRAZO} strokeWidth={1.3} />
      <text x={(px(3) + px(7)) / 2} y={110} textAnchor="middle" fontSize={11} fill="#fff" style={{ fontFamily: "var(--font-display)" }}>
        3 – 7
      </text>

      {/* el paquete recorre la ventana, apoyado sobre ella */}
      <g className="sop-travel" style={{ "--sop-dx": `${px(7) - px(3)}px` } as CSSProperties}>
        <rect x={px(3) - 9} y={72} width={18} height={16} rx={2.5} fill={RELLENO} stroke={TRAZO} strokeWidth={1.3} />
        <line x1={px(3) - 9} y1={78} x2={px(3) + 9} y2={78} stroke={TRAZO} strokeWidth={1} opacity={0.6} />
      </g>

      <text {...pie(170)}>DÍAS HÁBILES</text>
      <text {...pie(186)}>ENTREGA EN TODO MÉXICO</text>
    </svg>
  );
}

/* ── 03 · Garantía ────────────────────────────────────────────────────────
   Dos barras sobre una escala de doce meses. Sustituye al anillo, donde la
   etiqueta "MESES · MF ONE" no cabía dentro del círculo y se cortaba. */
function Garantia() {
  const x0 = 88, x1 = 262;
  const mes = (m: number) => x0 + (x1 - x0) * (m / 12);
  const filas = [
    { et: "MF ONE", m: 12, fuerte: true },
    { et: "INFLABLES", m: 6, fuerte: false },
  ];
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Doce meses de garantía en la MF ONE y seis meses en los modelos inflables">
      {/* escala */}
      {[0, 3, 6, 9, 12].map((m) => (
        <g key={m}>
          <line x1={mes(m)} y1={52} x2={mes(m)} y2={140} stroke={LINEA} strokeDasharray="2 5" />
          <text x={mes(m)} y={158} textAnchor="middle" fontSize={8} fill={TEXTO}>{m}</text>
        </g>
      ))}

      {filas.map((f, i) => {
        const y = 68 + i * 44;
        return (
          <g key={f.et}>
            <text x={80} y={y + 15} textAnchor="end" fontSize={9} letterSpacing="0.1em" fill={TEXTO_F}>
              {f.et}
            </text>
            <rect x={mes(0)} y={y} width={mes(12) - mes(0)} height={22} rx={11} fill={RELLENO} stroke={LINEA} />
            <rect
              x={mes(0)} y={y} width={mes(f.m) - mes(0)} height={22} rx={11}
              fill={f.fuerte ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.62)"}
              className="sop-grow"
              style={{ transformBox: "fill-box", animationDelay: `${i * 0.35}s` } as CSSProperties}
            />
            <text
              x={mes(f.m) - 12} y={y + 15} textAnchor="end" fontSize={11.5}
              fill="#14161a" style={{ fontFamily: "var(--font-display)" }}
            >
              {f.m}
            </text>
          </g>
        );
      })}

      <text {...pie(182)}>MESES · GARANTÍAS INDEPENDIENTES</text>
    </svg>
  );
}

/* ── 04 · Mantenimiento ───────────────────────────────────────────────────
   Las semanas de un ciclo de agua: cinco casillas que se van llenando y se
   vacían al llegar al cambio. */
function Mantenimiento() {
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="El agua se cambia cada tres a cinco semanas y el filtro en cada cambio">
      <text x={44} y={62} fontSize={9} letterSpacing="0.16em" fill={TEXTO}>SEMANA</text>
      {[1, 2, 3, 4, 5].map((s, i) => (
        <g key={s}>
          <rect x={44 + i * 44} y={72} width={36} height={36} rx={7} fill={RELLENO} stroke={i >= 2 ? LINEA_F : LINEA} />
          <rect
            x={44 + i * 44} y={72} width={36} height={36} rx={7}
            fill="rgba(255,255,255,0.80)"
            className="sop-step"
            style={{ animationDelay: `${i * 0.6}s` } as CSSProperties}
          />
          <text x={62 + i * 44} y={126} textAnchor="middle" fontSize={8.5} fill={TEXTO}>{s}</text>
        </g>
      ))}

      {/* la ventana de cambio: de la 3 a la 5 */}
      <path
        d={`M ${44 + 2 * 44} 138 h ${36 + 2 * 44} `}
        stroke={TRAZO} strokeWidth={1.4} strokeLinecap="round"
      />
      <path d={`M ${44 + 2 * 44} 134 v 8 M ${44 + 2 * 44 + 36 + 2 * 44} 134 v 8`} stroke={TRAZO} strokeWidth={1.4} strokeLinecap="round" />

      <text {...pie(164)}>CAMBIO DE AGUA</text>
      <text {...pie(182)}>FILTRO NUEVO EN CADA CAMBIO</text>
    </svg>
  );
}

/* ── 05 · Servicio técnico ────────────────────────────────────────────────
   El embudo de escalamiento que describe la tarjeta: casi todo se resuelve
   en la videollamada, poco necesita visita, muy poco termina en reemplazo.
   Las barras de la versión anterior no medían nada. */
function Servicio() {
  const pasos = [
    { n: "01", t: "DIAGNÓSTICO REMOTO", w: 200 },
    { n: "02", t: "VISITA EN SITIO", w: 128 },
    { n: "03", t: "REEMPLAZO", w: 66 },
  ];
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Primero diagnóstico remoto, después visita en sitio y sólo al final reemplazo">
      {pasos.map((p, i) => {
        const y = 50 + i * 44;
        /* La barra mide el peso del paso, así que la 03 es angosta a
           propósito. La etiqueta solo cabe dentro de la más ancha; en las
           otras dos va al costado, si no se desborda. */
        const dentro = p.w >= 150;
        return (
          <g key={p.n}>
            <text x={40} y={y + 21} fontSize={9} fill={TEXTO} style={{ fontFamily: "var(--font-display)" }}>
              {p.n}
            </text>
            <rect
              x={62} y={y} width={p.w} height={30} rx={6}
              fill={i === 0 ? "rgba(255,255,255,0.86)" : RELLENO}
              stroke={i === 0 ? "none" : LINEA_F}
              className="sop-grow"
              style={{ transformBox: "fill-box", animationDelay: `${i * 0.28}s` } as CSSProperties}
            />
            <text
              x={dentro ? 74 : 62 + p.w + 12}
              y={y + 19}
              fontSize={8.5}
              letterSpacing="0.12em"
              fill={dentro ? "#14161a" : TEXTO_F}
            >
              {p.t}
            </text>
          </g>
        );
      })}
      <text {...pie(190)}>SE ESCALA SOLO SI HACE FALTA</text>
    </svg>
  );
}

/* ── 06 · Contacto ────────────────────────────────────────────────────────
   Escribes a cualquier hora; la respuesta llega. Sin promesas de 24/7, que
   es justo lo que no podemos sostener. */
function Contacto() {
  const burbujas = [
    { x: 52, y: 46, w: 116, h: 30, propia: false },
    { x: 130, y: 88, w: 118, h: 30, propia: true },
    { x: 52, y: 130, w: 96, h: 30, propia: false },
  ];
  return (
    <svg viewBox={vb} className={wrap} role="img" aria-label="Atención por WhatsApp con seguimiento">
      {burbujas.map((b, i) => (
        <g key={i} className="sop-rise" style={{ animationDelay: `${i * 0.9}s` } as CSSProperties}>
          <rect
            x={b.x} y={b.y} width={b.w} height={b.h} rx={13}
            fill={b.propia ? "rgba(255,255,255,0.86)" : RELLENO}
            stroke={b.propia ? "none" : LINEA_F}
            strokeWidth={1.2}
          />
          <rect x={b.x + 14} y={b.y + 11} width={b.w - 42} height={4} rx={2}
                fill={b.propia ? "rgba(20,22,26,0.55)" : "rgba(255,255,255,0.42)"} />
          <rect x={b.x + 14} y={b.y + 19} width={b.w - 62} height={4} rx={2}
                fill={b.propia ? "rgba(20,22,26,0.28)" : "rgba(255,255,255,0.22)"} />
        </g>
      ))}
      <text {...pie(186)}>WHATSAPP · TE DAMOS SEGUIMIENTO</text>
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
