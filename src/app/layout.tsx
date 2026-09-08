import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Mente Fria — Frío que transforma. Sin hielo.",
  description:
    "MF ONE, MF Horizon y MF Barrel: tinas de inmersión en frío con enfriamiento activo, filtración y control desde la app. Envío a todo México.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
