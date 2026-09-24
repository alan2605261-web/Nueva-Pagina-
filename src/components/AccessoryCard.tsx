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
  /** Render con fondo propio: llena la caja en lugar de flotar con margen. */
  render?: boolean;
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
      /* En celular la tarjeta se acuesta: foto a la izquierda y texto al
         lado. De pie, con la foto a todo lo ancho, cada tarjeta medía unos
         470px y siete seguidas hacían la página larguísima (Saul, sep 2026).
         Acostada baja a unos 130px. De 640px para arriba queda como estaba. */
      <article
        className={cn(
          "flex flex-row overflow-hidden rounded-[16px] border sm:flex-col",
          className,
        )}
        style={{
          borderColor: "var(--line-1)",
          background: "var(--m-white)",
        }}
      >
        <div
          className="relative aspect-square w-[122px] flex-none overflow-hidden sm:aspect-[16/10] sm:w-full"
          style={{ background: "var(--bg-panel)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src={a.img}
            alt={a.t}
            className={cn(
              "absolute inset-0 h-full w-full",
              a.render ? "object-cover" : "object-contain p-3 sm:p-7",
            )}
          />
          {a.tag && (
            <span
              className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[10px]"
              style={{ background: "var(--m-ink)", color: "#fff" }}
            >
              {a.tag}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center p-4 sm:justify-start sm:p-6">
          <h3
            className="mdisplay text-[16px] leading-tight sm:text-[18px]"
            style={{ color: "var(--fg-metal)" }}
          >
            {a.t}
          </h3>
          <p
            className="mt-1.5 text-[12.5px] leading-snug sm:mt-2 sm:text-[13.5px] sm:leading-relaxed"
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
        /* En celular la tarjeta oscura tambien se aprieta: 280px de alto
           minimo por seis tarjetas eran dos mil pixeles de pagina. El diseno
           es el mismo, solo con menos aire (Saul, sep 2026). */
        "relative flex min-h-[188px] flex-col overflow-hidden rounded-[16px] p-5 sm:min-h-[280px] sm:p-7",
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
            className="mdisplay text-[30px] leading-none sm:text-[40px]"
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
          className="mdisplay mt-auto pt-6 text-[clamp(18px,2.2vw,26px)] leading-tight text-white sm:pt-10"
          style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
        >
          {a.t}
        </h3>
        <p
          className="mt-2 text-[12.5px] leading-snug sm:mt-3 sm:text-[14px] sm:leading-relaxed"
          style={{ color: "var(--on-dark-muted)" }}
        >
          {a.p}
        </p>
      </div>
    </article>
  );
}
