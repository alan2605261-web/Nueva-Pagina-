import Link from "next/link";
import { DatosProducto, Migas } from "@/components/DatosEstructurados";
import { agendarLlamada } from "@/lib/whatsapp";
import { PageShell } from "@/components/PageShell";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { AccessoryCard } from "@/components/AccessoryCard";
import { ProductOptionsProvider, ProductStage, ColorPicker, AddonCard, AddToCart, ShieldAddon, PaymentPlan } from "@/components/ProductOptions";
import { StickyBuyBar } from "@/components/StickyBuyBar";
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
    a: "Es la única de la línea que lleva el sistema de enfriamiento dentro de la tina: no hay motor aparte ni mangueras que tender. Acrílico de alta resistencia con acabados en acero inoxidable e iluminación LED interior. 195 × 80 × 71 cm, 420 L. Ajusta de 1 a 40 °C, enfría de 4 a 6 °C por hora y calienta de serie. Garantía de 12 meses, el doble que los inflables. Control por panel y por app Wi-Fi.",
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
    a: "Depende de cuántas inmersiones tenga el equipo al día, sumando a todos los que lo usan. Con una al día, alrededor de un mes; con tres, unos 10 días; con cinco, una semana; y en uso comercial intenso puede ser diario. Cada cambio de agua lleva cambio de filtro, y no requiere técnico. El calendario completo está en el centro de ayuda.",
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
  { label: "Rango de temperatura", value: "1 a 40 °C, al grado exacto" },
  { label: "Velocidad de enfriamiento", value: "4 a 6 °C por hora" },
  { label: "Temperatura ambiente de operación", value: "3 a 40 °C" },
  { label: "Desinfección", value: "Ozono integrado" },
  { label: "Filtración", value: "Filtro de papel + skimmer (filtro de carbón incluido)" },
  { label: "Bomba de agua", value: "150 W · 8,000 L/h" },
  { label: "Nivel de ruido", value: "68 dB(A) a 1 m" },
  { label: "Refrigerante", value: "R32 · 500 g" },
  { label: "Pantalla y control", value: "Panel + control por app Wi-Fi (2.4 GHz)" },
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
  "Frío y calor de 1 °C a 40 °C, incluidos",
  "Diseño All-In-One con el chiller dentro de la tina",
  "Sin obra y sin plomería: se conecta y opera",
  "Control por app Wi-Fi desde tu celular",
  "12 meses de garantía, válida también para uso comercial.",
];

export const metadata = {
  title: "MF ONE, cold plunge de acrílico con motor integrado",
  description:
    "Tina de inmersión en frío MF ONE: acrílico con acero inoxidable, de 1 a 40 °C, motor dentro de la tina, ozono e iluminación LED y 12 meses de garantía.",
};

export default function MFOnePage() {
  return (
    <PageShell>
      {/* Datos estructurados. Sin esto la ficha no declaraba precio,
          disponibilidad ni garantia, y para Google y para los asistentes de IA
          el producto no existia (sep 2026). Los precios son los mismos que
          muestra la ficha: si cambian arriba, cambian aqui. */}
      <DatosProducto
        nombre="MF ONE"
        sku="MF-ONE"
        ruta="/productos/mf-one"
        descripcion="Tina de inmersión en frío de acrílico con acabados en acero inoxidable. El módulo de enfriamiento va dentro de la tina: de 1 a 40 °C, ozono integrado e iluminación LED, sin obra ni plomería."
        imagenes={["/images/prod-mfone.webp", "/images/hero-mfone.jpg"]}
        oferta={{ precio: 169000 }}
        garantiaMeses={12}
        propiedades={[
          ["Rango de temperatura", "1 a 40 °C"],
          ["Medidas", "195 x 80 x 71 cm"],
          ["Material", "Acrílico con acabados en acero inoxidable"],
          ["Motor", "Integrado en la tina"],
        ]}
      />
      <Migas
        items={[
          ["Inicio", "/"],
          ["Productos", "/productos"],
          ["MF ONE", "/productos/mf-one"],
        ]}
      />
      <ProductOptionsProvider
      producto="mf-one"
      basePrice={169000}
      variants={[
        // Galeria por color: cada variante solo muestra fotos de ESE color.
        // Blanco va a 07 (no 09): se retiraron los dos renders sin logo,
        // ver assets-retirados/LEEME.md.
        { color: "Negro", images: ["/images/mfone-gallery/negro/front.jpg", ...Array.from({ length: 9 }, (_, i) => `/images/mfone-gallery/negro/${String(i + 1).padStart(2, "0")}.jpg`)] },
        { color: "Blanco", images: ["/images/mfone-gallery/blanco/front.jpg", ...Array.from({ length: 7 }, (_, i) => `/images/mfone-gallery/blanco/${String(i + 1).padStart(2, "0")}.jpg`)] },
      ]}
      >
      <div className="bg-[var(--bg-metal)] text-[var(--fg-metal)]">

        {/* ── 1. PRODUCT HERO ─────────────────────────────────── */}
        <section className="msection !pt-[clamp(40px,6vh,80px)]">
          <div className="mwrap">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
      {/* LEFT — celda estirada con stage sticky interno (estilo Plunge/Apple) */}
      <Reveal className="lg:h-full">
        <div className="lg:sticky lg:top-24">
          <ProductStage alt="MF ONE, tina de inmersión todo en uno" />
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
            /* Solo el escalon, con su MIND OVER BODY (Saul, sep 2026): antes
               salia la tina completa con el escalon al pie, y en una caja de
               80x144 no se entendia que se estaba ofreciendo. Recortadas de
               negro-1 y blanco-1. */
            imgByColor={{
              Negro: "/images/accesorios/pro-deck/negro-solo.webp",
              Blanco: "/images/accesorios/pro-deck/blanco-solo.webp",
            }}
          />
          {/* Garantía extendida MF Shield */}
          <ShieldAddon />
          {/* Pago: liquidar o apartar con 40 % */}
          <PaymentPlan llamadaUrl={agendarLlamada("MF ONE")} />
          {/* Acordeones estilo Plunge */}
          <div className="mt-7 space-y-2.5">
            {[
              {
                t: "Detalles del producto",
                c: "195 × 80 × 71 cm · 420 L. Acrílico de alta resistencia con acabados y componentes en acero inoxidable, e iluminación LED interior. Rango de 1 a 40 °C con chiller integrado de 1 HP y 3,500 W de enfriamiento. Enfría de 4 a 6 °C por hora. Control por panel y por app Wi-Fi.",
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
                c: "30 días de prueba sin preguntas: si no es la mejor cold plunge que has probado, te reembolsamos. Garantía de 12 meses por defectos de fabricación, válida también para uso comercial. Cuando se vence, el número por el que nos escribes sigue siendo el mismo.",
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
              { icon: ShieldCheck, t: "Garantía 1 año", d: "Válida para uso comercial." },
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
          </div>
        </section>

        {/* ── 2. STATS (dark) ─────────────────────────────────── */}
        <section className="msection panel">
          <div className="mwrap">
            {/* Rejilla de dos filas. El título va arriba, solo sobre la columna de
                la tabla; abajo, el video y la tabla comparten fila, así el video
                arranca y termina exactamente donde la tabla, y mide lo mismo de
                ancho. Antes el video (574px) era más ancho que la tabla (522px) y
                se centraba contra toda la columna de texto, sin alinearse con
                nada (Saul, sep 2026). En celular queda: título, video, tabla. */}
            <div className="grid gap-x-[clamp(32px,5vw,72px)] md:grid-cols-2">
              <Reveal className="md:col-start-2 md:row-start-1">
                <span className="m-eyebrow accent">Por qué MF ONE</span>
                <h2
                  className="mdisplay my-[14px] mb-8 text-[clamp(28px,3.5vw,48px)]"
                  style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                >
                  La diferencia.
                </h2>
              </Reveal>

              {/* "Video página" (Saul, sep 2026): render de la MF ONE negra
                  girando. Sustituye a mfone-diferencia, que no le gustaba. En
                  computadora se estira a la altura de la tabla y recorta un
                  poco los lados; en celular va en 16:9 completo. */}
              <Reveal className="stats-visual relative mb-6 !aspect-video md:col-start-1 md:row-start-2 md:mb-0 md:!aspect-auto">
                <video
                  src="/videos/video-pagina.mp4"
                  poster="/videos/posters/video-pagina.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full !object-cover !p-0"
                />
              </Reveal>

              <Reveal className="md:col-start-2 md:row-start-2">
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
                    <div className="l">Caudal de la bomba, con filtro de papel y ozono integrado trabajando en circuito.</div>
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
                Frío, calor, ozono e iluminación LED, todo integrado en un solo
                equipo.
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
                /* Orden (Saul, sep 2026): la cubierta aislante primero, que es lo
                   más importante, con el portacelular junto; el filtro de carbón
                   al final. La foto de filtros muestra los tres que vienen en la
                   caja: antes era un solo cartucho y daba a entender uno. */
                { t: "Cubierta aislante", p: "Conserva la temperatura entre inmersiones y mantiene el agua limpia.", img: "/images/acc-tapa-mfone.webp" },
                { t: "Portacelular", p: "Se monta en el borde de la tina: tu timer, tu música o tu serie durante la inmersión.", img: "/images/acc-soporte-celular.webp" },
                { t: "Filtros de papel", p: "Vienen tres. Retienen los sólidos del agua, y cada cuánto se cambian depende de cuántas inmersiones tenga el equipo al día.", img: "/images/acc-filtros-mfone.webp" },
                { t: "Skimmer", p: "Atrapa hojas e impurezas de la superficie. Se limpia en segundos.", img: "/images/acc-red-limpieza.webp" },
                { t: "Llave de filtro", p: "La herramienta para abrir el portafiltro y hacer el cambio sin técnico.", img: "/images/acc-llave-filtro.webp" },
                { t: "Patitos de hule", p: "Sí, vienen incluidos. Porque el frío se toma en serio, pero no tanto.", img: "/images/acc-patitos.webp" },
                { t: "Filtro de carbón", p: "Se conecta a la manguera al llenar la tina. Es un extra que ayuda con el olor y el sabor del agua, no un requisito de operación.", img: "/images/acc-filtro-prellenado.webp" },
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
                {/* "Motor MF ONE" con nombre propio (Saul, sep 2026): el motor
                    no se mencionaba en ninguna parte de la ficha. */}
                <span className="m-eyebrow accent">Motor MF ONE</span>
                <h2 className="mdisplay mt-3 text-[clamp(28px,3.4vw,46px)]" style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}>
                  Filtra, enfría y calienta desde dentro de la tina.
                </h2>

                <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-[var(--on-dark-muted)]">
                  El motor de la MF ONE va dentro de la tina: sin unidad aparte, sin
                  mangueras y sin nada que conectar más que el enchufe.
                </p>

                {/* Cifras del motor, de la ficha oficial CP-ONE */}
                <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-[16px] border border-[var(--on-dark-line)] bg-white/[0.04] sm:grid-cols-4">
                  {[
                    ["1 HP", "Compresor"],
                    ["3,500 W", "Enfriamiento"],
                    ["1,000 W", "Calentamiento"],
                    ["8,000 L/h", "Bomba"],
                  ].map(([n, l], i) => (
                    <div
                      key={l}
                      className={`p-5 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10 sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}
                    >
                      <div className="mdisplay text-[clamp(22px,2vw,28px)] leading-none text-[var(--m-blue-400)]">{n}</div>
                      <p className="m-0 mt-2 text-[12px] text-[var(--on-dark-muted)]">{l}</p>
                    </div>
                  ))}
                </div>

                {/* Features elegidos */}
                <div className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {[
                    ["Timer programable", "Se enciende y apaga sola a tus horarios, con dos programas."],
                    ["Modo automático", "Fijas tu temperatura y la mantiene 24/7, al grado."],
                    ["Ozono integrado", "Desinfección sin cloro de alberca."],
                    ["Doble filtración", "Skimmer en la superficie + filtro de papel en circulación."],
                    ["Candado de pantalla", "Bloqueo del panel. Ideal para uso comercial o con niños en casa."],
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
                    <img loading="lazy" decoding="async" src="/images/mfone-gallery/negro/06.jpg" alt="Motor MF ONE integrado en la tina" className="w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-[16px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" decoding="async" src="/images/mfone-gallery/negro/01.jpg" alt="Frente del Motor MF ONE" className="w-full" />
                    </div>
                    <div className="overflow-hidden rounded-[16px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" decoding="async" src="/images/mfone-gallery/negro/04.jpg" alt="Panel de control táctil" className="w-full" />
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
                <h2 className="mdisplay text-[clamp(26px,3.4vw,44px)]">¿Y si la MF ONE se pagara sola?</h2>
                <p className="text-[16px] leading-relaxed mt-4">
                  Hoteles, gimnasios, spas y clínicas ya cobran por cada inmersión.
                  Adquiérela en leasing sin tocar tu línea bancaria y calcula en un
                  minuto cuántas sesiones necesitas para recuperarla.
                </p>

                {/* Stats */}
                <div className="mt-8 grid max-w-xl grid-cols-1 gap-y-6 sm:grid-cols-3">
                  {[
                    ["100%", "renta deducible"],
                    ["12 a 24", "meses de leasing"],
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
        <StickyBuyBar nombre="MF ONE" />
      </ProductOptionsProvider>
    </PageShell>
  );
}
