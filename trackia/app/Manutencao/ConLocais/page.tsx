"use client";

import ApiJava from "@/services/ApiJava";
import { useEffect, useState } from "react";

interface LocalProximo {
  ID_LOCAL?: number; // O ID pode ser gerado pelo backend
  TIPO_LOCAL: string;
  NOME: string;
  LOCALIZACAO: string;
  HORA_ABERTURA: string;
  HORA_FECHAMENTO: string;
  DIAS_FUNCIONAMENTO: string;
}

const LocaisProximosPage = () => {
  const [locais, setLocais] = useState<LocalProximo[]>([]);
  const [editingLocal, setEditingLocal] = useState<LocalProximo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocais();
  }, []);

  const fetchLocais = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiJava.get<LocalProximo[]>("/Locais");
      setLocais(response.data);
    } catch (error: any) {
      console.error("Erro ao buscar locais:", error);
      setError("Erro ao carregar os locais.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (local: LocalProximo | null = null) => {
    setEditingLocal(local);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingLocal(null);
    setIsModalOpen(false);
  };

  const handleSaveLocal = async (localData: LocalProximo) => {
    setError(null);
    try {
      if (localData.ID_LOCAL) {
        // Atualizar local existente
        await ApiJava.put(`/Locais/${localData.ID_LOCAL}`, localData);
      } else {
        // Cadastrar novo local
        await ApiJava.post("/Locais", localData);
      }
      fetchLocais(); // Recarrega os locais após salvar
      closeModal();
    } catch (error: any) {
      console.error("Erro ao salvar local:", error);
      setError("Erro ao salvar o local.");
    }
  };

  const handleDeleteLocal = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este local?")) {
      setError(null);
      try {
        await ApiJava.delete(`/Locais/${id}`);
        fetchLocais(); // Recarrega os locais após deletar
      } catch (error: any) {
        console.error("Erro ao excluir local:", error);
        setError("Erro ao excluir o local.");
      }
    }
  };

  if (loading) {
    return <div className="bg-gray-900 text-white p-6 min-h-screen flex items-center justify-center">Carregando locais...</div>;
  }

  if (error) {
    return <div className="bg-gray-900 text-white p-6 min-h-screen flex items-center justify-center text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-indigo-500">Configuração de Locais Próximos</h1>

      <button onClick={() => openModal(null)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4">
        Adicionar Novo Local
      </button>

      {locais.length === 0 ? (
        <p className="text-gray-400">Nenhum local cadastrado.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-xl">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Localização</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Abertura</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fechamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dias</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {locais.map((local) => (
                <tr key={local.ID_LOCAL}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{local.ID_LOCAL}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{local.TIPO_LOCAL}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{local.NOME}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{local.LOCALIZACAO}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{local.HORA_ABERTURA}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{local.HORA_FECHAMENTO}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{local.DIAS_FUNCIONAMENTO}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openModal(local)} className="text-indigo-500 hover:text-indigo-600 mr-2">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteLocal(local.ID_LOCAL!)} className="text-red-500 hover:text-red-600">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <LocalModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveLocal}
          local={editingLocal}
        />
      )}
    </div>
  );
};

// Componente Modal para adicionar/editar local
interface LocalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (localData: LocalProximo) => void;
  local: LocalProximo | null;
}

const LocalModal = ({ isOpen, onClose, onSave, local }: LocalModalProps) => {
  const [tipoLocal, setTipoLocal] = useState(local?.TIPO_LOCAL || "");
  const [nome, setNome] = useState(local?.NOME || "");
  const [localizacao, setLocalizacao] = useState(local?.LOCALIZACAO || "");
  const [horaAbertura, setHoraAbertura] = useState(local?.HORA_ABERTURA || "");
  const [horaFechamento, setHoraFechamento] = useState(local?.HORA_FECHAMENTO || "");
  const [diasFuncionamento, setDiasFuncionamento] = useState(local?.DIAS_FUNCIONAMENTO || "");

  useEffect(() => {
    if (local) {
      setTipoLocal(local.TIPO_LOCAL);
      setNome(local.NOME);
      setLocalizacao(local.LOCALIZACAO);
      setHoraAbertura(local.HORA_ABERTURA);
      setHoraFechamento(local.HORA_FECHAMENTO);
      setDiasFuncionamento(local.DIAS_FUNCIONAMENTO);
    } else {
      setTipoLocal("");
      setNome("");
      setLocalizacao("");
      setHoraAbertura("");
      setHoraFechamento("");
      setDiasFuncionamento("");
    }
  }, [local]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ID_LOCAL: local?.ID_LOCAL,
      TIPO_LOCAL: tipoLocal,
      NOME: nome,
      LOCALIZACAO: localizacao,
      HORA_ABERTURA: horaAbertura,
      HORA_FECHAMENTO: horaFechamento,
      DIAS_FUNCIONAMENTO: diasFuncionamento,
    });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
          <button onClick={onClose} className="absolute top-2 right-3 text-gray-400 hover:text-gray-300 text-2xl">
            x
          </button>
          <h2 className="text-xl font-semibold text-indigo-500 mb-4">{local ? 'Editar Local' : 'Adicionar Novo Local'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tipoLocal" className="block text-gray-300 text-sm font-bold mb-2">Tipo:</label>
              <input type="text" id="tipoLocal" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" value={tipoLocal} onChange={(e) => setTipoLocal(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="nome" className="block text-gray-300 text-sm font-bold mb-2">Nome:</label>
              <input type="text" id="nome" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="localizacao" className="block text-gray-300 text-sm font-bold mb-2">Localização:</label>
              <input type="text" id="localizacao" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="horaAbertura" className="block text-gray-300 text-sm font-bold mb-2">Hora de Abertura:</label>
              <input type="time" id="horaAbertura" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" value={horaAbertura} onChange={(e) => setHoraAbertura(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="horaFechamento" className="block text-gray-300 text-sm font-bold mb-2">Hora de Fechamento:</label>
              <input type="time" id="horaFechamento" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" value={horaFechamento} onChange={(e) => setHoraFechamento(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="diasFuncionamento" className="block text-gray-300 text-sm font-bold mb-2">Dias de Funcionamento:</label>
              <input type="text" id="diasFuncionamento" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white" value={diasFuncionamento} onChange={(e) => setDiasFuncionamento(e.target.value)} required />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2">Cancelar</button>
              <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default LocaisProximosPage;