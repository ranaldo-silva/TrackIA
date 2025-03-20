import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Button from "../components/Button";
import QRCode from "@/components/QrCode";
import Footer from "@/components/Footer";
import HomeButton from "@/components/HomeButton";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Totem Inteligente</title>
      </Head>

      <div>
        <main className="p-4 text-center">
          <div className="mb-4">
            <p className="text-lg text-gray-700">
              Transformando sua experiência de viagem com tecnologia e praticidade
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <Button
              label="Português"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
            >
              <img src="/Image/Brasil.png" alt="Bandeira do Brasil" className="w-6 h-6 mr-2" />
              Português
            </Button>
            <Button
              label="English"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
            >
              <img src="/Image/EUA.png" alt="Bandeira dos Estados Unidos" className="w-6 h-6 mr-2" />
              English
            </Button>
            <Button
              label="Espanhol"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded flex items-center"
            >
              <img src="/Image/Espanha.png" alt="Bandeira da Espanha" className="w-6 h-6 mr-2" />
              Espanhol
            </Button>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">Escaneie para Mais Informações</h2>
            <QRCode />
          </div>

          <p className="text-gray-600">
            Escaneie o QR Code para acessar o itinerário personalizado e informações diretamente no seu dispositivo.
          </p>

          <div className="flex justify-center space-x-4 mt-8">
            <Link href="/HorariosTrens">
              <Button
                label="Horários de Trens"
                className="bg-blue-900 hover:bg-blue-800 p-4 rounded text-white"
              />
            </Link>
            <Link href="/MapaSaidas">
              <Button
                label="Mapa das Saídas"
                className="bg-blue-900 hover:bg-blue-800 p-4 rounded text-white"
              />
            </Link>
            <Link href="LocaisProximos">
              <Button
                label="Locais Próximos"
                className="bg-blue-900 hover:bg-blue-800 p-4 rounded text-white"
              />
            </Link>
            <Link href="/AssistenteVoz">
              <Button
                label="Assistente de Voz"
                className="bg-blue-900 hover:bg-blue-800 p-4 rounded text-white"
              />
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}