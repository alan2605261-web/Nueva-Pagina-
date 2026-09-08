/*
  Quiz "Encuentra tu plunge".

  Pedido por Saul y por Rafa. La referencia es el quiz de Plunge, que promete
  una recomendación según "space, goals and budget". Aquí no se copia su
  implementación: se arma con NUESTRAS medidas reales, que son las que
  deciden de verdad cuál cabe.

  Dos principios:

  1. **Descartar antes que puntuar.** Hay restricciones que son físicas, no
     preferencias. Si el lado largo del espacio mide 1.4 m, la MF ONE no cabe
     y no hay puntaje que lo arregle. Primero se eliminan los imposibles y
     sólo después se puntúan los que quedan.

  2. **Decir la verdad incómoda.** Si alguien de 1.85 m quiere estirarse y su
     presupuesto sólo alcanza el Horizon, el resultado lo recomienda pero
     avisa que el interior mide 160 cm y va a ir con las rodillas dobladas.
     Un quiz que sólo halaga vende una devolución.

  Medidas, todas documentadas (ver reglas 4 y 5 del HANDOFF):
    MF ONE     195 × 80 × 71 cm · 420 L · 135 kg · 1–40 °C · $169,000
               + 100 cm libres al frente y 20 cm por lado
    MF Horizon 160 × 70 × 65 cm · 550 L máx · 12 kg · $74,000
    MF Barrel  Ø 90 × 90 cm     · 500 L máx · 11 kg · $69,000

  NOTA PARA SAUL: el precio de los motores no está publicado en ningún lado
  del sitio, así que el quiz NO suma totales ni dice "más el motor". Muestra
  el precio de la tina tal como está publicado y manda a /motores. Si el
  precio del inflable ya incluye motor, o si no, hay que decirlo explícito.
*/

export type ModeloId = "mf-one" | "mf-horizon" | "mf-barrel";

export type Modelo = {
  id: ModeloId;
  nombre: string;
  precio: string;
  href: string;
  img: string;
  /** Lado largo que ocupa, ya con los espacios libres que pide la ficha. */
  largoNecesarioCm: number;
  /** Largo interior útil para estirarse. Null en el Barrel: es vertical. */
  interiorCm: number | null;
  resumen: string;
};

export const MODELOS: Record<ModeloId, Modelo> = {
  "mf-one": {
    id: "mf-one",
    nombre: "MF ONE",
    precio: "$169,000 MXN",
    href: "/productos/mf-one",
    img: "/images/prod-mfone.webp",
    largoNecesarioCm: 295, // 195 de tina + 100 de frente libre
    interiorCm: 195,
    resumen:
      "Todo en una pieza: el chiller vive dentro de la tina, sin motor aparte ni mangueras. Ajusta de 1 a 40 °C y se queda donde la pongas.",
  },
  "mf-horizon": {
    id: "mf-horizon",
    nombre: "MF Horizon",
    precio: "$74,000 MXN",
    href: "/productos/mf-horizon",
    img: "/images/prod-horizon-nobg.png",
    largoNecesarioCm: 160,
    interiorCm: 160,
    resumen:
      "Inflable horizontal: te metes estirado. Pesa 12 kg vacía, se desinfla y se guarda en su mochila.",
  },
  "mf-barrel": {
    id: "mf-barrel",
    nombre: "MF Barrel",
    precio: "$69,000 MXN",
    href: "/productos/mf-barrel",
    img: "/images/prod-barrel-nobg.png",
    largoNecesarioCm: 90,
    interiorCm: null,
    resumen:
      "Inflable vertical: ocupa 90 cm de diámetro y te sumerges sentado hasta los hombros. La que menos piso pide.",
  },
};

/* ── Preguntas ─────────────────────────────────────────────────────────── */

export type Opcion = { valor: string; etiqueta: string; nota?: string };
export type Pregunta = {
  id: string;
  pregunta: string;
  ayuda?: string;
  opciones: Opcion[];
};

export const PREGUNTAS: Pregunta[] = [
  {
    id: "espacio",
    pregunta: "¿Cuánto mide el lado más largo del lugar donde la vas a poner?",
    ayuda:
      "Cuenta el espacio libre, no el del mueble. La MF ONE necesita 100 cm despejados al frente para poder entrar y salir.",
    opciones: [
      { valor: "xs", etiqueta: "Menos de 1.2 m", nota: "Un rincón, un balcón chico" },
      { valor: "s", etiqueta: "Entre 1.2 y 2 m", nota: "Un patio de departamento" },
      { valor: "m", etiqueta: "Entre 2 y 3 m", nota: "Una terraza o un cuarto de servicio" },
      { valor: "l", etiqueta: "Más de 3 m", nota: "Jardín, roof, cuarto dedicado" },
    ],
  },
  {
    id: "movilidad",
    pregunta: "¿Se queda fija o necesitas poder moverla?",
    opciones: [
      { valor: "fija", etiqueta: "Se queda fija", nota: "Tiene su lugar y ahí se queda" },
      { valor: "guardar", etiqueta: "Quiero poder guardarla", nota: "La saco cuando la uso" },
      { valor: "viajar", etiqueta: "Quiero poder llevármela", nota: "Casa de fin de semana, viajes" },
    ],
  },
  {
    id: "postura",
    pregunta: "¿Cómo te quieres meter?",
    opciones: [
      { valor: "estirado", etiqueta: "Estirado", nota: "Piernas extendidas, como en una tina" },
      { valor: "sentado", etiqueta: "Sentado está bien", nota: "Sumergido hasta los hombros" },
      { valor: "igual", etiqueta: "Me da igual" },
    ],
  },
  {
    id: "estatura",
    pregunta: "¿Cuánto mides?",
    ayuda: "Es lo que define si de verdad vas a poder estirarte o vas a ir con las rodillas dobladas.",
    opciones: [
      { valor: "baja", etiqueta: "Menos de 1.65 m" },
      { valor: "media", etiqueta: "Entre 1.65 y 1.78 m" },
      { valor: "alta", etiqueta: "Más de 1.78 m" },
    ],
  },
  {
    id: "temperatura",
    pregunta: "¿Solo frío, o también calor?",
    opciones: [
      { valor: "frio", etiqueta: "Solo frío", nota: "Recuperación y nada más" },
      { valor: "ambos", etiqueta: "Frío y calor", nota: "Contraste en el mismo equipo" },
    ],
  },
  {
    id: "presupuesto",
    pregunta: "¿Con cuánto cuentas para el equipo?",
    opciones: [
      { valor: "80", etiqueta: "Hasta $80,000" },
      { valor: "120", etiqueta: "Hasta $120,000" },
      { valor: "abierto", etiqueta: "Más de $150,000", nota: "El presupuesto no es la restricción" },
    ],
  },
  {
    id: "uso",
    pregunta: "¿Para quién es?",
    opciones: [
      { valor: "personal", etiqueta: "Para mí y mi casa" },
      { valor: "familia", etiqueta: "Para toda la familia", nota: "Varias personas al día" },
      { valor: "negocio", etiqueta: "Para un negocio", nota: "Gimnasio, spa, clínica, estudio" },
    ],
  },
];

/* ── Resultado ─────────────────────────────────────────────────────────── */

export type Motor = "pro" | "premium" | null;

export type Resultado = {
  modelo: Modelo;
  /** Sólo para inflables. La MF ONE no lleva motor aparte. */
  motor: Motor;
  razones: string[];
  advertencias: string[];
  /** true cuando ninguna opción cumplía todo y hubo que ceder en algo. */
  concesion: boolean;
  b2b: boolean;
};

const LARGO_DISPONIBLE: Record<string, number> = { xs: 120, s: 200, m: 300, l: 600 };
const TECHO_PRESUPUESTO: Record<string, number> = { "80": 80000, "120": 120000, abierto: Infinity };
const PRECIO: Record<ModeloId, number> = { "mf-one": 169000, "mf-horizon": 74000, "mf-barrel": 69000 };
const ESTATURA_CM: Record<string, number> = { baja: 163, media: 172, alta: 185 };

export type Respuestas = Record<string, string>;

export function recomendar(r: Respuestas): Resultado {
  const largo = LARGO_DISPONIBLE[r.espacio] ?? 600;
  const techo = TECHO_PRESUPUESTO[r.presupuesto] ?? Infinity;
  const estatura = ESTATURA_CM[r.estatura] ?? 172;

  /* 1. Descartes duros: lo que no cabe o no alcanza. */
  const viables = (Object.keys(MODELOS) as ModeloId[]).filter((id) => {
    const m = MODELOS[id];
    if (m.largoNecesarioCm > largo) return false;
    if (PRECIO[id] > techo) return false;
    // 135 kg no se guardan ni viajan.
    if (id === "mf-one" && (r.movilidad === "guardar" || r.movilidad === "viajar")) return false;
    return true;
  });

  const concesion = viables.length === 0;
  // Si nada pasó los filtros, se recomienda lo más chico y barato y se explica.
  const candidatos: ModeloId[] = concesion ? ["mf-barrel"] : viables;

  /* 2. Puntaje entre los que sí son posibles. */
  const puntos: Record<string, number> = {};
  for (const id of candidatos) {
    let p = 0;
    const m = MODELOS[id];

    if (r.postura === "estirado") p += m.interiorCm ? 3 : -3;
    if (r.postura === "sentado" && id === "mf-barrel") p += 2;

    // Estirarse de verdad: el interior tiene que darle al cuerpo.
    if (r.postura === "estirado" && m.interiorCm && m.interiorCm >= estatura - 10) p += 2;

    if (r.movilidad === "viajar") p += id === "mf-horizon" ? 3 : id === "mf-barrel" ? 2 : 0;
    if (r.movilidad === "guardar") p += id === "mf-one" ? 0 : 2;
    if (r.movilidad === "fija") p += id === "mf-one" ? 3 : 0;

    if (r.uso === "negocio" || r.uso === "familia") p += id === "mf-one" ? 3 : 0;
    if (r.temperatura === "ambos" && id === "mf-one") p += 2;
    if (r.presupuesto === "abierto" && id === "mf-one") p += 2;
    if (largo >= 300 && id === "mf-one") p += 1;

    puntos[id] = p;
  }

  const ganador = candidatos.reduce((a, b) => (puntos[b] > puntos[a] ? b : a));
  const modelo = MODELOS[ganador];

  /* 3. Motor: sólo para inflables. */
  let motor: Motor = null;
  if (ganador !== "mf-one") {
    motor = r.temperatura === "ambos" || r.uso === "negocio" || r.uso === "familia" ? "premium" : "pro";
  }

  /* 4. Por qué. */
  const razones: string[] = [];
  if (ganador === "mf-one") {
    razones.push("Cabe en tu espacio con los 100 cm libres que necesita al frente.");
    if (r.movilidad === "fija") razones.push("Como se queda fija, sus 135 kg dejan de ser un problema y ganas el chiller integrado.");
    if (r.temperatura === "ambos") razones.push("Ajusta de 1 a 40 °C en el mismo equipo, sin motor aparte ni mangueras.");
    if (r.uso === "negocio") razones.push("Su garantía de 12 meses es válida también para uso comercial.");
    if (r.uso === "familia") razones.push("Con 420 litros y enfriamiento de 4 a 6 °C por hora aguanta varias sesiones seguidas al día.");
  } else {
    // Decir "entra sin apretar" cuando en realidad es lo único que cabía
    // suena a folleto. Si fue la única viable, se dice así.
    razones.push(
      candidatos.length === 1
        ? `Con ${modelo.largoNecesarioCm} cm de lado largo, es la que cabe en el espacio que describiste.`
        : `Con ${modelo.largoNecesarioCm} cm de lado largo entra sin apretar en el espacio que describiste.`,
    );
    razones.push(`Pesa ${ganador === "mf-horizon" ? "12" : "11"} kg vacía: se desinfla, se guarda y se vuelve a montar en menos de 15 minutos.`);
    if (ganador === "mf-horizon" && r.postura === "estirado") razones.push("Es la inflable horizontal: te metes estirado, no sentado.");
    if (ganador === "mf-barrel" && r.postura !== "estirado") razones.push("Vertical y compacta: 90 cm de diámetro y te cubre hasta los hombros.");
    if (motor === "premium") razones.push("Con el Motor Premium 2.0 sumas calor hasta 42 °C y ozono purificando el agua.");
    if (motor === "pro") razones.push("El Motor Pro 2.0 cumple: baja a 3 °C con la misma filtración de 3 capas y el mismo control por app.");
  }

  /* 5. Lo que hay que decirle aunque no le guste. */
  const advertencias: string[] = [];
  if (concesion) {
    advertencias.push(
      "Con el espacio, el presupuesto y la movilidad que nos diste no hay una opción que cumpla las tres cosas. Esta es la que más se acerca; escríbenos y lo vemos contigo.",
    );
  }
  if (modelo.interiorCm && r.postura === "estirado" && modelo.interiorCm < estatura - 10) {
    advertencias.push(
      `Mides más de lo que da el interior de la ${modelo.nombre} (${modelo.interiorCm} cm). Te vas a sumergir completo, pero con las rodillas dobladas.`,
    );
  }
  if (ganador === "mf-barrel" && r.postura === "estirado") {
    advertencias.push("La MF Barrel es vertical: en ella te sumerges sentado, no estirado.");
  }
  if (ganador !== "mf-one" && r.temperatura === "ambos" && motor === "pro") {
    advertencias.push("Para calor necesitas el Motor Premium 2.0; el Pro es sólo frío.");
  }
  if (ganador === "mf-one" && largo < 320) {
    advertencias.push("Va a quedar justa. Antes de comprar, mide el acceso: la MF ONE viaja en una sola pieza de 195 cm y no se desarma.");
  }
  if (ganador !== "mf-one") {
    advertencias.push("El motor va aparte y necesita estar bajo techo, protegido de la lluvia y del sol directo.");
  }

  return { modelo, motor, razones, advertencias, concesion, b2b: r.uso === "negocio" };
}
