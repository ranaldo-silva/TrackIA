"use client";

import ApiJava from "@/services/ApiJava";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastrarLocal() {
  const router = useRouter();

  const [NOME, setNome] = useState("");
  const [TIPO_LOCAL, setTipoLocal] = useState("");
  const [LOCALIZACAO, setLocalizacao] = useState("");
  const [HORA_ABERTURA, setHoraAbertura] = useState<number | "">("");
  const [HORA_FECHAMENTO, setHoraFechamento] = useState<number | "">("");
  const [DIAS_FUNCIONAMENTO, setDiasFuncionamento] = useState("");

  const salvarLocal = async () => {
    if (
      !NOME ||
      !TIPO_LOCAL ||
      !LOCALIZACAO ||
      HORA_ABERTURA === "" ||
      HORA_FECHAMENTO === "" ||
      !DIAS_FUNCIONAMENTO
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoLocal = {
      idLocal: "",
      NOME,
      TIPO_LOCAL,
      LOCALIZACAO,
      HORA_ABERTURA,
      HORA_FECHAMENTO,
      DIAS_FUNCIONAMENTO,
    };

    try {
      await ApiJava.post("/Locais", novoLocal);
      alert("Local cadastrado com sucesso!");
      router.push("/Manutencao/Locais");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar local.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#740000]">
          Cadastrar Local
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-[#740000]">Nome</label>
            <input
              type="text"
              value={NOME}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#740000]">Tipo do Local</label>
            <input
              type="text"
              value={TIPO_LOCAL}
              onChange={(e) => setTipoLocal(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#740000]">Localização</label>
            <input
              type="text"
              value={LOCALIZACAO}
              onChange={(e) => setLocalizacao(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#740000]">Hora de Abertura</label>
            <input
              type="number"
              value={HORA_ABERTURA}
              onChange={(e) => setHoraAbertura(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#740000]">Hora de Fechamento</label>
            <input
              type="number"
              value={HORA_FECHAMENTO}
              onChange={(e) => setHoraFechamento(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#740000]">Dias de Funcionamento</label>
            <input
              type="text"
              value={DIAS_FUNCIONAMENTO}
              onChange={(e) => setDiasFuncionamento(e.target.value)}
              placeholder="Ex: SEG-SEX, SEG-DOM"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <button
            type="button"
            onClick={salvarLocal}
            className="w-full bg-[#740000] hover:bg-[#970000] text-white font-semibold py-2 rounded-md transition"
          >
            Salvar Cadastro
          </button>

          <Link
            href="/Manutencao/Locais"
            className="block text-center text-[#740000] hover:underline mt-2"
          >
            ← Voltar para lista de locais
          </Link>
        </form>
      </div>
    </main>
  );
}
