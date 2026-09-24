/*
  Datos estructurados (JSON-LD).

  Hasta sep 2026 el sitio solo los tenia en el blog (Article) y en el centro de
  ayuda (FAQPage). Ni una ficha de producto declaraba precio, disponibilidad ni
  garantia, que es justo lo que leen Google y los asistentes de IA cuando
  alguien pregunta "cuanto cuesta una cold plunge en Mexico". Sin esto el
  catalogo era invisible para esa pregunta.

  Reglas:
  · Los precios son los mismos que muestra la ficha, sin IVA, en MXN. Si cambian
    en la pagina tienen que cambiar aqui: no hay una segunda fuente.
  · Los inflables llevan AggregateOffer porque su precio depende del motor.
  · Nada de aggregateRating inventado. Marcar estrellas que no vienen de
    reseñas reales es motivo de penalizacion y ademas seria mentira.
*/

export const SITIO = "https://mentefria.com";

function Json({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* Va una sola vez, en el layout. */
export function DatosOrganizacion() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${SITIO}/#organizacion`,
            name: "Mente Fria",
            url: SITIO,
            logo: `${SITIO}/images/og-mente-fria.jpg`,
            description:
              "Tinas de inmersión en frío con enfriamiento activo, filtración y control desde la app. Diseño y soporte en México.",
            areaServed: { "@type": "Country", name: "México" },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+52-56-1647-1386",
              contactType: "customer support",
              availableLanguage: ["es-MX"],
              email: "soporte@mentefria.com",
            },
            sameAs: [
              "https://www.instagram.com/mentefria.therapy",
              "https://www.tiktok.com/@mentefria___",
            ],
          },
          {
            "@type": "WebSite",
            "@id": `${SITIO}/#sitio`,
            url: SITIO,
            name: "Mente Fria",
            inLanguage: "es-MX",
            publisher: { "@id": `${SITIO}/#organizacion` },
          },
        ],
      }}
    />
  );
}

type Oferta =
  | { precio: number }
  | { desde: number; hasta: number };

export function DatosProducto({
  nombre,
  descripcion,
  imagenes,
  ruta,
  sku,
  oferta,
  garantiaMeses,
  propiedades,
}: {
  nombre: string;
  descripcion: string;
  imagenes: string[];
  ruta: string;
  sku: string;
  oferta: Oferta;
  garantiaMeses: number;
  propiedades?: [string, string][];
}) {
  const base = {
    "@type": "Offer" as const,
    priceCurrency: "MXN",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    url: `${SITIO}${ruta}`,
    seller: { "@id": `${SITIO}/#organizacion` },
  };

  const offers =
    "precio" in oferta
      ? { ...base, price: oferta.precio }
      : {
          "@type": "AggregateOffer",
          priceCurrency: "MXN",
          lowPrice: oferta.desde,
          highPrice: oferta.hasta,
          offerCount: 2,
          availability: "https://schema.org/InStock",
          url: `${SITIO}${ruta}`,
          seller: { "@id": `${SITIO}/#organizacion` },
        };

  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${SITIO}${ruta}#producto`,
        name: nombre,
        sku,
        description: descripcion,
        image: imagenes.map((i) => `${SITIO}${i}`),
        brand: { "@type": "Brand", name: "Mente Fria" },
        category: "Tina de inmersión en frío",
        offers,
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "MX",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Garantía",
            value: `${garantiaMeses} meses`,
          },
          ...(propiedades ?? []).map(([name, value]) => ({
            "@type": "PropertyValue",
            name,
            value,
          })),
        ],
      }}
    />
  );
}

export function Migas({ items }: { items: [string, string][] }) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map(([name, ruta], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          item: `${SITIO}${ruta}`,
        })),
      }}
    />
  );
}
