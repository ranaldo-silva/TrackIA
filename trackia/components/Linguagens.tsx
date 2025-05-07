"use client"

import React from "react";

const Linguagens: React.FC = () => {
  const traduzir = (lang: string) => {
    // Exemplo simples: redireciona para uma URL com o idioma
    // Substitua esse link com a URL real da sua API ou rota de tradução
    const url = `https://${lang}`;
    window.location.href = url;
  };

  return (
    <div className="flex gap-4 justify-center mt-6">
      <button
        onClick={() => traduzir("pt-br")}
        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded">
            <img src="/image/bandeira-do-brasil.png" alt="Logo Brasil" className="h-10"/>
      </button>
      <button
        onClick={() => traduzir("en")}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">
            <img src="/image/estados-unidos-da-america.png" alt="Logo Brasil" className="h-10"/>
      </button>
      <button
        onClick={() => traduzir("es")}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
        <img src="/image/espanha.png" alt="Logo Brasil" className="h-10"/>
      </button>
    </div>
  );
};

export default Linguagens;
