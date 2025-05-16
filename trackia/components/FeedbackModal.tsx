"use client";

import { useEffect, useState } from "react";
import ApiJava from "@/services/ApiJava";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [sugestao, setSugestao] = useState("");
  const [faqNome, setFaqNome] = useState("");
  const [idioma, setIdioma] = useState("pt");
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

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
      labelNome: "Nome (Obrigatório):",
      labelFeedback: "Sua Dúvida ou Crítica (Opcional):",
      labelSugestao: "Sua Sugestão (Opcional):",
      botao: "Enviar Feedback",
      saudacao: "Obrigado pelo seu feedback!",
      fechar: "Fechar",
      erro: "Erro ao enviar. Tente novamente.",
    },
    en: {
      titulo: "Send your Question, Suggestion or Complaint:",
      labelNome: "Name (Required):",
      labelFeedback: "Your Question or Complaint (Optional):",
      labelSugestao: "Your Suggestion (Optional):",
      botao: "Submit Feedback",
      saudacao: "Thank you for your feedback!",
      fechar: "Close",
      erro: "Error sending. Please try again.",
    },
    es: {
      titulo: "Envíe su Duda, Sugerencia o Crítica:",
      labelNome: "Nombre (Obligatorio):",
      labelFeedback: "Su Duda o Crítica (Opcional):",
      labelSugestao: "Su Sugerencia (Opcional):",
      botao: "Enviar Comentario",
      saudacao: "¡Gracias por tu comentario!",
      fechar: "Cerrar",
      erro: "Error al enviar. Intente nuevamente.",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroEnvio(null);

    if (!faqNome.trim()) {
      setErroEnvio("Nome é obrigatório.");
      return;
    }

    try {
      const response = await ApiJava.post("/Faq", {
        feedback,
        sugestao,
        faq_nome: faqNome,
        language: idioma,
      });

      if (response.status === 201) {
        setEnviado(true);
        setFeedback("");
        setSugestao("");
        setFaqNome("");
      } else {
        setErroEnvio(textos[idioma].erro);
      }
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      setErroEnvio(textos[idioma].erro);
    }
  };

  const handleClose = () => {
    onClose();
    setEnviado(false);
    setErroEnvio(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
        >
          x
        </button>

        {!enviado ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-[#740000]">
              {textos[idioma].titulo}
            </h2>

            <label htmlFor="faqNome" className="block text-sm font-semibold mb-1 text-gray-800">
              {textos[idioma].labelNome}
            </label>
            <input
              type="text"
              id="faqNome"
              value={faqNome}
              onChange={(e) => setFaqNome(e.target.value)}
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#740000]"
              required
            />

            <label htmlFor="feedback" className="block text-sm font-semibold mb-1 text-gray-800">
              {textos[idioma].labelFeedback}
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-32 p-3 border rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#740000]"
            />

            <label htmlFor="sugestao" className="block text-sm font-semibold mb-1 text-gray-800">
              {textos[idioma].labelSugestao}
            </label>
            <textarea
              id="sugestao"
              value={sugestao}
              onChange={(e) => setSugestao(e.target.value)}
              className="w-full h-24 p-3 border rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#740000]"
            />

            <button
              type="submit"
              className="bg-[#740000] hover:bg-[#970000] text-white font-bold py-2 px-6 rounded transition"
            >
              {textos[idioma].botao}
            </button>

            {erroEnvio && <p className="text-red-600 mt-3">{erroEnvio}</p>}
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#740000] mb-4">
              {textos[idioma].saudacao}
            </h2>
            <button
              onClick={handleClose}
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
            >
              {textos[idioma].fechar}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
