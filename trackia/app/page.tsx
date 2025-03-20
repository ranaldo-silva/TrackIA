'use client'
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Button from "../components/Button";
import QRCode from "@/components/QrCode";
import Footer from "@/components/Footer";
import HomeButton from "@/components/HomeButton";
import { useState } from "react"; 
import "./globals.css";

export default function Home() {
  const [zoomLevel, setZoomLevel] = useState(1); // Estado para controlar o zoom

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Aumenta o zoom, máximo de 2x
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Diminui o zoom, mínimo de 0.5x
  };

  const containerStyle = {
    transform: `scale(${zoomLevel})`,
    transition: "transform 0.2s ease-in-out", // Animação suave
  };

  const floatingButtonsStyle = {
    position: "fixed",
    top: "50%",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transform: "translateY(-50%)",
    zIndex: 1000, // Garante que os botões fiquem na frente
  };

  return (
    <>
      <Head>
        <title>Totem Inteligente</title>
      </Head>

      <div style={containerStyle}>
        {/* Conteúdo principal com zoom */}
        <main className="p-4 text-center">
          <div className="mb-4">
            <p className="text-lg text-gray-700">
              Transformando sua experiência de viagem com tecnologia e
              praticidade
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <Button
              label="Português"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
            >
              <img
                src="/Image/Brasil.png"
                alt="Bandeira do Brasil"
                className="w-6 h-6 mr-2"
              />
              Português
            </Button>
            <Button
              label="English"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
            >
              <img
                src="/Image/EUA.png"
                alt="Bandeira dos Estados Unidos"
                className="w-6 h-6 mr-2"
              />
              English
            </Button>
            <Button
              label="Espanhol"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded flex items-center"
            >
              <img
                src="/Image/Espanha.png"
                alt="Bandeira da Espanha"
                className="w-6 h-6 mr-2"
              />
              Espanhol
            </Button>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">Escaneie para Mais Informações</h2>
            <QRCode />
          </div>

          <p className="text-gray-600">
            Escaneie o QR Code para acessar o itinerário personalizado e
            informações diretamente no seu dispositivo.
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

      {/* Botões flutuantes de zoom */}
      <div style={floatingButtonsStyle}>
        <button
          onClick={handleZoomIn}
          className="bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <span style={{ fontSize: "24px" }}>+</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <span style={{ fontSize: "24px" }}>-</span>
        </button>
      </div>
    </>
  );
}