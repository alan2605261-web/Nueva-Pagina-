/*
  Los ocho artículos de "Ocho razones to plunge".

  Redacción 100% original de Mente Fria: ni una línea copiada del sitio vivo ni
  de terceros. Los títulos coinciden con las ocho razones del carrusel del
  landing para que cada card lleve a su artículo.

  Criterio editorial:
  · Fundamentado. Cada afirmación fuerte tiene estudio detrás, citado al final.
  · Honesto. Donde la evidencia es preliminar se dice; donde hay contraindicación
    se dice también (el caso del frío después de pesas es el ejemplo claro).
  · Sin cifras que no se puedan sostener. La del "80% de tasa metabólica" que
    circula en el sitio vivo se sustituyó por el dato medido de Šrámek 2000.
  · Voz Mente Fria: directa, en segunda persona, sin relleno y sin emojis.
*/

export type Seccion = { h: string; p: string[] };

/*
  `serie` agrupa los artículos en el índice. Hoy solo existe "La ciencia del
  frío", pero /blog arma una sección por cada serie que encuentre, así que
  publicar el primer artículo de una serie nueva —mantenimiento, protocolos,
  historias de clientes— crea su sección solo, sin tocar la página.
*/
export type BlogPost = {
  slug: string;
  serie: string;
  num: string;
  titulo: string;
  dek: string;
  img: string;
  lectura: string;
  secciones: Seccion[];
  protocolo?: { t: string; d: string }[];
  fuentes: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "acelera-la-recuperacion",
    serie: "La ciencia del frío",
    num: "01",
    titulo: "Acelera la recuperación",
    dek: "Por qué el frío baja la hinchazón, cuánto dura el efecto y en qué caso conviene esperar.",
    img: "/photography/mfone-patio/inmersion.jpg",
    lectura: "5 min",
    secciones: [
      {
        h: "Lo que pasa cuando entras",
        p: [
          "El agua fría provoca vasoconstricción: los vasos sanguíneos cercanos a la piel se cierran y el flujo hacia el músculo trabajado baja. Al salir, el cuerpo revierte el proceso y la sangre vuelve a circular. Ese ciclo de cierre y apertura es lo que reduce la acumulación de líquido en el tejido después de un esfuerzo intenso.",
          "En términos prácticos: menos hinchazón, menos sensación de pesadez al día siguiente, y la posibilidad de volver a entrenar sin arrastrar el desgaste de la sesión anterior.",
        ],
      },
      {
        h: "Qué dice la evidencia",
        p: [
          "Las revisiones sistemáticas coinciden en que la inmersión en agua fría reduce el dolor muscular de aparición tardía, ese que aparece entre 24 y 72 horas después de entrenar. El efecto está bien documentado sobre la percepción de dolor y la sensación de recuperación.",
          "Es importante entender qué mide eso. La evidencia es sólida en cómo te sientes y en marcadores de daño muscular. Es más débil en si eso se traduce automáticamente en más rendimiento en la siguiente sesión. Sentirte mejor y rendir más son cosas relacionadas, pero no idénticas.",
        ],
      },
      {
        h: "El matiz que casi nadie te cuenta",
        p: [
          "Si tu objetivo de la sesión fue ganar masa muscular, meterte al agua fría inmediatamente después puede jugar en tu contra. Hay investigación que muestra que la inmersión justo después del entrenamiento de fuerza atenúa parte de las adaptaciones a largo plazo, porque la inflamación posterior al esfuerzo es precisamente parte de la señal que dispara la construcción de músculo.",
          "Eso no invalida el frío. Cambia cuándo lo usas. Después de una competencia, de un bloque de resistencia, de dos entrenamientos en el mismo día, o en un día distinto al de pesas, el frío hace justo lo que quieres. Inmediatamente después de una sesión pesada de hipertrofia, conviene esperar.",
        ],
      },
    ],
    protocolo: [
      { t: "Cuándo", d: "Después de resistencia, competencia o doble sesión. Separado varias horas de tu entrenamiento de fuerza si tu meta es hipertrofia." },
      { t: "Temperatura", d: "Entre 10 y 15 °C es suficiente para el efecto. No necesitas ir al mínimo." },
      { t: "Duración", d: "De 5 a 10 minutos. Más tiempo no es mejor." },
    ],
    fuentes: [
      "Leeder J, et al. Cold water immersion and recovery from strenuous exercise: a meta-analysis. British Journal of Sports Medicine, 2012.",
      "Roberts LA, et al. Post-exercise cold water immersion attenuates acute anabolic signalling and long-term adaptations in muscle to strength training. The Journal of Physiology, 2015.",
    ],
  },
  {
    slug: "mejora-el-animo",
    serie: "La ciencia del frío",
    num: "02",
    titulo: "Mejora el ánimo",
    dek: "La dopamina que libera el frío, cuánto dura y por qué no se parece a ningún estimulante.",
    img: "/photography/mfone-patio/salida.jpg",
    lectura: "4 min",
    secciones: [
      {
        h: "Una respuesta química, no una sensación vaga",
        p: [
          "Cuando el cuerpo entra en agua fría, el sistema nervioso simpático reacciona de inmediato. Se disparan noradrenalina y dopamina, dos neurotransmisores directamente ligados a la motivación, la atención y el estado de ánimo.",
          "No es una metáfora ni una impresión subjetiva. Se ha medido en laboratorio: en inmersión prolongada en agua a 14 °C, la noradrenalina en sangre se multiplicó varias veces y la dopamina subió de forma sostenida durante la exposición.",
        ],
      },
      {
        h: "Por qué no se siente como el café",
        p: [
          "Un estimulante te empuja desde afuera y después te cobra la factura. El frío hace algo distinto: provoca que tu propio cuerpo produzca la respuesta. La elevación de dopamina que se documenta en estas inmersiones no cae en picada, se sostiene durante horas y baja de forma gradual.",
          "Por eso la mayoría de la gente describe la sensación posterior como claridad, no como aceleración. No estás acelerado, estás despejado.",
        ],
      },
      {
        h: "Lo que la evidencia todavía no cierra",
        p: [
          "Hay hipótesis publicadas sobre el uso del frío como apoyo en cuadros depresivos, y son eso: hipótesis con evidencia preliminar, no un tratamiento validado. Mente Fria no vende eso y no deberías comprarlo de nadie que lo prometa.",
          "Lo que sí está sostenido es la respuesta neuroquímica aguda y lo que la gente reporta consistentemente: se siente mejor después. Si estás en tratamiento por salud mental, el frío puede ser un complemento, nunca un sustituto de tu médico.",
        ],
      },
    ],
    protocolo: [
      { t: "Cuándo", d: "En la mañana. Aprovechas la subida de dopamina durante el resto del día." },
      { t: "Duración", d: "De 2 a 5 minutos bastan para disparar la respuesta." },
      { t: "Clave", d: "Respira lento y por la nariz. Si controlas la respiración, controlas la experiencia." },
    ],
    fuentes: [
      "Šrámek P, et al. Human physiological responses to immersion into water of different temperatures. European Journal of Applied Physiology, 2000.",
      "Shevchuk NA. Adapted cold shower as a potential treatment for depression. Medical Hypotheses, 2008.",
    ],
  },
  {
    slug: "energia-natural",
    serie: "La ciencia del frío",
    num: "03",
    titulo: "Energía natural",
    dek: "Adrenalina y noradrenalina en segundos, sin cafeína y sin la caída de la tarde.",
    img: "/photography/mfone-patio/de-pie-hombre.jpg",
    lectura: "4 min",
    secciones: [
      {
        h: "El choque térmico",
        p: [
          "El primer contacto con el agua fría dispara lo que se conoce como respuesta de choque: la respiración se acelera, la frecuencia cardiaca sube y el cuerpo libera catecolaminas. Es una reacción de alerta, diseñada por la evolución para mantenerte despierto y capaz en una situación exigente.",
          "Esa misma reacción, provocada a propósito y en condiciones controladas, es la que te deja funcionando distinto el resto de la mañana.",
        ],
      },
      {
        h: "Por qué no hay bajón después",
        p: [
          "La cafeína funciona bloqueando la señal de cansancio. El cansancio sigue ahí, solo que no lo escuchas. Cuando el efecto pasa, lo escuchas todo junto.",
          "El frío no bloquea nada: sube tu nivel de alerta desde tu propia química y ese nivel desciende de forma gradual. No hay deuda que pagar a las cuatro de la tarde.",
        ],
      },
      {
        h: "Cómo se siente en la práctica",
        p: [
          "Los primeros treinta segundos son los difíciles. Ahí es donde la mayoría se sale. Si te quedas y llevas la respiración a un ritmo lento y controlado, el cuerpo se acomoda y la sensación cambia por completo.",
          "Ese momento, el de quedarte cuando todo te pide salir, es el que después se transfiere a lo demás. De ahí sale el nombre de la marca.",
        ],
      },
    ],
    protocolo: [
      { t: "Cuándo", d: "Al despertar, antes del café. Compruébalo una semana y compara." },
      { t: "Duración", d: "De 1 a 3 minutos. Para energía no necesitas más." },
      { t: "Error común", d: "Hiperventilar al entrar. Exhala largo y el resto se acomoda." },
    ],
    fuentes: [
      "Šrámek P, et al. Human physiological responses to immersion into water of different temperatures. European Journal of Applied Physiology, 2000.",
      "Tipton MJ, et al. Cold water immersion: kill or cure? Experimental Physiology, 2017.",
    ],
  },
  {
    slug: "reduce-la-inflamacion",
    serie: "La ciencia del frío",
    num: "04",
    titulo: "Reduce la inflamación",
    dek: "Qué le hace el frío al dolor articular y a la rigidez, dentro y fuera del entrenamiento.",
    img: "/photography/action/hyrox-01.jpg",
    lectura: "5 min",
    secciones: [
      {
        h: "El frío baja la temperatura del tejido",
        p: [
          "La inflamación es un proceso activo: requiere flujo sanguíneo, temperatura y actividad metabólica local. Al bajar la temperatura del tejido, el frío frena esa maquinaria. Menos actividad metabólica significa menos producción de las señales que sostienen la hinchazón y el dolor.",
          "Es el mismo principio del hielo sobre un golpe, aplicado a todo el cuerpo y de forma controlada, sin quemaduras por contacto directo y sin bolsas que se derriten.",
        ],
      },
      {
        h: "No solo es para atletas",
        p: [
          "La rigidez articular de la mañana, las molestias que deja una jornada larga de pie o sentado, la inflamación de bajo grado que acompaña al estrés sostenido: todo eso responde al mismo mecanismo.",
          "Mucha gente llega al cold plunge por el entrenamiento y se queda por esto otro. No por el rendimiento, sino porque se levantan sin la rigidez con la que llevaban años levantándose.",
        ],
      },
      {
        h: "Cuándo el frío no es la respuesta",
        p: [
          "Una lesión aguda con hinchazón importante necesita diagnóstico, no una inmersión. El frío controla síntomas; no repara un ligamento ni resuelve una condición articular de fondo.",
          "Y hay una regla que no se negocia: si tienes una condición cardiovascular, hipertensión no controlada, síndrome de Raynaud o estás embarazada, esto se consulta con tu médico antes de la primera inmersión. No después.",
        ],
      },
    ],
    protocolo: [
      { t: "Frecuencia", d: "De 3 a 4 veces por semana para molestias crónicas de bajo grado." },
      { t: "Temperatura", d: "De 8 a 12 °C. Fría de verdad, pero sostenible." },
      { t: "Duración", d: "De 5 a 10 minutos, con la respiración controlada de principio a fin." },
    ],
    fuentes: [
      "Bleakley CM, Davison GW. What is the biochemical and physiological rationale for using cold-water immersion in sports recovery? British Journal of Sports Medicine, 2010.",
      "Leeder J, et al. Cold water immersion and recovery from strenuous exercise: a meta-analysis. British Journal of Sports Medicine, 2012.",
    ],
  },
  {
    slug: "mayor-resiliencia",
    serie: "La ciencia del frío",
    num: "05",
    titulo: "Mayor resiliencia",
    dek: "El entrenamiento del sistema nervioso que ocurre cuando eliges quedarte.",
    img: "/photography/action/hyrox-02.webp",
    lectura: "5 min",
    secciones: [
      {
        h: "Hormesis: la dosis hace la adaptación",
        p: [
          "Hay estímulos que en dosis altas dañan y en dosis controladas fortalecen. El ejercicio es el ejemplo evidente: rompes fibra muscular para que se reconstruya más fuerte. El frío funciona igual.",
          "Cada inmersión es una dosis medida de estrés físico real, con una diferencia decisiva respecto al estrés de la vida diaria: tú decides cuándo empieza y cuándo termina.",
        ],
      },
      {
        h: "La habituación está medida",
        p: [
          "La respuesta de choque al frío, ese jadeo involuntario del primer contacto, se atenúa con la exposición repetida. Está documentado que unas pocas sesiones bastan para reducirla de forma sustancial, y la adaptación persiste durante meses.",
          "Lo interesante es que no solo se habitúa la respiración. Se atenúa la respuesta de estrés completa. Tu sistema nervioso aprende que puede recibir una señal de alarma y no desbordarse.",
        ],
      },
      {
        h: "Dónde se nota fuera del agua",
        p: [
          "Esa es la parte que no se mide en un laboratorio pero que reporta prácticamente todo el que sostiene la práctica: la junta difícil, la llamada complicada, el imprevisto de las siete de la mañana. Ya entrenaste el reflejo de respirar lento cuando el cuerpo pide reaccionar rápido.",
          "Cada vez que te quedas treinta segundos más de los que querías, estás practicando exactamente eso: decidir con la cabeza lo que el cuerpo te está pidiendo a gritos que no hagas.",
        ],
      },
    ],
    protocolo: [
      { t: "Consistencia", d: "Vale más entrar cuatro veces por semana tres minutos que una vez quince." },
      { t: "La regla", d: "Sales cuando tú lo decides, no cuando el cuerpo lo pide. Esa es toda la práctica." },
      { t: "Progresión", d: "Baja la temperatura antes de subir el tiempo." },
    ],
    fuentes: [
      "Tipton MJ, et al. Habituation of the initial responses to cold water immersion in humans. The Journal of Physiology, 1998.",
      "Tipton MJ, et al. Cold water immersion: kill or cure? Experimental Physiology, 2017.",
    ],
  },
  {
    slug: "mejor-descanso",
    serie: "La ciencia del frío",
    num: "06",
    titulo: "Mejor descanso",
    dek: "Cómo la caída de temperatura corporal facilita el sueño profundo, y a qué hora conviene entrar.",
    img: "/photography/mfone-patio/mujer-tina.jpg",
    lectura: "5 min",
    secciones: [
      {
        h: "Tu cuerpo se enfría para dormir",
        p: [
          "El descenso de la temperatura corporal central es una de las señales que tu organismo usa para iniciar el sueño. Cada noche, poco antes de que te dé sueño, tu temperatura empieza a bajar. No es casualidad: es el disparador.",
          "Al salir de una inmersión, la sangre vuelve a la periferia y el cuerpo libera calor por la piel. Ese proceso de reequilibrio favorece la caída de temperatura central que precede al sueño.",
        ],
      },
      {
        h: "La otra mitad: el sistema parasimpático",
        p: [
          "Después de la reacción inicial de alerta, viene una fase de recuperación en la que domina el sistema nervioso parasimpático, el que gobierna el descanso y la digestión. Ese es el estado en el que el cuerpo se repara.",
          "La combinación de las dos cosas, la temperatura bajando y el sistema parasimpático tomando el control, es lo que explica que mucha gente reporte un sueño más profundo las noches en que se metió al agua fría.",
        ],
      },
      {
        h: "El error de horario",
        p: [
          "Aquí va la advertencia que casi ningún vendedor te da: meterte al agua fría quince minutos antes de acostarte puede salirte al revés. La descarga de adrenalina y noradrenalina te deja alerta justo cuando quieres lo contrario.",
          "El punto óptimo está en la mañana o en la tarde. Si te vas a meter de noche, deja al menos una hora y media entre la inmersión y la cama, para que la fase de alerta pase y te quedes solo con la caída de temperatura.",
        ],
      },
    ],
    protocolo: [
      { t: "Mejor hora", d: "Mañana o media tarde. De noche, mínimo 90 minutos antes de dormir." },
      { t: "Duración", d: "De 3 a 8 minutos." },
      { t: "Después", d: "Sécate y abrígate. Reentrar en calor de forma natural es parte del efecto." },
    ],
    fuentes: [
      "Kräuchi K, et al. Warm feet promote the rapid onset of sleep. Nature, 1999.",
      "Harding EC, Franks NP, Wisden W. The temperature dependence of sleep. Frontiers in Neuroscience, 2019.",
    ],
  },
  {
    slug: "acelera-el-metabolismo",
    serie: "La ciencia del frío",
    num: "07",
    titulo: "Acelera el metabolismo",
    dek: "La grasa parda, cuánto sube realmente el gasto energético y por qué no es un atajo para bajar de peso.",
    img: "/images/barrel-retrato-moody.jpg",
    lectura: "5 min",
    secciones: [
      {
        h: "Grasa que quema calorías",
        p: [
          "Existen dos tipos de tejido graso. El blanco almacena energía. El pardo hace lo contrario: la quema para producir calor. Durante años se creyó que los adultos no lo conservaban; hoy sabemos que sí, y que el frío es su principal activador.",
          "Cuando te expones al frío de forma repetida, este tejido se activa y, con el tiempo, aumenta. Es una adaptación real y medible, no una promesa de marketing.",
        ],
      },
      {
        h: "El número correcto",
        p: [
          "Vas a encontrar por todos lados la cifra de que el frío eleva el metabolismo un 80%. Nosotros no la usamos porque no encontramos el estudio que la sostenga.",
          "Lo que sí está medido: en inmersión en agua a 14 °C, la tasa metabólica se multiplicó por más de cuatro respecto al reposo, mientras duró la exposición. Es un dato mucho más contundente que el que circula, y además tiene autor, revista y año.",
        ],
      },
      {
        h: "Lo que esto no significa",
        p: [
          "Que el gasto suba durante la inmersión no convierte al cold plunge en un método para bajar de peso. La exposición dura minutos y el efecto acumulado sobre el balance energético diario es modesto comparado con lo que comes y con cuánto te mueves.",
          "Preferimos decírtelo así de claro. El frío es una herramienta excelente para recuperación, ánimo, descanso y disciplina. Como estrategia de pérdida de peso, sola, no lo es.",
        ],
      },
    ],
    protocolo: [
      { t: "Frecuencia", d: "La activación de grasa parda responde a la exposición repetida, no a la sesión heroica." },
      { t: "Temperatura", d: "Más frío activa más, pero solo si puedes sostenerlo con calma." },
      { t: "Después", d: "Si entras en calor con regadera caliente inmediatamente, cortas parte del estímulo." },
    ],
    fuentes: [
      "van Marken Lichtenbelt WD, et al. Cold-activated brown adipose tissue in healthy men. New England Journal of Medicine, 2009.",
      "Šrámek P, et al. Human physiological responses to immersion into water of different temperatures. European Journal of Applied Physiology, 2000.",
    ],
  },
  {
    slug: "acelera-el-sistema-inmune",
    serie: "La ciencia del frío",
    num: "08",
    titulo: "Acelera el sistema inmune",
    dek: "El ensayo con más de tres mil participantes que midió días de incapacidad, y qué se puede concluir de él.",
    img: "/photography/mfone-patio/mujer-de-pie.jpg",
    lectura: "5 min",
    secciones: [
      {
        h: "El estudio que vale la pena conocer",
        p: [
          "En 2016 se publicó un ensayo aleatorizado con más de tres mil participantes en Países Bajos. Durante treinta días, un grupo terminó su regadera diaria con agua fría y otro no. Después se siguió a ambos durante meses.",
          "El grupo del agua fría reportó cerca de un 29% menos días de ausencia laboral por enfermedad. Es un resultado grande para una intervención que no cuesta nada y dura noventa segundos.",
        ],
      },
      {
        h: "Qué mide y qué no mide ese número",
        p: [
          "Conviene leerlo con precisión, porque casi nadie lo hace. El estudio midió días de ausencia por enfermedad, no cantidad de infecciones. De hecho, no encontró diferencia significativa en cuántas veces se enfermaron los participantes.",
          "La lectura honesta es esta: no está demostrado que te enfermes menos, sino que cuando te enfermas te sientes suficientemente funcional como para no faltar. Sigue siendo un resultado valioso. Solo que no es el que suelen contarte.",
        ],
      },
      {
        h: "El mecanismo detrás",
        p: [
          "La exposición al frío moviliza leucocitos y modifica de forma transitoria varios marcadores inmunológicos. Trabajos anteriores documentaron aumentos en el conteo de células inmunitarias tras inmersiones repetidas.",
          "Es un terreno donde la investigación sigue abierta. Lo prudente es tomarlo como lo que es: una señal favorable y consistente, no una vacuna.",
        ],
      },
    ],
    protocolo: [
      { t: "Consistencia", d: "El efecto del estudio vino de exposición diaria durante treinta días seguidos." },
      { t: "Duración", d: "En el ensayo bastaron entre 30 y 90 segundos de frío al final de la regadera." },
      { t: "Cuándo no", d: "Si ya estás cursando una infección con fiebre, espera a recuperarte." },
    ],
    fuentes: [
      "Buijze GA, et al. The effect of cold showering on health and work: a randomized controlled trial. PLoS ONE, 2016.",
      "Janský L, et al. Immune system of cold-exposed and cold-adapted humans. European Journal of Applied Physiology, 1996.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/*
  Agrupa los artículos por serie conservando el orden de publicación.
  /blog pinta una sección por entrada de este mapa, así que dar de alta una
  serie nueva es publicar su primer artículo — no hay que tocar la página ni
  dejar tarjetas de "próximamente" ocupando lugar.
*/
export function porSerie(posts: BlogPost[] = BLOG_POSTS) {
  const mapa = new Map<string, BlogPost[]>();
  for (const p of posts) {
    const xs = mapa.get(p.serie);
    if (xs) xs.push(p);
    else mapa.set(p.serie, [p]);
  }
  return [...mapa.entries()].map(([serie, articulos]) => ({ serie, articulos }));
}
