import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { ProductOptionsProvider, ProductStage, ColorPicker } from "@/components/ProductOptions";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { MotorPicker } from "@/components/MotorPicker";
import { RotateCcw, ShieldCheck, CreditCard, Plus } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   MF HORIZON — Página de Detalle de Producto (PDP) · sistema "metal"
   Estructura: Hero → Stats (dark) → Motores → Portabilidad →
   Accesorios → Beneficios → Specs → FAQ → CTA (dark)
───────────────────────────────────────────────────────────── */

const WHATSAPP = "https://wa.me/5215616471386";
const SHOP_URL = "https://mentefria.com/products/mf-horizon-1";

const FAQ_ITEMS = [
  {
    q: "¿Qué motor elijo: Pro 2.0 o Premium 2.0?",
    a: "El Motor Pro 2.0 (0.8 HP, 2,230 W) es solo frío: enfría de 25 a 3 °C en ~6 horas, con filtración de 3 etapas y control WiFi — perfecto si tu objetivo es recuperación en frío. El Motor Premium 2.0 (1 HP, 2,700 W) hace todo eso más rápido (~4 horas), y además calienta hasta 42 °C y purifica con ozono 24/7. Si quieres contraste frío/calor y agua purificada sin químicos, ve por el Premium.",
  },
  {
    q: "¿Necesito hielo?",
    a: "No. El motor enfría el agua hasta 3 °C y la mantiene ahí de forma continua, filtrándola automáticamente. Sin hielos, sin cargar bolsas, sin costos extra cada sesión.",
  },
  {
    q: "¿Cada cuánto cambio el agua?",
    a: "Con el sistema de 3 filtros (1 a 5 micras) el agua se mantiene limpia entre 3 y 5 semanas según el uso. Con el Motor Premium 2.0, el ozono 24/7 extiende aún más la vida del agua. El cambio de filtros es sencillo y no requiere técnico.",
  },
  {
    q: "¿El ozono sustituye al cloro?",
    a: "Sí. Con el Motor Premium 2.0, la purificación con ozono esteriliza el agua 24/7 sin cloro ni químicos — sin olores ni irritación en la piel. Con el Motor Pro 2.0, el sistema de 3 filtros se encarga de mantener el agua limpia entre cambios.",
  },
  {
    q: "¿Dónde puedo instalarla?",
    a: "Donde tengas un enchufe convencional y acceso a una manguera para llenarla: interior, terraza o patio. Idealmente bajo techo, protegida del sol directo y la lluvia, para cuidar los componentes. No requiere obra ni plomería.",
  },
  {
    q: "¿Cuánto cuesta el envío?",
    a: "El envío del MF Horizon cuesta $1,500 MXN a todo México. Al ser inflable y ligera (15 kg), no requiere maniobra especial de entrega: llega en caja y la instalas tú mismo.",
  },
  {
    q: "¿En qué se diferencia del MF Barrel?",
    a: "El MF Barrel ($69,000 MXN) es el formato vertical compacto: te sumerges sentado y ocupa menos espacio. El MF Horizon ($74,000 MXN) es el formato horizontal con el mayor espacio de inmersión: cabes estirado, con los hombros bajo el agua. Ambos comparten el sistema de 3 filtros, la purificación con ozono y el control WiFi.",
  },
];

/* Specs verificadas contra mentefria.com/products/mf-horizon-1 */
const SPEC_ROWS = [
  { label: "Dimensiones", value: "160 × 70 × 65 cm" },
  { label: "Capacidad", value: "420 L" },
  { label: "Peso", value: "15 kg (sin agua)" },
  { label: "Formato", value: "Horizontal — inmersión estirado" },
  { label: "Material", value: "PVC ultraduradero reforzado con fibra de vidrio" },
  { label: "Filtración", value: "Sistema de 3 filtros (1 – 5 micras)" },
  { label: "Desinfección", value: "Ozono 24/7 (con Motor Premium 2.0)" },
  { label: "Enfriamiento", value: "Hasta 3 °C, sin hielo" },
  { label: "Calentamiento", value: "Hasta 42 °C (con Motor Premium 2.0)" },
  { label: "Motores compatibles", value: "Motor Pro 2.0 (0.8 HP) · Motor Premium 2.0 (1 HP)" },
  { label: "Control", value: "WiFi + app, programable" },
  { label: "Colores", value: "Negro · Blanco" },
  { label: "Garantía", value: "6 meses" },
  { label: "Portabilidad", value: "Inflable — mochila de transporte incluida" },
  { label: "Envío", value: "$1,500 MXN a todo México" },
];

const HERO_BULLETS = [
  "Mayor espacio de inmersión: cabes estirado, con los hombros bajo el agua",
  "Enfría hasta 3 °C sin hielo — y hasta 42 °C con Motor Premium 2.0",
  "Inflable y portátil: 15 kg, se guarda en su mochila de transporte",
  "Sistema de 3 filtros + ozono. Control WiFi programable.",
  "6 meses de garantía y 30 días de prueba.",
];

const ACCESORIOS = [
  { t: "Mochila de transporte", p: "Desínflala y guárdala completa en su mochila — tu cold plunge viaja contigo.", img: null },
  { t: "Bomba de doble acción", p: "Infla y desinfla la tina sin herramientas ni compresor.", img: null },
  { t: "Cubierta protectora", p: "Con seguro para niños — conserva la temperatura y mantiene el agua limpia.", img: null },
  { t: "Sistema de 3 filtros", p: "Tres filtros de 1 a 5 micras que retienen impurezas y dejan el agua cristalina.", img: null },
  { t: "Kit de reparación", p: "Herramientas básicas para mantener tu tina como nueva, incluso de viaje.", img: null },
];

export default function MFHorizonPage() {
  return (
    <PageShell>
      <div className="bg-[var(--bg-metal)] text-[var(--fg-metal)]">

        {/* ── 1. PRODUCT HERO ─────────────────────────────────── */}
        <section className="msection !pt-[clamp(40px,6vh,80px)]">
          <div className="mwrap">
            <ProductOptionsProvider
              variants={[
                { color: "Negro", images: ["/images/pdp-horizon-negro.png", "/images/horizon-studio-mujer-01.jpg", "/images/horizon-studio-mujer-02.jpg", "/images/horizon-closeup-perfil.jpg"] },
                { color: "Blanco", images: ["/images/pdp-horizon-blanco.png", "/images/horizon-blanco-studio.jpg"] },
              ]}
            >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

              {/* LEFT — celda estirada con stage sticky interno (estilo Plunge/Apple) */}
              <Reveal className="lg:h-full">
                <div className="lg:sticky lg:top-24">
                  <ProductStage alt="MF Horizon — cold plunge portátil horizontal" />
                </div>
              </Reveal>

              {/* RIGHT — copy + CTAs */}
              <Reveal delay={80}>
                <div>
                  <span className="m-eyebrow accent">MF Horizon · Portátil</span>
                  <h1 className="mdisplay mt-4 text-[clamp(44px,5.5vw,76px)]" style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}>
                    MF HORIZON
                  </h1>

                  {/* Price */}
                  <div className="mt-5 flex flex-wrap items-baseline gap-2">
                    <span className="mdisplay text-[clamp(34px,3.6vw,50px)]">$74,000</span>
                    <span className="text-lg text-[var(--fg-muted)]">MXN</span>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                    Hasta 6 meses sin intereses con Mercado Pago
                  </p>

                  <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[var(--fg-muted)]">
                    El cold plunge portátil más potente de México — formato horizontal
                    con el mayor espacio de inmersión.
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

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-primary">
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
                        c: "160 × 70 × 65 cm · 420 L · 15 kg. PVC ultraduradero reforzado con fibra de vidrio, amigable con la piel. Formato horizontal: el mayor espacio de inmersión de la línea — cabes estirado. Compatible con Motor Pro 2.0 y Motor Premium 2.0, con control WiFi y app.",
                      },
                      {
                        t: "Qué incluye",
                        c: "Mochila de transporte, bomba de inflado de doble acción, cubierta protectora con seguro para niños, sistema de 3 filtros (1 a 5 micras) y kit de reparación. Todo en la caja, sin compras extra.",
                      },
                      {
                        t: "Envío y entrega",
                        c: "$1,500 MXN a todo México. Al ser inflable y ligera (15 kg), no requiere maniobra especial: llega en caja y la instalas tú mismo, sin obra ni plomería.",
                      },
                      {
                        t: "Prueba, garantía y devoluciones",
                        c: "30 días de prueba sin preguntas: si no es la mejor cold plunge que has probado, te reembolsamos. Garantía de 6 meses por defectos de fabricación y atención de por vida por nuestros canales.",
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
                      { icon: ShieldCheck, t: "Garantía 6 meses", d: "Y atención de por vida." },
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

        {/* ── 2. STATS (dark tiles) ───────────────────────────── */}
        <section className="msection panel">
          <div className="mwrap">
            <div className="stats-wrap">
              <Reveal className="stats-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/horizon-patio.jpg"
                  alt="MF Horizon en un patio — dos amigos durante una inmersión"
                  className="!object-cover !p-0"
                />
              </Reveal>
              <Reveal>
                <span className="m-eyebrow accent">Por qué MF Horizon</span>
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
                    <div className="l">Con Motor Premium 2.0: de cold plunge a jacuzzi.</div>
                  </div>
                  <div className="stat">
                    <div className="n">420<span className="u">L</span></div>
                    <div className="l">El mayor espacio de inmersión: cabes estirado, hombros bajo el agua.</div>
                  </div>
                  <div className="stat">
                    <div className="n">15<span className="u">kg</span></div>
                    <div className="l">Se desinfla, cabe en su mochila y viaja contigo.</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. ELIGE TU MOTOR (compartido) ──────────────────── */}
        <MotorPicker productName="MF Horizon" />

        {/* ── 4. PORTABILIDAD ─────────────────────────────────── */}
        <section className="msection">
          <div className="mwrap">
            <Reveal className="msection-head">
              <span className="m-eyebrow accent">Portabilidad</span>
              <h2>Llévala a donde quieras.</h2>
              <p>
                A diferencia de una tina rígida, el MF Horizon se desinfla, se guarda
                y viaja contigo — sin obra, sin plomería, sin maniobras.
              </p>
            </Reveal>
            <Reveal className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Desínflala",
                  p: "Vacíala y desínflala por completo con la bomba de doble acción incluida.",
                },
                {
                  n: "02",
                  t: "Guárdala",
                  p: "Cabe en su mochila de transporte. Con 15 kg, la mueves tú solo.",
                },
                {
                  n: "03",
                  t: "Ínflala donde sea",
                  p: "En tu casa de vacaciones o tu nueva casa: ínflala, conecta el motor y llénala con manguera.",
                },
              ].map((s) => (
                <div key={s.n} className="rounded-[16px] border border-[var(--line-1)] bg-white p-6">
                  <div className="mdisplay text-[34px] leading-none text-[var(--accent-ice)]">{s.n}</div>
                  <h3 className="mt-4 text-[16px] font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{s.p}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/horizon-playa.jpg"
                  alt="MF Horizon en la playa, frente al mar"
                  className="h-[320px] w-full rounded-[18px] object-cover sm:h-[420px]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/horizon-playa-van.jpg"
                  alt="MF Horizon junto a la van — llega contigo a donde vayas"
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
              <p>Sin compras extra ni sorpresas: el MF Horizon llega completo y listo para usarse.</p>
            </Reveal>
            <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ACCESORIOS.map((a) => (
                <article key={a.t} className="overflow-hidden rounded-[16px] border border-[var(--line-1)] bg-[var(--m-white)]">
                  {/* Imagen del accesorio (o espacio reservado) */}
                  <div className="grid aspect-[16/9] place-items-center bg-[var(--bg-panel)]">
                    {a.img ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={a.img} alt={a.t} className="h-full w-full object-cover" />
                    ) : (
                      <span className="rounded-full border border-dashed border-[var(--line-2)] px-4 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                        Imagen próximamente
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-semibold">{a.t}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--fg-muted)]">{a.p}</p>
                  </div>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 6. BENEFICIOS CIENTÍFICAMENTE PROBADOS ──────────── */}
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
                      Comprar MF Horizon
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
              <span className="m-eyebrow accent">MF Horizon</span>
              <h2
                className="mdisplay mt-4 text-[clamp(32px,4.5vw,60px)]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                Lleva el MF Horizon a casa —
                <br />
                $74,000 MXN
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--on-dark-muted)]">
                30 días de prueba sin preguntas · Garantía de 6 meses · Hasta 6 MSI
                con Mercado Pago · Envío $1,500 MXN a todo México.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-blue">
                  Comprar MF Horizon
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
