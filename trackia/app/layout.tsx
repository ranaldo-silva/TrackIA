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
      <body>
        {!esconderLayout && <Header />}
        {children}
        {!esconderLayout && <Footer />}
      </body>
    </html>
  );
}
