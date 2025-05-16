// pages/HorariosTrens.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import horariosTremApi from "@/services/horariosTremApi"; // instância da API

interface HorarioTrem {
  ID_TREM: number;
  HORARIO_PARTIDA: string;
  HORARIO_CHEGADA: string;
  STATUS: string;
}

const formatarParaMinutos = (hora: string | null | undefined) => {
  if (typeof hora === 'string') {
    const partes = hora.split(':');
    if (partes.length === 2) {
      const minutos = parseInt(partes[1], 10);
      return `${minutos} <span class="text-sm text-gray-500">min</span>`;
    }
    return hora;
  }
  return String(hora); 
};

const getStatusStyle = (status: string) => {
  if (status === "Operante") {
    return "bg-green-500 text-white";
  } else if (status === "Manutenção") {
    return "bg-yellow-500 text-gray-800";
  } else {
    return "bg-red-500 text-white";
  }
};

export default function HorariosTrens() {
  const [idioma, setIdioma] = useState("pt");
  const [horarios, setHorarios] = useState<HorarioTrem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrlEndpoint = "/HorarioTrem"; // endpoint

  useEffect(() => {
    const carregarIdioma = () => {
      const lang = localStorage.getItem("idiomaSelecionado") || "pt";
      setIdioma(lang);
    };

    const buscarHorarios = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await horariosTremApi.get<HorarioTrem[]>(apiUrlEndpoint); // instância da API
        setHorarios(response.data);
      } catch (err: any) {
        console.error("Erro ao buscar horários:", err);
        setError(textos[idioma].erroBuscar);
      } finally {
        setLoading(false);
      }
    };

    carregarIdioma();
    buscarHorarios();
    window.addEventListener("idiomaAtualizado", carregarIdioma);
    return () => window.removeEventListener("idiomaAtualizado", carregarIdioma);
  }, [idioma, apiUrlEndpoint]); 

  const textos = {
    pt: {
      inicio: "Início",
      conteudo: "Horários de Trens",
      id: "ID",
      partida: "Partida",
      chegada: "Chegada",
      status: "Status",
      nenhumHorario: "Nenhum horário de trem encontrado.",
      carregando: "Carregando...",
      erroBuscar: "Erro ao buscar os horários dos trens.",
    },
    en: {
      inicio: "Home",
      conteudo: "Train Schedules",
      id: "ID",
      partida: "Departure",
      chegada: "Arrival",
      status: "Status",
      nenhumHorario: "No train schedules found.",
      carregando: "Loading...",
      erroBuscar: "Error fetching train schedules.",
    },
    es: {
      inicio: "Inicio",
      conteudo: "Horarios de Trenes",
      id: "ID",
      partida: "Salida",
      chegada: "Llegada",
      status: "Estado",
      nenhumHorario: "No se encontraron horarios de trenes.",
      carregando: "Cargando...",
      erroBuscar: "Error al obtener los horarios de los trenes.",
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
          {textos[idioma].conteudo}
        </h1>

        {loading && (
          <div className="text-gray-400 italic">{textos[idioma].carregando}</div>
        )}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && horarios.length > 0 ? (
          <div className="shadow-lg rounded-md overflow-hidden bg-gray-800">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {textos[idioma].id}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {textos[idioma].partida}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {textos[idioma].chegada}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {textos[idioma].status}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {horarios.map((horario, index) => (
                  <tr key={horario.ID_TREM} className="hover:bg-gray-800 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span dangerouslySetInnerHTML={{ __html: formatarParaMinutos(horario.HORARIO_PARTIDA) }} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span dangerouslySetInnerHTML={{ __html: formatarParaMinutos(horario.HORARIO_CHEGADA) }} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                          horario.STATUS
                        )}`}
                      >
                        {horario.STATUS}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && !error && (
            <div className="text-gray-400 italic">{textos[idioma].nenhumHorario}</div>
          )
        )}
      </div>
    </div>
  );
}