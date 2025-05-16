"use client";

import ApiPython from "@/services/ApiPython";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
}

export default function ListaEquipe() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [idioma, setIdioma] = useState("pt");
  const router = useRouter();

  const textos = {
    pt: {
      titulo: "Equipe de Manutenção",
      inicio: "Tela de Início",
      cadastrar: "Cadastrar Funcionário",
    },
    en: {
      titulo: "Maintenance Team",
      inicio: "Home Page",
      cadastrar: "Register Employee",
    },
    es: {
      titulo: "Equipo de Mantenimiento",
      inicio: "Pantalla de Inicio",
      cadastrar: "Registrar Empleado",
    },
  };

  useEffect(() => {
    const lang = localStorage.getItem("idiomaSelecionado") || "pt";
    setIdioma(lang);

    ApiPython.get("/Manutencao").then((res) => setUsuarios(res.data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-[#740000] text-center">
          {textos[idioma].titulo}
        </h1>

        <ul className="space-y-4">
          {usuarios.map((usuario) => (
            <li
              key={usuario.id_usuario}
              onClick={() => router.push(`/Manutencao/Equipe/${usuario.id_usuario}`)}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between text-sm text-[#740000] underline">
          <Link href="/Manutencao">← {textos[idioma].inicio}</Link>
          <Link href="/Manutencao/Equipe/Cadastrar">{textos[idioma].cadastrar} →</Link>
        </div>
      </div>
    </main>
  );
}
