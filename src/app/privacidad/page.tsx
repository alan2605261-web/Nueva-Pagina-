import { PageShell } from "@/components/PageShell";
import { LegalEntity, LEGAL } from "@/components/LegalEntity";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { Doc, Vigencia, Clausula, P, Lista, Fuerte, Correo } from "@/components/LegalDoc";

/*
  AVISO DE PRIVACIDAD

  La versión anterior arrancaba con "Texto de ejemplo — pendiente de revisión
  legal", nombraba al responsable solo como "Mente Fria con domicilio en
  México", y le faltaban varios de los elementos que la LFPDPPP exige que un
  aviso integral contenga.

  Esta versión sigue el artículo 16 de la LFPDPPP y el 24 de su Reglamento:
  identidad y domicilio del responsable, datos tratados, finalidades primarias
  y secundarias por separado con su mecanismo de negativa, medios para limitar
  uso y divulgación, procedimiento ARCO con plazos, revocación del
  consentimiento, transferencias, uso de cookies y procedimiento de cambios.

  IMPORTANTE PARA SAUL: esto es un borrador serio y completo, no un relleno,
  pero no soy abogado. Antes de publicarlo hay que confirmar con quien lleve
  el tema legal de la empresa: (a) el domicilio y el correo del departamento
  de datos personales, (b) qué proveedores reciben datos realmente —Shopify,
  Mercado Pago, la paquetería, Klaviyo— y (c) si se tratan datos de salud,
  porque si un cliente comenta una condición médica al pedir asesoría eso es
  dato sensible y exige consentimiento expreso por escrito.
*/

export const metadata = {
  title: "Aviso de privacidad | Mente Fria",
  description:
    "Aviso de privacidad integral de MFMF Wellnes and Lifestyle, S.A. de C.V. conforme a la LFPDPPP.",
};

export default function PrivacidadPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Legal"
        title="Aviso de privacidad"
        subtitle="Qué datos tuyos tratamos, para qué los usamos y cómo pedirnos que dejemos de hacerlo."
        tone="warm"
      />

      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <Doc>
              <Vigencia fecha="8 de septiembre de 2026" />

              <P>
                Este aviso de privacidad integral se emite en cumplimiento de la
                Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares, su Reglamento y los Lineamientos del Aviso de
                Privacidad. Aplica a los datos que recabamos en mentefria.com,
                por WhatsApp, por teléfono, por correo y de forma presencial en
                demostraciones y eventos.
              </P>

              <LegalEntity rol="privacidad" />

              <div className="mt-12" />

              <Clausula n={1} titulo="Datos personales que tratamos">
                <P>
                  Para vender, entregar y dar servicio a nuestros equipos
                  tratamos las siguientes categorías de datos:
                </P>
                <Lista
                  items={[
                    <><Fuerte>Identificación y contacto:</Fuerte> nombre completo, correo electrónico, teléfono.</>,
                    <><Fuerte>Domicilio:</Fuerte> dirección de entrega y, cuando solicitas factura, dirección fiscal.</>,
                    <><Fuerte>Fiscales:</Fuerte> RFC y régimen fiscal, únicamente si pides comprobante fiscal.</>,
                    <><Fuerte>Transaccionales:</Fuerte> historial de pedidos, montos, método de pago elegido y estatus de envío.</>,
                    <><Fuerte>De soporte:</Fuerte> el contenido de tus mensajes, fotos o videos del equipo que nos envíes para diagnosticar una falla, y las notas de nuestro seguimiento.</>,
                    <><Fuerte>De navegación:</Fuerte> dirección IP, tipo de dispositivo y navegador, páginas visitadas y origen del tráfico.</>,
                  ]}
                />
                <P>
                  <Fuerte>No almacenamos los datos de tu tarjeta.</Fuerte> Los
                  pagos con tarjeta se procesan directamente en la plataforma de
                  pago, que nos devuelve únicamente la confirmación de la
                  operación y los últimos dígitos para identificarla.
                </P>
                <P>
                  <Fuerte>Datos sensibles.</Fuerte> No te pedimos información de
                  salud y no la necesitamos para venderte un equipo. Si al
                  pedirnos orientación decides compartir una condición médica,
                  la usaremos solo para responder esa consulta y para
                  recomendarte que lo valides con tu médico, y la conservaremos
                  únicamente el tiempo necesario para atenderte.
                </P>
              </Clausula>

              <Clausula n={2} titulo="Para qué usamos tus datos">
                <P>
                  <Fuerte>Finalidades primarias.</Fuerte> Son necesarias para la
                  relación contigo; sin ellas no podemos venderte ni darte
                  servicio:
                </P>
                <Lista
                  items={[
                    "Procesar tu pedido, cobrarlo y entregarlo.",
                    "Emitir el comprobante fiscal cuando lo solicitas.",
                    "Darte soporte técnico y atender garantías, devoluciones y reembolsos.",
                    "Contactarte por asuntos relacionados con tu compra: confirmaciones, cambios de fecha, incidencias de entrega y avisos de seguridad del producto.",
                    "Cumplir obligaciones legales, fiscales y contables, y atender requerimientos de autoridad.",
                  ]}
                />
                <P>
                  <Fuerte>Finalidades secundarias.</Fuerte> No son necesarias
                  para tu compra y puedes oponerte a ellas en cualquier momento
                  sin que eso afecte tu pedido, tu garantía ni tu servicio:
                </P>
                <Lista
                  items={[
                    "Enviarte novedades de producto, promociones y contenido sobre inmersión en frío.",
                    "Invitarte a encuestas de satisfacción y estudios internos para mejorar el producto y el servicio.",
                    "Mostrarte publicidad de Mente Fria en plataformas de terceros a partir de tu navegación en el sitio.",
                  ]}
                />
                <P>
                  Para negarte a las finalidades secundarias basta con
                  escribirnos a <Correo a={LEGAL.privacidad} /> con el asunto
                  “Finalidades secundarias”, o usar el enlace para darte de baja
                  que aparece al pie de cada correo comercial que te enviamos.
                  Tu negativa surte efecto en un plazo máximo de cinco días
                  hábiles.
                </P>
              </Clausula>

              <Clausula n={3} titulo="Cómo limitar el uso y la divulgación">
                <P>
                  Además de la negativa anterior, puedes pedirnos que dejemos de
                  usar tus datos para fines de mercadotecnia y publicidad
                  escribiendo al mismo correo. También puedes inscribir tu
                  teléfono en el Registro Público para Evitar Publicidad (REPEP)
                  de la Procuraduría Federal del Consumidor y tu correo en el
                  Registro Público de Usuarios (REUS) cuando aplique.
                </P>
              </Clausula>

              <Clausula n={4} titulo="Derechos ARCO">
                <P>
                  Tienes derecho a <Fuerte>acceder</Fuerte> a los datos que
                  tenemos de ti, a <Fuerte>rectificarlos</Fuerte> si son
                  inexactos, a <Fuerte>cancelarlos</Fuerte> cuando consideres
                  que no se requieren para las finalidades de este aviso, y a{" "}
                  <Fuerte>oponerte</Fuerte> a su uso para fines específicos.
                </P>
                <P>Para ejercerlos:</P>
                <Lista
                  ordenada
                  items={[
                    <>Envía tu solicitud a <Correo a={LEGAL.privacidad} /> con el asunto “Derechos ARCO”.</>,
                    "Incluye tu nombre, un correo o domicilio para responderte, y copia de una identificación oficial vigente o del poder de tu representante.",
                    "Describe con claridad qué dato quieres acceder, rectificar, cancelar u oponerte a que usemos. Si pides rectificación, adjunta el documento que respalde el dato correcto.",
                  ]}
                />
                <P>
                  Te responderemos en un plazo máximo de{" "}
                  <Fuerte>veinte días hábiles</Fuerte> contados desde que
                  recibimos la solicitud completa. Si procede, la haremos
                  efectiva dentro de los quince días hábiles siguientes a esa
                  respuesta. El trámite es gratuito; solo se cobrarían los
                  gastos de envío o de reproducción en copias, conforme a la
                  ley.
                </P>
                <P>
                  Ten en cuenta que hay datos que no podemos cancelar mientras
                  exista una obligación legal de conservarlos, en particular los
                  registros contables y fiscales de tu compra y la información
                  necesaria para hacer válida tu garantía.
                </P>
              </Clausula>

              <Clausula n={5} titulo="Revocación del consentimiento">
                <P>
                  Puedes revocar en cualquier momento el consentimiento que nos
                  diste para tratar tus datos, por el mismo medio y con los
                  mismos requisitos de la cláusula anterior. La revocación no
                  tiene efectos retroactivos y no aplica a los tratamientos que
                  la ley nos obliga a mantener. Si revocas el consentimiento
                  para las finalidades primarias, no podremos seguir procesando
                  pedidos ni prestando servicio.
                </P>
              </Clausula>

              <Clausula n={6} titulo="Transferencias y encargados">
                <P>
                  No vendemos tus datos personales. Los compartimos únicamente
                  con quienes necesitamos para cumplir contigo, y solo con lo
                  indispensable:
                </P>
                <Lista
                  items={[
                    "La plataforma de comercio electrónico donde opera la tienda y se guarda tu pedido.",
                    "Las plataformas de pago que procesan el cobro.",
                    "Las empresas de paquetería y transporte que entregan tu equipo, a quienes damos tu nombre, domicilio y teléfono.",
                    "El proveedor de correo con el que enviamos confirmaciones y, si lo aceptaste, comunicaciones comerciales.",
                    "Nuestro contador y despacho fiscal, para la emisión y resguardo de comprobantes.",
                    "Autoridades competentes, cuando exista un requerimiento fundado y motivado.",
                  ]}
                />
                <P>
                  Estos terceros actúan como encargados o destinatarios
                  necesarios para cumplir la relación jurídica contigo, por lo
                  que estas transferencias no requieren tu consentimiento
                  conforme al artículo 37 de la LFPDPPP. Cualquier transferencia
                  distinta a las anteriores te será informada y requerirá tu
                  consentimiento previo.
                </P>
              </Clausula>

              <Clausula n={7} titulo="Cookies y tecnologías de rastreo">
                <P>
                  mentefria.com usa cookies propias y de terceros para mantener
                  tu sesión y tu carrito, medir el tráfico del sitio y evaluar
                  el desempeño de nuestra publicidad. Las cookies no revelan tu
                  nombre por sí solas; identifican a un navegador.
                </P>
                <P>
                  Puedes bloquearlas o borrarlas desde la configuración de tu
                  navegador. Si desactivas las cookies necesarias, funciones
                  como el carrito de compra pueden dejar de operar
                  correctamente.
                </P>
              </Clausula>

              <Clausula n={8} titulo="Seguridad y conservación">
                <P>
                  Aplicamos medidas administrativas, técnicas y físicas
                  razonables para proteger tus datos contra daño, pérdida,
                  alteración, destrucción o uso no autorizado, incluyendo acceso
                  restringido por función y conexiones cifradas en el sitio.
                </P>
                <P>
                  Conservamos tus datos mientras exista la relación comercial y,
                  después, durante los plazos que exigen las obligaciones
                  fiscales, contables y de garantía aplicables. Cumplidos esos
                  plazos, se bloquean y se suprimen.
                </P>
                <P>
                  Si ocurriera una vulneración de seguridad que afecte de forma
                  significativa tus derechos patrimoniales o morales, te lo
                  informaremos sin demora para que puedas tomar medidas.
                </P>
              </Clausula>

              <Clausula n={9} titulo="Menores de edad">
                <P>
                  Nuestros productos están destinados a personas mayores de
                  edad. No recabamos deliberadamente datos de menores de 18
                  años. Si detectamos que recibimos datos de un menor sin
                  intervención de quien ejerce la patria potestad, los
                  eliminaremos.
                </P>
              </Clausula>

              <Clausula n={10} titulo="Cambios a este aviso">
                <P>
                  Podemos actualizar este aviso por cambios legales, de nuestras
                  prácticas o del modelo de negocio. La versión vigente estará
                  siempre en esta página con su fecha de última actualización.
                  Si el cambio es sustancial en las finalidades del tratamiento,
                  te lo comunicaremos por correo antes de aplicarlo.
                </P>
              </Clausula>

              <Clausula n={11} titulo="Autoridad">
                <P>
                  Si consideras que tu derecho a la protección de datos
                  personales ha sido vulnerado, puedes acudir ante la autoridad
                  garante en materia de protección de datos personales para
                  presentar tu inconformidad.
                </P>
              </Clausula>
            </Doc>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
