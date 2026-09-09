/*
  CENTRO DE AYUDA

  Reconstrucción del troubleshooting del sitio anterior, con los datos
  corregidos contra las fuentes vigentes:

  · MF ONE  → manual MF ONE y ficha CP-ONE
  · Motores → fichas Pro 2.0 y Premium 2.0 (generación nueva)
  · Inflables → manual v6
  · Garantía extendida → los cinco contratos MF Shield
  · Devoluciones → política de 30 días vigente

  Correcciones respecto del sitio vivo, para que no se vuelvan a colar:
  - El consumo publicado de los motores (2,230 y 2,700 W) era la capacidad
    de enfriamiento mal etiquetada, y ni siquiera esa. La entrada real es
    790 W y 1,150 W.
  - El rango del Premium no llega a 42 °C: va de 1 a 40 °C.
  - Las medidas y pesos de las tres tinas estaban mal.
  - "Producto usado no es elegible para reembolso" contradecía la prueba
    de 30 días, donde usar el equipo es justo el punto.
  - La app es Smart Life, no una app propia.

  Nada de lo que se afirme aquí puede salir del sitio vivo: solo de los
  documentos oficiales.
*/

export type Pregunta = { q: string; a: string };
export type Categoria = {
  slug: string;
  nombre: string;
  dek: string;
  preguntas: Pregunta[];
};

const WA = "+52 56 1647 1386";

export const CATEGORIAS: Categoria[] = [
  /* ─────────────────────────────────────────────────────── */
  {
    slug: "pagos",
    nombre: "Pagos",
    dek: "Formas de pago, meses sin intereses y compras por volumen.",
    preguntas: [
      {
        q: "¿Qué formas de pago aceptan?",
        a: "Visa, Mastercard, American Express, PayPal y Mercado Pago en línea. También recibimos transferencia bancaria: escríbenos y te pasamos los datos.",
      },
      {
        q: "¿Manejan meses sin intereses?",
        a: "Hasta 6 meses sin intereses con Mercado Pago.",
      },
      {
        q: "¿Está segura mi información de pago?",
        a: "La tienda corre sobre Shopify, que procesa y resguarda los datos de la tarjeta. Nosotros no tenemos acceso a ellos en ningún momento.",
      },
      {
        q: "¿Hay precio especial si compro varias unidades?",
        a: `A partir de tres unidades sí. Escríbenos al ${WA} con lo que necesitas y te armamos la cotización.`,
      },
      {
        q: "¿Puedo apartar una MF ONE?",
        a: "Sí, y es la vía normal cuando no hay inventario disponible. Pagas el 40 % para reservar tu lugar y el 60 % restante antes del envío. La entrega estimada es de 12 semanas desde el anticipo. Los inflables no llevan apartado porque se envían de inventario.",
      },
      {
        q: "¿Los precios incluyen IVA y envío?",
        a: "Los precios publicados no incluyen IVA. El envío se cobra aparte: $1,500 MXN para MF Barrel y MF Horizon, $6,000 MXN para la MF ONE.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "envios",
    nombre: "Envíos y entrega",
    dek: "Tiempos, costos, cómo llega y qué revisar al recibir.",
    preguntas: [
      {
        q: "¿Cuánto tarda en llegar?",
        a: "De 3 a 7 días hábiles a cualquier punto de México, cuando hay inventario. Si apartaste una MF ONE, el plazo estimado es de 12 semanas desde el anticipo.",
      },
      {
        q: "¿Cuánto cuesta el envío?",
        a: "$1,500 MXN para MF Horizon y MF Barrel. $6,000 MXN para la MF ONE, que incluye la maniobra de entrega.",
      },
      {
        q: "¿Cómo llega el producto?",
        a: "Los inflables viajan en dos cajas: una con el motor y otra con la tina y sus accesorios. La MF ONE viaja drenada y entarimada como una sola pieza, y coordinamos contigo el acceso al espacio final.",
      },
      {
        q: "¿Cabe la MF ONE por mi puerta?",
        a: "Mide 195 × 80 × 71 cm. Mide tus puertas, pasillos y vueltas de escalera antes de que salga el envío. Con 135 kg y 420 litros de capacidad, una vez instalada y llena no es un equipo que se cambie de lugar por impulso.",
      },
      {
        q: "Mi pedido llegó dañado. ¿Qué hago?",
        a: "Si el empaque llega visiblemente golpeado, anótalo en el acuse de la paquetería frente al repartidor y repórtanoslo el mismo día. Eso nos deja reclamarle al transportista y resolverte más rápido. Conserva el empaque hasta que cerremos el caso.",
      },
      {
        q: "¿Cómo transporto el equipo si me mudo?",
        a: "El motor y el módulo de enfriamiento viajan siempre de pie. Acostarlos desplaza el aceite del compresor y lo daña, y ese daño no lo cubre la garantía. Si el equipo viajó de lado por accidente, déjalo vertical 24 horas antes de conectarlo. Vacíalo por completo antes de moverlo y asegúrate de que no quede humedad dentro.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "garantia",
    nombre: "Prueba, garantía y devoluciones",
    dek: "Los 30 días, qué cubre cada póliza y cómo se extiende.",
    preguntas: [
      {
        q: "¿Cómo funciona la prueba de 30 días?",
        a: "Tienes 30 días naturales desde la entrega. Llénala, métete y úsala todos los días de ese mes: que el equipo esté usado no te quita el derecho al reembolso, ese es el sentido de una prueba. Si no te convence, nos escribes, la recogemos sin costo y te devolvemos tu dinero. El envío original no se reembolsa.",
      },
      {
        q: "¿Qué queda fuera de la prueba?",
        a: "Tres cosas: el daño por uso indebido (cortes, golpes, quemaduras, o meterle cloro de alberca y limpiadores abrasivos), las piezas faltantes al devolver el equipo, y las solicitudes que llegan después del día 30. El desgaste normal de un mes de uso no cuenta como daño.",
      },
      {
        q: "¿Cuánto dura la garantía?",
        a: "12 meses en la MF ONE. 6 meses en MF Barrel y MF Horizon. Los motores Pro y Premium tienen 6 meses y póliza propia, distinta de la de la tina con la que se usan. Son garantías independientes: lo que aplica a una no aplica a la otra.",
      },
      {
        q: "¿Qué cubre la garantía?",
        a: "Los componentes funcionales: módulo de enfriamiento, compresor, bombas, filtración integrada y el sistema eléctrico y de control de fábrica. Las refacciones originales van sin costo, igual que la mano de obra cuando la hace nuestro personal o un técnico de nuestra red. Los accesorios quedan fuera: cubierta aislante, skimmer, llave de filtro, portacelular y Pro Deck.",
      },
      {
        q: "¿Qué invalida la garantía?",
        a: "Congelamiento por no drenar. Chorros de agua directos o inmersión del módulo del motor. Sol directo prolongado sobre el chiller. Transportarlo o guardarlo acostado. Operar sin agua o con el nivel por debajo de la marca mínima. Tratar el agua con cloro de alberca, bromo o solventes. Y abrir el equipo o dejar que lo repare alguien que no autorizamos.",
      },
      {
        q: "¿Puedo extender la garantía?",
        a: "Sí, con MF Shield. Continúa la cobertura hasta el mes 24: en la MF ONE va del mes 13 al 24 por $13,000 MXN; en los inflables va del mes 7 al 24, desde $6,900 MXN según el motor. Se contrata mientras la garantía estándar siga vigente.",
      },
      {
        q: "¿Qué pasa cuando se vence la garantía?",
        a: "El canal de atención no se cierra. Escríbenos y vemos cómo reparar el componente dañado; las refacciones se cotizan.",
      },
      {
        q: "¿Quién paga los envíos de una devolución o un reemplazo?",
        a: "Nosotros. La recolección de una devolución dentro de los 30 días corre por nuestra cuenta, y en un reemplazo por defecto de fabricación cubrimos tanto el retorno como el envío del equipo nuevo. Lo único que no se reembolsa es lo que pagaste por la entrega inicial.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "modelos",
    nombre: "Elegir modelo",
    dek: "Diferencias entre MF Barrel, MF Horizon y MF ONE.",
    preguntas: [
      {
        q: "¿Cuál es la diferencia entre los tres modelos?",
        a: "MF Barrel es vertical: Ø 90 × 90 cm, 11 kg de tina, 500 litros de capacidad máxima y 350 recomendados. MF Horizon es horizontal: 160 × 70 × 65 cm, 12 kg, 550 litros máximos y 400 recomendados, con el mayor espacio de inmersión de la línea. Los dos son inflables de tejido drop-stitch y usan motor externo. La MF ONE es rígida de acrílico con acabados en acero inoxidable, mide 195 × 80 × 71 cm, pesa 135 kg y lleva el sistema de enfriamiento dentro de la tina.",
      },
      {
        q: "¿Qué modelo me conviene si vivo en departamento?",
        a: "El MF Barrel. Con 90 cm de diámetro cabe donde los otros no, y desinflado se guarda en su mochila. Si tienes patio o terraza y quieres estirarte, el Horizon te da más espacio por el mismo tipo de instalación.",
      },
      {
        q: "¿Cuánto espacio necesito en total?",
        a: "Suma la medida de la tina más el espacio libre que pide el equipo de enfriamiento para respirar. La MF ONE necesita 100 cm libres al frente y 20 cm por lado. Los motores externos piden 100 cm al frente y atrás, 50 cm de un costado y 20 cm del otro. Si tienes dudas, el quiz del sitio te lo calcula con tus medidas.",
      },
      {
        q: "¿Los inflables incluyen el motor?",
        a: "Sí. El precio publicado del MF Barrel y del MF Horizon ya incluye su motor.",
      },
      {
        q: "¿Cuántas personas pueden usarla a la vez?",
        a: "Una por sesión. Sesiones consecutivas entre varias personas del mismo hogar no son problema, siempre que ajustes el mantenimiento: la frecuencia de cambio de filtro y de agua se calcula por el total de inmersiones diarias del equipo, no por persona.",
      },
      {
        q: "¿De qué material están hechas?",
        a: "MF Barrel y MF Horizon usan tejido drop-stitch de grado militar, con cámara de aire aislante que ayuda a conservar la temperatura. La MF ONE es de acrílico de alta resistencia con componentes y acabados en acero inoxidable.",
      },
      {
        q: "¿Puedo ver el equipo antes de comprar?",
        a: `Sí. Agenda una demo con el equipo de ventas por WhatsApp al ${WA} y coordinamos.`,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "instalacion",
    nombre: "Instalación y espacio",
    dek: "Corriente, superficie, espacios libres y primer arranque.",
    preguntas: [
      {
        q: "¿Necesito obra, plomería o desagüe?",
        a: "Ninguna de las tres. Se llena con manguera o llave convencional y se vacía por gravedad hacia una coladera o el jardín. Tener un desagüe cerca facilita el mantenimiento, pero no es requisito.",
      },
      {
        q: "¿Qué instalación eléctrica requiere?",
        a: "110 V, el estándar mexicano, en un contacto dedicado con tierra física. La MF ONE pide 16 A; el Motor Pro, un circuito de 15 A o más; el Motor Premium, uno de 20 A. Nada de extensiones ni multicontactos: la unidad va directo al muro, o a un regulador que a su vez esté conectado al muro.",
      },
      {
        q: "¿Por qué hay que esperar 24 horas antes de encender?",
        a: "Porque el equipo viajó y el aceite del compresor necesita reasentarse. Desembala, colócalo en su lugar definitivo de pie y déjalo reposar 24 horas antes de conectarlo. Vale también cada vez que lo cambies de lugar.",
      },
      {
        q: "¿Cuánto espacio libre necesita el equipo de enfriamiento?",
        a: "La MF ONE: 100 cm al frente y 20 cm por lado. Los motores externos: 100 cm al frente, 100 cm atrás, 50 cm de un costado y 20 cm del otro. El equipo expulsa aire caliente y en un espacio cerrado ese aire se acumula, la eficiencia se cae y aparecen los códigos de temperatura ambiente alta.",
      },
      {
        q: "¿Sobre qué superficie va?",
        a: "Base sólida, nivelada y resistente a la humedad. Si la vas a poner sobre deck, entrepiso o terraza, confirma la capacidad de carga con un ingeniero estructural antes de instalar: la MF ONE llena supera los 500 kg entre equipo y agua. Con el tiempo la unidad puede asentarse y quedar despareja; renivélala cuando pase.",
      },
      {
        q: "¿Puedo tenerla en exteriores?",
        a: "Sí, bajo techo, pérgola o cubierta. Las salpicaduras del uso normal no son problema porque la tina está hecha para contener agua. Lo que hay que cuidar es el módulo del motor: nada de lluvia sostenida, chorros de manguera dirigidos a las rejillas, ni sol directo sobre el chiller. La exposición a los elementos daña componentes y deja la garantía sin efecto.",
      },
      {
        q: "¿Qué distancia debe haber respecto a otros aparatos eléctricos?",
        a: "1.8 metros o más entre el equipo y cualquier contacto o aparato eléctrico. El contacto debe quedar accesible y visible desde la tina, pero fuera de ese radio. No metas lámparas, bocinas ni pantallas dentro de él mientras la tina esté en uso.",
      },
      {
        q: "¿Cómo lleno la tina la primera vez?",
        a: "Deja correr la manguera unos segundos y descarta esa primera agua. Confirma que el filtro está puesto, limpio y bien asentado. Llena con agua potable hasta superar la marca MIN del filtro, nunca por debajo. Deja asentar de 3 a 5 minutos antes de encender, para que salga el aire atrapado en las tuberías. Y considera que al entrar una persona el nivel sube.",
      },
      {
        q: "¿Con qué agua la lleno?",
        a: "Agua potable de la red. Nada de agua de alberca, de pozo sin tratar, ni agua que ya traiga químicos. Si tu agua es dura, trátala antes: los minerales en suspensión saturan el filtro mucho más rápido y dejan depósitos en el intercambiador.",
      },
      {
        q: "¿Qué tan difícil es armar un inflable?",
        a: "No se necesitan herramientas. Infla la tina con la bomba incluida, conecta las mangueras al motor, enchufa y llena. Entre 15 y 20 minutos en promedio. Para desmontarlo, los mismos pasos en reversa.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "motores",
    nombre: "Motores",
    dek: "Pro contra Premium, consumo, ruido y compatibilidad.",
    preguntas: [
      {
        q: "¿Cuál es la diferencia entre el Motor Pro y el Motor Premium?",
        a: "El Pro es de 0.8 HP con 2,050 W de capacidad de enfriamiento, filtración de tres capas y control por Wi-Fi. Solo enfría. El Premium es de 1 HP con 2,600 W de enfriamiento, suma 3,416 W de calentamiento para ajustar de 1 a 40 °C, y trae ozono integrado. Los dos sirven para MF Barrel y MF Horizon.",
      },
      {
        q: "¿Cuánta electricidad consumen?",
        a: "La potencia de entrada es de 790 W en el Motor Pro y 1,150 W en el Premium. La MF ONE consume 1,320 W. Lo que eso te cueste depende de tu tarifa y de cuántas horas trabaje el equipo, y eso último baja bastante si dejas puesta la cubierta aislante entre sesiones.",
      },
      {
        q: "Tengo un motor con especificaciones distintas a las publicadas. ¿Está mal?",
        a: "No. Hay dos generaciones circulando. Los motores anteriores medían 55 × 42.5 × 53 cm el Pro y 58.5 × 42.5 × 53 cm el Premium, pesaban 39 kg y el Premium calentaba hasta 42 °C. La generación nueva cambió medidas, peso y rango. La garantía funciona igual en ambas. En la página de motores está la tabla comparativa.",
      },
      {
        q: "¿El motor calienta además de enfriar?",
        a: "Solo el Premium. Ajusta de 1 a 40 °C, así que la misma tina te sirve para frío y para agua caliente. El Pro únicamente enfría.",
      },
      {
        q: "¿Hacen ruido?",
        a: "60 dB(A) el Pro y 63 dB(A) el Premium, medidos a un metro. La MF ONE está en 68 dB(A). Es ruido de compresor, comparable al de un refrigerador grande, y no trabaja continuo: arranca y se detiene solo para sostener la temperatura que fijaste.",
      },
      {
        q: "¿Lo dejo encendido todo el tiempo?",
        a: "Puedes dejarlo en mantenimiento para que el agua esté siempre lista, o programarlo desde la app para que enfríe justo antes de la hora a la que lo usas. Si te vas varios días, apágalo, pero drena el agua: agua estancada sin filtración genera bacterias en cuestión de días.",
      },
      {
        q: "¿El motor puede quedar afuera?",
        a: "Bajo techo sí. Lo que no tolera es agua directa ni sol constante sobre la carcasa. Para instalaciones a la intemperie tenemos cobertores específicos.",
      },
      {
        q: "¿Puedo alargar la manguera para poner el motor más lejos?",
        a: "No. Extender la manguera reduce el flujo de agua, con lo que baja la eficiencia de enfriamiento y el equipo puede no llegar a la temperatura que le pediste.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "uso",
    nombre: "Uso y protocolo",
    dek: "Temperatura, duración, frecuencia y cómo respirar.",
    preguntas: [
      {
        q: "¿Qué es la inmersión en frío?",
        a: "Meterse en agua fría de forma controlada durante un rato corto, en promedio tres minutos. Al contacto con el frío los vasos sanguíneos se contraen, el sistema nervioso se activa y se liberan neurotransmisores ligados al estado de alerta, el ánimo y la recuperación. Lo que produce el efecto acumulado es la constancia.",
      },
      {
        q: "¿A qué temperatura debo ponerla?",
        a: "Depende de dónde estés en la curva. Primeras sesiones: de 12 a 15 °C. Adaptación: de 8 a 12 °C. Práctica regular: de 3 a 8 °C. Baja el ajuste de forma gradual a lo largo de semanas, no de un día para otro. Son referencias de uso, no indicación médica.",
      },
      {
        q: "¿Cuánto tiempo me quedo dentro?",
        a: "De 1 a 2 minutos las primeras veces. De 2 a 4 conforme te adaptas. De 3 a 5 en práctica regular. Tres minutos alcanzan para el estímulo completo, y aguantar más no agrega beneficio. Sal cuando lo decidas tú, no cuando lo diga el cronómetro.",
      },
      {
        q: "¿Todos los días?",
        a: "Sí, esa es la recomendación. Tres minutos diarios acumulan el estímulo semanal que buscas. Si vas empezando y se te hace mucho, sesiones más cortas están bien mientras tu cuerpo se adapta.",
      },
      {
        q: "¿Puedo hacer dos sesiones al día?",
        a: "Sí. Mañana y noche es un protocolo común entre quienes ya tienen tiempo practicando. Si apenas arrancas, consolida primero una sesión diaria.",
      },
      {
        q: "¿Cuándo conviene hacerlo respecto al entrenamiento?",
        a: "Si buscas recuperación rápida, dentro de la primera hora después de entrenar. Si tu objetivo principal es ganar masa muscular, hay evidencia de que el frío inmediato después del entrenamiento de fuerza puede interferir con parte de la adaptación: en ese caso sepáralo varias horas o déjalo para días de descanso.",
      },
      {
        q: "¿Puedo hacerlo antes de dormir?",
        a: "Muchos usuarios reportan que la sesión nocturna los deja en calma y les facilita el sueño, porque el frío baja la temperatura corporal central. La respuesta inmediata al frío sí es activante, así que deja pasar de 30 a 60 minutos antes de acostarte.",
      },
      {
        q: "¿Se puede combinar con sauna?",
        a: "Es de las combinaciones más usadas. El protocolo habitual son 15 a 20 minutos de sauna seguidos de 2 a 3 minutos de frío, repetido en dos o tres rondas, terminando siempre en frío.",
      },
      {
        q: "¿Es normal querer salirme apenas entro?",
        a: "Completamente. El impulso de salir, la respiración agitada y la incomodidad de los primeros segundos son la respuesta automática del sistema nervioso. Con práctica el umbral se mueve, y lo que acelera ese proceso es controlar la respiración dentro del agua.",
      },
      {
        q: "¿Cómo debo respirar?",
        a: "Antes de entrar, unas respiraciones profundas y lentas: inhala por nariz y exhala largo por boca. Los primeros 30 segundos dentro del agua la respiración se acelera sola; alárgala y hazla más lenta en lugar de pelearte con ella. Si sientes que hiperventilas, prioriza la exhalación.",
      },
      {
        q: "¿Cómo entro y cómo salgo?",
        a: "Entra despacio y sentado, nunca de golpe ni de cabeza. Al salir levántate despacio, porque la presión puede bajar al ponerte de pie. Sécate, abrígate y deja que el cuerpo se recaliente con movimiento suave. Evita la regadera muy caliente inmediatamente después. Y pon la cubierta al terminar.",
      },
      {
        q: "¿Sirve de algo si no soy atleta?",
        a: "La práctica viene de la recuperación deportiva, pero hoy la hace todo tipo de gente y no hace falta entrenar para obtener el efecto. Lo único que se necesita es constancia.",
      },
      {
        q: "¿Y no es lo mismo llenar una tina con hielo?",
        a: "En resultado inmediato se parece; en sostenerlo, no. El hielo es un gasto recurrente, la temperatura sube a los pocos minutos y montar el operativo diario cansa. El equipo mantiene solo la temperatura que programaste y filtra el agua mientras trabaja. La constancia es lo que da resultados, y la tecnología es lo que la vuelve posible.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "salud",
    nombre: "Salud y seguridad",
    dek: "Contraindicaciones, hipotermia y reglas que no se negocian.",
    preguntas: [
      {
        q: "¿Quién no debería meterse?",
        a: "Consulta a tu médico antes de usar el equipo si estás embarazada o crees estarlo, o si tienes antecedente de enfermedad cardíaca, presión arterial alta o baja, problemas circulatorios o diabetes. Lo mismo si tomas medicamentos que produzcan somnolencia o que afecten la frecuencia cardíaca, la presión o la circulación. Si cursas una enfermedad contagiosa, no la uses.",
      },
      {
        q: "Tengo hipertensión. ¿Puedo usarla?",
        a: "Consúltalo con tu médico antes de empezar. La inmersión en frío eleva de forma temporal la presión arterial y la frecuencia cardíaca como parte de la respuesta normal al frío. En una persona sana eso es inofensivo; con una condición cardiovascular de por medio, la decisión la toma quien conoce tu historial.",
      },
      {
        q: "¿Pueden usarla menores de edad?",
        a: "El manual es explícito: no permitas el uso a menores de 18 años sin que un profesional de la salud lo apruebe, y con supervisión en todo momento.",
      },
      {
        q: "¿Es segura durante el embarazo?",
        a: "No la recomendamos. La postura general de los organismos de salud es evitar temperaturas extremas en ese periodo. Para el post-parto, consúltalo con tu médico.",
      },
      {
        q: "¿Cuáles son las señales de hipotermia?",
        a: "Leve: temblor, piel de gallina, dificultad para movimientos finos. Sal, sécate y abrígate. Moderada: temblor violento, lentitud, dificultad para hablar, torpeza motriz. Sal de inmediato y busca ayuda. Severa: rigidez muscular, desorientación, el temblor se detiene, piel azulada, latidos irregulares. Es una emergencia médica, llama al 911. Que el temblor se detenga no significa que la persona esté mejor: en hipotermia severa es señal de que va peor.",
      },
      {
        q: "¿Qué hago en una emergencia?",
        a: "Saca a la persona del agua, retírale la ropa mojada, abrígala con mantas secas y llama al 911. No la sumerjas en agua caliente, no le des alcohol y no le frotes las extremidades.",
      },
      {
        q: "¿Puedo tomar alcohol antes o durante?",
        a: "Nunca. El alcohol y las drogas aumentan de forma considerable el riesgo de hipotermia mortal, pérdida de conciencia y ahogamiento.",
      },
      {
        q: "¿Qué precauciones hay con niños y mascotas?",
        a: "Impide el acceso y asegura la cubierta siempre que el equipo no esté en uso. La cubierta ayuda, pero no impide el acceso en todas las condiciones: la responsabilidad de que niños y mascotas no alcancen la tina es del propietario.",
      },
      {
        q: "¿Puedo confiar en la lectura del panel?",
        a: "La tolerancia de los sistemas de regulación puede variar hasta ±2 °C. Si vas a trabajar en el rango bajo, confirma con un termómetro antes de entrar.",
      },
      {
        q: "¿Para qué sirve el interruptor de fuga y cada cuándo lo pruebo?",
        a: "Corta la corriente si hay fuga a tierra, y va en el extremo del cable. Pruébalo una vez al mes: presiona TEST y el equipo debe apagarse; presiona RESET y debe volver a operar normal. Si al presionar TEST el equipo no se apaga, hay corriente a tierra y existe riesgo de descarga: desconéctalo y no lo uses hasta que se corrija. Retirarlo o puentearlo vuelve el equipo inseguro y anula la garantía.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "agua",
    nombre: "Agua, filtros y mantenimiento",
    dek: "Cada cuándo cambiar qué, y por qué el filtro es lo crítico.",
    preguntas: [
      {
        q: "¿Cada cuándo cambio el filtro y el agua?",
        a: "La frecuencia la marca el número de inmersiones diarias del equipo, sumando a todos los que lo usan. En la MF ONE: 1 mes con una inmersión al día, 3 semanas con dos, 10 días con tres, 1 semana con cinco, 3 días con diez. En el Motor Pro el filtro va cada 3 semanas con una inmersión al día y el agua cada 3 semanas, apretándose hasta 4 días con quince inmersiones. Ante la duda, ve a la columna más exigente: cambiar un filtro de más cuesta mucho menos que un compresor.",
      },
      {
        q: "¿Por qué importa tanto el filtro?",
        a: "Un filtro de papel saturado reduce el flujo, obstruye el intercambiador y termina por dañar el compresor. Es el consumible que sí hay que cambiar a tiempo, y por eso cumplir el calendario es condición de validez de la garantía. Conserva los comprobantes de compra.",
      },
      {
        q: "¿Cómo cambio el filtro de papel?",
        a: "Apaga desde el panel y desconecta la corriente. Abre la tapa del filtro con la llave incluida, girando en sentido contrario a las manecillas. Saca el filtro usado recto hacia arriba. Coloca el nuevo asegurándote de que asiente completo en su base. Cierra apretando con la llave sin forzar, enciende y confirma que no hay fugas.",
      },
      {
        q: "¿Y el colador de la tina?",
        a: "Ábrelo con la llave, saca el colador y enjuágalo con agua limpia una vez por semana; cada dos o tres días si el equipo tiene mucho uso. Nunca operes el equipo sin el colador puesto: está dimensionado al flujo de la bomba y una pieza de otro flujo puede provocar atrapamiento.",
      },
      {
        q: "¿Cómo se mantiene limpia el agua?",
        a: "El agua circula por el filtro de papel, que retiene sólidos, y por el sistema de ozono en los equipos que lo traen: la MF ONE y el Motor Premium. Los inflables con Motor Pro trabajan con filtración de tres capas, sin ozono. Para que cualquiera de los dos sistemas sirva, el equipo tiene que estar encendido y circulando agua con regularidad.",
      },
      {
        q: "¿Puedo agregarle cloro?",
        a: "Nunca cloro de alberca, bromo, solventes, ácidos ni álcalis. Corroen las tuberías internas y el intercambiador, y el daño por tratamiento incorrecto del agua no lo cubre la garantía. El equipo no necesita químicos para operar; si decides usar algún tratamiento, tiene que ser compatible con equipos de inmersión en frío.",
      },
      {
        q: "El agua se puso turbia o huele. ¿Qué hago?",
        a: "Cámbiala completa y cambia también el filtro, sin esperar a la fecha del calendario. Lo mismo si el agua se siente resbalosa o si hubo más usuarios de lo normal esa semana.",
      },
      {
        q: "¿Qué puedo hacer para que el agua dure más?",
        a: "Dúchate antes de entrar: entrar limpio duplica la vida útil del agua. Los aceites, cremas y bloqueadores son lo que más satura el filtro. Recógete el cabello largo. Y deja la cubierta puesta cuando no la estés usando.",
      },
      {
        q: "¿Y si dejo el equipo lleno pero apagado?",
        a: "Cambia el agua cada 2 o 3 días, sin importar cuántas inmersiones se hagan. El agua estancada sin filtración genera bacterias en cuestión de días. Si va a estar apagado más tiempo que eso, drénalo.",
      },
      {
        q: "¿Cómo limpio el interior de la tina?",
        a: "Cada 3 a 4 semanas, con el equipo vacío y un material no abrasivo. Nada de detergentes fuertes ni cloro. Cada cambio de agua lleva cambio de filtro.",
      },
      {
        q: "¿Cómo la vacío?",
        a: "En la MF ONE los tres puertos están detrás de las rejillas laterales del módulo. Apaga desde el panel, desconecta, retira la rejilla, conecta una manguera de jardín de 3/4\" al puerto 1 o al 3 y llévala a una coladera o al jardín; el agua sale por gravedad, así que el desagüe tiene que quedar más abajo que la tina. Para vaciado total abre los tres puertos a la vez, incluido el 2, que purga el circuito interno de la máquina.",
      },
      {
        q: "¿Cómo la guardo si no la voy a usar por meses?",
        a: "Haz el vaciado total con los tres puertos abiertos. Retira el filtro y deséchalo, pondrás uno nuevo el día que vuelvas a usarla. Seca la tina y el colador con un paño limpio hasta que no quede humedad en el fondo. Pon la cubierta. Y guárdala siempre de pie, bajo techo, sobre piso firme y nivelado.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────── */
  {
    slug: "fallas",
    nombre: "Algo no funciona",
    dek: "Códigos de error, síntomas y qué revisar antes de llamar.",
    preguntas: [
      {
        q: "La pantalla muestra un código en lugar de la temperatura. ¿Qué significa?",
        a: "E1, E2 y E3 son sensores en circuito abierto: contacta a soporte. E4 es protección por flujo de agua bajo, el código más frecuente, y casi siempre se resuelve cambiando el filtro; revisa también el nivel de agua y el colador. E5 es temperatura ambiente demasiado alta: libera las rejillas, verifica los espacios mínimos y protege el equipo del sol. E6 es temperatura ambiente demasiado baja; si el ambiente puede bajar de 2 °C, drena por completo. E7 y E8 son temperatura del agua fuera de rango: contacta a soporte. E9 es temperatura de descarga alta, otra vez rejillas y espacios libres. EA es corriente del compresor demasiado baja: contacta a soporte. Anota el código antes de llamarnos.",
      },
      {
        q: "Tarda más de lo normal en enfriar.",
        a: "Revisa el filtro antes que cualquier otra cosa: saturado, restringe el flujo y el equipo pierde eficiencia. Luego verifica que las rejillas estén libres y que se respeten los espacios mínimos, que la cubierta esté puesta entre sesiones, y que el equipo no esté recibiendo sol directo. Si nada de eso lo explica, escríbenos.",
      },
      {
        q: "El flujo de agua bajó.",
        a: "Filtro, nivel de agua y colador, en ese orden. Si el nivel quedó por debajo de la marca MIN, la bomba trabaja en vacío: apaga de inmediato y rellena. Operar sin agua daña la bomba y no lo cubre la garantía.",
      },
      {
        q: "La bomba hace ruido raro.",
        a: "Casi siempre es aire atrapado o nivel de agua bajo. Apaga, verifica que el agua supere la marca mínima del filtro y deja asentar unos minutos antes de volver a encender. Si el ruido sigue, no insistas: reportarlo temprano evita un daño mayor.",
      },
      {
        q: "Se formó hielo en las tuberías.",
        a: "Es una condición normal de trabajo cuando dejas el ajuste en 1 °C por periodos largos. Sube el ajuste unos grados y se resuelve.",
      },
      {
        q: "El equipo no enciende.",
        a: "Verifica que el interruptor de fuga del cable esté en RESET y su testigo encendido. Confirma que la unidad está conectada directo al muro, sin extensión ni multicontacto, y que el contacto tiene tierra física real. Si tu instalación tiene variaciones frecuentes de voltaje, hace falta un regulador.",
      },
      {
        q: "No logro conectarlo al Wi-Fi.",
        a: "El equipo solo se conecta a redes de 2.4 GHz. Si tu módem transmite 2.4 y 5 GHz con el mismo nombre, separa las bandas o conecta el teléfono a la de 2.4 durante la vinculación. Mantén presionada la tecla Wi-Fi del panel 5 segundos para entrar en emparejamiento, con Bluetooth y Wi-Fi activos en el teléfono. Si falla, apaga y enciende el equipo, acerca el teléfono y repite. La causa más común es señal débil en el punto de instalación.",
      },
      {
        q: "¿Qué app uso?",
        a: "Smart Life, disponible en App Store y Google Play. Desde ahí enciendes el equipo y ajustas la temperatura, que es lo que te permite dejarlo enfriando antes de llegar a casa. La app no sustituye la supervisión: nunca dejes el equipo operando sin vigilancia con personas o mascotas cerca.",
      },
      {
        q: "¿Puedo abrir el equipo para revisarlo?",
        a: "No. Adentro hay voltaje peligroso y refrigerante a presión, y cualquier intervención no autorizada deja la garantía sin efecto. Tampoco cortes la corriente de golpe con el equipo operando: apaga desde el panel, espera a que se detenga y después desconecta.",
      },
      {
        q: "¿Cómo se atiende una falla?",
        a: `Escríbenos al ${WA} con la descripción, fotos o video y, si aparece, el código de error. Agendamos una videollamada de diagnóstico con un técnico, que es el primer paso de cualquier reclamación y donde se resuelve buena parte de los casos. Con el resultado definimos la vía: traslado a nuestras instalaciones con guía prepagada, visita en sitio, técnico autorizado de tu estado, coordinación con tu propio técnico, o el envío de la refacción con instalación guiada por videollamada.`,
      },
    ],
  },
];

export const TOTAL_PREGUNTAS = CATEGORIAS.reduce((n, c) => n + c.preguntas.length, 0);
