import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { BLOG_POSTS, getPost } from "@/lib/blog-posts";

/* Export estático: hay que declarar las rutas de antemano. */
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artículo | Mente Fria" };
  return {
    title: `${post.titulo} | Mente Fria`,
    description: post.dek,
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const i = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const siguiente = BLOG_POSTS[(i + 1) % BLOG_POSTS.length];

  return (
    <PageShell>
      {/* ── Portada ────────────────────────────────────────── */}
      <section className="relative flex min-h-[58vh] items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.img}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,9,11,0.55) 0%, rgba(8,9,11,0.35) 40%, rgba(8,9,11,0.92) 100%)",
          }}
        />
        <div className="mwrap relative z-10 pb-14 pt-28 text-white">
          <Reveal>
            <span className="m-eyebrow" style={{ color: "var(--m-blue-400)" }}>
              La ciencia del frío · {post.num} de 08
            </span>
            <h1
              className="mdisplay mt-4 max-w-[18ch] text-[clamp(34px,5vw,72px)] text-white"
              style={{
                WebkitTextStroke: "var(--bold-stroke) currentColor",
                textShadow: "0 2px 24px rgba(0,0,0,0.35)",
              }}
            >
              {post.titulo}
            </h1>
            <p
              className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-white/90"
              style={{ textShadow: "0 1px 14px rgba(0,0,0,0.5)" }}
            >
              {post.dek}
            </p>
            <p className="m-eyebrow mt-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Lectura de {post.lectura}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Cuerpo ─────────────────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <article className="mx-auto max-w-[68ch]">
            {post.secciones.map((s, n) => (
              <Reveal key={s.h} delay={n * 60} className="mb-12">
                <h2
                  className="mdisplay text-[clamp(22px,2.6vw,32px)]"
                  style={{
                    color: "var(--fg-metal)",
                    WebkitTextStroke: "var(--bold-stroke) currentColor",
                  }}
                >
                  {s.h}
                </h2>
                {s.p.map((par) => (
                  <p
                    key={par.slice(0, 40)}
                    className="mt-5 text-[16.5px] leading-[1.75]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {par}
                  </p>
                ))}
              </Reveal>
            ))}

            {post.protocolo && (
              <Reveal
                className="mb-12 rounded-[18px] border p-8"
                style={{
                  borderColor: "var(--line-1)",
                  background: "var(--bg-metal)",
                }}
              >
                <span className="m-eyebrow accent">Cómo aplicarlo</span>
                <dl className="mt-5 space-y-4">
                  {post.protocolo.map((x) => (
                    <div key={x.t}>
                      <dt
                        className="text-[15px] font-semibold"
                        style={{ color: "var(--fg-metal)" }}
                      >
                        {x.t}
                      </dt>
                      <dd
                        className="mt-1 text-[15px] leading-relaxed"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {x.d}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            <Reveal className="mb-12">
              <span className="m-eyebrow">Fuentes</span>
              <ul className="mt-4 space-y-2.5">
                {post.fuentes.map((f) => (
                  <li
                    key={f}
                    className="text-[13.5px] leading-relaxed"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <p
                className="mt-6 border-t pt-5 text-[13px] leading-relaxed"
                style={{ borderColor: "var(--line-1)", color: "var(--fg-subtle)" }}
              >
                Este contenido es informativo y no sustituye la indicación de un
                profesional de la salud. Si tienes una condición cardiovascular,
                hipertensión no controlada, síndrome de Raynaud, epilepsia o
                estás embarazada, consulta a tu médico antes de empezar con la
                inmersión en frío.
              </p>
            </Reveal>
          </article>
        </div>
      </section>

      {/* ── Siguiente + CTA ────────────────────────────────── */}
      <section className="msection dark-s">
        <div className="mwrap">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="m-eyebrow accent">Siguiente razón</span>
              <h2
                className="mdisplay mt-4 text-[clamp(26px,3.2vw,42px)]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                {siguiente.titulo}
              </h2>
              <p
                className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed"
                style={{ color: "var(--on-dark-muted)" }}
              >
                {siguiente.dek}
              </p>
              <Link href={`/blog/${siguiente.slug}`} className="mbtn mbtn-solid-light mt-7">
                Leer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={80} className="lg:border-l lg:pl-10" style={{ borderColor: "var(--on-dark-line)" }}>
              <span className="m-eyebrow accent">Las ocho razones</span>
              <ul className="mt-5 space-y-1">
                {BLOG_POSTS.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="flex items-baseline gap-4 border-b py-3 transition-colors hover:text-white"
                      style={{
                        borderColor: "var(--on-dark-line)",
                        color:
                          p.slug === post.slug
                            ? "#fff"
                            : "var(--on-dark-muted)",
                      }}
                    >
                      <span className="text-[12px]" style={{ color: "var(--m-blue-400)" }}>
                        {p.num}
                      </span>
                      <span className="text-[15px]">{p.titulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
