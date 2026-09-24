import { PageShell } from "@/components/PageShell";
import { QuizPlunge } from "@/components/QuizPlunge";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Encuentra tu plunge",
  description:
    "Contesta unas preguntas y te decimos cuál de las tres cabe en tu espacio y en tu presupuesto.",
};

export default function QuizPage() {
  return (
    <PageShell>
      <section className="msection panel !pb-0">
        <div className="mwrap">
          <Reveal className="mx-auto max-w-2xl">
            <span className="m-eyebrow accent">Encuentra tu plunge</span>
            <h1
              className="mdisplay mt-4 text-[clamp(32px,4.6vw,60px)]"
              style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
            >
              ¿Cuál de las tres es para ti?
            </h1>
            <p
              className="mt-5 text-[17px] leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              Empezamos por tu espacio, que es lo que de verdad descarta. Las
              demás preguntas dependen de lo que vayas contestando.
            </p>
          </Reveal>
        </div>
      </section>

      {/* !pt-0: la intro de arriba ya cierra con su propio aire. Dejar el
          padding de seccion aqui apilaba dos y abria una franja muerta. */}
      <section className="msection panel !pt-8">
        <QuizPlunge />
      </section>
    </PageShell>
  );
}
