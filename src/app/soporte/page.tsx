import { PageShell } from "@/components/PageShell";
import {
  SubHero,
  SectionHeader,
  FeatureCards,
  CTASection,
} from "@/components/blocks";
import { FAQ } from "@/components/FAQ";
import { SoporteGrafico } from "@/components/SoporteGraphics";
import { Reveal } from "@/components/Reveal";

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
    body: "12 meses en la MF ONE y 6 meses en los modelos inflables, por defectos de fabricación. Son garantías independientes. Y cuando se acaben, nos sigues escribiendo: te seguimos contestando.",
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

const faqItems = [
  {
    q: "¿Cómo funciona la prueba de 30 días?",
    a: "Tienes 30 días naturales desde la entrega. Llénala, métete y pruébala todos los días de ese mes: que el equipo esté usado no te quita el derecho al reembolso, ese es el punto de una prueba. Si no es la mejor cold plunge que has probado, nos escribes, la recogemos sin costo y te regresamos tu dinero, sin preguntas."
  },
  {
    q: "¿Qué cubre la garantía?",
    a: "Cualquier defecto de fabricación o de materiales: 6 meses en modelos inflables (Horizon/Barrel) y 1 año en MF ONE. No cubre daños por caídas, golpes o uso inadecuado.",
  },
  {
    q: "¿Cada cuánto cambio el agua y los filtros?",
    a: "El agua puede durar hasta un mes; drena y rellena cada 3 a 5 semanas. Cada cambio de agua requiere cambiar el filtro del motor.",
  },
  {
    q: "¿Necesito hielo?",
    a: "No. Los motores mantienen la temperatura que programas (hasta 3 °C en los inflables, desde 1 °C en la MF ONE) y filtran el agua continuamente, eliminando la necesidad de comprar hielo.",
  },
  {
    q: "¿Cuánto tarda en llegar y cuánto cuesta el envío?",
    a: "3 a 7 días hábiles a todo México. $1,500 MXN para Horizon o Barrel, y $6,000 MXN para la MF ONE.",
  },
  {
    q: "¿Qué tan difícil es el montaje?",
    a: "Sin herramientas: infla la tina, conecta las mangueras al motor, enchufa y llena con agua. Todo listo en 15 a 20 minutos.",
  },
  {
    q: "¿La MF ONE usa motor externo?",
    a: "No. La MF ONE es all-in-one: lleva el chiller dentro de la tina, con 1 HP y 3,500 W de enfriamiento. Ajusta de 1 a 40 °C sin accesorios adicionales. Los motores de la línea 2.0 son solo para MF Barrel y MF Horizon.",
  },
  {
    q: "¿Puedo controlar la temperatura desde mi celular?",
    a: "Sí, monitorea y ajusta la temperatura desde la app móvil para que el agua esté lista cuando la necesites.",
  },
];

/* Cuidado del equipo. Rescatado de la pagina "Cuida tu MF Plunge" del sitio
   anterior, que no se habia migrado. Todo aplica a los tres modelos salvo lo
   marcado como exclusivo de inflables. */
const CUIDADOS = [
  {
    cuando: "Con agua dentro",
    grupo: "Higiene del día a día",
    puntos: [
      {
        t: "Dúchate antes de entrar",
        d: "Enjuagarte y lavarte las manos reduce muchísimo la carga de suciedad que entra al agua. Es lo que más alarga la vida del filtro y lo que más espacia los cambios de agua.",
      },
      {
        t: "Pasa la red por la superficie",
        d: "Cabellos, insectos y hojas se retiran en segundos con el skimmer. Si la tina está al aire libre, hazlo antes de cada sesión.",
      },
      {
        t: "Pon un tapete en la entrada",
        d: "Si el equipo está en exterior, un tapete absorbente frente a la tina evita que la tierra del piso termine dentro del agua.",
      },
      {
        t: "Cúbrela cuando no la uses",
        d: "La cubierta mantiene fuera el polvo y los insectos, y conserva la temperatura: el equipo trabaja menos y consume menos.",
      },
    ],
  },
  {
    cuando: "Al vaciar",
    grupo: "Limpieza a fondo",
    puntos: [
      {
        t: "Desconecta antes de empezar",
        d: "Apaga y desconecta el equipo antes de cualquier mantenimiento, y vacía la tina por completo.",
      },
      {
        t: "Agua y jabón suave, nada más",
        d: "Limpia interior y exterior con un paño o esponja. Nada de productos corrosivos, abrasivos ni cloro: además de dañar el material, su uso anula la garantía.",
      },
      {
        t: "Revisa que no haya moho",
        d: "Verifica el contorno y las uniones. Si aparece, se quita con un trapo húmedo y jabón antes de volver a llenar.",
      },
      {
        t: "Enjuaga y deja secar",
        d: "Enjuaga la tina y las mangueras con agua limpia y déjalas secar al aire antes de volver a llenar.",
      },
    ],
  },
  {
    cuando: "Siempre",
    grupo: "Cuidado del motor",
    puntos: [
      {
        t: "Vertical, sin excepción",
        d: "El motor se transporta y se guarda de pie. Si estuvo acostado, déjalo vertical 24 horas antes de conectarlo para que el gas refrigerante se asiente. Solo aplica a MF Barrel y MF Horizon: la MF ONE lleva su sistema integrado.",
      },
      {
        t: "Bajo techo",
        d: "Los motores no son resistentes al agua. Al aire libre tienen que estar protegidos de la lluvia; la exposición los daña y anula la garantía.",
      },
      {
        t: "Fuera del sol directo",
        d: "El sol constante baja la eficiencia y acorta la vida de los componentes. Sombra y aire circulando alrededor de las rejillas.",
      },
      {
        t: "Cobertor cuando no se usa",
        d: "Cúbrelo para protegerlo del polvo y la humedad, y limpia la malla antipolvo cada tres meses.",
      },
    ],
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

      {/* 3. FAQ */}
      <section className="msection panel">
        <div className="mwrap">
          <SectionHeader
            title="Preguntas frecuentes"
            center
            className="mb-12"
          />
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* 3.5 Instalación & cuidado — videos reales del sitio original */}
      <section className="msection panel" id="instalacion">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Videos oficiales</span>
            <h2>Instalación y cuidado</h2>
            <p>
              Montas tu plunge en 15 a 20 minutos y sin herramientas. Estos son
              los videos oficiales.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="overflow-hidden rounded-[14px] bg-[var(--m-graphite)]">
                <video
                  src="/videos/original/instalacion-mf-one.mp4"
                  controls
                  preload="metadata"
                  playsInline
                  className="aspect-video w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold">MF ONE por dentro</h3>
              <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
                El recorrido del equipo: la tina, el módulo de enfriamiento y el
                portafiltro.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-[14px] bg-[var(--m-graphite)]">
                <video
                  src="/videos/original/instalacion-motor-pro-premium.mp4"
                  controls
                  preload="metadata"
                  playsInline
                  className="aspect-video w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold">
                Cómo inflar tu MF Horizon o MF Barrel
              </h3>
              <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
                Conecta la bomba a la válvula e infla hasta 8 PSI, sin pasarte.
                Después van las mangueras al motor.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="overflow-hidden rounded-[14px] bg-[var(--m-graphite)]">
                <iframe
                  src="https://player.vimeo.com/video/1082020405"
                  title="Cuida tu MF Plunge"
                  allow="fullscreen; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold">Cuida tu MF Plunge</h3>
              <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
                Agua cada 3–5 semanas, filtro en cada cambio, limpieza sin
                abrasivos ni cloro.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Cuida tu plunge ───────────────────────────────────
          Contenido rescatado de mentefria.com/pages/cuida-tu-mf-plunge, que
          en el sitio nuevo se habia perdido: solo quedaba el video. Es
          material que aplica a toda la linea, no a un modelo.

          Dos ajustes sobre el original:
          · El reposo del motor va a 24 horas, que es lo que dice el manual
            v6; la pagina vieja decia 12.
          · Se quito el "estamos disponibles 24/7" del cierre. */}
      <section className="msection" id="cuidado">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Cuida tu plunge</span>
            <h2>Lo que alarga la vida de tu equipo.</h2>
            <p>
              Nada de esto es complicado y todo es la diferencia entre un equipo
              que dura y uno que da problemas. Aplica a la MF ONE y a los dos
              modelos inflables por igual, salvo donde se indique.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {CUIDADOS.map((g, i) => (
              <Reveal
                key={g.grupo}
                delay={(i % 3) * 80}
                className="flex h-full flex-col rounded-[18px] border p-8"
                style={{
                  borderColor: "var(--line-1)",
                  background: "var(--m-white)",
                }}
              >
                <span className="m-eyebrow accent">{g.cuando}</span>
                <h3
                  className="mdisplay mt-3 text-[21px] leading-tight"
                  style={{ color: "var(--fg-metal)" }}
                >
                  {g.grupo}
                </h3>
                <ul className="mt-6 flex-1 space-y-5">
                  {g.puntos.map((pt) => (
                    <li key={pt.t}>
                      <p
                        className="text-[15px] font-semibold leading-snug"
                        style={{ color: "var(--fg-metal)" }}
                      >
                        {pt.t}
                      </p>
                      <p
                        className="mt-1.5 text-[14px] leading-relaxed"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {pt.d}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "var(--fg-subtle)" }}
            >
              No dar el mantenimiento en los tiempos indicados, exponer el motor
              a la lluvia o al sol directo, o usar cloro y limpiadores abrasivos
              dentro de la tina puede anular la garantía.
            </p>
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

            {/* Right — contact card */}
            <Reveal delay={120}>
              <div className="rounded-3xl border border-[var(--line-1)] bg-[var(--bg-panel)] p-8 space-y-6">
                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background border border-[var(--line-1)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-foreground"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.657 1.438 5.168L2.051 21.95l4.902-1.374A9.944 9.944 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.944 7.944 0 01-4.053-1.107l-.29-.173-3.01.843.852-2.93-.19-.301A7.944 7.944 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                    <p className="mt-0.5 text-sm text-[var(--fg-muted)]">+52 56 1647 1386</p>
                    <p className="mt-0.5 text-xs text-[var(--fg-muted)]">Escríbenos a cualquier hora</p>
                  </div>
                </div>

                {/* Correo */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background border border-[var(--line-1)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-foreground"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Correo</p>
                    <p className="mt-0.5 text-sm text-[var(--fg-muted)]">soporte@mentefria.com</p>
                    <p className="mt-0.5 text-xs text-[var(--fg-muted)]">Te respondemos en menos de 24 h</p>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background border border-[var(--line-1)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-foreground"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Horario de atención</p>
                    <p className="mt-0.5 text-sm text-[var(--fg-muted)]">Horario hábil</p>
                    <p className="mt-0.5 text-xs text-[var(--fg-muted)]">Cobertura técnica nacional</p>
                  </div>
                </div>
              </div>
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
