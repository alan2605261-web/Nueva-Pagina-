import { PageShell } from "@/components/PageShell";
import { SubHero, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { CONSEJO } from "@/lib/ciencia";
import { ArrowUpRight } from "@/components/icons";
import { Check } from "lucide-react";
import { AvisoInformativo } from "@/components/AvisoInformativo";

/*
  /aprender/consejo-cientifico

  Vivía como un ancla dentro de /aprender (#consejo) y en formato de tarjetitas
  de texto. Saul pidió en sep 2026 volver al formato del sitio vivo, que es el
  que le gusta: una franja por persona, con su foto, sus credenciales, su bio y
  tres hallazgos suyos sobre el frío.

  Las franjas alternan el lado de la foto. No es adorno: son seis bloques con
  la misma estructura, y alternar es lo que evita que se lean como una lista
  repetida. Los datos salen de lib/ciencia.ts.
*/

export const metadata = {
  title: "Consejo científico | Mente Fria",
  description:
    "Científicos, médicos y atletas cuyo trabajo publicado sostiene lo que contamos sobre la inmersión en frío.",
};

export default function ConsejoCientificoPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Consejo científico"
        title={"Los que más saben\nrespaldan el frío."}
        subtitle="Científicos, médicos y atletas de élite que han dedicado su carrera a entender lo que la exposición al frío le hace al cuerpo humano."
        tone="mist"
      />

      <section className="msection">
        <div className="mwrap">
          <div className="space-y-16 lg:space-y-24">
            {CONSEJO.map((r, i) => {
              const fotoDerecha = i % 2 === 1;
              return (
                <Reveal key={r.nombre}>
                  <article className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
                    {/* Foto */}
                    <div
                      className={`overflow-hidden rounded-[18px] bg-[var(--bg-panel)] ${
                        fotoDerecha ? "lg:order-2" : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.foto}
                        alt={r.nombre}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
                      />
                    </div>

                    {/* Texto */}
                    <div className={fotoDerecha ? "lg:order-1" : ""}>
                      <span className="m-eyebrow accent">{r.campo}</span>
                      <h2
                        className="mdisplay mt-3 text-[clamp(26px,3vw,40px)] leading-tight"
                        style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                      >
                        {r.nombre}
                      </h2>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                        {r.etiqueta}
                      </p>
                      <p className="mt-5 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                        {r.bio}
                      </p>

                      <ul className="mt-6 space-y-3 border-t border-[var(--line-1)] pt-6">
                        {r.puntos.map((p) => (
                          <li key={p} className="flex items-start gap-3">
                            <Check
                              size={16}
                              strokeWidth={2.4}
                              className="mt-[3px] flex-none text-[var(--accent-ice)]"
                            />
                            <span className="text-[14px] leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-ice)] hover:underline"
                      >
                        Ver investigación
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Aviso legal al pie, en letra chica: ninguna de estas personas
              es parte de Mente Fria (Saul, sep 2026). */}
          <Reveal className="mt-20 lg:mt-28">
            <AvisoInformativo personas />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="La ciencia habla. El frío lo confirma."
        body="Tres minutos, todos los días. Así es como los que más rinden se recuperan de verdad."
        cta={{ label: "Ver productos", href: "/productos" }}
        dark
      />
    </PageShell>
  );
}
