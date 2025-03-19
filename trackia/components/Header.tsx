import Link from "next/link";

function Header() {
    return (
      <header className="bg-[#003366] text-white p-4 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <img src="/Image/Logo.png" alt="Logo CCR" className="h-12" />
        </div>
        <h1 className="text-2xl font-bold ml-4">TOTEM TRACK IA CCR</h1>
      </header>
    );
  }
  
  export default Header;