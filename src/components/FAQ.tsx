"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlusIcon, MinusIcon } from "@/components/icons";

/*
  Accordion FAQ. Single-open behavior with a steel hairline between rows and a
  smooth height/opacity reveal. Used on product and support pages.

  `bold` sube el peso y el tamaño de la pregunta y ensancha las filas — es la
  variante que pidió Rafa para el FAQ B2B de /negocios. El resto de las
  páginas que ya usaban este componente no cambian.
*/

export function FAQ({
  items,
  bold = false,
}: {
  items: { q: string; a: string }[];
  bold?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-[var(--line-1)] border-y border-[var(--line-1)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className={cn(
                "flex w-full items-center justify-between gap-6 text-left",
                bold ? "py-7" : "py-5",
              )}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  bold
                    ? "text-[17px] font-semibold tracking-[-0.01em] sm:text-[21px]"
                    : "text-base font-medium sm:text-lg",
                )}
              >
                {item.q}
              </span>
              <span className="shrink-0 text-[var(--fg-muted)]">
                {isOpen ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? cn("grid-rows-[1fr] opacity-100", bold ? "pb-7" : "pb-5")
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "max-w-2xl leading-relaxed text-[var(--fg-muted)]",
                    bold ? "text-[15px]" : "text-sm",
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
