import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { Check } from "lucide-react";
import { INCLUYE, PLANES } from "@/lib/garantia-extendida";

/* ─────────────────────────────────────────────────────────────
   GARANTÍA — selector

   Era una sola página de 489 líneas con las tres pólizas apiladas: llegabas y
   te caía todo encima. Saul pidió en sep 2026 el patrón de Plunge — elegir
   primero tu equipo y solo entonces leer lo que te toca.

   Esta página no lleva términos. Solo el dato que sirve para elegir: cuántos
   meses y desde cuándo. El detalle vive en:
     /garantia/mf-one      · 12 meses, de la póliza oficial
     /garantia/inflables   · 6 meses, MF Barrel y MF Horizon con su motor
     /garantia/extendida   · MF Shield, hasta el mes 24

   Motor e inflable van en UNA sola póliza (Saul, sep 2026). Existía una
   tarjeta y una página aparte para Motor Pro y Premium que decía "póliza
   propia, distinta de la de la tina": era falso y se eliminó.
───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Garantía",
  description:
    "Elige tu equipo y consulta su póliza: 12 meses en la MF ONE y 6 meses en MF Barrel y MF Horizon, con su motor incluido.",
};

const POLIZAS = [
  {
    t: "MF ONE",
    meses: "12 meses",
    img: "/images/prod-mfone.webp",
    d: "Contra defectos de fabricación y de funcionamiento, desde la fecha de entrega.",
    href: "/garantia/mf-one",
  },
  {
    t: "MF Barrel",
    meses: "6 meses",
    img: "/images/prod-barrel-nobg.png",
    d: "La tina y su motor, Pro 2.0 o Premium 2.0, en una misma póliza desde la fecha de entrega.",
    href: "/garantia/inflables",
  },
  {
    t: "MF Horizon",
    meses: "6 meses",
    img: "/images/prod-horizon-nobg.png",
    d: "La tina y su motor, Pro 2.0 o Premium 2.0, en una misma póliza desde la fecha de entrega.",
    href: "/garantia/inflables",
  },
];

const money = (n: number) => "$" + n.toLocaleString("en-US");

/* MF Shield en cifras, para que se entienda sin abrir su página: cuántos meses
   trae el equipo, hasta dónde llega con Shield y desde cuánto cuesta. Todo sale
   de PLANES (contratos firmados). */
const SHIELD = [
  {
    equipo: "MF ONE",
    incluidos: 12,
    extra: 12,
    desde: Math.min(...PLANES.filter((p) => p.producto === "mf-one").map((p) => p.precio)),
    nota: "Uso residencial y comercial.",
  },
  {
    equipo: "MF Barrel y MF Horizon",
    incluidos: 6,
    extra: 18,
    desde: Math.min(...PLANES.filter((p) => p.producto !== "mf-one").map((p) => p.precio)),
    nota: "Con Motor Premium, uso residencial y comercial. Con Motor Pro, solo residencial.",
  },
];

export default function GarantiaPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Soporte"
        title="Garantía"
        subtitle="Elige tu equipo para ver su póliza."
        tone="warm"
      />

      {/* ── Selector ───────────────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <div className="grid gap-6 md:grid-cols-3">
            {POLIZAS.map((p, i) => (
              <Reveal key={p.t} delay={i * 90}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--line-1)] bg-white transition-colors duration-200 hover:border-[var(--accent-ice)]"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-[var(--bg-panel)] p-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* Mismos anchos que en el resto del sitio: 70% el
                        Barrel, 78% la MF ONE y 84% el Horizon. Antes las tres
                        se ajustaban al alto de la caja, así que las tres
                        salían del mismo tamaño y el Barrel, que es el equipo
                        más chico, se veía igual de grande que la MF ONE. */}
                    <img
                      src={p.img}
                      alt={p.t}
                      loading="lazy"
                      decoding="async"
                      className={`h-auto max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.04] ${
                        p.t === "MF Barrel" ? "w-[66%]" : p.t === "MF ONE" ? "w-full" : "w-[97%]"
                      }`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="m-eyebrow accent">{p.meses}</span>
                    <h2 className="mdisplay mt-2.5 text-[21px] leading-tight">{p.t}</h2>
                    <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                      {p.d}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-ice)]">
                      Ver la póliza
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MF Shield ──────────────────────────────────────────
          Antes era una tarjeta de dos líneas ("extiende cualquiera de las
          pólizas hasta dos años") y Saul la encontró abstracta: no se
          entendía cuánto dura cada cosa. Ahora se ve en una barra de 24 meses
          qué parte trae el equipo y qué parte agrega Shield. */}
      <section className="msection panel">
        <div className="mwrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="m-eyebrow accent">Garantía extendida</span>
            <h2
              className="mdisplay mt-3 text-[clamp(28px,3.4vw,44px)] leading-[1.02]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              MF Shield: tu equipo cubierto hasta el mes 24.
            </h2>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-[var(--fg-muted)]">
              Arranca el día que termina tu garantía y la lleva hasta los dos años. Es
              un pago único y se contrata mientras la garantía de tu equipo siga
              vigente.
            </p>
            <ul className="mt-7 space-y-3">
              {INCLUYE.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[14px] leading-relaxed">
                  <Check size={16} strokeWidth={2.4} className="mt-[3px] flex-none text-[var(--accent-ice)]" />
                  {x}
                </li>
              ))}
            </ul>
            <Link
              href="/garantia/extendida"
              className="mbtn mbtn-primary mt-8 inline-flex"
            >
              Ver cobertura y precios
            </Link>
          </Reveal>

          <Reveal delay={100} className="space-y-5">
            {SHIELD.map((s) => (
              <div key={s.equipo} className="rounded-[18px] border border-[var(--line-1)] bg-white p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="mdisplay text-[20px]">{s.equipo}</h3>
                  <p className="text-[13px] text-[var(--fg-muted)]">
                    MF Shield desde <span className="font-semibold text-[var(--fg-metal)]">{money(s.desde)} MXN</span>
                  </p>
                </div>

                {/* Barra de 24 meses */}
                <div className="mt-5 flex h-11 overflow-hidden rounded-[10px] text-[11.5px] font-semibold">
                  <div
                    className="flex items-center justify-center bg-[var(--m-ink)] px-2 text-white"
                    style={{ width: `${(s.incluidos / 24) * 100}%` }}
                  >
                    {s.incluidos} meses
                  </div>
                  <div
                    className="flex items-center justify-center bg-[var(--accent-ice)] px-2 text-white"
                    style={{ width: `${(s.extra / 24) * 100}%` }}
                  >
                    +{s.extra} meses con MF Shield
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-[var(--fg-subtle)]">
                  <span>Entrega</span>
                  <span>Mes {s.incluidos}</span>
                  <span>Mes 24</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-[var(--fg-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--m-ink)]" /> Incluida con tu equipo
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-ice)]" /> MF Shield
                  </span>
                </div>
                <p className="mt-3 text-[12.5px] text-[var(--fg-subtle)]">{s.nota}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 30 días ─────────────────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <Link
              href="/devoluciones"
              className="mx-auto flex max-w-4xl flex-col gap-4 rounded-[16px] border border-[var(--line-1)] bg-white p-7 transition-colors duration-200 hover:border-[var(--accent-ice)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                {/* La version anterior era el tramite ("solicitar una
                    devolucion", "corre por su cuenta") y no lo que de verdad
                    ofrece, que es meterse un mes entero sin riesgo (Saul, sep
                    2026). Tambien decia "desde la compra" cuando la politica de
                    /devoluciones cuenta los 30 dias desde que recibes el
                    equipo. */}
                <span className="m-eyebrow accent">Aparte de la garantía</span>
                <h2 className="mdisplay mt-2.5 text-[22px] leading-tight">
                  Pruébala un mes entero.
                </h2>
                <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-[var(--fg-muted)]">
                  Llénala, métete todos los días y decide con el equipo puesto.
                  Si no te fascina, la recogemos y te devolvemos tu dinero sin
                  pedirte explicaciones. Tienes 30 días desde que la recibes.
                </p>
              </div>
              <span className="inline-flex flex-none items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-ice)]">
                Cómo funciona
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
