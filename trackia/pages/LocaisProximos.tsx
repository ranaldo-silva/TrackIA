import Head from "next/head";
import HomeButton from "@/components/HomeButton";

export default function LocaisProximos() {
  const locais = [
    { nome: "Restaurante A", distancia: "100m" },
    { nome: "Cafeteria B", distancia: "200m" },
    { nome: "Loja C", distancia: "300m" },
  ];

  return (
    <>
      <Head>
        <title>Locais Próximos</title>
      </Head>
      <div className="relative"> {/* Adicione relative aqui */}
        <HomeButton />
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
              Locais Próximos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locais.map((local, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-sm p-4 text-left"
                >
                  <h2 className="text-xl font-semibold text-blue-800">
                    {local.nome}
                  </h2>
                  <p className="text-gray-700">Distância: {local.distancia}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}