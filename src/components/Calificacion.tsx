import { Estrellas } from "@/components/Estrellas";
import { PROMEDIO } from "@/lib/resenas";

/*
  El promedio grande de las reseñas: la cifra y la fila de estrellas, centradas.

  Lo usan el bloque de reseñas del inicio y el encabezado de /resenas, para que
  se vean idénticos.

  Va TODO en <div> con estilos en línea, a propósito. En el inicio la cifra era
  un <p> dentro de .msection-head, y metal.css fija "font-size: 16px" a todo
  párrafo ahí adentro: la cifra salía a 16px aunque la clase pidiera 44 (Saul lo
  cachó, sep 2026). Con div y estilo en línea ninguna regla del sistema la pisa.

  No se publica el total de reseñas, solo el promedio (decisión de Saul).
*/

export function Calificacion() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        className="mdisplay"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: "0.12em",
          fontSize: "clamp(72px, 9vw, 124px)",
          lineHeight: 0.9,
          letterSpacing: "-0.045em",
          color: "var(--fg-metal)",
          WebkitTextStroke: "var(--bold-stroke) currentColor",
        }}
      >
        <span>{PROMEDIO.toFixed(1)}</span>
        <span
          style={{
            fontSize: "0.3em",
            letterSpacing: "-0.01em",
            color: "var(--fg-subtle)",
            WebkitTextStroke: "0",
          }}
        >
          / 5
        </span>
      </div>

      <div style={{ marginTop: "clamp(18px, 2vw, 26px)" }}>
        <Estrellas valor={PROMEDIO} tam={30} />
      </div>
    </div>
  );
}
