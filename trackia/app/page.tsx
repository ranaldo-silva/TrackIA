import BotoesNavegacao from "@/components/BotoesNavegacao";
import Linguagens from "@/components/Linguagens";

export default function Home() {
  return (
    <main className="p-4 text-center">
      <div className="mb-4">
        <h2 className="text-lg h-4">Transformando sua experiência de viagem com tecnologia e praticidade.</h2>
        <Linguagens/>
        <div className="flex justify-center mt-4">
          <img src="/image/QrCode.png" alt="Qr=Code" className="w-auto h-auto max-w-xs max-h-xs object-contain"/>
        </div>
        <p> Escaneie o QR Code para ver o estado atual das linhas de SP.</p>
        <BotoesNavegacao/>
      </div>
    </main>
  );
}
