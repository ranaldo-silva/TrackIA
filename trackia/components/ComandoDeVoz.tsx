import React, { useEffect, useRef, useState } from 'react';
import { enviarAudioParaWatson } from '@/services/apiWatson';

const ComandoDeVoz: React.FC = () => {
  const [gravando, setGravando] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (gravando) iniciarGravacao();
    else pararGravacao();
  }, [gravando]);

  const iniciarGravacao = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      audioChunksRef.current = [];

      const base64 = await blobToBase64(blob);
      try {
        const audioBlob = await enviarAudioParaWatson(base64);
        const audioURL = URL.createObjectURL(audioBlob);
        new Audio(audioURL).play();
      } catch (error) {
        console.error(error);
      }

      if (gravando) {
        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), 4000);
      }
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 4000);
  };

  const pararGravacao = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(',')[1];
        resolve(base64data || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="p-4">
      <button
        className={`px-4 py-2 rounded ${gravando ? 'bg-red-600' : 'bg-green-600'} text-white`}
        onClick={() => setGravando(!gravando)}
      >
        {gravando ? 'Parar Voz' : 'Iniciar Voz'}
      </button>
    </div>
  );
};

export default ComandoDeVoz;
