import Link from "next/link";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { COLECCIONES } from "@/lib/blog-posts";
import { nav } from "@/lib/content";

/*
  Footer (ported from Claude Design site_v2): giant MIND OVER BODY cta,
  newsletter pill, four link columns, hairline bottom bar.
*/

/* El pie de pagina y el menu de arriba dicen lo mismo, y lo dicen una sola vez:
   las columnas de Productos, Aprender y Soporte SALEN del menu (Rafa, sep 2026:
   "deberian ser practicamente iguales"). Antes eran dos listas escritas a mano y
   se habian separado: al pie le faltaba "Encuentra tu plunge", le sobraba
   Motores colgando de Productos y escribia "MF ONE" donde el menu ya decia
   "MF One".

   Las dos columnas que siguen a mano son las que no tienen submenu arriba:
   Para negocios, que apunta a secciones dentro de su propia pagina, y Blog, que
   se arma con las colecciones. Las colecciones salen de los datos: si se agrega
   una, aparece sola. Nunca escribirlas aqui. */
const delMenu = (label: string) => {
  const item = nav.links.find((l) => l.label === label);
  return { title: label, links: item?.submenu ?? [{ label, href: item?.href ?? "/" }] };
};

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  delMenu("Productos"),
  delMenu("Aprender"),
  delMenu("Soporte"),
  {
    title: "Blog",
    links: [
      ...COLECCIONES.map((c) => ({ label: c.nombre, href: `/blog/coleccion/${c.slug}` })),
      { label: "Todos los artículos", href: "/blog" },
    ],
  },
  {
    /* Cuatro enlaces, no siete: la columna con las siete secciones se veia
       saturada (Saul, sep 2026). Queda la general y las tres que le sirven a
       alguien que esta evaluando el negocio. Las secciones que se quitaron
       (cotizacion, tipos de negocio, equipos comerciales y capacitacion) siguen
       existiendo con su ancla dentro de /negocios. */
    title: "Para negocios",
    links: [
      { label: "Para negocios", href: "/negocios" },
      { label: "Calculadora de ROI", href: "/negocios#roi" },
      { label: "Casos reales", href: "/negocios#casos" },
      { label: "Arrendamiento", href: "/negocios#arrendamiento" },
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
