"use client";

import ApiJava from "@/services/ApiJava";
import { useEffect, useState } from "react";

interface Feedback {
  ID_FAQ: number;
  FEEDBACK: string;
  SUGESTAO: string;
  FAQ_NOME: string;
}

const VerFeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiJava.get<Feedback[]>("/Faq");
        setFeedbacks(response.data);
      } catch (e: any) {
        console.error("Error fetching feedbacks:", e);
        setError("Falha ao carregar os feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div className="bg-gray-900 text-white p-6 min-h-screen flex items-center justify-center">Carregando feedbacks...</div>;
  }

  if (error) {
    return <div className="bg-gray-900 text-white p-6 min-h-screen flex items-center justify-center text-red-500">Erro ao carregar os feedbacks: {error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-indigo-500">Feedbacks dos Usuários</h1>
      {feedbacks.length === 0 ? (
        <p className="text-gray-400">Nenhum feedback disponível.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-xl">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Feedback</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sugestão</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {feedbacks.map((feedback) => (
                <tr key={feedback.ID_FAQ}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{feedback.ID_FAQ}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{feedback.FAQ_NOME}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{feedback.FEEDBACK}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{feedback.SUGESTAO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerFeedbacksPage;