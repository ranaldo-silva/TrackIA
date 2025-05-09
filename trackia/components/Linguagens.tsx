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
        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
      >
        <img src="/image/bandeira-do-brasil.png" alt="Português" className="h-10" />
      </button>
      <button
        onClick={() => mudarIdioma("en")}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
      >
        <img src="/image/estados-unidos-da-america.png" alt="Inglês" className="h-10" />
      </button>
      <button
        onClick={() => mudarIdioma("es")}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
      >
        <img src="/image/espanha.png" alt="Espanhol" className="h-10" />
      </button>
    </div>
  );
};

export default Linguagens;
