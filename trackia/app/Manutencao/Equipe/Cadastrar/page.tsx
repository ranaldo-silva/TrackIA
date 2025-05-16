"use client";

import api from "@/services/ApiPython";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
}

export default function CadastrarUsuario() {
 
  const router = useRouter();
  const [idioma, setIdioma] = useState("pt");
  const textos = {
    pt: {
      titulo: "Cadastrar Funcionário",
      nome: "Nome completo",
      email: "Email",
      senha: "Senha",
      botao: "Salvar Cadastro",
      voltar: "← Voltar para lista de funcionários",
      sucesso: "Funcionário cadastrado com sucesso!",
      erro: "Erro ao cadastrar funcionário.",
    },
    en: {
      titulo: "Register Employee",
      nome: "Full name",
      email: "Email",
      senha: "Password",
      botao: "Save Registration",
      voltar: "← Back to Employee List",
      sucesso: "Employee registered successfully!",
      erro: "Error registering employee.",
    },
    es: {
      titulo: "Registrar Empleado",
      nome: "Nombre completo",
      email: "Correo electrónico",
      senha: "Contraseña",
      botao: "Guardar Registro",
      voltar: "← Volver a la lista de empleados",
      sucesso: "¡Empleado registrado con éxito!",
      erro: "Error al registrar al empleado.",
    },
  };

  const t = textos[idioma];

  const [usuario, setUsuario] = useState<Usuario>({
    id_usuario: 0,
    nome: "",
    email: "",
    senha: "",
  });

  function atualizarCampo(campo: keyof Usuario, valor: string) {
    setUsuario({ ...usuario, [campo]: valor });
  }

  function salvarUsuario() {
    api
      .post("/Manutencao", usuario)
      .then(() => {
        alert(t.sucesso);
        router.push("/Manutencao/Equipe");
      })
      .catch(() => {
        alert(t.erro);
      });
  }

  useEffect(() => {
      const lang = localStorage.getItem("idiomaSelecionado") || "pt";
      setIdioma(lang);
      }, []);
    

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#740000]">{t.titulo}</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="nome" className="block font-medium mb-1 text-[#740000]">
              {t.nome}
            </label>
            <input
              id="nome"
              type="text"
              value={usuario.nome}
              onChange={(e) => atualizarCampo("nome", e.target.value)}
              placeholder={t.nome}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-[#740000]">
              {t.email}
            </label>
            <input
              id="email"
              type="email"
              value={usuario.email}
              onChange={(e) => atualizarCampo("email", e.target.value)}
              placeholder={t.email}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block font-medium mb-1 text-[#740000]">
              {t.senha}
            </label>
            <input
              id="senha"
              type="password"
              value={usuario.senha}
              onChange={(e) => atualizarCampo("senha", e.target.value)}
              placeholder={t.senha}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="button"
            onClick={salvarUsuario}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition cursor-pointer"
          >
            {t.botao}
          </button>

          <a
            href="/Manutencao/Equipe"
            className="block text-center text-[#740000] hover:underline mt-2"
          >
            {t.voltar}
          </a>
        </form>
      </div>
    </main>
  );
}
