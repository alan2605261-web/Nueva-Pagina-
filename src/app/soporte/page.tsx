import { PageShell } from "@/components/PageShell";
import {
  SubHero,
  SectionHeader,
  FeatureCards,
  CTASection,
} from "@/components/blocks";
import { TOTAL_PREGUNTAS } from "@/lib/ayuda";
import { SoporteGrafico } from "@/components/SoporteGraphics";
import { Reveal } from "@/components/Reveal";
import { ContactoCard } from "@/components/ContactoCard";

/* -------------------------------------------------------------------------- */
/* /soporte — Centro de ayuda                                                  */
/* -------------------------------------------------------------------------- */

const categoryCards = [
  {
    title: "Pagos",
    media: <SoporteGrafico titulo="Pagos" />,
    body: "Aceptamos Visa, Mastercard, Amex, PayPal, Mercado Pago y transferencia bancaria. Hasta 6 MSI con Mercado Pago. Sitio asegurado por Shopify.",
    tag: "Métodos de pago",
    tone: "cool" as const,
  },
  {
    title: "Envíos",
    media: <SoporteGrafico titulo="Envíos" />,
    body: "Entrega a todo México en 3 a 7 días hábiles. Costo: $1,500 MXN (MF Horizon y MF Barrel) o $6,000 MXN (MF ONE). Los inflables llegan en dos cajas, motor y tina; la MF ONE viaja como una sola pieza.",
    tag: "Logística",
    tone: "warm" as const,
  },
  {
    title: "Garantía",
    media: <SoporteGrafico titulo="Garantía" />,
    body: "12 meses en la MF ONE y 6 meses en los modelos inflables, por defectos de fabricación. Son garantías independientes y no se mezclan. Vencidas, el canal de atención sigue abierto.",
    tag: "Cobertura",
    tone: "cool" as const,
  },
  {
    title: "Mantenimiento",
    media: <SoporteGrafico titulo="Mantenimiento" />,
    body: "Cambia el agua cada 3-5 semanas; limpia la tina cada 3-4 semanas sin abrasivos ni cloro. Cambia el filtro del motor en cada cambio de agua.",
    tag: "Cuidado",
    tone: "warm" as const,
  },
  {
    title: "Servicio técnico",
    media: <SoporteGrafico titulo="Servicio técnico" />,
    body: "Diagnóstico remoto primero; visita en sitio si es necesario; reemplazo solo cuando no hay otra opción. Buena parte de las fallas se resuelven en una videollamada.",
    tag: "Atención",
    tone: "ink" as const,
  },
  {
    title: "Contacto",
    media: <SoporteGrafico titulo="Contacto" />,
    body: "WhatsApp +52 56 1647 1386. Escríbenos a cualquier hora: te contestamos en horario hábil, y lo urgente lo atendemos en cuanto lo vemos.",
    tag: "Escríbenos",
    tone: "cool" as const,
  },
];




export default function SoportePage() {
  return (
    <PageShell>
      {/* 1. SubHero */}
      <SubHero
        eyebrow="Soporte"
        title="Centro de ayuda"
        subtitle="Todo lo que necesitas saber sobre tu cold plunge Mente Fria."
        tone="warm"
      />

      {/* 2. Categorías de ayuda */}
      <section className="msection">
        <div className="mwrap">
          <SectionHeader
            title="¿En qué te ayudamos?"
            center
            className="mb-12"
          />
          <FeatureCards cards={categoryCards} columns={3} />
        </div>
      </section>

      {/* 3. Centro de ayuda
          Aquí vivía un FAQ de 8 preguntas que repetía lo que ya está en
          /soporte/centro-de-ayuda. Se eliminó para no tener dos respuestas
          a la misma pregunta en la misma página. */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Centro de ayuda</span>
            <h2>{TOTAL_PREGUNTAS} preguntas, con buscador.</h2>
            <p>
              Códigos de error, calendario de filtros por número de inmersiones,
              protocolo de inmersión por nivel, contraindicaciones y qué revisar
              antes de llamarnos.
            </p>
          </Reveal>
          <Reveal className="text-center">
            <a href="/soporte/centro-de-ayuda" className="mbtn mbtn-primary">
              Abrir el centro de ayuda
            </a>
          </Reveal>
        </div>
      </section>



      {/* 4. Contáctanos */}
      <section className="msection">
        <div className="mwrap">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
            {/* Left */}
            <Reveal>
              <SectionHeader
                title="¿No encontraste lo que buscabas?"
                subtitle="Escríbenos por WhatsApp y cuéntanos qué necesitas. Contestamos en horario hábil y damos seguimiento hasta resolverlo."
              />
            </Reveal>

            {/* Right — misma tarjeta que /contacto: el numero y el correo
                no pueden quedar distintos entre las dos paginas. */}
            <Reveal delay={120}>
              <ContactoCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. CTA dark */}
      <CTASection
        title="¿Listo para empezar?"
        body="Encuentra la tina de agua fría que se adapta a tu rutina y espacio."
        cta={{ label: "Ver productos", href: "/productos" }}
        dark
      />
    </PageShell>
  );
}
