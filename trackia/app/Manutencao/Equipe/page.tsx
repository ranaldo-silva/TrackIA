"use client";

import ApiPython from "@/services/ApiPython";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
}

const ManutencaoUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiPython.get<Usuario[]>("/Manutencao");
        setUsuarios(response.data);
      } catch (e: any) {
        console.error("Erro ao buscar usuários:", e);
        setError("Não foi possível carregar os usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return (
      <div className="bg-white text-black p-6 min-h-screen flex items-center justify-center">
        Carregando usuários...
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
    <div className="bg-white text-black  py-8 px-4 flex flex-col items-center">
      <div className="absolute top-4 right-4">
        <Link href="/Manutencao" className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded">
          Voltar
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-[#740000] mb-8">Equipe de Manutenção</h1>

      <div className="w-full max-w-3xl space-y-4">
        {usuarios.length === 0 ? (
          <p className="text-black">Nenhum usuário cadastrado.</p>
        ) : (
          usuarios.map((usuario) => (
            <Link
              key={usuario.id_usuario}
              href={`/Manutencao/Equipe/${usuario.id_usuario}`}
              className="block p-4 border border-gray-300 rounded-xl transition-all hover:bg-gray-700 hover:text-white"
            >
              <p className="text-lg font-semibold">{usuario.nome}</p>
              <p className="text-sm">{usuario.email}</p>
            </Link>
          ))
        )}
      </div>

      <Link
        href="/Manutencao/Equipe/Cadastrar"
        className="mt-10 bg-[#740000] hover:bg-[#970000] text-white font-semibold py-3 px-6 rounded-xl transition-all"
      >
        Cadastrar Membro
      </Link>
    </div>
  );
};

export default ManutencaoUsuarios;
