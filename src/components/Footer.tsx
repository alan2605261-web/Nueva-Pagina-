import Link from "next/link";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";

/*
  Footer (ported from Claude Design site_v2): giant MIND OVER BODY cta,
  newsletter pill, four link columns, hairline bottom bar.
*/

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Productos",
    links: [
      { label: "MF ONE", href: "/productos/mf-one" },
      { label: "MF Horizon", href: "/productos/mf-horizon" },
      { label: "MF Barrel", href: "/productos/mf-barrel" },
      { label: "Motores & Accesorios", href: "/accesorios" },
      { label: "Para Negocios", href: "/negocios" },
    ],
  },
  {
    title: "Aprender",
    links: [
      { label: "La Ciencia", href: "/aprender" },
      { label: "Atletas", href: "/atletas" },
      { label: "Reseñas", href: "/resenas" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Centro de Ayuda", href: "/soporte" },
      { label: "Garantía", href: "/garantia" },
      { label: "Devoluciones", href: "/devoluciones" },
      { label: "Términos y Condiciones", href: "/terminos" },
      { label: "Aviso de Privacidad", href: "/privacidad" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mfooter">
      <div className="mwrap">
        <div className="mfooter-cols">
          <div>
            <Logo variant="white" className="h-6 w-auto" />
            <p className="blurb">
              La Cold Plunge #1 en México. Recuperarte y rendir al máximo desde
              casa.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h5>{c.title}</h5>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mfooter-bot">
          <span>© 2026 Mente Fria · Hecho en México</span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/mentefria.therapy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Mente Fria: @mentefria.therapy"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://www.tiktok.com/@mentefria___"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Mente Fria: @mentefria___"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <TikTokIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
