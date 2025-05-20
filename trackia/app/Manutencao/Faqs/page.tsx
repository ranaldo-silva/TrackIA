"use client";

import ApiJava from "@/services/ApiJava";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Feedback {
  ID_FAQ: number;
  FEEDBACK_: string;
  SUGESTAO: string;
  NOME_FAQ: string;
}

const VerFeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiJava.get<Feedback[]>("/Faq");
      setFeedbacks(response.data);
    } catch (e: any) {
      console.error("Erro ao buscar feedbacks:", e);
      setError("Não foi possível carregar os feedbacks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const deletarFeedback = async (id: number) => {
    try {
      await ApiJava.delete(`/Faq/${id}`);
      alert("Feedback deletado com sucesso!");
      fetchFeedbacks(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar feedback.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white text-black p-6 min-h-screen flex items-center justify-center">
        Carregando feedbacks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 min-h-screen flex items-center justify-center text-red-700">
        Erro: {error}
      </div>
    );
  }

  return (
    <div className="bg-white text-black py-8 px-4 flex flex-col items-center">
      <div className="absolute top-4 right-4">
        <Link
          href="/Manutencao"
          className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded"
        >
          Voltar
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-[#740000] mb-8">Feedbacks dos Usuários</h1>

      <div className="w-full max-w-4xl space-y-4">
        {feedbacks.length === 0 ? (
          <p className="text-black">Nenhum feedback disponível.</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb.ID_FAQ}
              className="p-4 border border-gray-300 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-gray-100 transition-all"
            >
              <div>
                <p className="text-lg font-semibold">{fb.NOME_FAQ}</p>
                <p className="text-sm text-gray-700"><strong>Feedback:</strong> {fb.FEEDBACK_}</p>
                <p className="text-sm text-gray-700"><strong>Sugestão:</strong> {fb.SUGESTAO}</p>
              </div>

              <button
                onClick={() => deletarFeedback(fb.ID_FAQ)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition"
              >
                Deletar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerFeedbacksPage;
