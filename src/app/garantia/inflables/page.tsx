import { PageShell } from "@/components/PageShell";
import { SubHero, CTASection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

/* Garantía de MF Barrel y MF Horizon, con su motor.

   Saul (sep 2026): la póliza del motor y la de la tina van LIGADAS. Antes
   existía /garantia/motores con "póliza propia, distinta de la de la tina", y
   era falso. Esa página se eliminó y su contenido (componentes, qué corre por
   nuestra cuenta, qué la anula y cómo se hace válida) vive aquí, junto con lo
   que ya decía esta página sobre la tina. No se agregaron coberturas nuevas:
   solo se quitó lo que las presentaba como pólizas separadas. */

export const metadata = {
  title: "Garantía MF Barrel y MF Horizon",
  description:
    "Seis meses en MF Barrel y MF Horizon: la tina y su motor Pro 2.0 o Premium 2.0, en una misma póliza.",
};

export default function GarantiaInflablesPage() {
  return (
    <PageShell>
      <SubHero eyebrow="Garantía · Inflables" title="Seis meses en MF Barrel y MF Horizon" tone="warm" />

      <section className="msection">
        <div className="mwrap">
          <Reveal>
            <article className="mdoc">
              <p className="m-eyebrow accent mb-3">Garantía limitada · MF Barrel y MF Horizon</p>
              <h2 className="mdisplay mb-6 text-[clamp(26px,3.4vw,44px)]">
                La tina y su motor, en una misma póliza
              </h2>

              <p className="mb-4 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                MF Barrel y MF Horizon tienen 6 meses de garantía contados desde el
                día en que recibes el equipo, en condiciones normales de uso. La
                póliza cubre el equipo completo: la tina inflable y el motor con el
                que se entrega, Pro 2.0 o Premium 2.0. El tiempo que dure una
                reparación al amparo de la garantía no se descuenta de esos seis
                meses.
              </p>
              <p className="mb-4 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                Es independiente de la garantía de la MF ONE, que cubre un producto
                distinto con componentes distintos.
              </p>

              <h3 className="mdisplay mb-3 mt-8 text-[20px]">Qué ampara</h3>
              <p className="mb-4 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                En la tina, los defectos de fabricación. En el motor, los defectos de
                fabricación y de funcionamiento de: compresor, intercambiador,
                ventilador, bomba, sistema de filtración, y el sistema eléctrico,
                electrónico y de control de fábrica con sus sensores. Con Motor
                Premium ampara además el generador de ozono.
              </p>
              <p className="mb-4 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                Quedan fuera el desgaste natural y los consumibles que vienen en la
                caja: las mangueras, los filtros y la llave del compartimiento de
                filtros. También los daños por mal uso o transporte, y las
                reparaciones hechas por personal no autorizado.
              </p>

              <h3 className="mdisplay mb-3 mt-8 text-[20px]">Qué corre por nuestra cuenta</h3>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                <li>Refacciones originales, sin costo.</li>
                <li>Diagnóstico remoto por videollamada, sin costo.</li>
                <li>Mano de obra de nuestro personal o de un técnico de nuestra red.</li>
                <li>Transportación del equipo o del componente en territorio nacional, con guía prepagada.</li>
                <li>Traslado del técnico hasta tu domicilio.</li>
              </ul>
              <p className="mb-4 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                Si prefieres a un técnico fuera de nuestra red, lo autorizamos por
                escrito antes del servicio. Las refacciones instaladas quedan
                garantizadas 90 días naturales desde su entrega.
              </p>

              <h3 className="mdisplay mb-3 mt-8 text-[20px]">Lo que la anula</h3>
              <p className="mb-4 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                Casi todo lo que deja fuera esta póliza tiene que ver con cómo queda
                instalado el motor y con el mantenimiento:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                <li>
                  Operar el motor por encima del nivel del agua de la tina, con el
                  nivel por debajo de las tomas, sin agua, o con una manguera
                  desconectada, doblada o con las válvulas cerradas.
                </li>
                <li>
                  Instalarlo a la intemperie, cubrirlo mientras opera, obstruir sus
                  rejillas o dejarlo al sol directo de forma prolongada.
                </li>
                <li>
                  Congelamiento del agua dentro del circuito, incluido no drenarlo
                  cuando la temperatura ambiente puede bajar de 2 °C.
                </li>
                <li>
                  Cloro de alberca, bromo, solventes, ácidos, álcalis o cualquier
                  químico corrosivo en el agua.
                </li>
                <li>
                  Filtros saturados o que no cumplan la especificación del manual. Un
                  filtro tapado reduce el flujo, obliga al compresor a trabajar de
                  más y termina por dañarlo.
                </li>
                <li>
                  Transportar o guardar el motor en posición distinta a la vertical, y
                  cortar la corriente con el equipo en marcha en lugar de apagarlo
                  desde el panel.
                </li>
                <li>
                  Conectarlo con extensiones, multicontactos o a una instalación sin
                  tierra. Un regulador de voltaje no cuenta como extensión.
                </li>
              </ul>

              <h3 className="mdisplay mb-3 mt-8 text-[20px]">Cómo se hace válida</h3>
              <ol className="mb-6 list-decimal space-y-2 pl-6 text-[16px] leading-relaxed text-[var(--fg-muted)]">
                <li>
                  Escríbenos por WhatsApp o a{" "}
                  <a href="mailto:soporte@mentefria.com" className="underline">
                    soporte@mentefria.com
                  </a>{" "}
                  con la descripción de la falla, el código que aparece en pantalla si
                  lo hay, fotos o video y el número de serie del motor, que está en la
                  etiqueta del costado.
                </li>
                <li>
                  Respondemos dentro de los 3 días hábiles siguientes y agendamos
                  videollamada con un técnico.
                </li>
                <li>
                  Según el caso: lo recibimos en nuestras instalaciones con guía
                  prepagada, lo atendemos en sitio, mandamos a un técnico, o te
                  enviamos la refacción con acompañamiento por videollamada. Si hay
                  que enviar el motor, va drenado y vertical.
                </li>
                <li>
                  Si la reparación no deja el equipo en condiciones, puedes pedir su
                  reposición, la bonificación o la devolución de tu dinero.
                </li>
              </ol>

              <div className="rounded-xl border border-[var(--line-1)] p-6">
                <p className="text-[16px] leading-relaxed text-[var(--fg-muted)]">
                  Si compraste directo con nosotros no tienes que llenar ni firmar
                  nada: el número de serie liga tu equipo con la fecha de entrega. Si
                  lo compraste con un distribuidor, pídele que selle y feche tu póliza.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="¿Quieres llegar al mes 24?"
        body="MF Shield extiende la cobertura de tu tina y tu motor hasta dos años. Se contrata mientras la garantía de tu equipo siga vigente."
        cta={{ label: "Ver MF Shield", href: "/garantia/extendida" }}
        dark
      />
    </PageShell>
  );
}
