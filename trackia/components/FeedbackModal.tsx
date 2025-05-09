"use client";

import { useEffect, useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [idioma, setIdioma] = useState("pt");
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem("idiomaSelecionado") || "pt";
    setIdioma(lang);

    const handleIdioma = () => {
      const novo = localStorage.getItem("idiomaSelecionado") || "pt";
      setIdioma(novo);
    };

    window.addEventListener("idiomaAtualizado", handleIdioma);
    return () => window.removeEventListener("idiomaAtualizado", handleIdioma);
  }, []);

  const textos = {
    pt: {
      titulo: "Envie sua Dúvida, Sugestão ou Crítica:",
      botao: "Enviar Feedback",
      saudacao: "Obrigado pelo seu feedback!",
      fechar: "Fechar",
    },
    en: {
      titulo: "Send your Question, Suggestion or Complaint:",
      botao: "Submit Feedback",
      saudacao: "Thank you for your feedback!",
      fechar: "Close",
    },
    es: {
      titulo: "Envíe su Duda, Sugerencia o Crítica:",
      botao: "Enviar Comentario",
      saudacao: "¡Gracias por tu comentario!",
      fechar: "Cerrar",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback enviado:", feedback);
    setEnviado(true);
    setFeedback("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ×
        </button>

        {!enviado ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">{textos[idioma].titulo}</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-40 p-3 border rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#740000]"
              required
            />
            <button
              type="submit"
              className="bg-[#740000] hover:bg-[#970000] text-white font-bold py-2 px-4 rounded"
            >
              {textos[idioma].botao}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#740000] mb-4">{textos[idioma].saudacao}</h2>
            <button
              onClick={onClose}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
            >
              {textos[idioma].fechar}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
