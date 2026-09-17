import Image from "next/image";
import { gallery } from "@/lib/content";

/*
  Full-bleed horizontal lifestyle strip. Continuously marquees the MF product /
  lifestyle imagery; pauses on hover. Track is duplicated for a seamless loop.
*/

export function Gallery() {
  const items = [...gallery, ...gallery];

  return (
    <section className="overflow-hidden bg-warm py-16">
      <div className="marquee-track w-full overflow-hidden">
        <div className="animate-marquee flex w-max gap-5 px-3">
          {items.map((item, i) => (
            <figure
              key={i}
              className="relative aspect-[3/4] w-[clamp(220px,28vw,360px)] shrink-0 overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[var(--bg-panel)]"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="360px"
                className="object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 to-transparent p-4 text-xs font-medium uppercase tracking-[0.12em] text-white">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
