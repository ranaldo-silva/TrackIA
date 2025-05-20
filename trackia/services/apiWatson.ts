// services/apiWatson.ts

export async function enviarAudioParaWatson(audioBase64: string): Promise<Blob> {
  const response = await fetch('http://localhost:3001/assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audioBase64 }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Erro ao comunicar com assistente');
  }

  return await response.blob();
}
