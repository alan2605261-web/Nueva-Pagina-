/*
  Beneficios y consejo científico — fuente única.

  Los enlaces NO son inventados: son exactamente los que Saul curó a mano en
  mentefria.com/pages/la-ciencia-detras-de-las-tinas-heladas y en
  /pages/quien-recomienda-el-cold-plunging. Se extrajeron de ahí uno a uno y
  conservan el mismo emparejamiento beneficio → referencia.

  Dos advertencias honestas, para no repetir la promesa de más de lo que hay:

  1. "Mayor dopamina natural" es el ÚNICO beneficio que en el sitio vivo no
     tiene enlace. Dejarlo sin enlace hacía que su tarjeta se viera rota al
     lado de las otras dieciséis, así que apunta a NUESTRO artículo sobre el
     tema, que sí lleva sus fuentes a la vista (Šrámek 2000 y Shevchuk 2008).
     No se le inventa un estudio externo; se manda a donde la evidencia está
     citada de forma transparente.

  2. No las 16 referencias son estudios peer-reviewed: healthline y
     psychologytoday son divulgación. Por eso cada entrada declara su `tipo`,
     y el cierre de la página ya no afirma que todas lo sean.
*/

export type TipoFuente = "estudio" | "divulgacion" | "interno";

export type Beneficio = {
  categoria: string;
  titulo: string;
  desc: string;
  fuente?: { url: string; tipo: TipoFuente };
};

export const BENEFICIOS: Beneficio[] = [
  {
    categoria: "Mental",
    titulo: "Mejora del control mental",
    desc: "Sumergirse en frío entrena la disciplina mental, fortalece la resiliencia y enseña a mantener la calma bajo presión.",
    fuente: { url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5025014/", tipo: "estudio" },
  },
  {
    categoria: "Energía",
    titulo: "Incrementa tu metabolismo",
    desc: "La inmersión en agua fría aumenta la función mitocondrial y la producción de ATP, lo que se traduce en más energía y resistencia física.",
    fuente: { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11012857/", tipo: "estudio" },
  },
  {
    categoria: "Inmunidad",
    titulo: "Fortalece tu sistema inmune",
    desc: "La exposición al frío aumenta la producción de glóbulos blancos, esenciales para combatir infecciones y mejorar la resistencia del cuerpo.",
    fuente: { url: "https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2023.1197585/full", tipo: "estudio" },
  },
  {
    categoria: "Sueño",
    titulo: "Mejora la calidad del sueño",
    desc: "El frío reduce los niveles de cortisol y favorece la producción de melatonina, lo que facilita un sueño más profundo y reparador.",
    fuente: { url: "https://pubmed.ncbi.nlm.nih.gov/39098451/", tipo: "estudio" },
  },
  {
    categoria: "Recuperación",
    titulo: "Reducción de la inflamación",
    desc: "La inmersión en agua fría reduce la inflamación al disminuir el flujo sanguíneo en áreas específicas, lo que alivia dolores y mejora la movilidad.",
    fuente: { url: "https://pubmed.ncbi.nlm.nih.gov/39879231/", tipo: "estudio" },
  },
  {
    categoria: "Ánimo",
    titulo: "Mayor dopamina natural",
    desc: "El frío intenso eleva los niveles de dopamina muy por encima de lo normal, lo que mejora la motivación, la concentración y la sensación de satisfacción.",
    fuente: { url: "/blog/mejora-el-animo", tipo: "interno" },
  },
  {
    categoria: "Energía",
    titulo: "Aumenta energía y libera endorfinas",
    desc: "La inmersión en frío provoca la liberación de endorfinas, con una sensación inmediata de vitalidad y bienestar que dura horas.",
    fuente: { url: "https://pubmed.ncbi.nlm.nih.gov/18382932/", tipo: "estudio" },
  },
  {
    categoria: "Circulación",
    titulo: "Mejora la circulación",
    desc: "El contraste térmico contrae y dilata los vasos sanguíneos, estimula la circulación y favorece la oxigenación de músculos y órganos.",
    fuente: { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6743752/", tipo: "estudio" },
  },
  {
    categoria: "Composición corporal",
    titulo: "Activación de la grasa parda",
    desc: "El frío activa la grasa parda, un tejido que consume calorías para generar calor corporal, lo que favorece la pérdida de grasa y mejora el metabolismo.",
    fuente: { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8561167/", tipo: "estudio" },
  },
  {
    categoria: "Metabolismo",
    titulo: "Aumento de la termogénesis",
    desc: "La grasa parda se activa para producir calor, lo que incrementa el gasto energético y ayuda a mantener estable la temperatura corporal.",
    fuente: { url: "https://www.sciencedirect.com/science/article/pii/S2666379121002664", tipo: "estudio" },
  },
  {
    categoria: "Estrés",
    titulo: "Mejor manejo del estrés y la ansiedad",
    desc: "La inmersión en frío disminuye el cortisol y activa el sistema nervioso parasimpático, lo que reduce la ansiedad y genera calma sostenida.",
    fuente: { url: "https://www.healthline.com/health/anxiety/cold-shower-for-anxiety", tipo: "divulgacion" },
  },
  {
    categoria: "Cerebro",
    titulo: "Mejora la neuroplasticidad",
    desc: "El estímulo del frío favorece la creación de nuevas conexiones neuronales, lo que mejora el aprendizaje, la memoria y la adaptación mental.",
    fuente: { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9953392/", tipo: "estudio" },
  },
  {
    categoria: "Corazón",
    titulo: "Mejor salud cardiovascular",
    desc: "La práctica regular de inmersión en frío fortalece el sistema cardiovascular, mejora la elasticidad de los vasos sanguíneos y optimiza la circulación.",
    fuente: { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9518606/", tipo: "estudio" },
  },
  {
    categoria: "Cognición",
    titulo: "Mejora la atención y el enfoque",
    desc: "El frío estimula neurotransmisores que aumentan la claridad mental y potencian la concentración durante horas.",
    fuente: { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11521960/", tipo: "estudio" },
  },
  {
    categoria: "Estética",
    titulo: "Beneficia la piel y el cabello",
    desc: "La contracción de los vasos sanguíneos revitaliza la piel, reduce la hinchazón y fortalece el cabello al mejorar su oxigenación.",
    fuente: { url: "https://www.jdsjournal.com/article/S0923-1811(24)00162-2/abstract", tipo: "estudio" },
  },
  {
    categoria: "Inflamación",
    titulo: "Reduce la inflamación intestinal y articular",
    desc: "El frío disminuye procesos inflamatorios internos, lo que alivia molestias digestivas y mejora la movilidad articular.",
    fuente: { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10298661/", tipo: "estudio" },
  },
  {
    categoria: "Ánimo",
    titulo: "Mejora el humor a lo largo del día",
    desc: "La descarga de dopamina y endorfinas prolonga un estado de ánimo positivo y estable durante horas después de cada inmersión.",
    fuente: { url: "https://www.psychologytoday.com/us/blog/talking-about-trauma/202408/ice-baths-for-mental-health-show-promise", tipo: "divulgacion" },
  },
];

/* ── Consejo científico ───────────────────────────────────────────────────
   Redacción prudente a propósito: son las referencias en cuyo trabajo
   publicado nos apoyamos, NO asesores contratados de Mente Fria. El enlace
   lleva a su propio trabajo, por eso dice "Ver su trabajo" y no
   "Ver investigación". Bios y enlaces vienen del sitio vivo.            */

export type Referente = {
  nombre: string;
  campo: string;
  /** Linea corta de credencial, sobre la foto. */
  etiqueta: string;
  filiacion: string;
  bio: string;
  /** Tres hallazgos suyos sobre el frio, como los publica el sitio vivo. */
  puntos: string[];
  foto: string;
  url: string;
};

/* Fotos, etiquetas y puntos vienen de mentefria.com/pages/quien-recomienda-el-cold-plunging,
   que es la version que Saul prefiere. Las imagenes se descargaron de su CDN y
   se recomprimieron; los textos son los suyos, no reescritos. */
export const CONSEJO: Referente[] = [
  {
    nombre: "Dr. Andrew Huberman",
    campo: "Neurociencia · Stanford",
    etiqueta: "Neurocientífico · Universidad de Stanford",
    filiacion: "Universidad de Stanford",
    bio: "Especializado en plasticidad cerebral, estrés y resiliencia. Ha demostrado que la exposición al frío incrementa significativamente los niveles de noradrenalina y dopamina, mejorando la función cognitiva y el bienestar emocional. Financiado por los NIH y reconocido con múltiples premios académicos.",
    puntos: [
      "El frío incrementa noradrenalina y dopamina, mejorando enfoque y claridad mental.",
      "La exposición al frío mejora la función mitocondrial y produce más ATP, clave para la energía.",
      "Reduce inflamación y acelera la recuperación muscular post-entrenamiento.",
    ],
    foto: "/images/consejo/huberman.jpg",
    url: "https://www.hubermanlab.com/newsletter/the-science-and-use-of-cold-exposure-for-health-and-performance",
  },
  {
    nombre: "Dra. Rhonda Patrick",
    campo: "Biomedicina · FoundMyFitness",
    etiqueta: "Científica biomédica · Fundadora de FoundMyFitness",
    filiacion: "FoundMyFitness",
    bio: "Pionera en traducir la ciencia de la longevidad en consejos prácticos. Ha destacado cómo los cold plunges aumentan la norepinefrina, activan la grasa parda y estimulan la biogénesis mitocondrial. Exploradora de la combinación calor-frío como herramienta de regulación y resiliencia corporal.",
    puntos: [
      "Los cold plunges activan el tejido adiposo marrón y mejoran el metabolismo.",
      "La combinación sauna + frío mejora circulación, recuperación y resiliencia mental.",
      "Beneficios inmediatos: más energía, mejor humor y sensación de control sobre el bienestar.",
    ],
    foto: "/images/consejo/rhonda-patrick.jpg",
    url: "https://www.foundmyfitness.com/topics/cold-exposure-therapy",
  },
  {
    nombre: "Wim Hof",
    campo: "Rendimiento · 26 récords mundiales",
    etiqueta: "The Iceman · Creador del Método Wim Hof",
    filiacion: "26 récords Guinness",
    bio: "26 récords Guinness, incluyendo la inmersión más larga en hielo. Creador del Método Wim Hof: respiración, frío y meditación. Estudios publicados en PNAS demostraron que sus técnicas permiten influir conscientemente en el sistema inmunológico y el sistema nervioso autónomo, algo que se creía imposible.",
    puntos: [
      "Demostró que los humanos pueden influir voluntariamente en el sistema inmunológico.",
      "Las técnicas de frío aumentan la producción de norepinefrina, mejorando atención y estado de alerta.",
      "Su método reduce inflamación y acelera la recuperación muscular en atletas de élite.",
    ],
    foto: "/images/consejo/wim-hof.jpg",
    url: "https://www.wimhofmethod.com/cold-therapy",
  },
  {
    nombre: "Dra. Susanna Søberg",
    campo: "Metabolismo · Universidad de Copenhague",
    etiqueta: "Doctora en ciencias médicas · Investigadora de grasa parda",
    filiacion: "Universidad de Copenhague",
    bio: "Doctora de la Universidad de Copenhague especializada en obesidad, diabetes tipo 2 y enfermedades cardiovasculares. Su estudio en Cell Metabolism demuestra que el frío activa la termogénesis no temblorosa, aumentando el gasto energético y mejorando la regulación de glucosa. Su libro sobre baños en agua fría es bestseller en 13 idiomas.",
    puntos: [
      "El frío activa la grasa parda, incrementando el gasto calórico y mejorando la salud metabólica.",
      "Creadora del Søberg Principle: exposición deliberada al frío para optimizar el metabolismo.",
      "Aumenta dopamina y norepinefrina, con efectos positivos en estado de ánimo y claridad mental.",
    ],
    foto: "/images/consejo/soberg.jpg",
    url: "https://zoe.com/learn/cold-exposure-dr-susanna-soberg",
  },
  {
    nombre: "Dr. Peter Attia",
    campo: "Longevidad · Stanford · Johns Hopkins",
    etiqueta: "Médico · Experto en longevidad · Fundador de Attia Medical",
    filiacion: "Stanford · Johns Hopkins",
    bio: "Formado en Stanford y Johns Hopkins, dedicado a entender cómo las intervenciones de estilo de vida mejoran la salud y prolongan la vida. Autor del bestseller Outlive. Defiende el cold plunge como herramienta de salud metabólica: activa la termogénesis no temblorosa, reduce inflamación y mejora la composición corporal.",
    puntos: [
      "El frío activa la termogénesis no temblorosa: el cuerpo quema calorías para generar calor.",
      "Aumenta norepinefrina y dopamina, reduciendo estrés y mejorando la claridad mental.",
      "Reduce inflamación y acelera la recuperación, especialmente relevante para atletas activos.",
    ],
    foto: "/images/consejo/peter-attia.jpg",
    url: "https://peterattiamd.com/cold-therapy/",
  },
  {
    nombre: "Kristen Holmes",
    campo: "Rendimiento · WHOOP · Princeton",
    etiqueta: "VP de Rendimiento · Co-fundadora de WHOOP",
    filiacion: "WHOOP · Princeton",
    bio: "Ex entrenadora en jefe del equipo femenino de hockey de Princeton, con múltiples campeonatos nacionales. Hoy VP de Rendimiento en WHOOP, líder en tecnología biométrica. Ha investigado cómo el cold plunge reduce inflamación, acelera la recuperación muscular, mejora la calidad del sueño y aumenta la producción de norepinefrina.",
    puntos: [
      "El frío reduce inflamación y acelera la recuperación muscular en atletas de alto rendimiento.",
      "Mejora la calidad del sueño, clave en los protocolos de recuperación de WHOOP.",
      "Aumenta norepinefrina: más atención, más concentración y menos dolor post-entreno.",
    ],
    foto: "/images/consejo/kristen-holmes.jpg",
    url: "https://podcasts.apple.com/ee/podcast/the-science-behind-cold-plunges-why-more-women-should/id1801198730?i=1000714484524",
  },
];
