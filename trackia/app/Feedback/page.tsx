"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [idioma, setIdioma] = useState("pt");

  useEffect(() => {
    const carregarIdioma = () => {
      const lang = localStorage.getItem("idiomaSelecionado") || "pt";
      setIdioma(lang);
    };

    carregarIdioma();
    window.addEventListener("idiomaAtualizado", carregarIdioma);
    return () => window.removeEventListener("idiomaAtualizado", carregarIdioma);
  }, []);

  const textos = {
    pt: {
      titulo: "Envie sua Dúvida, Sugestão ou Critica:",
      botao: "Enviar Feedback",
      inicio: "Início",
    },
    en: {
      titulo: "Send your Question, Suggestion or Complaint:",
      botao: "Submit Feedback",
      inicio: "Home",
    },
    es: {
      titulo: "Envíe su Duda, Sugerencia o Crítica:",
      botao: "Enviar Comentario",
      inicio: "Inicio",
    },
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Feedback enviado:", feedback);
    setFeedback("");
  };

  return (
    <div>
      <div className="absolute top-4 right-4">
        <Link
          href="/"
          className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded"
        >
          {textos[idioma].inicio}
        </Link>
      </div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="mb-4">
              <label
                htmlFor="feedback"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {textos[idioma].titulo}
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[300px]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#740000] hover:bg-[#970000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {textos[idioma].botao}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
