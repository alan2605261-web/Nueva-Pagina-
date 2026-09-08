"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  Flame,
  MessageCircle,
  Play,
  Shield,
  Snowflake,
  VolumeX,
  Wifi,
  Wind,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

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
  { left: "26%", icon: Flame, k: "02 · Temperatura", t: "Calienta hasta 40 °C", p: "La misma tina que usas a 3 grados en la mañana la puedes tener a 38 por la noche." },
  { left: "38%", icon: Filter, k: "03 · Filtración", t: "Filtración", p: "La MF ONE trae filtro de papel y skimmer. Los inflables van con filtración de tres capas: papel, filtro integrado y malla antipolvo." },
  { left: "50%", icon: Wind, k: "04 · Purificación", t: "Ozono integrado", p: "El generador de ozono va dentro del equipo y se activa por ciclos. Es lo que mantiene el agua sin necesidad de cloro de alberca." },
  { left: "62%", icon: Wifi, k: "05 · Control", t: "App Smart Life", p: "Programas la temperatura y los horarios desde el celular, así que llegas y el agua ya está donde la dejaste." },
  { left: "74%", icon: VolumeX, k: "06 · Silencioso", t: "68 dB(A) a un metro", p: "Es el nivel de una conversación normal. Puedes tenerla en una terraza sin discutir con los vecinos." },
  { left: "86%", icon: Shield, k: "07 · Estructura", t: "Acrílico y acero inoxidable", p: "Casco de acrílico de alta resistencia con acabados y componentes en acero inoxidable. Va bajo techo, adentro o afuera." },
];


/* ---------- Feature reveal ---------- */

/* Copy deliberadamente de gama, no de un solo producto: la MF ONE ajusta de
   1 a 40 °C y los inflables con Motor Premium 2.0 van de 3 a 42 °C. Decir "de
   1 a 42 °C según el equipo" cubre la línea completa sin atribuirle a ninguno
   un rango que no tiene. Lo mismo con la filtración, que es distinta en cada
   familia. Las imágenes anteriores eran capturas del sitio en inglés. */
const FEATURES = [
  { word: "Temperatura", img: "/images/mfone-frio.jpg", copy: "De 1 a 42 °C según el equipo que elijas. Frío para recuperar, calor para relajar, ajustable al grado. Una sola tina para todo el año." },
  { word: "Filtración", img: "/images/ozono-agua.jpg", copy: "Filtración y ozono en toda la línea: filtro de papel y skimmer en la MF ONE, filtración de 3 capas en los inflables. Agua cristalina, sin cloro de alberca." },
  { word: "Control", img: "/photography/feature/control-app-1049.jpg", copy: "Control total desde la app. Programa temperatura, horarios y tu ritual. El frío te espera listo cuando llegas a casa." },
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
  { img: "/photography/action/golf-01.jpg", t: "Energía natural", p: "El choque térmico libera adrenalina y noradrenalina de inmediato. Es un estado de alerta y claridad que dura buena parte de la mañana, sin cafeína." , slug: "energia-natural" },
  { img: "/photography/lifestyle/bajo-bajio-06.jpg", t: "Reduce la inflamación", p: "El frío frena la actividad metabólica que genera inflamación. Baja el dolor, la hinchazón y la rigidez articular, la del entrenamiento y la del día a día." , slug: "reduce-la-inflamacion" },
  { img: "/photography/action/hyrox-02.webp", t: "Mayor resiliencia", p: "Meterte al agua a 3 °C y quedarte quieto es un ejercicio de control. Entrenas a tu sistema nervioso a sostener la calma cuando el cuerpo pide salir." , slug: "mayor-resiliencia" },
  { img: "/photography/modelaje/modelo-04.jpg", t: "Mejor descanso", p: "El frío activa tu sistema nervioso parasimpático y baja la temperatura corporal. El cuerpo entra más fácil en la fase profunda del sueño." , slug: "mejor-descanso" },
  { img: "/photography/action/golf-02.jpg", t: "Acelera el metabolismo", p: "El frío activa la grasa parda, un tejido que quema calorías para producir calor. Es el mecanismo que está detrás del gasto energético extra." , slug: "acelera-el-metabolismo" },
  { img: "/photography/lifestyle/surf-02.jpg", t: "Acelera el sistema inmune", p: "La exposición al agua fría estimula la producción de glóbulos blancos, que son las células con las que tu cuerpo pelea las infecciones." , slug: "acelera-el-sistema-inmune" },
];

/* Productos — precios y bullets reales de mentefria.com.
   Triángulo estilo WHOOP: Barrel (izq, abajo) · MF ONE (centro, ESTELAR) · Horizon (der, abajo).
   scale = tamaño relativo real (ONE 200 cm · Horizon 160 cm · Barrel Ø90 cm) */
const PRODUCTOS = [
  {
    name: "MF BARREL",
    price: "$69,000",
    img: "/images/prod-barrel-nobg.png",
    href: "/productos/mf-barrel",
    scale: "88%",
    featured: false,
    bullets: ["Filtración de 3 capas + purificación por ozono.", "Control WiFi programable desde tu celular.", "6 meses de garantía."],
  },
  {
    name: "MF ONE",
    price: "$169,000",
    img: "/images/prod-mfone.webp",
    href: "/productos/mf-one",
    scale: "90%",
    featured: true,
    bullets: ["Diseño All-In-One con el chiller dentro de la tina.", "Filtro de papel + ozono integrado.", "Control desde la app Smart Life. 12 meses de garantía."],
  },
  {
    name: "MF HORIZON",
    price: "$74,000",
    img: "/images/prod-horizon-nobg.png",
    href: "/productos/mf-horizon",
    scale: "137%", // col angosta: >100% para tamaño visual ~ONE
    nudge: "md:translate-x-2 md:-translate-y-1.5",
    featured: false,
    bullets: ["Filtración de 3 capas + purificación por ozono.", "Control WiFi programable desde tu celular.", "6 meses de garantía."],
  },
];

/* Trust trio — real de mentefria.com */
const TRUST = [
  { k: "30 días", t: "Pruébala sin riesgo", p: "Si no es la mejor cold plunge que has probado, te regresamos tu dinero. Sin preguntas y sin trámites." },
  { k: "Garantía", t: "12 meses en la MF ONE", p: "Seis meses en los modelos inflables. Y cuando se acabe la garantía, nos sigues escribiendo." },
  { k: "Hasta 6 MSI", t: "Financiamiento disponible", p: "Meses sin intereses con tarjetas participantes a través de Mercado Pago." },
];

/* ---------- Comparison (new section) ---------- */

/* Comparativa real de mentefria.com — "La tecnología de cold plunge #1 en MX" */
const COMPARE_ROWS: { mf: string; otras: string }[] = [
  { mf: "Enfriamiento activo hasta 3 °C", otras: "Dependes de comprar hielo" },
  { mf: "Calienta hasta 42 °C con Motor Premium", otras: "Solo frío" },
  { mf: "Temperatura y horarios desde la app", otras: "Ajuste manual, si acaso" },
  { mf: "Ozono trabajando dentro del equipo", otras: "Cloro, o cambiar el agua" },
  { mf: "Filtración de 3 capas en los inflables", otras: "Sin sistema de filtrado" },
  { mf: "Garantía y alguien que contesta después", otras: "Compra y arréglatelas" },
];

/* ---------- Testimonials ---------- */

const TESTIMONIALS: { img: string; who: string; role: string; video?: string }[] = [
  // Kevin es atleta embajador de la marca. Su tarjeta estaba publicada con una
  // foto de archivo de DOS MUJERES corriendo, que obviamente no es el. Ahora
  // lleva un fotograma suyo, sacado de su propio material en el Drive, junto a
  // un MF Barrel. El video editado del testimonio sigue perdido: nunca estuvo
  // en git, era gitignored por peso, y en el Drive solo esta el bruto.
  { img: "/photography/testimonios/kevin.jpg", who: "Kevin", role: "Atleta · Embajador Mente Fria" },
  { img: "/photography/action/hyrox-01.jpg", who: "Dr. Patricio Ochoa", role: "Medicina deportiva", video: "/videos/testimonial-patricio.mp4" },
  { img: "/photography/action/golf-03.jpg", who: "Dani", role: "Triatleta" },
  { img: "/photography/action/golf-01.jpg", who: "Máximo", role: "Golfista" },
  { img: "/photography/lifestyle/surf-01.jpg", who: "Ana", role: "Surfista · Vallarta" },
];

/* ---------- Review wall ---------- */

type WallItem =
  | { kind: "text"; hd: string; p: string; nm: string }
  | { kind: "photo"; img: string; cap: string };

/* Testimonios REALES de mentefria.com — "Lo que dicen nuestros clientes" */
const WALL: WallItem[] = [
  { kind: "text", hd: "Calma bajo presión", p: "Las cold plunges de Mente Fria me han ayudado a manejar mejor mi ansiedad. Los beneficios del frío y la respiración controlada me han dado una herramienta poderosa para mantener la calma en situaciones estresantes.", nm: "Daniel G. · CDMX" },
  { kind: "photo", img: "/photography/action/hyrox-02.webp", cap: "Dr. Patricio Ochoa" },
  { kind: "text", hd: "Calidad insuperable", p: "La calidad del producto de Mente Fria es insuperable. Los materiales son muy resistentes y duraderos.", nm: "Carlos G. · Guadalajara" },
  { kind: "text", hd: "Sistema inmune fortalecido", p: "Tenía frecuentes resfriados y desde que uso las cold plunges de Mente Fria, mi sistema inmunológico se ha fortalecido. No he tenido un solo resfriado en meses y me siento más saludable en general.", nm: "Fernando L. · Monterrey" },
  { kind: "photo", img: "/photography/lifestyle/bajo-bajio-04.jpg", cap: "Ritual de la mañana" },
  { kind: "text", hd: "Piel más sana", p: "Las cold plunges de Mente Fria han mejorado significativamente mi piel. La exposición al frío ha reducido mis brotes de acné y mi piel se ve más clara y saludable. Es un beneficio inesperado pero muy bienvenido.", nm: "Gabriela F. · CDMX" },
  { kind: "text", hd: "Recuperación de lesión", p: "Después de una lesión deportiva, las cold plunges de Mente Fria aceleraron mi recuperación. La inflamación bajó rápidamente y pude volver a entrenar mucho antes de lo esperado. ¡Muy recomendadas para cualquier atleta!", nm: "Eduardo V. · CDMX" },
  { kind: "photo", img: "/photography/action/running-03.jpg", cap: "Kevin · Runner" },
  { kind: "text", hd: "Menos inflamación", p: "Siempre he tenido problemas con la inflamación, especialmente después de hacer ejercicio. Las cold plunges de Mente Fria han reducido significativamente la inflamación y el dolor post-entrenamiento.", nm: "Rodrigo P. · Guadalajara" },
  { kind: "text", hd: "Alivio articular", p: "Sufría de dolores articulares crónicos y las cold plunges de Mente Fria han sido un alivio increíble. Mi movilidad ha mejorado y los dolores han disminuido significativamente. Es una gran herramienta para la salud.", nm: "Miguel T. · CDMX" },
  { kind: "photo", img: "/photography/lifestyle/surf-02.jpg", cap: "Después del mar" },
  { kind: "text", hd: "Adiós insomnio", p: "Llevaba años sufriendo de insomnio. Desde que empecé a usar las cold plunges de Mente Fria, duermo profundamente y me despierto renovado. Ha sido una solución natural y efectiva para mis problemas de sueño.", nm: "Ricardo M. · Puerto Vallarta" },
  { kind: "text", hd: "Ideal para uso diario", p: "Estoy muy contento con la calidad del producto de Mente Fria. Es confiable y resistente, ideal para uso diario.", nm: "Jorge R. · Cancún" },
  { kind: "photo", img: "/photography/lifestyle/vallarta-padel-03.jpg", cap: "Fin de semana" },
  { kind: "text", hd: "Servicio de primera", p: "Estoy muy impresionado con el servicio al cliente de Mente Fria. Respondieron todas mis preguntas rápidamente y con mucha amabilidad.", nm: "Pedro H. · CDMX" },
];

const B2B = [
  { img: "/photography/lifestyle/vallarta-padel-02.jpg", who: "Hoteles", role: "Spa & terraza" },
  { img: "/photography/action/hyrox-03.jpg", who: "Gyms & Box", role: "Recuperación" },
  { img: "/photography/lifestyle/bajo-bajio-06.jpg", who: "Spas", role: "Wellness" },
  { img: "/photography/action/running-01.jpg", who: "Clínicas", role: "Fisioterapia" },
  { img: "/photography/modelaje/modelo-05.jpg", who: "Studios", role: "Recovery" },
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

  /* auto-cycle features */
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
              stock generada. Dos recortes del mismo original 4128×6192: 16:9
              para escritorio y 2:3 para móvil, donde un 16:9 con object-cover
              dejaba fuera la tina completa. */}
          <picture>
            <source
              media="(max-width: 720px)"
              srcSet="/photography/hero/mf-one-patio-portrait.jpg"
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
            <img src="/photography/hero/mf-one-render-showcase.jpg" alt="MF ONE con su Pro Deck" />
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
              <p className="mfeature-copy">{FEATURES[feature].copy}</p>
            </Reveal>
            <Reveal className="mfeature-media">
              {FEATURES.map((f, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
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
                      <img src={r.img} alt={r.t} />
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
          <div className="grid gap-5 py-[clamp(40px,6vh,64px)] md:grid-cols-3">
            {TRUST.map((t, i) => (
              <Reveal key={t.t} delay={i * 100}>
                <div className="flex h-full flex-col rounded-[16px] border border-[var(--line-1)] bg-white p-7">
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
      <section className="msection" id="productos">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Nuestros plunges</span>
            <h2>Encuentra la cold plunge perfecta para ti.</h2>
          </Reveal>
        </div>
        {/* Contenedor ancho: el bloque completo de productos escala ~15% (misma proporción) */}
        <div className="mx-auto w-[min(1500px,94vw)] px-[clamp(20px,3vw,40px)]">
          {/* Triángulo WHOOP: MF ONE estelar al centro, laterales más abajo */}
          <div className="grid gap-8 md:grid-cols-[1fr_1.25fr_1fr] md:items-start">
            {PRODUCTOS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 100}
                className={p.featured ? "relative z-10 md:-mt-6" : "md:mt-14"}
              >
                <Link href={p.href} className="group block">
                  {/* Producto DESBORDÁNDOSE del panel: el panel gris es una capa
                      detrás, más corta que la imagen — el producto siempre rompe
                      el marco por arriba (estilo WHOOP). */}
                  <div className="relative">
                    <div className={`absolute bottom-0 top-[45%] ${p.featured ? "inset-x-0" : "-inset-x-5"}`}>
                      {/* Sombra de contacto en lugar del panel gris: el producto
                          se apoya en la página sin quedar encajonado en una caja. */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-[10%] bottom-[7%] h-[24%] rounded-[50%]"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 50%, rgba(8,9,11,0.18) 0%, rgba(8,9,11,0.07) 45%, rgba(8,9,11,0) 72%)",
                        }}
                      />
                      {p.featured && (
                        <span className="absolute bottom-4 left-4 z-20 rounded-full bg-[var(--m-ink)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                          Más vendido
                        </span>
                      )}
                    </div>
                    {/* Producto (capa delantera — sin z-index: crearía stacking
                        context y aislaría el mix-blend del fondo de página) */}
                    <div
                      className={`relative flex items-end justify-center px-4 ${
                        p.featured ? "min-h-[320px] pb-10" : "min-h-[260px] pb-8"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.img}
                        alt={p.name}
                        style={{ "--pw": p.scale } as React.CSSProperties}
                        className={`w-auto max-w-full flex-none object-contain drop-shadow-[0_22px_28px_rgba(8,9,11,0.22)] transition-transform duration-500 group-hover:scale-[1.04] md:w-[var(--pw)] md:!max-w-none ${"nudge" in p && p.nudge ? p.nudge : ""}`}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <h3
                      className={`mdisplay ${p.featured ? "text-[28px]" : "text-[22px]"}`}
                      style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
                    >
                      {p.name}
                    </h3>
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
      <section className="msection panel" id="quiz">
        <div className="mwrap">
          <Reveal
            className="grid items-center gap-10 rounded-[22px] border p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]"
            style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
          >
            <div>
              <span className="m-eyebrow accent">Encuentra tu plunge</span>
              <h2
                className="mdisplay mt-4 text-[clamp(28px,3.6vw,46px)] leading-[1.05]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                ¿No sabes cuál de las tres?
              </h2>
              <p
                className="mt-5 max-w-[50ch] text-[16px] leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                Siete preguntas sobre tu espacio, tu presupuesto y cómo te
                quieres meter. Empieza por el espacio, que es lo que de verdad
                descarta: si el lado largo no da, no hay presupuesto que lo
                arregle. Te decimos cuál cabe y también qué vas a estar
                cediendo.
              </p>
              <Link href="/quiz" className="mbtn mbtn-primary mt-8">
                Empezar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-3">
              {[
                { n: "01", t: "Tu espacio", d: "El lado largo libre, con lo que cada modelo necesita alrededor." },
                { n: "02", t: "Cómo te metes", d: "Estirado o sentado, y tu estatura contra el interior real de cada tina." },
                { n: "03", t: "Tu presupuesto", d: "Y si es para tu casa, para la familia o para un negocio." },
              ].map((x) => (
                <li
                  key={x.n}
                  className="flex gap-5 rounded-[14px] border p-5"
                  style={{ borderColor: "var(--line-1)", background: "var(--bg-panel)" }}
                >
                  <span
                    className="mdisplay text-[20px] leading-none"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    {x.n}
                  </span>
                  <span>
                    <span
                      className="block text-[15px] font-semibold"
                      style={{ color: "var(--fg-metal)" }}
                    >
                      {x.t}
                    </span>
                    <span
                      className="mt-1 block text-[13.5px] leading-relaxed"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {x.d}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS (dark) ===== */}
      <section className="msection dark-s">
        <div className="mwrap">
          <div className="stats-wrap">
            <Reveal className="stats-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photography/product/mf-one-courtyard.jpg" alt="MF ONE en patio" className="!object-cover !p-0" />
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
              <button
                key={t.who}
                className={`vcard stagger-i${playing === i ? " playing" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => t.video && setPlaying(playing === i ? null : i)}
                aria-label={
                  t.video
                    ? playing === i
                      ? `Detener video de ${t.who}`
                      : `Ver video de ${t.who}`
                    : t.who
                }
              >
                {playing === i && t.video ? (
                  /* Reproducción inline — en el mismo frame de la card */
                  <video src={t.video} autoPlay playsInline onEnded={() => setPlaying(null)} />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={t.img} alt={t.who} />
                )}
                {t.video && playing !== i && (
                  <div className="play">
                    <Play size={20} fill="currentColor" />
                  </div>
                )}
                <div className="cap">
                  <div className="who">{t.who}</div>
                  <div className="role">{t.role}</div>
                </div>
              </button>
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
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bcard">
                  <div className="img">
                    {/* El poster es obligatorio: sin él, cuando el navegador
                        bloquea el autoplay —modo de bajo consumo, ahorro de
                        datos, o la preferencia del usuario— los seis videos
                        quedan como rectángulos vacíos sobre la sección
                        oscura y la sección se ve muerta. Con poster siempre
                        hay imagen, se reproduzca o no. */}
                    <video
                      src={`/videos/original/en-accion-home-${n}.mp4`}
                      poster={`/videos/posters/en-accion-home-${n}.jpg`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== REVIEW WALL ===== */}
      <section className="msection panel" id="reviews">
        <div className="mwrap">
          <Reveal className="msection-head">
            <span className="m-eyebrow accent">Reseñas</span>
            <h2>Lo que dicen nuestros clientes.</h2>
          </Reveal>
          <Reveal className="masonry">
            {WALL.map(
              (w, i) =>
                w.kind === "text" ? (
                  <div key={i} className="r-text">
                    <div className="st">★★★★★</div>
                    <div className="hd">{w.hd}</div>
                    <p>{w.p}</p>
                    <div className="top mt-3">
                      <div className="av" />
                      <div className="nm">{w.nm}</div>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="r-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.img} alt={w.cap} />
                    <div className="cap">{w.cap}</div>
                  </div>
                ),
            )}
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
                <img src={b.img} alt={b.who} />
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
        <MessageCircle size={22} />
      </a>

    </main>
  );
}
