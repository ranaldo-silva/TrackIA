"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManutencaoMenu() {
  const [idioma, setIdioma] = useState("pt");

  useEffect(() => {
    const lang = localStorage.getItem("idiomaSelecionado") || "pt";
    setIdioma(lang);
  }, []);

  const textos = {
    pt: {
      titulo: "ÁREA DE MANUTENÇÃO",
      equipe: "Visualizar Equipe",
      locais: "Configuração de Locais Próximos",
      faqs: "Ver Feedbacks",
      inicio: "Inicio"
    },
    en: {
      titulo: "MAINTENANCE AREA",
      equipe: "View Team",
      locais: "Nearby Location Settings",
      faqs: "View Feedbacks",
      inicio: "Home"
    },
    es: {
      titulo: "ÁREA DE MANTENIMIENTO",
      equipe: "Ver Equipo",
      locais: "Configuración de Lugares Cercanos",
      faqs: "Ver Comentarios",
      inicio: "Inicio"
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900">
      <div className="absolute top-4 right-4">
        <Link href="/" className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded">
          {textos[idioma].inicio}
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-16 text-blue-400 text-center">
        {textos[idioma].titulo}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link
          href="/Manutencao/Equipe"
          className="bg-[#740000] hover:bg-[#970000] text-white py-6 px-4 rounded-2xl shadow-lg text-center text-xl font-semibold transition-all duration-300"
        >
          {textos[idioma].equipe}
        </Link>

        <Link
          href="/Manutencao/ConLocais"
          className="bg-[#740000] hover:bg-[#970000] text-white py-6 px-4 rounded-2xl shadow-lg text-center text-xl font-semibold transition-all duration-300"
        >
          {textos[idioma].locais}
        </Link>

        <Link
          href="/Manutencao/Faqs"
          className="bg-[#740000] hover:bg-[#970000] text-white py-6 px-4 rounded-2xl shadow-lg text-center text-xl font-semibold transition-all duration-300"
        >
          {textos[idioma].faqs}
        </Link>
      </div>
    </main>
  );
}
