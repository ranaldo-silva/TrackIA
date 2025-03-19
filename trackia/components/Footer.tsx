import React from "react";

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
      {children}
    </footer>
  );
}

export default Footer;