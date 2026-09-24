"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/content";
import { CartIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { useCarrito } from "@/components/CarritoProvider";

/*
  Liquid-glass nav (ported from Claude Design site_v2, glass = "Medio").
  Sticky, chrome-frosted gradient + heavy backdrop blur, rounded bottom
  corners. Layout: left links · centered MENTE FRIA lockup · account /
  search / cart. Dropdowns preserved for Productos & Soporte.
*/

/* WHOOP-style mega-menu cards for "Productos" */
/* Los tres anchos son los mismos en todo el sitio: 64% el Barrel, 100% la MF
   ONE y 95% el Horizon. Salen de medir la primera version de Rafa y estan
   explicados en LandingV2. Si se cambian aqui, hay que cambiarlos en el
   inicio, en /productos, en /negocios y en /garantia. */
const MEGA_PRODUCTS = [
  {
    name: "MF ONE",
    img: "/images/prod-mfone.webp",
    blurb: "El chiller va dentro de la tina. Acrílico rígido, cero armado: llega, se llena y se enciende.",
    href: "/productos/mf-one",
    scale: "100%",
  },
  {
    name: "MF HORIZON",
    img: "/images/prod-horizon-nobg.png",
    blurb: "Tejido drop-stitch de grado militar. Cabes estirado, 550 L y se guarda en su mochila.",
    href: "/productos/mf-horizon",
    scale: "95%",
  },
  {
    name: "MF BARREL",
    img: "/images/prod-barrel-nobg.png",
    blurb: "El mismo drop-stitch de grado militar en formato vertical. Ocupa poco, pesa 11 kg y viaja contigo.",
    href: "/productos/mf-barrel",
    scale: "64%",
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
  /* Recta mientras está hasta arriba, para que se integre con el banner del
     tope; redondeada en cuanto empieza a bajar, donde ya se lee como una
     pieza flotando sobre el contenido. */
  const [bajando, setBajando] = useState(false);
  useEffect(() => {
    const alScroll = () => setBajando(window.scrollY > 20);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  const itemBase = "nl";

  /* Menú de celular. Abajo de 1024px la lista de enlaces se oculta y antes no
     había nada con qué abrirla: en teléfono no se podía navegar (Saul, sep
     2026). Se cierra al cambiar de página. */
  const [menu, setMenu] = useState(false);
  const cerrarMenu = useCallback(() => setMenu(false), []);
  const ruta = usePathname();
  useEffect(() => setMenu(false), [ruta]);

  /* Al bajar, el header se separa 10px del tope para que las esquinas de ARRIBA
     también puedan redondearse. Sigue a todo lo ancho: angosta se pierde contra
     el fondo, y eso ya se descartó. El padding va como estilo directo y no como
     clase de Tailwind porque la utilidad arbitraria no se generaba. */
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        paddingTop: bajando ? 10 : 0,
        transition: "padding-top 0.3s var(--ease-expo)",
      }}
    >
      <nav className={cn("glass-nav grid grid-cols-[1fr_auto_1fr] items-center px-[clamp(18px,4vw,44px)] py-[13px]", bajando && "is-scrolled")}>
        {/* Left: primary links */}
        <ul className="hidden items-center gap-[clamp(14px,1.7vw,26px)] tracking-[0.1em] lg:flex">
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
                        <div className="pfloor grid aspect-[4/3] place-items-end justify-items-center overflow-hidden rounded-xl p-4 pb-6">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img loading="lazy" decoding="async"
                            src={p.img}
                            alt={p.name}
                            style={{ width: p.scale }}
                            className={`h-auto object-contain transition-transform duration-500 group-hover/card:scale-[1.05] ${
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
        {/* Botón de menú en celular. Ocupa la columna izquierda, así el logo
            sigue centrado igual que antes con el espaciador. */}
        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          aria-label={menu ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menu}
          className="-ml-2 grid h-10 w-10 place-items-center justify-self-start rounded-full text-[var(--m-ink)] transition-colors hover:bg-black/5 lg:hidden"
        >
          {/* Tres líneas que se transforman en X: la de arriba baja al centro
              y gira 45°, la de en medio se desvanece y la de abajo sube y gira
              -45°. Antes cambiaba de un dibujo a otro de golpe (Saul, sep
              2026). */}
          <span aria-hidden="true" className="relative block h-[14px] w-[20px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute left-0 block h-[1.7px] w-full rounded-full bg-current"
                style={{
                  top: `${i * 6.15}px`,
                  transformOrigin: "center",
                  transition:
                    "transform 0.42s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.25s ease",
                  transform: menu
                    ? i === 0
                      ? "translateY(6.15px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-6.15px) rotate(-45deg)"
                        : "scaleX(0.2)"
                    : "none",
                  opacity: menu && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </span>
        </button>

        {/* Center: Mente Fria lockup.
            mx-6 no es decorativo: el grid es 1fr auto 1fr y la lista de la
            izquierda crece hasta el borde de su columna. Sin este canal, el
            ultimo enlace ("Para negocios") queda pegado al logo. */}
        <Link href="/" aria-label="Mente Fria" className="mx-6 justify-self-center lg:mx-10">
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
          <EnlaceCarrito className={cn(itemBase, "inline-flex items-center gap-1.5")} />
        </div>
      </nav>

      <MenuMovil abierto={menu} onCerrar={cerrarMenu} />
    </header>
  );
}

/* Panel del menú en celular.

   Primera versión: pantalla completa, fondo blanco sólido y letra grande. Saul
   la sintió invasiva (sep 2026). Ahora es una tarjeta de vidrio que baja justo
   debajo de la barra, con márgenes a los lados y el sitio visible detrás.

   Va fuera de <nav> a propósito: .glass-nav tiene backdrop-filter, y un
   elemento con backdrop-filter se vuelve el contenedor de sus hijos
   posicionados. El header es sticky, así que "absolute top-full" lo coloca
   justo abajo de la barra. La capa que oscurece es fixed y cierra al tocarla.

   Lee los mismos enlaces que el menú de escritorio (nav.links de content.ts).
   Las secciones con submenú se abren como acordeón, una a la vez. */
function MenuMovil({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const [abierta, setAbierta] = useState<string | null>(null);

  /* Al cerrar, las secciones desplegadas vuelven a plegarse para la próxima. */
  useEffect(() => {
    if (!abierto) setAbierta(null);
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    const ancho = window.matchMedia("(min-width: 1024px)");
    const alCrecer = () => ancho.matches && onCerrar();
    window.addEventListener("keydown", tecla);
    ancho.addEventListener("change", alCrecer);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", tecla);
      ancho.removeEventListener("change", alCrecer);
    };
  }, [abierto, onCerrar]);

  /* Siempre montado: así puede animar la entrada Y la salida. Cerrado queda
     invisible y sin recibir toques; la visibilidad cambia al final de la salida
     para que la animación alcance a verse. */
  const curva = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onCerrar}
        className="fixed inset-0 -z-10 bg-[rgba(8,9,11,0.18)] lg:hidden"
        style={{
          opacity: abierto ? 1 : 0,
          visibility: abierto ? "visible" : "hidden",
          transition: abierto
            ? "opacity 0.35s ease, visibility 0s"
            : "opacity 0.3s ease, visibility 0s linear 0.3s",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        aria-hidden={!abierto}
        className="absolute left-3 top-full mt-2 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-[20px] border border-white/70 text-[var(--m-ink)] shadow-[0_18px_50px_rgba(8,9,11,0.18)] lg:hidden"
        style={{
          background: "rgba(248, 250, 252, 0.72)",
          backdropFilter: "blur(22px) saturate(180%)",
          WebkitBackdropFilter: "blur(22px) saturate(180%)",
          transformOrigin: "top left",
          opacity: abierto ? 1 : 0,
          transform: abierto ? "none" : "translateY(-8px) scale(0.97)",
          visibility: abierto ? "visible" : "hidden",
          transition: abierto
            ? `opacity 0.35s ${curva}, transform 0.45s ${curva}, visibility 0s`
            : `opacity 0.22s ease, transform 0.3s ease, visibility 0s linear 0.3s`,
        }}
      >
        <nav aria-label="Menú principal" className="max-h-[calc(100dvh-110px)] overflow-y-auto px-2 py-2">
          <ul>
            {nav.links.map((l, i) => {
              const esta = abierta === l.label;
              const fila =
                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[12.5px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-black/[0.04]";
              /* Las filas entran escalonadas, una tras otra. */
              const entrada = {
                opacity: abierto ? 1 : 0,
                transform: abierto ? "none" : "translateY(-4px)",
                transition: abierto
                  ? `opacity 0.35s ease ${0.06 + i * 0.035}s, transform 0.45s ${curva} ${0.06 + i * 0.035}s`
                  : "opacity 0.15s ease, transform 0.15s ease",
              };
              return (
                <li key={l.label} style={entrada}>
                  {l.submenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setAbierta(esta ? null : l.label)}
                        aria-expanded={esta}
                        className={fila}
                        tabIndex={abierto ? 0 : -1}
                      >
                        {l.label}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className={cn("h-3.5 w-3.5 transition-transform duration-300", esta && "rotate-180")}
                        >
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {/* Acordeón con altura animada: la rejilla pasa de 0fr a 1fr. */}
                      <div
                        className="grid"
                        style={{
                          gridTemplateRows: esta ? "1fr" : "0fr",
                          transition: `grid-template-rows 0.4s ${curva}`,
                        }}
                      >
                        <ul className="ml-3 min-h-0 overflow-hidden border-l border-black/10 pl-2">
                          {l.submenu.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                onClick={onCerrar}
                                tabIndex={abierto && esta ? 0 : -1}
                                className="block rounded-lg px-3 py-2 text-[13.5px] text-[var(--fg-muted)] transition-colors hover:bg-black/[0.04] hover:text-[var(--m-ink)]"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={l.href} onClick={onCerrar} className={fila} tabIndex={abierto ? 0 : -1}>
                      {l.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

/* Enlace al carrito con contador. Va aparte porque el contador solo existe
   despues de leer localStorage: hasta entonces no se pinta nada, para no
   renderizar en el servidor un numero que el cliente no tiene. */
function EnlaceCarrito({ className }: { className?: string }) {
  const { piezas, listo } = useCarrito();
  return (
    <Link href="/carrito" className={className}>
      <span className="hidden lg:inline">{nav.cart}</span>
      <span className="relative inline-flex">
        <CartIcon className="h-[15px] w-[15px]" />
        {listo && piezas > 0 && (
          <span
            aria-label={`${piezas} en el carrito`}
            className="absolute -right-2 -top-2 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-[var(--m-ink)] px-[3px] text-[9px] font-semibold leading-none text-white"
          >
            {piezas}
          </span>
        )}
      </span>
    </Link>
  );
}
