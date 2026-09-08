/*
  Diagrama de medidas de la MF ONE — planta y alzado.

  Sustituye al render con cotas de fábrica, donde las líneas estaban torcidas y
  mezclaban 195, 163, 160 y 110 cm sin que cuadraran entre sí.

  SOLO se acotan los números que trae la ficha oficial (ago 2026):
    · Largo × ancho × alto: 195 × 80 × 71 cm
    · Frente libre: 100 cm · Laterales libres: 20 cm por lado
  El reparto interno entre área de inmersión y módulo NO está documentado, así
  que se rotula pero no se acota. No inventar esa medida.
*/

const ESC = 2.7; // px por cm
const L = 195 * ESC; // largo
const W = 80 * ESC; // ancho
const H = 71 * ESC; // alto

const AZUL = "var(--m-blue-400)";
const LINEA = "rgba(255,255,255,0.22)";
const CUERPO = "rgba(255,255,255,0.05)";

/* Cota horizontal con topes y etiqueta centrada */
function CotaH({
  x1,
  x2,
  y,
  label,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
}) {
  return (
    <g stroke={AZUL} strokeWidth={1}>
      <line x1={x1} y1={y} x2={x2} y2={y} strokeDasharray="4 3" />
      <line x1={x1} y1={y - 5} x2={x1} y2={y + 5} />
      <line x1={x2} y1={y - 5} x2={x2} y2={y + 5} />
      <text
        x={(x1 + x2) / 2}
        y={y - 9}
        textAnchor="middle"
        fontSize={12}
        fill={AZUL}
        stroke="none"
        fontWeight={600}
      >
        {label}
      </text>
    </g>
  );
}

/* Cota vertical */
function CotaV({
  y1,
  y2,
  x,
  label,
}: {
  y1: number;
  y2: number;
  x: number;
  label: string;
}) {
  return (
    <g stroke={AZUL} strokeWidth={1}>
      <line x1={x} y1={y1} x2={x} y2={y2} strokeDasharray="4 3" />
      <line x1={x - 5} y1={y1} x2={x + 5} y2={y1} />
      <line x1={x - 5} y1={y2} x2={x + 5} y2={y2} />
      <text
        x={x + 10}
        y={(y1 + y2) / 2 + 4}
        fontSize={12}
        fill={AZUL}
        stroke="none"
        fontWeight={600}
      >
        {label}
      </text>
    </g>
  );
}

export function MfOneDimensions() {
  const PAD = 54;
  const vbW = L + PAD * 2 + 60;
  const plantaY = 44;
  const alzadoY = plantaY + W + 96;
  const vbH = alzadoY + H + 62;

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        className="h-auto w-full"
        role="img"
        aria-label="Diagrama de medidas de la MF ONE: 195 cm de largo, 80 cm de ancho y 71 cm de alto, con 100 cm libres al frente y 20 cm libres por lado."
      >
        {/* ─── PLANTA ─── */}
        <text
          x={PAD}
          y={plantaY - 20}
          fontSize={10}
          letterSpacing="0.2em"
          fill="rgba(255,255,255,0.45)"
        >
          PLANTA
        </text>

        {/* cuerpo visto desde arriba */}
        <rect
          x={PAD}
          y={plantaY}
          width={L}
          height={W}
          rx={10}
          fill={CUERPO}
          stroke={LINEA}
          strokeWidth={1.4}
        />
        {/* separación área de inmersión / módulo (rotulada, sin acotar) */}
        <line
          x1={PAD + L * 0.72}
          y1={plantaY}
          x2={PAD + L * 0.72}
          y2={plantaY + W}
          stroke={LINEA}
          strokeDasharray="3 4"
        />
        <text
          x={PAD + L * 0.36}
          y={plantaY + W / 2 + 4}
          textAnchor="middle"
          fontSize={11.5}
          fill="rgba(255,255,255,0.72)"
        >
          Área de inmersión
        </text>
        <text
          x={PAD + L * 0.86}
          y={plantaY + W / 2 + 4}
          textAnchor="middle"
          fontSize={11.5}
          fill="rgba(255,255,255,0.72)"
        >
          Módulo
        </text>

        <CotaH x1={PAD} x2={PAD + L} y={plantaY - 6} label="195 cm" />
        <CotaV
          y1={plantaY}
          y2={plantaY + W}
          x={PAD + L + 22}
          label="80 cm"
        />

        {/* ─── ALZADO ─── */}
        <text
          x={PAD}
          y={alzadoY - 20}
          fontSize={10}
          letterSpacing="0.2em"
          fill="rgba(255,255,255,0.45)"
        >
          ALZADO
        </text>

        {/* perfil: la tina se abre hacia arriba, el módulo va en la cara corta */}
        <path
          d={`M ${PAD + 26} ${alzadoY + H}
              L ${PAD + L - 26} ${alzadoY + H}
              L ${PAD + L} ${alzadoY}
              L ${PAD} ${alzadoY} Z`}
          fill={CUERPO}
          stroke={LINEA}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        {/* nivel de agua */}
        <line
          x1={PAD + 14}
          y1={alzadoY + H * 0.3}
          x2={PAD + L - 14}
          y2={alzadoY + H * 0.3}
          stroke={AZUL}
          strokeWidth={1.2}
          opacity={0.75}
        />
        <text
          x={PAD + 20}
          y={alzadoY + H * 0.3 - 7}
          fontSize={11}
          fill="rgba(255,255,255,0.6)"
        >
          Nivel de agua
        </text>
        {/* rejilla lateral, en la cara corta */}
        <rect
          x={PAD + L - 62}
          y={alzadoY + H * 0.45}
          width={30}
          height={H * 0.4}
          rx={4}
          fill="none"
          stroke={LINEA}
        />
        <text
          x={PAD + L - 47}
          y={alzadoY + H + 20}
          textAnchor="middle"
          fontSize={10.5}
          fill="rgba(255,255,255,0.55)"
        >
          Rejilla
        </text>

        <CotaV y1={alzadoY} y2={alzadoY + H} x={PAD + L + 22} label="71 cm" />

        {/* ─── espacios libres ─── */}
        <text
          x={PAD}
          y={vbH - 14}
          fontSize={11.5}
          fill="rgba(255,255,255,0.55)"
        >
          Frente libre 100 cm · Laterales libres 20 cm por lado
        </text>
      </svg>
    </figure>
  );
}
