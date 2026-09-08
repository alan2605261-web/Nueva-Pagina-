import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { COLECCIONES, getColeccion, postsDeColeccion } from "@/lib/blog-posts";

export function generateStaticParams() {
  return COLECCIONES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getColeccion(slug);
  if (!c) return { title: "Colección | Mente Fria" };
  return { title: `${c.nombre} | Mente Fria`, description: c.dek };
}

export default async function ColeccionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const coleccion = getColeccion(slug);
  if (!coleccion) notFound();
  const articulos = postsDeColeccion(slug);
  if (articulos.length === 0) notFound();

  /* La colección se declara como serie, para que los buscadores entiendan
     que los artículos son piezas de una misma obra y no páginas sueltas. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: coleccion.nombre,
    description: coleccion.dek,
    inLanguage: "es-MX",
    hasPart: articulos.map((p) => ({
      "@type": "Article",
      headline: p.titulo,
      description: p.descripcion,
      datePublished: p.publicado,
      url: `https://mentefria.com/blog/${p.slug}`,
    })),
  };

  const [primero, ...resto] = articulos;

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="max-w-3xl">
            <Link href="/blog" className="m-eyebrow accent hover:underline">
              Blog · Colección
            </Link>
            <h1
              className="mdisplay mt-4 text-[clamp(32px,4.8vw,62px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              {coleccion.nombre}
            </h1>
            <p
              lang="es"
              className="mt-6 max-w-[60ch] hyphens-auto text-justify text-[17px] leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {coleccion.dek}
            </p>
            <p
              className="mt-6 text-[12px] uppercase tracking-[0.16em]"
              style={{ color: "var(--fg-subtle)" }}
            >
              {articulos.length} artículos
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Primero, destacado ─────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <Link
              href={`/blog/${primero.slug}`}
              className="group grid overflow-hidden rounded-[20px] border lg:grid-cols-2"
              style={{
                borderColor: "var(--line-1)",
                background: "var(--m-white)",
              }}
            >
              <div
                className="relative min-h-[280px] overflow-hidden lg:min-h-[420px]"
                style={{ background: "var(--m-graphite)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={primero.img}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="m-eyebrow accent">
                  {primero.num} · Empieza aquí
                </span>
                <h2
                  className="mdisplay mt-4 text-[clamp(26px,3.2vw,42px)]"
                  style={{
                    color: "var(--fg-metal)",
                    WebkitTextStroke: "var(--bold-stroke) currentColor",
                  }}
                >
                  {primero.titulo}
                </h2>
                <p
                  lang="es"
                  className="mt-4 max-w-[48ch] hyphens-auto text-justify text-[15.5px] leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {primero.dek}
                </p>
                <span
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "var(--fg-metal)" }}
                >
                  Leer · {primero.lectura}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── El resto ───────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70} className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[18px] border transition-colors hover:border-[var(--line-2)]"
                  style={{
                    borderColor: "var(--line-1)",
                    background: "var(--m-white)",
                  }}
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
                      lang="es"
                      className="mt-3 flex-1 hyphens-auto text-justify text-[14px] leading-relaxed"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {p.dek}
                    </p>
                    <span
                      className="mt-6 inline-flex items-center gap-2 border-t pt-4 text-[13px] font-semibold"
                      style={{
                        borderColor: "var(--line-1)",
                        color: "var(--fg-metal)",
                      }}
                    >
                      Leer · {p.lectura}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
