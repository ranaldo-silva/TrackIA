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
  const [idioma, setIdioma] = useState("pt");
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const textos = {
    pt: {
      titulo: "Edição de Funcionário",
      nome: "Nome Completo",
      email: "Email de Acesso",
      senha: "Senha",
      salvar: "Salvar Alterações",
      deletar: "Deletar Usuário",
      voltar: "← Voltar para lista",
      carregando: "Carregando informações...",
      sucessoUpdate: "Funcionário atualizado com sucesso!",
      sucessoDelete: "Funcionário deletado com sucesso!",
      erro: "Erro de conexão",
    },
    en: {
      titulo: "Edit User",
      nome: "Full Name",
      email: "Email",
      senha: "Password",
      salvar: "Save Changes",
      deletar: "Delete User",
      voltar: "← Back to list",
      carregando: "Loading data...",
      sucessoUpdate: "User successfully updated!",
      sucessoDelete: "User successfully deleted!",
      erro: "Connection error",
    },
    es: {
      titulo: "Editar Usuario",
      nome: "Nombre Completo",
      email: "Correo Electrónico",
      senha: "Contraseña",
      salvar: "Guardar Cambios",
      deletar: "Eliminar Usuario",
      voltar: "← Volver a la lista",
      carregando: "Cargando información...",
      sucessoUpdate: "¡Usuario actualizado con éxito!",
      sucessoDelete: "¡Usuario eliminado con éxito!",
      erro: "Error de conexión",
    },
  };

  useEffect(() => {
    const lang = localStorage.getItem("idiomaSelecionado") || "pt";
    setIdioma(lang);
    ApiPython.get(`/Manutencao/${params.id}`)
      .then((res) =>
        res.data?.id_usuario ? setUsuario(res.data) : router.push("/Manutencao/Equipe")
      )
      .catch(() => {
        alert(textos[idioma].erro);
        router.push("/Manutencao/Equipe");
      });
  }, []);

  function atualizarCampo(campo: keyof Usuario, valor: string) {
    if (!usuario) return;
    setUsuario({ ...usuario, [campo]: valor });
  }

  function salvarAlteracoes() {
    if (usuario) {
      ApiPython.put(`/Manutencao/${usuario.id_usuario}`, usuario)
        .then(() => {
          alert(textos[idioma].sucessoUpdate);
          router.push("/Manutencao/Equipe");
        });
    }
  }

  function deletarUsuario() {
    if (usuario) {
      ApiPython.delete(`/Manutencao/${usuario.id_usuario}`).then(() => {
        alert(textos[idioma].sucessoDelete);
        router.push("/Manutencao/Equipe");
      });
    }
  }

  if (!usuario)
    return (
      <p className="text-center mt-10">
        {textos[idioma].carregando}
      </p>
    );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#740000]">
          {textos[idioma].titulo}
        </h1>

        <div className="space-y-2">
          <label htmlFor="campoNome">{textos[idioma].nome}</label>
          <input
            id="campoNome"
            type="text"
            value={usuario.nome}
            onChange={(e) => atualizarCampo("nome", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoEmail">{textos[idioma].email}</label>
          <input
            id="campoEmail"
            type="email"
            value={usuario.email}
            onChange={(e) => atualizarCampo("email", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoSenha">{textos[idioma].senha}</label>
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
            {textos[idioma].salvar}
          </button>
          <button
            type="button"
            onClick={deletarUsuario}
            className="border border-gray-400 rounded-md py-2 hover:bg-red-600 hover:text-white transition cursor-pointer"
          >
            {textos[idioma].deletar}
          </button>
        </div>

        <a
          href="/Manutencao/Equipe"
          className="block text-center text-[#740000] underline mt-4"
        >
          {textos[idioma].voltar}
        </a>
      </form>
    </main>
  );
}