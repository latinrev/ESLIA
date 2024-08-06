"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Signout from "./Signout";
import { useRouter } from "next/navigation";

export default function Header() {
  const supabase = createClient();
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
    };

    fetchUser();
  }, []);

  console.log(isSignedIn);
  return (
    <header className="fixed top-3 z-10 flex w-full items-center justify-center px-10 py-2 text-center text-textContrast">
      <div className="flex w-3/4 justify-between rounded-full border border-primary bg-bg px-10 py-2">
        <p>ESLIA</p>
        <p>Con mucho amor y cariño para la comunidad hispanohablante - Joel Castillo 2024</p>
        {isSignedIn ? (
          <div
            className="cursor-pointer"
            onClick={async () => {
              await supabase.auth.signOut({});
              setIsSignedIn(false);
              router.push("/");
            }}>
            <p>Cerrar Sesion</p>{" "}
          </div>
        ) : (
          <span>👋👋👋👋</span>
        )}
      </div>
    </header>
  );
}
