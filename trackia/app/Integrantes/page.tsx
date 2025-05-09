"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Integrante {
  nome: string;
  rm: string;
  foto: string;
  github: string;
  linkedin: string;
}

const integrantes: Integrante[] = [
  {
    nome: "Ranaldo José da Silva",
    rm: "RM559210",
    foto: "/Image/IMG-Ronaldo.jpg",
    github: "https://github.com/Ronaldo511722",
    linkedin: "https://www.linkedin.com/in/ranaldo-jos%C3%A9-da-silva-301955163/",
  },
  {
    nome: "Fabricio Jose da Silva",
    rm: "RM560694",
    foto: "/Image/IMG-Fabricio.jpg",
    github: "https://github.com/FabricioJ0se",
    linkedin: "https://www.linkedin.com/in/fabricio-jose-da-silva/",
  },
  {
    nome: "Lucas da Ressurreição Barbosa",
    rm: "RM560179",
    foto: "/Image/IMG-Lucas.jpg",
    github: "https://github.com/LucasRB-Tec",
    linkedin: "https://www.linkedin.com/in/lucas-ressurreicao/",
  },
];

export default function IntegrantesPage() {
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
      titulo: "Integrantes",
      inicio: "Início",
      rm: "RM",
    },
    en: {
      titulo: "Team Members",
      inicio: "Home",
      rm: "ID",
    },
    es: {
      titulo: "Integrantes",
      inicio: "Inicio",
      rm: "ID",
    },
  };

  return (
    <div className="p-8">
      <div className="absolute top-4 right-4">
        <Link
          href="/"
          className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded"
        >
          {textos[idioma].inicio}
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">
        {textos[idioma].titulo}
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {integrantes.map((int, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={int.foto}
              alt={int.nome}
              className="w-85 h-85 object-cover rounded-2xl mb-4 border"
            />
            <h2 className="text-xl font-semibold">{int.nome}</h2>
            <p className="text-sm text-gray-600">
              {textos[idioma].rm}: {int.rm}
            </p>
            <div className="mt-2 flex gap-4">
              <a
                href={int.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
              <a
                href={int.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
