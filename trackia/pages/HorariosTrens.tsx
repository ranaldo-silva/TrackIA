import Head from "next/head";
import HomeButton from "@/components/HomeButton";
import "@/app/layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function HorariosTrens() {
  const horarios = [
    { trem: "Plataforma A", horario: "08:00" },
    { trem: "Plataforma B", horario: "08:30" },
    { trem: "Plataforma C", horario: "09:00" },
  ];

  return (
    <>
      <Head>
        <title>Horários de Trens</title>
      </Head>
      < Header/>
      
      <div>
        <HomeButton />
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
              Horários de Trens
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {horarios.map((horario, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-sm p-4 text-left"
                >
                  <h2 className="text-xl font-semibold text-blue-800">
                    {horario.trem}
                  </h2>
                  <p className="text-gray-700">Horário: {horario.horario}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
