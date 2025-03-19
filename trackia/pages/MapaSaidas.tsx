import Head from "next/head";
import HomeButton from "@/components/HomeButton";

export default function MapaSaidas() {
  return (
    <>
      <Head>
        <title>Mapa das Saídas</title>
      </Head>
      <div className="relative"> {/* Adicione relative aqui */}
        <HomeButton />
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
              Mapa das Saídas
            </h1>
            <div className="flex justify-center">
              <img
                src="/mapa-saidas.png"
                alt="Mapa das Saídas"
                className="max-w-full rounded-lg"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                Visualize o mapa das saídas para encontrar o melhor caminho.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}