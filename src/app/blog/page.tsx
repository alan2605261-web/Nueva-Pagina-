import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { coleccionesConArticulos } from "@/lib/blog-posts";

/* ─────────────────────────────────────────────────────────────
   BLOG — índice de colecciones

   La versión anterior desempaquetaba todo: ocho tarjetas sueltas en una
   reja, sin señal de que pertenecieran a nada. Saul lo pidió al revés, y
   tiene razón: lo que se publica no son ocho artículos, es una colección.

   Esta página muestra colecciones. Cada una abre su propio índice en
   /blog/coleccion/[slug]. Dar de alta una colección nueva es agregarla a
   COLECCIONES y publicar su primer artículo; aquí aparece sola.
───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Blog | Mente Fria",
  description:
    "Lo que sabemos del frío: el mecanismo, lo que la investigación sostiene y dónde deja de sostenerlo. Con las fuentes a la vista.",
};

export default function BlogPage() {
  const colecciones = coleccionesConArticulos();

  return (
    <PageShell>
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
              Qué le hace la inmersión a tu cuerpo, qué muestra la
              investigación y dónde la evidencia todavía no alcanza. Con las
              fuentes a la vista y sin cifras que no podamos sostener.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head !mx-0 !max-w-none !text-left">
            <span className="m-eyebrow accent">Colecciones</span>
            <h2>Empieza por una.</h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {colecciones.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 80} className="h-full">
                <Link
                  href={`/blog/coleccion/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border transition-colors hover:border-[var(--line-2)]"
                  style={{
                    borderColor: "var(--line-1)",
                    background: "var(--m-white)",
                  }}
                >
                  <div
                    className="relative aspect-[16/9] overflow-hidden"
                    style={{ background: "var(--m-graphite)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.img}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-[rgba(8,9,11,0.72)] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                      Colección
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h3
                      className="mdisplay text-[clamp(22px,2.6vw,30px)] leading-tight"
                      style={{
                        color: "var(--fg-metal)",
                        WebkitTextStroke: "var(--bold-stroke) currentColor",
                      }}
                    >
                      {c.nombre}
                    </h3>
                    <p
                      lang="es"
                      className="mt-4 flex-1 hyphens-auto text-justify text-[15px] leading-relaxed"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {c.dek}
                    </p>
                    <span
                      className="mt-7 inline-flex items-center gap-2 border-t pt-5 text-[13.5px] font-semibold"
                      style={{
                        borderColor: "var(--line-1)",
                        color: "var(--fg-metal)",
                      }}
                    >
                      {c.articulos.length}{" "}
                      {c.articulos.length === 1 ? "artículo" : "artículos"}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
