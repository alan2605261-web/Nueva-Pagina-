import { cn } from "@/lib/utils";

/*
  Tarjeta de accesorio con dos estados, misma API.

  CON foto  → foto arriba, texto abajo. La tarjeta clásica.
  SIN foto  → no se dibuja una caja gris vacía con "imagen próximamente".
              La tarjeta se vuelve oscura y el contenido pasa a ser el diseño:
              índice grande en azul, título en display y descripción con aire.

  El día que llegue la foto basta con pasar `img` y la tarjeta se transforma
  sola. No hay que tocar el layout ni la página.

  Idea de Saul (sep 2026), para dejar de mostrar placeholders en /accesorios y
  en los tres PDPs.
*/

export type Accesorio = {
  t: string;
  p: string;
  img?: string | null;
  /** Etiqueta opcional: precio, "Incluido", "Próximamente"… */
  tag?: string | null;
};

export function AccessoryCard({
  a,
  index,
  className,
}: {
  a: Accesorio;
  index: number;
  className?: string;
}) {
  const num = String(index + 1).padStart(2, "0");

  /* ── Con foto ─────────────────────────────────────────────── */
  if (a.img) {
    return (
      <article
        className={cn(
          "flex flex-col overflow-hidden rounded-[16px] border",
          className,
        )}
        style={{
          borderColor: "var(--line-1)",
          background: "var(--m-white)",
        }}
      >
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
          style={{ background: "var(--bg-panel)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src={a.img}
            alt={a.t}
            className="absolute inset-0 h-full w-full object-contain p-7"
          />
          {a.tag && (
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{ background: "var(--m-ink)", color: "#fff" }}
            >
              {a.tag}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3
            className="mdisplay text-[18px] leading-tight"
            style={{ color: "var(--fg-metal)" }}
          >
            {a.t}
          </h3>
          <p
            className="mt-2 text-[13.5px] leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {a.p}
          </p>
        </div>
      </article>
    );
  }

  /* ── Sin foto: el contenido es el diseño ──────────────────── */
  return (
    <article
      className={cn(
        "relative flex min-h-[280px] flex-col overflow-hidden rounded-[16px] p-7",
        className,
      )}
      style={{ background: "var(--grad-ink)" }}
    >
      {/* Resplandor neutro. Era azul y en un muro de tarjetas se leía como
          un fondo de color, no como profundidad — la misma corrección que se
          hizo en los gráficos de /soporte. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 88% 6%, rgba(255,255,255,0.10), transparent 58%)",
        }}
      />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            className="mdisplay text-[40px] leading-none"
            style={{ color: "rgba(255,255,255,0.34)" }}
          >
            {num}
          </span>
          {a.tag && (
            <span
              className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{
                borderColor: "var(--on-dark-line)",
                color: "var(--on-dark-subtle)",
              }}
            >
              {a.tag}
            </span>
          )}
        </div>

        <h3
          className="mdisplay mt-auto pt-10 text-[clamp(20px,2.2vw,26px)] leading-tight text-white"
          style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
        >
          {a.t}
        </h3>
        <p
          className="mt-3 text-[14px] leading-relaxed"
          style={{ color: "var(--on-dark-muted)" }}
        >
          {a.p}
        </p>
      </div>
    </article>
  );
}
