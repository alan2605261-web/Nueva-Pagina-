import { PageShell } from "@/components/PageShell";
import { SubHero, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { AlertTriangle, Check } from "lucide-react";

/*
  /soporte/cuidado — Cuida tu MF Plunge

  Estructura tomada de mentefria.com/pages/cuida-tu-mf-plunge, que es la que
  Saul prefiere: el mantenimiento como un procedimiento numerado (01 a 04) que
  cierra con el video, en lugar de tres columnas de párrafos.

  Los hábitos de abajo iban como párrafos largos y nadie los leía. Ahora son
  casillas de una línea: el dato accionable y nada más.

  Dos correcciones que se conservan sobre el original, verificadas contra el
  manual v6, y que NO hay que revertir al comparar con el sitio vivo:
  · El reposo del motor va a 24 horas; la página vieja dice 12.
  · Se quitó el "estamos disponibles 24/7" del cierre.
*/

export const metadata = {
  title: "Cuida tu MF Plunge | Mente Fria",
  description:
    "El mantenimiento paso a paso, los hábitos que alargan la vida del equipo y lo que conserva la garantía.",
};

/* El procedimiento completo. Cada cuánto depende del uso (tabulador en
   src/lib/garantia-extendida.ts), por eso la página no da un plazo fijo. */
const PASOS = [
  {
    n: "01",
    t: "Drena el agua",
    puntos: [
      "Apaga y desconecta el motor antes de empezar.",
      "Vacía la tina por completo.",
    ],
  },
  {
    n: "02",
    t: "Limpia la tina",
    puntos: [
      "Seca los restos de agua con un trapo limpio.",
      "Lava interior y exterior con jabón suave y esponja.",
      "Revisa que no haya moho en el contorno y las uniones.",
      "Pasa agua jabonosa por las mangueras y enjuaga.",
      "Deja secar al aire antes de volver a llenar.",
    ],
  },
  {
    n: "03",
    t: "Revisa el motor",
    puntos: [
      "Cambia el filtro de papel si está sucio.",
      "Limpia la malla antipolvo cada 3 meses.",
      "Verifica que las conexiones estén firmes y sin fugas.",
    ],
  },
  {
    n: "04",
    t: "Vuelve a instalar",
    puntos: [
      "Infla la tina y conecta las mangueras al motor.",
      "Llena con agua limpia y enciende para verificar.",
    ],
  },
];

/* Hábitos. Una línea cada uno: lo que hay que hacer, sin explicación larga. */
const HABITOS = [
  {
    grupo: "Mientras tiene agua",
    items: [
      "Dúchate y lávate las manos antes de entrar.",
      "Pasa el skimmer por la superficie antes de cada sesión.",
      "Tapete absorbente al frente si está en exterior.",
      "Cúbrela cuando no la uses: menos polvo y menos consumo.",
    ],
  },
  {
    grupo: "El motor, siempre",
    items: [
      "De pie. Si estuvo acostado, 24 horas vertical antes de conectarlo.",
      "Bajo techo: no son resistentes al agua.",
      "Fuera del sol directo y con aire alrededor de las rejillas.",
      "Con su cobertor cuando no se usa.",
    ],
  },
];

export default function CuidadoPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Mantenimiento"
        title={"Cuida tu MF Plunge."}
        subtitle="El procedimiento completo y los hábitos que alargan la vida del equipo. Cada cuánto darle mantenimiento depende de cuánto lo uses."
        tone="warm"
      />

      {/* ── El procedimiento, paso por paso ───────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Según el uso</span>
            <h2>Mantenimiento del motor y la tina.</h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <article className="flex h-full flex-col rounded-[16px] border border-[var(--line-1)] bg-white p-6">
                  <span className="mdisplay text-[32px] leading-none text-[var(--accent-ice)]">
                    {p.n}
                  </span>
                  <h3 className="mt-3 text-[17px] font-semibold leading-tight">{p.t}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {p.puntos.map((x) => (
                      <li key={x} className="flex items-start gap-2.5">
                        <Check
                          size={15}
                          strokeWidth={2.6}
                          className="mt-[3px] flex-none text-[var(--accent-ice)]"
                        />
                        <span className="text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                          {x}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          {/* El video cierra el procedimiento, como en el sitio vivo. No cubre
              los cuatro pasos (no muestra el drenado), por eso se presenta como
              video de apoyo y no como "los cuatro pasos" (Saul, sep 2026). Centrado
              y al ancho de las tarjetas de /soporte/instalacion.

              El rotulo va ARRIBA del reproductor: abajo llegaba despues de la
              miniatura y no ayudaba a identificar que era. Lleva la duracion
              por lo mismo. */}
          <Reveal className="mx-auto mt-12 max-w-md text-center">
            <h3 className="text-[17px] font-semibold">
              Video de apoyo
            </h3>
            <p className="mt-1.5 mb-4 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
              57 segundos. Complementa los pasos de arriba.
            </p>
            <div className="overflow-hidden rounded-[16px] bg-[var(--m-graphite)]">
              <video
                src="/videos/tutorial-mantenimiento.mp4"
                poster="/videos/posters/tutorial-mantenimiento.jpg"
                controls
                preload="metadata"
                playsInline
                className="aspect-video w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-10 flex max-w-2xl items-start gap-3.5 rounded-[14px] border border-[var(--line-1)] bg-[var(--bg-panel)] p-5">
            <AlertTriangle
              size={18}
              strokeWidth={2}
              className="mt-[2px] flex-none text-[var(--fg-metal)]"
            />
            <p className="text-[13.5px] leading-relaxed">
              <span className="font-semibold">Importante.</span> No dar el
              mantenimiento en los tiempos indicados, exponer el motor a la lluvia o al
              sol directo, o usar cloro y limpiadores abrasivos dentro de la tina puede
              anular la garantía.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Hábitos, en casillas ──────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">El día a día</span>
            <h2>Ocho cosas, una línea cada una.</h2>
            <p>
              Aplica a la MF ONE y a los dos modelos inflables por igual, salvo donde se
              indique.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            {HABITOS.map((g, i) => (
              <Reveal key={g.grupo} delay={i * 90}>
                <div className="h-full rounded-[16px] border border-[var(--line-1)] bg-white p-6">
                  <p className="m-eyebrow accent">{g.grupo}</p>
                  <ul className="mt-4 space-y-3">
                    {g.items.map((x) => (
                      <li key={x} className="flex items-start gap-3">
                        <span className="mt-[2px] grid h-[18px] w-[18px] flex-none place-items-center rounded-[5px] border border-[var(--line-2)] text-[var(--accent-ice)]">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-[14px] leading-snug">{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="¿Dudas con el mantenimiento?"
        body="El centro de ayuda tiene el calendario de filtros y los códigos de error."
        cta={{ label: "Ir al centro de ayuda", href: "/soporte/centro-de-ayuda" }}
        dark
      />
    </PageShell>
  );
}
