import { PageShell } from "@/components/PageShell";
import { SubHero, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

/*
  /soporte/instalacion

  Vivia como ancla dentro de /soporte (#instalacion). Saul pidio en sep 2026
  que cada entrada del menu fuera su propia pagina. El bloque y sus datos se
  movieron tal cual.
*/

export const metadata = {
  title: "Instrucciones de instalación | Mente Fria",
  description:
    "Los videos oficiales para montar tu cold plunge Mente Fria, paso a paso y sin herramientas.",
};

/*
  Videos de instalación. Solo instalación: el tutorial de mantenimiento se movió
  a /soporte/cuidado en sep 2026, porque Saul pidió separar las dos cosas.

  Los tutoriales "Conecta tu Motor Pro" y "Conecta tu Motor Premium" se
  quitaron: muestran motores de la generación anterior y no hacen falta.
  No volver a subirlos.

  Nota de comparación: "Mente Fria Video tutorial FINAL.mov" del Drive resultó
  ser el MISMO archivo que instalacion-motor-pro-premium.mp4 —3:06.7 los dos—
  sólo que en 4K. Por eso no se subió otra vez.
*/
const VIDEOS: { src: string; poster?: string; t: string; d: string }[] = [
  {
    src: "/videos/original/instalacion-mf-one.mp4",
    t: "MF ONE instalación",
    d: "El recorrido del equipo: la tina, el módulo de enfriamiento, el control y el portafiltro.",
  },
  {
    src: "/videos/original/instalacion-motor-pro-premium.mp4",
    t: "Instalación MF Barrel y MF Horizon",
    d: "Del inflado a las mangueras. El procedimiento es el mismo para los dos inflables.",
  },
];

export default function InstalacionPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Soporte"
        title="Instrucciones de instalación"
        subtitle="Montas tu plunge en 15 a 20 minutos y sin herramientas. Estos son los videos oficiales, paso a paso."
        tone="warm"
      />

      {/* ── Videos de instalación ──────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Videos oficiales</span>
            <h2>Instalación paso a paso</h2>
            <p>
              Montas tu plunge en 15 a 20 minutos y sin herramientas. Estos son
              los videos oficiales, paso a paso.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {VIDEOS.map((v, i) => (
              <Reveal key={v.src} delay={(i % 3) * 90}>
                <div className="overflow-hidden rounded-[14px] bg-[var(--m-graphite)]">
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    preload="metadata"
                    playsInline
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-[17px] font-semibold">{v.t}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                  {v.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Cómo cuidarla a partir de aquí."
        body="El procedimiento de mantenimiento y los hábitos que alargan la vida del equipo. Son unos minutos al mes."
        cta={{ label: "Cuida tu MF Plunge", href: "/soporte/cuidado" }}
        dark
      />
    </PageShell>
  );
}
