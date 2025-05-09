"use client";

import { useEffect, useState } from "react";
import BotoesNavegacao from "@/components/BotoesNavegacao";
import Linguagens from "@/components/Linguagens";
import InatividadeWrapper from "@/components/InatividadeWrapper";

export default function Home() {
  const [idioma, setIdioma] = useState("pt");

  useEffect(() => {
    const carregarIdioma = () => {
      const lang = localStorage.getItem("idiomaSelecionado") || "pt";
      setIdioma(lang);
    };

    carregarIdioma(); // primeira carga

    // Escuta mudança de idioma vinda do componente Linguagens
    window.addEventListener("idiomaAtualizado", carregarIdioma);

    return () => {
      window.removeEventListener("idiomaAtualizado", carregarIdioma);
    };
  }, []);

  const textos = {
    pt: {
      titulo: "Transformando sua experiência de viagem com tecnologia e praticidade.",
      qr: "Escaneie o QR Code para ver o estado atual das linhas de SP.",
    },
    en: {
      titulo: "Transforming your travel experience with technology and convenience.",
      qr: "Scan the QR Code to see the current status of the SP lines.",
    },
    es: {
      titulo: "Transformando tu experiencia de viaje con tecnología y practicidad.",
      qr: "Escanea el código QR para ver el estado actual de las líneas de SP.",
    },
  };

  return (
    <InatividadeWrapper>
      <main className="p-4 text-center">
        <div className="mb-4">
          <h2 className="text-lg h-4">{textos[idioma].titulo}</h2>
          <Linguagens />
          <div className="flex justify-center mt-4">
            <img src="/image/QrCode.png" alt="Qr-Code" className="w-auto h-auto max-w-xs max-h-xs object-contain" />
          </div>
          <p>{textos[idioma].qr}</p>
          <BotoesNavegacao />
        </div>
      </main>
    </InatividadeWrapper>
  );
}
