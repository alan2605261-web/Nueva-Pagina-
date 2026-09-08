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
      {/* ── Cabecera editorial ─────────────────────────────
          Antes era una portada a sangre de 58vh con el texto encima: el
          título perdía contraste contra la foto, la sangría superior se
          comía media pantalla y "Lectura de 5 min" quedaba flotando casi
          pegada al borde inferior.

          Ahora: bloque de texto sobre panel, con una barra de datos
          delimitada por filetes —serie, número, tiempo de lectura— y la
          foto debajo como figura ancha. Se lee como un artículo. */}
      <section className="msection panel !pb-0">
        <div className="mwrap">
          <Reveal className="mx-auto max-w-[68ch]">
            <Link
              href="/blog"
              className="m-eyebrow accent inline-flex items-center gap-2 hover:underline"
            >
              {post.serie}
            </Link>
            <h1
              className="mdisplay mt-5 text-[clamp(32px,4.6vw,60px)]"
              style={{
                color: "var(--fg-metal)",
                WebkitTextStroke: "var(--bold-stroke) currentColor",
              }}
            >
              {post.titulo}
            </h1>
            <p
              className="mt-5 text-[17.5px] leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {post.dek}
            </p>

            <dl
              className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-3 border-y py-4 text-[12px] uppercase tracking-[0.16em]"
              style={{ borderColor: "var(--line-2)", color: "var(--fg-subtle)" }}
            >
              <div className="flex items-baseline gap-2.5">
                <dt>Artículo</dt>
                <dd style={{ color: "var(--fg-metal)" }}>
                  {post.num} de {String(BLOG_POSTS.filter((x) => x.serie === post.serie).length).padStart(2, "0")}
                </dd>
              </div>
              <div className="flex items-baseline gap-2.5">
                <dt>Lectura</dt>
                <dd style={{ color: "var(--fg-metal)" }}>{post.lectura}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Figura ─────────────────────────────────────────── */}
      <section className="msection panel !pt-10">
        <div className="mwrap">
          <Reveal>
            <figure
              className="relative m-0 aspect-[16/9] overflow-hidden rounded-[20px]"
              style={{ background: "var(--m-graphite)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.img}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover"
              />
            </figure>
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
              <span className="m-eyebrow accent">Siguiente artículo</span>
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
              <span className="m-eyebrow accent">{post.serie}</span>
              <ul className="mt-5 space-y-1">
                {BLOG_POSTS.filter((p) => p.serie === post.serie).map((p) => (
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
