import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeButton from "@/components/HomeButton";
import "@/app/layout";

export default function Integrantes() {
  const integrantes = [
    {
      nome: "Nome do Integrante 1",
      rm: "RM12345",
      foto: "/integrante1.jpg", // Substitua pelo caminho da foto
    },
    {
      nome: "Nome do Integrante 2",
      rm: "RM67890",
      foto: "/integrante2.jpg", // Substitua pelo caminho da foto
    },
    {
      nome: "Nome do Integrante 3",
      rm: "RM13579",
      foto: "/integrante3.jpg", // Substitua pelo caminho da foto
    },
  ];

  return (
  );
}