"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function TelaEspera() {
  const router = useRouter();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true, language: "pt-BR" });
  }, []);

  useEffect(() => {
    if (transcript !== "") {
      const texto = transcript.toLowerCase();

      if (texto.includes("começar") || texto.includes("iniciar")) {
        resetTranscript();
        router.push("/");
      }
    }
  }, [transcript, router, resetTranscript]);

  useEffect(() => {
    const handleClick = () => {
      router.push("/");
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/Image/fundo-espera.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 text-white text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4 animate-pulse drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Toque ou diga "começar"
        </h1>
        <p className="text-2xl font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          Bem-vindo ao <span className="font-bold">TrackIA</span>
        </p>
        <p className="mt-4 text-sm">{listening ? "Escutando..." : "Inativo"}</p>
      </div>
    </div>
  );
}
