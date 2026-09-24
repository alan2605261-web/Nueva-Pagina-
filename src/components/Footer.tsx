import Link from "next/link";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { COLECCIONES } from "@/lib/blog-posts";

/*
  Footer (ported from Claude Design site_v2): giant MIND OVER BODY cta,
  newsletter pill, four link columns, hairline bottom bar.
*/

/* Las colecciones del blog salen de los datos: si se agrega una, aparece sola
   en el footer. Nunca escribirlas a mano aquí. */
const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Productos",
    links: [
      { label: "MF ONE", href: "/productos/mf-one" },
      { label: "MF Horizon", href: "/productos/mf-horizon" },
      { label: "MF Barrel", href: "/productos/mf-barrel" },
      /* Decía "Motores y accesorios". Los motores tienen su propia página y
         entraban aquí de refilón (Rafa, sep 2026). */
      { label: "Accesorios", href: "/accesorios" },
      { label: "Motores", href: "/motores" },
    ],
  },
  {
    /* "Para negocios" colgaba de Productos. Es una línea de negocio aparte, con
       su propia página y sus secciones, así que va como columna propia. */
    title: "Para negocios",
    /* Cuatro enlaces, no siete: la columna con las siete secciones se veía
       saturada (Saul, sep 2026). Queda la general y las tres que le sirven a
       alguien que está evaluando el negocio. Las secciones que se quitaron
       —cotización, tipos de negocio, equipos comerciales y capacitación—
       siguen existiendo con su ancla dentro de /negocios. */
    links: [
      { label: "Para negocios", href: "/negocios" },
      { label: "Calculadora de ROI", href: "/negocios#roi" },
      { label: "Casos reales", href: "/negocios#casos" },
      { label: "Arrendamiento", href: "/negocios#arrendamiento" },
    ],
  },
  {
    title: "Blog",
    links: [
      ...COLECCIONES.map((c) => ({ label: c.nombre, href: `/blog/coleccion/${c.slug}` })),
      { label: "Todos los artículos", href: "/blog" },
    ],
  },
  {
    title: "Aprender",
    links: [
      { label: "La ciencia", href: "/aprender" },
      { label: "Consejo científico", href: "/aprender/consejo-cientifico" },
      { label: "Reseñas", href: "/resenas" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Centro de ayuda", href: "/soporte/centro-de-ayuda" },
      { label: "Garantía", href: "/garantia" },
      { label: "Garantía extendida", href: "/garantia/extendida" },
      { label: "Devoluciones", href: "/devoluciones" },
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Aviso de privacidad", href: "/privacidad" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mfooter">
      <div className="mwrap">
        {/* Computadora: las seis columnas de siempre. */}
        <div className="mfooter-cols !hidden md:!grid">
          <div>
            <Logo variant="white" className="h-6 w-auto" />
            <p className="blurb">
              La cold plunge #1 en México. Recuperarte y rendir al máximo desde
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

        {/* Celular: los mismos cinco grupos, pero plegados. En dos columnas se
            veian 24 enlaces de golpe y con las columnas de distinto largo
            quedaban huecos (Saul, sep 2026: "sobresaturado y mal acomodado").
            Plegados se ve la estructura y se abre lo que se busca. Va con
            <details>, asi que funciona sin JavaScript. */}
        <div className="mfooter-ac md:hidden">
          <Logo variant="white" className="h-6 w-auto" />
          <p className="blurb">
            La cold plunge #1 en México. Recuperarte y rendir al máximo desde
            casa.
          </p>
          {cols.map((c) => (
            <details key={c.title}>
              <summary>
                {c.title}
                <span className="mas" aria-hidden="true" />
              </summary>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="mfooter-bot">
          <span>© 2026 Mente Fria · Todos los derechos reservados</span>
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
