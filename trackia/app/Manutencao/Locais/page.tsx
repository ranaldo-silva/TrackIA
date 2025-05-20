"use client";

import ApiJava from "@/services/ApiJava";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LocalProximo {
  idLocal: number;
  TIPO_LOCAL: string;
  NOME: string;
  LOCALIZACAO: string;
  HORA_ABERTURA: number;
  HORA_FECHAMENTO: number;
  DIAS_FUNCIONAMENTO: string;
}

const LocaisProximos = () => {
  const [locais, setLocais] = useState<LocalProximo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocais = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiJava.get<LocalProximo[]>("/Locais");
        setLocais(response.data);
      } catch (e: any) {
        console.error("Erro ao buscar locais:", e);
        setError("Não foi possível carregar os locais.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocais();
  }, []);

  if (loading) {
    return (
      <div className="bg-white text-black p-6 min-h-screen flex items-center justify-center">
        Carregando locais...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 min-h-screen flex items-center justify-center text-red-700">
        Erro: {error}
      </div>
    );
  }

  return (
    <div className="bg-white text-black py-8 px-4 flex flex-col items-center">
      <div className="absolute top-4 right-4">
        <Link
          href="/Manutencao"
          className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded"
        >
          Voltar
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-[#740000] mb-8">Locais Próximos</h1>

      <div className="w-full max-w-4xl space-y-4">
        {locais.length === 0 ? (
          <p className="text-black">Nenhum local cadastrado.</p>
        ) : (
          locais.map((local) => (
            <Link
              key={local.idLocal}
              href={`/Manutencao/Locais/${local.idLocal}`}
              className="block p-4 border border-gray-300 rounded-xl hover:bg-gray-700 hover:text-white transition"
            >
              <p className="text-lg font-semibold">{local.NOME}</p>
              <p className="text-sm">Tipo: {local.TIPO_LOCAL}</p>
              <p className="text-sm">Localização: {local.LOCALIZACAO}</p>
              <p className="text-sm">Horário: {local.HORA_ABERTURA}h - {local.HORA_FECHAMENTO}h</p>
              <p className="text-sm">Funcionamento: {local.DIAS_FUNCIONAMENTO}</p>
            </Link>
          ))
        )}
      </div>

      <Link
        href="/Manutencao/Locais/Cadastrar"
        className="mt-10 bg-[#740000] hover:bg-[#970000] text-white font-semibold py-3 px-6 rounded-xl transition"
      >
        Cadastrar Local
      </Link>
    </div>
  );
};

export default LocaisProximos;
