"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const esconderLayout = pathname === "/TelaEspera";

  return (
    <html lang="pt-br">
      <head>
        <title>TrackIA</title>
        <meta name="description" content="Transformando sua experiência de viagem com tecnologia e praticidade." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {!esconderLayout && <Header />}
        {children}
        {!esconderLayout && <Footer />}
      </body>
    </html>
  );
}
