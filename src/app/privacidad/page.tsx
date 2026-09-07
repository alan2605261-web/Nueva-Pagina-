import { PageShell } from "@/components/PageShell";
import { LegalEntity } from "@/components/LegalEntity";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Aviso de Privacidad | Mente Fria",
  description: "Aviso de privacidad de Mente Fria conforme a la LFPDPPP.",
};

export default function PrivacidadPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Legal"
        title="Aviso de privacidad"
        subtitle="Tus datos son tuyos. Los usamos únicamente para brindarte el mejor servicio."
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
                Mente Fria (en adelante "el Responsable") con domicilio en México, en cumplimiento con la Ley Federal
                de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), pone a tu disposición
                el presente Aviso de Privacidad.
              </p>

              <h2 className="heading-sm mb-4">Datos que recopilamos</h2>
              <p className="body-lg text-ink-soft mb-4">
                Para procesar tus compras y brindarte soporte, recopilamos los siguientes datos personales:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-ink-soft body-lg">
                <li>Nombre completo y datos de contacto (correo electrónico, teléfono).</li>
                <li>Dirección de entrega y facturación.</li>
                <li>Información de pago procesada de forma segura a través de pasarelas certificadas; no almacenamos datos de tarjetas.</li>
                <li>Historial de pedidos y comunicaciones de soporte.</li>
                <li>Datos de navegación en mentefria.com (dirección IP, tipo de dispositivo, páginas visitadas).</li>
              </ul>

              <h2 className="heading-sm mb-4">Uso de los datos</h2>
              <p className="body-lg text-ink-soft mb-4">
                Utilizamos tus datos personales para las siguientes finalidades primarias:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-ink-soft body-lg">
                <li>Procesar y entregar tus pedidos.</li>
                <li>Brindarte soporte técnico y atención al cliente.</li>
                <li>Gestionar garantías y devoluciones.</li>
                <li>Emitir comprobantes fiscales cuando aplique.</li>
              </ul>
              <p className="body-lg text-ink-soft mb-4">Finalidades secundarias (puedes oponerte a ellas):</p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-ink-soft body-lg">
                <li>Enviarte comunicaciones sobre nuevos productos, promociones y contenido educativo.</li>
                <li>Realizar encuestas de satisfacción y estudios de mercado internos.</li>
              </ul>

              <h2 className="heading-sm mb-4">Cookies y tecnologías de seguimiento</h2>
              <p className="body-lg text-ink-soft mb-6">
                mentefria.com utiliza cookies propias y de terceros para mejorar la experiencia de navegación,
                medir el tráfico y mostrar contenido relevante. Puedes configurar tu navegador para rechazar cookies;
                sin embargo, algunas funciones del sitio pueden verse afectadas. Al continuar navegando, aceptas el
                uso de cookies conforme a este aviso.
              </p>

              <h2 className="heading-sm mb-4">Tus derechos ARCO</h2>
              <p className="body-lg text-ink-soft mb-4">
                Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos personales
                (derechos ARCO). También puedes revocar en cualquier momento el consentimiento que hayas otorgado.
                Para ejercer estos derechos:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-ink-soft body-lg">
                <li>Envía tu solicitud a <strong>privacidad@mentefria.com</strong> con asunto "Derechos ARCO".</li>
                <li>Incluye tu nombre completo, correo de registro y descripción de tu solicitud.</li>
                <li>Te responderemos en un plazo máximo de 20 días hábiles.</li>
              </ul>

              <h2 className="heading-sm mb-4">Transferencia de datos</h2>
              <p className="body-lg text-ink-soft mb-6">
                No vendemos ni cedemos tus datos personales a terceros con fines comerciales. Podemos compartirlos con
                proveedores de servicio que nos asisten en operaciones de pago, logística y tecnología, quienes están
                obligados contractualmente a mantener la confidencialidad de tu información.
              </p>

              <h2 className="heading-sm mb-4">Cambios a este aviso</h2>
              <p className="body-lg text-ink-soft mb-6">
                Mente Fria se reserva el derecho de actualizar este Aviso de Privacidad en cualquier momento. Los
                cambios se publicarán en esta página con la fecha de última actualización. Te recomendamos revisarlo
                periódicamente.
              </p>

              <LegalEntity rol="privacidad" />
            </article>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
