import { PageShell } from "@/components/PageShell";
import { SubHero, SectionHeader, StatRow, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { BENEFICIOS, CONSEJO } from "@/lib/ciencia";
import { ArrowUpRight } from "@/components/icons";

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
  title: "La ciencia detrás del frío | Mente Fria",
  description:
    "Qué le hace la inmersión en agua fría al cuerpo, beneficio por beneficio, con la referencia publicada de cada uno.",
};

export default function AprenderPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Evidencia clínica"
        title={"El poder del frío.\nRespaldado por la ciencia."}
        subtitle="Recupérate más rápido, duerme mejor, piensa con mayor claridad y siéntete más vivo. Cada beneficio, con su referencia."
        tone="mist"
      />

      {/* ── Cifras ─────────────────────────────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <StatRow
              stats={[
                { value: "+250%", label: "Dopamina" },
                { value: "+530%", label: "Noradrenalina" },
                { value: "−47%", label: "Cortisol" },
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
              const cuerpo = (
                <>
                  <p className="m-eyebrow accent">{b.categoria}</p>
                  <h3
                    className="mt-3 text-[16.5px] font-semibold leading-snug"
                    style={{ color: "var(--fg-metal)" }}
                  >
                    {b.titulo}
                  </h3>
                  <p
                    className="mt-3 flex-1 text-justify text-[14px] leading-relaxed hyphens-auto"
                    lang="es"
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
                        : "Leer más"}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </>
              );

              const clases =
                "flex h-full flex-col rounded-2xl border p-6 transition-colors";

              return (
                <Reveal key={b.titulo} delay={i * 0.03} className="h-full">
                  {b.fuente ? (
                    <a
                      href={b.fuente.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${clases} hover:border-[var(--accent-ice)]`}
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

      {/* ── Consejo científico ─────────────────────────────────────────── */}
      <section className="msection scroll-mt-20" id="consejo">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Consejo científico</span>
            <h2>Los que más saben respaldan el frío.</h2>
            <p>
              Científicos, médicos y atletas que han dedicado su carrera a
              entender lo que la exposición al frío le hace al cuerpo humano. Su
              trabajo publicado es el que sostiene lo que contamos aquí.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONSEJO.map((r, i) => (
              <Reveal key={r.nombre} delay={(i % 3) * 70} className="h-full">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col rounded-[16px] border p-7 transition-colors hover:border-[var(--accent-ice)]"
                  style={{
                    borderColor: "var(--line-1)",
                    background: "var(--m-white)",
                  }}
                >
                  <span className="m-eyebrow accent">{r.campo}</span>
                  <h3
                    className="mdisplay mt-3 text-[19px] leading-tight"
                    style={{ color: "var(--fg-metal)" }}
                  >
                    {r.nombre}
                  </h3>
                  <p
                    className="mt-1 text-[12.5px]"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    {r.filiacion}
                  </p>
                  <p
                    className="mt-4 flex-1 text-justify text-[13.5px] leading-relaxed hyphens-auto"
                    lang="es"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {r.bio}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                    style={{ color: "var(--accent-ice)" }}
                  >
                    Ver su trabajo
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p
              className="text-[12.5px] leading-relaxed"
              style={{ color: "var(--fg-subtle)" }}
            >
              Mencionamos su trabajo como referencia científica. No implica
              patrocinio, asesoría contratada ni respaldo de estas personas a
              Mente Fria como marca.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Nota sobre las fuentes ─────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
              <SectionHeader eyebrow="Fuentes" title="Ciencia, no marketing" center />
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                La mayoría de estas referencias son estudios publicados en
                revistas con revisión por pares —PubMed, Frontiers in
                Physiology, Cell Metabolism, Journal of Dermatological Science—.
                Dos son artículos de divulgación que resumen esa literatura, y
                están señalados como tales. Preferimos decirlo a presentarlo
                todo como investigación clínica.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Aviso ──────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-panel)" }}>
        <div className="mwrap py-8">
          <Reveal>
            <div
              className="mx-auto max-w-3xl rounded-2xl border p-6"
              style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
            >
              <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
                <strong style={{ color: "var(--fg-metal)" }}>
                  Aviso importante:
                </strong>{" "}
                el cold plunge no es un tratamiento médico, es un complemento.
                Si estás embarazada, o tienes enfermedades cardiovasculares,
                epilepsia o diabetes, consulta a tu médico antes de empezar.
              </p>
            </div>
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
