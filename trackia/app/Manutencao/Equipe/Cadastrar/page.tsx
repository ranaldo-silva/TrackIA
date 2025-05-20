"use client";

import ApiPython from "@/services/ApiPython";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastrarUsuario() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const salvarUsuario = async () => {
  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoUsuario = {
    id_usuario: "", // ← Gatilho pro backend gerar o ID
    nome: nome,
    email: email,
    senha: senha
  };

  try {
    await ApiPython.post("/Manutencao", novoUsuario);
    alert("Funcionário cadastrado com sucesso!");
    router.push("/Manutencao/Equipe");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao cadastrar funcionário.");
  }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#740000]">
          Cadastrar Funcionário
        </h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="nome" className="block font-medium mb-1 text-[#740000]">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#740000]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-[#740000]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#740000]"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block font-medium mb-1 text-[#740000]">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#740000]"
            />
          </div>

          <button
            type="button"
            onClick={salvarUsuario}
            className="w-full bg-[#740000] hover:bg-[#970000] text-white font-semibold py-2 rounded-md transition"
          >
            Salvar Cadastro
          </button>

          <Link
            href="/Manutencao/Equipe"
            className="block text-center text-[#740000] hover:underline mt-2"
          >
            ← Voltar para lista de funcionários
          </Link>
        </form>
      </div>
    </main>
  );
}
