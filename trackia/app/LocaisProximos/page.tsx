"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ApiJava from "@/services/ApiJava";

interface LocalProximo {
  ID_LOCAL: number;
  TIPO_LOCAL: string;
  NOME: string;
  LOCALIZACAO: string;
  HORA_ABERTURA: number;
  HORA_FECHAMENTO: number;
  DIAS_FUNCIONAMENTO: string;
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
      setLoading(true);
      setError(null);
      try {
        const response = await ApiJava.get<LocalProximo[]>("/Locais");
        setLocaisProximos(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar locais próximos:", error);
        setError(textos[idioma].erroBuscar);
      } finally {
        setLoading(false);
      }
    };

    fetchLocaisProximos();
  }, [idioma]);

  const textos = {
    pt: {
      titulo: "Locais Próximos",
      carregando: "Carregando locais próximos...",
      erroBuscar: "Erro ao carregar locais próximos",
      tipo: "Tipo",
      nome: "Nome",
      localizacao: "Localização",
      horaAbertura: "Abertura",
      horaFechamento: "Fechamento",
      diasFuncionamento: "Dias",
      nenhumLocal: "Nenhum local próximo encontrado.",
      inicio: "Início",
    },
    en: {
      titulo: "Nearby Places",
      carregando: "Loading nearby places...",
      erroBuscar: "Error loading nearby places",
      tipo: "Type",
      nome: "Name",
      localizacao: "Location",
      horaAbertura: "Opening",
      horaFechamento: "Closing",
      diasFuncionamento: "Days",
      nenhumLocal: "No nearby places found.",
      inicio: "Home",
    },
    es: {
      titulo: "Lugares Cercanos",
      carregando: "Cargando lugares cercanos...",
      erroBuscar: "Error al cargar lugares cercanos",
      tipo: "Tipo",
      nome: "Nombre",
      localizacao: "Ubicación",
      horaApertura: "Apertura",
      horaFechamento: "Cierre",
      diasFuncionamento: "Días",
      nenhumLocal: "No se encontraron lugares cercanos.",
      inicio: "Inicio",
    },
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-4 right-4">
          <Link
            href="/" className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded">
            {textos[idioma].inicio}
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-blue-400 mb-6">
          {textos[idioma].titulo}
        </h1>

        {loading && (
          <div className="text-gray-400 italic">{textos[idioma].carregando}</div>
        )}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && locaisProximos.length > 0 ? (
          <div className="shadow-lg rounded-md overflow-hidden bg-gray-800">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">{textos[idioma].tipo}</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">{textos[idioma].nome}</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">{textos[idioma].localizacao}</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">{textos[idioma].horaAbertura}</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">{textos[idioma].horaFechamento}</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">{textos[idioma].diasFuncionamento}</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {locaisProximos.map((local) => (
                  <tr key={local.ID_LOCAL} className="hover:bg-gray-800 transition duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-300">{local.ID_LOCAL}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{local.TIPO_LOCAL}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{local.NOME}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{local.LOCALIZACAO}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{local.HORA_ABERTURA}:00</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{local.HORA_FECHAMENTO}:00</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{local.DIAS_FUNCIONAMENTO}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && !error && (
            <div className="text-gray-400 italic">{textos[idioma].nenhumLocal}</div>
          )
        )}
      </div>
    </div>
  );
}
