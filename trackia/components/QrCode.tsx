const QRCode = () => {
  return (
    <div className="flex justify-center mt-4">
      <img 
        src="/Image/QrCode.png" // Caminho da Imagem do QrCode
        alt="QR Code"
        className="w-auto h-auto max-w-xs max-h-xs object-contain" // Ajusta ao tamanho original da imagem
      />
    </div>
  );
};

export default QRCode;
