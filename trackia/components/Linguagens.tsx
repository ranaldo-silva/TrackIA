"use client";

import React from "react";

const Linguagens: React.FC = () => {
  const mudarIdioma = (lang: string) => {
    localStorage.setItem("idiomaSelecionado", lang);
    window.dispatchEvent(new Event("idiomaAtualizado")); // 🔔 avisa para a página reagir
  };

  return (
    <div className="flex gap-4 justify-center mt-6">
      <button
        onClick={() => mudarIdioma("pt")}
        className=""
      >
        <img src="/Image/bandeira-do-brasil.png" alt="Português" className="h-15" />
      </button>
      <button
        onClick={() => mudarIdioma("en")}
        className=""
      >
        <img src="/Image/estados-unidos-da-america.png" alt="Inglês" className="h-15" />
      </button>
      <button
        onClick={() => mudarIdioma("es")}
        className=""
      >
        <img src="/Image/Espanha.png" alt="Espanhol" className="h-17" />
      </button>
    </div>
  );
};

export default Linguagens;
