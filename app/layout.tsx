import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { cn } from "@/utils";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESLIA, Ingles con IA",
  description:
    "Permite generar hojas de vocabularios y ejercicios interactivos usando AI para estudiantes de ESL(English as a second langauge) basado en la dificultad y tema seleccionado por el usuario",
  icons: [{ url: "/favicon.ico", sizes: "16x16", type: "image/png" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(outfit.className, "bg-bg relative")}>
        <Analytics />
        <SpeedInsights />
        <Header />
        <main className="flex h-full min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-2 py-12 pb-24 sm:px-8 lg:px-20 lg:py-24">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
