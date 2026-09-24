import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { CentroAyuda } from "@/components/CentroAyuda";
import { CATEGORIAS, TOTAL_PREGUNTAS } from "@/lib/ayuda";

/* ─────────────────────────────────────────────────────────────
   /soporte/centro-de-ayuda

   Reconstrucción del troubleshooting del sitio anterior. Los datos
   se corrigieron contra el manual de la MF ONE, las fichas de motores
   de la generación nueva, el manual v6 de los inflables y los
   contratos de garantía. Ver el encabezado de src/lib/ayuda.ts.
───────────────────────────────────────────────────────────── */

const WHATSAPP = "https://wa.me/5215616471386";

export const metadata = {
  title: "Centro de ayuda",
  description:
    "Respuestas a las preguntas de instalación, uso, mantenimiento, garantía y fallas de tu cold plunge Mente Fria. Códigos de error, calendario de filtros y protocolo de inmersión.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CATEGORIAS.flatMap((c) =>
    c.preguntas.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  ),
};

export default function CentroDeAyudaPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SubHero
        eyebrow="Soporte"
        title="Centro de ayuda"
        subtitle={`${TOTAL_PREGUNTAS} respuestas sobre pagos, envíos, instalación, uso, mantenimiento y qué hacer cuando algo no funciona.`}
        tone="warm"
      />

      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <CentroAyuda />
          </Reveal>
        </div>
      </section>

      {/* Salidas */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Si no lo encontraste</span>
            <h2>Escríbenos.</h2>
            <p>
              Te contestamos por WhatsApp las 24 horas, y lo urgente lo atendemos
              en cuanto lo vemos.
            </p>
          </Reveal>

          {/* Las tres eran enlaces, pero no lo parecian: caja blanca, texto y
              nada mas. En un telefono no hay hover que lo delate (Rafa, sep
              2026: "no se siente que son botones clickeables"). Ahora cada una
              cierra con su accion y una flecha, y el borde y la flecha se
              marcan al tocarla. */}
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "WhatsApp",
                d: "+52 56 1647 1386. La vía más rápida, y por donde arranca cualquier reclamación de garantía.",
                accion: "Abrir WhatsApp",
                href: WHATSAPP,
                externo: true,
              },
              {
                t: "Videos oficiales",
                d: "Instalación del motor, armado del equipo y mantenimiento, paso a paso.",
                accion: "Ver los videos",
                href: "/soporte",
                externo: false,
              },
              {
                t: "Garantía extendida",
                d: "Qué cubre MF Shield, qué no, y cómo se atiende una falla dentro de la cobertura.",
                accion: "Ver la cobertura",
                href: "/garantia/extendida",
                externo: false,
              },
            ].map((s) => {
              const clase =
                "group flex flex-col rounded-[16px] border border-[var(--line-1)] bg-white p-6 transition-colors duration-200 hover:border-[var(--accent-ice)] active:border-[var(--accent-ice)]";
              const dentro = (
                <>
                  <p className="text-[15px] font-semibold">{s.t}</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                    {s.d}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-ice)]">
                    {s.accion}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </>
              );
              return s.externo ? (
                <a
                  key={s.t}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clase}
                >
                  {dentro}
                </a>
              ) : (
                <Link key={s.t} href={s.href} className={clase}>
                  {dentro}
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
