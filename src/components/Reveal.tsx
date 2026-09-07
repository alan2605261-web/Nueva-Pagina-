"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
  Scroll-reveal wrapper. Mirrors the original layout's behavior where content
  fades + rises into view as it enters the viewport. Uses IntersectionObserver
  (no animation library dependency). Honors prefers-reduced-motion via CSS.
*/

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  /** inline styles; se fusionan con el transition-delay del stagger */
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reveal immediately if already in (or above) the viewport on mount —
    // avoids a flash of invisible above-the-fold content on page load.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={
        delay || style
          ? { ...(delay ? { transitionDelay: `${delay}ms` } : null), ...style }
          : undefined
      }
    >
      {children}
    </Component>
  );
}
