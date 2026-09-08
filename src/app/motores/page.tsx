import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { MotorPicker } from "@/components/MotorPicker";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";

/* ─────────────────────────────────────────────────────────────
   MOTORES MENTE FRIA

   El menú Aprender enlazaba "Motores Mente Fria" a /accesorios, donde no hay
   nada de motores. Esta página llena ese cascarón.

   Datos verificados de la línea 2.0. Regla dura del proyecto: los motores son
   SOLO para MF Barrel y MF Horizon. La MF ONE lleva su chiller dentro de la
   tina y nunca se combina con un motor.
───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Motores Mente Fria | Motor Pro 2.0 y Motor Premium 2.0",
  description:
    "El motor es el corazón de tu cold plunge inflable. Compara el Motor Pro 2.0 y el Motor Premium 2.0: potencia, velocidad de enfriamiento, calefacción y ozono.",
};

const SPECS: { label: string; pro: string; premium: string }[] = [
  { label: "Potencia", pro: "0.8 HP", premium: "1 HP" },
  { label: "Enfriamiento", pro: "Hasta 3 °C", premium: "Hasta 3 °C" },
  { label: "De 25 a 3 °C", pro: "~6 horas", premium: "~4 horas" },
  { label: "Calefacción", pro: "No incluye", premium: "Hasta 42 °C" },
  { label: "Ozono", pro: "No incluye", premium: "Purificación 24/7" },
  { label: "Filtración", pro: "3 capas: papel, integrado y malla", premium: "3 capas: papel, integrado y malla" },
  { label: "Control", pro: "WiFi + app", premium: "WiFi + app" },
  { label: "Resistencia al agua", pro: "IPX4", premium: "IPX4" },
  { label: "Dimensiones", pro: "55 × 42.5 × 53 cm", premium: "58.5 × 42.5 × 53 cm" },
  { label: "Peso", pro: "39 kg", premium: "41.5 kg" },
  { label: "Compatibilidad", pro: "MF Barrel y MF Horizon", premium: "MF Barrel y MF Horizon" },
];

const CUIDADOS = [
  {
    n: "01",
    t: "El motor va derecho, siempre",
    d: "Se transporta y se guarda en posición vertical. Acostarlo o inclinarlo puede dañar el compresor de forma permanente. Después de moverlo, déjalo reposar 24 horas antes de conectarlo para que el refrigerante se asiente.",
  },
  {
    n: "02",
    t: "Nunca lo enciendas sin agua",
    d: "Antes de arrancar, verifica que la tina tenga agua suficiente y que las mangueras estén bien conectadas. La bomba girando en vacío hace ruido y le acorta la vida.",
  },
  {
    n: "03",
    t: "Filtro limpio, motor sano",
    d: "Un filtro saturado reduce el flujo y obliga al compresor a trabajar de más. Cámbialo con cada cambio de agua y limpia la rejilla de polvo con regularidad.",
  },
  {
    n: "04",
    t: "Aire y sombra",
    d: "Deja espacio libre alrededor de las rejillas para que el aire circule, y mantén el motor fuera del sol directo y protegido de la lluvia. Bajo techo, siempre.",
  },
];

const FAQ_ITEMS = [
  {
    q: "¿La MF ONE necesita motor?",
    a: "No. La MF ONE es all-in-one: lleva el sistema de enfriamiento integrado dentro de la tina, sin motor aparte ni mangueras que tender. Los motores de la línea 2.0 son exclusivamente para MF Barrel y MF Horizon.",
  },
  {
    q: "¿Cuál me conviene?",
    a: "Si solo buscas frío, el Motor Pro 2.0 cumple: baja a 3 °C y trae la misma filtración de 3 capas y el mismo control por app. El Motor Premium 2.0 tiene sentido si quieres contraste frío-calor en el mismo equipo, si te importa enfriar en ~4 horas en lugar de ~6, o si vas a darle uso intensivo y quieres el ozono purificando 24/7.",
  },
  {
    q: "¿Puedo cambiar de motor después?",
    a: "Sí. El motor y la tina son piezas independientes, así que puedes empezar con el Pro 2.0 y subir al Premium 2.0 más adelante sin cambiar tu tina. Escríbenos y te cotizamos el cambio.",
  },
  {
    q: "¿Sirve el mismo motor para Barrel y Horizon?",
    a: "Sí. Ambos motores de la línea 2.0 son compatibles con MF Barrel y con MF Horizon indistintamente.",
  },
  {
    q: "¿Cada cuánto cambio los filtros?",
    a: "Con cada cambio de agua, que con la filtración trabajando ocurre cada 3 a 5 semanas según el uso. El proceso es sencillo y no requiere técnico.",
  },
  {
    q: "¿Cuánto consume al mes?",
    a: "Depende de la temperatura que programes, del clima de tu ciudad y de si usas la cubierta entre inmersiones. Con la cubierta puesta el motor trabaja mucho menos, porque no tiene que pelear contra el calor del ambiente.",
  },
];

export default function MotoresPage() {
  return (
    <PageShell>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="max-w-3xl">
            <span className="m-eyebrow accent">Aprender · Motores</span>
            <h1
              className="mdisplay mt-4 text-[clamp(34px,5vw,68px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              El motor es el corazón de tu plunge.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-[var(--fg-muted)]">
              En los modelos inflables, la tina guarda el agua y el motor hace el
              trabajo: enfría, filtra y, según el modelo, también calienta y
              purifica con ozono. Elegir bien el motor importa más que elegir la
              tina.
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[13px] font-medium"
            style={{
              borderColor: "var(--line-1)",
              background: "var(--m-white)",
              color: "var(--fg-metal)",
            }}
          >
            <span
              aria-hidden
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: "var(--accent-ice)" }}
            />
            Solo para MF Barrel y MF Horizon — la MF ONE no necesita motor
          </Reveal>
        </div>
      </section>

      {/* ── Comparador ─────────────────────────────────────── */}
      <MotorPicker />

      {/* ── Tabla de especificaciones ──────────────────────── */}
      <section className="msection panel scroll-mt-20" id="comparativa">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Lado a lado</span>
            <h2>Las diferencias, en números.</h2>
          </Reveal>

          <Reveal className="compare-scroll">
            <table className="compare">
              <thead>
                <tr>
                  <th />
                  <th>Motor Pro 2.0</th>
                  <th className="col-mf">Motor Premium 2.0</th>
                </tr>
              </thead>
              <tbody>
                {SPECS.map((r, i) => (
                  <tr key={r.label} style={{ "--i": i } as React.CSSProperties}>
                    <td>{r.label}</td>
                    <td>{r.pro}</td>
                    <td className="col-mf">{r.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ── Cuidados ───────────────────────────────────────── */}
      <section className="msection dark-s">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Cuidado del motor</span>
            <h2>Cuatro cosas que alargan su vida.</h2>
            <p>
              El motor es la pieza cara del equipo. Estas cuatro son las que
              evitan la mayoría de las fallas que atendemos.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {CUIDADOS.map((c, i) => (
              <Reveal
                key={c.n}
                delay={(i % 2) * 80}
                className="rounded-[18px] border p-7"
                style={{ borderColor: "var(--on-dark-line)" }}
              >
                <p
                  className="mdisplay text-[34px] leading-none"
                  style={{ color: "var(--m-blue-400)" }}
                >
                  {c.n}
                </p>
                <h3 className="mdisplay mt-4 text-[20px] text-white">{c.t}</h3>
                <p
                  className="mt-3 text-[14.5px] leading-relaxed"
                  style={{ color: "var(--on-dark-muted)" }}
                >
                  {c.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Preguntas frecuentes</span>
            <h2>Sobre los motores.</h2>
          </Reveal>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap text-center">
          <Reveal className="mx-auto max-w-2xl">
            <span className="m-eyebrow accent">Elige tu tina</span>
            <h2
              className="mdisplay mt-4 text-[clamp(28px,3.8vw,50px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              El motor va con tu MF Barrel o tu MF Horizon.
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/productos/mf-barrel" className="mbtn mbtn-primary">
                Ver MF Barrel
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/productos/mf-horizon" className="mbtn mbtn-ghost">
                Ver MF Horizon
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
