"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApiPyhton from "@/services/ApiPython"; // sua instância do axios

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManutencaoLoginModal({ isOpen, onClose }: LoginModalProps) {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [idioma, setIdioma] = useState("pt");
  const router = useRouter();

  useEffect(() => {
    const lang = localStorage.getItem("idiomaSelecionado") || "pt";
    setIdioma(lang);
  }, []);

  const textos = {
    pt: {
      titulo: "Acesso à Manutenção",
      nome: "Nome de usuário",
      senha: "Senha",
      entrar: "Entrar",
      erro: "Usuário ou senha incorretos",
      fechar: "Fechar",
    },
    en: {
      titulo: "Maintenance Access",
      nome: "Username",
      senha: "Password",
      entrar: "Login",
      erro: "Incorrect username or password",
      fechar: "Close",
    },
    es: {
      titulo: "Acceso de Mantenimiento",
      nome: "Nombre de usuario",
      senha: "Contraseña",
      entrar: "Ingresar",
      erro: "Nombre o contraseña incorrectos",
      fechar: "Cerrar",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!nome.trim() || !senha.trim()) {
      setErro(textos[idioma].erro);
      return;
    }

    try {
        const res = await ApiPyhton.get(`/Manutencao?nome=${nome}`);
        const usuario = res.data.find((u: any) => u.nome.toLowerCase() === nome.toLowerCase());

        if (usuario && usuario.senha === senha) {
            onClose(); // Fecha o modal
            router.push("/Manutencao"); // Redireciona
        } 
        else {
            setErro(textos[idioma].erro);
        }
    }catch (err) {
        console.error("Erro ao verificar login:", err);
        setErro(textos[idioma].erro);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70  text-black flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-[#740000] text-xl font-bold"
        >
          x
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#740000] text-center">
          {textos[idioma].titulo}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-semibold mb-1">
            {textos[idioma].nome}
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#740000]"
          />

          <label className="block text-gray-700 font-semibold mb-1">
            {textos[idioma].senha}
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#740000]"
          />

          {erro && <p className="text-red-600 mb-4 text-sm font-medium">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-[#740000] hover:bg-[#970000] text-white font-bold py-2 px-4 rounded"
          >
            {textos[idioma].entrar}
          </button>
        </form>
      </div>
    </div>
  );
}
