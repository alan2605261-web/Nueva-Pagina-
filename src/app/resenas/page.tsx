import { PageShell } from "@/components/PageShell";
import { SubHero, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { StarIcon, QuoteMark } from "@/components/icons";

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const REVIEWS = [
  {
    title: "Control total sobre la ansiedad.",
    body: "Las cold plunges de Mente Fria me han ayudado a manejar mejor mi ansiedad. Los beneficios del frío y la respiración controlada me han dado una herramienta poderosa para mantener la calma en situaciones estresantes.",
    name: "Daniel G.",
    city: "CDMX",
  },
  {
    title: "Calidad insuperable.",
    body: "La calidad del producto de Mente Fria es insuperable. Los materiales son muy resistentes y duraderos.",
    name: "Carlos G.",
    city: "Guadalajara",
  },
  {
    title: "Sistema inmunológico fortalecido.",
    body: "Tenía frecuentes resfriados y desde que uso las cold plunges de Mente Fria, mi sistema inmunológico se ha fortalecido. No he tenido un solo resfriado en meses.",
    name: "Fernando L.",
    city: "Monterrey",
  },
  {
    title: "Recuperación deportiva acelerada.",
    body: "Después de una lesión deportiva, las cold plunges de Mente Fria aceleraron mi recuperación. La inflamación bajó rápidamente y pude volver a entrenar mucho antes de lo esperado.",
    name: "Eduardo V.",
    city: "CDMX",
  },
  {
    title: "Menos dolor post-entrenamiento.",
    body: "Siempre he tenido problemas con la inflamación, especialmente después de hacer ejercicio. Mente Fria ha reducido significativamente el dolor post-entrenamiento.",
    name: "Rodrigo P.",
    city: "Guadalajara",
  },
  {
    title: "Alivio para dolores articulares.",
    body: "Sufría de dolores articulares crónicos y las cold plunges de Mente Fria han sido un alivio increíble. Mi movilidad ha mejorado.",
    name: "Miguel T.",
    city: "CDMX",
  },
  {
    title: "Por fin duermo como nunca.",
    body: "Llevaba años sufriendo de insomnio. Desde que empecé a usar Mente Fria, duermo profundamente y me despierto renovado.",
    name: "Ricardo M.",
    city: "Puerto Vallarta",
  },
  {
    title: "Confiable para uso diario.",
    body: "Estoy muy contento con la calidad del producto de Mente Fria. Es confiable y resistente, ideal para uso diario.",
    name: "Jorge R.",
    city: "Cancún",
  },
  {
    title: "Atención al cliente excepcional.",
    body: "Estoy muy impresionado con el servicio al cliente de Mente Fria. Respondieron todas mis preguntas rápidamente y con mucha amabilidad.",
    name: "Pedro H.",
    city: "CDMX",
  },
];

const VIDEO_TESTIMONIALS = [
  { name: "Ana Martínez", city: "CDMX", tone: "cool" as const },
  { name: "Carlos Herrera", city: "Monterrey", tone: "ink" as const },
  { name: "Lucía Peña", city: "Guadalajara", tone: "warm" as const },
  { name: "Iván Molina", city: "CDMX", tone: "cool" as const },
];

const TRUST_BADGES = [
  "30 días de prueba",
  "Garantía hasta 1 año",
  "Envío a todo México",
  "Soporte de por vida",
  "Marca registrada IMPI",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function ResenasPage() {
  return (
    <PageShell>
      {/* 1. SubHero -------------------------------------------------------- */}
      <SubHero
        eyebrow="Reseñas"
        title="Lo que dice nuestra comunidad."
        subtitle="Miles de personas están alcanzando su máximo potencial con Mente Fria."
        tone="warm"
      />

      {/* Star row below hero — rendered in its own slim strip */}
      <div className="bg-[var(--bg-panel)] pb-12 -mt-6">
        <div className="mwrap flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className="h-6 w-6 text-foreground"
              aria-hidden="true"
            />
          ))}
          <span className="ml-3 text-sm font-medium text-[var(--fg-muted)]">4.8 / 5</span>
        </div>
      </div>

      {/* 2. Muro de amor --------------------------------------------------- */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="mb-12">
            <p className="m-eyebrow accent mb-3">Muro de amor</p>
            <h2 className="mdisplay text-[clamp(26px,3.4vw,44px)] max-w-2xl">Voces reales de la comunidad.</h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 80}>
                <article className="flex h-full flex-col rounded-2xl border border-[var(--line-1)] bg-[var(--bg-panel)] p-6">
                  {/* Stars */}
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <StarIcon
                        key={s}
                        className="h-4 w-4 text-foreground"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Quote mark */}
                  <QuoteMark className="mb-3 h-5 w-5 text-[var(--fg-subtle)]" aria-hidden="true" />

                  {/* Content */}
                  <h3 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-2 leading-snug">{r.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">{r.body}</p>

                  {/* Attribution */}
                  <footer className="mt-5 border-t border-[var(--line-1)] pt-4">
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.1em] text-[var(--fg-subtle)]">
                      {r.city} · Cliente verificado
                    </p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-xs text-[var(--fg-subtle)]">
            Testimonios reales de clientes verificados de Mente Fria.
          </p>
        </div>
      </section>

      {/* 3. Video testimonials --------------------------------------------- */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="mb-10">
            <p className="m-eyebrow accent mb-3">Video reseñas</p>
            <h2 className="mdisplay text-[clamp(26px,3.4vw,44px)] max-w-xl">Escúchalo de primera mano.</h2>
          </Reveal>

          <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {VIDEO_TESTIMONIALS.map((v, i) => (
              <Reveal key={v.name} delay={i * 80} className="shrink-0 w-52 snap-start">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl">
                  <Placeholder
                    tone={v.tone}
                    label={`Video — ${v.name}`}
                    rounded="rounded-2xl"
                    className="absolute inset-0 h-full"
                  />
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                    <p className="text-sm font-semibold text-white leading-tight">{v.name}</p>
                    <p className="text-xs uppercase tracking-[0.1em] text-white/60">{v.city}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trust badges --------------------------------------------------- */}
      <section className="bg-background">
        <div className="mwrap border-y border-[var(--line-1)] py-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA ------------------------------------------------------------ */}
      <CTASection
        title="Únete a la comunidad Mente Fria."
        cta={{ label: "Ver productos", href: "/productos" }}
        dark
      />
    </PageShell>
  );
}
