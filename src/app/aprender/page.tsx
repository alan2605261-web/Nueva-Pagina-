import { PageShell } from "@/components/PageShell";
import { SubHero, SectionHeader, StatRow, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { BENEFICIOS } from "@/lib/ciencia";
import { ArrowUpRight } from "@/components/icons";
import { AvisoInformativo } from "@/components/AvisoInformativo";

/*
  /aprender — la ciencia detrás del frío.

  Tres cosas que Saul marcó y que aquí quedan resueltas:

  1. Las tarjetas de beneficio no llevaban a ningún lado. Ahora cada una es un
     enlace al mismo artículo que él ligó a mano en el sitio vivo (ver
     lib/ciencia.ts). La única sin enlace es "Mayor dopamina natural", que
     tampoco lo tiene allá: no se le inventa una fuente.
  2. El texto de las tarjetas iba en bandera; ahora va justificado.
  3. El bloque de beneficios arrancaba con una sangría superior enorme porque
     encadenaba el padding de .msection con un gap-10 del contenedor. Se quitó
     el gap y el encabezado maneja su propio margen.
*/

export const metadata = {
  title: "La ciencia detrás del frío",
  description:
    "Qué le hace la inmersión en agua fría al cuerpo, beneficio por beneficio, con la referencia publicada de cada uno.",
};

export default function AprenderPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Evidencia clínica"
        title="La ciencia del cold plunge."
        subtitle="Recuperación, sueño y concentración. Cada beneficio de esta página viene con el estudio del que sale."
        tone="mist"
      />

      {/* ── Cifras ─────────────────────────────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <StatRow
              stats={[
                // Asterisco: Šrámek et al. 2000, verificado contra el resumen
                // publicado (sep 2026). Había un "−47 % cortisol" que NO aparece
                // en ese estudio (en agua fría el cortisol solo "tendió a bajar",
                // sin cifra). Saul lo mandó quitar: no volver a ponerlo.
                { value: "+250%", label: "Dopamina", nota: true },
                { value: "+530%", label: "Noradrenalina", nota: true },
              ]}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <p
              className="mx-auto max-w-[62ch] text-center text-[13px] leading-relaxed"
              style={{ color: "var(--fg-subtle)" }}
            >
              Cambios medidos tras una inmersión en agua fría en condiciones de
              laboratorio. La magnitud varía con la temperatura, el tiempo y la
              persona.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Beneficios ─────────────────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal>
            <SectionHeader
              eyebrow="Beneficios"
              title="Lo que el frío hace en tu cuerpo"
              subtitle="Cada tarjeta abre la referencia en la que se apoya."
              center
              className="mb-12"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFICIOS.map((b, i) => {
              /* El empujon visual que pidio Rafa (sep 2026): "un poco mas
                 llamativas, sin ser toscas y sin imagenes". Son tres cosas
                 chicas y ninguna agrega un elemento nuevo: el numero de la
                 tarjeta en grande y casi transparente al fondo, una barra del
                 color de acento que crece al pasar por encima, y la tarjeta que
                 se levanta un pixel. Tambien se quito el texto justificado con
                 guion automatico: en una columna de 14 caracteres partia
                 palabras como "con-centracion" y era justo lo que hacia que el
                 bloque se viera tosco. */
              const cuerpo = (
                <>
                  <span
                    aria-hidden
                    className="mdisplay pointer-events-none absolute -top-1 right-4 select-none text-[62px] leading-none"
                    style={{ color: "var(--line-1)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="block h-[3px] w-8 rounded-full transition-all duration-300 group-hover:w-14"
                    style={{ background: "var(--accent-ice)" }}
                  />
                  <p className="m-eyebrow accent mt-4">{b.categoria}</p>
                  <h3
                    className="mt-2 text-[16.5px] font-semibold leading-snug"
                    style={{ color: "var(--fg-metal)" }}
                  >
                    {b.titulo}
                  </h3>
                  <p
                    className="mt-3 flex-1 text-[14px] leading-relaxed"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {b.desc}
                  </p>
                  {b.fuente && (
                    <span
                      className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                      style={{ color: "var(--accent-ice)" }}
                    >
                      {b.fuente.tipo === "estudio"
                        ? "Artículo científico"
                        : b.fuente.tipo === "interno"
                          ? "Leer el artículo"
                          : "Leer más"}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </>
              );

              const clases =
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300";

              return (
                <Reveal key={b.titulo} delay={i * 0.03} className="h-full">
                  {b.fuente ? (
                    <a
                      href={b.fuente.url}
                      target={b.fuente.tipo === "interno" ? undefined : "_blank"}
                      rel={b.fuente.tipo === "interno" ? undefined : "noopener noreferrer"}
                      className={`${clases} hover:-translate-y-0.5 hover:border-[var(--accent-ice)] hover:shadow-[0_10px_30px_-18px_rgba(8,9,11,0.35)]`}
                      style={{
                        borderColor: "var(--line-1)",
                        background: "var(--m-white)",
                      }}
                    >
                      {cuerpo}
                    </a>
                  ) : (
                    <div
                      className={clases}
                      style={{
                        borderColor: "var(--line-1)",
                        background: "var(--m-white)",
                      }}
                    >
                      {cuerpo}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── Fuentes y aviso, en un solo bloque ─────────────────────────
          Eran DOS secciones seguidas, cada una con el padding completo de
          .msection: entre las dos dejaban casi dos pantallas de aire muerto
          antes del cierre, y el recuadro del aviso quedaba flotando al final
          sin nada alrededor. Ahora es una sola franja de dos columnas. */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div>
              <span className="m-eyebrow accent">Fuentes</span>
              <h2
                className="mdisplay mt-3 text-[clamp(22px,2.4vw,30px)]"
                style={{ color: "var(--fg-metal)" }}
              >
                De dónde salen estas referencias.
              </h2>
              <p
                className="mt-4 text-[14.5px] leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                La mayoría de estas referencias son estudios publicados en
                revistas con revisión por pares: PubMed, Frontiers in
                Physiology, Cell Metabolism, Journal of Dermatological Science.
                Dos son artículos de divulgación que resumen esa literatura y
                están señalados como tales. Preferimos decirlo a presentarlo
                todo como investigación clínica.
              </p>
            </div>
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--line-2)", background: "var(--m-white)" }}
            >
              <span className="m-eyebrow">Antes de empezar</span>
              <p
                className="mt-3 text-[14.5px] leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                El cold plunge no es un tratamiento médico, es un complemento.
                Si estás embarazada, o tienes enfermedades cardiovasculares,
                epilepsia o diabetes, consulta a tu médico antes de empezar.
              </p>
            </div>
          </Reveal>
          {/* Notas de las cifras y aviso legal, al final de la página y en
              letra chica (Saul, sep 2026: el recuadro se veía invasivo y la
              nota del asterisco no tenía que ir pegada a las cifras). */}
          <Reveal className="mt-16">
            <AvisoInformativo
              notas={
                <p>
                  * Šrámek P, et al.{" "}
                  <a
                    href="https://doi.org/10.1007/s004210050065"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[var(--accent-ice)]"
                  >
                    Human physiological responses to immersion into water of different temperatures
                  </a>
                  . European Journal of Applied Physiology, 2000. Aumento en sangre medido tras 1 hora
                  de inmersión hasta el cuello en agua a 14 °C, en un grupo de hombres jóvenes.
                </p>
              }
              base="Información anterior con base en el estudio citado y en las publicaciones de terceros enlazadas en esta página. Por lo mismo, las cifras corresponden a las condiciones de cada estudio y no son datos de Mente Fria ni resultados que deban esperarse de una sesión con nuestros productos."
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Elige con cuál empezar."
        body="El MF Barrel y el MF Horizon se inflan y se guardan en su mochila. La MF ONE es de acrílico y trae el motor dentro de la tina."
        cta={{ label: "Ver productos", href: "/productos" }}
        dark
      />
    </PageShell>
  );
}
