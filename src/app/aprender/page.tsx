import { PageShell } from "@/components/PageShell";
import {
  SubHero,
  SectionHeader,
  StatRow,
  CTASection,
} from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

const BENEFITS = [
  {
    category: "MENTAL",
    title: "Mejora del control mental",
    desc: "Sumergirse en frío entrena la disciplina mental, fortalece la resiliencia y enseña a mantener la calma bajo presión.",
  },
  {
    category: "ENERGÍA",
    title: "Incrementa tu metabolismo",
    desc: "La inmersión en agua fría aumenta la función mitocondrial y la producción de ATP, resultando en mayor energía y resistencia física.",
  },
  {
    category: "INMUNIDAD",
    title: "Fortalece tu sistema inmune",
    desc: "La exposición al frío aumenta la producción de glóbulos blancos, esenciales para combatir infecciones y mejorar la resistencia del cuerpo.",
  },
  {
    category: "SUEÑO",
    title: "Mejora la calidad del sueño",
    desc: "El frío reduce los niveles de cortisol y promueve la producción de melatonina, facilitando un sueño más profundo y reparador.",
  },
  {
    category: "RECUPERACIÓN",
    title: "Reducción de la inflamación",
    desc: "La inmersión en agua fría reduce la inflamación al disminuir el flujo sanguíneo en áreas específicas, aliviando dolores y mejorando la movilidad.",
  },
  {
    category: "ÁNIMO",
    title: "Mayor dopamina natural",
    desc: "El frío intenso dispara los niveles de dopamina hasta 2.5 veces más de lo normal, mejorando la motivación, concentración y satisfacción.",
  },
  {
    category: "ENERGÍA",
    title: "Aumenta energía y libera endorfinas",
    desc: "La inmersión en frío provoca la liberación de endorfinas, generando una sensación inmediata de vitalidad y bienestar que dura horas.",
  },
  {
    category: "CIRCULACIÓN",
    title: "Mejora la circulación",
    desc: "El contraste térmico contrae y dilata los vasos sanguíneos, estimulando la circulación y favoreciendo la oxigenación de músculos y órganos.",
  },
  {
    category: "COMPOSICIÓN CORPORAL",
    title: "Quema de grasa marrón",
    desc: "El frío activa la grasa marrón, un tejido que consume calorías para generar calor corporal, favoreciendo la pérdida de grasa y mejorando el metabolismo.",
  },
  {
    category: "METABOLISMO",
    title: "Aumento de la termogénesis",
    desc: "La grasa marrón se activa para producir calor, incrementando el gasto energético y ayudando a mantener la temperatura corporal estable.",
  },
  {
    category: "ESTRÉS",
    title: "Mejor manejo del estrés y ansiedad",
    desc: "La inmersión en frío disminuye el cortisol y activa el sistema nervioso parasimpático, reduciendo la ansiedad y generando calma sostenida.",
  },
  {
    category: "CEREBRO",
    title: "Mejora la neuroplasticidad",
    desc: "El estímulo del frío favorece la creación de nuevas conexiones neuronales, mejorando el aprendizaje, la memoria y la adaptación mental.",
  },
  {
    category: "CORAZÓN",
    title: "Mejor salud cardiovascular",
    desc: "La práctica regular de inmersión en frío fortalece el sistema cardiovascular, mejora la elasticidad de los vasos sanguíneos y optimiza la circulación.",
  },
  {
    category: "COGNICIÓN",
    title: "Mejora la atención y el enfoque",
    desc: "El frío estimula neurotransmisores que aumentan la claridad mental, potenciando la concentración y el rendimiento cognitivo durante horas.",
  },
  {
    category: "ESTÉTICA",
    title: "Beneficia la piel y el cabello",
    desc: "La contracción de los vasos sanguíneos revitaliza la piel, reduce la hinchazón y fortalece el cabello al mejorar su oxigenación.",
  },
  {
    category: "INFLAMACIÓN",
    title: "Reduce la inflamación intestinal y articular",
    desc: "El frío disminuye procesos inflamatorios internos, aliviando molestias digestivas y mejorando la movilidad articular.",
  },
  {
    category: "ÁNIMO",
    title: "Mejora el humor a lo largo del día",
    desc: "La descarga de dopamina y endorfinas prolonga un estado de ánimo positivo y estable durante horas después de cada inmersión.",
  },
];

export default function AprenderPage() {
  return (
    <PageShell>
      {/* 1. SubHero */}
      <SubHero
        eyebrow="Evidencia clínica"
        title={"El poder del frío.\nRespaldado por la ciencia."}
        subtitle="Recupérate más rápido, duerme mejor, piensa con mayor claridad y siéntete más vivo. Cada beneficio, documentado."
        tone="mist"
      />

      {/* 2. StatRow — datos clínicos */}
      <section className="msection">
        <div className="mwrap flex flex-col gap-10">
          <Reveal>
            <StatRow
              stats={[
                {
                  value: "+250%",
                  label: "Dopamina",
                },
                {
                  value: "+530%",
                  label: "Noradrenalina",
                },
                {
                  value: "−47%",
                  label: "Cortisol",
                },
              ]}
            />
          </Reveal>
          {/* 4th stat as text since StatRow takes 3 */}
          <Reveal delay={0.1}>
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1 px-8 py-6 rounded-2xl border border-border bg-[var(--bg-panel)]">
                <p className="text-4xl font-bold text-ink tracking-tight">16+</p>
                <p className="text-sm text-[var(--fg-muted)] uppercase tracking-wider font-medium">
                  Beneficios documentados
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Benefits grid — 17 tarjetas */}
      <section className="msection panel">
        <div className="mwrap flex flex-col gap-10">
          <Reveal>
            <SectionHeader
              eyebrow="Beneficios"
              title="Lo que el frío hace en tu cuerpo"
              subtitle="Cada beneficio documentado en investigación clínica peer-reviewed."
              center
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.03}>
                <div className="flex flex-col gap-3 p-6 rounded-2xl bg-background border border-border h-full">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {b.category}
                  </p>
                  <p className="font-semibold text-ink text-base leading-snug">
                    {b.title}
                  </p>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consejo científico — el menú Aprender enlaza a /aprender#consejo y el
          ancla no existía. Redacción deliberadamente prudente: se presenta a
          estos investigadores como las referencias en cuyo trabajo publicado
          nos apoyamos, NO como asesores contratados de Mente Fria. Si existe
          una relación formal con alguno, se puede decir explícitamente. */}
      <section className="msection panel scroll-mt-20" id="consejo">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Consejo científico</span>
            <h2>En quién nos apoyamos.</h2>
            <p>
              No inventamos la ciencia del frío: la leemos. Estas son las
              referencias cuyo trabajo publicado y divulgación sostienen lo que
              contamos en este sitio.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "Dra. Susanna Søberg", c: "Metabolismo y termorregulación", d: "Su investigación sobre grasa parda y adaptación al frío es la base del principio de dosis mínima semanal." },
              { n: "Dr. Andrew Huberman", c: "Neurociencia", d: "Divulgación sobre la respuesta de catecolaminas y el efecto del frío en dopamina y estado de alerta." },
              { n: "Dr. Peter Attia", c: "Medicina de longevidad", d: "Análisis del frío dentro de un marco de longevidad, con atención a cuándo ayuda y cuándo interfiere." },
              { n: "Dra. Rhonda Patrick", c: "Bioquímica", d: "Trabajo de divulgación sobre hormesis, proteínas de choque térmico y adaptación al estrés." },
              { n: "Kristen Holmes", c: "Fisiología del rendimiento", d: "Investigación sobre sueño, variabilidad de frecuencia cardiaca y recuperación en atletas." },
              { n: "Wim Hof", c: "Método respiratorio", d: "Popularizó la práctica moderna de exposición al frío con respiración controlada." },
            ].map((x, i) => (
              <Reveal
                key={x.n}
                delay={(i % 3) * 70}
                className="rounded-[16px] border p-7"
                style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
              >
                <span className="m-eyebrow accent">{x.c}</span>
                <h3
                  className="mdisplay mt-3 text-[19px] leading-tight"
                  style={{ color: "var(--fg-metal)" }}
                >
                  {x.n}
                </h3>
                <p
                  className="mt-3 text-[13.5px] leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {x.d}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="text-[12.5px] leading-relaxed" style={{ color: "var(--fg-subtle)" }}>
              Mencionamos su trabajo como referencia científica. No implica
              patrocinio, asesoría contratada ni respaldo de estas personas a
              Mente Fria como marca.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. Fuentes científicas */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-4">
              <SectionHeader
                eyebrow="Fuentes"
                title="Ciencia, no marketing"
                center
              />
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                Cada beneficio está respaldado por investigación clínica publicada
                en revistas científicas peer-reviewed, incluyendo estudios de
                PubMed, Frontiers in Physiology, Huberman Lab y otras instituciones
                de referencia mundial.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Disclaimer */}
      <section className="bg-[var(--bg-panel)]">
        <div className="mwrap py-8">
          <Reveal>
            <div className="rounded-2xl border border-border bg-background/60 p-6 max-w-3xl mx-auto">
              <p className="text-sm text-[var(--fg-muted)]">
                <strong className="text-ink">Aviso importante:</strong> El cold
                plunge no es un tratamiento médico, es un complemento. Si estás
                embarazada, tienes enfermedades cardiovasculares, epilepsia o
                diabetes, consulta a tu médico antes de empezar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. CTA */}
      <CTASection
        title="La ciencia habla. El frío lo confirma."
        body="Tres minutos. Todos los días. Así es como los que más rinden se recuperan de verdad."
        cta={{ label: "Ver productos", href: "/productos" }}
        dark
      />
    </PageShell>
  );
}
