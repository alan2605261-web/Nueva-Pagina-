import { PageShell } from "@/components/PageShell";
import {
  SectionHeader,
  FeatureCards,
  StatRow,
  CTASection,
} from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { QuoteMark, StarIcon } from "@/components/icons";
import Image from "next/image";

export default function AtletasPage() {
  return (
    <PageShell>
      {/* 1. Dark Hero */}
      <section className="relative min-h-[70vh] bg-black text-white flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-mfone.jpg"
            alt="MF ONE hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="mwrap relative z-10 py-24">
          <Reveal>
            <p className="m-eyebrow accent mb-4">Para atletas</p>
            <h1 className="mdisplay text-[clamp(32px,4.6vw,60px)] text-white mb-6 max-w-2xl">
              Recupérate como compites.
            </h1>
            <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] text-white/70 mb-10 max-w-lg">
              El cold plunge tiene raíces en la recuperación deportiva. Frío
              constante a 3°C, sin hielo y sin logística — listo todos los días.
            </p>
            <a href="/productos/mf-one" className="mbtn bg-white text-black hover:bg-white/90">
              Ver el MF ONE
            </a>
          </Reveal>
        </div>
      </section>

      {/* 2. Feature Cards */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <SectionHeader
              eyebrow="Beneficios para atletas"
              title="El frío trabaja cuando tú paras."
              subtitle="Por qué los atletas hacen del frío un hábito de recuperación."
              center
              className="mb-12"
            />
          </Reveal>
          <Reveal>
            <FeatureCards
              columns={3}
              cards={[
                {
                  tag: "Recuperación",
                  title: "Recuperación más rápida",
                  body: "La inmersión contrae los vasos sanguíneos, reduce la hinchazón y el daño muscular post-entreno. Para recuperación rápida, hazlo dentro de la primera hora después de entrenar.",
                },
                {
                  tag: "Inflamación",
                  title: "Menos inflamación y dolor",
                  body: "Reduce el dolor y la rigidez articular tras entrenamientos intensos.",
                },
                {
                  tag: "Disciplina mental",
                  title: "MIND OVER BODY",
                  body: "Cada inmersión entrena tu sistema nervioso a manejar el estrés; la misma fortaleza que usas en competencia.",
                  tone: "ink",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* 3. Stat Row */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal>
            <StatRow
              stats={[
                { value: "3°C", label: "temperatura de sesión" },
                { value: "3 min", label: "por sesión" },
                { value: "0 hielos", label: "sin logística" },
              ]}
            />
          </Reveal>
          <Reveal>
            <p className="text-sm text-[var(--fg-muted)] text-center mt-6 max-w-xl mx-auto">
              <strong>Nota sobre timing:</strong> Si tu objetivo es ganar masa muscular, separa el frío varias horas del entrenamiento de fuerza o resérvalo para días de descanso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <SectionHeader
              eyebrow="Atletas reales"
              title="Lo que dicen quienes lo usan."
              center
              className="mb-12"
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Reveal>
              <div className="flex flex-col gap-4 p-8 rounded-2xl bg-[var(--bg-panel)]">
                <QuoteMark className="w-8 h-8 text-foreground opacity-20" />
                <blockquote className="text-[16px] leading-relaxed text-[var(--fg-muted)] text-foreground leading-relaxed">
                  &ldquo;Después de una lesión deportiva, las cold plunges de Mente Fria aceleraron mi recuperación. La inflamación bajó rápidamente y pude volver a entrenar mucho antes de lo esperado.&rdquo;
                </blockquote>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-foreground" />
                    ))}
                  </div>
                  <p className="text-[var(--fg-muted)] text-sm tracking-wide uppercase">
                    Eduardo V. · CDMX
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="flex flex-col gap-4 p-8 rounded-2xl bg-[var(--bg-panel)]">
                <QuoteMark className="w-8 h-8 text-foreground opacity-20" />
                <blockquote className="text-[16px] leading-relaxed text-[var(--fg-muted)] text-foreground leading-relaxed">
                  &ldquo;Siempre he tenido problemas con la inflamación después de hacer ejercicio. Las cold plunges de Mente Fria han reducido significativamente el dolor post-entrenamiento.&rdquo;
                </blockquote>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-foreground" />
                    ))}
                  </div>
                  <p className="text-[var(--fg-muted)] text-sm tracking-wide uppercase">
                    Rodrigo P. · Guadalajara
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Two-column product section */}
      <section className="msection panel">
        <div className="mwrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <Reveal>
              <div>
                <p className="m-eyebrow accent mb-4">El equipo</p>
                <h2 className="mdisplay text-[clamp(26px,3.4vw,44px)] text-foreground mb-6">
                  El equipo para tu disciplina.
                </h2>
                <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-8">
                  El MF ONE fue diseñado para el atleta que toma en serio su
                  recuperación. Chiller integrado, 3°C, control desde app — todo incluido, sin logística.
                </p>
                <ul className="space-y-4">
                  {[
                    "Chiller integrado — sin hielo, sin preparación",
                    "Temperatura constante a 3°C",
                    "Control desde app",
                    "Diseño compacto — cabe en cualquier espacio",
                    "Mantenimiento mínimo, uso diario",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-foreground"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                      <span className="text-[16px] leading-relaxed text-[var(--fg-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <a
                    href="/productos/mf-one"
                    className="mbtn-primary"
                  >
                    Ver especificaciones
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right: product image */}
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-black/10 to-black/30">
                <Image
                  src="/images/prod-mfone.webp"
                  alt="MF ONE tina de inmersión en frío"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <CTASection
        title="Entrena tu mente. Domina tu cuerpo."
        body="El MF ONE te da la herramienta. El resto depende de ti."
        cta={{ label: "Ver el MF ONE", href: "/productos/mf-one" }}
        dark
      />
    </PageShell>
  );
}
