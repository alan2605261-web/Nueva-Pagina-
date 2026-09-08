import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { LegalEntity, LEGAL } from "@/components/LegalEntity";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { Doc, Vigencia, Clausula, P, Lista, Fuerte, Correo } from "@/components/LegalDoc";

/*
  TÉRMINOS Y CONDICIONES

  La versión anterior también empezaba con "Texto de ejemplo — pendiente de
  revisión legal" y no cubría lo que el artículo 76 bis de la Ley Federal de
  Protección al Consumidor exige de una venta en línea: identidad del
  proveedor, precio total con impuestos, condiciones de entrega, y el derecho
  del consumidor a conocer todo eso antes de comprar.

  IMPORTANTE PARA SAUL, dos cosas que necesitan tu decisión, no la mía:

  1. LA PRUEBA DE 30 DÍAS SE CONTRADICE CON /devoluciones. La barra de avisos
     y el hero de esa página prometen "pruébala 30 días sin compromiso" y "si
     no es para ti la recogemos sin preguntas", pero el cuerpo de la misma
     página dice que el producto "usado o con daños causados por el cliente no
     es elegible para reembolso". No se puede probar 30 días un equipo sin
     usarlo. Aquí NO resolví la contradicción a mi criterio: la cláusula 7
     remite a /devoluciones y hay que arreglar esa página primero. Es una
     promesa comercial publicada, así que además es exigible.

  2. Falta confirmar con tu abogado el domicilio para efectos legales y si
     quieren someterse a los tribunales de la Ciudad de México, cosa que no se
     puede imponer al consumidor pero sí pactar como opción.
*/

export const metadata = {
  title: "Términos y condiciones | Mente Fria",
  description:
    "Términos y condiciones de uso del sitio y de compra de los productos Mente Fria.",
};

export default function TerminosPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Legal"
        title="Términos y condiciones"
        subtitle="Las reglas de la compra: qué recibes, cuánto cuesta, cuándo llega y qué pasa si algo sale mal."
        tone="warm"
      />

      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <Doc>
              <Vigencia fecha="8 de septiembre de 2026" />

              <P>
                Estos términos rigen el uso del sitio mentefria.com y la compra
                de los productos que ofrecemos en él. Al navegar el sitio o
                realizar un pedido aceptas lo que se establece aquí. Si no estás
                de acuerdo, te pedimos no usar el sitio ni comprar a través de
                él.
              </P>

              <LegalEntity rol="terminos" />

              <div className="mt-12" />

              <Clausula n={1} titulo="Quién te vende">
                <P>
                  La venta la realiza la sociedad identificada arriba. Los
                  equipos son de importación; los datos del importador y el país
                  de origen aparecen en la{" "}
                  <Link href="/garantia" className="underline underline-offset-2">
                    póliza de garantía
                  </Link>
                  .
                </P>
              </Clausula>

              <Clausula n={2} titulo="Uso del sitio">
                <P>
                  Puedes usar el sitio para informarte y comprar. No está
                  permitido intentar vulnerar su seguridad, extraer su contenido
                  de forma automatizada para reproducirlo, ni usarlo para fines
                  ilícitos. Podemos suspender el acceso a quien incurra en estas
                  conductas.
                </P>
                <P>
                  Hacemos nuestro mejor esfuerzo por mantener la información
                  actualizada, pero puede haber errores tipográficos o de
                  disponibilidad. Si detectamos un error evidente en un precio,
                  te lo informaremos antes de cobrar y podrás confirmar o
                  cancelar tu pedido sin costo.
                </P>
              </Clausula>

              <Clausula n={3} titulo="Precios, impuestos y moneda">
                <P>
                  Todos los precios están en <Fuerte>pesos mexicanos</Fuerte>.
                  Antes de confirmar tu pedido verás el desglose completo:
                  producto, envío, impuestos aplicables y total a pagar. Ese
                  total es lo que se te cobra; no hay cargos posteriores.
                </P>
                <P>
                  Los precios pueden cambiar en cualquier momento, pero el que
                  aplica a tu compra es el vigente al momento de confirmarla.
                </P>
              </Clausula>

              <Clausula n={4} titulo="Pedido y formas de pago">
                <P>
                  Tu pedido queda en firme cuando recibes nuestra confirmación
                  por correo con el número de orden. Aceptamos tarjetas de
                  crédito y débito, plataformas de pago en línea y
                  transferencia bancaria. Los meses sin intereses dependen de la
                  plataforma de pago y del banco emisor de tu tarjeta, y su
                  disponibilidad se muestra al pagar.
                </P>
                <P>
                  Podemos rechazar o cancelar un pedido cuando el pago no se
                  autorice, cuando existan indicios razonables de fraude, o
                  cuando el producto quede sin existencias. En cualquiera de
                  esos casos te avisamos y reembolsamos íntegramente lo cobrado.
                </P>
                <P>
                  Si necesitas factura, solicítala con tus datos fiscales al
                  hacer el pedido o dentro del mismo mes calendario de la
                  compra.
                </P>
              </Clausula>

              <Clausula n={5} titulo="Entrega">
                <P>
                  Enviamos a toda la República Mexicana. El tiempo estimado es
                  de <Fuerte>3 a 7 días hábiles</Fuerte> contados a partir de la
                  confirmación del pago, sujeto a la cobertura de la paquetería
                  en tu código postal. Es un estimado, no un plazo garantizado:
                  si se retrasa, te informamos y te damos seguimiento.
                </P>
                <P>
                  El costo de envío se muestra antes de pagar y depende del
                  equipo. Los modelos inflables viajan en dos bultos, tina y
                  motor; la MF ONE viaja como una sola pieza y por su tamaño
                  puede requerir maniobra adicional en el domicilio.
                </P>
                <P>
                  La entrega se hace en la dirección que nos indiques, a nivel
                  de banqueta. No incluye subir escaleras, maniobras con grúa,
                  desmontaje de puertas ni instalación, salvo que se contrate
                  por separado. Es tu responsabilidad verificar que el equipo
                  quepa por los accesos de tu domicilio; conviene revisar las
                  medidas publicadas en la ficha del producto antes de comprar.
                </P>
                <P>
                  Al recibir, revisa el empaque frente al repartidor. Si llega
                  visiblemente dañado, anótalo en el acuse de la paquetería y
                  repórtalo el mismo día.
                </P>
              </Clausula>

              <Clausula n={6} titulo="Garantía">
                <P>
                  La MF ONE tiene <Fuerte>12 meses</Fuerte> de garantía y los
                  modelos inflables <Fuerte>6 meses</Fuerte>, contra defectos de
                  fabricación, en ambos casos a partir de la entrega. Son
                  garantías independientes entre sí. Las condiciones,
                  exclusiones y el procedimiento completo están en la{" "}
                  <Link href="/garantia" className="underline underline-offset-2">
                    póliza de garantía
                  </Link>
                  .
                </P>
                <P>
                  El mantenimiento descrito en el manual y en{" "}
                  <Link href="/soporte#cuidado" className="underline underline-offset-2">
                    Cuida tu plunge
                  </Link>{" "}
                  es condición de la garantía. En particular, el uso de cloro o
                  de limpiadores abrasivos dentro de la tina, y la exposición
                  del motor a la lluvia o al sol directo, la anulan.
                </P>
              </Clausula>

              <Clausula n={7} titulo="Devoluciones y reembolsos">
                <P>
                  Las condiciones, los plazos y el procedimiento están en la{" "}
                  <Link href="/devoluciones" className="underline underline-offset-2">
                    política de devoluciones
                  </Link>
                  , que forma parte de estos términos.
                </P>
                <P>
                  Lo anterior es adicional a los derechos que te otorga la Ley
                  Federal de Protección al Consumidor y no los limita ni los
                  sustituye.
                </P>
              </Clausula>

              <Clausula n={8} titulo="Uso del producto y salud">
                <P>
                  La inmersión en agua fría es una práctica de bienestar, no un
                  tratamiento médico, y nada de lo publicado en este sitio
                  sustituye la indicación de un profesional de la salud.
                </P>
                <P>
                  Antes de empezar, consulta a tu médico si tienes una condición
                  cardiovascular, hipertensión no controlada, arritmias,
                  epilepsia, síndrome de Raynaud, diabetes, si estás embarazada
                  o si tomas medicamentos que afecten tu percepción del frío.
                </P>
                <P>
                  El uso del equipo es bajo tu responsabilidad. No lo uses bajo
                  el efecto del alcohol o de drogas, nunca te sumerjas sin
                  compañía si estás empezando, y no permitas su uso a menores de
                  edad sin supervisión de un adulto. Sigue las indicaciones de
                  seguridad eléctrica del manual: los equipos deben conectarse a
                  una toma aterrizada y el interruptor diferencial debe probarse
                  al menos una vez por semana.
                </P>
              </Clausula>

              <Clausula n={9} titulo="Propiedad intelectual">
                <P>
                  La marca Mente Fria, su logotipo, los textos, fotografías,
                  videos, ilustraciones y el diseño de este sitio son propiedad
                  de la sociedad responsable o se usan con autorización. Puedes
                  compartir enlaces al sitio libremente; reproducir su contenido
                  con fines comerciales requiere autorización previa por escrito
                  a <Correo a={LEGAL.soporte} />.
                </P>
              </Clausula>

              <Clausula n={10} titulo="Contenido de terceros">
                <P>
                  El sitio cita investigación científica y enlaza a sitios de
                  terceros. Esos enlaces se ofrecen como referencia; no
                  controlamos su contenido ni respondemos por él, y su inclusión
                  no implica que esos autores o instituciones respalden a Mente
                  Fria.
                </P>
                <P>
                  Las reseñas publicadas provienen de clientes reales.
                  Reproducen su opinión y su experiencia, que no
                  necesariamente será la tuya.
                </P>
              </Clausula>

              <Clausula n={11} titulo="Limitación de responsabilidad">
                <P>
                  Respondemos por los defectos de fabricación en los términos de
                  la póliza de garantía y por lo que la ley nos obliga. No
                  respondemos por daños derivados del uso indebido del equipo,
                  de la falta del mantenimiento indicado, de modificaciones
                  hechas por terceros, de instalaciones eléctricas deficientes,
                  ni por daños indirectos o lucro cesante.
                </P>
                <P>
                  Nada en esta cláusula limita la responsabilidad que por ley no
                  puede limitarse, ni los derechos que te corresponden como
                  consumidor.
                </P>
              </Clausula>

              <Clausula n={12} titulo="Datos personales">
                <P>
                  El tratamiento de tus datos se rige por nuestro{" "}
                  <Link href="/privacidad" className="underline underline-offset-2">
                    aviso de privacidad
                  </Link>
                  .
                </P>
              </Clausula>

              <Clausula n={13} titulo="Cambios a estos términos">
                <P>
                  Podemos modificar estos términos. La versión vigente es la
                  publicada en esta página, con su fecha de actualización. A tu
                  compra le aplican los términos vigentes el día en que la
                  confirmaste.
                </P>
              </Clausula>

              <Clausula n={14} titulo="Ley aplicable y controversias">
                <P>
                  Estos términos se rigen por la legislación mexicana. Para
                  cualquier aclaración, escríbenos primero a{" "}
                  <Correo a={LEGAL.soporte} />: la mayoría de los asuntos se
                  resuelven ahí.
                </P>
                <P>
                  Si no llegamos a un acuerdo, puedes acudir a la Procuraduría
                  Federal del Consumidor, que es competente en el procedimiento
                  conciliatorio, y quedan a salvo los tribunales que
                  correspondan conforme a la ley.
                </P>
              </Clausula>
            </Doc>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
