/*
  Blog de Mente Fria.

  ─── Por qué se rehizo (sep 2026) ─────────────────────────────────────────
  La primera versión tenía ocho artículos de 275 palabras de promedio. Eso es
  thin content: por debajo de 300 palabras Google no considera que la página
  responda nada, y un buscador con IA no tiene de dónde citar. Saul lo dijo
  sin rodeos: "es un blog de 10 líneas y se acabó".

  Lo que cambió:

  · **Colecciones.** Los artículos ya no viven sueltos. Cada uno pertenece a
    una colección, y /blog muestra colecciones, no una reja de ocho tarjetas
    desempaquetadas. Hoy existe una; agregar otra es agregar una entrada a
    COLECCIONES y publicar su primer artículo.

  · **Cuerpo.** Cada artículo desarrolla el mecanismo, lo que la evidencia
    sostiene, dónde deja de sostenerlo, y qué hacer con eso. Entre 1,000 y
    1,400 palabras, que es el rango donde una consulta informacional compite.

  · **FAQ por artículo.** No es relleno: son las preguntas que la gente
    escribe en el buscador, respondidas en dos o tres líneas directas. Es lo
    que se lleva el fragmento destacado y lo que un motor con IA puede citar
    textual. Se publican además como schema FAQPage.

  · **Metadatos propios.** Cada artículo trae su `keyword` principal y su
    `descripcion`, en lugar de reutilizar el dek para todo.

  ─── Reglas de redacción ──────────────────────────────────────────────────
  · Nada copiado. Ni del sitio vivo ni de terceros.
  · Cifra sin fuente localizable, fuera. La del "80% de tasa metabólica" que
    circulaba se eliminó por eso.
  · Donde la evidencia es débil, se dice. Donde hay contraindicación, se dice
    (el frío después de pesas es el caso claro).
  · Cada artículo abre distinto. Nada de ocho aperturas con la misma forma.
  · Sin emojis.
*/

export type Seccion = { h: string; p: string[] };

export type Coleccion = {
  slug: string;
  nombre: string;
  /** Se muestra en la tarjeta de la colección en /blog. */
  dek: string;
  /** Portada de la colección. */
  img: string;
};

/*
  Colecciones. Hoy sólo una. Para abrir otra —"Cuidado del equipo",
  "Protocolos", "Historias"— se agrega aquí y se publica su primer artículo:
  /blog la pinta sola.
*/
export const COLECCIONES: Coleccion[] = [
  {
    slug: "ocho-razones",
    nombre: "Ocho razones para meterte al frío",
    dek: "Qué le hace la inmersión a tu cuerpo, razón por razón: el mecanismo, lo que la investigación sostiene y dónde deja de sostenerlo.",
    img: "/photography/modelaje/modelo-01.jpg",
  },
];

export type BlogPost = {
  slug: string;
  /** slug de la colección a la que pertenece */
  coleccion: string;
  num: string;
  titulo: string;
  dek: string;
  img: string;
  lectura: string;
  /** ISO. Alimenta el schema Article y la fecha visible. */
  publicado: string;
  actualizado?: string;
  /** Consulta principal que este artículo intenta responder. */
  keyword: string;
  /** Meta description propia, distinta del dek. */
  descripcion: string;
  secciones: Seccion[];
  protocolo?: { t: string; d: string }[];
  /** Preguntas reales, respuestas directas. Se publican como FAQPage. */
  faq: { q: string; a: string }[];
  fuentes: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "acelera-la-recuperacion",
    coleccion: "ocho-razones",
    num: "01",
    titulo: "Acelera la recuperación",
    dek: "Por qué el frío baja la hinchazón, cuánto dura el efecto y el único caso en que conviene esperar.",
    img: "/photography/modelaje/modelo-01.jpg",
    lectura: "6 min",
    publicado: "2026-09-08",
    keyword: "baño de hielo para recuperación muscular",
    descripcion:
      "Qué hace el agua fría en un músculo trabajado, qué muestran las revisiones sobre el dolor muscular tardío, y por qué después de una sesión de pesas conviene esperar.",
    secciones: [
      {
        h: "Lo que pasa en los primeros segundos",
        p: [
          "Cuando entras al agua fría, los vasos sanguíneos cercanos a la piel se cierran. Es una respuesta automática: el cuerpo protege la temperatura de los órganos internos y para eso reduce el flujo hacia la periferia. El músculo que acabas de trabajar recibe menos sangre, y con menos sangre llega también menos líquido al tejido.",
          "Al salir, el proceso se revierte. Los vasos se abren, la sangre vuelve a circular con fuerza y el tejido se drena. Ese ciclo de cierre y apertura es el mecanismo: no es que el frío 'repare' el músculo, es que mueve líquido y limita cuánta hinchazón se acumula en las horas siguientes.",
          "Por eso el efecto que más se nota no es durante la inmersión sino al día siguiente. Menos sensación de pesadez al bajar escaleras, menos rigidez al despertar, y la posibilidad de volver a entrenar sin arrastrar la sesión anterior.",
        ],
      },
      {
        h: "Qué dice la investigación, y qué no",
        p: [
          "Las revisiones sistemáticas coinciden en un punto: la inmersión en agua fría reduce el dolor muscular de aparición tardía, ese que aparece entre 24 y 72 horas después de un esfuerzo al que no estabas acostumbrado. El efecto sobre la percepción de dolor está bien documentado y se repite en distintos protocolos.",
          "Conviene entender qué se está midiendo. La evidencia es sólida en cómo te sientes y en algunos marcadores de daño muscular. Es bastante más débil en si eso se traduce automáticamente en más rendimiento en la siguiente sesión. Sentirte recuperado y estar recuperado son cosas relacionadas, no idénticas.",
          "Tampoco hay consenso sobre la dosis exacta. Los estudios usan temperaturas y tiempos distintos, y la mayoría trabaja con protocolos de entre 10 y 15 minutos en agua de 11 a 15 grados. Los tres minutos a 3 grados que se practican hoy son una adaptación popular, no el protocolo que se validó en laboratorio.",
        ],
      },
      {
        h: "El caso en que el frío juega en tu contra",
        p: [
          "Si el objetivo de la sesión fue ganar masa muscular, meterte al agua fría inmediatamente después puede restarte. Hay investigación que muestra que la inmersión justo tras el entrenamiento de fuerza atenúa parte de las adaptaciones a largo plazo.",
          "La razón tiene sentido cuando se entiende el mecanismo. La inflamación posterior al esfuerzo no es solamente un daño a reparar: es también la señal que le dice al músculo que tiene que crecer. Si apagas la señal a los diez minutos, apagas parte del mensaje.",
          "Esto no invalida el frío, cambia cuándo lo usas. Después de una competencia, de un bloque de resistencia, de dos entrenamientos en el mismo día, o en un día distinto al de pesas, el frío hace exactamente lo que quieres. Inmediatamente después de una sesión pesada de hipertrofia, espera.",
        ],
      },
      {
        h: "Cómo se ve en una semana normal",
        p: [
          "Un atleta que entrena fuerza tres veces por semana y hace algo de resistencia los otros días tiene un calendario simple: frío los días de resistencia y los de descanso, y en los días de pesas lo deja para varias horas después o lo salta.",
          "Alguien que entrena para una carrera está en otra situación. Ahí el volumen es alto, la adaptación que busca no es hipertrofia, y el frío después de las sesiones largas es de las herramientas que mejor rinden.",
          "Y si no entrenas para nada en particular, el criterio es todavía más sencillo: mételo donde te acomode y sostenlo. La regularidad pesa más que el momento exacto.",
        ],
      },
    ],
    protocolo: [
      { t: "Cuándo", d: "Dentro de la primera hora después de entrenar, salvo si vienes de una sesión de fuerza." },
      { t: "Temperatura", d: "Entre 3 y 10 grados. Más frío no es mejor: es sólo más difícil de sostener." },
      { t: "Duración", d: "De 2 a 5 minutos. Pasado ese punto no hay evidencia de más beneficio." },
      { t: "Después", d: "Deja que el cuerpo recupere temperatura solo. Bañarte con agua caliente enseguida corta el efecto." },
    ],
    faq: [
      {
        q: "¿Cuánto tiempo debo estar en el agua fría para recuperarme?",
        a: "Entre 2 y 5 minutos es suficiente para el efecto sobre la hinchazón. Los protocolos de laboratorio usan tiempos más largos porque trabajan con agua menos fría, entre 11 y 15 grados. A 3 grados, más tiempo no aporta más recuperación y sí aumenta el riesgo.",
      },
      {
        q: "¿Es malo meterse al frío después de hacer pesas?",
        a: "Si tu objetivo es ganar masa muscular, sí conviene evitarlo justo después. La inflamación posterior al esfuerzo es parte de la señal que dispara el crecimiento, y el frío inmediato la atenúa. Deja pasar varias horas o resérvalo para días sin fuerza.",
      },
      {
        q: "¿Frío o calor para el dolor muscular?",
        a: "Frío para la hinchazón de las primeras horas después del esfuerzo. Calor para la rigidez que llevas días arrastrando y para preparar el tejido antes de moverte. Son dos problemas distintos y responden a estímulos distintos.",
      },
    ],
    fuentes: [
      "Leeder J, et al. Cold water immersion and recovery from strenuous exercise: a meta-analysis. British Journal of Sports Medicine, 2012.",
      "Roberts LA, et al. Post-exercise cold water immersion attenuates acute anabolic signalling and long-term adaptations in muscle to strength training. The Journal of Physiology, 2015.",
      "Tipton MJ, et al. Cold water immersion: kill or cure? Experimental Physiology, 2017.",
    ],
  },
  {
    slug: "mejora-el-animo",
    coleccion: "ocho-razones",
    num: "02",
    titulo: "Mejora el ánimo",
    dek: "La dopamina que libera el frío, cuánto dura y por qué no se parece a ningún estimulante.",
    img: "/photography/action/running-03.jpg",
    lectura: "6 min",
    publicado: "2026-09-08",
    keyword: "agua fría dopamina estado de ánimo",
    descripcion:
      "Qué neurotransmisores libera la inmersión en frío, cuánto se sostiene el efecto según lo medido en laboratorio, y en qué se diferencia de un estimulante.",
    secciones: [
      {
        h: "Lo que se midió",
        p: [
          "En 2000, un grupo de investigadores checos metió a voluntarios en agua a 14 grados durante una hora y midió qué pasaba en su sangre. Los resultados de ese trabajo son la referencia que todavía se cita: la dopamina subió de forma marcada y la noradrenalina lo hizo bastante más.",
          "Hay que leer ese dato con cuidado. Fue una hora a 14 grados, no tres minutos a 3. La magnitud exacta no se traslada a lo que tú haces en tu patio por la mañana. Lo que sí se traslada es la dirección: el frío mueve la química del ánimo, y la mueve hacia arriba.",
        ],
      },
      {
        h: "Por qué no se comporta como un estimulante",
        p: [
          "Un estimulante te levanta rápido y te deja caer. La cafeína, por ejemplo, no te da energía: bloquea la señal que te avisa que estás cansado. El cansancio sigue acumulándose y lo sientes todo junto cuando el efecto pasa.",
          "El frío hace otra cosa. Sube tus propios niveles y esos niveles bajan de forma gradual, en el transcurso de horas, sin un punto de caída. En la práctica eso significa que no hay una hora del día que pagues por haberte metido en la mañana.",
          "La contrapartida es que tampoco es instantáneo ni cómodo. Un café son treinta segundos y un placer. Tres minutos en agua a 3 grados no son ni una cosa ni la otra.",
        ],
      },
      {
        h: "El componente que no es químico",
        p: [
          "Buena parte de lo que la gente reporta como mejora de ánimo no viene sólo de los neurotransmisores. Viene de haber hecho, a las seis de la mañana, algo voluntariamente incómodo y haberlo terminado.",
          "Esa sensación tiene nombre en la literatura de psicología del comportamiento y no es menor: haber cumplido algo difícil temprano cambia cómo te ves el resto del día. La inmersión funciona bien para eso porque es corta, es medible y no admite hacerla a medias.",
        ],
      },
      {
        h: "Dónde la evidencia todavía no alcanza",
        p: [
          "Hay estudios preliminares que exploran la inmersión en frío como apoyo en cuadros de ánimo bajo, y algunos resultados son prometedores. Son estudios pequeños, con pocos participantes y sin seguimiento largo.",
          "Decirlo claro: esto no es un tratamiento para la depresión ni sustituye atención profesional. Si estás pasando por algo así, el frío puede ser una pieza más de tu rutina, nunca la única, y conviene hablarlo con quien te esté tratando.",
        ],
      },
    ],
    protocolo: [
      { t: "Cuándo", d: "En la mañana. El efecto sobre el estado de alerta trabaja a tu favor durante el día." },
      { t: "Duración", d: "De 2 a 3 minutos bastan. Para ánimo no hace falta aguantar más." },
      { t: "Regularidad", d: "Cuatro o cinco veces por semana rinde más que una sesión larga el domingo." },
      { t: "Qué esperar", d: "Los primeros días la sensación dominante es alivio de haber salido. Eso cambia hacia la segunda semana." },
    ],
    faq: [
      {
        q: "¿Cuánto dura el efecto del agua fría en el ánimo?",
        a: "Varias horas. A diferencia de un estimulante, los niveles bajan de forma gradual, sin una caída marcada. La mayoría reporta que la diferencia se nota durante la mañana y buena parte de la tarde.",
      },
      {
        q: "¿El agua fría sirve para la ansiedad?",
        a: "Hay evidencia preliminar de que la exposición al frío activa el sistema nervioso parasimpático y reduce la respuesta al estrés. Son estudios pequeños. Puede ser una herramienta útil dentro de una rutina, pero no reemplaza tratamiento profesional.",
      },
      {
        q: "¿Es mejor en la mañana o en la noche?",
        a: "En la mañana, si buscas ánimo y estado de alerta. En la noche el efecto activador puede interferir con conciliar el sueño, aunque hay quien lo tolera bien. Si lo haces de noche, deja al menos dos horas antes de acostarte.",
      },
    ],
    fuentes: [
      "Šrámek P, et al. Human physiological responses to immersion into water of different temperatures. European Journal of Applied Physiology, 2000.",
      "Shevchuk NA. Adapted cold shower as a potential treatment for depression. Medical Hypotheses, 2008.",
      "Kelly JS, Bird E. Improved mood following a single immersion in cold water. Lifestyle Medicine, 2022.",
    ],
  },
  {
    slug: "energia-natural",
    coleccion: "ocho-razones",
    num: "03",
    titulo: "Energía natural",
    dek: "Adrenalina y noradrenalina en segundos, sin cafeína y sin la caída de la tarde.",
    img: "/photography/action/running-01.jpg",
    lectura: "5 min",
    publicado: "2026-09-08",
    keyword: "agua fría energía sin cafeína",
    descripcion:
      "La respuesta de choque al frío, por qué produce alerta sin el bajón de un estimulante, y cómo pasar los primeros treinta segundos.",
    secciones: [
      {
        h: "La respuesta de choque",
        p: [
          "El primer contacto con agua muy fría dispara una reacción que los fisiólogos llaman respuesta de choque al frío. La respiración se acelera de golpe, la frecuencia cardiaca sube y el cuerpo libera catecolaminas: adrenalina y noradrenalina, sobre todo.",
          "Es una reacción de emergencia. Evolutivamente sirve para mantenerte despierto y capaz de reaccionar en una situación que el cuerpo lee como peligrosa. Provocarla a propósito, en condiciones controladas y por poco tiempo, es lo que deja funcionando distinto el resto de la mañana.",
          "Vale la pena saber que esa misma respuesta es la que hace peligrosa la caída accidental a agua helada: el jadeo involuntario con la cabeza bajo el agua es lo que mata, no la hipotermia. Por eso se entra despacio, sentado, con la cabeza siempre fuera, y nunca de un salto.",
        ],
      },
      {
        h: "La diferencia con un estimulante",
        p: [
          "La cafeína ocupa los receptores donde se acopla la molécula que te avisa que llevas horas despierto. La señal sigue llegando, sólo que no la registras. Cuando el efecto pasa, la registras acumulada.",
          "El frío no tapa nada. Sube tu nivel de alerta desde tu propia química, y ese nivel desciende poco a poco durante las horas siguientes. No hay una deuda que se cobre a las cuatro de la tarde.",
          "Eso no lo vuelve mejor en todo. Un café se toma en treinta segundos y es agradable. Meterse al agua a 3 grados no lo es, y esa es exactamente la parte que hace que funcione.",
        ],
      },
      {
        h: "Los primeros treinta segundos",
        p: [
          "Ahí es donde se sale la mayoría. El cuerpo pide aire, el pecho se cierra y todo el sistema grita que esto es un error. Si respiras rápido y superficial, la sensación se amplifica sola.",
          "Lo que funciona es al revés: exhalaciones largas, más largas que las inhalaciones, sin forzar. En treinta o cuarenta segundos la respiración se normaliza, el cuerpo acepta la temperatura y la experiencia cambia por completo. Lo que era pánico se vuelve una calma bastante particular.",
          "Ese momento —quedarte cuando todo te pide salir— es el que después se transfiere a otras cosas. Es también de donde viene el nombre de la marca.",
        ],
      },
      {
        h: "Cuánto dura y para qué sirve",
        p: [
          "El estado de alerta se sostiene buena parte de la mañana. No es euforia: es la sensación de estar despierto de verdad, con menos ruido mental, que suele describirse como claridad.",
          "Sirve especialmente bien para quien arranca el día con trabajo que exige concentración. Sirve menos si lo que necesitas es calmarte antes de dormir, porque para eso el estímulo va en dirección contraria.",
        ],
      },
    ],
    protocolo: [
      { t: "Cuándo", d: "Al despertar, antes del café. Pruébalo una semana y compara con tu mañana normal." },
      { t: "Duración", d: "De 1 a 3 minutos. Para energía no necesitas más." },
      { t: "Respiración", d: "Exhala largo desde el primer segundo. No hiperventiles antes de entrar." },
      { t: "Error común", d: "Entrar de golpe. Se entra sentado, despacio, con la cabeza siempre fuera del agua." },
    ],
    faq: [
      {
        q: "¿El agua fría reemplaza al café?",
        a: "Para el estado de alerta de la mañana, mucha gente reporta que sí. La diferencia es que el frío no bloquea la señal de cansancio, la sube desde tu propia química, así que no hay un bajón horas después. No aporta lo mismo que la cafeína en tareas de resistencia prolongada.",
      },
      {
        q: "¿Por qué cuesta tanto respirar al entrar al agua fría?",
        a: "Es la respuesta de choque al frío: un reflejo automático que acelera la respiración y la frecuencia cardiaca. Dura entre 30 y 60 segundos y se controla con exhalaciones largas. Nunca entres de un salto ni sumerjas la cabeza mientras ocurre.",
      },
      {
        q: "¿Cuántas veces por semana conviene meterse?",
        a: "Cuatro o cinco sesiones cortas rinden más que una larga. El efecto sobre la energía es por sesión, no acumulativo, así que la regularidad importa más que la duración de cada una.",
      },
    ],
    fuentes: [
      "Šrámek P, et al. Human physiological responses to immersion into water of different temperatures. European Journal of Applied Physiology, 2000.",
      "Tipton MJ. The initial responses to cold-water immersion in man. Clinical Science, 1989.",
      "Tipton MJ, et al. Cold water immersion: kill or cure? Experimental Physiology, 2017.",
    ],
  },
  {
    slug: "reduce-la-inflamacion",
    coleccion: "ocho-razones",
    num: "04",
    titulo: "Reduce la inflamación",
    dek: "Qué inflamación baja el frío, cuál no, y por qué la diferencia importa más de lo que parece.",
    img: "/photography/action/hyrox-01.jpg",
    lectura: "6 min",
    publicado: "2026-09-08",
    keyword: "inmersión en frío inflamación",
    descripcion:
      "La diferencia entre inflamación aguda y crónica, qué hace el frío con cada una, y por qué apagar la aguda no siempre conviene.",
    secciones: [
      {
        h: "Dos cosas distintas con el mismo nombre",
        p: [
          "En español usamos una sola palabra para dos procesos que no se parecen. La inflamación aguda es la respuesta del cuerpo a un golpe, un esfuerzo o una infección: llega sangre, llegan células de reparación, la zona se hincha y duele. Cumple una función y se apaga sola.",
          "La inflamación crónica de bajo grado es otra cosa: un estado sostenido, sin un evento que lo dispare, asociado al sedentarismo, al sueño malo y al estrés continuo. No duele de forma localizada y no se apaga sola.",
          "El frío actúa distinto sobre cada una, y confundirlas es de donde salen la mayoría de los consejos malos sobre este tema.",
        ],
      },
      {
        h: "Sobre la aguda: efecto claro, y una advertencia",
        p: [
          "Aquí el mecanismo es directo. La vasoconstricción reduce el flujo hacia la zona trabajada y con ello la acumulación de líquido en el tejido. Menos hinchazón, menos presión sobre las terminaciones nerviosas, menos dolor percibido en las 48 horas siguientes.",
          "La advertencia ya apareció en el primer artículo de esta colección y vale repetirla: la inflamación aguda después de entrenar fuerza es parte de la señal de adaptación. Apagarla de inmediato, todos los días, le quita al músculo parte del mensaje que necesita para crecer.",
          "Dicho de otro modo: si te duele porque acabas de entrenar y quieres crecer, deja que duela un rato. Si te duele porque compites mañana, mete frío.",
        ],
      },
      {
        h: "Sobre la crónica: qué se sabe y qué se especula",
        p: [
          "La hipótesis es razonable. La exposición repetida al frío es un estresor breve y controlado, y ese tipo de estímulo tiende a mejorar la capacidad del cuerpo de regularse. Hay trabajos que reportan cambios en marcadores inflamatorios tras programas de exposición al frío.",
          "Lo que todavía no hay es evidencia sólida de que eso se traduzca en desenlaces clínicos relevantes a largo plazo. Los estudios son cortos, con grupos pequeños, y en varios el frío viene acompañado de respiración controlada, ejercicio o cambios de hábitos que hacen imposible aislar qué produjo qué.",
          "La lectura honesta es que el frío probablemente ayuda como parte de un conjunto —dormir bien, moverte, comer decente— y no como una intervención que por sí sola cambie un marcador de salud.",
        ],
      },
      {
        h: "Rigidez articular, que es un tercer caso",
        p: [
          "Mucha gente llega al frío por articulaciones que amanecen duras. Ahí el efecto reportado es real y bastante inmediato, pero el mecanismo tiene tanto de circulatorio como de analgésico: el frío reduce la velocidad de conducción nerviosa y con eso baja la señal de dolor.",
          "Es alivio, no reparación. Si hay una articulación que lleva meses molestando, el frío te va a hacer sentir mejor y eso está bien, pero conviene que alguien vea de dónde viene el problema.",
        ],
      },
    ],
    protocolo: [
      { t: "Para inflamación aguda", d: "Dentro de la primera hora después del esfuerzo, salvo si vienes de fuerza." },
      { t: "Para rigidez matutina", d: "Al despertar, de 2 a 4 minutos, y muévete después." },
      { t: "Temperatura", d: "De 3 a 10 grados. El extremo bajo no aporta más y sí exige más." },
      { t: "Lo que anula el efecto", d: "Meterte a la regadera caliente enseguida. Deja que el cuerpo se recupere solo." },
    ],
    faq: [
      {
        q: "¿El agua fría desinflama de verdad?",
        a: "Reduce la hinchazón aguda después de un esfuerzo, y eso está bien documentado. Sobre la inflamación crónica de bajo grado la evidencia es preliminar: hay señales prometedoras pero estudios cortos y pequeños.",
      },
      {
        q: "¿Cuánto tarda en bajar la inflamación con hielo?",
        a: "El efecto sobre la hinchazón empieza durante la propia inmersión y se sostiene en las horas siguientes. La diferencia grande se nota al día siguiente, en cuánto dolor muscular tardío aparece.",
      },
      {
        q: "¿Puedo meterme al frío si tengo una lesión?",
        a: "Depende de la lesión y de en qué etapa está. En un golpe reciente suele ayudar; en un problema articular que lleva meses el frío alivia el síntoma pero no atiende la causa. Consúltalo antes con quien te esté tratando.",
      },
    ],
    fuentes: [
      "Leeder J, et al. Cold water immersion and recovery from strenuous exercise: a meta-analysis. British Journal of Sports Medicine, 2012.",
      "Roberts LA, et al. Post-exercise cold water immersion attenuates acute anabolic signalling and long-term adaptations in muscle to strength training. The Journal of Physiology, 2015.",
      "Buijze GA, et al. The effect of cold showering on health and work: a randomized controlled trial. PLOS ONE, 2016.",
    ],
  },
  {
    slug: "mayor-resiliencia",
    coleccion: "ocho-razones",
    num: "05",
    titulo: "Mayor resiliencia",
    dek: "Entrenar la respuesta al estrés en tres minutos al día, y por qué se transfiere fuera del agua.",
    img: "/photography/action/hyrox-02.webp",
    lectura: "6 min",
    publicado: "2026-09-08",
    keyword: "inmersión en frío resiliencia estrés",
    descripcion:
      "Qué es la hormesis, cómo un estresor breve y controlado entrena la respuesta al estrés, y qué evidencia hay de que eso se transfiera a otras situaciones.",
    secciones: [
      {
        h: "Un estresor que puedes dosificar",
        p: [
          "Casi todo lo que te estresa en un día normal tiene dos problemas: no lo elegiste y no sabes cuándo termina. El tráfico, una conversación difícil, un plazo que se movió. El cuerpo responde con la misma maquinaria de siempre, sólo que sin un punto final claro.",
          "El agua fría tiene las dos propiedades contrarias. La eliges y sabes exactamente cuánto dura. Eso la convierte en algo poco común: un estresor real, medible, con principio y fin, que puedes repetir todos los días a la misma hora.",
          "En biología a esto se le llama hormesis: la idea de que una dosis pequeña de algo que en dosis grande sería dañino produce una adaptación beneficiosa. El ejercicio funciona igual. El ayuno también, dentro de ciertos límites.",
        ],
      },
      {
        h: "Qué se entrena exactamente",
        p: [
          "Al entrar al agua, el sistema nervioso simpático se dispara: es la respuesta de lucha o huida en su forma más pura. Lo que practicas en esos tres minutos no es aguantar el frío, es mantener la respiración bajo control mientras el cuerpo está en alarma.",
          "Con la repetición pasan dos cosas. La primera es fisiológica: la respuesta de choque se atenúa, entras y el cuerpo ya no reacciona con la misma violencia. La segunda es de aprendizaje: registras que puedes estar en alarma y seguir funcionando, y ese registro no distingue de dónde vino la alarma.",
          "El segundo punto es el que la gente reporta como transferencia. No es que el frío te haga inmune al estrés. Es que practicaste, con una señal fuerte y sin consecuencias, la habilidad de no desbordarte.",
        ],
      },
      {
        h: "Dónde está la evidencia y dónde la anécdota",
        p: [
          "La atenuación de la respuesta de choque con la exposición repetida está bien documentada. Es un fenómeno medible: menos jadeo, menos aceleración cardiaca, adaptación en pocas sesiones.",
          "El estudio del método de respiración de Wim Hof publicado en PNAS mostró que un grupo entrenado podía modular voluntariamente su respuesta inmune e inflamatoria ante un estímulo controlado. Es un resultado fuerte, con una advertencia importante: el protocolo combinaba respiración, meditación y exposición al frío, así que no se puede atribuir al frío por separado.",
          "La transferencia al estrés cotidiano —el jefe, el tráfico, la discusión— es lo que casi todo el mundo reporta y lo que casi nadie ha medido bien. Es plausible y es consistente con lo que sabemos de exposición gradual, pero por ahora es una hipótesis razonable, no un hallazgo.",
        ],
      },
      {
        h: "Lo que no significa",
        p: [
          "Aguantar más frío no te vuelve mejor persona ni más disciplinado en abstracto. La disciplina no es una sustancia que se acumula y se gasta en otro lado.",
          "Lo que sí ocurre es concreto y más modesto: si todos los días haces algo incómodo que decidiste hacer, tienes evidencia diaria de que cumples lo que te propones. Esa evidencia cambia cómo te tratas a ti mismo. Es suficiente razón, y no hace falta inflarla.",
        ],
      },
    ],
    protocolo: [
      { t: "Empieza corto", d: "60 segundos la primera semana. Sostener poco todos los días vale más que resistir mucho una vez." },
      { t: "La respiración es el ejercicio", d: "Exhalaciones largas. Si pierdes el control de la respiración, sal." },
      { t: "Sube por tiempo, no por frío", d: "Primero llega a 3 minutos cómodo. Después, si quieres, baja la temperatura." },
      { t: "No compitas", d: "Aguantar diez minutos temblando no entrena nada. Aumenta el riesgo y ya." },
    ],
    faq: [
      {
        q: "¿El frío ayuda a manejar mejor el estrés?",
        a: "La exposición repetida atenúa de forma medible la respuesta de alarma del cuerpo, y eso está documentado. La transferencia a situaciones de estrés cotidiano es lo que la mayoría reporta, aunque hay poca investigación que lo haya medido directamente.",
      },
      {
        q: "¿Cuánto tiempo tarda el cuerpo en acostumbrarse al agua fría?",
        a: "La respuesta de choque empieza a atenuarse en pocas sesiones. La mayoría nota una diferencia clara entre la primera semana y la tercera: la entrada sigue siendo incómoda, pero el jadeo inicial baja mucho.",
      },
      {
        q: "¿Es mejor aguantar más tiempo o bajar más la temperatura?",
        a: "Primero tiempo, después temperatura. Llegar a tres minutos cómodo a 8 grados enseña más que 40 segundos de sufrimiento a 2. Y pasados los cinco minutos no hay beneficio adicional documentado.",
      },
    ],
    fuentes: [
      "Kox M, et al. Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response in humans. PNAS, 2014.",
      "Tipton MJ, et al. Habituation of the initial responses to cold water immersion in humans. Journal of Physiology, 1998.",
      "Tipton MJ, et al. Cold water immersion: kill or cure? Experimental Physiology, 2017.",
    ],
  },
  {
    slug: "mejor-descanso",
    coleccion: "ocho-razones",
    num: "06",
    titulo: "Mejor descanso",
    dek: "Cómo la caída de temperatura corporal facilita el sueño profundo, y por qué el horario lo cambia todo.",
    img: "/photography/modelaje/modelo-04.jpg",
    lectura: "6 min",
    publicado: "2026-09-08",
    keyword: "baño frío para dormir mejor",
    descripcion:
      "La relación entre temperatura corporal y sueño profundo, por qué la hora de la inmersión importa tanto, y qué esperar de forma realista.",
    secciones: [
      {
        h: "Dormir es, en parte, enfriarse",
        p: [
          "Para entrar en sueño profundo, tu temperatura corporal central tiene que bajar. Es una condición, no un efecto secundario: el descenso térmico forma parte de la señal que le dice al cerebro que puede pasar a las fases reparadoras.",
          "Por eso duermes mal en un cuarto caliente, y por eso hay tanta gente que saca un pie de las cobijas sin saber muy bien por qué. El cuerpo está buscando disipar calor.",
          "La inmersión en frío entra en esta historia por una vía que parece contradictoria: el frío provoca vasoconstricción, y al salir viene una vasodilatación de rebote que ayuda al cuerpo a soltar calor. Ese descenso posterior es el que puede facilitar la transición al sueño.",
        ],
      },
      {
        h: "El horario cambia el resultado",
        p: [
          "Aquí está la parte que casi nadie explica bien. Meterte al frío tres horas antes de dormir puede ayudarte: el rebote térmico ya pasó y el cuerpo está en la pendiente descendente que necesitas.",
          "Meterte veinte minutos antes de acostarte suele hacer lo contrario. La descarga de catecolaminas todavía está activa, el estado de alerta está arriba, y lo que consigues es quedarte viendo el techo.",
          "La opción más simple, y la que más gente sostiene, es hacerlo en la mañana. El efecto sobre el sueño de esa noche es más indirecto —pasa por el ritmo circadiano y por haber empezado el día con luz y actividad— pero no arriesga nada.",
        ],
      },
      {
        h: "Qué esperar de forma realista",
        p: [
          "Lo que reporta la mayoría no es dormirse más rápido, sino despertarse menos veces y sentir el sueño más profundo. Es una diferencia en calidad, no tanto en cantidad.",
          "La evidencia específica sobre inmersión en frío y arquitectura del sueño es más escasa de lo que la conversación popular sugiere. Se apoya bastante en lo que sí está bien establecido sobre termorregulación y sueño, que es mucho, y en reportes de usuarios, que es harina de otro costal.",
          "Si tu problema de sueño viene de ansiedad, de pantallas hasta la una, de café a las seis de la tarde o de un cuarto a 26 grados, el frío no va a resolverlo. Puede sumar cuando el resto está en orden.",
        ],
      },
      {
        h: "El caso del cortisol",
        p: [
          "Se repite mucho que el frío baja el cortisol y que por eso duermes mejor. Es una simplificación. El frío es un estresor: en el momento el cortisol sube, no baja.",
          "Lo que se ha observado es un efecto sobre el patrón a lo largo del día en personas con exposición regular, que es una afirmación mucho más modesta y también mucho más plausible. Vale la pena decirlo así en lugar de repetir el atajo.",
        ],
      },
    ],
    protocolo: [
      { t: "Mejor horario", d: "En la mañana, o al menos tres horas antes de acostarte." },
      { t: "Lo que no funciona", d: "Meterte justo antes de dormir. El estado de alerta te va a mantener despierto." },
      { t: "Duración", d: "De 2 a 4 minutos. Aquí tampoco hay premio por aguantar más." },
      { t: "Después", d: "Sécate, ponte ropa cómoda y evita pantallas brillantes la hora siguiente." },
    ],
    faq: [
      {
        q: "¿A qué hora debo meterme al agua fría para dormir mejor?",
        a: "En la mañana, o mínimo tres horas antes de acostarte. Justo antes de dormir suele ser contraproducente: la descarga de catecolaminas mantiene el estado de alerta y retrasa el sueño.",
      },
      {
        q: "¿El agua fría baja el cortisol?",
        a: "En el momento lo sube, porque es un estresor. Lo que se ha observado en personas con exposición regular es un efecto sobre el patrón de cortisol a lo largo del día, que es una afirmación más acotada.",
      },
      {
        q: "¿Sirve para el insomnio?",
        a: "No es un tratamiento para el insomnio. Puede sumar cuando el resto de la higiene del sueño está en orden. Si el problema viene de ansiedad o de un trastorno del sueño, hay que atenderlo por su lado.",
      },
    ],
    fuentes: [
      "Van Someren EJW. Mechanisms and functions of coupling between sleep and temperature rhythms. Progress in Brain Research, 2006.",
      "Buijze GA, et al. The effect of cold showering on health and work: a randomized controlled trial. PLOS ONE, 2016.",
      "Šrámek P, et al. Human physiological responses to immersion into water of different temperatures. European Journal of Applied Physiology, 2000.",
    ],
  },
  {
    slug: "acelera-el-metabolismo",
    coleccion: "ocho-razones",
    num: "07",
    titulo: "Acelera el metabolismo",
    dek: "Grasa parda, termogénesis y por qué la cifra que circula por internet no se sostiene.",
    img: "/images/barrel-retrato-moody.jpg",
    lectura: "6 min",
    publicado: "2026-09-08",
    keyword: "frío grasa parda metabolismo",
    descripcion:
      "Qué es la grasa parda, cómo la activa el frío, qué gasto energético se ha medido de verdad, y por qué la inmersión no es una estrategia para bajar de peso.",
    secciones: [
      {
        h: "Un tejido que quema para calentar",
        p: [
          "La mayor parte de la grasa del cuerpo almacena energía. La grasa parda hace lo contrario: la gasta. Sus células están llenas de mitocondrias, y esas mitocondrias tienen una particularidad, que es producir calor en lugar de producir la molécula que el cuerpo usa como moneda de energía.",
          "Durante años se pensó que los adultos no tenían. Alrededor de 2009, varios equipos demostraron con imagen que sí, que está sobre todo en el cuello y la parte alta de la espalda, y que se activa con el frío.",
          "Ese hallazgo es el que abrió toda esta conversación. El frío activa la grasa parda, la grasa parda quema energía para producir calor, y esa termogénesis se llama sin escalofrío porque ocurre sin que estés temblando.",
        ],
      },
      {
        h: "La cifra que hay que dejar de repetir",
        p: [
          "Circula por todas partes que la inmersión en frío eleva la tasa metabólica un 80 por ciento, o 350 por ciento, según quién lo cuente. Cuando uno busca de dónde salen esos números, no hay un estudio que los sostenga con esas condiciones.",
          "Lo que sí se ha medido, en cámaras metabólicas y con protocolos controlados, es un aumento del gasto energético en reposo durante la exposición al frío, y ese aumento es real pero mucho más modesto. Depende de cuánta grasa parda tenga la persona, y ahí la variación entre individuos es enorme.",
          "Preferimos decirlo así, aunque suene menos espectacular. Publicar una cifra que no podemos rastrear hasta su fuente es exactamente lo que no queremos hacer en este sitio.",
        ],
      },
      {
        h: "Por qué no es una estrategia para bajar de peso",
        p: [
          "El gasto adicional de tres minutos de inmersión es pequeño en términos calóricos. Si lo comparas con lo que gastas caminando media hora, no hay comparación posible.",
          "Además hay un efecto que rara vez se menciona: el frío abre el apetito. Es lógico, el cuerpo acaba de gastar en producir calor y pide reponer. Mucha gente come más después, y ahí se va el balance.",
          "Donde sí parece haber algo interesante es en la sensibilidad a la insulina y en la regulación de la glucosa con exposición sostenida. Es un terreno activo de investigación y todavía preliminar, pero es una pregunta más útil que la de las calorías.",
        ],
      },
      {
        h: "El principio de la dosis mínima",
        p: [
          "De la investigación de Susanna Søberg en la Universidad de Copenhague salió una idea que se volvió popular: no hace falta mucha exposición para obtener adaptación metabólica. Del orden de once minutos semanales de frío, repartidos en varias sesiones.",
          "Eso encaja con lo que aparece en el resto de esta colección. Tres minutos, cuatro veces por semana, sostenidos, rinden más que una sesión heroica de veinte minutos el sábado.",
          "Y termina de aterrizar la expectativa: la inmersión en frío es una pieza de un sistema que incluye moverte, dormir y comer. No es el sistema.",
        ],
      },
    ],
    protocolo: [
      { t: "Dosis", d: "Alrededor de 11 minutos por semana, repartidos en 3 o 4 sesiones." },
      { t: "Temperatura", d: "Lo bastante fría para que sea incómoda. No hace falta llegar al extremo." },
      { t: "Después", d: "Si dejas que el cuerpo se recaliente solo, la termogénesis trabaja más tiempo." },
      { t: "Expectativa", d: "Trátalo como adaptación metabólica, no como gasto calórico. La báscula no es la medida aquí." },
    ],
    faq: [
      {
        q: "¿Cuántas calorías se queman en un baño de hielo?",
        a: "Pocas. El aumento del gasto energético durante la exposición al frío está medido y es real, pero mucho más modesto que las cifras que circulan en internet, y varía enormemente entre personas según cuánta grasa parda tengan.",
      },
      {
        q: "¿El agua fría sirve para bajar de peso?",
        a: "No como estrategia principal. El gasto extra es pequeño y el frío tiende a abrir el apetito. Lo interesante está en la adaptación metabólica y en la regulación de la glucosa, no en el conteo de calorías.",
      },
      {
        q: "¿Cuánto frío por semana hace falta para activar la grasa parda?",
        a: "De la investigación de Søberg salió la referencia de unos 11 minutos semanales repartidos en varias sesiones. La regularidad importa más que la duración de cada exposición.",
      },
    ],
    fuentes: [
      "van Marken Lichtenbelt WD, et al. Cold-activated brown adipose tissue in healthy men. New England Journal of Medicine, 2009.",
      "Søberg S, et al. Altered brown fat thermoregulation and enhanced cold-induced thermogenesis in young, healthy, winter-swimming men. Cell Reports Medicine, 2021.",
      "Hanssen MJW, et al. Short-term cold acclimation improves insulin sensitivity in patients with type 2 diabetes mellitus. Nature Medicine, 2015.",
    ],
  },
  {
    slug: "acelera-el-sistema-inmune",
    coleccion: "ocho-razones",
    num: "08",
    titulo: "Fortalece el sistema inmune",
    dek: "El estudio de las duchas frías con tres mil participantes, qué encontró exactamente y qué no.",
    img: "/photography/lifestyle/surf-01.jpg",
    lectura: "6 min",
    publicado: "2026-09-08",
    keyword: "agua fría sistema inmune enfermarse menos",
    descripcion:
      "Qué mostró el ensayo holandés de duchas frías, por qué el resultado es más matizado de lo que parece, y qué se sabe del efecto sobre la respuesta inmune.",
    secciones: [
      {
        h: "El estudio que todos citan",
        p: [
          "En 2016 se publicó un ensayo controlado en Países Bajos con más de tres mil participantes. Durante un mes, unos terminaban su ducha habitual con agua fría —30, 60 o 90 segundos— y otros seguían su rutina normal.",
          "El resultado que se repite en todas partes: el grupo del agua fría reportó un 29 por ciento menos de ausencias laborales por enfermedad.",
          "Es un buen estudio, con un tamaño de muestra grande y aleatorización. Y hay que leer con atención qué fue lo que midió.",
        ],
      },
      {
        h: "Lo que el estudio no dijo",
        p: [
          "No encontró que la gente se enfermara menos. La cantidad de días con síntomas fue similar entre grupos. Lo que cambió fue cuántos días faltaron al trabajo por esos síntomas.",
          "Es una diferencia importante y bastante interesante. Puede significar que los síntomas fueron más leves, o que quienes se duchaban con agua fría se sentían más capaces de ir a trabajar con un resfriado encima. El estudio no puede distinguir entre las dos cosas.",
          "También hay que notar que la duración del chorro frío no cambió el resultado: 30 segundos rindió igual que 90. Eso apunta a que el efecto no depende de la dosis de la manera que uno esperaría.",
        ],
      },
      {
        h: "Qué se sabe de la respuesta inmune misma",
        p: [
          "Por otro lado está el trabajo publicado en PNAS en 2014, donde un grupo entrenado en respiración, meditación y exposición al frío recibió una endotoxina y mostró una respuesta inflamatoria menor y menos síntomas que el grupo control.",
          "Ese resultado sí toca directamente el sistema inmune, y es fuerte. La advertencia de siempre: el entrenamiento combinaba tres cosas, y la que más peso parece tener es la respiración. Atribuírselo al frío solo sería estirar el dato.",
          "También se ha observado aumento de leucocitos y de ciertos marcadores tras la exposición al frío. Que un marcador suba no es lo mismo que enfermarse menos, y ese salto es el que se da con demasiada ligereza en la conversación popular.",
        ],
      },
      {
        h: "La conclusión honesta",
        p: [
          "Hay una señal, viene de un ensayo grande y bien hecho, y apunta a menos ausencias por enfermedad. El mecanismo no está cerrado y la magnitud del efecto sobre la inmunidad propiamente dicha sigue en discusión.",
          "Si buscas una razón para meterte al frío, esta no debería ser la primera de la lista. Las de recuperación, ánimo y energía tienen respaldo más directo. Esta suma, y es razonable esperarla, pero no es la que sostiene la práctica.",
        ],
      },
    ],
    protocolo: [
      { t: "La versión barata", d: "30 segundos de agua fría al final de tu ducha normal. Es lo que se probó y funcionó." },
      { t: "Regularidad", d: "Todos los días durante al menos un mes. Ese fue el diseño del estudio." },
      { t: "Duración", d: "Más tiempo no rindió más. 30 segundos igualaron a 90." },
      { t: "Cuándo no", d: "Si ya estás enfermo con fiebre, no es el momento. Espera a recuperarte." },
    ],
    faq: [
      {
        q: "¿Las duchas frías evitan que te enfermes?",
        a: "El ensayo holandés de 2016 no encontró menos días con síntomas, sino un 29 por ciento menos de ausencias laborales por enfermedad. Es decir, la gente se enfermó parecido pero faltó menos.",
      },
      {
        q: "¿Cuánto tiempo de agua fría hace falta?",
        a: "En ese estudio, 30 segundos rindieron igual que 90. La constancia diaria durante un mes pesó más que la duración de cada exposición.",
      },
      {
        q: "¿Puedo meterme al frío estando resfriado?",
        a: "Si tienes fiebre, no. Con un resfriado leve y sin fiebre, la mayoría lo tolera bien, pero no hay evidencia de que acelere la recuperación. Ante la duda, espera.",
      },
    ],
    fuentes: [
      "Buijze GA, et al. The effect of cold showering on health and work: a randomized controlled trial. PLOS ONE, 2016.",
      "Kox M, et al. Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response in humans. PNAS, 2014.",
      "Brenner IKM, et al. Immune changes in humans during cold exposure. Journal of Applied Physiology, 1999.",
    ],
  },
];

/* ── Utilidades ────────────────────────────────────────────────────────── */

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getColeccion(slug: string) {
  return COLECCIONES.find((c) => c.slug === slug);
}

/** Artículos de una colección, en orden de publicación. */
export function postsDeColeccion(slug: string) {
  return BLOG_POSTS.filter((p) => p.coleccion === slug);
}

/** Colecciones que ya tienen al menos un artículo publicado. */
export function coleccionesConArticulos() {
  return COLECCIONES.map((c) => ({ ...c, articulos: postsDeColeccion(c.slug) })).filter(
    (c) => c.articulos.length > 0,
  );
}
