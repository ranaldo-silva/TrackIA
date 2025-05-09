"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InatividadeWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        router.push("/TelaEspera");
      }, 60000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [router]);

  return <>{children}</>;
}