import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HomeButton from '@/components/HomeButton';

interface Integrante {
  nome: string;
  rm: string;
  foto: string;
  github: string;
  linkedin: string;
}

const integrantes: Integrante[] = [
  {
    nome: 'Ranaldo José da Silva',             //Dev Front-End
    rm: 'RM559210',
    foto: '/Image/IMG-Ronaldo.jpg',
    github: 'https://github.com/Ronaldo511722',
    linkedin: 'https://www.linkedin.com/in/ranaldo-jos%C3%A9-da-silva-301955163/',
  },
  {
    nome: 'Fabricio Jose da Silva',             //Dev Dados
    rm: 'RM560694',
    foto: '/Image/IMG-Fabricio.jpg',
    github: 'https://github.com/FabricioJ0se',
    linkedin: 'https://www.linkedin.com/in/fabricio-jose-da-silva/',
  },
  {
    nome: 'Lucas da Ressurreição Barbosa',       //Dev Back-End
    rm: 'RM560179',
    foto: '/Image/IMG-Lucas.jpg',
    github: 'https://github.com/LucasRB-Tec',
    linkedin: 'https://www.linkedin.com/in/lucas-ressurreicao/',
  },
];

export default function IntegrantesPage() {
  return (
    <div>
        <HomeButton />
    <div className="p-4">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integrantes do Projeto</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {integrantes.map((integrante, index) => (
          <div key={index} className="border p-4 rounded-md">
            <Image
              src={integrante.foto}
              alt={`Foto de ${integrante.nome}`}
              width={200}
              height={200}
              className="rounded-lg mx-auto mb-2"
              objectFit="cover"
            />
            <h2 className="text-lg font-semibold">{integrante.nome}</h2>
            <p>RM: {integrante.rm}</p>
            <div className="mt-2">
              <Link
                href={integrante.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 text-blue-500 hover:underline"
              >
                GitHub
              </Link>
              <Link
                href={integrante.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
