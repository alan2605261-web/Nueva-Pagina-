import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { ArrowRight } from "@/components/icons";

/*
  Reusable, brand-consistent content blocks shared across all inner pages.
  Same design system as the landing: Aileron type scale, silver/steel neutrals,
  sparing #001bff accent, generous rhythm, scroll-reveal motion.
*/

/* ---- Inner-page hero (light) ------------------------------------------- */
export function SubHero({
  eyebrow,
  title,
  subtitle,
  cta,
  tone = "warm",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  tone?: "warm" | "white" | "mist";
}) {
  // Sistema metal: el tono "warm" pasa a panel, el resto queda sobre el fondo base.
  return (
    <section className={cn("msection", tone === "warm" && "panel")}>
      <div className="mwrap">
        <Reveal className="max-w-3xl">
          {eyebrow && <span className="m-eyebrow accent">{eyebrow}</span>}
          <h1
            className="mdisplay mt-4 text-[clamp(34px,5vw,68px)]"
            style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-[var(--fg-muted)]">
              {subtitle}
            </p>
          )}
          {cta && (
            <Link href={cta.href} className="mbtn mbtn-primary mt-8">
              {cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Section header ---------------------------------------------------- */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(center && "mx-auto max-w-[760px] text-center", className)}>
      {eyebrow && <span className="m-eyebrow accent">{eyebrow}</span>}
      <h2
        className="mdisplay mt-3.5 text-[clamp(28px,3.8vw,52px)] leading-[1.02]"
        style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-[16px] leading-relaxed text-[var(--fg-muted)]",
            center ? "mx-auto max-w-[52ch]" : "max-w-[58ch]",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ---- Feature / use-case card grid -------------------------------------- */
export type FeatureCard = {
  title: string;
  body: string;
  tag?: string;
  tone?: "warm" | "cool" | "ink" | "blue";
  image?: string;
  /** Gráfico propio en lugar de foto o placeholder (ver SoporteGraphics). */
  media?: React.ReactNode;
};

export function FeatureCards({
  cards,
  columns = 3,
}: {
  cards: FeatureCard[];
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={cn("grid gap-5", cols)}>
      {cards.map((c, i) => (
        <Reveal
          key={c.title}
          delay={(i % columns) * 80}
          className="flex flex-col overflow-hidden rounded-3xl border border-[var(--line-1)] bg-[var(--m-white)]"
        >
          <div className="relative aspect-[4/3] w-full">
            {c.media ? (
              c.media
            ) : c.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img loading="lazy" decoding="async"
                src={c.image}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Placeholder tone={c.tone ?? "cool"} label={c.tag ?? c.title} rounded="rounded-none" className="absolute inset-0" />
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            {c.tag && <p className="eyebrow mb-2">{c.tag}</p>}
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{c.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---- Spec table -------------------------------------------------------- */
export function SpecTable({
  title,
  rows,
}: {
  title?: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <Reveal className="rounded-3xl border border-[var(--line-1)] bg-[var(--bg-panel)] p-8 sm:p-10">
      {title && <h3 className="mdisplay text-[clamp(26px,3.4vw,44px)] mb-6 !text-2xl">{title}</h3>}
      <dl className="divide-y divide-[var(--line-1)]">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-6 py-3.5">
            <dt className="text-sm text-[var(--fg-muted)]">{r.label}</dt>
            <dd className="text-right text-sm font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

/* ---- Stat row ---------------------------------------------------------- */
export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid gap-10 border-t border-[var(--line-1)] pt-12 sm:grid-cols-3">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 90} className="text-center">
          <div className="mdisplay text-[clamp(32px,4.6vw,60px)] !text-foreground">{s.value}</div>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">{s.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ---- Blog / article card grid ------------------------------------------ */
export type Article = {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  tone?: "warm" | "cool" | "ink" | "blue";
};

export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a, i) => (
        <Reveal key={a.title} delay={(i % 3) * 80} className="group flex flex-col">
          <Placeholder
            tone={a.tone ?? "cool"}
            label={a.category}
            className="aspect-[16/10] w-full"
          />
          <p className="eyebrow mt-4">{a.category}</p>
          <h3 className="mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-[color:var(--accent-blue)]">
            {a.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">{a.excerpt}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.1em] text-[var(--fg-subtle)]">{a.readTime}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ---- CTA band ---------------------------------------------------------- */
export function CTASection({
  title,
  body,
  cta,
  dark = true,
}: {
  title: string;
  body?: string;
  cta: { label: string; href: string };
  dark?: boolean;
}) {
  return (
    <section className={cn("msection", dark ? "dark-s" : "panel")}>
      <div className="mwrap text-center">
        <Reveal className="mx-auto max-w-[760px]">
          <h2
            className="mdisplay text-[clamp(28px,3.8vw,52px)] leading-[1.02]"
            style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
          >
            {title}
          </h2>
          {body && (
            <p
              className={cn(
                "mx-auto mt-5 max-w-[52ch] text-[16px] leading-relaxed",
                dark ? "text-[var(--on-dark-muted)]" : "text-[var(--fg-muted)]",
              )}
            >
              {body}
            </p>
          )}
          <Link
            href={cta.href}
            className={cn("mbtn mt-9", dark ? "mbtn-solid-light" : "mbtn-primary")}
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
