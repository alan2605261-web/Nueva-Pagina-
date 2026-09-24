import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CarritoProvider } from "@/components/CarritoProvider";
import { DatosOrganizacion, SITIO } from "@/components/DatosEstructurados";

// Aileron — Mente Fria's brand grotesque (Helvetica-Neue family), self-hosted.
const aileron = localFont({
  variable: "--font-aileron",
  display: "swap",
  src: [
    { path: "../../public/fonts/Aileron-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Aileron-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Aileron-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Aileron-Bold.otf", weight: "700", style: "normal" },
  ],
});

/* metadataBase hace que las rutas relativas de las imagenes sociales salgan
   absolutas, que es como las piden WhatsApp, Facebook y X. Sin esto ninguna
   vista previa cargaba imagen (sep 2026). El bloque openGraph vive aqui para
   que TODA pagina herede una imagen aunque no declare la suya. */
export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "Cold plunge en México | Mente Fria",
    template: "%s | Mente Fria",
  },
  description:
    "MF ONE, MF Horizon y MF Barrel: tinas de inmersión en frío con enfriamiento activo, filtración y control desde la app. Envío a todo México.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Mente Fria",
    images: [
      {
        url: "/images/og-mente-fria.jpg",
        width: 1200,
        height: 630,
        alt: "Tina de inmersión en frío MF ONE de Mente Fria",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${aileron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DatosOrganizacion />
        <CarritoProvider>{children}</CarritoProvider>
      </body>
    </html>
  );
}
