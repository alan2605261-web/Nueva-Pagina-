import { PageShell } from "@/components/PageShell";
import { LegalEntity } from "@/components/LegalEntity";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Términos y Condiciones | Mente Fria",
  description: "Términos y condiciones de uso del sitio y compras en Mente Fria.",
};

export default function TerminosPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Legal"
        title="Términos y condiciones"
        subtitle="Las reglas del juego, escritas de forma clara."
        tone="warm"
      />

      <section className="section-y bg-background">
        <div className="container-edge">
          <Reveal>
            <article className="container-prose">
              <p className="body-lg text-ink-soft mb-10">
                <em>Texto de ejemplo — pendiente de revisión legal.</em>
              </p>

              <p className="body-lg text-ink-soft mb-8">
                Los presentes Términos y Condiciones regulan el acceso y uso del sitio web mentefria.com, así como
                la adquisición de productos ofrecidos por Mente Fria (en adelante "Mente Fria" o "el Vendedor").
                Al navegar en el sitio o realizar una compra, aceptas estos términos en su totalidad.
              </p>

              <h2 className="heading-sm mb-4">Uso del sitio</h2>
              <p className="body-lg text-ink-soft mb-6">
                El contenido de mentefria.com es de uso exclusivamente informativo y comercial. Queda prohibido:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-ink-soft body-lg">
                <li>Reproducir, distribuir o modificar el contenido del sitio sin autorización escrita.</li>
                <li>Usar el sitio para actividades ilegales, fraudulentas o que dañen a terceros.</li>
                <li>Intentar acceder a sistemas o datos de Mente Fria sin autorización.</li>
              </ul>

              <h2 className="heading-sm mb-4">Compras y precios</h2>
              <p className="body-lg text-ink-soft mb-4">
                Todos los precios publicados en mentefria.com están expresados en <strong>pesos mexicanos (MXN)</strong> y
                no incluyen el Impuesto al Valor Agregado (IVA). El IVA se desglosará en el resumen de tu pedido
                antes de confirmar la compra.
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-ink-soft body-lg">
                <li>Los precios pueden cambiar sin previo aviso; el precio vigente es el mostrado al momento del pago.</li>
                <li>Mente Fria se reserva el derecho de cancelar pedidos en caso de errores evidentes de precio.</li>
                <li>Los pagos se procesan a través de pasarelas certificadas y seguras.</li>
                <li>La confirmación del pedido se envía por correo electrónico una vez acreditado el pago.</li>
              </ul>

              <h2 className="heading-sm mb-4">Envíos</h2>
              <p className="body-lg text-ink-soft mb-6">
                Mente Fria ofrece <strong>envío gratuito a todo México</strong> en todos los pedidos realizados en
                mentefria.com. Los tiempos de entrega estimados se comunican al confirmar el pedido y pueden variar
                según la ubicación y disponibilidad. Mente Fria no se hace responsable de retrasos causados por
                factores externos como desastres naturales, huelgas o disposiciones gubernamentales.
              </p>

              <h2 className="heading-sm mb-4">Propiedad intelectual</h2>
              <p className="body-lg text-ink-soft mb-6">
                La marca <strong>Mente Fria</strong> se encuentra registrada ante el Instituto Mexicano de la
                Propiedad Industrial (IMPI). Todo el contenido del sitio — incluyendo logotipos, imágenes, textos,
                videos y diseños — es propiedad exclusiva de Mente Fria o de sus licenciantes. Queda prohibido su
                uso sin autorización escrita previa.
              </p>

              <h2 className="heading-sm mb-4">Limitación de responsabilidad</h2>
              <p className="body-lg text-ink-soft mb-6">
                Mente Fria no será responsable de daños indirectos, incidentales o consecuentes derivados del uso o
                imposibilidad de uso de sus productos, más allá de lo establecido en la garantía de cada producto.
                La responsabilidad máxima de Mente Fria estará limitada al monto pagado por el producto en cuestión.
              </p>
              <p className="body-lg text-ink-soft mb-6">
                Los productos de hidroterapia de Mente Fria están diseñados para uso recreativo y de bienestar
                personal por adultos sanos. No sustituyen tratamientos médicos. Consulta a un profesional de la
                salud antes de usarlos si tienes condiciones médicas preexistentes.
              </p>

              <h2 className="heading-sm mb-4">Legislación aplicable</h2>
              <p className="body-lg text-ink-soft mb-6">
                Estos Términos y Condiciones se rigen por las leyes aplicables de los Estados Unidos Mexicanos.
                Cualquier controversia se resolverá ante los tribunales competentes de la Ciudad de México, con
                renuncia a cualquier otro fuero que pudiera corresponder por razón de domicilio presente o futuro.
              </p>

              <h2 className="heading-sm mb-4">Modificaciones</h2>
              <p className="body-lg text-ink-soft mb-6">
                Mente Fria se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento.
                Los cambios entrarán en vigor desde su publicación en el sitio. El uso continuado del sitio implica
                la aceptación de los términos vigentes.
              </p>

              <div className="border border-line rounded-xl p-6 mt-8">
                <p className="body-lg text-ink-soft">
                  <strong>Contacto legal:</strong> hola@mentefria.com |{" "}
                  <a href="/soporte" className="underline">mentefria.com/soporte</a>
                </p>
              </div>

              <LegalEntity rol="terminos" />
            </article>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
