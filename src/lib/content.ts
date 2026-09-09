/*
  Mente Fria — landing content. Adapted from the real mentefria.com site
  (MF's own content): headlines, products, benefits, testimonials and trust copy.
  Tone: premium pero accesible, MIND OVER BODY. "Mente Fria" sin acento.
*/

type NavItem = {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
};

export const nav: {
  links: NavItem[];
  account: string;
  search: string;
  cart: string;
} = {
  links: [
    { label: "Inicio", href: "/" },
    {
      label: "Productos",
      href: "/productos",
      submenu: [
        { label: "Todos los plunges", href: "/productos" },
        { label: "Encuentra tu plunge", href: "/quiz" },
        { label: "MF ONE", href: "/productos/mf-one" },
        { label: "MF Horizon", href: "/productos/mf-horizon" },
        { label: "MF Barrel", href: "/productos/mf-barrel" },
        { label: "Accesorios", href: "/accesorios" },
      ],
    },
    {
      label: "Aprender",
      href: "/aprender",
      submenu: [
        { label: "La ciencia detrás del frío", href: "/aprender" },
        { label: "Consejo científico", href: "/aprender#consejo" },
        { label: "Motores Mente Fria", href: "/motores" },
      ],
    },
    {
      label: "Soporte",
      href: "/soporte",
      submenu: [
        { label: "Instrucciones de instalación", href: "/soporte#instalacion" },
        { label: "Cuida tu MF Plunge", href: "/soporte#cuidado" },
        { label: "Centro de ayuda", href: "/soporte/centro-de-ayuda" },
        { label: "Contáctanos", href: "/soporte" },
        { label: "Garantía", href: "/garantia" },
        { label: "Garantía extendida", href: "/garantia/extendida" },
        { label: "Términos y condiciones", href: "/terminos" },
        { label: "Aviso de privacidad", href: "/privacidad" },
      ],
    },
    { label: "Blog", href: "/blog" },
    { label: "Para negocios", href: "/negocios" },
  ],
  account: "Cuenta",
  search: "Buscar",
  cart: "Carrito",
};

export const announcement =
  "HASTA 6 MESES SIN INTERESES · PRUÉBALA 30 DÍAS SIN COMPROMISO";

export const hero = {
  eyebrow: "Mente Fria",
  title: ["La cold plunge", "#1 en México."],
  subtitle:
    "Recuperarte y rendir al máximo desde casa no había sido posible hasta ahora.",
  cta: "Explora Mente Fria",
};

export const showcase = {
  title: ["Encuentra la cold plunge", "perfecta para ti."],
  subtitle:
    "Cada modelo lleva tecnología de enfriamiento sin hielo. Tú decides el tamaño y el sistema.",
  products: [
    {
      name: "MF ONE",
      tag: "All-In-One · chiller integrado · 1 año de garantía",
      price: "$169,000 MXN",
      image: "/images/prod-mfone.webp",
      tone: "ink" as const,
    },
    {
      name: "MF Horizon",
      tag: "Filtración de 3 capas + ozono · WiFi · 6 meses",
      price: "$74,000 MXN",
      image: "/images/prod-horizon.jpg",
      tone: "cool" as const,
    },
    {
      name: "MF Barrel",
      tag: "Filtración de 3 capas + ozono · WiFi · 6 meses",
      price: "$69,000 MXN",
      image: "/images/prod-barrel.jpg",
      tone: "warm" as const,
    },
  ],
};

export const featureScroll = {
  features: [
    {
      word: "Temperatura",
      body:
        "Enfría hasta 3 °C y, con el Motor Premium, ajusta de 1 a 40 °C. Tú programas la temperatura; el equipo la mantiene, sin una sola bolsa de hielo.",
      left: { label: "Frío", value: "3°" },
      right: { label: "Calor", value: "42°" },
    },
    {
      word: "Ozono",
      body:
        "Ozono integrado y filtración de 3 capas trabajando juntos. Agua limpia y cristalina, sin cloro de alberca de alberca ni cloro.",
      left: { label: "Ozono", value: "24/7" },
      right: { label: "Filtros", value: "3" },
    },
    {
      word: "Conectividad",
      body:
        "Programa el enfriamiento con tu rutina desde la app. Control WiFi para que el agua esté lista exactamente cuando la necesitas.",
      left: { label: "App", value: "WiFi" },
      right: { label: "Garantía", value: "12 meses" },
    },
  ],
};

export const statement = {
  text: "Acepta la incomodidad. Desarrolla fortaleza interior.",
};

export const gallery = [
  { caption: "MF ONE", image: "/images/hero-mfone.jpg", tone: "cool" as const },
  { caption: "MF ONE · acabado", image: "/images/prod-mfone.webp", tone: "ink" as const },
  { caption: "MF Horizon", image: "/images/prod-horizon.jpg", tone: "warm" as const },
  { caption: "MF Barrel", image: "/images/prod-barrel.jpg", tone: "cool" as const },
];

export const bestSleep = {
  eyebrow: "La diferencia",
  title: "El mejor frío, sin una sola bolsa de hielo.",
  body:
    "Nuestros motores son hasta 3× más poderosos que cualquier otro en México. Enfriamiento constante y agua filtrada, sesión tras sesión.",
  stats: [
    { value: "3×", label: "más poderosos que otros motores" },
    { value: "3 °C", label: "temperatura mínima constante" },
    { value: "30 días", label: "de prueba, sin preguntas" },
  ],
};

export const memberStories = {
  title: "Mente Fria en acción",
  cards: [
    { name: "Eduardo V.", role: "CDMX · Atleta", tone: "ink" as const },
    { name: "Valeria — Daniel G.", role: "CDMX", tone: "cool" as const },
    { name: "Rodrigo P.", role: "Guadalajara", tone: "warm" as const },
    { name: "Ricardo M.", role: "Puerto Vallarta", tone: "cool" as const },
  ],
};

export const featuredReviews = {
  title: "Por qué confían en Mente Fria",
  badges: [
    "30 días de prueba",
    "Garantía hasta 1 año",
    "Siempre hay a quién escribirle",
    "Hasta 6 MSI con Mercado Pago",
    "Envío a todo México",
  ],
  cards: [
    {
      quote:
        "Después de una lesión deportiva, las cold plunges de Mente Fria aceleraron mi recuperación. La inflamación bajó rápidamente y pude volver a entrenar mucho antes de lo esperado.",
      source: "Eduardo V. · CDMX",
    },
    {
      quote:
        "Las cold plunges de Mente Fria me han ayudado a manejar mejor mi ansiedad. El frío y la respiración controlada me dan una herramienta poderosa para mantener la calma.",
      source: "Daniel G. · CDMX",
    },
  ],
};

export const customerReviews = {
  title: "Lo que dicen nuestros clientes",
  subtitle: "Miles de personas alcanzando su máximo potencial con Mente Fria",
  reviews: [
    {
      rating: 5,
      title: "Calidad insuperable",
      body: "La calidad del producto de Mente Fria es insuperable. Los materiales son muy resistentes y duraderos.",
      name: "Carlos G. · Guadalajara",
      verified: true,
    },
    {
      rating: 5,
      title: "Mejor sistema inmune",
      body: "Tenía frecuentes resfriados y desde que uso las cold plunges de Mente Fria, mi sistema inmunológico se ha fortalecido. No he tenido un solo resfriado en meses.",
      name: "Fernando L. · Monterrey",
      verified: true,
    },
    {
      rating: 5,
      title: "Menos inflamación",
      body: "Siempre tuve problemas con la inflamación después de hacer ejercicio. Mente Fria ha reducido significativamente el dolor post-entrenamiento.",
      name: "Rodrigo P. · Guadalajara",
      verified: true,
    },
    {
      rating: 5,
      title: "Adiós al insomnio",
      body: "Llevaba años sufriendo de insomnio. Desde que empecé a usar Mente Fria, duermo profundamente y me despierto renovado.",
      name: "Ricardo M. · Puerto Vallarta",
      verified: true,
    },
    {
      rating: 5,
      title: "Movilidad recuperada",
      body: "Sufría de dolores articulares crónicos y las cold plunges de Mente Fria han sido un alivio increíble. Mi movilidad ha mejorado.",
      name: "Miguel T. · CDMX",
      verified: true,
    },
    {
      rating: 5,
      title: "Excelente servicio",
      body: "Estoy muy impresionado con el servicio al cliente de Mente Fria. Respondieron todas mis preguntas rápidamente y con mucha amabilidad.",
      name: "Pedro H. · CDMX",
      verified: true,
    },
  ],
};

export const finalCta = {
  title: "El frío te está esperando.",
  body: "30 días de prueba, envío a todo México y alguien que te contesta cuando escribes. Da el primer paso.",
  cta: "Explora Mente Fria",
};

