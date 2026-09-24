import { PageShell } from "@/components/PageShell";
import { SubHero, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { Calificacion } from "@/components/Calificacion";
import { Estrellas } from "@/components/Estrellas";
import { RESENAS } from "@/lib/resenas";

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export const metadata = {
  title: "Reseñas de clientes",
  description:
    "Lo que dicen quienes ya usan una cold plunge Mente Fria en México, sobre la MF ONE, la MF Horizon y el MF Barrel.",
};

export default function ResenasPage() {
  return (
    <PageShell>
      {/* 1. SubHero -------------------------------------------------------- */}
      <SubHero
        eyebrow="Reseñas"
        title="Lo que dice nuestra comunidad."
        subtitle="Lo que nos han escrito quienes ya tienen su equipo en casa."
        tone="warm"
      />

      {/* 2. Las reseñas ---------------------------------------------------- */}

      {/* Mismo patrón que el resto del sitio: encabezado centrado (antefirma,
          título, bajada) y tarjetas BLANCAS sobre la sección gris. Antes eran
          tarjetas grises sobre fondo blanco, con una comilla decorativa y el
          nombre separado por un filete: nada de eso aparece en otra página. */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Calificación</span>
            <div className="mt-6">
              <Calificacion />
            </div>
            <p>Todas son de clientes con su equipo ya instalado.</p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RESENAS.map((r, i) => (
              <Reveal key={r.nombre + r.texto} delay={(i % 3) * 70}>
                <article className="flex h-full flex-col rounded-[16px] border border-[var(--line-1)] bg-white p-6">
                  <Estrellas valor={r.estrellas} tam={14} />

                  {r.texto ? (
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed">{r.texto}</p>
                  ) : (
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--fg-subtle)]">
                      Calificó con cinco estrellas y no dejó comentario.
                    </p>
                  )}

                  <p className="mt-6 text-[12px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                    {r.nombre}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center text-[12.5px] text-[var(--fg-subtle)]">
            Publicadas con nombre de pila e inicial del apellido, para proteger
            la identidad de quienes las escribieron.
          </p>
        </div>
      </section>

      {/* 3. CTA ------------------------------------------------------------ */}
      <CTASection
        title="Únete a la comunidad Mente Fria."
        cta={{ label: "Ver productos", href: "/productos" }}
        dark
      />
    </PageShell>
  );
}
