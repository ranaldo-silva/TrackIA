"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function(){
    return(
        <footer className="bg-[#af0000] text-white p-5 text-center">
            <p>Desenvolvido pelo Grupo Help Full CCR - 2025</p>
            <div className="flex justify-center mt-4">
                <a href="#" className="mx-2">
                <img src="Image/facebook.png" alt="Facebook" className="w-10 h-10" /></a>
                <a href="#" className="mx-2"><img src="/Image/twitter.png" alt="Twitter" className="w-10 h-10" /></a>
                <a href="#" className="mx-2"><img src="/Image/instagram.png" alt="Instagram" className="w-10 h-10" /></a>
                <a href="#" className="mx-2"><img src="/Image/linkedin.png" alt="LinkedIn" className="w-10 h-10" /></a>
            </div>
            <div className="mt-4 flex justify-center">
                <Link href="/Integrantes"className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded">Desenvolvedores</Link>
                <Link href="/Feedback" className="bg-[#740000] hover:bg-[#970000] text-white py-2 px-4 rounded ml-2">Fale Conosco</Link>
            </div>
        </footer>
    )
}
