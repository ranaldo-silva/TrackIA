"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import InatividadeWrapper from "@/components/InatividadeWrapper";
import Link from "next/link";
import { processTextCommand } from "@/services/ApiVoz";

export default function AssistenteVoz() {
  const [transcricao, setTranscricao] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [idioma, setIdioma] = useState("pt");
  const router = useRouter();

  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);

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
      aguardando: "Ouvindo...",
      processando: "Processando...",
      voceDisse: "Você disse:",
      respostaIA: "Resposta da IA:",
      erroIA: "Desculpe, houve um erro ao processar. Tente novamente.",
      microfoneNaoDisponivel: "Seu navegador não suporta reconhecimento de voz, ou o microfone não está disponível. Use Chrome ou Edge para melhor compatibilidade.",
      inicio: "Início",
    },
    en: {
      titulo: "Voice Assistant",
      botao: "Speak to Assistant",
      aguardando: "Listening...",
      processando: "Processing...",
      voceDisse: "You said:",
      respostaIA: "AI Response:",
      erroIA: "Sorry, there was an error processing. Please try again.",
      microfoneNaoDisponivel: "Your browser does not support voice recognition, or the microphone is not available. Use Chrome or Edge for better compatibility.",
      inicio: "Home",
    }
  };

  const iniciarGravacao = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setResposta(textos[idioma].microfoneNaoDisponivel);
      alert(textos[idioma].microfoneNaoDisponivel);
      return;
    }

    setCarregando(true);
    setTranscricao("");
    setResposta(textos[idioma].aguardando);
    isListeningRef.current = true;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = idioma === 'pt' ? 'pt-BR' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setCarregando(true);
      setResposta(textos[idioma].aguardando);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscricao(transcript);
      setResposta(textos[idioma].processando);

      try {
        const apiResponse = await processTextCommand(transcript, idioma);
        setResposta(apiResponse.response_text);
        speakText(apiResponse.response_text, idioma);

        // Redirecionamento baseado no conteúdo da resposta
        const respostaTexto = apiResponse.response_text.toLowerCase();
        if (idioma === "pt") {
          if (respostaTexto.includes("horário")) {
            router.push("/HorariosTrens");
          } else if (respostaTexto.includes("local")) {
            router.push("/LocaisProximos");
          } else if (respostaTexto.includes("mapa") || respostaTexto.includes("estação")) {
            router.push("/MapaSaidas");
          }
        } else {
          if (respostaTexto.includes("schedule")) {
            router.push("/HorariosTrens");
          } else if (respostaTexto.includes("location")) {
            router.push("/LocaisProximos");
          } else if (respostaTexto.includes("map") || respostaTexto.includes("station")) {
            router.push("/MapaSaidas");
          }
        }

      } catch (error: any) {
        console.error("Erro ao processar o texto no backend:", error.message);
        setResposta(error.message || textos[idioma].erroIA);
      } finally {
        setCarregando(false);
      }
    };

    recognition.onerror = (event) => {
      setCarregando(false);
      isListeningRef.current = false;
      let errorMessage = textos[idioma].erroIA;
      if (event.error === 'not-allowed') {
        errorMessage = "Acesso ao microfone negado.";
      } else if (event.error === 'no-speech') {
        errorMessage = "Não detectei fala.";
      } else if (event.error === 'audio-capture') {
        errorMessage = "Problema com o microfone.";
      }
      setResposta(errorMessage);
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        setTimeout(() => {
          if (isListeningRef.current) iniciarGravacao();
        }, 500);
      } else {
        setCarregando(false);
      }
    };

    speechRecognitionRef.current = recognition;
    recognition.start();
  };

  const pararGravacao = () => {
    if (speechRecognitionRef.current && isListeningRef.current) {
      isListeningRef.current = false;
      speechRecognitionRef.current.stop();
    }
    setCarregando(false);
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <InatividadeWrapper>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <h1 className="text-4xl text-white font-bold mb-8 text-center">{textos[idioma].titulo}</h1>

          <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 mb-6">
            <p className="text-lg mb-4 text-center font-medium">
              {carregando
                ? (isListeningRef.current ? textos[idioma].aguardando : textos[idioma].processando)
                : textos[idioma].botao}
            </p>

            <div className="flex justify-center mb-4">
              <button
                onClick={isListeningRef.current ? pararGravacao : iniciarGravacao}
                className={`py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ${
                  isListeningRef.current
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={carregando && !isListeningRef.current}
              >
                {isListeningRef.current ? "Parar de Falar" : "Falar com o Assistente"}
              </button>
            </div>

            {transcricao && (
              <div className="mt-6 border-t pt-4 border-gray-300">
                <h2 className="text-xl font-semibold mb-2">{textos[idioma].voceDisse}</h2>
                <p className="bg-gray-100 p-3 rounded-md italic">{transcricao}</p>
              </div>
            )}

            {resposta && (
              <div className="mt-6 border-t pt-4 border-gray-300">
                <h2 className="text-xl font-semibold mb-2">{textos[idioma].respostaIA}</h2>
                <p className="bg-gray-100 p-3 rounded-md">{resposta}</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link href="/">
              <span className="text-blue-300 hover:text-blue-100 transition-colors duration-200 underline">
                {textos[idioma].inicio}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </InatividadeWrapper>
  );
}
