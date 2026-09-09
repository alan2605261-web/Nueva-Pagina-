import Link from "next/link";
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
  title: "Centro de ayuda | Mente Fria",
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
              Te contestamos por WhatsApp en horario hábil, y lo urgente lo atendemos
              en cuanto lo vemos.
            </p>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "WhatsApp",
                d: "+52 56 1647 1386. La vía más rápida, y por donde arranca cualquier reclamación de garantía.",
                href: WHATSAPP,
                externo: true,
              },
              {
                t: "Videos oficiales",
                d: "Instalación del motor, armado del equipo y mantenimiento, paso a paso.",
                href: "/soporte",
                externo: false,
              },
              {
                t: "Garantía extendida",
                d: "Qué cubre MF Shield, qué no, y cómo se atiende una falla dentro de la cobertura.",
                href: "/garantia/extendida",
                externo: false,
              },
            ].map((s) =>
              s.externo ? (
                <a
                  key={s.t}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[16px] border border-[var(--line-1)] bg-white p-6 transition-colors duration-200 hover:border-[var(--accent-ice)]"
                >
                  <p className="text-[15px] font-semibold">{s.t}</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{s.d}</p>
                </a>
              ) : (
                <Link
                  key={s.t}
                  href={s.href}
                  className="rounded-[16px] border border-[var(--line-1)] bg-white p-6 transition-colors duration-200 hover:border-[var(--accent-ice)]"
                >
                  <p className="text-[15px] font-semibold">{s.t}</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{s.d}</p>
                </Link>
              ),
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
