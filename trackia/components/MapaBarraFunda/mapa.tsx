// components/MapaBarraFunda/mapa.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corrigir ícones quebrados (especialmente no Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const MapaBarraFunda = () => {
  const barraFundaCoords: [number, number] = [-23.5263766,-46.6676544];

  return (
    <div className="h-[500px] w-full rounded-2xl shadow-lg overflow-hidden">
      <MapContainer
        center={barraFundaCoords}
        zoom={30}
        className="h-full w-full z-0"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={barraFundaCoords}>
          <Popup>
            Estação Palmeiras–Barra Funda 🚉<br />Ponto inicial!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapaBarraFunda;
