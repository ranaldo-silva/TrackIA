"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ApiPython from "@/services/ApiPython";

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
}

export default function EditarUsuario({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    ApiPython.get(`/Manutencao/${params.id}`)
      .then((res) =>
        res.data?.id_usuario ? setUsuario(res.data) : router.push("/Manutencao/Equipe")
      )
      .catch(() => {
        alert("Erro de conexão");
        router.push("/Manutencao/Equipe");
      });
  }, []);

  function atualizarCampo(campo: keyof Usuario, valor: string) {
    if (!usuario) return;
    setUsuario({ ...usuario, [campo]: valor });
  }

  function salvarAlteracoes() {
    if (usuario) {
      ApiPython.put(`/Manutencao/${usuario.id_usuario}`, usuario).then(() => {
        alert("Funcionário atualizado com sucesso!");
        router.push("/Manutencao/Equipe");
      });
    }
  }

  function deletarUsuario() {
    if (usuario) {
      ApiPython.delete(`/Manutencao/${usuario.id_usuario}`).then(() => {
        alert("Funcionário deletado com sucesso!");
        router.push("/Manutencao/Equipe");
      });
    }
  }

  if (!usuario)
    return (
      <p className="min-h-screen text-center mt-10">
        Carregando informações...
      </p>
    );

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <form className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#740000]">
          Edição de Funcionário
        </h1>

        <div className="space-y-2">
          <label htmlFor="campoNome">Nome Completo</label>
          <input
            id="campoNome"
            type="text"
            value={usuario.nome}
            onChange={(e) => atualizarCampo("nome", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoEmail">Email de Acesso</label>
          <input
            id="campoEmail"
            type="email"
            value={usuario.email}
            onChange={(e) => atualizarCampo("email", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoSenha">Senha</label>
          <input
            id="campoSenha"
            type="password"
            value={usuario.senha}
            onChange={(e) => atualizarCampo("senha", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={salvarAlteracoes}
            className="border border-gray-400 rounded-md py-2 hover:bg-green-600 hover:text-white transition cursor-pointer"
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={deletarUsuario}
            className="border border-gray-400 rounded-md py-2 hover:bg-red-600 hover:text-white transition cursor-pointer"
          >
            Deletar Usuário
          </button>
        </div>

        <a
          href="/Manutencao/Equipe"
          className="block text-center text-[#740000] underline mt-4"
        >
          ← Voltar para lista
        </a>
      </form>
    </main>
  );
}
