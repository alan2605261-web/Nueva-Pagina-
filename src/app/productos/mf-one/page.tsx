import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { AccessoryCard } from "@/components/AccessoryCard";
import { ProductOptionsProvider, ProductStage, ColorPicker, AddonCard } from "@/components/ProductOptions";
import { FrioCalor } from "@/components/FrioCalor";
import { MfOneBento } from "@/components/MfOneBento";
import { MfOneDimensions } from "@/components/MfOneDimensions";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { ArrowRight } from "@/components/icons";
import { Layers, Filter, Zap, Smartphone, RotateCcw, ShieldCheck, CreditCard, Plus } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   MF ONE — Página de Detalle de Producto (PDP) · sistema "metal"
   Estructura: Hero → Stats (dark) → Features → Lifestyle →
   Specs → Closeup → FAQ → CTA (dark)
───────────────────────────────────────────────────────────── */

const WHATSAPP = "https://wa.me/5215616471386";

const FAQ_ITEMS = [
  {
    q: "¿Qué hace diferente a la MF ONE?",
    a: "Es la única de la línea que lleva el sistema de enfriamiento dentro de la tina: no hay motor aparte ni mangueras que tender. Acrílico de alta resistencia con acabados en acero inoxidable e iluminación LED interior. 195 × 80 × 71 cm, 420 L. Ajusta de 1 a 40 °C, enfría de 4 a 6 °C por hora y calienta de serie. Garantía de 12 meses — el doble que los inflables. Control por panel y app Smart Life.",
  },
  {
    q: "¿Cuánto tarda en enfriar?",
    a: "Entre 4 y 6 °C por hora con su chiller integrado de 1 HP. La velocidad depende del volumen de agua, la temperatura ambiente y si usas la cubierta aislante. Recomendamos programar el enfriamiento desde la app para que siempre esté lista a tu hora.",
  },
  {
    q: "¿Necesita instalación o desagüe?",
    a: "No requiere obra ni toma de agua permanente: funciona con 110 V en un contacto dedicado de 16 A con tierra, y se llena con manguera o llave. Necesita 100 cm libres al frente y 20 cm por lado para el aire. Una vez llena no se puede mover, así que elige bien el espacio desde el inicio.",
  },
  {
    q: "¿Cada cuánto cambio los filtros?",
    a: "Cada 3 a 4 semanas con uso regular; cada cambio de agua incluye cambio de filtro. El proceso es sencillo y no requiere técnico.",
  },
  {
    q: "¿Se puede usar en exteriores?",
    a: "Sí, pero no expuesta directamente al sol ni a la lluvia. Idealmente bajo techo para proteger los componentes y no comprometer la garantía.",
  },
  {
    q: "¿Cuánto cuesta el envío?",
    a: "El envío de la MF ONE cuesta $6,000 MXN a todo México. Incluye maniobra de entrega: el equipo viaja drenado y entarimado, y nuestro equipo coordina contigo el acceso al espacio final.",
  },
];

/* Specs de la ficha y el manual oficiales MF ONE · CP-ONE (ago 2026).
   Fuente única de verdad: no agregar datos que no estén en esos documentos. */
const SPEC_ROWS = [
  { label: "Modelo", value: "MF ONE · CP-ONE" },
  { label: "Dimensiones", value: "195 × 80 × 71 cm" },
  { label: "Capacidad", value: "420 L" },
  { label: "Peso", value: "135 kg" },
  { label: "Material", value: "Acrílico + acabados en acero inoxidable" },
  { label: "Potencia", value: "1 HP" },
  { label: "Capacidad de enfriamiento", value: "3,500 W" },
  { label: "Capacidad de calentamiento", value: "1,000 W" },
  { label: "Rango de temperatura", value: "1 – 40 °C, al grado exacto" },
  { label: "Velocidad de enfriamiento", value: "4 a 6 °C por hora" },
  { label: "Temperatura ambiente de operación", value: "3 a 40 °C" },
  { label: "Desinfección", value: "Ozono integrado" },
  { label: "Filtración", value: "Filtro de papel + skimmer (filtro de carbón incluido)" },
  { label: "Bomba de agua", value: "150 W · 8,000 L/h" },
  { label: "Nivel de ruido", value: "68 dB(A) a 1 m" },
  { label: "Refrigerante", value: "R32 · 500 g" },
  { label: "Pantalla y control", value: "Panel + app Smart Life (WiFi 2.4 GHz)" },
  { label: "Alimentación", value: "110 V / 60 Hz · 12 A máx" },
  { label: "Contacto", value: "Dedicado de 16 A con tierra" },
  { label: "Potencia de entrada", value: "1,320 W" },
  { label: "Espacio libre", value: "100 cm al frente · 20 cm por lado" },
  { label: "Instalación", value: "Sin obra ni plomería" },
  { label: "Garantía", value: "12 meses" },
  { label: "País de origen", value: "China" },
  { label: "Envío", value: "$6,000 MXN a todo México" },
];

const HERO_BULLETS = [
  "Dual Climate Control: de 1 °C a 40 °C incluido",
  "Diseño All-In-One con el chiller dentro de la tina",
  "Zero Setup: sin obra, sin plomería, solo conecta y opera",
  "Control desde tu celular con la app Smart Life",
  "12 meses de garantía, válida también para uso comercial.",
];

export default function MFOnePage() {
  return (
    <PageShell>
      <div className="bg-[var(--bg-metal)] text-[var(--fg-metal)]">

        {/* ── 1. PRODUCT HERO ─────────────────────────────────── */}
        <section className="msection !pt-[clamp(40px,6vh,80px)]">
          <div className="mwrap">
            <ProductOptionsProvider
              variants={[
                { color: "Negro", images: ["/images/mfone-gallery/negro/front.jpg", ...Array.from({ length: 9 }, (_, i) => `/images/mfone-gallery/negro/${String(i + 1).padStart(2, "0")}.jpg`)] },
                { color: "Blanco", images: ["/images/mfone-gallery/blanco/front.jpg", ...Array.from({ length: 9 }, (_, i) => `/images/mfone-gallery/blanco/${String(i + 1).padStart(2, "0")}.jpg`)] },
              ]}
            >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

              {/* LEFT — celda estirada con stage sticky interno (estilo Plunge/Apple) */}
              <Reveal className="lg:h-full">
                <div className="lg:sticky lg:top-24">
                  <ProductStage alt="MF ONE — tina de inmersión todo en uno" />
                </div>
              </Reveal>

              {/* RIGHT — copy + CTAs */}
              <Reveal delay={80}>
                <div>
                  <span className="m-eyebrow accent">MF ONE · All-in-One</span>
                  <h1 className="mdisplay mt-4 text-[clamp(44px,5.5vw,76px)]" style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}>
                    MF ONE
                  </h1>

                  {/* Price */}
                  <div className="mt-5 flex flex-wrap items-baseline gap-2">
                    <span className="mdisplay text-[clamp(34px,3.6vw,50px)]">$169,000</span>
                    <span className="text-lg text-[var(--fg-muted)]">MXN</span>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                    Precio no incluye IVA
                  </p>

                  <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[var(--fg-muted)]">
                    El único cold plunge con frío y calor incluidos de serie. Enfría hasta 1 °C.
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

                  {/* Add-on estilo Plunge Basin */}
                  <AddonCard
                    name="MF ONE PRO DECK"
                    description="El escalón de acceso diseñado para tu MF ONE."
                    price={6900}
                    basePrice={169000}
                    imgByColor={{
                      Negro: "/images/prodeck-negro.png",
                      Blanco: "/images/prodeck-blanco.png",
                    }}
                  />

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="https://mentefria.com/products/mf-one" target="_blank" rel="noopener noreferrer" className="mbtn mbtn-primary">
                      Agregar al carrito
                    </a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-ghost">
                      Agendar demo
                    </a>
                  </div>

                  {/* Acordeones estilo Plunge */}
                  <div className="mt-7 space-y-2.5">
                    {[
                      {
                        t: "Detalles del producto",
                        c: "195 × 80 × 71 cm · 420 L. Acrílico de alta resistencia con acabados y componentes en acero inoxidable, e iluminación LED interior. Rango de 1 a 40 °C con chiller integrado de 1 HP y 3,500 W de enfriamiento. Enfría de 4 a 6 °C por hora. Control por panel y app Smart Life.",
                      },
                      {
                        t: "Qué incluye",
                        c: "La unidad MF ONE con el módulo de enfriamiento integrado, cubierta aislante, filtros de papel y de carbón, llave de filtro, skimmer y portacelular. La MF ONE PRO DECK se vende por separado.",
                      },
                      {
                        t: "Envío y entrega",
                        c: "$6,000 MXN a todo México, de 3 a 7 días hábiles. Viaja drenada y entarimada, e incluye maniobra de entrega: nuestro equipo coordina contigo el acceso al espacio final. Verifica que entre por puertas y pasillos antes de recibirla.",
                      },
                      {
                        t: "Prueba, garantía y devoluciones",
                        c: "30 días de prueba sin preguntas: si no es la mejor cold plunge que has probado, te reembolsamos. Garantía de 12 meses por defectos de fabricación, válida también para uso comercial, y atención de por vida por nuestros canales.",
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
                      { icon: ShieldCheck, t: "Garantía 1 año", d: "Y atención de por vida." },
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
                <video
                  src="/videos/mfone-diferencia.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full !object-cover !p-0"
                />
              </Reveal>
              <Reveal>
                <span className="m-eyebrow accent">Por qué MF ONE</span>
                <h2
                  className="mdisplay my-[14px] mb-8 text-[clamp(28px,3.5vw,48px)]"
                  style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                >
                  La diferencia.
                </h2>
                <div className="stats-grid">
                  <div className="stat">
                    <div className="n n-cold">1<span className="u">°C</span></div>
                    <div className="l">Temperatura mínima de ajuste, sin un solo hielo.</div>
                  </div>
                  <div className="stat">
                    <div className="n n-heat">40<span className="u">°C</span></div>
                    <div className="l">Calentamiento hasta jacuzzi mode. Una tina, todo el año.</div>
                  </div>
                  <div className="stat">
                    <div className="n">1<span className="u">unidad</span></div>
                    <div className="l">All-in-One: chiller, filtración y ozono integrados. Plug &amp; Play.</div>
                  </div>
                  <div className="stat">
                    <div className="n">8,000<span className="u">L/h</span></div>
                    <div className="l">Toda el agua recircula unas 19 veces por hora, con filtro de papel y ozono integrado.</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. BENTO ANIMADO v2 (diseño de Rafa — dark premium) ── */}
        <section className="msection !bg-white">
          <div className="mwrap">
            <Reveal className="msection-head">
              <span className="m-eyebrow accent">Tecnología</span>
              <h2>Ingeniería que se siente.</h2>
              <p>
                Frío, calor, ozono e iluminación LED — todo integrado en un solo
                equipo. Tu única preocupación: entrar al agua.
              </p>
            </Reveal>
            <Reveal>
              <MfOneBento />
            </Reveal>
          </div>
        </section>

        {/* ── ACCESORIOS INCLUIDOS (formato Plunge) ──────────── */}
        <section className="msection">
          <div className="mwrap">
            <Reveal className="msection-head">
              <span className="m-eyebrow accent">Accesorios incluidos</span>
              <h2>Todo incluido, desde el día uno.</h2>
              <p>Sin compras extra ni sorpresas: la MF ONE llega completo y listo para usarse.</p>
            </Reveal>
            <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Filtro de papel", p: "Retiene los sólidos del agua. Es el filtro de operación: cámbialo cada 3 a 4 semanas.", img: "/images/acc-filtros-cartucho.webp" },
                { t: "Filtro de carbón", p: "Se conecta a la manguera al llenar la tina. Es un extra que ayuda con el olor y el sabor del agua, no un requisito de operación.", img: "/images/acc-filtro-prellenado.webp" },
                { t: "Skimmer", p: "Atrapa hojas e impurezas de la superficie — limpieza en segundos.", img: "/images/acc-red-limpieza.webp" },
                { t: "Portacelular", p: "Se monta en el borde de la tina — tu timer, tu música o tu serie durante la inmersión.", img: "/images/acc-soporte-celular.webp" },
                { t: "Cubierta aislante", p: "Conserva la temperatura entre inmersiones y mantiene el agua limpia.", img: null },
                { t: "Llave de filtro", p: "La herramienta para abrir el portafiltro y hacer el cambio sin técnico.", img: null },
                { t: "Patitos de hule", p: "Sí, vienen incluidos. Porque el frío se toma en serio — pero no tanto.", img: "/images/acc-patitos.webp" },
              ].map((a, i) => (
                <AccessoryCard key={a.t} a={a} index={i} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 4. FRÍO / CALOR — díptico interactivo ───────────── */}
        <section className="msection">
          <div className="mwrap">
            <Reveal>
              <FrioCalor />
            </Reveal>
          </div>
        </section>

        {/* ── EL CHILLER EN DETALLE — Siempre limpia. Siempre fría. Siempre lista. ── */}
        <section className="msection dark-s">
          <div className="mwrap">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <span className="m-eyebrow accent">El corazón de la MF ONE</span>
                <h2 className="mdisplay mt-3 text-[clamp(28px,3.4vw,46px)]" style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}>
                  Siempre limpia.
                  <br />
                  Siempre fría.
                  <br />
                  Siempre lista.
                </h2>

                {/* Dato estrella: 19× */}
                <div className="mt-8 flex items-center gap-5 rounded-[16px] border border-[var(--on-dark-line)] bg-white/[0.04] p-5">
                  <div className="mdisplay text-[54px] leading-none text-[var(--m-blue-400)]">19×</div>
                  <p className="m-0 max-w-[30ch] text-[13.5px] leading-relaxed text-[var(--on-dark-muted)]">
                    La bomba de 8,000 L/h filtra <span className="text-white">toda el agua de la tina ~19 veces cada hora</span>. Por eso siempre está cristalina.
                  </p>
                </div>

                {/* Features elegidos */}
                <div className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {[
                    ["Timer programable", "Se enciende y apaga sola a tus horarios — dos programas."],
                    ["Modo automático", "Fijas tu temperatura y la mantiene 24/7, al grado."],
                    ["Ozono integrado", "Desinfección sin cloro de alberca."],
                    ["Doble filtración", "Skimmer en la superficie + filtro de papel en circulación."],
                    ["Candado de pantalla", "Bloqueo del panel — ideal para uso comercial o niños."],
                    ["Luz LED interior", "Enciende y apaga la iluminación de la tina desde el panel."],
                  ].map(([t, d]) => (
                    <div key={t} className="border-t border-white/10 py-4">
                      <div className="flex items-baseline gap-2.5">
                        <span aria-hidden className="h-[7px] w-[7px] flex-none translate-y-[-1px] rounded-full bg-[var(--m-blue-400)]" />
                        <div>
                          <div className="text-[14px] font-semibold text-white">{t}</div>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--on-dark-muted)]">{d}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-[16px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/mfone-gallery/negro/06.jpg" alt="Chiller integrado de la MF ONE" className="w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-[16px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/mfone-gallery/negro/07.jpg" alt="Frente del chiller" className="w-full" />
                    </div>
                    <div className="overflow-hidden rounded-[16px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/mfone-gallery/negro/09.jpg" alt="Panel de control táctil" className="w-full" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── BENEFICIOS CIENTÍFICAMENTE PROBADOS (real mentefria.com) ── */}
        <BenefitsCarousel />

        {/* ── 5. SPEC TABLE ───────────────────────────────────── */}
        {/* ── MEDIDAS Y ESPACIO ─────────────────────────────── */}
        <section className="msection dark-s scroll-mt-20" id="medidas">
          <div className="mwrap">
            <Reveal className="msection-head">
              <span className="m-eyebrow accent">Medidas y espacio</span>
              <h2>Antes de recibirla, mide.</h2>
              <p>
                Verifica que el equipo entre por puertas y pasillos. Una vez
                llena no se puede mover.
              </p>
            </Reveal>
            <Reveal className="mx-auto max-w-4xl">
              <MfOneDimensions />
            </Reveal>
            <Reveal className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
              {[
                ["Piso", "Firme y nivelado"],
                ["Frente libre", "100 cm"],
                ["Laterales libres", "20 cm por lado"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-[14px] border p-5"
                  style={{ borderColor: "var(--on-dark-line)" }}
                >
                  <p className="m-eyebrow" style={{ color: "var(--on-dark-subtle)" }}>
                    {k}
                  </p>
                  <p className="mdisplay mt-2 text-[20px] text-white">{v}</p>
                </div>
              ))}
            </Reveal>
            <Reveal className="mx-auto mt-8 max-w-4xl">
              <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--on-dark-muted)" }}>
                Puede instalarse en interiores con ventilación al exterior, o
                afuera bajo techo, pérgola o cubierta. El módulo de enfriamiento
                debe quedar fuera de la luz solar directa y protegido de lluvia
                sostenida.
              </p>
            </Reveal>
          </div>
        </section>

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
                      Comprar MF ONE
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

        {/* ── 7. FAQ ──────────────────────────────────────────── */}
        <section className="msection">
          <div className="mwrap">
            <Reveal className="msection-head">
              <span className="m-eyebrow accent">Dudas frecuentes</span>
              <h2>Preguntas frecuentes.</h2>
            </Reveal>
            <FAQ items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ── 8. CTA FINAL — PARA NEGOCIOS (claro, estilo B2BBand) ── */}
        <section className="bg-[var(--bg-panel)] text-foreground">
          <div className="mwrap msection">
            <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="eyebrow mb-4">Mente Fria para Negocios</p>
                <h2 className="mdisplay text-[clamp(26px,3.4vw,44px)]">¿Y si la MF ONE se pagara solo?</h2>
                <p className="text-[16px] leading-relaxed mt-4">
                  Hoteles, gimnasios, spas y clínicas ya cobran por cada inmersión.
                  Adquiérelo en leasing sin tocar tu línea bancaria — y calcula en un
                  minuto cuántas sesiones necesitas para recuperarlo.
                </p>

                {/* Stats */}
                <div className="mt-8 grid max-w-xl grid-cols-1 gap-y-6 sm:grid-cols-3">
                  {[
                    ["100%", "renta deducible"],
                    ["12–24", "meses de leasing"],
                    ["<24 h", "propuesta en tu correo"],
                  ].map(([n, l], i) => (
                    <div key={l} className={i > 0 ? "sm:border-l sm:border-[var(--line-1)] sm:pl-6" : ""}>
                      <div className="mdisplay text-[clamp(28px,3vw,40px)] leading-none text-[var(--accent-ice)]">
                        {n}
                      </div>
                      <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
                <Link href="/negocios" className="mbtn mbtn-primary">
                  Cotiza para tu negocio
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/negocios#roi"
                  className="text-[13px] font-semibold text-[var(--accent-ice)] transition-colors hover:text-[var(--m-blue-600)]"
                >
                  Calcular mi ROI →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </PageShell>
  );
}
