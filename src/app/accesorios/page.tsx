import { PageShell } from "@/components/PageShell";
import { SubHero, SectionHeader, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { AccessoryCard } from "@/components/AccessoryCard";

/* ─── Accesorios (venta) ─────────────────────────────────────────────────── */
const accesoriosCards = [
  {
    title: "MFONE PRO DECK",
    body: "El escalón de acceso diseñado para tu MF ONE. Eleva y estabiliza el setup; integración perfecta con el equipo.",
    tag: "$6,900 MXN",
    img: "/images/prodeck-negro.png",
    contain: true,
  },
  {
    title: "MF Mat",
    body: "Tapete antideslizante para tu setup. Previene caídas al salir con los pies mojados.",
    tag: "Consultar",
    img: null,
    contain: false,
  },
  {
    title: "Soporte para celular",
    body: "Se monta en el borde de la tina — tu timer, tu música o tu serie durante la inmersión.",
    tag: "Consultar",
    img: "/images/acc-soporte-celular.webp",
    contain: true,
  },
];

/* ─── Kits de mantenimiento (estilo Plunge) ──────────────────────────────── */
const kitsMantenimiento = [
  {
    title: "Filtro de papel",
    body: "Cartucho reemplazable para la MF ONE — cámbialo cada 3 a 4 semanas.",
    tag: "Consultar",
    img: "/images/acc-filtro-cartucho-uno.webp",
    contain: true,
  },
  {
    title: "Filtro de carbón",
    body: "Se conecta a la manguera al llenar la tina — retiene impurezas desde el primer litro.",
    tag: "Consultar",
    img: "/images/acc-filtro-prellenado.webp",
    contain: true,
  },
  {
    title: "Kit de filtros para inflables",
    body: "Tres filtros de 1 a 5 micrones para MF Barrel y MF Horizon — cambia el filtro con cada cambio de agua.",
    tag: "Consultar",
    img: "/images/acc-filtros-cartucho.webp",
    contain: true,
  },
  {
    title: "Oxidante Sirona",
    body: "Tratamiento sin cloro que mantiene el agua impecable entre cambios.",
    tag: "Próximamente",
    img: null,
    contain: false,
  },
];

const maintenanceSchedule = [
  {
    interval: "Cada 3 a 5 semanas",
    task: "Drenar y rellenar el agua",
    detail: "Uso residencial típico. Con buen mantenimiento el agua puede durar hasta un mes completo.",
  },
  {
    interval: "Cada 3 a 4 semanas",
    task: "Limpiar el interior",
    detail: "Usa material NO abrasivo. Sin detergentes fuertes ni cloro — su uso invalida la garantía.",
  },
  {
    interval: "En cada cambio de agua",
    task: "Cambiar el filtro del motor",
    detail: "Obligatorio. El Kit de filtros incluye filtro de papel, filtro metálico y red de protección.",
  },
  {
    interval: "Continuo",
    task: "Desinfección por ozono",
    detail: "El sistema integrado elimina bacterias sin cloro de alberca. No agregar cloro ni productos externos.",
  },
];

const mfOneIncluded = [
  {
    title: "Filtro de papel",
    body: "Es el filtro de operación de la MF ONE — cámbialo cada 3 a 4 semanas.",
    img: "/images/acc-filtros-cartucho.webp",
  },
  {
    title: "Filtro de carbón",
    body: "Se conecta a la manguera al llenar la tina — retiene impurezas desde el primer litro.",
    img: "/images/acc-filtro-prellenado.webp",
  },
  {
    title: "Red de limpieza",
    body: "Retira hojas e impurezas de la superficie en segundos.",
    img: "/images/acc-red-limpieza.webp",
  },
  {
    title: "Soporte para celular",
    body: "Se monta en el borde de la tina — tu timer, tu música o tu serie durante la inmersión.",
    img: "/images/acc-soporte-celular.webp",
  },
  {
    title: "Patitos de hule",
    body: "Sí, vienen incluidos. Porque el frío se toma en serio — pero no tanto.",
    img: "/images/acc-patitos.webp",
  },
  {
    title: "El kit completo",
    body: "Todo lo que llega en la caja de la MF ONE, listo desde el día uno.",
    img: "/images/acc-kit-completo.jpg",
  },
];

/* Card de producto con imagen (o placeholder) + chip de precio */
function AccessoryGrid({
  items,
}: {
  items: {
    title: string;
    body: string;
    tag?: string;
    img: string | null;
    contain?: boolean;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06} className="h-full">
          <AccessoryCard
            a={{ t: item.title, p: item.body, img: item.img, tag: item.tag }}
            index={i}
            className="h-full"
          />
        </Reveal>
      ))}
    </div>
  );
}

export default function AccesoriosPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Accesorios"
        title="Protege y potencia tu equipo."
        subtitle="Complementos de mantenimiento y cuidado diseñados para que tu tina Mente Fria rinda al máximo sesión tras sesión."
        cta={{ label: "Ver catálogo", href: "#catalogo" }}
        tone="warm"
      />

      {/* Accesorios */}
      <section id="catalogo" className="msection scroll-mt-20">
        <div className="mwrap">
          <SectionHeader
            eyebrow="Accesorios"
            title="Completa tu setup."
            subtitle="Piezas diseñadas para elevar la experiencia alrededor de tu cold plunge."
            center
            className="mb-12"
          />
          <AccessoryGrid items={accesoriosCards} />
        </div>
      </section>

      {/* Kits de mantenimiento */}
      <section id="mantenimiento" className="msection panel scroll-mt-20">
        <div className="mwrap">
          <SectionHeader
            eyebrow="Kits de mantenimiento"
            title="Agua impecable, siempre."
            subtitle="Filtros y tratamientos para mantener tu agua cristalina entre cambios."
            center
            className="mb-12"
          />
          <AccessoryGrid items={kitsMantenimiento} />
        </div>
      </section>

      {/* Incluido con la MF ONE */}
      <section className="msection">
        <div className="mwrap">
          <SectionHeader
            eyebrow="Incluido con la MF ONE"
            title="Lo que ya viene en la caja."
            subtitle="Estos accesorios no se compran aparte: cada MF ONE los incluye de serie."
            center
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mfOneIncluded.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line-1)] bg-background">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Calendario de mantenimiento */}
      <section className="msection panel">
        <div className="mwrap">
          <SectionHeader
            eyebrow="Cuidado"
            title="Calendario de mantenimiento"
            subtitle="Sigue estas frecuencias y tu tina estará siempre lista. Agua turbia o con olor: cambia el agua por completo y realiza mantenimiento del motor."
            center
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenanceSchedule.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex flex-col gap-3 rounded-2xl border border-[var(--line-1)] bg-background p-6 h-full">
                  <span className="m-eyebrow accent text-xs">{item.interval}</span>
                  <h3 className="text-lg font-semibold text-foreground leading-snug">
                    {item.task}
                  </h3>
                  <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] text-sm leading-relaxed flex-1">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="¿Dudas sobre tu equipo?"
        body="Nuestro equipo técnico te orienta sobre mantenimiento, compatibilidad de accesorios y cualquier pregunta sobre tu tina Mente Fria."
        cta={{ label: "Ir a Soporte", href: "/soporte" }}
        dark
      />
    </PageShell>
  );
}
