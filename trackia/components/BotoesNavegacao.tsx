"use client";
import Link from "next/link";

const BotoesNavegacao = () => {
  const botoes = [
    { nome: "Horários de Trens", href: "/HorariosTrens" },
    { nome: "Mapa das Saídas", href: "/MapaSaidas" },
    { nome: "Locais Próximos", href: "/LocaisProximos" },
    { nome: "Assistente de Voz", href: "/AssistenteVoz" },
  ];

  return (
    <div className="flex justify-center gap-6 mt-8">
      {botoes.map((botao) => (
        <Link
          key={botao.href}
          href={botao.href}
          className="bg-[#af0000] text-white px-4 py-2 rounded hover:bg-[#970000]">
          {botao.nome}
        </Link>
      ))}
    </div>
  );
};

export default BotoesNavegacao;
