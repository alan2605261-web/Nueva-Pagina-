import { PageShell } from "@/components/PageShell";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Devoluciones y Reembolsos | Mente Fria",
  description: "Política de devoluciones y reembolsos de Mente Fria. 30 días de prueba sin preguntas.",
};

export default function DevolucionesPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Políticas"
        title="Devoluciones y reembolsos"
        subtitle="Prueba tu unidad 30 días sin riesgo. Si no es para ti, la recogemos sin preguntas."
        tone="warm"
      />

      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <article className="mx-auto max-w-[68ch]">
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-10">
                <em>Texto de ejemplo — pendiente de revisión legal.</em>
              </p>

              <h2 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">Prueba de 30 días — sin preguntas</h2>
              <p className="text-[16px] leading-relaxed text-[var(--fg-muted)] mb-6">
                Si no es la mejor cold plunge que has probado, te regresamos el dinero. Sin preguntas, sin trámites
                complicados. Tienes 30 días naturales a partir de la fecha de entrega para decidir.
              </p>

              <h2 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">¿Cuándo aplica el reembolso del 100%?</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                <li>
                  <strong>Producto sin abrir, sin usar y sin daños</strong> — reembolso del 100% o reemplazo.
                </li>
                <li>
                  <strong>Producto con defecto de fabricación</strong> — reembolso del 100% o reemplazo. Contáctanos
                  dentro de las <strong>24 horas</strong> posteriores a la recepción.
                </li>
                <li>
                  Mente Fria cubre todos los costos de envío en reembolsos y reemplazos por defecto.
                </li>
              </ul>

              <h2 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">¿Cuándo no aplica?</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                <li>Producto usado o con daños causados por el cliente — no es elegible para reembolso.</li>
                <li>Solicitudes realizadas después de los 30 días naturales desde la entrega.</li>
              </ul>

              <h2 className="mdisplay text-[clamp(20px,2.2vw,26px)] mb-4">Cómo iniciar una devolución</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-3 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                <li>
                  Contáctanos por cualquiera de nuestros medios de comunicación dentro del periodo de 30 días,
                  indicando tu número de pedido.
                </li>
                <li>
                  Nuestro equipo confirmará la elegibilidad y coordinará la recolección sin costo adicional.
                </li>
                <li>
                  Una vez verificado el estado del producto, procesamos el reembolso o enviamos el reemplazo.
                </li>
              </ol>

              <div className="border border-[var(--line-1)] rounded-xl p-6 mt-8">
                <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                  Para iniciar tu devolución, escríbenos a{" "}
                  <a href="/soporte" className="underline">mentefria.com/soporte</a>.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
