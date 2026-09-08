import type { ReactNode } from "react";

/*
  Tipografía compartida de los documentos legales.

  Antes cada página legal repetía las mismas clases largas en cada párrafo y
  cada lista, así que cambiar un interlineado obligaba a tocar tres archivos y
  las tres terminaban distintas. Aquí viven una sola vez.

  Se numeran las cláusulas: en un documento legal hace falta poder decir
  "cláusula 7" al referirse a algo.
*/

export function Doc({ children }: { children: ReactNode }) {
  return <article className="mx-auto max-w-[70ch]">{children}</article>;
}

export function Vigencia({ fecha }: { fecha: string }) {
  return (
    <p
      className="mb-10 border-b pb-6 text-[13px] uppercase tracking-[0.14em]"
      style={{ borderColor: "var(--line-1)", color: "var(--fg-subtle)" }}
    >
      Última actualización: {fecha}
    </p>
  );
}

export function Clausula({
  n,
  titulo,
  children,
}: {
  n: number;
  titulo: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-11">
      <h2
        className="mdisplay flex gap-4 text-[clamp(19px,2.1vw,25px)] leading-tight"
        style={{ color: "var(--fg-metal)" }}
      >
        <span
          className="shrink-0 tabular-nums"
          style={{ color: "var(--fg-subtle)" }}
        >
          {String(n).padStart(2, "0")}
        </span>
        <span>{titulo}</span>
      </h2>
      <div className="mt-4 space-y-4 pl-0 sm:pl-10">{children}</div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-[15.5px] leading-[1.75]"
      style={{ color: "var(--fg-muted)" }}
    >
      {children}
    </p>
  );
}

export function Lista({
  items,
  ordenada = false,
}: {
  items: ReactNode[];
  ordenada?: boolean;
}) {
  const clases =
    "space-y-2.5 pl-5 text-[15.5px] leading-[1.75] marker:text-[var(--fg-subtle)]";
  const contenido = items.map((x, i) => <li key={i}>{x}</li>);
  return ordenada ? (
    <ol className={`list-decimal ${clases}`} style={{ color: "var(--fg-muted)" }}>
      {contenido}
    </ol>
  ) : (
    <ul className={`list-disc ${clases}`} style={{ color: "var(--fg-muted)" }}>
      {contenido}
    </ul>
  );
}

export function Fuerte({ children }: { children: ReactNode }) {
  return <strong style={{ color: "var(--fg-metal)" }}>{children}</strong>;
}

/* Enlace a correo, repetido en las dos páginas. */
export function Correo({ a }: { a: string }) {
  return (
    <a href={`mailto:${a}`} className="underline underline-offset-2">
      {a}
    </a>
  );
}
