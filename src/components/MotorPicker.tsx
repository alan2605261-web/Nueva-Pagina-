import { ComparadorMotores } from "@/components/ComparadorMotores";
import { Reveal } from "@/components/Reveal";

const WHATSAPP = "https://wa.me/5215616471386";

/*
  Elige tu motor — sección compartida de /productos, /motores y los PDPs
  inflables (MF Barrel / MF Horizon).

  Saul (sep 2026) descartó las tarjetas por motor: cada una mostraba cifras
  distintas y no se veían las diferencias. Ahora es un comparador con las
  mismas filas para todos (ComparadorMotores). En las fichas de los inflables
  solo entran Pro y Premium; donde se habla de toda la línea entra también el
  Motor MF ONE y se eligen cuáles comparar.
*/

export function MotorPicker({ productName }: { productName?: string }) {
  return (
    <section className="msection !bg-white">
      <div className="mwrap">
        <Reveal className="msection-head">
          <span className="m-eyebrow accent">Configúralo a tu medida</span>
          <h2>Elige tu motor.</h2>
          <p>
            {productName
              ? `El ${productName} trabaja con dos motores de la línea 2.0. Los dos enfrían hasta 3 °C sin hielo y se controlan desde la app; cambian el calor y el ozono.`
              : "Compara el Motor Pro 2.0 y el Premium 2.0 de los inflables con el Motor MF ONE, fila por fila."}
          </p>
        </Reveal>
        <Reveal>
          <ComparadorMotores disponibles={productName ? ["pro", "premium"] : ["pro", "premium", "mfone"]} />
        </Reveal>

        <Reveal className="mt-8 text-center">
          <p className="text-[13px] text-[var(--fg-muted)]">
            ¿No sabes cuál elegir?{" "}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent-ice)] hover:text-[var(--m-blue-600)]"
            >
              Escríbenos por WhatsApp
            </a>{" "}
            y te ayudamos en 2 minutos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
