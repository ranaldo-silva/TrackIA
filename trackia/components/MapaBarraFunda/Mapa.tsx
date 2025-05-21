"use client";

import dynamic from 'next/dynamic';

// Importa o mapa original sem SSR (server-side rendering)
const MapaBarraFunda = dynamic(() => import('./MapaBarraFunda'), {
  ssr: false,
});

export default MapaBarraFunda;
