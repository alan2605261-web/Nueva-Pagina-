"use client";

import { useState } from "react";

/*
  Product hero stage with color variants (Negro / Blanco).
  Swatches swap the photo in place. Used on every PDP.
*/

type Variant = { color: "Negro" | "Blanco"; src: string };

export function ProductColorStage({
  variants,
  alt,
  defaultColor = "Negro",
}: {
  variants: Variant[];
  alt: string;
  defaultColor?: "Negro" | "Blanco";
}) {
  const [active, setActive] = useState<"Negro" | "Blanco">(defaultColor);
  const current = variants.find((v) => v.color === active) ?? variants[0];

  return (
    <div>
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[18px] [background:var(--grad-silver)] lg:aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img fetchPriority="high"
          key={current.src}
          src={current.src}
          alt={`${alt} — color ${active.toLowerCase()}`}
          className="h-full w-full object-contain p-10 mix-blend-multiply duration-500 animate-in fade-in"
        />
      </div>

      {/* Selector de color */}
      <div className="mt-5 flex items-center gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
          Color · {active}
        </span>
        <div className="flex gap-2.5">
          {variants.map((v) => (
            <button
              key={v.color}
              onClick={() => setActive(v.color)}
              aria-label={`Color ${v.color}`}
              aria-pressed={active === v.color}
              className={`h-8 w-8 rounded-full border transition-all duration-200 ${
                v.color === "Negro"
                  ? "border-transparent bg-[#0e1013]"
                  : "border-[var(--line-2)] bg-white"
              } ${
                active === v.color
                  ? "ring-2 ring-[var(--accent-ice)] ring-offset-2 ring-offset-[var(--bg-metal)]"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
