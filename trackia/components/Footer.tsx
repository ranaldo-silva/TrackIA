"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
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
      desenvolvido: "Desenvolvido pelo Grupo Help Full CCR - 2025",
      desenvolvedores: "Desenvolvedores",
    },
    en: {
      desenvolvido: "Developed by Grupo Help Full CCR - 2025",
      desenvolvedores: "Developers",
    },
    es: {
      desenvolvido: "Desarrollado por Grupo Help Full CCR - 2025",
      desenvolvedores: "Desarrolladores",
    },
  };

  return (
    <footer className="bg-[#af0000] text-white p-5 text-center">
      <p>{textos[idioma].desenvolvido}</p>
      <div className="flex justify-center mt-4">
        <a href="#" className="mx-2">
          <img src="/Image/facebook.png" alt="Facebook" className="w-10 h-10" />
        </a>
        <a href="#" className="mx-2">
          <img src="/Image/twitter.png" alt="Twitter" className="w-10 h-10" />
        </a>
        <a href="#" className="mx-2">
          <img src="/Image/instagram.png" alt="Instagram" className="w-10 h-10" />
        </a>
        <a href="#" className="mx-2">
          <img src="/Image/linkedin.png" alt="LinkedIn" className="w-10 h-10" />
        </a>
      </div>
      <div className="mt-4 flex justify-center">
        <Link
          href="/Integrantes"
          className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded"
        >
          {textos[idioma].desenvolvedores}
        </Link>
      </div>
    </footer>
  );
}
