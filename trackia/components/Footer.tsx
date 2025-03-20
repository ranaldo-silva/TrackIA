import React from "react";
import Link from "next/link";

interface FooterProps {
  children?: React.ReactNode;
}

function Footer({ children }: FooterProps) {
  return (
    <footer className="bg-blue-500 text-white p-4 text-center">
      <p>Desenvolvido pelo Grupo Help Full CCR - 2025</p>
      <div className="flex justify-center mt-4">
        <a href="#" className="mx-2">
          <img src="Image/facebook.png" alt="Facebook" className="w-6 h-6" />
        </a>
        <a href="#" className="mx-2">
          <img src="/Image/Twitter.jpg" alt="Twitter" className="w-6 h-6" />
        </a>
        <a href="#" className="mx-2">
          <img src="/Image/Instagran.jpg" alt="Instagram" className="w-6 h-6" />
        </a>
        <a href="#" className="mx-2">
          <img src="/Image/Linkedin.png" alt="LinkedIn" className="w-6 h-6" />
        </a>
      </div>
      <div className="mt-4 flex justify-center">
        <Link
          href="/Integrantes"
          className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded" 
        >
          Desenvolvedores
        </Link>
        <Link
          href="/Feedback"
          className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded ml-2" 
        >
          Fale Conosco
        </Link>
      </div>
      {children}
    </footer>
  );
}

export default Footer;