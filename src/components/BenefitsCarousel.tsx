"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/*
  Beneficios científicamente probados del cold-plunging — copy real de
  mentefria.com, en el estilo carrusel del sitio (mismas cards que el landing).
*/

const BENEFICIOS = [
  { img: "/photography/modelaje/modelo-01.jpg", t: "Acelera la recuperación", p: "La inmersión en agua fría contrae los vasos sanguíneos, reduciendo la hinchazón y el daño muscular para que te recuperes más rápido entre cada sesión de entrenamiento." },
  { img: "/photography/action/running-02.jpg", t: "Mejora el ánimo", p: "La MF Plunge activa la liberación de dopamina, estimulando la motivación, reduciendo el estrés y elevando la energía y el estado de ánimo desde los primeros minutos." },
  { img: "/photography/action/golf-01.jpg", t: "Energía natural", p: "El choque térmico libera adrenalina y noradrenalina de forma inmediata, generando un estado de alerta, claridad mental y energía sostenida durante horas sin cafeína." },
  { img: "/photography/lifestyle/bajo-bajio-06.jpg", t: "Reduce la inflamación", p: "El agua fría frena la actividad metabólica que genera inflamación, reduciendo el dolor, la hinchazón y la rigidez articular tanto de entrenamientos intensos como del día a día." },
  { img: "/photography/action/hyrox-02.webp", t: "Mayor resiliencia", p: "Cada inmersión entrena tu sistema nervioso para manejar el estrés de forma controlada, desarrollando una disciplina y fortaleza mental que se transfiere a cada área de tu vida." },
  { img: "/photography/modelaje/modelo-04.jpg", t: "Mejor descanso", p: "La exposición al frío activa tu sistema nervioso parasimpático y reduce la temperatura corporal, ayudándote a entrar más fácil en la fase de sueño profundo y reparador." },
  { img: "/photography/action/golf-02.jpg", t: "Acelera el metabolismo", p: "El frío activa la grasa parda, un tejido que quema calorías para generar calor. Estudios muestran que la inmersión helada puede elevar tu tasa metabólica hasta un 80%." },
  { img: "/photography/lifestyle/surf-02.jpg", t: "Acelera el sistema inmune", p: "La exposición al agua fría estimula la producción de glóbulos blancos, fortaleciendo el sistema inmunológico y mejorando la resistencia a infecciones y enfermedades." },
];

export function BenefitsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.8, 380), behavior: "smooth" });
  };

  return (
    <section className="msection panel">
      <div className="mwrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 text-left">
          <div>
            <span className="m-eyebrow accent">La ciencia del frío</span>
            <h2
              className="mdisplay mt-3 text-[clamp(30px,4vw,56px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              Beneficios científicamente probados.
            </h2>
          </div>
          <p className="m-0 max-w-[38ch] text-[15px] text-[var(--fg-muted)]">
            Cada inmersión activa una cascada fisiológica. Esto es lo que el frío le hace a tu
            cuerpo.
          </p>
        </Reveal>
        <Reveal className="bcar">
          <div className="bcar-track" ref={trackRef}>
            {BENEFICIOS.map((b, i) => (
              <article key={b.t} className="bcard">
                <div className="img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.img} alt={b.t} />
                  <span className="tag">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{b.t}</h3>
                <p>{b.p}</p>
              </article>
            ))}
          </div>
          <div className="bcar-nav">
            <button aria-label="Anterior" onClick={() => scroll(-1)}>
              <ArrowLeft size={18} />
            </button>
            <button aria-label="Siguiente" onClick={() => scroll(1)}>
              <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
