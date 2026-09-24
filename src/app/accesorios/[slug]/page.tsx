import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CompraAccesorio, GaleriaAccesorio } from "@/components/AccesorioCompra";
import { CONSUMIBLES, TODOS_LOS_ACCESORIOS, accesorioPorSlug } from "@/lib/accesorios";
import { ENVIO_ACCESORIO } from "@/lib/carrito";

/*
  Página de un accesorio: /accesorios/<slug>.

  Antes los accesorios existían solo como tarjetas en /accesorios, sin página y
  sin forma de comprarlos, y los filtros no llevaban a ningún lado (Saul, sep
  2026). Toma como referencia las páginas de producto del sitio vivo.

  Todo sale de src/lib/accesorios.ts: para dar de alta uno nuevo basta con
  agregarlo ahí y aparece su página.
*/

export function generateStaticParams() {
  return TODOS_LOS_ACCESORIOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = accesorioPorSlug(slug);
  return a
    ? { title: `${a.title}`, description: a.body }
    : { title: "Accesorio" };
}

export default async function AccesorioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = accesorioPorSlug(slug);
  if (!a) notFound();

  const imgs = a.imgs?.length ? a.imgs : a.img ? [a.img] : [];
  const esConsumible = CONSUMIBLES.some((c) => c.slug === a.slug);

  return (
    <PageShell>
      <section className="msection">
        <div className="mwrap">
          <Link
            href={esConsumible ? "/accesorios#mantenimiento" : "/accesorios#catalogo"}
            className="mb-8 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg-metal)]"
          >
            <ChevronLeft size={15} /> Accesorios
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <GaleriaAccesorio imgs={imgs} alt={a.title} render={a.render} />

            <div className="lg:pt-4">
              <span className="m-eyebrow accent">{esConsumible ? "Mantenimiento" : "Accesorios"}</span>
              <h1
                className="mdisplay mt-3 text-[clamp(32px,4vw,52px)] leading-[0.98]"
                style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
              >
                {a.title}
              </h1>

              <p className="mdisplay mt-5 text-[clamp(26px,2.6vw,34px)]">
                {a.precio === null ? "Consultar precio" : `$${a.precio.toLocaleString("en-US")}`}
                {a.precio !== null && (
                  <span className="ml-2 text-[13px] font-normal text-[var(--fg-subtle)]">MXN</span>
                )}
              </p>

              <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--fg-muted)]">{a.body}</p>

              {a.detalle && a.detalle.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {a.detalle.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[14.5px]">
                      <Check size={16} strokeWidth={2.4} className="mt-0.5 flex-none text-[var(--accent-ice)]" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 border-t border-[var(--line-1)] pt-8">
                <CompraAccesorio slug={a.slug} nombre={a.title} precio={a.precio} img={imgs[0] ?? ""} />
                {a.precio !== null && (
                  <p className="mt-4 text-[12.5px] text-[var(--fg-subtle)]">
                    Envío de ${ENVIO_ACCESORIO} MXN a todo México. Si lo pides junto con una tina, viaja con ella.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
