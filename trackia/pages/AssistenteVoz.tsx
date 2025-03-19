import Head from "next/head";
import HomeButton from "@/components/HomeButton";

export default function AssistenteVoz() {
  return (
    <>
      <Head>
        <title>Assistente de Voz</title>
      </Head>
      <div className="relative"> {/* Adicione relative aqui */}
        <HomeButton />
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
              Assistente de Voz
            </h1>
            <p>Clique no botão abaixo para ativar o assistente de voz.</p>
            <button className="bg-blue-900 hover:bg-blue-800 p-4 rounded text-white">
              Ativar Assistente de Voz
            </button>
          </div>
        </main>
      </div>
    </>
  );
}