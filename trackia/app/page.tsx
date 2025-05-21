"use client";

import { useEffect, useState } from "react";
import BotoesNavegacao from "@/components/BotoesNavegacao";
import Linguagens from "@/components/Linguagens";
import InatividadeWrapper from "@/components/InatividadeWrapper";
import FeedbackModal from "@/components/FeedbackModal";

export default function Home() {
  const [idioma, setIdioma] = useState("pt");        // Estado para o idioma atual
  const [modalAberto, setModalAberto] = useState(false); // Estado para abrir ou fechar o modal de feedback
  const [zoom, setZoom] = useState(1);               // Estado de zoom (1 = 100%)

  useEffect(() => {
    // Recupera o idioma do localStorage (ou usa "pt" como padrão)
    const lang = localStorage.getItem("idiomaSelecionado") || "pt";
    setIdioma(lang);

    // Atualiza o idioma ao receber o evento customizado
    const atualizar = () => {
      const novo = localStorage.getItem("idiomaSelecionado") || "pt";
      setIdioma(novo);
    };

    window.addEventListener("idiomaAtualizado", atualizar);
    return () => window.removeEventListener("idiomaAtualizado", atualizar);
  }, []);

  // Textos em múltiplos idiomas
  const textos = {
    pt: {
      titulo: "Transformando sua experiência de viagem com tecnologia e praticidade.",
      qr: "Escaneie o QR Code para ver o estado atual das linhas de SP.",
      feedback: "✉️",
      aumentar: "Aumentar Zoom",
      diminuir: "Diminuir Zoom",
    },
    en: {
      titulo: "Transforming your travel experience with technology and convenience.",
      qr: "Scan the QR Code to see the current status of the SP lines.",
      feedback: "✉️",
      aumentar: "Zoom In",
      diminuir: "Zoom Out",
    },
    es: {
      titulo: "Transformando tu experiencia de viaje con tecnología y practicidad.",
      qr: "Escanea el código QR para ver el estado actual de las líneas de SP.",
      feedback: "✉️",
      aumentar: "Aumentar Zoom",
      diminuir: "Disminuir Zoom",
    },
  };

  return (
    <InatividadeWrapper>
      {/* Zoom aplicado globalmente a toda a tela */}
      <div style={{ zoom }} className="relative">
        <main className="p-4 text-center">
          <div className="mb-4">
            <h2 className="text-lg h-4">{textos[idioma].titulo}</h2>
            
            {/* Seletor de idioma */}
            <Linguagens />

            {/* QR Code centralizado */}
            <div className="flex justify-center mt-4">
              <img
                src="/Image/QrCode.PNG"
                alt="QR Code"
                className="w-auto h-auto max-w-xs max-h-xs object-contain"
              />
            </div>

            <p>{textos[idioma].qr}</p>

            {/* Botões de navegação da página */}
            <BotoesNavegacao />
          </div>
        </main>

        {/* Botão flutuante para abrir o modal de feedback */}
        <button
          onClick={() => setModalAberto(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#740000] hover:bg-[#970000] text-white font-bold text-2xl py-3 px-4 rounded-full shadow-lg transition duration-300"
          title="Enviar Feedback"
        >
          {textos[idioma].feedback}
        </button>

        {/* Botões de zoom - flutuantes na lateral direita, central verticalmente */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          {/* Aumentar zoom */}
          <button
            onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
            className="bg-gray-800 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700 transition"
            title={textos[idioma].aumentar}
          >
            A+
          </button>

          {/* Diminuir zoom */}
          <button
            onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.8))}
            className="bg-gray-800 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700 transition"
            title={textos[idioma].diminuir}
          >
            A−
          </button>
        </div>

        {/* Modal de feedback que aparece ao clicar no botão flutuante */}
        <FeedbackModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
      </div>
    </InatividadeWrapper>
  );
}
