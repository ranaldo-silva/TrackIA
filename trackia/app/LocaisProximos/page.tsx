"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface LocalProximo {
  id: number;
  nome: string;
  tipo: string;
  endereco: string;
  avaliacao: number;
}

export default function LocaisProximos() {
  const [locaisProximos, setLocaisProximos] = useState<LocalProximo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchLocaisProximos = async () => {
      try {
        const response = await axios.get<LocalProximo[]>(
          "http://127.0.0.1:5000/api/locais-proximos"
        );
        setLocaisProximos(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLocaisProximos();
  }, []);

  const textos = {
    pt: {
      titulo: "Locais Próximos",
      carregando: "Carregando locais próximos...",
      erro: "Erro ao carregar locais próximos",
      endereco: "Endereço",
      avaliacao: "Avaliação",
      inicio: "Início",
    },
    en: {
      titulo: "Nearby Places",
      carregando: "Loading nearby places...",
      erro: "Error loading nearby places",
      endereco: "Address",
      avaliacao: "Rating",
      inicio: "Home",
    },
    es: {
      titulo: "Lugares Cercanos",
      carregando: "Cargando lugares cercanos...",
      erro: "Error al cargar lugares cercanos",
      endereco: "Dirección",
      avaliacao: "Valoración",
      inicio: "Inicio",
    },
  };

  if (loading) {
    return <div>{textos[idioma].carregando}</div>;
  }

  if (error) {
    return <div>{textos[idioma].erro}: {error}</div>;
  }

  return (
    <div>
      <div className="absolute top-4 right-4">
        <Link
          href="/"
          className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded"
        >
          {textos[idioma].inicio}
        </Link>
      </div>
      <h2>{textos[idioma].titulo}</h2>
      <ul>
        {locaisProximos.map((local) => (
          <li key={local.id}>
            <strong>{local.nome}</strong> ({local.tipo})<br />
            {textos[idioma].endereco}: {local.endereco}<br />
            {textos[idioma].avaliacao}: {local.avaliacao}/5
          </li>
        ))}
      </ul>
    </div>
  );
}
