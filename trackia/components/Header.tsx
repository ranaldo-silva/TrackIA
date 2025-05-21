"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#af0000] text-white p-7 flex items-center justify-center">
      <div className="p-4 rounded-lg flex items-center gap-4">
        <Link href="/">
          <img
            src="/Image/Logo.png"
            alt="Logo CCR"
            className="h-16 cursor-pointer hover:opacity-80 transition"
          />
        </Link>
        <h1 className="text-4xl font-bold">TRACK IA</h1>
      </div>
    </header>
  );
}
