import { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o feedback
    console.log("Feedback enviado:", feedback);
    setFeedback("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Digite seu feedback aqui..."
        className="w-full p-2 border rounded-md mb-2"
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Enviar Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;