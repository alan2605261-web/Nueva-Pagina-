"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { showcase } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

/*
  Centered intro (display heading + prose) over a large product stage, with tab
  pills below to switch between MF ONE / Horizon / Barrel. Click-to-switch with
  an opacity crossfade; the active product's name + price sit beside the pills.
*/

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const current = showcase.products[active];

  return (
    <section className="section-y bg-warm text-foreground">
      <div className="container-edge">
        <Reveal className="container-prose text-center">
          <h2 className="display-md">
            {showcase.title.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="body-lg mt-5">{showcase.subtitle}</p>
        </Reveal>

        {/* Product stage */}
        <Reveal className="mt-12" delay={80}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[var(--bg-panel)] sm:aspect-[16/9]">
            {/* soft chrome floor reflection */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(140,147,155,0.25),transparent)]" />
            {showcase.products.map((p, i) => (
              <Image
                key={p.name}
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 100vw, 1280px"
                className={cn(
                  "object-contain p-8 transition-opacity duration-500 sm:p-16",
                  i === active ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              />
            ))}
          </div>
        </Reveal>

        {/* Active product caption */}
        <div className="mt-8 flex flex-col items-center gap-1 text-center">
          <h3 className="text-xl font-semibold">{current.name}</h3>
          <p className="text-sm text-ink-soft">{current.tag}</p>
          <p className="mt-1 text-base font-medium">{current.price}</p>
        </div>

        {/* Tab pills */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {showcase.products.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className={cn(
                "btn-pill border text-sm transition-colors",
                i === active
                  ? "border-foreground bg-foreground text-background"
                  : "border-line bg-background text-ink-soft hover:border-foreground hover:text-foreground",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
