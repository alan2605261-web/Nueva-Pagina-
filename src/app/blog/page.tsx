import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { BLOG_POSTS } from "@/lib/blog-posts";

/* ─────────────────────────────────────────────────────────────
   BLOG

   Índice de la serie "La ciencia del frío": los ocho artículos que
   desarrollan las ocho razones del landing. Cada card del carrusel de inicio
   lleva a su artículo, y esta página los reúne.

   Ya no hay artículos de relleno ni placeholders: todo lo que se lista existe
   y se puede leer.
───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "La ciencia del frío | Mente Fria",
  description:
    "Ocho artículos sobre lo que la inmersión en frío le hace a tu cuerpo: recuperación, ánimo, energía, inflamación, resiliencia, sueño, metabolismo y sistema inmune.",
};

export default function BlogPage() {
  const [destacado, ...resto] = BLOG_POSTS;

  return (
    <PageShell>
      {/* ── Encabezado ─────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="max-w-3xl">
            <span className="m-eyebrow accent">La ciencia del frío</span>
            <h1
              className="mdisplay mt-4 text-[clamp(34px,5vw,68px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              Ocho razones, ocho artículos.
            </h1>
            <p
              className="mt-6 max-w-[58ch] text-[17px] leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              Cada inmersión activa una cascada fisiológica. Aquí desarrollamos
              qué pasa exactamente, qué dice la investigación y también dónde la
              evidencia todavía no alcanza. Con las fuentes a la vista.
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
                <span className="m-eyebrow accent">
                  {destacado.num} · Empieza aquí
                </span>
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
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium"
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

      {/* ── Los otros siete ────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head !mx-0 !text-left">
            <span className="m-eyebrow accent">La serie completa</span>
            <h2>Lo que el frío le hace a tu cuerpo.</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[18px] border"
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
                      className="mt-3 flex-1 text-[14px] leading-relaxed"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {p.dek}
                    </p>
                    <span
                      className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium"
                      style={{ color: "var(--accent-ice)" }}
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

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="msection dark-s">
        <div className="mwrap text-center">
          <Reveal className="mx-auto max-w-2xl">
            <span className="m-eyebrow accent">Mind over body</span>
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
