import Image from "next/image";
import { hero } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

/*
  Full-viewport hero over the MF ONE architectural render. A left-to-right dark
  scrim keeps the left-aligned, vertically centered content legible (white text):
  eyebrow → oversized two-line display headline → subcopy → white pill CTA.
*/

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black text-white">
      {/* MF ONE concrete + water render */}
      <Image
        src="/images/hero-mfone.jpg"
        alt="MF ONE en un entorno de concreto y agua"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrims: left for text legibility, bottom for grounding */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="container-edge relative z-10 w-full pt-28">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 !text-white">{hero.eyebrow}</p>
          <h1 className="display-lg">
            {hero.title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="body-lg mt-6 max-w-md !text-white/80">{hero.subtitle}</p>
          <a href="#" className="btn-pill mt-9 bg-white text-black hover:opacity-90">
            {hero.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
