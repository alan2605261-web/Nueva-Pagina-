import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const WHATSAPP = "https://wa.me/5215616471386";

/*
  Elige tu motor — sección compartida de los PDPs inflables (MF Barrel /
  MF Horizon). Formato de referencia: cards oscuras del MF Barrel.
  Las filas de features están ALINEADAS entre ambas cards:
  1 enfriamiento · 2 filtración · 3 WiFi · 4 calefacción · 5 ozono.
*/

const MOTORS = [
  {
    name: "Motor Pro 2.0",
    tag: null,
    img: "/images/motor-2-0-blanco.jpg",
    imgAlt: "Motor Pro 2.0",
    power: "0.8 HP",
    sub: "Solo frío",
    blurb:
      "La puerta de entrada al frío diario: potencia real, filtración de 3 capas y control desde la app.",
    features: [
      { ok: true, t: "Enfría hasta 3 °C (de 25 a 3 °C en ~6 h)" },
      { ok: true, t: "Filtración de 3 capas (papel, integrado y malla)" },
      { ok: true, t: "Control WiFi + app · IPX4" },
      { ok: false, t: "Sin calefacción" },
      { ok: false, t: "Sin ozono" },
    ],
    dims: "55 × 42.5 × 53 cm · 39 kg",
  },
  {
    name: "Motor Premium 2.0",
    tag: "Más popular",
    img: "/images/motor-2-0-negro.jpg",
    imgAlt: "Motor Premium 2.0",
    power: "1 HP",
    sub: "Frío y calor",
    blurb:
      "Frío y calor todo el año: rango completo de 3 a 42 °C con ozono purificando el agua 24/7.",
    features: [
      { ok: true, t: "Enfría hasta 3 °C, ~33% más rápido (~4 h)" },
      { ok: true, t: "Filtración de 3 capas (papel, integrado y malla)" },
      { ok: true, t: "Control WiFi + app" },
      { ok: true, t: "Calienta hasta 42 °C — jacuzzi mode" },
      { ok: true, t: "Purificación por ozono 24/7, sin cloro" },
    ],
    dims: "58.5 × 42.5 × 53 cm · 41.5 kg",
  },
];

export function MotorPicker({ productName }: { productName?: string }) {
  return (
    <section className="msection !bg-white">
      <div className="mwrap">
        <Reveal className="msection-head">
          <span className="m-eyebrow accent">Configúralo a tu medida</span>
          <h2>Elige tu motor.</h2>
          <p>
            {productName
              ? `El ${productName} trabaja con dos motores de la línea 2.0.`
              : "Los inflables MF Barrel y MF Horizon trabajan con dos motores de la línea 2.0."}{" "}
            Ambos enfrían hasta 3 °C sin hielo y se controlan desde la app — la
            diferencia está en la velocidad, el calor y el ozono.
          </p>
          {!productName && (
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[var(--line-1)] bg-[var(--bg-panel)] px-4 py-2 text-[12.5px] font-medium text-[var(--fg-metal)]">
              <span aria-hidden className="h-[7px] w-[7px] flex-none rounded-full bg-[var(--accent-ice)]" />
              Solo para MF Barrel y MF Horizon — la MF ONE no necesita motor: ya
              incluye su chiller de 1 HP integrado.
            </div>
          )}
        </Reveal>
        <Reveal className="grid gap-6 lg:grid-cols-2">
          {MOTORS.map((m) => (
            <article
              key={m.name}
              className={`relative flex flex-col rounded-[18px] bg-[var(--m-ink)] p-8 text-white sm:p-10 ${
                m.tag ? "ring-2 ring-[var(--accent-ice)]" : ""
              }`}
            >
              {m.tag && (
                <span className="absolute right-6 top-6 z-10 rounded-full bg-[var(--accent-ice)] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  {m.tag}
                </span>
              )}
              {/* Los archivos ya vienen reencuadrados a 4:3 desde el mismo
                  script, con el motor centrado al 86% del alto en ambos: la
                  foto llena la caja sin recortar el equipo. */}
              <div className="mb-7 aspect-[4/3] overflow-hidden rounded-[14px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.img}
                  alt={m.imgAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3
                className="mdisplay text-[clamp(24px,2.4vw,32px)]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                {m.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="mdisplay text-[44px] leading-none text-[var(--m-blue-400)]">
                  {m.power}
                </span>
                <span className="text-[13px] uppercase tracking-[0.14em] text-[var(--on-dark-subtle)]">
                  {m.sub}
                </span>
              </div>
              <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-[var(--on-dark-muted)]">
                {m.blurb}
              </p>
              <ul className="mt-7 flex-1 border-t border-white/10 pt-4">
                {m.features.map((f) => (
                  <li key={f.t} className="flex min-h-[44px] items-start gap-3 py-1.5">
                    {f.ok ? (
                      <Check
                        size={16}
                        strokeWidth={2.4}
                        className="mt-0.5 flex-none text-[var(--m-blue-400)]"
                      />
                    ) : (
                      <Minus
                        size={16}
                        strokeWidth={2.4}
                        className="mt-0.5 flex-none text-white/30"
                      />
                    )}
                    <span
                      className={`text-[14px] leading-snug ${
                        f.ok ? "text-white" : "text-[var(--on-dark-subtle)]"
                      }`}
                    >
                      {f.t}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-[11px] uppercase tracking-[0.14em] text-[var(--on-dark-subtle)]">
                {m.dims}
              </p>
            </article>
          ))}
        </Reveal>
        <Reveal className="mt-8 text-center">
          <p className="text-[13px] text-[var(--fg-muted)]">
            ¿No sabes cuál elegir?{" "}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent-ice)] hover:text-[var(--m-blue-600)]"
            >
              Escríbenos por WhatsApp
            </a>{" "}
            y te ayudamos en 2 minutos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
