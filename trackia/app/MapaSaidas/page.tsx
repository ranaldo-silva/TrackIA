"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MapaBarraFunda from "@/components/MapaBarraFunda/mapa";

export default function MapaSaidas() {
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
      inicio: "Início",
      conteudo: "Ajuste com API",
    },
    en: {
      inicio: "Home",
      conteudo: "Adjust with API",
    },
    es: {
      inicio: "Inicio",
      conteudo: "Ajuste con API",
    },
  };

  return (
    <div>
      <div className="absolute top-4 right-4">
        <Link
          href="/"
          className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded">
          {textos[idioma].inicio}
        </Link>
      </div>
      <div className="flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-[1200px] h-[600px] overflow-hidden">
          <MapaBarraFunda />
        </div>
      </div>
    </div>
  );
}
