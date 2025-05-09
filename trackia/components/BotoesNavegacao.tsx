"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const BotoesNavegacao = () => {
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
      horarios: "Horários de Trens",
      mapa: "Mapa das Saídas",
      locais: "Locais Próximos",
      assistente: "Assistente de Voz",
    },
    en: {
      horarios: "Train Schedules",
      mapa: "Exit Map",
      locais: "Nearby Places",
      assistente: "Voice Assistant",
    },
    es: {
      horarios: "Horarios de Trenes",
      mapa: "Mapa de Salidas",
      locais: "Lugares Cercanos",
      assistente: "Asistente de Voz",
    },
  };

  const botoes = [
    { nome: textos[idioma].horarios, href: "/HorariosTrens" },
    { nome: textos[idioma].mapa, href: "/MapaSaidas" },
    { nome: textos[idioma].locais, href: "/LocaisProximos" },
    { nome: textos[idioma].assistente, href: "/AssistenteVoz" },
  ];

  return (
    <div className="flex justify-center gap-6 mt-8">
      {botoes.map((botao) => (
        <Link
          key={botao.href}
          href={botao.href}
          className="bg-[#af0000] text-white px-4 py-2 rounded hover:bg-[#970000]"
        >
          {botao.nome}
        </Link>
      ))}
    </div>
  );
};

export default BotoesNavegacao;
