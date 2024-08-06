"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./worksheet/Button";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const supabase = createClient();
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("auth/signout"); // Or wherever you want to redirect after sign out
  };

  return (
    <header className="absolute top-8 z-10 flex w-full items-center justify-center px-4 text-center text-textContrast md:fixed md:top-3 md:px-10">
      <div className="hidden w-full items-center justify-between gap-8 rounded-full border border-primary bg-bg px-10 py-2 md:flex md:w-3/4">
        <p>ESLIA</p>
        <p>Con mucho amor y cariño para la comunidad hispano hablante - Joel Castillo 2024</p>
        {isSignedIn ? <button onClick={handleSignOut}>Cerrar Sesion</button> : <span>👋👋👋👋</span>}
      </div>
      <div className="center md:hidden">{isSignedIn && <Button onClick={handleSignOut}>Cerrar Sesion</Button>}</div>
    </header>
  );
}
