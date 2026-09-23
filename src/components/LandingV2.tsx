"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Filter,
  Flame,
  Play,
  RotateCcw,
  Shield,
  ShieldCheck,
  Snowflake,
  VolumeX,
  Wifi,
  Wind,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { Calificacion } from "@/components/Calificacion";
import { Estrellas } from "@/components/Estrellas";
import { Reveal } from "@/components/Reveal";
import { LazyVideo } from "@/components/LazyVideo";
import { QuizCarousel } from "@/components/QuizCarousel";
import { RESENAS } from "@/lib/resenas";

/*
  Landing V2 — 1:1 port of the Claude Design "site_v2" landing
  (metal palette + ice-blue accent), over mentefria.com's real content,
  plus the comparison section (Mente Fria vs. otros) that was missing.
*/

const WHATSAPP = "https://wa.me/5215616471386";

/* ---------- Hotspots (MF ONE specs) ---------- */

/*
  Los siete puntos del showcase.

  La versión anterior tenía las siete escritas con la misma forma exacta:
  un dato técnico, punto, y una coletilla de beneficio con la misma cadencia.
  Cinco de las siete cerraban con un remate del tipo "sin un solo hielo",
  "todo el año", "listo cuando llegas", "sin ruido que lo interrumpa". Leídas
  seguidas suenan a plantilla, que es justo lo que Saul viene señalando.

  Reescritas para que cada una tenga su propia forma: unas son una frase,
  otras dos; unas abren con la cifra, otras con lo que resuelve. Ninguna
  cierra con eslogan.
*/
const HOTSPOTS = [
  { left: "14%", icon: Snowflake, k: "01 · Chiller", t: "Enfría a 1 °C", p: "El chiller es de 1 HP y tiene 3,500 W de capacidad de enfriamiento. Baja el agua entre 4 y 6 grados por hora." },
  { left: "26%", icon: Flame, k: "02 · Temperatura", t: "Calienta hasta 42 °C", p: "La misma tina que usas a 3 grados en la mañana la puedes tener a 38 por la noche." },
  { left: "38%", icon: Filter, k: "03 · Filtración", t: "Filtración", p: "La MF ONE trae filtro de papel y skimmer. Los inflables van con filtración de tres capas: papel, filtro integrado y malla antipolvo." },
  { left: "50%", icon: Wind, k: "04 · Purificación", t: "Ozono integrado", p: "El generador de ozono va dentro del equipo y se activa por ciclos. Es lo que mantiene el agua sin necesidad de cloro de alberca." },
  { left: "62%", icon: Wifi, k: "05 · Control", t: "Control por app Wi-Fi", p: "Programas la temperatura y los horarios desde el celular, así que llegas y el agua ya está donde la dejaste." },
  { left: "74%", icon: VolumeX, k: "06 · Silencioso", t: "68 dB(A) a un metro", p: "Es el nivel de una conversación normal. Puedes tenerla en una terraza sin discutir con los vecinos." },
  { left: "86%", icon: Shield, k: "07 · Estructura", t: "Acrílico y acero inoxidable", p: "Casco de acrílico de alta resistencia con acabados y componentes en acero inoxidable. Va bajo techo, adentro o afuera." },
];


/* ---------- Feature reveal ---------- */

/* Copy deliberadamente de gama, no de un solo producto: la MF ONE ajusta de
   1 a 40 °C y los inflables con Motor Premium 2.0 van de 3 a 42 °C (Saul, sep
   2026). Decir "de 1 a 42 °C según el equipo" cubre la línea completa sin
   atribuirle a ninguno un rango que no tiene. Lo mismo con la filtración, que es distinta en cada
   familia. Las imágenes anteriores eran capturas del sitio en inglés. */
/* "Filtración" pasó por tres versiones y cada una arregla lo de la anterior:

   1. Decía "filtración y ozono en toda la línea". Falso: la MF ONE no tiene el
      sistema de tres filtros de los inflables y el Motor Pro 2.0 no trae ozono
      (Rafa, sep 2026).
   2. Se acotó a la MF ONE, con un párrafo de entrada y dos palomitas. Quedó en
      233px contra 86 de las otras dos y desbalanceó el bloque.
   3. Ahora es abstracto y del mismo largo que los otros dos (Saul, sep 2026:
      "déjalo más abstracto, sin dejar en específico por modelo").

   Lo abstracto tiene que seguir siendo cierto para los tres equipos: por eso
   dice que cada modelo trae SU sistema, sin nombrar cuál, y no menciona ozono,
   que no está en todos. Lo de "sin cloro de alberca" sí aplica a la línea
   completa: usarlo anula la garantía. No se escribió "garantiza tu agua
   siempre limpia" para no comprometernos con una promesa absoluta. */
type Feature = {
  word: string;
  img: string;
  copy: string;
};

const FEATURES: Feature[] = [
  { word: "Temperatura", img: "/images/mfone-frio.jpg", copy: "De 1 a 42 °C según el equipo que elijas. Frío para recuperar, calor para relajar, ajustable al grado. Una sola tina para todo el año." },
  { word: "Filtración", img: "/images/ozono-agua.jpg", copy: "Cada modelo trae su propio sistema de filtración. El agua se mantiene limpia entre una inmersión y la siguiente, sin cloro de alberca." },
  { word: "Control", img: "/photography/feature/control-app-1049.jpg", copy: "Control total desde la app. Programa temperatura, horarios y tu ritual. El frío te espera listo cuando llegas a casa." },
];

/* Las reseñas que corren en la marquesina.

   Son CINCO, no las 22: si en el inicio se ven todas, la página de reseñas
   deja de tener sentido y el botón no lleva a nada nuevo. Y son cinco AL AZAR
   en cada carga, para que quien vuelva no encuentre siempre las mismas
   (Saul, sep 2026). El texto nunca se escribe aquí a mano: sale de la lista
   real de src/lib/resenas.ts.

   Tampoco se publica el promedio ni el total: solo las cinco estrellas. */
const CON_TEXTO = RESENAS.filter((r) => r.texto.trim().length > 0);

function cincoAlAzar() {
  const copia = [...CON_TEXTO];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, 5);
}

/* ---------- El frío en la vida real ---------- */

/* Los seis clips de la tira. Antes eran en-accion-home-1..6 y los seis salían
   del mismo evento de HYROX, salvo uno que era el shoot de las corredoras que
   Rafa descartó (Saul, sep 2026). Estos son reels YA EDITADOS del Drive
   (Shoots/REELS/FINALES, Shoots/GOLF, Shoots/REELS/VERTICAL), uno por
   actividad, recortados antes del cierre con logo y pasados a 720x1280. */
const VIDA_REAL = [
  { k: "golf", de: "Shoots/GOLF/REEL · GOLF MAXIMO" },
  { k: "surf", de: "Shoots/REELS/FINALES · MENTE FRIA SURF" },
  { k: "paddle", de: "Shoots/REELS/FINALES · PADELBOARD FINAL" },
  { k: "correr", de: "Shoots/REELS/VERTICAL · REEL 03" },
  { k: "tina-bosque", de: "Shoots/REELS/VERTICAL · REEL 02" },
  { k: "inmersion", de: "Shoots/REELS/VERTICAL · REEL 05" },
  { k: "bici", de: "Manejo De Redes 2025/11. NOVIEMBRE/REELS · REEL BICI" },
  { k: "casa", de: "Shoots/REELS/FINALES · MENTE FRIA HOUSE 1" },
];

/* ---------- Ocho Razones ---------- */

/*
  Las ocho razones. Copy heredado de mentefria.com, reescrito por tres motivos:

  1. La séptima decía "estudios muestran que la inmersión helada puede elevar
     tu tasa metabólica hasta un 80%". Ni el estudio ni la cifra tienen
     respaldo localizable, y "estudios muestran" sin nombrar cuál es
     precisamente lo que no queremos publicar. Se sustituye por lo que sí está
     documentado: la activación de grasa parda.
  2. Siete de las ocho terminaban con el mismo gerundio explicativo
     (reduciendo, estimulando, generando, desarrollando, ayudándote,
     fortaleciendo). Leídas en fila sonaban a plantilla.
  3. "La MF Plunge" no es el nombre de ningún producto.

  Cada una lleva a su artículo, donde sí están las fuentes.
*/
const RAZONES = [
  { img: "/photography/modelaje/modelo-01.jpg", t: "Acelera la recuperación", p: "El agua fría contrae los vasos sanguíneos y baja la hinchazón y el daño muscular. Al día siguiente amaneces con menos peso encima y la siguiente sesión cuesta menos." , slug: "acelera-la-recuperacion" },
  { img: "/photography/action/running-02.jpg", t: "Mejora el ánimo", p: "La inmersión dispara la dopamina muy por encima de su nivel de reposo. El efecto no se queda en los tres minutos: se sostiene durante horas." , slug: "mejora-el-animo" },
  { img: "/photography/mfone-patio/salida.jpg", t: "Energía natural", p: "El choque térmico libera adrenalina y noradrenalina de inmediato. Es un estado de alerta y claridad que dura buena parte de la mañana, sin cafeína." , slug: "energia-natural" },
  { img: "/photography/action/hyrox-01.jpg", t: "Reduce la inflamación", p: "El frío frena la actividad metabólica que genera inflamación. Baja el dolor, la hinchazón y la rigidez articular, la del entrenamiento y la del día a día." , slug: "reduce-la-inflamacion" },
  { img: "/photography/mfone-patio/inmersion.jpg", t: "Mayor resiliencia", p: "Meterte al agua a 3 °C y quedarte quieto es un ejercicio de control. Entrenas a tu sistema nervioso a sostener la calma cuando el cuerpo pide salir." , slug: "mayor-resiliencia" },
  { img: "/photography/lifestyle/barrel-chimenea.jpg", t: "Mejor descanso", p: "El frío activa tu sistema nervioso parasimpático y baja la temperatura corporal. El cuerpo entra más fácil en la fase profunda del sueño." , slug: "mejor-descanso" },
  { img: "/photography/lifestyle/vallarta-padel-03.jpg", t: "Acelera el metabolismo", p: "El frío activa la grasa parda, un tejido que quema calorías para producir calor. Es el mecanismo que está detrás del gasto energético extra." , slug: "acelera-el-metabolismo" },
  { img: "/photography/lifestyle/surf-01.jpg", t: "Acelera el sistema inmune", p: "La exposición al agua fría estimula la producción de glóbulos blancos, que son las células con las que tu cuerpo pelea las infecciones." , slug: "acelera-el-sistema-inmune" },
];

/* Productos — precios y bullets reales de mentefria.com.
   Triángulo estilo WHOOP: Barrel (izq, abajo) · MF ONE (centro, ESTELAR) · Horizon (der, abajo).

   anchoFoto = qué tanto de su columna ocupa la foto, para que las tres tinas
   guarden su proporción REAL de altura: MF Barrel 90 cm, MF ONE 71, Horizon 65.

   Va en PORCENTAJE y no en píxeles fijos: en píxeles, al angostarse la pantalla
   cada foto topaba con su columna en distinto momento y la proporción se rompía
   (a 900px de ancho quedaban en 1.44, 1.75 y 0.99 px por cm). En porcentaje las
   tres encogen juntas.

   Se escala por TAMAÑO GENERAL, no por altura. Igualando alturas, la MF ONE
   (195 cm de largo) y el Horizon (160) se veían chicos junto al Barrel, que es
   alto pero mide 90 × 90 (Saul, sep 2026). Y no se puede igualar largo y alto a
   la vez: las tres fotos están tomadas con distinta perspectiva, así que en el
   archivo el Horizon se ve 1.81 veces más largo que alto cuando en la realidad
   es 2.46 veces. El criterio es la media geométrica de largo y alto —90 cm para
   el Barrel, 118 para la MF ONE, 102 para el Horizon—, medida sobre la tina
   recortada dentro de cada archivo, que ocupa 67.0% del ancho en el Barrel,
   94.3% en la MF ONE y 60.8% en el Horizon.

   Ajuste al Barrel: con la media geométrica pura quedaba igual de alto que la
   MF ONE, cuando en la realidad es 19 cm más alto, y se veía chico (Saul, sep
   2026). Va 15% arriba del cálculo, 68% en vez de 59%: así recupera su altura
   y la MF ONE sigue siendo la más grande en tamaño general.

   El Horizon queda al 100%: es el que más columna necesita y no puede salirse.
   La MF ONE lleva dos valores porque su columna es más ancha (es la estelar):
   76% en una columna normal y 60% en la suya. Si se cambia una foto, hay que
   recalcular. */
const PRODUCTOS = [
  {
    name: "MF BARREL",
    price: "$69,000",
    img: "/images/prod-barrel-nobg.png",
    floor: "58%",
    href: "/productos/mf-barrel",
    anchoFoto: "w-[68%]",
    featured: false,
    bullets: ["Filtración de 3 capas + purificación por ozono.", "Control por app Wi-Fi, programable desde tu celular.", "6 meses de garantía."],
  },
  {
    name: "MF ONE",
    price: "$169,000",
    img: "/images/prod-mfone.webp",
    floor: "58%",
    href: "/productos/mf-one",
    anchoFoto: "w-[76%] lg:w-[60%]",
    featured: true,
    bullets: ["Diseño All-In-One con el chiller dentro de la tina.", "Filtro de papel + ozono integrado.", "Control por app Wi-Fi. 12 meses de garantía."],
  },
  {
    name: "MF HORIZON",
    price: "$74,000",
    img: "/images/prod-horizon-nobg.png",
    floor: "58%",
    href: "/productos/mf-horizon",
    // Iba a 137% "para tamaño visual ~ONE" y terminaba saliéndose de la caja
    // y cortándose por los lados. A 98% cabe y queda parejo con la MF ONE.
    anchoFoto: "w-full",
    nudge: "lg:translate-x-2 lg:-translate-y-1.5",
    featured: false,
    bullets: ["Filtración de 3 capas + purificación por ozono.", "Control por app Wi-Fi, programable desde tu celular.", "6 meses de garantía."],
  },
];

/* Trust trio — real de mentefria.com */
const TRUST = [
  { icon: RotateCcw, k: "30 días", t: "Pruébala sin riesgo", p: "Si no es la mejor cold plunge que has probado, te regresamos tu dinero. Sin preguntas y sin trámites." },
  { icon: ShieldCheck, k: "Garantía", t: "12 meses en la MF ONE", p: "Seis meses en los modelos inflables. Y cuando se acabe la garantía, nos sigues escribiendo." },
  { icon: CreditCard, k: "Hasta 6 MSI", t: "Financiamiento disponible", p: "Meses sin intereses con tarjetas participantes a través de Mercado Pago." },
];

/* ---------- Comparison (new section) ---------- */

/* Comparativa real de mentefria.com — "La tecnología de cold plunge #1 en MX" */
const COMPARE_ROWS: { mf: string; otras: string }[] = [
  { mf: "Enfriamiento activo hasta 1 °C", otras: "Dependes de comprar hielo" },
  { mf: "Calienta hasta 42 °C", otras: "Solo frío" },
  { mf: "Temperatura y horarios desde la app", otras: "Ajuste manual, si acaso" },
  { mf: "Ozono trabajando dentro del equipo", otras: "Cloro, o cambiar el agua" },
  { mf: "Filtración de hasta 3 capas", otras: "Sin sistema de filtrado" },
  { mf: "Garantía y alguien que contesta después", otras: "Compra y arréglatelas" },
];

/* ---------- Testimonials ---------- */

const TESTIMONIALS: { img: string; who: string; role: string; video?: string }[] = [
  /*
    Cada tarjeta lleva SU video, y la miniatura sale de un fotograma de ese
    mismo video. Antes las portadas eran fotos de archivo sin relación con el
    material: la de Pato era una foto de Hyrox.

    Primero los testimonios, que es gente hablando a cámara: Kevin, Pato y
    Rodrigo. Luego las dos de actividad.

    La última NO lleva nombre a propósito: el video de surf muestra a un
    HOMBRE y esa tarjeta decía "Ana". Publicar el nombre de alguien sobre la
    cara de otra persona es peor que no ponerlo. En cuanto se sepa quién es,
    se nombra.

    La tarjeta "Vista a la ciudad" se agregó en sep 2026 porque las cinco
    anteriores eran todas de hombres (Rafa). Sale del shoot brutalista, del
    reel "Time is the ultimate asset" publicado en @mentefria.therapy, y la
    eligió Saul entre tres momentos. Está bajada de Instagram, así que es
    720x1280 recomprimido: el master vive en Drive (Shoots / BRUTAL BUILDING /
    Videos, "Mente Fira ALL for Facu.mov", 9.87 GB) y de ahí saldría en mejor
    calidad y con el plano más largo.

    Descartados, no volver a proponerlos: el reel de HYROX (Saul no quiere
    material de ese evento), reel-horizontal-01 con la mujer en la terraza (no
    se ve ninguna actividad) y el reel de carrera (Rafa no quiere a esas
    modelos).
  */
  { img: "/photography/testimonios/kevin.jpg", who: "Kevin", role: "Atleta", video: "/videos/testimonial-kevin.mp4" },
  { img: "/photography/testimonios/patricio.jpg", who: "Dr. Patricio Ochoa", role: "Medicina deportiva", video: "/videos/testimonial-patricio.mp4" },
  { img: "/photography/testimonios/rodrigo.jpg", who: "Rodrigo", role: "Rutina en casa", video: "/videos/testimonial-rodrigo.mp4" },
  { img: "/photography/testimonios/zerecero.jpg", who: "Pato Zerecero", role: "Atleta", video: "/videos/testimonial-zerecero.mp4" },
  { img: "/photography/testimonios/ciudad.jpg", who: "Vista a la ciudad", role: "Sesión de inmersión", video: "/videos/testimonial-ciudad.mp4" },
];

/* ---------- Review wall ---------- */

/* Las mismas fotos que usa /negocios para cada tipo de espacio. Antes eran fotos
   de actividad sin relación con la tarjeta —una mujer en paddleboard decía
   "Hoteles", un corredor decía "Clínicas"— y no coincidían con la página de
   negocios, que muestra lo mismo (Saul, sep 2026). */
const B2B = [
  { img: "/images/negocios/hoteles.jpg", who: "Hoteles", role: "Spa & terraza" },
  { img: "/images/negocios/gimnasios.jpg", who: "Gyms & Box", role: "Recuperación" },
  { img: "/images/negocios/spas.jpg", who: "Spas", role: "Wellness" },
  { img: "/images/negocios/clinicas.jpg", who: "Clínicas", role: "Fisioterapia" },
  { img: "/images/negocios/estudios.jpg", who: "Studios", role: "Recovery" },
];

/* ---------- Small helpers ---------- */

function Counter({
  target,
  from = 0,
  suffix,
  duration = 1100,
  tone,
}: {
  target: number;
  /** starting value — set above `target` to count DOWN (e.g. 20 → 3 °C) */
  from?: number;
  suffix?: string;
  duration?: number;
  tone?: "cold" | "heat";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          // ease-out — the last degrees "cost" more, like real cooling
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(from + eased * (target - from)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, from, duration]);

  return (
    <div ref={ref} className={`n${tone === "cold" ? " n-cold" : tone === "heat" ? " n-heat" : ""}`}>
      {val}
      {suffix ? <span className="u">{suffix}</span> : null}
    </div>
  );
}

/* ==================================================================== */

export function LandingV2() {
  const [spot, setSpot] = useState<number | null>(0);

  /* La marquesina arranca con las cinco primeras —lo mismo que pinta el
     servidor— y se baraja al montar. Sortear durante el render rompería la
     hidratación: servidor y navegador sacarían reseñas distintas. */
  const [marquesina, setMarquesina] = useState(() => CON_TEXTO.slice(0, 5));
  useEffect(() => {
    setMarquesina(cincoAlAzar());
  }, []);
  const [feature, setFeature] = useState(0);
  const [featurePaused, setFeaturePaused] = useState(false);
  /* testimonio reproduciéndose inline (índice de card, uno a la vez) */
  const [playing, setPlaying] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);

  /* Hero parallax — subtle, scroll-driven, rAF-throttled */
  useEffect(() => {
    const media = heroMediaRef.current;
    if (!media) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          media.style.transform = `translateY(${y * 0.18}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Rotación automática de las tres características, en todos los tamaños.
     Estuvo apagada en angosto mientras Filtración era mucho más largo que los
     otros dos: el bloque reservaba el alto del más largo y quedaba un hueco.
     Con los tres textos parejos vuelve a rotar en todas partes, como estaba. */
  useEffect(() => {
    if (featurePaused) return;
    const id = setInterval(() => setFeature((f) => (f + 1) % FEATURES.length), 4200);
    return () => clearInterval(id);
  }, [featurePaused]);

  /* detener video inline con Esc */
  useEffect(() => {
    if (playing === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  const scrollTrack = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = Math.min(track.clientWidth * 0.8, 380);
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <main className="bg-[var(--bg-metal)] text-[var(--fg-metal)]">
      {/* ===== HERO ===== */}
      <header className="mhero" id="top">
        <div className="mhero-media" ref={heroMediaRef}>
          {/* Portada: foto real de la MF ONE nueva (sesión de patio, sep 2026).
              Sustituye al render CGI de concreto, que se leía como imagen de
              stock generada. Tres recortes del mismo original: 16:9 para
              escritorio, y para teléfono uno que corta la pared de ladrillo de
              arriba. Al acortar el hero en móvil (sep 2026) el 2:3 dejaba la
              tina justo detrás del titular; con la pared recortada la tina sube
              y el piso oscuro queda abajo, que es donde va el texto. */}
          <picture>
            <source
              media="(max-width: 840px)"
              srcSet="/photography/hero/mf-one-patio-movil.jpg"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photography/hero/mf-one-patio.jpg"
              alt="MF ONE instalada en un patio, con una persona sumergida en el agua"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="mhero-inner mwrap !max-w-none w-full">
          <div className="m-eyebrow !text-[var(--m-blue-400)] !text-[13px] !font-semibold [text-shadow:0_1px_14px_rgba(8,9,11,0.55)]">Wellness para los que valoran su tiempo</div>
          <h1>
            La cold plunge
            <br />
            #1 en México
          </h1>
          <p>Recuperarte y rendir al máximo desde casa no había sido posible hasta ahora.</p>
          <div className="mhero-ctas">
            <Link href="/productos" className="mbtn mbtn-solid-light">
              Explora MENTE FRIA
            </Link>
          </div>
        </div>
      </header>

      {/* ===== SHOWCASE + HOTSPOTS ===== */}
      <section className="msection" id="showcase">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Ingeniería del frío</span>
            <h2>Todo en una sola pieza.</h2>
            <p>
              La MF ONE integra chiller, filtración y purificación en un solo cuerpo de acero
              inoxidable. Explora cada componente.
            </p>
          </Reveal>
        </div>
        <Reveal className="showcase">
          <div className="showcase-stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src="/photography/hero/mf-one-render-showcase.jpg" alt="MF ONE con su Pro Deck" />
            {HOTSPOTS.map((h, i) => (
              <div key={h.k} className={`hotspot floor${spot === i ? " active" : ""}`} style={{ left: h.left }}>
                <button aria-label={h.t} onClick={() => setSpot(spot === i ? null : i)}>
                  <h.icon size={16} strokeWidth={2} />
                </button>
                <div className="pop">
                  <div className="k">{h.k}</div>
                  <h4>{h.t}</h4>
                  <p>{h.p}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== FEATURE REVEAL ===== */}
      <section className="msection dark-s mfeature-section" id="features">
        <div className="mwrap">
          <div className="mfeature">
            <Reveal className="mfeature-col">
              <div className="mfeature-words">
                {FEATURES.map((f, i) => (
                  <button
                    key={f.word}
                    className={`w${feature === i ? " active" : ""}`}
                    onClick={() => {
                      setFeature(i);
                      setFeaturePaused(true);
                    }}
                  >
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    {f.word}
                  </button>
                ))}
              </div>
              {/* Los tres textos van encimados en la misma celda y solo se ve el
                  activo: así el bloque toma el alto del más largo (Filtración)
                  y no brinca cada vez que rota la pestaña. */}
              <div className="mfeature-copy">
                {FEATURES.map((f, i) => (
                  <div
                    key={f.word}
                    className={`fc${feature === i ? " active" : ""}`}
                    aria-hidden={feature !== i}
                  >
                    <p>{f.copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="mfeature-media">
              {FEATURES.map((f, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async"
                  key={f.word}
                  src={f.img}
                  alt={f.word}
                  className={feature === i ? "active" : undefined}
                />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== OCHO RAZONES ===== */}
      <section className="msection panel" id="benefits">
        <div className="mwrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 text-left">
            <div>
              <span className="m-eyebrow accent">La ciencia del frío</span>
              <h2 className="mdisplay mt-3 text-[clamp(30px,4vw,56px)]" style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}>
                Ocho razones to plunge.
              </h2>
            </div>
            <p className="m-0 max-w-[38ch] text-[15px] text-[var(--fg-muted)]">
              Cada inmersión activa una cascada fisiológica. Esto es lo que el frío le hace a tu
              cuerpo.
            </p>
          </Reveal>
          <Reveal className="bcar">
            <div className="bcar-track" ref={trackRef}>
              {RAZONES.map((r, i) => (
                <article key={r.t} className="bcard stagger-i" style={{ "--i": i } as React.CSSProperties}>
                  <Link href={`/blog/${r.slug}`} className="group block">
                    <div className="img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" decoding="async" src={r.img} alt={r.t} />
                      <span className="tag">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3>{r.t}</h3>
                    <p>{r.p}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-[12.5px] font-medium text-[var(--accent-ice)]">
                      Leer el artículo
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
            <div className="bcar-nav">
              <button aria-label="Anterior" onClick={() => scrollTrack(-1)}>
                <ArrowLeft size={18} />
              </button>
              <button aria-label="Siguiente" onClick={() => scrollTrack(1)}>
                <ArrowRight size={18} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== COMPARISON (Mente Fria vs. otros) ===== */}
      <section className="msection" id="compare">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Sin competencia</span>
            <h2>La tecnología de cold plunge #1 en MX.</h2>
          </Reveal>
          <Reveal className="compare-scroll">
            <table className="compare !min-w-[560px]">
              <thead>
                <tr>
                  <th className="col-mf">
                    MENTE FRIA <span className="block text-[10px] font-normal tracking-[0.18em] text-[var(--m-blue-400)]">#1 EN MX</span>
                  </th>
                  <th>Otras</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((r, i) => (
                  <tr key={r.mf} style={{ "--i": i } as React.CSSProperties}>
                    <td className="col-mf">
                      <span className="yes">✓</span>&nbsp;&nbsp;{r.mf}
                    </td>
                    <td>
                      <span className="no">✕</span>&nbsp;&nbsp;{r.otras}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal className="mt-10 text-center">
            <a
              href="#productos"
              className="mbtn mbtn-blue"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Encuentra tu cold plunge
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== TRUST (real de mentefria.com) ===== */}
      <section className="panel !py-0">
        <div className="mwrap">
          <div className="grid gap-5 py-[clamp(16px,2.5vh,28px)] md:grid-cols-3">
            {TRUST.map((t, i) => (
              <Reveal key={t.t} delay={i * 100}>
                <div className="flex h-full flex-col rounded-[16px] border border-[var(--line-1)] bg-white p-7 text-center">
                  <t.icon size={26} strokeWidth={1.8} className="mx-auto mb-4 text-[var(--accent-ice)]" />
                  <span className="m-eyebrow accent">{t.k}</span>
                  <h3 className="mdisplay mt-3 text-[21px] leading-tight">{t.t}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                    {t.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTOS (después de explorar — real de mentefria.com) ===== */}
      <section className="msection !pb-4" id="productos">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Nuestros plunges</span>
            <h2>Encuentra la cold plunge perfecta para ti.</h2>
          </Reveal>
        </div>
        {/* Contenedor ancho: el bloque completo de productos escala ~15% (misma proporción) */}
        <div className="mx-auto w-[min(1500px,94vw)] px-[clamp(20px,3vw,40px)]">
          {/* Triángulo WHOOP: MF ONE estelar al centro, laterales más abajo */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr_1fr] lg:items-start">
            {PRODUCTOS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 100}
                className={p.featured ? "relative z-10" : "lg:mt-4"}
              >
                <Link href={p.href} className="group block">
                  {/* El piso gris lo pone .pfloor, la misma pieza que usan el
                      menú desplegable, /productos y /negocios. El producto
                      desborda la bandeja por arriba. */}
                  <div className="pfloor" style={{ "--floor-top": p.floor } as React.CSSProperties}>
                    <div
                      /* Misma caja para las tres: la losa tiene que leerse como
                         la misma bandeja en las tres tarjetas. Lo que distingue a
                         la estelar es la columna mas ancha y el -mt-6, no un piso
                         de otro tamano.

                         El alto sí cambia con el ancho, porque la foto cambia de
                         tamaño con su columna y la caja estaba fija en 300px:
                         sobraban entre 91 y 124px de blanco arriba de cada
                         producto en computadora, y entre 114 y 143 en telefono
                         (Saul, sep 2026: "espacios muertos innecesarios"). En
                         tres columnas el alto sigue al ancho de la ventana
                         (14vw, entre 140 y 215px), porque la foto crece y
                         encoge con su columna: un numero fijo dejaba 90px de
                         blanco a 1024 y nada a 1440. Asi las tres bandejas
                         quedan a pocos pixeles una de otra y la foto llena. En
                         una sola columna la caja mide lo que pida la foto.

                         La reja pasa a tres columnas hasta 1024px, no 768: en un
                         iPad vertical las tres columnas dejaban fotos de 100px
                         dentro de la bandeja, con 110px de blanco encima de cada
                         una. Ahi va en una sola columna, como en telefono. */
                      className="flex min-h-[176px] items-end justify-center px-4 pb-9 lg:min-h-[clamp(140px,14vw,215px)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" decoding="async"
                        src={p.img}
                        alt={p.name}
                        className={`h-auto flex-none object-contain transition-transform duration-500 group-hover:scale-[1.04] ${p.anchoFoto} ${"nudge" in p && p.nudge ? p.nudge : ""}`}
                      />
                    </div>
                  </div>
                  {/* La pildora vivia dentro de .pfloor. Su `absolute` no ganaba,
                      asi que ocupaba flujo y le sumaba 24px de alto solo a esta
                      tarjeta: por eso su losa salia mas alta que las otras dos.
                      Fuera de la losa y junto al titulo se arregla lo uno y lo otro. */}
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <h3
                      className={`mdisplay ${p.featured ? "text-[28px]" : "text-[22px]"}`}
                      style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                    >
                      {p.name}
                    </h3>
                    {p.featured && (
                      <span className="rounded-full bg-[var(--m-ink)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        Más vendido
                      </span>
                    )}
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {p.bullets.map((b) => (
                      <li key={b} className="text-[13px] leading-relaxed text-[var(--fg-muted)]">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-ice)] transition-colors group-hover:text-[var(--m-blue-600)]">
                    Ver ahora <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUIZ =====
          Va justo después de la reja de productos, que es donde aparece la
          duda: ya vio los tres y no sabe cuál. Antes de esto sólo estaba en
          el mega-menú y no lo encontraba nadie. */}
      <section className="msection !bg-white" id="quiz">
        <div className="mwrap">
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <h2
                className="mdisplay text-[clamp(34px,4.6vw,60px)] leading-[1.02]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                ¿Cuál de las tres
                <br />
                es para ti?
              </h2>
              <p
                className="mt-6 max-w-[38ch] text-[17px] leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                Siete preguntas y te decimos cuál de las tres cabe en tu espacio
                y en tu presupuesto.
              </p>
              <Link href="/quiz" className="mbtn mbtn-primary mt-9">
                Empezar el quiz
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            {/* Las tres rotando, para que no parezca que la recomendación ya
                está decidida. Se probó con las tres juntas en una sola imagen y
                no funciona: perspectivas y fondos distintos, el Barrel trae su
                motor al lado y el Horizon es blanco. Rotando sí, porque cada una
                se ve en su propio cuadro. */}
            <Reveal delay={120}>
              <QuizCarousel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== STATS (dark) ===== */}
      <section className="msection dark-s">
        <div className="mwrap">
          <div className="stats-wrap">
            <Reveal className="stats-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src="/photography/product/mf-one-courtyard.jpg" alt="MF ONE en patio" className="!object-cover !p-0" />
            </Reveal>
            <Reveal>
              <span className="m-eyebrow accent">Por los números</span>
              <h2
                className="mdisplay my-[14px] mb-8 text-[clamp(28px,3.5vw,48px)]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                Ingeniería que se siente.
              </h2>
              <div className="stats-grid">
                <div className="stat">
                  <Counter from={20} target={1} duration={1800} suffix="°C" tone="cold" />
                  <div className="l">Enfría sin fallar, sin un solo hielo.</div>
                </div>
                <div className="stat">
                  <Counter target={40} suffix="°C" tone="heat" />
                  <div className="l">Calienta como jacuzzi. Una tina, todo el año.</div>
                </div>
                <div className="stat">
                  <div className="n">
                    8,000<span className="u">L/h</span>
                  </div>
                  <div className="l">Caudal de la bomba: el agua circula sin parar, con ozono integrado.</div>
                </div>
                <div className="stat">
                  <Counter target={0} />
                  <div className="l">Hielos requeridos. Cero mantenimiento diario.</div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/productos/mf-one#ficha-tecnica" className="mbtn mbtn-solid-light">
                  Ver ficha técnica completa
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS VIDEO ROW ===== */}
      <section className="msection">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Personas reales</span>
            <h2>Resultados reales.</h2>
            <p>Atletas, médicos y gente que convirtió el frío en su parte favorita del día.</p>
          </Reveal>
          <Reveal className="vrow">
            {TESTIMONIALS.map((t, i) => (
              /* La tarjeta es un div, no un button: el <video controls> vivía
                 DENTRO del botón, que es HTML inválido. Cada clic en los
                 controles del video subía hasta el botón y desordenaba el
                 estado, y terminaban sonando dos audios encima. Ahora el área
                 clicable es una capa aparte que desaparece al reproducir. */
              <div
                key={t.who}
                className={`vcard stagger-i${playing === i ? " playing" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                {playing === i && t.video ? (
                  <video
                    src={t.video}
                    autoPlay
                    controls
                    playsInline
                    onPlay={(e) => {
                      // Cinturón y tirantes: al arrancar uno, se callan todos
                      // los demás videos de la página.
                      const yo = e.currentTarget;
                      document.querySelectorAll("video").forEach((v) => {
                        if (v !== yo && !v.muted && !v.paused) v.pause();
                      });
                    }}
                    onEnded={() => setPlaying(null)}
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img loading="lazy" decoding="async" src={t.img} alt={t.who} />
                )}

                {t.video && playing !== i && (
                  <button
                    className="vhit"
                    onClick={() => setPlaying(i)}
                    aria-label={`Ver video de ${t.who}`}
                  >
                    <span className="play">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </button>
                )}

                <div className="cap">
                  <div className="who">{t.who}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== EN ACCIÓN (videos reales del sitio original) ===== */}
      <section className="msection dark-s" id="accion">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Mente Fria en acción</span>
            <h2>El frío, en la vida real.</h2>
          </Reveal>
          <Reveal className="bcar">
            <div className="bcar-track">
              {VIDA_REAL.map((v) => (
                <div key={v.k} className="bcard">
                  <div className="img">
                    {/* El poster es obligatorio: sin él, cuando el navegador
                        bloquea el autoplay —modo de bajo consumo, ahorro de
                        datos, o la preferencia del usuario— los seis videos
                        quedan como rectángulos vacíos sobre la sección
                        oscura y la sección se ve muerta. Con poster siempre
                        hay imagen, se reproduzca o no.

                        LazyVideo además difiere la descarga hasta que la
                        sección entra en pantalla: son los seis archivos más
                        pesados del home y arrancaban todos al cargar. */}
                    <LazyVideo
                      src={`/videos/vida-real/${v.k}.mp4`}
                      poster={`/videos/posters/vida-real-${v.k}.jpg`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== RESEÑAS — barra de calificación ===== */}

      {/* Antes aquí caía el muro completo: 23 reseñas en mosaico, de golpe.
          Rafa (sep 2026): a la mayoría no le interesa leerlas y ocupaban media
          página. Queda la barra de calificación, como la que usan las tiendas,
          y quien quiera leerlas entra a /resenas, que ya es el listado
          completo. El promedio y el total salen de los datos, no están
          escritos a mano. */}
      <section className="msection panel" id="reviews">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Reseñas</span>
            <div className="mt-6">
              <Calificacion />
            </div>

          </Reveal>
        </div>

        {/* La tira va a todo el ancho, fuera del contenedor: se tiene que ver
            que sigue corriendo más allá de la pantalla. */}
        <Reveal className="rmarquee">
          <div className="rmarquee-track">
            {[...marquesina, ...marquesina].map((r, i) => (
              <figure key={r.nombre + i} className="rmarquee-card" aria-hidden={i >= marquesina.length}>
                <Estrellas valor={r.estrellas} tam={15} className="mb-3.5" />
                <p>&ldquo;{r.texto}&rdquo;</p>
                <figcaption className="nm">{r.nombre}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <div className="mwrap !mt-14 flex justify-center">
          <Reveal>
            <Link href="/resenas" className="mbtn mbtn-primary">
              Ver todas las reseñas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== B2B ===== */}
      <section className="msection dark-s" id="b2b">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Para negocios</span>
            <h2>Donde se practica el frío.</h2>
            <p>
              Equipamos gimnasios, hoteles de lujo, spas, clínicas de fisio y wellness clubs en
              todo México. Instalación, capacitación y soporte incluidos.
            </p>
          </Reveal>
          <Reveal className="vrow">
            {B2B.map((b, i) => (
              <div key={b.who} className="vcard stagger-i !cursor-default" style={{ "--i": i } as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={b.img} alt={b.who} />
                <div className="cap">
                  <div className="who">{b.who}</div>
                  <div className="role">{b.role}</div>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10 text-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mbtn mbtn-blue"
            >
              Cotiza para tu negocio
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== CHAT FAB ===== */}
      <a
        className="chat-fab"
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
      >
        <WhatsAppIcon width={24} height={24} />
      </a>

    </main>
  );
}
