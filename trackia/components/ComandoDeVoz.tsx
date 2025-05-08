import Link from "next/link";

export default function ComandoDeVoz(){
    return(
        <div>
            <div className="absolute top-4 right-4">
                <Link href="/"className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded">Início</Link>
            </div>
            <p>Ajuste com API</p>
        </div>
    )
}