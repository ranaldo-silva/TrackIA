"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ApiJava from "@/services/ApiJava";

interface LocalProximo {
  idLocal: number;
  TIPO_LOCAL: string;
  NOME: string;
  LOCALIZACAO: string;
  HORA_ABERTURA: number;
  HORA_FECHAMENTO: number;
  DIAS_FUNCIONAMENTO: string;
}

export default function EditarLocal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [local, setLocal] = useState<LocalProximo | null>(null);

  useEffect(() => {
    ApiJava.get(`/Locais/${params.id}`)
      .then((res) =>
        res.data?.idLocal ? setLocal(res.data) : router.push("/Manutencao/Locais")
      )
      .catch(() => {
        alert("Erro de conexão");
        router.push("/Manutencao/Locais");
      });
  }, []);

  function atualizarCampo(campo: keyof LocalProximo, valor: string | number) {
    if (!local) return;
    setLocal({ ...local, [campo]: valor });
  }

  function salvarAlteracoes() {
    if (local) {
      ApiJava.put(`/Locais/${local.idLocal}`, local).then(() => {
        alert("Local atualizado com sucesso!");
        router.push("/Manutencao/Locais");
      });
    }
  }

  function deletarLocal() {
    if (local) {
      ApiJava.delete(`/Locais/${local.idLocal}`).then(() => {
        alert("Local deletado com sucesso!");
        router.push("/Manutencao/Locais");
      });
    }
  }

  if (!local)
    return (
      <p className="min-h-screen text-center mt-10">
        Carregando informações...
      </p>
    );

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <form className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#740000]">
          Edição de Local
        </h1>

        <div className="space-y-2">
          <label htmlFor="nomeLocal">Nome</label>
          <input
            id="nomeLocal"
            type="text"
            value={local.NOME}
            onChange={(e) => atualizarCampo("NOME", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tipoLocal">Tipo</label>
          <input
            id="tipoLocal"
            type="text"
            value={local.TIPO_LOCAL}
            onChange={(e) => atualizarCampo("TIPO_LOCAL", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="localizacao">Localização</label>
          <input
            id="localizacao"
            type="text"
            value={local.LOCALIZACAO}
            onChange={(e) => atualizarCampo("LOCALIZACAO", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="horaAbertura">Hora de Abertura</label>
          <input
            id="horaAbertura"
            type="number"
            value={local.HORA_ABERTURA}
            onChange={(e) => atualizarCampo("HORA_ABERTURA", Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="horaFechamento">Hora de Fechamento</label>
          <input
            id="horaFechamento"
            type="number"
            value={local.HORA_FECHAMENTO}
            onChange={(e) => atualizarCampo("HORA_FECHAMENTO", Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="diasFunc">Dias de Funcionamento</label>
          <input
            id="diasFunc"
            type="text"
            value={local.DIAS_FUNCIONAMENTO}
            onChange={(e) => atualizarCampo("DIAS_FUNCIONAMENTO", e.target.value)}
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
            onClick={deletarLocal}
            className="border border-gray-400 rounded-md py-2 hover:bg-red-600 hover:text-white transition cursor-pointer"
          >
            Deletar Local
          </button>
        </div>

        <a
          href="/Manutencao/Locais"
          className="block text-center text-[#740000] underline mt-4"
        >
          ← Voltar para lista
        </a>
      </form>
    </main>
  );
}
