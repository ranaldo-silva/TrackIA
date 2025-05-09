"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TelaEspera() {
  const router = useRouter();

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
      style={{ backgroundImage: "url('/image/fundo-espera.jpg')" }}
    >
      {/* Overlay escurecido */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Conteúdo */}
      <div className="relative z-10 text-white text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4 animate-pulse drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Toque para começar
        </h1>
        <p className="text-2xl font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          Bem-vindo ao <span className="font-bold">TrackIA</span>
        </p>
      </div>
    </div>
  );
}
