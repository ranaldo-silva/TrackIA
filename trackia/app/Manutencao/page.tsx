'use client';
import { useEffect, useState } from 'react';
import manutencaoApi from '@/services/manutencaoApi';

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
  preferencias: string;
}

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [novo, setNovo] = useState<Omit<Usuario, 'id_usuario'>>({
    nome: '', email: '', senha: '', preferencias: ''
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    const res = await manutencaoApi.get('/Manutencao');
    setUsuarios(res.data);
  };

  const adicionar = async () => {
    await manutencaoApi.post('/Manutencao', novo);
    setNovo({ nome: '', email: '', senha: '', preferencias: '' });
    carregarUsuarios();
  };

  const atualizar = async (id: number) => {
    const usuario = usuarios.find(u => u.id_usuario === id);
    if (usuario) {
      await manutencaoApi.put(`/Manutencao/${id}`, usuario);
      carregarUsuarios();
    }
  };

  const deletar = async (id: number) => {
    await manutencaoApi.delete(`/Manutencao/${id}`);
    carregarUsuarios();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>

      <div className="mb-6 space-y-2">
        {['nome', 'email', 'senha', 'preferencias'].map((campo) => (
          <input
            key={campo}
            placeholder={campo}
            value={(novo as any)[campo]}
            onChange={(e) => setNovo({ ...novo, [campo]: e.target.value })}
            className="block p-2 border rounded w-full"
          />
        ))}
        <button onClick={adicionar} className="bg-green-600 text-white p-2 w-full rounded">
          Adicionar Usuário
        </button>
      </div>

      <h2 className="text-xl mb-2">Usuários Cadastrados</h2>
      {usuarios.map((u) => (
        <div key={u.id_usuario} className="border p-4 mb-4 rounded">
          {['nome', 'email', 'senha', 'preferencias'].map((campo) => (
            <input
              key={campo}
              value={(u as any)[campo]}
              onChange={(e) =>
                setUsuarios(usuarios.map(us =>
                  us.id_usuario === u.id_usuario ? { ...us, [campo]: e.target.value } : us
                ))
              }
              className="block mb-2 w-full p-2 border rounded"
            />
          ))}
          <div className="flex gap-2">
            <button onClick={() => atualizar(u.id_usuario)} className="bg-yellow-500 text-white px-4 py-1 rounded">
              Atualizar
            </button>
            <button onClick={() => deletar(u.id_usuario)} className="bg-red-600 text-white px-4 py-1 rounded">
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
