import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <main className="flex h-full min-h-screen flex-col items-center justify-center overflow-x-hidden bg-bg px-20 py-20">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
