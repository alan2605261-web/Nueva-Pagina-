import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { AccessoryCard } from "@/components/AccessoryCard";
import { ProductOptionsProvider, ProductStage, ColorPicker, ShieldAddon, ConfigTotal } from "@/components/ProductOptions";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { MotorPicker } from "@/components/MotorPicker";
import {
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Plus,
  Wind,
  Droplets,
  Package,
  Luggage,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   MF BARREL — Página de Detalle de Producto (PDP) · sistema "metal"
   Estructura: Hero → Stats (dark) → Elige tu motor → Portabilidad →
   Accesorios → Beneficios → Specs → FAQ → CTA (dark)
───────────────────────────────────────────────────────────── */

const WHATSAPP = "https://wa.me/5215616471386";

const FAQ_ITEMS = [
  {
    q: "¿Dónde puedo instalar el MF Barrel?",
    a: "Donde quieras: con 90 cm de diámetro cabe en un balcón, una terraza o un rincón del departamento. No requiere obra ni plomería — se infla en menos de 15 minutos con la bomba de doble acción incluida, se llena con manguera y se conecta a un contacto estándar. Idealmente bajo techo, protegida del sol directo y la lluvia.",
  },
  {
    q: "¿Necesito hielo?",
    a: "No. Con el motor conectado, el agua baja hasta 3 °C sin un solo hielo. Programa la temperatura desde la app y el MF Barrel te espera lista a tu hora.",
  },
  {
    q: "¿Qué motor me conviene: Pro 2.0 o Premium 2.0?",
    a: "El Motor Pro 2.0 (0.8 HP) es la puerta de entrada: enfría de 25 a 3 °C en aproximadamente 6 horas, con filtración de 3 capas y control WiFi. El Motor Premium 2.0 (1 HP) hace todo lo anterior más rápido (~4 horas), y suma calefacción y ajuste de 1 a 40 °C y purificación por ozono 24/7. Si quieres contraste frío-calor y agua sin cloro de alberca, elige Premium.",
  },
  {
    q: "¿Cada cuánto cambio el agua y los filtros?",
    a: "Con la filtración trabajando, el agua se mantiene en buen estado entre 3 y 5 semanas según el uso. Cada cambio de agua incluye cambio de filtro — el proceso es sencillo y no requiere técnico. El sistema es de 3 capas: filtro de papel, filtro integrado y malla antipolvo.",
  },
  {
    q: "¿El ozono sustituye al cloro?",
    a: "Sí. Con el Motor Premium 2.0, el sistema de ozono esteriliza el agua 24/7 sin cloro de alberca: agua cristalina, sin olor y amigable con la piel.",
  },
  {
    q: "¿Cuánto cuesta el envío?",
    a: "El envío del MF Barrel cuesta $1,500 MXN a todo México. Al ser inflable y compacto, llega en paquetería estándar — sin maniobras especiales.",
  },
  {
    q: "¿Qué garantía tiene?",
    a: "Seis meses de garantía por defectos de fabricación, y antes de eso 30 días de prueba: si no es la mejor cold plunge que has probado, te reembolsamos. Terminada la garantía sigues teniendo a quién escribirle.",
  },
];

/* Specs de mentefria.com/products/mf-barrel-1 */
const SPEC_ROWS = [
  { label: "Dimensiones", value: "Ø 90 × 90 cm" },
  { label: "Volumen", value: "500 L máximo · 350 L recomendado" },
  { label: "Peso (tina)", value: "11 kg" },
  { label: "Material", value: "Tejido drop-stitch de grado militar" },
  { label: "Estructura", value: "Inflable de alta presión con cámara de aire aislante" },
  { label: "Inflado", value: "Menos de 15 min con bomba de doble acción incluida" },
  { label: "Filtración", value: "Filtración de 3 capas: filtro de papel, filtro integrado y malla antipolvo" },
  { label: "Desinfección", value: "Ozono 24/7 (con Motor Premium 2.0)" },
  { label: "Enfriamiento", value: "Hasta 3 °C, sin hielo" },
  { label: "Calentamiento", value: "De 1 a 40 °C (con Motor Premium 2.0)" },
  { label: "Motores compatibles", value: "Motor Pro 2.0 (0.8 HP) · Motor Premium 2.0 (1 HP)" },
  { label: "Motor (dimensiones)", value: "Pro 400 × 340 × 350 mm · 30 kg · Premium 619 × 402 × 475 mm · 41.5 kg" },
  { label: "Pantalla y control", value: "WiFi + app (temperatura y horarios)" },
  { label: "Voltaje", value: "110 V" },
  { label: "Garantía", value: "6 meses" },
  { label: "Envío", value: "$1,500 MXN a todo México" },
];

const HERO_BULLETS = [
  "Enfría hasta 3 °C sin hielo — la portátil más potente de México",
  "Compacta: Ø 90 cm, ideal para departamentos y espacios reducidos",
  "Filtración de 3 capas + purificación por ozono",
  "Control WiFi programable desde tu celular.",
  "6 meses de garantía.",
];

const PORTABILITY_STEPS = [
  {
    icon: Wind,
    t: "Ínflala en menos de 15 min",
    d: "Con la bomba de doble acción incluida. Sin herramientas, sin obra, sin plomería.",
  },
  {
    icon: Droplets,
    t: "Llénala y conecta",
    d: "Se llena con manguera y se conecta a un contacto estándar. El motor hace el resto.",
  },
  {
    icon: Package,
    t: "Desínflala y guárdala",
    d: "¿Terminó la temporada o cambias de casa? Se desinfla y cabe en la mochila de transporte incluida.",
  },
  {
    icon: Luggage,
    t: "Viaja con ella",
    d: "11 kg de tina. Llévala a tu casa de vacaciones o contigo en la mudanza — tu rutina de frío no se queda atrás.",
  },
];

const ACCESSORIES = [
  {
    t: "Mochila de transporte",
    p: "La tina completa cabe adentro — guárdala o llévala a donde vayas.",
    img: null,
  },
  {
    t: "Bomba de doble acción",
    p: "Infla tu MF Barrel en menos de 15 minutos, sin herramientas.",
    img: null,
  },
  {
    t: "Cubierta protectora",
    p: "Térmica y con seguro para niños — conserva la temperatura y mantiene el agua limpia.",
    img: null,
  },
  {
    t: "Sistema de filtrado",
    p: "Filtro de papel, filtro integrado y malla antipolvo — agua cristalina desde el día uno.",
    img: null,
  },
  {
    t: "Kit de reparación",
    p: "Herramientas básicas incluidas para mantener tu equipo como nuevo.",
    img: null,
  },
];

export default function MFBarrelPage() {
  return (
    <PageShell>
      <div className="bg-[var(--bg-metal)] text-[var(--fg-metal)]">

        {/* ── 1. PRODUCT HERO ─────────────────────────────────── */}
        <section className="msection !pt-[clamp(40px,6vh,80px)]">
          <div className="mwrap">
            <ProductOptionsProvider
              producto="mf-barrel"
              basePrice={69000}
              variants={[
                { color: "Negro", images: ["/images/pdp-barrel-negro.png"] },
                { color: "Blanco", images: ["/images/pdp-barrel-blanco.png"] },
              ]}
            >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

              {/* LEFT — celda estirada con stage sticky interno (estilo Plunge/Apple) */}
              <Reveal className="lg:h-full">
                <div className="lg:sticky lg:top-24">
                  <ProductStage alt="MF Barrel — cold plunge portátil inflable" />
                </div>
              </Reveal>

              {/* RIGHT — copy + CTAs */}
              <Reveal delay={80}>
                <div>
                  <span className="m-eyebrow accent">MF Barrel · Portátil</span>
                  <h1 className="mdisplay mt-4 text-[clamp(44px,5.5vw,76px)]" style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}>
                    MF BARREL
                  </h1>

                  {/* Price */}
                  <div className="mt-5 flex flex-wrap items-baseline gap-2">
                    <span className="mdisplay text-[clamp(34px,3.6vw,50px)]">$69,000</span>
                    <span className="text-lg text-[var(--fg-muted)]">MXN</span>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                    Precio no incluye IVA · Hasta 6 MSI con Mercado Pago
                  </p>

                  <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[var(--fg-muted)]">
                    La cold plunge portátil más potente de México. Se infla, se llena y se enfría — donde tú quieras.
                  </p>

                  {/* Bullet highlights */}
                  <ul className="mt-8 space-y-3">
                    {HERO_BULLETS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-ice)]" />
                        <span className="text-[15px] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Color (patrón Plunge: opciones arriba del CTA) */}
                  <ColorPicker />

                  {/* Garantía extendida MF Shield */}
                  <ShieldAddon />

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="https://mentefria.com/products/mf-barrel-1" target="_blank" rel="noopener noreferrer" className="mbtn mbtn-primary">
                      Agregar al carrito
                    </a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-ghost">
                      Agendar demo
                    </a>
                  </div>

                  <ConfigTotal />

                  {/* Acordeones estilo Plunge */}
                  <div className="mt-7 space-y-2.5">
                    {[
                      {
                        t: "Detalles del producto",
                        c: "Ø 90 × 90 cm · 500 L máximo, 350 L recomendado · 11 kg. Tejido drop-stitch de grado militar, con cámara de aire aislante que conserva la temperatura. Enfría hasta 3 °C sin hielo; con Motor Premium 2.0 también ajusta de 1 a 40 °C y purifica con ozono. Control WiFi desde la app.",
                      },
                      {
                        t: "Qué incluye",
                        c: "Mochila de transporte, bomba de inflado de doble acción (infla en menos de 15 minutos), cubierta protectora térmica con seguro para niños, filtros de repuesto y kit de reparación. Todo en la caja, sin compras extra.",
                      },
                      {
                        t: "Envío y entrega",
                        c: "$1,500 MXN a todo México. Al ser inflable y compacto, el MF Barrel viaja en paquetería estándar — sin maniobras especiales ni accesos complicados.",
                      },
                      {
                        t: "Prueba, garantía y devoluciones",
                        c: "30 días de prueba sin preguntas: si no es la mejor cold plunge que has probado, te reembolsamos. Garantía de 6 meses por defectos de fabricación. Vencida, la atención no se corta.",
                      },
                    ].map((a) => (
                      <details key={a.t} className="group rounded-[14px] border border-[var(--line-1)] bg-white">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-semibold [&::-webkit-details-marker]:hidden">
                          {a.t}
                          <Plus size={18} className="flex-none text-[var(--accent-ice)] transition-transform duration-300 group-open:rotate-45" />
                        </summary>
                        <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{a.c}</p>
                      </details>
                    ))}
                  </div>

                  {/* Trust cards (formato Eight Sleep/Plunge) */}
                  <div className="mt-7 grid grid-cols-3 gap-3">
                    {[
                      { icon: RotateCcw, t: "30 días de prueba", d: "Sin preguntas: te reembolsamos." },
                      { icon: ShieldCheck, t: "Garantía 6 meses", d: "Contra defectos de fábrica." },
                      { icon: CreditCard, t: "Hasta 6 MSI", d: "Con Mercado Pago." },
                    ].map((b) => (
                      <div key={b.t} className="rounded-[14px] border border-[var(--line-1)] bg-white p-4 text-center">
                        <b.icon size={20} strokeWidth={1.8} className="mx-auto text-[var(--accent-ice)]" />
                        <div className="mt-2 text-[12.5px] font-semibold leading-tight">{b.t}</div>
                        <div className="mt-1 text-[11px] leading-snug text-[var(--fg-muted)]">{b.d}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </Reveal>
            </div>
            </ProductOptionsProvider>
          </div>
        </section>

        {/* ── 2. STATS (dark) ─────────────────────────────────── */}
        <section className="msection panel">
          <div className="mwrap">
            <div className="stats-wrap">
              <Reveal className="stats-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/barrel-studio-tapa.jpg"
                  alt="MF Barrel en estudio — colocando la cubierta térmica"
                  className="!object-cover !p-0"
                />
              </Reveal>
              <Reveal>
                <span className="m-eyebrow accent">Por qué MF Barrel</span>
                <h2
                  className="mdisplay my-[14px] mb-8 text-[clamp(28px,3.5vw,48px)]"
                  style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                >
                  La diferencia.
                </h2>
                <div className="stats-grid">
                  <div className="stat">
                    <div className="n n-cold">3<span className="u">°C</span></div>
                    <div className="l">Temperatura mínima alcanzable, sin un solo hielo.</div>
                  </div>
                  <div className="stat">
                    <div className="n n-heat">42<span className="u">°C</span></div>
                    <div className="l">Calentamiento hasta jacuzzi mode con Motor Premium 2.0.</div>
                  </div>
                  <div className="stat">
                    <div className="n">15<span className="u">min</span></div>
                    <div className="l">De la mochila al agua: se infla con la bomba de doble acción incluida. Cabe en un balcón o departamento.</div>
                  </div>
                  <div className="stat">
                    <div className="n">3<span className="u">filtros</span></div>
                    <div className="l">Filtro de papel, filtro integrado y malla antipolvo, más ozono. Agua cristalina, sin cloro de alberca.</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. ELIGE TU MOTOR (compartido) ──────────────────── */}
        <MotorPicker productName="MF Barrel" />

        {/* ── 4. PORTABILIDAD ─────────────────────────────────── */}
        <section className="msection">
          <div className="mwrap">
            <Reveal className="msection-head">
              <span className="m-eyebrow accent">Portabilidad</span>
              <h2>Llévala a donde quieras.</h2>
              <p>
                Es la ventaja del MF Barrel sobre cualquier tina rígida: inflable
                premium de alta presión, 11 kg de tina y una mochila donde cabe todo.
                Tu cold plunge se muda contigo.
              </p>
            </Reveal>
            <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PORTABILITY_STEPS.map((s, i) => (
                <article key={s.t} className="rounded-[16px] border border-[var(--line-1)] bg-[var(--m-white)] p-6">
                  <div className="flex items-center justify-between">
                    <s.icon size={22} strokeWidth={1.8} className="text-[var(--accent-ice)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[15px] font-semibold leading-snug">{s.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--fg-muted)]">{s.d}</p>
                </article>
              ))}
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-5 grid gap-5 overflow-hidden sm:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/barrel-golf-wide.jpg"
                  alt="MF Barrel en el campo de golf, junto a la bolsa de palos"
                  className="h-[320px] w-full rounded-[18px] object-cover sm:h-[420px]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/barrel-retrato-moody.jpg"
                  alt="MF Barrel — inmersión en frío"
                  className="h-[320px] w-full rounded-[18px] object-cover sm:h-[420px]"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 5. ACCESORIOS INCLUIDOS (formato Plunge) ────────── */}
        <section className="msection panel">
          <div className="mwrap">
            <Reveal className="msection-head">
              <span className="m-eyebrow accent">Accesorios incluidos</span>
              <h2>Todo incluido, desde el día uno.</h2>
              <p>Sin compras extra ni sorpresas: el MF Barrel llega completo y listo para inflarse.</p>
            </Reveal>
            <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ACCESSORIES.map((a, i) => (
                <AccessoryCard key={a.t} a={a} index={i} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 6. BENEFICIOS CIENTÍFICAMENTE PROBADOS (real mentefria.com) ── */}
        <BenefitsCarousel />

        {/* ── 7. SPEC TABLE ───────────────────────────────────── */}
        <section className="msection panel scroll-mt-20" id="ficha-tecnica">
          <div className="mwrap">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
              {/* Left — sticky header */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <span className="m-eyebrow accent">Ficha técnica</span>
                  <h2
                    className="mdisplay mt-3 text-[clamp(30px,4vw,52px)]"
                    style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                  >
                    Especificaciones
                  </h2>
                  <p className="mt-4 max-w-[40ch] text-[15px] text-[var(--fg-muted)]">
                    Todo lo que necesitas saber antes de tomar la decisión.
                  </p>
                  <div className="mt-8">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-primary">
                      Comprar MF Barrel
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Right — spec rows */}
              <Reveal delay={80}>
                <div className="divide-y divide-[var(--line-1)] border-y border-[var(--line-1)]">
                  {SPEC_ROWS.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-6 py-4">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                        {r.label}
                      </span>
                      <span className="text-right text-[15px] font-medium">{r.value}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 8. FAQ ──────────────────────────────────────────── */}
        <section className="msection">
          <div className="mwrap">
            <Reveal className="msection-head">
              <span className="m-eyebrow accent">Dudas frecuentes</span>
              <h2>Preguntas frecuentes.</h2>
            </Reveal>
            <FAQ items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ── 9. CTA FINAL (dark) ─────────────────────────────── */}
        <section className="msection dark-s">
          <div className="mwrap">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="m-eyebrow accent">MF Barrel · $69,000 MXN</span>
              <h2
                className="mdisplay mt-4 text-[clamp(34px,4.5vw,64px)]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                Lleva el MF Barrel a casa.
              </h2>
              <p className="mx-auto mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--on-dark-muted)]">
                30 días de prueba sin preguntas. Garantía de 6 meses con atención de
                por vida. Hasta 6 MSI con Mercado Pago y envío de $1,500 MXN a todo
                México. El frío que cambia tu día, en el espacio que ya tienes.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-blue">
                  Comprar MF Barrel
                </a>
                <Link href="/productos" className="mbtn mbtn-ghost on-dark">
                  Ver todos los productos
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </PageShell>
  );
}
