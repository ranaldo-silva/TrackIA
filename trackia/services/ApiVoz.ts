// frontend/src/services/api.ts
import axios from 'axios';

// Interface para a resposta do backend
interface TextCommandResponse {
  transcript?: string;    // O que o usuário disse (opcional, para display)
  response_text: string;  // A resposta da IA em texto
}

// URL base do seu backend.
// Se você estiver usando Next.js, use NEXT_PUBLIC_ para variáveis de ambiente no frontend.
// Caso contrário, apenas 'http://localhost:5000'.
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api-flask-s4kx.onrender.com/';

/**
 * Envia o comando de texto para o backend e retorna a resposta da IA.
 * @param text O texto transcrito da fala do usuário.
 * @param language O idioma do comando (ex: 'pt', 'en').
 * @returns Promise com a resposta do backend.
 */
export const processTextCommand = async (text: string, language: string): Promise<TextCommandResponse> => {
  try {
    // Faz uma requisição POST para o endpoint de comando de texto do backend
    const response = await axios.post<TextCommandResponse>(`${BACKEND_URL}/api/text-command`, {
      text,
      language,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Erro de requisição Axios
      console.error("Erro ao enviar texto para a API:", error.response?.data || error.message);
      throw new Error(`Erro na comunicação com o servidor: ${error.response?.data?.message || error.message}`);
    } else {
      // Outros tipos de erro
      console.error("Erro inesperado ao processar comando de voz (texto):", error);
      throw new Error("Ocorreu um erro inesperado.");
    }
  }
};