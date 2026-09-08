import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { LEGAL } from "@/components/LegalEntity";
import { SubHero } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { Doc, Vigencia, Clausula, P, Lista, Fuerte, Correo } from "@/components/LegalDoc";

/*
  DEVOLUCIONES

  La versión anterior se contradecía sola: el encabezado prometía "prueba 30
  días sin preguntas, si no es para ti la recogemos" y tres párrafos después
  decía que el reembolso al 100% aplicaba al "producto sin abrir, sin usar y
  sin daños" y que el "producto usado no es elegible". No se puede probar 30
  días un equipo sin usarlo.

  Saul resolvió el conflicto a favor de la promesa publicada: la prueba de 30
  días es real y usar el equipo NO te descalifica. Lo único que queda fuera es
  el daño que causa el cliente y las piezas que faltan, que es otra cosa.

  PENDIENTE MENOR PARA SAUL: aquí dice que se devuelve lo que pagaste y que la
  recolección no tiene costo, porque es la lectura llana de "te regresamos el
  dinero, sin preguntas". Si el envío original NO se reembolsa —y en la MF ONE
  son $6,000— hay que decirlo aquí de forma explícita.
*/

export const metadata = {
  title: "Devoluciones y reembolsos | Mente Fria",
  description:
    "Prueba tu cold plunge 30 días. Si no es para ti, la recogemos y te devolvemos tu dinero.",
};

export default function DevolucionesPage() {
  return (
    <PageShell>
      <SubHero
        eyebrow="Políticas"
        title="Devoluciones y reembolsos"
        subtitle="Pruébala 30 días de verdad. Si no es para ti, la recogemos y te devolvemos tu dinero."
        tone="warm"
      />

      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <Doc>
              <Vigencia fecha="8 de septiembre de 2026" />

              <Clausula n={1} titulo="La prueba de 30 días">
                <P>
                  Tienes <Fuerte>30 días naturales</Fuerte> desde que recibes tu
                  equipo para decidir si te quedas con él. Si no es la mejor
                  cold plunge que has probado, nos escribes, la recogemos y te
                  devolvemos tu dinero.
                </P>
                <P>
                  <Fuerte>Usarla es justo el punto.</Fuerte> Llénala, métete,
                  pruébala todos los días de ese mes. Que el equipo esté usado
                  no te quita el derecho al reembolso: esa es la diferencia
                  entre una prueba y una caja que no abriste.
                </P>
                <P>
                  Sin preguntas quiere decir sin preguntas. No tienes que
                  justificar la decisión ni pasar por un cuestionario.
                </P>
              </Clausula>

              <Clausula n={2} titulo="Qué sí queda fuera">
                <P>
                  La prueba cubre que el equipo no sea para ti. No cubre estas
                  tres situaciones, que son distintas:
                </P>
                <Lista
                  items={[
                    <><Fuerte>Daño causado por el uso indebido.</Fuerte> Cortes, perforaciones, golpes, quemaduras, o el daño que provoca meterle cloro o limpiadores abrasivos, que el manual prohíbe expresamente.</>,
                    <><Fuerte>Piezas faltantes.</Fuerte> El equipo se devuelve completo, con los accesorios que venían en la caja. Los consumibles que ya usaste, como el filtro de papel, no cuentan.</>,
                    <><Fuerte>Solicitudes fuera de plazo.</Fuerte> Después de los 30 días naturales desde la entrega ya aplica la garantía, no la prueba.</>,
                  ]}
                />
                <P>
                  El desgaste normal de un mes de uso no es daño. Que la tina
                  esté mojada, que el filtro esté sucio o que el equipo tenga
                  marcas de haber estado en tu patio es exactamente lo que se
                  espera de una prueba.
                </P>
              </Clausula>

              <Clausula n={3} titulo="Producto con defecto de fabricación">
                <P>
                  Si el equipo llega con un defecto de fabricación, no aplica el
                  plazo de la prueba: aplica la{" "}
                  <Link href="/garantia" className="underline underline-offset-2">
                    garantía
                  </Link>
                  , que es de 12 meses en la MF ONE y 6 meses en los modelos
                  inflables. Repones o reembolsas, tú eliges, y nosotros
                  cubrimos los costos de envío.
                </P>
                <P>
                  Si el empaque llega visiblemente dañado, anótalo en el acuse
                  de la paquetería frente al repartidor y repórtalo el mismo
                  día. Eso nos permite reclamarle al transportista y resolverte
                  más rápido.
                </P>
              </Clausula>

              <Clausula n={4} titulo="Cómo la inicias">
                <Lista
                  ordenada
                  items={[
                    <>Escríbenos por WhatsApp o a <Correo a={LEGAL.soporte} /> dentro de los 30 días, con tu número de pedido.</>,
                    "Acordamos contigo el día de la recolección. La recolección no tiene costo para ti.",
                    "Cuando el equipo llega a nuestro almacén, procesamos el reembolso por la misma vía en la que pagaste.",
                  ]}
                />
                <P>
                  El reembolso tarda lo que tarde tu banco o la plataforma de
                  pago en reflejarlo, normalmente entre 5 y 10 días hábiles
                  desde que lo procesamos.
                </P>
              </Clausula>

              <Clausula n={5} titulo="Tus derechos">
                <P>
                  Esta política es adicional a los derechos que te otorga la Ley
                  Federal de Protección al Consumidor y no los limita ni los
                  sustituye. Las condiciones generales de compra están en los{" "}
                  <Link href="/terminos" className="underline underline-offset-2">
                    términos y condiciones
                  </Link>
                  .
                </P>
              </Clausula>
            </Doc>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
