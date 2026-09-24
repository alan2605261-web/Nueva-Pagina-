import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { ContactoCard, WHATSAPP_URL } from "@/components/ContactoCard";

/*
  /contacto

  "Contáctanos" del menú apuntaba a /soporte, que es un índice de otras
  secciones: llegabas ahí y tenías que buscar dónde estaba el contacto. Saul
  pidió en sep 2026 una página propia donde lo primero que veas sea cómo
  escribirnos.

  La tarjeta es el mismo componente que usa /soporte, así que el número y el
  correo no pueden quedar distintos entre las dos páginas.
*/

export const metadata = {
  title: "Contáctanos | Mente Fria",
  description:
    "Escríbenos por WhatsApp o por correo. Contestamos las 24 horas y damos seguimiento hasta resolverlo.",
};

const ANTES_DE_ESCRIBIR = [
  {
    t: "Centro de ayuda",
    d: "Códigos de error, calendario de filtros y protocolo de inmersión. Con buscador.",
    href: "/soporte/centro-de-ayuda",
  },
  {
    t: "Instalación",
    d: "Los videos oficiales para montar tu equipo, paso a paso.",
    href: "/soporte/instalacion",
  },
  {
    t: "Cuida tu MF Plunge",
    d: "El mantenimiento cada 2 o 3 semanas y lo que conserva la garantía.",
    href: "/soporte/cuidado",
  },
  {
    t: "Garantía",
    d: "Qué cubre, por cuánto tiempo y cómo hacerla válida.",
    href: "/garantia",
  },
];

export default function ContactoPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Contacto"
        title={"Escríbenos."}
        subtitle="Cuéntanos qué necesitas y damos seguimiento hasta resolverlo. Somos el mismo equipo que te entregó el equipo."
        tone="warm"
      />

      <section className="msection">
        <div className="mwrap">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
            <Reveal>
              <ContactoCard />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mbtn mbtn-primary mt-6 w-full justify-center"
              >
                Abrir WhatsApp
              </a>
            </Reveal>

            <Reveal delay={120}>
              <h2
                className="mdisplay text-[clamp(24px,2.6vw,34px)] leading-tight"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                Quizá ya está resuelto.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                Lo que más nos preguntan ya está documentado. Si tu duda es de estas,
                tienes la respuesta ahora mismo sin esperar a que contestemos.
              </p>

              <ul className="mt-7 space-y-3">
                {ANTES_DE_ESCRIBIR.map((x) => (
                  <li key={x.t}>
                    <Link
                      href={x.href}
                      className="block rounded-[14px] border border-[var(--line-1)] bg-white p-5 transition-colors duration-200 hover:border-[var(--line-2)]"
                    >
                      <span className="block text-[15px] font-semibold">{x.t}</span>
                      <span className="mt-1 block text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                        {x.d}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
