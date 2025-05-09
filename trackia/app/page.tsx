"use client";

import { useEffect, useState } from "react";
import BotoesNavegacao from "@/components/BotoesNavegacao";
import Linguagens from "@/components/Linguagens";
import InatividadeWrapper from "@/components/InatividadeWrapper";
import FeedbackModal from "@/components/FeedbackModal";

export default function Home() {
  const [idioma, setIdioma] = useState("pt");
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem("idiomaSelecionado") || "pt";
    setIdioma(lang);

    const atualizar = () => {
      const novo = localStorage.getItem("idiomaSelecionado") || "pt";
      setIdioma(novo);
    };

    window.addEventListener("idiomaAtualizado", atualizar);
    return () => window.removeEventListener("idiomaAtualizado", atualizar);
  }, []);

  const textos = {
    pt: {
      titulo: "Transformando sua experiência de viagem com tecnologia e praticidade.",
      qr: "Escaneie o QR Code para ver o estado atual das linhas de SP.",
      feedback: "✉️",
    },
    en: {
      titulo: "Transforming your travel experience with technology and convenience.",
      qr: "Scan the QR Code to see the current status of the SP lines.",
      feedback: "✉️",
    },
    es: {
      titulo: "Transformando tu experiencia de viaje con tecnología y practicidad.",
      qr: "Escanea el código QR para ver el estado actual de las líneas de SP.",
      feedback: "✉️",
    },
  };

  return (
    <InatividadeWrapper>
      <main className="p-4 text-center">
        <div className="mb-4">
          <h2 className="text-lg h-4">{textos[idioma].titulo}</h2>
          <Linguagens />
          <div className="flex justify-center mt-4">
            <img
              src="/image/QrCode.png"
              alt="Qr-Code"
              className="w-auto h-auto max-w-xs max-h-xs object-contain"
            />
          </div>
          <p>{textos[idioma].qr}</p>
          <BotoesNavegacao />
        </div>
      </main>

      {/* FAB de feedback */}
      <button
        onClick={() => setModalAberto(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#740000] hover:bg-[#970000] text-white font-bold text-2xl py-3 px-4 rounded-full shadow-lg transition duration-300"
        title="Enviar Feedback"
      >
        {textos[idioma].feedback}
      </button>

      <FeedbackModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
    </InatividadeWrapper>
  );
}
