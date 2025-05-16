"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import mapaSaidasApi from "@/services/mapaSaidasApi"; // instância da API correta

interface MapaSaida {
  ID_ESTACAO: number;
  NOME_ESTACAO: string;
  LOCALIZACAO: string;
  ACESSIBILIDADE: boolean;
}

export default function MapaSaidas() {
  const [idioma, setIdioma] = useState("pt");
  const [estacoes, setEstacoes] = useState<MapaSaida[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchEstacoes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await mapaSaidasApi.get<MapaSaida[]>("/Estacao"); // endpoint correto
        setEstacoes(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar estações:", error);
        setError(textos[idioma].erroBuscar);
      } finally {
        setLoading(false);
      }
    };

    fetchEstacoes();
  }, [idioma]);

  const textos = {
    pt: {
      inicio: "Início",
      titulo: "Mapa de Saídas - Estações",
      carregando: "Carregando informações das estações...",
      erroBuscar: "Erro ao carregar informações das estações.",
      idEstacao: "ID Estação",
      nomeEstacao: "Nome da Estação",
      localizacao: "Localização",
      acessibilidade: "Acessível",
      sim: "Sim",
      nao: "Não",
      nenhumaEstacao: "Nenhuma estação encontrada.",
    },
    en: {
      inicio: "Home",
      titulo: "Departure Map - Stations",
      carregando: "Loading station information...",
      erroBuscar: "Error loading station information.",
      idEstacao: "Station ID",
      nomeEstacao: "Station Name",
      localizacao: "Location",
      acessibilidade: "Accessible",
      sim: "Yes",
      nao: "No",
      nenhumaEstacao: "No stations found.",
    },
    es: {
      inicio: "Inicio",
      titulo: "Mapa de Salidas - Estaciones",
      carregando: "Cargando información de las estaciones...",
      erroBuscar: "Error al cargar información de las estaciones.",
      idEstacao: "ID Estación",
      nomeEstacao: "Nombre de la Estación",
      localizacao: "Ubicación",
      acessibilidade: "Accesible",
      sim: "Sí",
      nao: "No",
      nenhumaEstacion: "No se encontraron estaciones.",
    },
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-4 right-4">
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            {textos[idioma].inicio}
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-indigo-400 mb-6">
          {textos[idioma].titulo}
        </h1>

        {loading && (
          <div className="text-gray-400 italic">{textos[idioma].carregando}</div>
        )}
        {error && <div className="text-red-500">{textos[idioma].erroBuscar}: {error}</div>}

        {!loading && !error && estacoes.length > 0 ? (
          <div className="shadow-lg rounded-md overflow-hidden bg-gray-800">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {textos[idioma].idEstacao}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {textos[idioma].nomeEstacao}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {textos[idioma].localizacao}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {textos[idioma].acessibilidade}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {estacoes.map((estacao) => (
                  <tr key={estacao.ID_ESTACAO} className="hover:bg-gray-800 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      {estacao.ID_ESTACAO}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {estacao.NOME_ESTACAO}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {estacao.LOCALIZACAO}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          estacao.ACESSIBILIDADE ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                      >
                        {estacao.ACESSIBILIDADE ? textos[idioma].sim : textos[idioma].nao}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && !error && (
            <div className="text-gray-400 italic">{textos[idioma].nenhumaEstacao}</div>
          )
        )}
      </div>
    </div>
  );
}