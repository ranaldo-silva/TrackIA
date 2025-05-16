"use client";

import { useEffect, useState } from "react";
import feedbackApi from "@/services/feedbackApi"; // instância da API

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
  const [erroEnvio, setErroEnvio] = useState<string | null>(null); // estado para erros

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
      labelFeedback: "Sua Dúvida ou Crítica:",
      labelSugestao: "Sua Sugestão (Opcional):",
      labelFaqNome: "Nome (Opcional):",
      botao: "Enviar Feedback",
      saudacao: "Obrigado pelo seu feedback!",
      fechar: "Fechar",
      erro: "Ocorreu um erro ao enviar o feedback. Tente novamente.", // texto para erro
    },
    en: {
      titulo: "Send your Question, Suggestion or Complaint:",
      labelFeedback: "Your Question or Complaint:",
      labelSugestao: "Your Suggestion (Optional):",
      labelFaqNome: "Name (Optional):",
      botao: "Submit Feedback",
      saudacao: "Thank you for your feedback!",
      fechar: "Close",
      erro: "An error occurred while sending the feedback. Please try again.", // texto para erro
    },
    es: {
      titulo: "Envíe su Duda, Sugerencia o Crítica:",
      labelFeedback: "Su Duda o Crítica:",
      labelSugestao: "Su Sugerencia (Opcional):",
      labelFaqNome: "Nombre (Opcional):",
      botao: "Enviar Comentario",
      saudacao: "¡Gracias por tu comentario!",
      fechar: "Cerrar",
      erro: "Ocurrió un error al enviar el feedback. Por favor, inténtelo de nuevo.", // texto para erro
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroEnvio(null); // Limpa qualquer erro anterior

    try {
      const response = await feedbackApi.post("/Faq", { // Mantendo o endpoint /Faq 
        feedback: feedback,
        sugestao: sugestao,
        faq_nome: faqNome, // Ajustando os nomes dos campos para corresponder à tabela
        language: idioma, // Mantendo o idioma, se necessário
      });
      if (response.status === 201) {
        setEnviado(true);
        setFeedback("");
        setSugestao("");
        setFaqNome("");
      } else {
        setErroEnvio(textos[idioma].erro);
      }
    } catch (error: any) {
      console.error("Erro ao enviar feedback:", error);
      setErroEnvio(textos[idioma].erro);
    }
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

            <label htmlFor="feedback" className="block text-gray-700 text-sm font-bold mb-2">
              {textos[idioma].labelFeedback}
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-40 p-3 border rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#740000]"
              required
            />

            <label htmlFor="sugestao" className="block text-gray-700 text-sm font-bold mb-2">
              {textos[idioma].labelSugestao}
            </label>
            <textarea
              id="sugestao"
              value={sugestao}
              onChange={(e) => setSugestao(e.target.value)}
              className="w-full h-24 p-3 border rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#740000]"
            />

            <label htmlFor="faqNome" className="block text-gray-700 text-sm font-bold mb-2">
              {textos[idioma].labelFaqNome}
            </label>
            <input
              type="text"
              id="faqNome"
              value={faqNome}
              onChange={(e) => setFaqNome(e.target.value)}
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#740000]"
            />

            <button
              type="submit"
              className="bg-[#740000] hover:bg-[#970000] text-white font-bold py-2 px-4 rounded"
            >
              {textos[idioma].botao}
            </button>
            {erroEnvio && <p className="text-red-500 mt-2">{erroEnvio}</p>} {/* Exibe a mensagem de erro */}
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