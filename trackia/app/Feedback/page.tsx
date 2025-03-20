"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import HomeButton from '@/components/HomeButton';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Feedback enviado:', feedback);
    setFeedback('');
  };

  return (
    <div>
        <HomeButton />
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Envie seu Feedback</h1>
      </header>
      <div className="flex-grow flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-gray-700 text-sm font-bold mb-2">
              Envie sua Dúvida, Sugestão ou Critica:
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[300px]"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar Feedback
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}