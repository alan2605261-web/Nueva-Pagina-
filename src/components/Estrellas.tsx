/*
  Fila de cinco estrellas que representa una calificación.

  Existe porque con la segunda tanda de reseñas (sep 2026) dejaron de ser todas
  de cinco: hay de tres y de cuatro, y el promedio quedó en 4.7. Pintar siempre
  cinco estrellas llenas diría algo que no es.

  Cómo funciona: abajo van cinco estrellas en gris claro y encima cinco llenas en
  negro, recortadas al porcentaje de la calificación. Con 4.7 se ve la quinta
  llena al 70%. Con enteros (una reseña de 3) quedan tres negras y dos grises.

  La estrella es propia, con las puntas redondeadas. La que venía de icons.tsx
  tenía las puntas afiladas y los ángulos disparejos, y en tamaño grande se veía
  de mala calidad (Saul, sep 2026). Se dibuja en un lienzo de 24 con
  geometricPrecision para que salga nítida a cualquier tamaño.

  Las de abajo van RELLENAS en gris claro, no de contorno. El contorno se había
  puesto porque una reseña de 3 se leía como de 5, pero la causa real era otra
  (el contenedor se estiraba, ver abajo); ya corregida, el relleno gris se ve más
  limpio y se distingue sin problema del negro.
*/

const PUNTA =
  "M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11c.08.2.27.33.48.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 0 0-.18.56l1.28 5.39a.56.56 0 0 1-.84.61l-4.73-2.89a.56.56 0 0 0-.58 0l-4.73 2.89a.56.56 0 0 1-.84-.61l1.28-5.39a.56.56 0 0 0-.18-.56l-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.44a.56.56 0 0 0 .48-.35z";

function Estrella({ tam, color }: { tam: number; color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tam}
      height={tam}
      style={{ flex: "none", display: "block" }}
      shapeRendering="geometricPrecision"
      aria-hidden="true"
    >
      <path d={PUNTA} fill={color} />
    </svg>
  );
}

export function Estrellas({
  valor,
  tam = 18,
  className,
  vacia = "#dde1e6",
  llena = "var(--fg-metal)",
}: {
  /** De 0 a 5. Acepta decimales para promedios. */
  valor: number;
  /** Lado de cada estrella, en píxeles. */
  tam?: number;
  className?: string;
  /** Color de las estrellas que faltan. */
  vacia?: string;
  /** Color de las estrellas llenas. */
  llena?: string;
}) {
  const pct = Math.max(0, Math.min(100, (valor / 5) * 100));
  const hueco = Math.round(tam * 0.18);
  const fila = { display: "flex", gap: `${hueco}px` } as const;

  return (
    <span
      className={className}
      /* width max-content y alignSelf evitan que el contenedor se estire: dentro
         de una tarjeta en columna (flex-col) se estiraba al ancho completo, y
         como el relleno es un % de ESE ancho, una reseña de 3 se pintaba con
         las cinco estrellas negras (Saul lo cachó, sep 2026). */
      style={{
        position: "relative",
        display: "inline-flex",
        width: "max-content",
        alignSelf: "flex-start",
        lineHeight: 0,
      }}
      role="img"
      aria-label={`${valor} de 5 estrellas`}
    >
      <span style={fila}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Estrella key={i} tam={tam} color={vacia} />
        ))}
      </span>

      <span
        style={{
          ...fila,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: `${pct}%`,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Estrella key={i} tam={tam} color={llena} />
        ))}
      </span>
    </span>
  );
}
