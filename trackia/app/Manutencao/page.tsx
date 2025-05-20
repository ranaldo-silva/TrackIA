"use client";
import Link from "next/link";

export default function ManutencaoMenu() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-black">
      <div className="absolute top-4 right-4">
        <Link href="/" className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded">
          Início
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-16 text-[#740000] text-center">
        ÁREA DE MANUTENÇÃO
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link
          href="/Manutencao/Equipe"
          className="bg-[#740000] hover:bg-[#970000] text-white py-6 px-4 rounded-2xl shadow-md text-center text-xl font-semibold transition-all duration-300"
        >
          Visualizar Equipe
        </Link>

        <Link
          href="/Manutencao/Locais"
          className="bg-[#740000] hover:bg-[#970000] text-white py-6 px-4 rounded-2xl shadow-md text-center text-xl font-semibold transition-all duration-300"
        >
          Configuração de Locais Próximos
        </Link>

        <Link
          href="/Manutencao/Faqs"
          className="bg-[#740000] hover:bg-[#970000] text-white py-6 px-4 rounded-2xl shadow-md text-center text-xl font-semibold transition-all duration-300"
        >
          Ver Feedbacks
        </Link>
      </div>
    </main>
  );
}
