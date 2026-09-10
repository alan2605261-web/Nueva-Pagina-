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

  El precio de los inflables YA INCLUYE el motor: no se venden por separado
  (confirmado por Saul, sep 2026). Por eso el quiz muestra un solo precio y
  nunca habla de sumar el motor. Lo que sí hace es recomendar cuál de los dos
  conviene, porque esa elección sigue existiendo.
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

export type Opcion = { valor: string; etiqueta: string };
/* Sin notas ni textos de ayuda: Saul los quitó en sep 2026. Sugerir "un patio
   de departamento" bajo cada medida no ayuda a decidir y alarga la pantalla.
   La pregunta se sostiene sola. */
export type Pregunta = {
  id: string;
  pregunta: string;
  opciones: Opcion[];
};

export const PREGUNTAS: Pregunta[] = [
  {
    id: "espacio",
    pregunta: "¿Cuánto mide el lado más largo del lugar donde la vas a poner?",
    opciones: [
      { valor: "xs", etiqueta: "Menos de 1.2 m" },
      { valor: "s", etiqueta: "Entre 1.2 y 2 m" },
      { valor: "m", etiqueta: "Entre 2 y 3 m" },
      { valor: "l", etiqueta: "Más de 3 m" },
    ],
  },
  {
    id: "movilidad",
    pregunta: "¿Se queda fija o necesitas poder moverla?",
    opciones: [
      { valor: "fija", etiqueta: "Se queda fija" },
      { valor: "guardar", etiqueta: "Quiero poder guardarla" },
      { valor: "viajar", etiqueta: "Quiero poder llevármela" },
    ],
  },
  {
    id: "postura",
    pregunta: "¿Cómo te quieres meter?",
    opciones: [
      { valor: "estirado", etiqueta: "Estirado" },
      { valor: "sentado", etiqueta: "Sentado está bien" },
      { valor: "igual", etiqueta: "Me da igual" },
    ],
  },
  {
    id: "estatura",
    pregunta: "¿Cuánto mides?",
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
      { valor: "frio", etiqueta: "Solo frío" },
      { valor: "ambos", etiqueta: "Frío y calor" },
    ],
  },
  {
    id: "presupuesto",
    pregunta: "¿Con cuánto cuentas para el equipo?",
    opciones: [
      { valor: "80", etiqueta: "Hasta $80,000" },
      { valor: "120", etiqueta: "Hasta $120,000" },
      { valor: "abierto", etiqueta: "Más de $150,000" },
    ],
  },
  {
    id: "uso",
    pregunta: "¿Para quién es?",
    opciones: [
      { valor: "personal", etiqueta: "Para mí y mi casa" },
      { valor: "familia", etiqueta: "Para toda la familia" },
      { valor: "negocio", etiqueta: "Para un negocio" },
    ],
  },
];

/* ── Resultado ─────────────────────────────────────────────────────────── */

export type Motor = "pro" | "premium" | null;

/** Una opción evaluada: sirve para la ganadora y para las alternativas. */
export type Opcionada = {
  modelo: Modelo;
  motor: Motor;
  precio: number;
  /** Qué gana o qué cede frente a la recomendada. */
  contraste: string;
};

export type Resultado = {
  modelo: Modelo;
  /** Las que siguieron en el puntaje, de mejor a peor. Puede venir vacía. */
  alternativas: Opcionada[];
  /** Precio de la combinación tina + motor, no del modelo suelto. */
  precio: number;
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
/* El precio depende del motor, no solo del modelo. Los inflables cambian
   $15,000 entre Pro y Premium. Cuadran con el valor de equipo que declaran
   los contratos de garantía extendida. */
export const PRECIOS: Record<ModeloId, { pro: number; premium: number }> = {
  "mf-barrel": { pro: 69000, premium: 84000 },
  "mf-horizon": { pro: 74000, premium: 89000 },
  "mf-one": { pro: 169000, premium: 169000 }, // no lleva motor aparte
};

export function precioDe(id: ModeloId, motor: Motor): number {
  return PRECIOS[id][motor === "premium" ? "premium" : "pro"];
}
const ESTATURA_CM: Record<string, number> = { baja: 163, media: 172, alta: 185 };

export type Respuestas = Record<string, string>;

/* ── Preguntas adaptativas ─────────────────────────────────────────────

   No se preguntan siempre las siete. Varias dejan de importar según lo que
   ya contestó, y preguntarlas de todos modos alarga el quiz sin cambiar el
   resultado. Cada regla de aquí abajo sale de `recomendar`:

   · `estatura` solo se usa cuando la postura es "estirado".
   · `postura` y `estatura` solo importan si queda viva alguna tina horizontal.
     En la Barrel te metes sentado, no hay nada que elegir.
   · `presupuesto` no puede descartar a la Barrel: es la más barata y la opción
     más baja del quiz ya la cubre. Si es la única viable, sobra preguntarlo.

   El resultado es que alguien con poco espacio contesta cuatro preguntas en
   lugar de siete, y llega al mismo lugar.
─────────────────────────────────────────────────────────────────────── */

/** Modelos que siguen siendo posibles con lo contestado hasta ahora. */
export function viablesCon(r: Respuestas): ModeloId[] {
  const largo = LARGO_DISPONIBLE[r.espacio] ?? 600;
  const techo = TECHO_PRESUPUESTO[r.presupuesto] ?? Infinity;
  return (Object.keys(MODELOS) as ModeloId[]).filter((id) => {
    const m = MODELOS[id];
    if (m.largoNecesarioCm > largo) return false;
    if (id === "mf-one" && (r.movilidad === "guardar" || r.movilidad === "viajar")) return false;
    return true;
  });
}

export function preguntasAplicables(r: Respuestas): Pregunta[] {
  const viables = viablesCon(r);
  const soloBarrel = viables.length === 1 && viables[0] === "mf-barrel";
  const hayHorizontal = viables.length === 0 || viables.some((id) => MODELOS[id].interiorCm !== null);

  return PREGUNTAS.filter((q) => {
    if (q.id === "postura") return hayHorizontal;
    if (q.id === "estatura") return hayHorizontal && r.postura === "estirado";
    if (q.id === "presupuesto") return !soloBarrel;
    return true;
  });
}

/* ── La fórmula ────────────────────────────────────────────────────────

   Antes el presupuesto era un MURO: si el equipo costaba más que el techo,
   quedaba descartado y ya. Con eso, alguien con $120,000 que quería frío y
   calor, espacio de sobra y meterse estirado terminaba con un inflable,
   aunque todo lo demás apuntara a la MF ONE. Una sola variable decidía.

   Ahora solo se descarta lo FÍSICAMENTE IMPOSIBLE, que es lo que ninguna
   preferencia arregla:
     · no cabe en el lado largo disponible
     · pesa 135 kg y el cliente necesita guardarla o llevársela

   Lo demás se puntúa. Cuatro dimensiones, 100 puntos repartidos:

     Espacio            30   qué tan bien entra, no solo si entra
     Postura y estatura 25   si de verdad te vas a poder estirar
     Temperatura        25   si necesita calor y el equipo lo da
     Uso                20   una persona, una familia o un negocio

   Y al final se multiplica por un FACTOR de presupuesto, que penaliza sin
   eliminar:
     dentro del presupuesto        × 1.00
     hasta 25 % arriba             × 0.92
     hasta 50 % arriba             × 0.82
     hasta el doble                × 0.60
     más del doble                 × 0.35

   Así el dinero pesa, pero no manda solo. Un equipo 40 % arriba del techo
   puede ganar si arrasa en las otras cuatro; uno al doble de precio, casi
   nunca. Cuando gana algo por encima del presupuesto, el resultado lo dice
   de frente en las advertencias.
─────────────────────────────────────────────────────────────────────── */

export const PESOS = { espacio: 30, postura: 25, temperatura: 25, uso: 20 } as const;

function factorPresupuesto(precio: number, techo: number): number {
  if (techo === Infinity || precio <= techo) return 1;
  const veces = precio / techo;
  if (veces <= 1.25) return 0.92;
  if (veces <= 1.5) return 0.82;
  if (veces <= 2) return 0.6;
  return 0.35;
}

/** Motor que le toca a un inflable según lo que pidió. La MF ONE no lleva. */
function motorPara(id: ModeloId, r: Respuestas): Motor {
  if (id === "mf-one") return null;
  return r.temperatura === "ambos" || r.uso === "negocio" || r.uso === "familia"
    ? "premium"
    : "pro";
}

export function recomendar(r: Respuestas): Resultado {
  const largo = LARGO_DISPONIBLE[r.espacio] ?? 600;
  const techo = TECHO_PRESUPUESTO[r.presupuesto] ?? Infinity;
  const estatura = ESTATURA_CM[r.estatura] ?? 172;

  /* 1. Descartes duros: SOLO lo físicamente imposible. */
  const viables = (Object.keys(MODELOS) as ModeloId[]).filter((id) => {
    const m = MODELOS[id];
    if (m.largoNecesarioCm > largo) return false;
    // 135 kg no se guardan ni viajan.
    if (id === "mf-one" && (r.movilidad === "guardar" || r.movilidad === "viajar")) return false;
    return true;
  });

  const concesion = viables.length === 0;
  const candidatos: ModeloId[] = concesion ? ["mf-barrel"] : viables;

  /* 2. Puntaje por dimensión, y el presupuesto como factor al final. */
  const puntos: Record<string, number> = {};
  for (const id of candidatos) {
    const m = MODELOS[id];
    const motor = motorPara(id, r);

    // Espacio: entrar es el mínimo; sobrar espacio favorece a la grande.
    const holgura = largo - m.largoNecesarioCm;
    let espacio = holgura >= 100 ? 30 : holgura >= 40 ? 24 : 18;
    if (id === "mf-one" && holgura < 40) espacio = 12; // entra, pero justa

    // Postura y estatura: si quiere estirarse, que el interior le dé.
    let postura: number;
    if (r.postura === "estirado") {
      if (!m.interiorCm) postura = 4;                          // la Barrel es vertical
      else if (m.interiorCm >= estatura - 10) postura = 25;    // se estira de verdad
      else postura = 12;                                       // cabe, con rodillas dobladas
    } else if (r.postura === "sentado") {
      postura = id === "mf-barrel" ? 25 : 18;
    } else {
      postura = 20;
    }

    // Temperatura: quien pide calor necesita MF ONE o Motor Premium.
    let temperatura: number;
    if (r.temperatura === "ambos") temperatura = id === "mf-one" ? 25 : motor === "premium" ? 22 : 0;
    else temperatura = id === "mf-one" ? 20 : 25; // solo frío: el inflable sobra y cuesta menos

    // Uso: varias personas al día, o un negocio, empujan a la rígida.
    let uso: number;
    if (r.uso === "negocio") uso = id === "mf-one" ? 20 : 10;
    else if (r.uso === "familia") uso = id === "mf-one" ? 20 : 13;
    else uso = id === "mf-one" ? 15 : 20;

    // Movilidad, entre los que ya pasaron el filtro duro.
    let movilidad = 0;
    if (r.movilidad === "viajar") movilidad = id === "mf-horizon" ? 4 : id === "mf-barrel" ? 3 : 0;
    if (r.movilidad === "guardar") movilidad = id === "mf-one" ? 0 : 3;
    if (r.movilidad === "fija") movilidad = id === "mf-one" ? 4 : 0;

    const base = espacio + postura + temperatura + uso + movilidad;
    puntos[id] = base * factorPresupuesto(precioDe(id, motor), techo);
  }

  const orden = [...candidatos].sort((a, b) => puntos[b] - puntos[a]);
  const ganador = orden[0];
  const modelo = MODELOS[ganador];

  /* 3. Motor y precio real de esa combinación. */
  const motor: Motor = motorPara(ganador, r);
  const precio = precioDe(ganador, motor);

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
    if (motor === "premium") razones.push("Con el Motor Premium 2.0 sumas calor hasta 40 °C y ozono purificando el agua.");
    if (motor === "pro") razones.push("El Motor Pro 2.0 cumple: baja a 3 °C con la misma filtración de 3 capas y el mismo control por app.");
  }

  /* 5. Lo que hay que decirle aunque no le guste. */
  const advertencias: string[] = [];
  if (techo !== Infinity && precio > techo) {
    const arriba = Math.round(((precio - techo) / techo) * 100);
    advertencias.push(
      `Está ${arriba}% arriba del presupuesto que nos diste. Te la recomendamos porque es la que mejor resuelve lo demás que nos contaste, pero el número es el que es: $${precio.toLocaleString("en-US")} MXN.`,
    );
  }
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
    // "Va aparte" era falso: el precio del inflable ya incluye el motor.
    // Lo que sí hay que advertir es dónde va, que es una restricción real
    // de instalación.
    advertencias.push("El motor es una unidad separada de la tina y tiene que quedar bajo techo, protegido de la lluvia y del sol directo.");
  }

  /* 6. Las que siguieron. Recomendar a ciegas cuando el ganador no cumple
        todo deja al cliente sin salida: mejor enseñarle el siguiente escalón
        y qué gana o qué cede si se mueve para allá. */
  const alternativas: Opcionada[] = orden.slice(1, 3).map((id) => {
    const m = MODELOS[id];
    const mt = motorPara(id, r);
    const pr = precioDe(id, mt);
    const dif = pr - precio;

    let contraste: string;
    if (dif < 0) {
      const ahorro = Math.abs(dif).toLocaleString("en-US");
      contraste =
        id === "mf-barrel" && r.postura === "estirado"
          ? `Ahorras $${ahorro}, pero es vertical: te metes sentado.`
          : m.interiorCm && m.interiorCm < (ESTATURA_CM[r.estatura] ?? 172) - 10
            ? `Ahorras $${ahorro}, pero con ${m.interiorCm} cm de interior vas con las rodillas dobladas.`
            : `Ahorras $${ahorro} y es inflable: se guarda y se transporta.`;
    } else if (dif > 0) {
      contraste = `Cuesta $${dif.toLocaleString("en-US")} más${
        id === "mf-one" ? ", y a cambio el chiller va dentro de la tina y ajusta de 1 a 40 °C." : "."
      }`;
    } else {
      contraste = "Cuesta lo mismo y cambia el formato.";
    }

    return { modelo: m, motor: mt, precio: pr, contraste };
  });

  return { modelo, alternativas, motor, precio, razones, advertencias, concesion, b2b: r.uso === "negocio" };
}
