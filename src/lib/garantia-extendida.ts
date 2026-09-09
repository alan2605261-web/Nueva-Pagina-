/*
  MF SHIELD — garantía extendida.

  Fuente de verdad de esta página: los cinco contratos de garantía extendida
  (MF ONE, MF BARREL PRO/PREMIUM, MF HORIZON PRO/PREMIUM) firmados por
  MENTE FRIA. De ahí salen precios, vigencias, coberturas, exclusiones y
  el procedimiento de reclamación.

  Los contratos NO son fuente de verdad para especificaciones del producto:
  para eso mandan los manuales y las fichas técnicas. Por eso aquí no se
  publica ningún dato técnico (peso, medidas, potencias) tomado del contrato.
*/

export type PlanId =
  | "mf-one"
  | "barrel-pro"
  | "barrel-premium"
  | "horizon-pro"
  | "horizon-premium";

export type PlanShield = {
  id: PlanId;
  equipo: string;
  /** Slug del PDP al que pertenece */
  producto: "mf-one" | "mf-barrel" | "mf-horizon";
  motor?: "Pro" | "Premium";
  precio: number;
  precioEquipo: number;
  /** Garantía estándar incluida, en meses */
  estandarMeses: number;
  /** Primer y último mes de la cobertura extendida */
  desdeMes: number;
  hastaMes: number;
  mesesExtra: number;
  uso: "residencial" | "residencial y comercial";
};

export const PLANES: PlanShield[] = [
  {
    id: "mf-one",
    equipo: "MF ONE",
    producto: "mf-one",
    precio: 13000,
    precioEquipo: 169000,
    estandarMeses: 12,
    desdeMes: 13,
    hastaMes: 24,
    mesesExtra: 12,
    uso: "residencial y comercial",
  },
  {
    id: "barrel-pro",
    equipo: "MF Barrel · Motor Pro",
    producto: "mf-barrel",
    motor: "Pro",
    precio: 6900,
    precioEquipo: 69000,
    estandarMeses: 6,
    desdeMes: 7,
    hastaMes: 24,
    mesesExtra: 18,
    uso: "residencial",
  },
  {
    id: "barrel-premium",
    equipo: "MF Barrel · Motor Premium",
    producto: "mf-barrel",
    motor: "Premium",
    precio: 8400,
    precioEquipo: 84000,
    estandarMeses: 6,
    desdeMes: 7,
    hastaMes: 24,
    mesesExtra: 18,
    uso: "residencial y comercial",
  },
  {
    id: "horizon-pro",
    equipo: "MF Horizon · Motor Pro",
    producto: "mf-horizon",
    motor: "Pro",
    precio: 7400,
    precioEquipo: 74000,
    estandarMeses: 6,
    desdeMes: 7,
    hastaMes: 24,
    mesesExtra: 18,
    uso: "residencial",
  },
  {
    id: "horizon-premium",
    equipo: "MF Horizon · Motor Premium",
    producto: "mf-horizon",
    motor: "Premium",
    precio: 8900,
    precioEquipo: 89000,
    estandarMeses: 6,
    desdeMes: 7,
    hastaMes: 24,
    mesesExtra: 18,
    uso: "residencial y comercial",
  },
];

export function planesDe(producto: PlanShield["producto"]) {
  return PLANES.filter((p) => p.producto === producto);
}

export function plan(id: PlanId) {
  const p = PLANES.find((x) => x.id === id);
  if (!p) throw new Error(`Plan MF Shield desconocido: ${id}`);
  return p;
}

/* ── Qué cubre ─────────────────────────────────────────────── */

export const CUBRE_MF_ONE = [
  "Motor de enfriamiento: compresor, placas de calor y componentes internos.",
  "Bombas del equipo.",
  "Sistema de filtración integrado.",
  "Sistema eléctrico, electrónico y de control de fábrica.",
];

export const CUBRE_INFLABLE = [
  "Motor de enfriamiento: compresor, placas de calor, bomba integrada y sistema eléctrico y de control.",
  "Defectos de fabricación de la tina inflable: costuras, válvulas, fugas o delaminación atribuibles a fabricación.",
];

/** Vale para los dos: lo que entra en la cobertura además de la refacción. */
export const INCLUYE = [
  "Refacciones originales.",
  "Mano de obra del técnico autorizado.",
  "Logística con guías prepagadas cuando el caso requiere trasladar el equipo o un componente.",
  "Noventa días naturales de garantía sobre cada reparación, conforme al artículo 81 de la Ley Federal de Protección al Consumidor.",
];

/* ── Qué no cubre ──────────────────────────────────────────── */

export const NO_CUBRE = [
  {
    t: "Mal uso o negligencia",
    d: "Operar sin agua o con válvulas cerradas, voltaje fuera de rango, extensiones sin tierra, no drenar tras un corte prolongado de energía, bloquear la ventilación o meter líquidos distintos al agua.",
  },
  {
    t: "Congelamiento",
    d: "Agua congelada en el equipo o en el circuito, incluyendo cuando no se drena estando fuera de uso o con temperatura ambiente por debajo de 1 °C.",
  },
  {
    t: "Sol directo sobre el motor",
    d: "El chiller no debe recibir luz solar directa.",
  },
  {
    t: "Agua directa sobre el motor",
    d: "Lluvia, chorros, escurrimientos, salpicaduras constantes o inmersión. En exteriores el equipo va bajo techo o cubierta.",
  },
  {
    t: "Motor acostado o volteado",
    d: "El motor va siempre en posición vertical, también durante el transporte.",
  },
  {
    t: "Falta de mantenimiento o químicos incorrectos",
    d: "Filtros saturados o no conformes, mala calidad del agua, cloro de alberca, bromo, solventes o cualquier químico fuera del manual.",
  },
  {
    t: "Desgaste natural y consumibles",
    d: "Filtros, empaques, sellos y mangueras.",
  },
  {
    t: "Daño estético",
    d: "Rayones, grietas, decoloración, manchas y roturas de carcasa o superficie que no afecten el funcionamiento.",
  },
  {
    t: "Intervenciones no autorizadas",
    d: "Equipos alterados, abiertos o reparados por alguien que MENTE FRIA no autorizó.",
  },
  {
    t: "Causas externas",
    d: "Caso fortuito o fuerza mayor, incendio, inundación, sismo, robo, vandalismo, plagas y variaciones de la red eléctrica.",
  },
  {
    t: "Transportes por tu cuenta",
    d: "Daños en traslados o reubicaciones hechos por ti o por terceros ajenos a nuestra logística.",
  },
];

/** Solo para inflables: la tina rota por mal uso no se cubre, pero se repone barata. */
export const REPOSICION_TINA = 6000;

/* ── Cómo se atiende una reclamación ───────────────────────── */

export const PASOS = [
  {
    n: "01",
    t: "Nos escribes",
    d: "Por WhatsApp o correo, con los datos de tu póliza, la descripción de la falla y fotos o video. Contestamos en un máximo de 3 días hábiles.",
  },
  {
    n: "02",
    t: "Diagnóstico por videollamada",
    d: "Agendamos videollamada con un técnico autorizado. Es el primer paso obligatorio de toda reclamación, y buena parte de las fallas se resuelven aquí mismo.",
  },
  {
    n: "03",
    t: "Definimos la vía de atención",
    d: "Con el diagnóstico en mano te decimos cuál de las cinco vías aplica a tu caso. En todas van incluidas las refacciones originales.",
  },
];

export const VIAS = [
  {
    t: "Traslado a nuestras instalaciones",
    d: "Mandamos guías prepagadas, gestionamos la recolección y te devolvemos el equipo reparado a tu domicilio, sin costo.",
  },
  {
    t: "Atención en sitio",
    d: "Dentro de la Ciudad de México reparamos en tu domicilio con personal propio. En otros estados se revisa caso por caso según la red disponible.",
  },
  {
    t: "Técnico autorizado en tu estado",
    d: "Cuando estás fuera de la zona fija, la reparación la hace un técnico de nuestra red en tu entidad.",
  },
  {
    t: "Coordinación con tu técnico",
    d: "Con aprobación previa por escrito, tu técnico hace el trabajo: nosotros ponemos las refacciones originales y el soporte remoto.",
  },
  {
    t: "Refacción con instalación guiada",
    d: "Si el componente se cambia sin herramienta especializada, te lo enviamos sin costo y te acompañamos por videollamada.",
  },
];

/* ── Anexo A: mantenimiento, condición de validez ──────────── */

export type Tabulador = {
  motor: string;
  columnas: string[];
  filas: { tarea: string; valores: string[] }[];
  nota: string;
};

export const TABULADOR_MF_ONE: Tabulador = {
  motor: "MF ONE",
  columnas: ["1/día", "2/día", "3/día", "5/día", "10/día", "15/día", "20/día", "25/día"],
  filas: [
    { tarea: "Cambiar filtro de papel", valores: ["~1 mes", "3 sem", "10 días", "1 sem", "3 días", "2 días", "1 día", "1 día"] },
    { tarea: "Cambiar agua de la tina", valores: ["~1 mes", "3 sem", "10 días", "1 sem", "3 días", "2 días", "1 día", "1 día"] },
  ],
  nota: "El agua estancada sin filtración genera bacterias. Si no vas a usar el equipo, o si la temperatura ambiente baja de 1 °C, drénalo por completo conforme al manual.",
};

export const TABULADOR_PRO: Tabulador = {
  motor: "Motor Pro",
  columnas: ["1/día", "2/día", "3/día", "5/día", "10/día", "15/día"],
  filas: [
    { tarea: "Cambiar filtro de papel", valores: ["3 sem", "2 sem", "10 días", "1 sem", "5 días", "4 días"] },
    { tarea: "Cambiar agua de la tina", valores: ["3 sem", "10 días", "1 sem", "4 días", "2 días", "2 días"] },
    { tarea: "Enjuagar filtro metálico", valores: ["3 sem", "2 sem", "10 días", "1 sem", "5 días", "4 días"] },
    { tarea: "Enjuagar malla antipolvo", valores: ["~2 meses", "~1 mes", "5 sem", "5 sem", "4 sem", "3 sem"] },
  ],
  nota: "Si el motor solo se enciende al usarlo, cambia el filtro cada dos semanas y el agua cada semana y media. Si está apagado por completo, cambia el agua cada dos o tres días.",
};

/* ── Reglas del contrato que conviene decir de frente ───────── */

export const LETRA_CHICA = [
  "Se contrata mientras la garantía estándar siga vigente, sujeto a validación técnica.",
  "El mantenimiento del Anexo A es condición de validez. Los filtros originales Mente Fria acreditan el cumplimiento por sí solos; con filtros de terceros tendrás que probar la equivalencia y la frecuencia.",
  "Cualquier falla se avisa dentro de los 10 días naturales siguientes a detectarla.",
  "Zona fija de servicio: Ciudad de México. Otras entidades se revisan caso por caso según la red de operación vigente.",
  "MF Shield es un contrato de reparación: no contempla reembolsos, indemnizaciones ni pagos en dinero.",
  "No es reembolsable ni transferible a un nuevo dueño del equipo.",
  "Es adicional a la garantía estándar y a tus derechos bajo la Ley Federal de Protección al Consumidor. No los sustituye ni los limita.",
];
