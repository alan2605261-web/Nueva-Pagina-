import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import {
  SubHero,
  SectionHeader,
  CTASection,
} from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { MotorPicker } from "@/components/MotorPicker";
import { StatSpark } from "@/components/StatSpark";
import { ArrowRight } from "@/components/icons";

/* ─── Product card data ─────────────────────────────────────────────────── */
/*
  Orden deliberado: la MF ONE va AL CENTRO, no al final.

  Es el producto insignia y la tarjeta del medio es la que primero mira el
  ojo en una reja de tres. Antes cerraba la fila y quedaba en la posición de
  menos peso visual. Decisión de Saul, sep 2026: MF Barrel · MF ONE · MF Horizon.
*/
const tinas = [
  {
    name: "MF Barrel",
    tag: "Cilíndrica · 500 L máx · Ideal para departamentos",
    tagline: "Filtración de 3 capas + purificación por ozono. Control WiFi programable. 6 meses de garantía.",
    specs: "90 cm diámetro × 90 cm altura · 11 kg · Tejido drop-stitch de grado militar",
    price: "$69,000 MXN",
    image: "/images/prod-barrel-nobg.png",
    href: "/productos/mf-barrel",
    badge: null,
  },
  {
    name: "MF ONE",
    tag: "All-In-One · Chiller 1 HP integrado · 420 L",
    tagline: "Diseño All-In-One con el chiller dentro de la tina. Filtro de papel + ozono integrado. Iluminación LED interior. 12 meses de garantía.",
    specs: "195 × 80 × 71 cm · 135 kg · Acrílico + acero inoxidable",
    price: "$169,000 MXN",
    image: "/images/prod-mfone.webp",
    href: "/productos/mf-one",
    badge: "Más vendido",
  },
  {
    name: "MF Horizon",
    tag: "Rectangular · 550 L máx · Mayor espacio de inmersión",
    tagline: "Filtración de 3 capas + purificación por ozono. Control WiFi programable. 6 meses de garantía.",
    specs: "160 × 70 × 65 cm · 12 kg · Tejido drop-stitch de grado militar",
    price: "$74,000 MXN",
    image: "/images/prod-horizon-nobg.png",
    href: "/productos/mf-horizon",
    badge: null,
  },
];


/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function ProductosPage() {
  return (
    <PageShell>
      {/* 1+2 · Discover-your-perfect-Plunge — título + productos (fondo blanco) */}
      <section className="msection dark-s !pt-[clamp(48px,7vh,90px)]">
        <div className="mwrap">
          <Reveal className="msection-head !mb-14">
            <span className="m-eyebrow accent">Productos</span>
            <h2>Encuentra la cold plunge perfecta para ti.</h2>
            <p>Recuperarte y rendir al máximo desde casa, sin hielo y sin complicaciones.</p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tinas.map((tina, i) => (
              <Reveal
                key={tina.name}
                delay={i * 90}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white text-foreground shadow-[0_1px_2px_rgba(8,9,11,0.06)] transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(8,9,11,0.25)]"
              >
                {/* Toda la card es clickeable (stretched link); el botón queda encima */}
                <Link
                  href={tina.href}
                  aria-label={`Ver ${tina.name}`}
                  className="absolute inset-0 z-[5]"
                />
                {/* Stage pop-out estilo inicio: panel gris detrás, producto
                    flotando con sombra y rompiendo el marco por arriba */}
                <div className="relative px-6 pt-6">
                  <div className="absolute inset-x-6 bottom-0 top-[45%]">
                    {/* Sombra de contacto en lugar del panel gris (decisión de
                        Saul, sep 2026): el producto flota sobre la página. */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-[10%] bottom-[7%] h-[24%] rounded-[50%]"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 50%, rgba(8,9,11,0.18) 0%, rgba(8,9,11,0.07) 45%, rgba(8,9,11,0) 72%)",
                      }}
                    />
                    {tina.badge && (
                      <span className="absolute bottom-3 left-3 z-20 rounded-full bg-foreground px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-background">
                        {tina.badge}
                      </span>
                    )}
                  </div>
                  <div className="relative flex min-h-[270px] items-end justify-center pb-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tina.image}
                      alt={tina.name}
                      style={
                        tina.name === "MF Horizon"
                          ? { width: "115%", maxWidth: "none", translate: "10px -8px" }
                          : tina.name === "MF ONE"
                            ? { width: "95%" }
                            : undefined
                      }
                      className="h-auto max-h-[210px] w-auto max-w-full flex-none object-contain drop-shadow-[0_22px_28px_rgba(8,9,11,0.22)] transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                {/* Card body — estilo Plunge */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="text-[13px] tracking-[3px] text-[var(--accent-ice)]">★★★★★</div>
                  <h3
                    className="mdisplay mt-2 text-[26px]"
                    style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                  >
                    {tina.name}
                  </h3>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold">{tina.price}</span>
                    <span className="text-[var(--fg-subtle)]"> · hasta 6 MSI con Mercado Pago</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{tina.tagline}</p>
                  <p className="mt-2 flex-1 text-xs text-[var(--fg-subtle)]">{tina.specs}</p>
                  <div className="relative z-10 mt-6">
                    <Link href={tina.href} className="mbtn mbtn-primary w-full justify-center">
                      Ver ahora
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 · Features con imagen — estilo Plunge lineup */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Lo que hace la diferencia</span>
            <h2>El mismo ADN en toda la línea.</h2>
            <p>
              Frío real sin hielo, agua siempre limpia y control total desde tu
              celular — elijas el modelo que elijas.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                t: "Frío de verdad, todos los días",
                p: "Programas la temperatura y el equipo la sostiene: desde 1 °C en la MF ONE y hasta 3 °C en los inflables. Se acabó cargar bolsas de hielo cada mañana.",
                img: "/images/mfone-frio.jpg",
                pos: "center 30%",
              },
              {
                t: "Modo calor incluido",
                p: "Contraste frío-calor en el mismo equipo: hasta 40 °C en la MF ONE y 40 °C con Motor Premium 2.0.",
                img: "/images/mfone-calor.jpg",
                pos: "center 30%",
              },
              {
                t: "Agua cristalina, sin cloro de alberca",
                p: "Filtración y ozono trabajando juntos. En la MF ONE la bomba mueve 8,000 litros por hora, así que el agua nunca se queda quieta.",
                triptych: [
                  { img: "/images/acc-filtro-carbon-vert.webp", cap: "Filtro de carbón", bg: null },
                  { img: "/images/acc-filtro-cartucho-uno.webp", cap: "Filtro de papel", bg: null },
                  { img: "/images/ozono-agua.jpg", cap: "Ozono", bg: null },
                ],
              },
              {
                t: "Control total desde tu celular",
                p: "WiFi + app en toda la línea: temperatura exacta, timers programables y modo automático 24/7.",
                img: "/photography/feature/control-app-1049.jpg",
                pos: "center",
              },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <article className="group relative h-[340px] overflow-hidden rounded-[18px] sm:h-[400px]">
                  {"triptych" in f && f.triptych ? (
                    /* Tres sistemas de purificación, lado a lado */
                    <div className="absolute inset-0 flex gap-1.5">
                      {f.triptych.map((s) => (
                        <div
                          key={s.cap}
                          className="relative min-w-0 flex-1 overflow-hidden rounded-[12px]"
                          style={{ background: s.bg ?? "var(--bg-panel)" }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.img}
                            alt={s.cap}
                            className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.05] ${
                              s.img.endsWith(".webp") ? "object-contain px-3 py-12" : "object-cover"
                            }`}
                          />
                          <span className="absolute left-1/2 top-4 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                            {s.cap}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={f.img}
                      alt={f.t}
                      style={{ objectPosition: f.pos }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(8,9,11,0.82)] via-[rgba(8,9,11,0.22)] to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3
                      className="mdisplay text-[22px] text-white sm:text-[26px]"
                      style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                    >
                      {f.t}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-white/75">
                      {f.p}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Motores — comparador compartido (mismo de los PDPs inflables) */}
      <MotorPicker />

      {/* 4 · Por qué Mente Fria — StatRow */}
      <section className="msection !pt-0 bg-[var(--m-white)]">
        <div className="mwrap">
          <Reveal className="mb-12 text-center mx-auto max-w-[68ch] mx-auto">
            <SectionHeader
              eyebrow="Por qué Mente Fria"
              title="Tecnología que se paga sola."
              subtitle="Comprar hielo todos los días cuesta más de lo que parece. Aquí la cuenta sale a tu favor desde el primer mes."
              center
            />
          </Reveal>

          <StatSpark />
        </div>
      </section>

      {/* 4.5 · Mente Fria en todas partes — banda lifestyle */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Comunidad</span>
            <h2>Mente Fria, en todas partes.</h2>
            <p>
              Más de 100 instalaciones activas en casas, clubes, hoteles y spas
              de todo México.
            </p>
          </Reveal>
          {[
            {
              name: "MF Barrel",
              href: "/productos/mf-barrel",
              photos: [
                { img: "/images/barrel-golf-wide.jpg", alt: "MF Barrel en un club de golf", pos: "center" },
                { img: "/images/barrel-retrato-moody.jpg", alt: "Inmersión en frío en un MF Barrel", pos: "center 30%" },
                { img: "/images/barrel-golf-close.jpg", alt: "MF Barrel — detalle en el club", pos: "center" },
                { img: "/photography/lifestyle/barrel-chimenea.jpg", alt: "MF Barrel junto a una chimenea", pos: "center" },
              ],
            },
            {
              name: "MF Horizon",
              href: "/productos/mf-horizon",
              photos: [
                { img: "/images/horizon-playa.jpg", alt: "MF Horizon frente al mar", pos: "center 60%" },
                { img: "/images/horizon-patio.jpg", alt: "MF Horizon en un patio en casa", pos: "center" },
                { img: "/images/horizon-playa-van.jpg", alt: "MF Horizon de viaje con la van", pos: "center" },
                { img: "/images/horizon-closeup-perfil.jpg", alt: "Inmersión en un MF Horizon", pos: "center 30%" },
              ],
            },
            {
              name: "MF ONE",
              href: "/productos/mf-one",
              photos: [
                { img: "/images/mfone-frio.jpg", alt: "MF ONE en modo frío", pos: "center 30%" },
                { img: "/images/mfone-calor.jpg", alt: "MF ONE en modo calor", pos: "center 30%" },
                { img: "/images/mfone-gallery/negro/01.jpg", alt: "MF ONE negro — render de estudio", pos: "center" },
                { img: "/images/mfone-gallery/blanco/front.jpg", alt: "MF ONE blanco — frente", pos: "center" },
              ],
            },
          ].map((group, gi) => (
            <div key={group.name} className={gi > 0 ? "mt-16" : ""}>
              <Reveal className="mb-6 flex items-baseline justify-between gap-4">
                <h3
                  className="mdisplay text-[clamp(20px,2.2vw,28px)]"
                  style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                >
                  {group.name}
                </h3>
                <Link
                  href={group.href}
                  className="flex-none text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-ice)] transition-colors hover:text-[var(--m-blue-600)]"
                >
                  Ver ahora →
                </Link>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                {group.photos.map((g, i) => (
                  <Reveal key={g.img} delay={i * 80} className={i % 2 === 1 ? "lg:translate-y-6" : ""}>
                    <figure className="group overflow-hidden rounded-[18px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.img}
                        alt={g.alt}
                        style={{ objectPosition: g.pos }}
                        className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] sm:h-[260px] lg:h-[300px]"
                      />
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 · CTA dark */}
      <CTASection
        title="Tu rutina empieza cuando tú decides."
        body="El equipo mantiene la temperatura y el agua limpia por su cuenta. Tú decides a qué hora te metes."
        cta={{ label: "Ver todos los productos", href: "#" }}
        dark
      />
    </PageShell>
  );
}
