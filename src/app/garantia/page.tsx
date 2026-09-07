import { PageShell } from "@/components/PageShell";
import { LegalEntity } from "@/components/LegalEntity";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

/* ─────────────────────────────────────────────────────────────
   GARANTÍA

   Las garantías son INDEPENDIENTES por producto y no se mezclan:

   · MF ONE (CP-ONE) — 12 meses. Todo el contenido de esta sección sale
     textualmente de la póliza oficial "MF ONE Garantía" (31 ago 2026).
     Fuente única de verdad: no agregar coberturas que no estén ahí.

   · MF Barrel / MF Horizon — 6 meses. TODAVÍA NO EXISTE una póliza
     equivalente para los inflables. Mientras no la haya, esta sección se
     mantiene general y sin detallar coberturas, para no atribuirles
     condiciones que son del MF ONE.
───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Garantía | Mente Fria",
  description:
    "Garantía de 12 meses del MF ONE y de 6 meses de los modelos inflables MF Barrel y MF Horizon.",
};

/* ── MF ONE — de la póliza oficial ───────────────────────────────────── */

const ONE_CUBRE = [
  "El módulo de enfriamiento, con su compresor y sus placas.",
  "Las bombas.",
  "El sistema de filtración integrado.",
  "El sistema eléctrico, electrónico y de control de fábrica, con sus sensores.",
];

const ONE_ACCESORIOS_FUERA =
  "Los accesorios quedan fuera de la garantía: cubierta aislante, skimmer, llave de filtro, portacelular y MF ONE PRO DECK.";

const ONE_POR_NUESTRA_CUENTA: [string, string][] = [
  ["Refacciones originales", "Siempre, sin costo"],
  ["Diagnóstico remoto por videollamada", "Sin costo"],
  ["Mano de obra de nuestro personal o de nuestra red", "Sin costo"],
  ["Envíos que coordinamos nosotros", "Sin costo, con guía prepagada"],
  [
    "Honorarios de un técnico que tú propongas",
    "Solo si los autorizamos por escrito antes del servicio",
  ],
  [
    "Viáticos cuando no hay técnico autorizado en tu zona",
    "Por tu cuenta, cotizados y aceptados antes de agendar",
  ],
];

const ONE_NO_CUBRE = [
  {
    grupo: "Agua, frío y sol",
    items: [
      "Congelamiento del agua en la tina o en el circuito, incluido no drenar cuando el equipo no está en uso, tras un corte prolongado de energía, o cuando la temperatura ambiente puede bajar de 2 °C.",
      "Lluvia directa, chorros, escurrimientos o inmersión sobre el compartimento del motor y sus rejillas. En exteriores va bajo techo o cubierta.",
      "Exposición del módulo de enfriamiento a luz solar directa.",
      "Operar sin agua, con el nivel por debajo de la marca mínima, con válvulas cerradas o con las rejillas obstruidas.",
    ],
  },
  {
    grupo: "Manejo y mantenimiento",
    items: [
      "Falta de mantenimiento, filtros saturados o filtros que no cumplen las especificaciones del manual.",
      "Tratamiento incorrecto del agua: cloro de alberca, bromo, solventes o químicos corrosivos.",
      "Transportar, acostar o inclinar el módulo, que siempre va en posición vertical.",
      "Daños en mudanzas, reubicaciones o transportes que no haya coordinado Mente Fria.",
      "Líquidos distintos al agua, y cargar la estructura con pesos u objetos ajenos a su uso normal.",
      "Equipos abiertos, alterados o reparados por personal que no hayamos autorizado.",
    ],
  },
  {
    grupo: "Desgaste, estética y causas externas",
    items: [
      "Desgaste natural y consumibles: filtros, empaques, sellos y mangueras.",
      "Daños estéticos y roturas: rayones, grietas, fisuras, decoloración y manchas de la carcasa y la superficie acrílica, salvo que vengan de un defecto de fabricación.",
      "Daños por sobretensiones, descargas eléctricas o variaciones bruscas del suministro, y el uso de extensiones, multicontactos o instalación eléctrica sin tierra. Un regulador de voltaje no cuenta como extensión.",
      "Caso fortuito o fuerza mayor: incendio, inundación, sismo, robo, vandalismo y plagas.",
    ],
  },
];

const ONE_PROCESO = [
  {
    n: "01",
    t: "Avísanos",
    d: "Escríbenos por WhatsApp o correo en cuanto detectes la falla, con la descripción, fotos o video y tu comprobante.",
  },
  {
    n: "02",
    t: "Diagnóstico remoto",
    d: "Respondemos en máximo 3 días hábiles y agendamos una videollamada con un técnico. Buena parte de las fallas se resuelven ahí.",
  },
  {
    n: "03",
    t: "Definimos la vía de atención",
    d: "Según el diagnóstico: enviarlo a nuestras instalaciones con guía prepagada, atenderlo en sitio con autorización por escrito, o enviarte la refacción con acompañamiento por videollamada. Si hay que enviarlo, va drenado y entarimado.",
  },
  {
    n: "04",
    t: "Reparación",
    d: "Reparamos con refacciones originales. Cada reparación queda garantizada 90 días naturales desde su entrega, conforme al artículo 81 de la Ley Federal de Protección al Consumidor.",
  },
];

export default function GarantiaPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Soporte"
        title="Garantía"
        subtitle="Cada producto tiene su propia garantía. La del MF ONE y la de los modelos inflables son independientes entre sí."
        tone="warm"
      />

      {/* ── Resumen por producto ───────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <article className="mx-auto max-w-[68ch]">
              <h2 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">Cobertura por producto</h2>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                <li>
                  <strong>MF ONE</strong> — 12 meses contra defectos de
                  fabricación y de funcionamiento, contados desde la fecha de
                  entrega.
                </li>
                <li>
                  <strong>MF Barrel y MF Horizon</strong> — 6 meses contra
                  defectos de fabricación, contados desde la fecha de entrega.
                </li>
              </ul>
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                Son garantías distintas, con coberturas y condiciones propias.
                Lo que aplica al MF ONE no aplica a los inflables, ni al revés.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── MF ONE ─────────────────────────────────────────── */}
      <section id="mf-one" className="msection panel scroll-mt-20">
        <div className="mwrap">
          <Reveal>
            <article className="mx-auto max-w-[68ch]">
              <p className="m-eyebrow accent mb-3">Garantía limitada · MF ONE · CP-ONE</p>
              <h2 className="mdisplay text-[clamp(26px,3.4vw,44px)] mb-6">Doce meses, desde que la recibes</h2>

              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-4">
                Garantizamos el MF ONE contra defectos de fabricación y de
                funcionamiento durante doce meses contados desde la entrega, en
                condiciones normales de uso y sin costo para ti.
              </p>
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-10">
                La fecha de inicio la registra la paquetería al entregar en el
                domicilio que nos indicaste, y queda asentada en nuestros
                sistemas de envío. Si no existiera ese registro, cuenta la fecha
                de tu comprobante de compra.
              </p>

              <h3 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">Qué componentes ampara</h3>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                {ONE_CUBRE.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-10">
                {ONE_ACCESORIOS_FUERA}
              </p>

              <h3 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">Qué corre por nuestra cuenta</h3>
              <dl className="mb-10 divide-y divide-[var(--line-1)] border-y border-[var(--line-1)]">
                {ONE_POR_NUESTRA_CUENTA.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                  >
                    <dt className="text-[16px] leading-relaxed text-[var(--fg-muted)]">{k}</dt>
                    <dd className="text-sm font-semibold text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mb-10 rounded-xl border border-[var(--line-1)] p-6">
                <p className="m-eyebrow accent mb-3">Condición de validez</p>
                <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                  La garantía depende de que cumplas el programa de
                  mantenimiento del manual. Un filtro de papel saturado reduce el
                  flujo, obliga al compresor a trabajar de más y termina por
                  dañarlo. Conserva los comprobantes de compra de filtros:
                  comprarlos originales con la frecuencia del calendario acredita
                  el cumplimiento.
                </p>
              </div>

              <h3 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">Qué no cubre</h3>
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-6">
                Ninguno de estos casos queda cubierto, aunque el equipo esté
                dentro de los doce meses de vigencia.
              </p>
              {ONE_NO_CUBRE.map((g) => (
                <div key={g.grupo} className="mb-8">
                  <p className="m-eyebrow accent mb-3">{g.grupo}</p>
                  <ul className="list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mb-10 rounded-xl border border-[var(--line-1)] p-6">
                <p className="m-eyebrow accent mb-3">Uso comercial</p>
                <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                  La garantía cubre uso residencial y comercial. En hoteles,
                  spas y gimnasios el mantenimiento se cumple con la frecuencia
                  que corresponde al mayor número de inmersiones diarias.
                </p>
              </div>

              <h3 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-6">Cómo se hace válida</h3>
              <ol className="mb-10 space-y-6">
                {ONE_PROCESO.map((p) => (
                  <li key={p.n} className="flex gap-5">
                    <span className="text-2xl font-light text-[var(--fg-subtle)]">
                      {p.n}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{p.t}</p>
                      <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mt-1 text-[var(--fg-muted)]">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h3 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">Los datos de tu equipo</h3>
              <dl className="mb-4 divide-y divide-[var(--line-1)] border-y border-[var(--line-1)]">
                {[
                  ["Marca, producto y modelo", "Mente Fria · MF ONE · CP-ONE"],
                  ["País de origen", "Hecho en China"],
                  ["Vigencia", "12 meses desde la fecha de entrega"],
                  [
                    "Número de serie",
                    "Impreso en la etiqueta del costado del módulo",
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                  >
                    <dt className="text-[16px] leading-relaxed text-[var(--fg-muted)]">{k}</dt>
                    <dd className="text-sm font-semibold text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm leading-relaxed text-[var(--fg-subtle)]">
                Tu recibo de compra forma parte de esta garantía. Con tu nombre y
                tu guía localizamos el equipo; el número de serie hace falta solo
                si cambió de domicilio o de dueño.
              </p>

              <LegalEntity rol="garantia" />
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── Inflables ──────────────────────────────────────── */}
      <section id="inflables" className="msection scroll-mt-20">
        <div className="mwrap">
          <Reveal>
            <article className="mx-auto max-w-[68ch]">
              <p className="m-eyebrow accent mb-3">Garantía limitada · MF Barrel y MF Horizon</p>
              <h2 className="mdisplay text-[clamp(26px,3.4vw,44px)] mb-6">Seis meses en los modelos inflables</h2>

              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-4">
                MF Barrel y MF Horizon tienen 6 meses de garantía contra defectos
                de fabricación, contados desde la fecha de entrega, en
                condiciones normales de uso.
              </p>
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-4">
                Es una garantía independiente de la del MF ONE: cubre productos
                distintos, con componentes distintos. Los motores de la línea 2.0
                y sus consumibles se rigen por sus propias condiciones.
              </p>
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-8">
                Igual que en el MF ONE, quedan fuera el desgaste natural y los
                consumibles, los daños por mal uso o transporte, y las
                reparaciones hechas por personal no autorizado.
              </p>

              <div className="rounded-xl border border-[var(--line-1)] p-6">
                <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                  Para reportar una falla en tu MF Barrel o MF Horizon,
                  escríbenos por WhatsApp o a{" "}
                  <a href="mailto:soporte@mentefria.com" className="underline">
                    soporte@mentefria.com
                  </a>{" "}
                  con la descripción, fotos o video y tu comprobante de compra.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── Prueba de 30 días ──────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal>
            <article className="mx-auto max-w-[68ch]">
              <h2 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">Además: 30 días de prueba</h2>
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                La garantía es una cosa y la prueba es otra. Todos nuestros
                equipos incluyen 30 días de prueba: si no es la mejor cold plunge
                que has probado, te regresamos tu dinero, sin preguntas. Los
                costos de envío de la devolución corren por nuestra cuenta.
              </p>
            </article>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
