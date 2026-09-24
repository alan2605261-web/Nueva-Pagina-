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

  Dos procedimientos, no uno (Rafa, sep 2026): la página describía solo el
  equipo con mangueras y la MF ONE no aparecía por ningún lado, aunque es la
  que más cuidado pide. Son equipos distintos: la MF ONE se vacía por tres
  puertos detrás de las rejillas y su motor va dentro de la tina; los inflables
  se vacían a mano y su motor es una unidad aparte que se conecta con
  mangueras. Cada uno tiene su apartado y sus hábitos.

  Todo lo de la MF ONE sale de respuestas que ya estaban verificadas en
  src/lib/ayuda.ts (drenado, cambio de filtro, colador, limpieza del acrílico y
  calendario por inmersiones). No se invento ni un paso.

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

/* MF ONE. Motor dentro de la tina, cuerpo de acrílico y vaciado por puertos.
   Cada paso sale de una respuesta del centro de ayuda. */
const PASOS_MF_ONE = [
  {
    n: "01",
    t: "Vacía la tina",
    puntos: [
      "Apaga desde el panel y desconecta la corriente.",
      "Los tres puertos están detrás de las rejillas laterales del módulo.",
      "Conecta una manguera de jardín de 3/4\" al puerto 1 o al 3: el agua sale por gravedad, así que el desagüe tiene que quedar más abajo que la tina.",
      "Para vaciado total abre los tres a la vez, incluido el 2, que purga el circuito interno.",
    ],
  },
  {
    n: "02",
    t: "Limpia el acrílico",
    puntos: [
      "Con la tina vacía y un material no abrasivo.",
      "Nada de detergentes fuertes, cloro de alberca ni bromo: corroen las tuberías internas y el daño no lo cubre la garantía.",
      "Cada 3 o 4 semanas.",
    ],
  },
  {
    n: "03",
    t: "Cambia el filtro",
    puntos: [
      "Abre la tapa con la llave incluida, girando en sentido contrario a las manecillas.",
      "Saca el filtro usado recto hacia arriba y asienta el nuevo completo en su base.",
      "Cierra apretando con la llave sin forzar, enciende y confirma que no hay fugas.",
      "Cada cambio de agua lleva cambio de filtro.",
    ],
  },
  {
    n: "04",
    t: "Enjuaga el colador",
    puntos: [
      "Ábrelo con la llave, sácalo y enjuágalo con agua limpia una vez por semana; cada dos o tres días si el equipo tiene mucho uso.",
      "Nunca operes el equipo sin el colador puesto: está dimensionado al flujo de la bomba.",
    ],
  },
];

/* El calendario de la MF ONE lo marca el numero de inmersiones al dia, sumando
   a todos los que la usan. Del centro de ayuda. */
const CALENDARIO_MF_ONE = [
  ["1 inmersión al día", "1 mes"],
  ["2 al día", "3 semanas"],
  ["3 al día", "10 días"],
  ["5 al día", "1 semana"],
  ["10 al día", "3 días"],
];

/* MF Barrel y MF Horizon. Tina inflable y motor externo con mangueras.
   Cada cuánto depende del uso (tabulador en src/lib/garantia-extendida.ts),
   por eso la página no da un plazo fijo. */
const PASOS_INFLABLES = [
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

/* Hábitos. Una línea cada uno: lo que hay que hacer, sin explicación larga.
   El primer grupo aplica a los tres modelos; los otros dos no, porque el motor
   de la MF ONE va dentro de la tina y el de los inflables es una unidad aparte
   (Rafa, sep 2026). */
const HABITOS = [
  {
    grupo: "Los tres modelos",
    items: [
      "Dúchate y lávate las manos antes de entrar: entrar limpio duplica la vida útil del agua.",
      "Recógete el cabello largo. Los aceites, cremas y bloqueadores son lo que más satura el filtro.",
      "Pasa el skimmer por la superficie antes de cada sesión.",
      "Cúbrela cuando no la uses: menos polvo y menos consumo.",
      "Si está llena pero apagada, cambia el agua cada 2 o 3 días.",
      "Agua turbia, con olor o resbalosa: cámbiala completa y cambia el filtro sin esperar al calendario.",
    ],
  },
  {
    grupo: "Solo la MF ONE",
    items: [
      "Rejillas libres: 100 cm al frente y 20 cm por lado.",
      "Sobre piso firme y nivelado. Con el tiempo puede asentarse: renivélala cuando pase.",
      "Nunca sin el colador puesto.",
      "Si no la vas a usar por meses: vaciado total con los tres puertos, retira el filtro, seca y déjala tapada.",
    ],
  },
  {
    grupo: "Solo el motor externo",
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
        subtitle="Un procedimiento para la MF ONE y otro para los inflables, porque no se cuidan igual. Cada cuánto darle mantenimiento depende de cuánto lo uses."
        tone="warm"
      />

      {/* ── El procedimiento, paso por paso ───────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">MF ONE</span>
            <h2>El acrílico, el filtro y el colador.</h2>
            <p>
              El módulo de enfriamiento va dentro de la tina, así que no hay
              mangueras que lavar ni una unidad aparte que guardar. Lo que sí
              hay es un vaciado por puertos y un filtro con calendario propio.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PASOS_MF_ONE.map((p, i) => (
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

          {/* Calendario de la MF ONE. Es el dato que mas se pregunta y estaba
              solo en el centro de ayuda. */}
          <Reveal className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[16px] border border-[var(--line-1)] bg-white">
            <p className="border-b border-[var(--line-1)] bg-[var(--bg-panel)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
              Cada cuándo cambiar agua y filtro
            </p>
            <dl>
              {CALENDARIO_MF_ONE.map(([uso, cada]) => (
                <div
                  key={uso}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--line-1)] px-5 py-3 last:border-b-0"
                >
                  <dt className="text-[13.5px] text-[var(--fg-muted)]">{uso}</dt>
                  <dd className="text-[14px] font-medium">{cada}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-[var(--line-1)] px-5 py-3 text-[12.5px] leading-relaxed text-[var(--fg-muted)]">
              Cuenta las inmersiones de todos los que la usan. Ante la duda, ve
              al renglón más exigente: cambiar un filtro de más cuesta mucho
              menos que un compresor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── MF Barrel y MF Horizon ────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">MF Barrel y MF Horizon</span>
            <h2>La tina, las mangueras y el motor.</h2>
            <p>
              Aquí el motor es una unidad aparte que se conecta con mangueras,
              así que el mantenimiento incluye lavarlas y volver a armar el
              equipo.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PASOS_INFLABLES.map((p, i) => (
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
            <h2>Una línea cada una.</h2>
            <p>
              El primer grupo aplica a los tres modelos. Los otros dos no: el
              motor de la MF ONE va dentro de la tina y el de los inflables es
              una unidad aparte.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
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
