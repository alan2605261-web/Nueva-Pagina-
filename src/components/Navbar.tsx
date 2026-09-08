"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/content";
import { CartIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";

/*
  Liquid-glass nav (ported from Claude Design site_v2, glass = "Medio").
  Sticky, chrome-frosted gradient + heavy backdrop blur, rounded bottom
  corners. Layout: left links · centered MENTE FRIA lockup · account /
  search / cart. Dropdowns preserved for Productos & Soporte.
*/

/* WHOOP-style mega-menu cards for "Productos" */
/* width = tamaño relativo real (ONE 200 cm · Horizon 160 cm · Barrel Ø90 cm) */
const MEGA_PRODUCTS = [
  {
    name: "MF ONE",
    img: "/images/prod-mfone.webp",
    blurb: "El chiller va dentro de la tina. Acrílico rígido, cero armado: llega, se llena y se enciende.",
    href: "/productos/mf-one",
    scale: "100px",
  },
  {
    name: "MF HORIZON",
    img: "/images/prod-horizon-nobg.png",
    blurb: "Tejido drop-stitch de grado militar. Cabes estirado, 550 L y se guarda en su mochila.",
    href: "/productos/mf-horizon",
    scale: "107px",
  },
  {
    name: "MF BARREL",
    img: "/images/prod-barrel-nobg.png",
    blurb: "El mismo drop-stitch de grado militar en formato vertical. Ocupa poco, pesa 11 kg y viaja contigo.",
    href: "/productos/mf-barrel",
    scale: "116px",
  },
];

const MEGA_LINKS = [
  { label: "Explora todos los plunges", href: "/productos", strong: true },
  /* El mega-menú de Productos no lee el submenu de content.ts: trae su
     propio contenido. Por eso el enlace al quiz hay que ponerlo aquí. */
  { label: "Encuentra tu plunge", href: "/quiz", strong: true },
  { label: "Accesorios", href: "/accesorios" },
  { label: "Kits de mantenimiento", href: "/accesorios#mantenimiento" },
  { label: "Para negocios", href: "/#b2b" },
];

export function Navbar({ solid: _solid = false }: { solid?: boolean }) {
  const itemBase = "nl";

  return (
    <header className="sticky top-0 z-50">
      <nav className="glass-nav grid grid-cols-[1fr_auto_1fr] items-center px-[clamp(18px,4vw,44px)] py-[13px]">
        {/* Left: primary links */}
        <ul className="hidden items-center gap-[clamp(16px,2vw,30px)] lg:flex">
          {nav.links.map((l) =>
            l.label === "Productos" ? (
              /* WHOOP-style mega-menu */
              <li key={l.label} className="group static">
                <Link
                  href={l.href}
                  className={cn(itemBase, "inline-flex items-center gap-1")}
                >
                  {l.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <div className="invisible absolute inset-x-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="mx-auto grid w-[min(960px,94vw)] grid-cols-[1fr_1fr_1fr_auto] gap-5 rounded-2xl border border-[var(--line-1)] bg-[var(--m-white)] p-6 text-foreground shadow-[0_24px_64px_rgba(8,9,11,0.24)]">
                    {MEGA_PRODUCTS.map((p) => (
                      <Link key={p.name} href={p.href} className="group/card block min-w-0">
                        <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-[var(--bg-panel)] p-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.img}
                            alt={p.name}
                            style={{ height: p.scale, translate: p.name === "MF HORIZON" ? "-20px 0" : undefined }}
                            className={`w-auto object-contain transition-transform duration-500 group-hover/card:scale-[1.05] ${
                              p.name === "MF HORIZON" ? "!max-w-none" : "max-w-full"
                            }`}
                          />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[14px] font-semibold tracking-[0.14em]">
                            {p.name}
                          </span>
                          <span aria-hidden className="text-[var(--accent-ice)]">→</span>
                        </div>
                        <p className="mt-1 text-[12px] leading-snug text-[var(--fg-muted)]">
                          {p.blurb}
                        </p>
                      </Link>
                    ))}
                    <div className="flex min-w-[220px] flex-col gap-1 border-l border-[var(--line-1)] pl-5">
                      {MEGA_LINKS.map((m) => (
                        <Link
                          key={m.label}
                          href={m.href}
                          className={cn(
                            "flex items-center justify-between gap-4 rounded-lg px-2 py-2.5 text-[13px] transition-colors hover:bg-[var(--bg-panel)]",
                            m.strong ? "font-semibold" : "text-[var(--fg-muted)]",
                          )}
                        >
                          {m.label}
                          <span aria-hidden className="text-[var(--accent-ice)]">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ) : l.submenu ? (
              <li key={l.label} className="group relative">
                <Link
                  href={l.href}
                  className={cn(itemBase, "inline-flex items-center gap-1")}
                >
                  {l.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                {/* Dropdown panel */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-[230px] rounded-2xl border border-[var(--line-1)] bg-[var(--m-white)] p-2 text-foreground shadow-[0_14px_44px_rgba(40,46,54,0.22)]">
                    {l.submenu.map((s) => (
                      <li key={s.label}>
                        <Link
                          href={s.href}
                          className="block rounded-xl px-4 py-2.5 text-[13px] font-medium tracking-[0.01em] text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-panel)] hover:text-foreground"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={l.label}>
                <Link href={l.href} className={itemBase}>
                  {l.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        {/* Mobile spacer keeps lockup centered */}
        <div className="lg:hidden" />

        {/* Center: Mente Fria lockup */}
        <Link href="/" aria-label="Mente Fria" className="justify-self-center">
          <Logo variant="black" className="h-9 w-auto" />
        </Link>

        {/* Right: account · search · cart */}
        <div className="flex items-center justify-end gap-5 sm:gap-7">
          <Link href="#" className={cn(itemBase, "hidden md:inline")}>
            {nav.account}
          </Link>
          <Link
            href="#"
            className={cn(itemBase, "hidden items-center gap-1.5 sm:inline-flex")}
          >
            <span className="hidden lg:inline">{nav.search}</span>
            <SearchIcon className="h-[15px] w-[15px]" />
          </Link>
          <Link href="#" className={cn(itemBase, "inline-flex items-center gap-1.5")}>
            <span className="hidden lg:inline">{nav.cart}</span>
            <CartIcon className="h-[15px] w-[15px]" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
