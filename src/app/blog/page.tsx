import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { BLOG_POSTS, porSerie, type BlogPost } from "@/lib/blog-posts";

/* ─────────────────────────────────────────────────────────────
   BLOG

   Antes esta página ERA la serie de las ocho razones: el título decía "Ocho
   razones, ocho artículos" y toda la estructura daba por hecho que nunca
   habría nada más. Publicar sobre mantenimiento, protocolos o clientes
   obligaba a rehacerla.

   Ahora el encabezado es del blog, no de una serie, y el cuerpo se arma con
   `porSerie()`: una sección por cada serie que exista en los datos. El primer
   artículo de una serie nueva crea su sección solo.

   El destacado sigue siendo el primer artículo de la primera serie.
───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Blog | Mente Fria",
  description:
    "Lo que sabemos del frío y de los equipos: la ciencia detrás de la inmersión, con las fuentes a la vista, y lo que aprendemos operando plunges en México.",
};

function Tarjeta({ p, i }: { p: BlogPost; i: number }) {
  return (
    <Reveal delay={(i % 3) * 70} className="h-full">
      <Link
        href={`/blog/${p.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[18px] border transition-colors hover:border-[var(--line-2)]"
        style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
      >
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{ background: "var(--m-graphite)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.img}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-[rgba(8,9,11,0.72)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {p.num}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3
            className="mdisplay text-[21px] leading-tight"
            style={{
              color: "var(--fg-metal)",
              WebkitTextStroke: "var(--bold-stroke) currentColor",
            }}
          >
            {p.titulo}
          </h3>
          <p
            className="mt-3 flex-1 text-[14px] leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {p.dek}
          </p>
          {/* El "Leer · 5 min" iba en azul hielo sobre blanco y se perdía.
              Ahora es tinta sólida separada por una línea. */}
          <span
            className="mt-6 inline-flex items-center gap-2 border-t pt-4 text-[13px] font-semibold"
            style={{ borderColor: "var(--line-1)", color: "var(--fg-metal)" }}
          >
            Leer · {p.lectura}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function BlogPage() {
  const series = porSerie();
  const destacado = BLOG_POSTS[0];

  return (
    <PageShell>
      {/* ── Encabezado ─────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="max-w-3xl">
            <span className="m-eyebrow accent">Blog</span>
            <h1
              className="mdisplay mt-4 text-[clamp(34px,5vw,68px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              Lo que sabemos del frío.
            </h1>
            <p
              className="mt-6 max-w-[58ch] text-[17px] leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              Qué le hace la inmersión a tu cuerpo, qué dice la investigación y
              dónde la evidencia todavía no alcanza. Con las fuentes a la vista
              y sin cifras que no podamos sostener.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Destacado ──────────────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <Link
              href={`/blog/${destacado.slug}`}
              className="group grid overflow-hidden rounded-[20px] border lg:grid-cols-2"
              style={{
                borderColor: "var(--line-1)",
                background: "var(--m-white)",
              }}
            >
              <div
                className="relative min-h-[280px] overflow-hidden lg:min-h-[440px]"
                style={{ background: "var(--m-graphite)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={destacado.img}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="m-eyebrow accent">Empieza aquí</span>
                <h2
                  className="mdisplay mt-4 text-[clamp(26px,3.2vw,44px)]"
                  style={{
                    color: "var(--fg-metal)",
                    WebkitTextStroke: "var(--bold-stroke) currentColor",
                  }}
                >
                  {destacado.titulo}
                </h2>
                <p
                  className="mt-4 max-w-[48ch] text-[15.5px] leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {destacado.dek}
                </p>
                <span
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "var(--fg-metal)" }}
                >
                  Leer · {destacado.lectura}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Una sección por serie ──────────────────────────── */}
      {series.map(({ serie, articulos }, s) => (
        <section
          key={serie}
          className={s % 2 === 0 ? "msection panel" : "msection"}
        >
          <div className="mwrap">
            <Reveal className="msection-head !mx-0 !max-w-none !text-left">
              <span className="m-eyebrow accent">Serie</span>
              <h2>{serie}</h2>
              <p className="!mx-0 !max-w-[58ch]">
                {articulos.length}{" "}
                {articulos.length === 1 ? "artículo" : "artículos"} publicados.
              </p>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articulos.map((p, i) => (
                <Tarjeta key={p.slug} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="msection dark-s">
        <div className="mwrap text-center">
          <Reveal className="mx-auto max-w-2xl">
            <span className="m-eyebrow accent">Del texto al agua</span>
            <h2
              className="mdisplay mt-4 text-[clamp(28px,3.8vw,52px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              Leer sobre el frío está bien. Meterse es otra cosa.
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/productos" className="mbtn mbtn-solid-light">
                Ver los plunges
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
