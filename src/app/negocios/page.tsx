import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { QuoteForm } from "./QuoteForm";
import { RoiCalculator } from "./RoiCalculator";

/* ─────────────────────────────────────────────────────────────
   PARA NEGOCIOS — Landing B2B (sistema metal)

   Estructura calcada de la página B2B de Plunge, adaptada a MXN y leasing:
   Hero → Cotización → Verticales (horizontal) → Productos → Calculadora ROI
   → Casos reales → Por qué MF → Leasing (dark) → Proceso → FAQ → CTA final

   Los casos reales SOLO usan datos verificados. Sin métricas inventadas:
   no hay porcentajes de crecimiento ni cifras de ingreso porque no existen
   medidos. Cuando Rafa mande números reales, se agregan aquí.
───────────────────────────────────────────────────────────── */

const QUOTE_BULLETS = [
  "Respuesta en menos de 24 horas hábiles",
  "Cotización con leasing y compra directa",
  "Asesoría con un especialista B2B sin compromiso",
  "Descuentos por volumen disponibles",
];

const BUSINESS_TYPES = [
  {
    num: "01",
    title: "Hoteles",
    body: "Cold plunge integrado al circuito de bienestar en hoteles 5 estrellas de Tulum, CDMX y Los Cabos.",
  },
  {
    num: "02",
    title: "Spas",
    body: "Eleva el ritual de tu spa con inmersión fría comercial. Diferenciándote como destino premium.",
  },
  {
    num: "03",
    title: "Centros Wellness",
    body: "Complementa tu oferta de longevidad, biohacking y recuperación con la cold plunge líder del mercado.",
  },
  {
    num: "04",
    title: "Gimnasios",
    body: "Diferénciate de la cadena con un beneficio premium que justifica membresías más altas.",
  },
  {
    num: "05",
    title: "Estudios de Wellness",
    body: "Yoga, pilates, breathwork y meditación. Cierra cada clase con inmersión fría de grado comercial.",
  },
  {
    num: "06",
    title: "CrossFit Boxes",
    body: "Recuperación post-WOD validada por atletas. Aumenta retención y add-ons en tu box.",
  },
  {
    num: "07",
    title: "Clínicas y Fisioterapia",
    body: "Crioterapia y recuperación para medicina deportiva, fisioterapia y rehabilitación.",
  },
  {
    num: "08",
    title: "Equipos Deportivos",
    body: "Solución de recuperación para clubes profesionales, academias y centros de alto rendimiento.",
  },
];

const PRODUCTS = [
  {
    name: "MF Barrel",
    image: "/images/prod-barrel.jpg",
    price: "$69,000 MXN",
    body: "Sistema de 3 filtros + purificación por ozono. Control WiFi programable. 6 meses de garantía.",
    href: "/productos/mf-barrel",
  },
  {
    name: "MF Horizon",
    image: "/images/prod-horizon.jpg",
    price: "$74,000 MXN",
    body: "Sistema de 3 filtros + purificación por ozono. Control WiFi programable. 6 meses de garantía.",
    href: "/productos/mf-horizon",
  },
  {
    name: "MF ONE",
    image: "/images/prod-mfone.webp",
    price: "$169,000 MXN",
    body: "Diseño All-In-One con el chiller dentro de la tina. Filtro de papel + ozono integrado. 12 meses de garantía, válida para uso comercial.",
    href: "/productos/mf-one",
  },
];

/* Casos reales — datos verificados en las reglas de negocio del proyecto. */
const CASO_HYROX = {
  cliente: "Hyrox Cancún 2026",
  rol: "Recovery Zone oficial",
  sede: "Malecón Tajamar",
  imagen: "/images/caso-hyrox-01.jpg",
  body: "Mente Fria operó la Recovery Zone oficial de Hyrox Cancún 2026 en el Malecón Tajamar: carpa de atletas montada en sede, coach de inmersión en sitio durante todo el evento y cerca de 20,000 litros de agua fría en operación continua.",
  datos: [
    ["Recovery Zone", "Oficial del evento"],
    ["Agua en operación", "~20,000 L"],
    ["Sede", "Malecón Tajamar"],
    ["Acompañamiento", "Coach en sitio"],
  ],
  nota: "Edición CDMX en negociación.",
};

/* Casa Polanco se eliminó en sep 2026: el proyecto NO se llevó a cabo. Estaba
   publicado como caso real con "60 días de inmersiones", lo cual era falso.
   No volver a agregarlo. */
const CASOS = [
  {
    cliente: "Westin Santa Fe",
    rol: "Activación de marca",
    fecha: "Junio 2026",
    body: "Activación con creadores de contenido en el Westin Santa Fe: los equipos Mente Fria como pieza central de la experiencia de recuperación dentro de un hotel de ciudad.",
  },
];

const WHY_BLOCKS = [
  {
    num: "01",
    tag: "Cold plunge comercial",
    title: "Diseñado para operación intensiva",
    body: "Construido para resistir el uso diario de gimnasios, hoteles y centros de recuperación. Componentes de grado comercial probados en más de 100 instalaciones activas en México.",
    bullets: [
      "Chiller industrial con capacidad de enfriamiento continuo",
      "Filtración de 3 etapas + purificación por ozono",
    ],
  },
  {
    num: "02",
    tag: "Soporte real, personas reales",
    title: "Soporte 24/7 desde México",
    body: "Equipo técnico mexicano disponible por teléfono y WhatsApp. Tiempo de respuesta promedio menor a 2 horas. Sin call centers ni tickets eternos. Hablas con alguien que conoce tu equipo desde el primer minuto.",
    bullets: [
      "Atención 100% en español, sin chatbots",
      "WhatsApp directo con técnico asignado",
    ],
  },
  {
    num: "03",
    tag: "App Mente Fria",
    title: "Monitoreo remoto en tiempo real",
    body: "Dashboard centralizado para administrar uno o varios equipos desde tu celular. Temperatura, ciclos de filtración, ozono y alertas de mantenimiento, con control total desde donde estés.",
    bullets: [
      "Monitoreo multi-sucursal con un solo login",
      "Alertas push cuando algo necesita atención",
    ],
  },
];

const LEASING_STATS = [
  {
    value: "100%",
    label: "Beneficio fiscal",
    body: "Renta deducible al 100%. Aprovecha el beneficio fiscal del leasing según el régimen aplicable a tu empresa.",
  },
  {
    value: "5%",
    label: "Valor residual",
    body: "Opción de compra al final del plazo con solo 5% del valor del equipo.",
  },
  {
    value: "24",
    label: "Hasta 24 meses",
    body: "Elige el plazo que se ajuste a tu flujo de caja: 12 o 24 mensualidades.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Cotización personalizada",
    body: "Llenas el formulario, Rafa te contacta en menos de 24 horas hábiles y arma tu propuesta con modelo recomendado, plan de leasing y proyección de ROI.",
  },
  {
    num: "02",
    title: "Aprobación crediticia",
    body: "Integramos juntos el expediente de leasing (RFC, comprobantes, estados financieros). Aprobación en 3 a 7 días hábiles sin tocar tu línea bancaria.",
  },
  {
    num: "03",
    title: "Entrega e instalación",
    body: "Coordinamos entrega a nivel nacional. Plug-and-play: no requiere obra civil. Tu equipo queda operando el mismo día de la entrega.",
  },
  {
    num: "04",
    title: "Capacitación y soporte",
    body: "Entrenamos a tu staff en operación, limpieza y protocolos de seguridad. Soporte técnico 24/7 incluido durante todo el plazo del leasing.",
  },
];

const FAQ_ITEMS = [
  {
    q: "¿Cómo funciona el esquema de leasing y su beneficio fiscal?",
    a: "Adquieres el equipo a 12 o 24 meses con un anticipo del 10% más una comisión de apertura del 2%. Al final del plazo ejerces la opción de compra con un valor residual del 5%. La renta mensual es deducible al 100% según el régimen fiscal aplicable a tu empresa — consulta con tu contador el tratamiento exacto para tu caso.",
  },
  {
    q: "¿Necesito buró de crédito empresarial?",
    a: "Realizamos una evaluación crediticia sencilla con tu RFC, comprobantes y estados financieros. La aprobación toma de 3 a 7 días hábiles y no toca tu línea de crédito bancaria.",
  },
  {
    q: "¿Incluye instalación y entrega?",
    a: "Sí. Coordinamos entrega a nivel nacional y los equipos son plug-and-play: no requieren obra civil ni plomería. Tu equipo queda operando el mismo día de la entrega.",
  },
  {
    q: "¿Qué pasa si necesito soporte durante el leasing?",
    a: "El soporte técnico 24/7 desde México está incluido durante todo el plazo del leasing. Tienes WhatsApp directo con un técnico asignado que conoce tu equipo, con tiempo de respuesta promedio menor a 2 horas.",
  },
  {
    q: "¿Puedo adquirir varias unidades para múltiples sucursales?",
    a: "Sí. Ofrecemos descuentos por volumen para proyectos multi-unidad y la app Mente Fria te permite monitorear todas tus sucursales desde un solo login, con alertas y control centralizado.",
  },
  {
    q: "¿Qué modelo me conviene según el uso?",
    a: "MF Barrel es ideal para espacios compactos, MF Horizon ofrece mayor espacio de inmersión, y MF ONE es la opción de grado comercial all-in-one para operación intensiva. Un especialista B2B te recomienda el modelo según el flujo de usuarios de tu negocio.",
  },
];

export default function NegociosPage() {
  return (
    <PageShell>
      {/* ── 1. HERO ────────────────────────────────────────────
          Foto luminosa del Barrel en el campo de golf con overlay ligero,
          en lugar del render oscuro anterior. Punto ① de Rafa.          */}
      <section className="relative flex min-h-[78vh] items-center overflow-hidden">
        <Image
          src="/images/barrel-golf-wide.jpg"
          alt="MF Barrel instalado al aire libre en un campo de golf"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay ligero: mantiene la foto luminosa y a la vez sostiene el
            texto. La capa vertical rescata el eyebrow, que caía sobre pasto. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(180deg, rgba(8,9,11,0.42) 0%, rgba(8,9,11,0.06) 44%, rgba(8,9,11,0) 60%)",
              "linear-gradient(95deg, rgba(8,9,11,0.68) 0%, rgba(8,9,11,0.44) 38%, rgba(8,9,11,0.10) 78%, rgba(8,9,11,0.02) 100%)",
            ].join(", "),
          }}
        />
        <div className="mwrap relative z-10 py-24 text-white">
          <Reveal>
            {/* Azul claro como el eyebrow del hero del landing (#8FBEE6):
                misma convención del sistema y contrasta sobre el pasto. */}
            <span
              className="m-eyebrow"
              style={{
                color: "var(--m-blue-400)",
                textShadow: "0 1px 12px rgba(0,0,0,0.6)",
              }}
            >
              Cold Plunge #1 en México
            </span>
            <h1
              className="mdisplay mb-6 mt-5 max-w-[16ch] text-[clamp(38px,5.6vw,84px)] text-white"
              style={{
                WebkitTextStroke: "var(--bold-stroke) currentColor",
                textShadow: "0 2px 24px rgba(0,0,0,0.28)",
              }}
            >
              Usa el wellness para incrementar las utilidades de tu negocio
            </h1>
            <p
              className="mb-9 max-w-[46ch] text-[17px] text-white/90"
              style={{ textShadow: "0 1px 14px rgba(0,0,0,0.5)" }}
            >
              La cold-plunge comercial #1 en México.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#cotizar" className="mbtn mbtn-solid-light">
                Cotiza ahora
              </a>
              <a href="#roi" className="mbtn mbtn-ghost text-white">
                Calcular mi ROI
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. COTIZACIÓN B2B ──────────────────────────────────
          Sección que Rafa dejó tal cual (punto ②): mismo contenido,
          solo trasladada al sistema metal.                              */}
      <section id="cotizar" className="msection panel scroll-mt-20">
        <div className="mwrap">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="m-eyebrow accent">Cotización B2B</span>
              <h2
                className="mdisplay mb-6 mt-4 text-[clamp(28px,3.6vw,50px)]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                Recibe tu plan personalizado en 24 horas
              </h2>
              <p
                className="mb-8 max-w-[52ch] text-[16px] leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                Cuéntanos sobre tu negocio y te enviamos una propuesta con el
                modelo recomendado, plan de leasing personalizado y proyección
                de ROI.
              </p>
              <ul className="space-y-4">
                {QUOTE_BULLETS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full"
                      style={{ background: "var(--accent-ice)" }}
                    />
                    <span className="text-[15.5px]" style={{ color: "var(--fg-metal)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. VERTICALES — FORMATO HORIZONTAL ─────────────────
          Punto ④: las 8 verticales pasan de rejilla de 4 columnas a
          bandas horizontales de ancho completo, estilo editorial.       */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Para todo tipo de negocio</span>
            <h2>Diseñado para los espacios más exigentes de México</h2>
            <p>
              De hoteles 5 estrellas a gimnasios boutique, spas, centros
              wellness y equipos profesionales. Mente Fria se adapta a la
              operación premium de cada espacio.
            </p>
          </Reveal>

          <div style={{ borderBottom: "1px solid var(--line-1)" }}>
            {BUSINESS_TYPES.map((b, i) => (
              <Reveal
                key={b.num}
                delay={(i % 4) * 60}
                className="grid items-baseline gap-x-8 gap-y-2 py-7 md:grid-cols-[84px_minmax(0,260px)_minmax(0,1fr)]"
                style={{ borderTop: "1px solid var(--line-1)" }}
              >
                <span
                  className="mdisplay text-[34px] leading-none"
                  style={{ color: "var(--fg-subtle)" }}
                >
                  {b.num}
                </span>
                <h3
                  className="mdisplay text-[23px] leading-tight"
                  style={{
                    color: "var(--fg-metal)",
                    WebkitTextStroke: "var(--bold-stroke) currentColor",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  className="max-w-[70ch] text-[15px] leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {b.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCTOS ───────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Los equipos</span>
            <h2>Encuentra la cold plunge perfecta para tu negocio</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={(i % 3) * 80}
                className="relative flex flex-col overflow-hidden rounded-[18px] border"
                style={{
                  borderColor: "var(--line-1)",
                  background: "var(--m-white)",
                }}
              >
                <div
                  className="relative aspect-[4/3] w-full"
                  style={{ background: "var(--grad-silver)" }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="m-eyebrow accent">{p.price}</p>
                  <h3
                    className="mdisplay mt-2 text-[22px]"
                    style={{
                      color: "var(--fg-metal)",
                      WebkitTextStroke: "var(--bold-stroke) currentColor",
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="mt-3 flex-1 text-[14px] leading-relaxed"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {p.body}
                  </p>
                  <span
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: "var(--fg-metal)" }}
                  >
                    Ver detalles
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                {/* Stretched link: la card completa es clickeable */}
                <Link
                  href={p.href}
                  className="absolute inset-0 z-[5]"
                  aria-label={`Ver detalles de ${p.name}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CALCULADORA ROI ─────────────────────────────────
          Punto ③: misma matemática por inmersión + gráfica de ingreso
          acumulado contra costo, con el punto de equilibrio marcado.    */}
      <section id="roi" className="msection scroll-mt-20">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Calculadora ROI</span>
            <h2>Calcula cuándo recuperas tu inversión</h2>
            <p>
              Simula tu retorno con base en el modelo, el plazo del leasing y
              cuántas inmersiones cobras al día. Los números y la gráfica se
              actualizan en tiempo real.
            </p>
          </Reveal>
          <RoiCalculator />
        </div>
      </section>

      {/* ── 6. CASOS REALES ────────────────────────────────────
          Punto ⑥. Solo datos verificados: sin porcentajes ni cifras de
          ingreso, porque no existen medidos. Falta foto de Westin y
          Westin — Saul las va a conseguir.                            */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Casos reales</span>
            <h2>Dónde ya está operando Mente Fria</h2>
            <p>
              Eventos deportivos, hotelería y espacios de experiencia. Estos son
              proyectos reales, con equipos y personas de Mente Fria en sitio.
            </p>
          </Reveal>

          {/* Caso destacado — Hyrox Cancún */}
          <Reveal
            className="overflow-hidden rounded-[20px] border"
            style={{
              borderColor: "var(--line-1)",
              background: "var(--m-white)",
            }}
          >
            <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div
                className="relative min-h-[320px] lg:min-h-[520px]"
                style={{ background: "var(--m-graphite)" }}
              >
                <Image
                  src={CASO_HYROX.imagen}
                  alt="Recovery Zone de Mente Fria en Hyrox Cancún 2026"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-11">
                <span className="m-eyebrow accent">{CASO_HYROX.rol}</span>
                <h3
                  className="mdisplay mt-4 text-[clamp(26px,3vw,40px)]"
                  style={{
                    color: "var(--fg-metal)",
                    WebkitTextStroke: "var(--bold-stroke) currentColor",
                  }}
                >
                  {CASO_HYROX.cliente}
                </h3>
                <p
                  className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {CASO_HYROX.body}
                </p>

                <dl
                  className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[14px]"
                  style={{ background: "var(--line-1)" }}
                >
                  {CASO_HYROX.datos.map(([k, v]) => (
                    <div
                      key={k}
                      className="p-5"
                      style={{ background: "var(--m-white)" }}
                    >
                      <dt className="m-eyebrow">{k}</dt>
                      <dd
                        className="mt-2 text-[15px] font-semibold"
                        style={{ color: "var(--fg-metal)" }}
                      >
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-xs" style={{ color: "var(--fg-subtle)" }}>
                  {CASO_HYROX.nota}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Westin Santa Fe */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {CASOS.map((c, i) => (
              <Reveal
                key={c.cliente}
                delay={i * 80}
                className="flex flex-col rounded-[18px] border p-8 sm:p-10"
                style={{
                  borderColor: "var(--line-1)",
                  background: "var(--m-white)",
                }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="m-eyebrow accent">{c.rol}</span>
                  <span className="m-eyebrow">{c.fecha}</span>
                </div>
                <h3
                  className="mdisplay mt-4 text-[26px]"
                  style={{
                    color: "var(--fg-metal)",
                    WebkitTextStroke: "var(--bold-stroke) currentColor",
                  }}
                >
                  {c.cliente}
                </h3>
                <p
                  className="mt-4 text-[15px] leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {c.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. POR QUÉ MENTE FRIA ──────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head !mx-0 !text-left">
            <span className="m-eyebrow accent">Por qué Mente Fria</span>
            <h2>El #1 Cold Plunge Comercial en México</h2>
            <p className="!mx-0">
              Soporte 24/7, garantía extendida, app de monitoreo y diseño
              pensado para operación intensiva. Todo lo que necesitas para
              escalar sin sobresaltos.
            </p>
          </Reveal>
          <div className="space-y-5">
            {WHY_BLOCKS.map((w, i) => (
              <Reveal
                key={w.num}
                delay={i * 80}
                className="rounded-[18px] border p-8 sm:p-10"
                style={{
                  borderColor: "var(--line-1)",
                  background: "var(--m-white)",
                }}
              >
                <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
                  <p
                    className="mdisplay text-[44px] leading-none"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    {w.num}
                  </p>
                  <div>
                    <span className="m-eyebrow accent">{w.tag}</span>
                    <h3
                      className="mdisplay mt-3 text-[26px]"
                      style={{
                        color: "var(--fg-metal)",
                        WebkitTextStroke: "var(--bold-stroke) currentColor",
                      }}
                    >
                      {w.title}
                    </h3>
                    <p
                      className="mt-4 max-w-[72ch] text-[15.5px] leading-relaxed"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {w.body}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {w.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-[8px] h-1.5 w-1.5 flex-none rounded-full"
                            style={{ background: "var(--accent-ice)" }}
                          />
                          <span
                            className="text-[14px]"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. LEASING (dark) ──────────────────────────────────── */}
      <section className="msection dark-s">
        <div className="mwrap">
          <Reveal className="max-w-3xl">
            <span className="m-eyebrow accent">Leasing Mente Fria</span>
            <h2
              className="mdisplay mt-4 text-[clamp(28px,3.6vw,50px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              Beneficio fiscal para tu empresa. Sin descapitalizarte.
            </h2>
            <p
              className="mt-5 text-[16px] leading-relaxed"
              style={{ color: "var(--on-dark-muted)" }}
            >
              Adquiere tu equipo a 12 o 24 meses sin descapitalizarte. Al final
              del plazo, ejerces opción de compra con valor residual del 5%. Sin
              tocar tu línea de crédito bancaria.
            </p>
          </Reveal>

          <div
            className="mt-14 grid gap-10 pt-12 sm:grid-cols-3"
            style={{ borderTop: "1px solid var(--on-dark-line)" }}
          >
            {LEASING_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <p
                  className="mdisplay text-[clamp(44px,6vw,76px)] leading-none text-white"
                  style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                >
                  {s.value}
                </p>
                <p
                  className="m-eyebrow mt-4"
                  style={{ color: "var(--on-dark-subtle)" }}
                >
                  {s.label}
                </p>
                <p
                  className="mt-3 text-[14px] leading-relaxed"
                  style={{ color: "var(--on-dark-muted)" }}
                >
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 pt-8"
            style={{ borderTop: "1px solid var(--on-dark-line)" }}
          >
            {[
              ["Anticipo", "10%"],
              ["Valor residual", "5%"],
              ["Comisión apertura", "2%"],
            ].map(([label, value]) => (
              <p
                key={label}
                className="m-eyebrow"
                style={{ color: "var(--on-dark-subtle)" }}
              >
                {label}{" "}
                <span className="ml-1 font-semibold text-white">{value}</span>
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-10">
            <a href="#roi" className="mbtn mbtn-solid-light">
              Calcular mi ROI
              <ArrowRight className="h-4 w-4" />
            </a>
            <p
              className="mt-6 max-w-2xl text-xs leading-relaxed"
              style={{ color: "var(--on-dark-subtle)" }}
            >
              Montos en pesos mexicanos. Sujeto a aprobación crediticia. Cifras
              informativas. El tratamiento fiscal del leasing depende del
              régimen contable elegido; consulta a tu contador.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 9. PROCESO ─────────────────────────────────────────
          Punto ⑦: números grandes en bold, con flechas entre pasos.    */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Proceso paso a paso</span>
            <h2>Así de simple es equipar tu negocio</h2>
            <p>
              De la primera llamada a tu equipo operando: proceso transparente
              en menos de 3 semanas.
            </p>
          </Reveal>

          <div className="grid gap-y-10 lg:grid-cols-[repeat(4,minmax(0,1fr))] lg:gap-x-6">
            {PROCESS_STEPS.map((s, i) => (
              <Fragment key={s.num}>
                <Reveal delay={i * 80} className="relative">
                  <p
                    className="mdisplay text-[clamp(58px,7vw,92px)] leading-[0.85]"
                    style={{
                      color: "var(--fg-metal)",
                      WebkitTextStroke: "1px currentColor",
                    }}
                  >
                    {s.num}
                  </p>
                  <h3
                    className="mdisplay mt-5 text-[20px]"
                    style={{
                      color: "var(--fg-metal)",
                      WebkitTextStroke: "var(--bold-stroke) currentColor",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-3 text-[14px] leading-relaxed"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {s.body}
                  </p>

                  {/* Flecha hacia el siguiente paso */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -right-5 top-[26px] hidden lg:block"
                      style={{ color: "var(--accent-ice)" }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </span>
                  )}
                </Reveal>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ B2B ────────────────────────────────────────
          Punto ⑧: variante `bold` del acordeón.                        */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Preguntas frecuentes B2B</span>
            <h2>Todo lo que necesitas saber antes de cotizar</h2>
          </Reveal>
          <FAQ items={FAQ_ITEMS} bold />
        </div>
      </section>

      {/* ── 11. CTA FINAL (dark) ───────────────────────────────── */}
      <section className="msection dark-s">
        <div className="mwrap text-center">
          <Reveal className="mx-auto max-w-2xl">
            <span className="m-eyebrow accent">Mente Fria para Negocios</span>
            <h2
              className="mdisplay mt-4 text-[clamp(28px,3.8vw,54px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              Equipa tu espacio con la tecnología de recuperación que ya usan
              las marcas más exigentes de México.
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="#cotizar" className="mbtn mbtn-solid-light">
                Cotiza ahora
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/productos" className="mbtn mbtn-ghost text-white">
                Ver productos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
