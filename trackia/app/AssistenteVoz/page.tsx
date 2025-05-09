"use client";

import { useEffect, useState } from "react";
import InatividadeWrapper from "@/components/InatividadeWrapper";

export default function AssistenteVoz() {
  const [transcricao, setTranscricao] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);
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
      titulo: "Assistente de Voz",
      botao: "Falar com o Assistente",
      aguardando: "Aguarde...",
      voceDisse: "Você disse:",
      respostaIA: "Resposta da IA:",
      erroIA: "Desculpe, houve um erro ao processar.",
    },
    en: {
      titulo: "Voice Assistant",
      botao: "Talk to the Assistant",
      aguardando: "Please wait...",
      voceDisse: "You said:",
      respostaIA: "AI Response:",
      erroIA: "Sorry, there was an error processing.",
    },
    es: {
      titulo: "Asistente de Voz",
      botao: "Hablar con el Asistente",
      aguardando: "Espere...",
      voceDisse: "Usted dijo:",
      respostaIA: "Respuesta de la IA:",
      erroIA: "Lo siento, hubo un error al procesar.",
    },
  };

  const reconhecerFala = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = idioma === "pt" ? "pt-BR" : idioma === "en" ? "en-US" : "es-ES";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event: any) => {
      const texto = event.results[0][0].transcript;
      setTranscricao(texto);
      await enviarParaIA(texto);
    };

    recognition.onerror = (event: any) => {
      console.error("Erro no reconhecimento:", event.error);
    };

    recognition.start();
  };

  const enviarParaIA = async (texto: string) => {
    setCarregando(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer SUA_CHAVE_OPENAI`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: texto }],
        }),
      });

      const data = await response.json();
      const mensagem = data.choices[0].message.content;
      setResposta(mensagem);
      falar(mensagem);
    } catch (err) {
      console.error("Erro ao conversar com a IA:", err);
      setResposta(textos[idioma].erroIA);
    } finally {
      setCarregando(false);
    }
  };

  const falar = (mensagem: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(mensagem);
    utterance.lang = idioma === "pt" ? "pt-BR" : idioma === "en" ? "en-US" : "es-ES";
    synth.speak(utterance);
  };

  return (
    <InatividadeWrapper>
      <div className="h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold mb-6">{textos[idioma].titulo}</h1>

        <button
          onClick={reconhecerFala}
          className={`bg-[#af0000] text-white px-6 py-3 rounded hover:bg-[#970000] text-lg flex items-center justify-center gap-2 ${
            carregando ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={carregando}
        >
          {carregando && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          {carregando ? textos[idioma].aguardando : textos[idioma].botao}
        </button>

        {transcricao && (
          <div className="mt-6">
            <h2 className="font-bold">{textos[idioma].voceDisse}</h2>
            <p>{transcricao}</p>
          </div>
        )}

        {resposta && (
          <div className="mt-4">
            <h2 className="font-bold">{textos[idioma].respostaIA}</h2>
            <p>{resposta}</p>
          </div>
        )}
      </div>
    </InatividadeWrapper>
  );
}
