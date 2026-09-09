import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { FAQ } from "@/components/FAQ";
import {
  PLANES,
  CUBRE_MF_ONE,
  CUBRE_INFLABLE,
  INCLUYE,
  NO_CUBRE,
  PASOS,
  VIAS,
  LETRA_CHICA,
  REPOSICION_TINA,
  TABULADOR_MF_ONE,
  TABULADOR_PRO,
} from "@/lib/garantia-extendida";

/* ─────────────────────────────────────────────────────────────
   MF SHIELD — garantía extendida.

   Todo lo de esta página sale de los cinco contratos de garantía
   extendida (MF ONE, Barrel Pro/Premium, Horizon Pro/Premium).
   No se publica aquí ningún dato técnico del producto: para eso
   mandan los manuales y las fichas.
───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "MF Shield — garantía extendida | Mente Fria",
  description:
    "MF Shield extiende la garantía de tu equipo hasta el mes 24, con refacciones originales y mano de obra incluidas. Precios, cobertura y cómo se atiende una reclamación.",
};

const money = (n: number) => "$" + n.toLocaleString("en-US");

const FAQ_ITEMS = [
  {
    q: "¿Cuándo puedo contratar MF Shield?",
    a: "En cualquier momento mientras tu garantía estándar siga vigente, sujeto a una validación técnica de nuestra parte. Si la garantía estándar ya venció, el equipo ya no es elegible.",
  },
  {
    q: "¿MF Shield sustituye a la garantía que ya venía con mi equipo?",
    a: "No. Es adicional. Arranca el día que termina la garantía estándar y corre hasta el mes 24. Tampoco limita los derechos que te da la Ley Federal de Protección al Consumidor.",
  },
  {
    q: "¿Qué pasa si vivo fuera de la Ciudad de México?",
    a: "La Ciudad de México es la zona fija de servicio. Fuera de ella el caso se revisa según la red de operación vigente al momento de la reclamación: puede resolverse con un técnico autorizado de tu estado, con traslado del equipo a nuestras instalaciones con guía prepagada, o con una refacción de instalación guiada por videollamada.",
  },
  {
    q: "¿Tengo que usar filtros Mente Fria?",
    a: "No es obligatorio, pero usarlos te simplifica la vida: la evidencia de compra periódica conforme al tabulador acredita por sí sola que cumpliste el mantenimiento. Con filtros de terceros tendrás que demostrar que cumplen las especificaciones del manual y que los cambiaste con la frecuencia correcta.",
  },
  {
    q: "¿MF Shield me devuelve dinero si el equipo falla?",
    a: "No. Es un contrato de reparación: la prestación es reparar el componente con refacciones originales. No contempla reembolsos, indemnizaciones ni pagos en dinero, y no es transferible a un nuevo dueño.",
  },
  {
    q: "¿Cubre si uso el equipo en mi negocio?",
    a: "Depende del equipo. La MF ONE y los inflables con Motor Premium cubren uso residencial y comercial. Los inflables con Motor Pro cubren únicamente uso residencial: usarlos en un hotel, spa, gimnasio o renta invalida la cobertura.",
  },
];

function Tabla({ t }: { t: typeof TABULADOR_MF_ONE }) {
  return (
    <div>
      <p className="m-eyebrow accent mb-3">{t.motor}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
          <thead>
            <tr className="border-b border-[var(--line-2)]">
              <th className="py-2.5 pr-4 text-left font-semibold">Inmersiones</th>
              {t.columnas.map((c) => (
                <th key={c} className="px-2 py-2.5 text-center font-semibold text-[var(--fg-muted)]">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.filas.map((f) => (
              <tr key={f.tarea} className="border-b border-[var(--line-1)]">
                <td className="py-2.5 pr-4 font-medium">{f.tarea}</td>
                {f.valores.map((v, i) => (
                  <td key={i} className="px-2 py-2.5 text-center text-[var(--fg-muted)]">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--fg-subtle)]">{t.nota}</p>
    </div>
  );
}

export default function GarantiaExtendidaPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Soporte · MF Shield"
        title="Garantía extendida"
        subtitle="Tu equipo sale con garantía estándar. MF Shield la continúa hasta el mes 24 con refacciones originales, mano de obra y logística incluidas."
        tone="warm"
      />

      {/* ── Precios por equipo ─────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Precio y vigencia</span>
            <h2>Un pago único, por equipo.</h2>
            <p>
              El precio depende del equipo que tengas. La cobertura empieza el día que
              termina tu garantía estándar y corre hasta el mes 24 en todos los casos.
            </p>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLANES.map((p) => (
              <div
                key={p.id}
                className="rounded-[16px] border border-[var(--line-1)] bg-white p-6"
              >
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                  {p.equipo}
                </p>
                <p className="mdisplay mt-3 text-[clamp(26px,2.6vw,34px)]">{money(p.precio)}</p>
                <p className="text-[12px] text-[var(--fg-subtle)]">MXN, pago único</p>

                <dl className="mt-5 space-y-2 border-t border-[var(--line-1)] pt-5 text-[13.5px]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--fg-muted)]">Garantía estándar</dt>
                    <dd className="text-right font-medium">{p.estandarMeses} meses</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--fg-muted)]">MF Shield</dt>
                    <dd className="text-right font-medium">
                      mes {p.desdeMes} al {p.hastaMes}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--fg-muted)]">Cobertura total</dt>
                    <dd className="text-right font-medium">24 meses</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--fg-muted)]">Uso amparado</dt>
                    <dd className="text-right font-medium capitalize">{p.uso}</dd>
                  </div>
                </dl>

                <Link
                  href={`/productos/${p.producto}`}
                  className="mt-5 inline-block text-[13px] font-semibold text-[var(--accent-ice)] underline underline-offset-4"
                >
                  Agregarlo a tu {p.producto === "mf-one" ? "MF ONE" : p.producto === "mf-barrel" ? "MF Barrel" : "MF Horizon"}
                </Link>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Qué cubre ──────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Cobertura</span>
            <h2>Qué cubre.</h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-[16px] border border-[var(--line-1)] bg-white p-7">
              <p className="m-eyebrow accent mb-3">MF ONE</p>
              <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                {CUBRE_MF_ONE.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} className="rounded-[16px] border border-[var(--line-1)] bg-white p-7">
              <p className="m-eyebrow accent mb-3">MF Barrel y MF Horizon</p>
              <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                {CUBRE_INFLABLE.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-4 border-t border-[var(--line-1)] pt-4 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                La tina rota por mal uso no entra en la cobertura, pero mientras tu MF Shield
                esté vigente puedes reponerla en {money(REPOSICION_TINA)} MXN.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-6 rounded-[16px] border border-[var(--line-1)] bg-white p-7">
            <p className="m-eyebrow accent mb-3">En los dos casos va incluido</p>
            <ul className="grid gap-2 text-[15px] leading-relaxed text-[var(--fg-muted)] sm:grid-cols-2">
              {INCLUYE.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent-ice)]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Qué no cubre ───────────────────────────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Exclusiones</span>
            <h2>Qué no cubre.</h2>
            <p>
              Preferimos decirlo antes de que lo necesites. Casi todo lo de esta lista
              es evitable siguiendo el manual.
            </p>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NO_CUBRE.map((x) => (
              <div key={x.t} className="rounded-[16px] border border-[var(--line-1)] bg-white p-6">
                <p className="text-[14.5px] font-semibold">{x.t}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{x.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Cómo se atiende ────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Reclamaciones</span>
            <h2>Cómo se atiende una falla.</h2>
          </Reveal>

          <Reveal className="grid gap-4 md:grid-cols-3">
            {PASOS.map((s) => (
              <div key={s.n} className="rounded-[16px] border border-[var(--line-1)] bg-white p-7">
                <p className="mdisplay text-[26px] text-[var(--accent-ice)]">{s.n}</p>
                <p className="mt-3 text-[15px] font-semibold">{s.t}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{s.d}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-6 rounded-[16px] border border-[var(--line-1)] bg-white p-7">
            <p className="m-eyebrow accent mb-4">Las cinco vías de atención</p>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {VIAS.map((v) => (
                <div key={v.t}>
                  <p className="text-[14.5px] font-semibold">{v.t}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{v.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-[var(--line-1)] pt-5 text-[13.5px] leading-relaxed text-[var(--fg-subtle)]">
              Cuál te toca lo definimos con el resultado del diagnóstico, según la falla, tu
              ubicación y la disponibilidad del momento. Atender una reclamación no siempre
              implica recoger el equipo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Mantenimiento: condición de validez ────────────── */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Condición de validez</span>
            <h2>El mantenimiento sostiene la cobertura.</h2>
            <p>
              Un filtro saturado obstruye las placas de calor y termina por tumbar el
              compresor. Por eso MF Shield está condicionada a que cumplas el tabulador
              de mantenimiento de tu equipo. Guarda los comprobantes de tus consumibles.
            </p>
          </Reveal>

          <Reveal className="mb-5 rounded-[16px] border border-[var(--line-1)] bg-white px-7 py-5">
            <p className="text-[14px] leading-relaxed text-[var(--fg-muted)]">
              El tabulador que te aplica es el del Anexo A de tu contrato y el del
              manual de tu equipo. Si el tuyo dice algo distinto a lo de abajo, manda
              el suyo.
            </p>
          </Reveal>

          <Reveal className="space-y-8 rounded-[16px] border border-[var(--line-1)] bg-white p-7">
            <Tabla t={TABULADOR_MF_ONE} />
            <div className="border-t border-[var(--line-1)] pt-8">
              <Tabla t={TABULADOR_PRO} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Letra chica ────────────────────────────────────── */}
      <section className="msection panel">
        <div className="mwrap">
          <Reveal>
            <article className="mx-auto max-w-[68ch]">
              <p className="m-eyebrow accent mb-3">Antes de firmar</p>
              <h2 className="mdisplay mb-6 text-[clamp(22px,2.4vw,30px)]">
                Lo que conviene que sepas
              </h2>
              <ul className="list-disc space-y-3 pl-6 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                {LETRA_CHICA.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--fg-subtle)]">
                Esta página resume el contrato. El documento que firmas, con su carátula de
                póliza y su Anexo A, es el que manda.{" "}
                <Link href="/garantia" className="underline underline-offset-4">
                  Ver las garantías estándar
                </Link>
                .
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </PageShell>
  );
}
