import { PageShell } from "@/components/PageShell";
import { QuizPlunge } from "@/components/QuizPlunge";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Encuentra tu plunge | Mente Fria",
  description:
    "Siete preguntas sobre tu espacio, tu presupuesto y cómo te quieres meter, y te decimos cuál de las tres cabe de verdad.",
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
              Siete preguntas. La primera es cuánto espacio tienes, porque esa
              es la que de verdad descarta: si el lado largo no da, no hay
              presupuesto que lo arregle. Te decimos cuál cabe y también qué
              vas a estar cediendo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="msection panel">
        <QuizPlunge />
      </section>
    </PageShell>
  );
}
