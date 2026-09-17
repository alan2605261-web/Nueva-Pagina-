import type { ReactNode } from "react";

/*
  Avisos legales para las páginas que citan investigación o a personas ajenas
  a la marca: /aprender, /aprender/consejo-cientifico y los artículos del blog.

  Pedido por Saul (sep 2026): Mente Fria referencia estudios y opiniones de
  terceros, pero no los produce, no los valida y no responde por ellos.

  Diseño: nota al pie, no recuadro. La primera versión (tarjeta con viñetas y
  una línea de resumen arriba de las cifras) se leía invasiva. Ahora va al
  final de la página, en letra chica, con las notas de las cifras primero.

  Redacción de trabajo, pasada por el skill no-ai-slop. Conviene que la revise
  un abogado antes de publicar.
*/

const PARRAFOS_GENERALES = [
  "Mente Fria no realizó, patrocinó ni validó estas investigaciones y no garantiza que sean exactas, completas o vigentes. Las cita con fines informativos y no asume responsabilidad por su contenido ni por las decisiones que se tomen con base en él. Los enlaces llevan a sitios de terceros que Mente Fria no controla.",
  "Esta información no es consejo médico ni sustituye la valoración de un profesional de la salud. Mente Fria no promete ningún resultado de salud por el uso de sus productos.",
];

const PARRAFOS_PERSONAS = [
  "Las personas de esta página no forman parte de Mente Fria. Incluirlas no implica que tengan relación con la marca ni que respalden o recomienden sus productos. Las opiniones y hallazgos atribuidos a cada una son suyos, provienen de fuentes públicas y no representan la postura de Mente Fria.",
];

export function AvisoInformativo({
  personas = false,
  base,
  notas,
}: {
  /** Suma el deslinde sobre personas citadas por nombre. */
  personas?: boolean;
  /** Primer párrafo del aviso: de dónde sale la información de arriba. */
  base?: string;
  /** Notas al pie de cifras marcadas con asterisco. Van antes del aviso. */
  notas?: ReactNode;
}) {
  const parrafos = [...(base ? [base] : []), ...(personas ? PARRAFOS_PERSONAS : []), ...PARRAFOS_GENERALES];
  return (
    <aside
      aria-label="Notas y aviso legal"
      className="mx-auto max-w-3xl border-t pt-6 text-[12px] leading-relaxed"
      style={{ borderColor: "var(--line-1)", color: "var(--fg-subtle)" }}
    >
      {notas && <div className="mb-5">{notas}</div>}
      <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em]">Aviso legal</p>
      <div className="space-y-2">
        {parrafos.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </aside>
  );
}
