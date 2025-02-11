"use client";
import { Card } from "@/components/Card";
import { Button } from "@/components/worksheet/Button";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import GoogleIcon from "@/components/GoogleIcon";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
export default function Home() {
  const { isSignedIn } = useAuth();

  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://www.esliafacil.com/auth/success",
      },
    });
  };

  return (
    <AnimatePresence mode="wait" initial={true}>
      <div className="mt-14 flex flex-col gap-8 md:mt-8 lg:mt-0">
        <motion.div
          initial={{ y: "-5%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative flex h-full flex-col items-center gap-4 justify-self-start overflow-hidden px-4 pb-12 text-center md:p-12">
          <h1 className="text-5xl font-bold md:px-10 md:text-6xl">
            Aprende <span className="font-black text-textContrast">Ingles facil</span> con la{" "}
            <span className="font-black text-textContrast">ayuda</span> <br /> de la{" "}
            <span className="font-black text-textContrast">inteligencia artificial</span> 🎉
          </h1>
          <h4 className="text-lg font-medium md:px-10 md:text-2xl">
            Con <span className="font-bold text-textContrast"> ESLIA </span>genera hojas de{" "}
            <span className="font-bold text-textContrast">vocabulario</span> y{" "}
            <span className="font-bold text-textContrast">ejercicios</span>
            <br /> personalizadas a tu nivel de dificultad! 🤓
          </h4>
          <Button
            onClick={() => {
              isSignedIn ? router.push("/worksheets") : handleSignIn();
            }}>
            <span className="center flex gap-2">
              {!isSignedIn ? (
                <>
                  <GoogleIcon />
                  Iniciar sesion con Google
                </>
              ) : (
                "Ir a mis hojas de ejercicios"
              )}
            </span>
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: "10%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:px-36">
          <Card
            item={{
              emoji: "🏄🏼‍♂️",
              title: "Es facil!",
              description: "Ya que todo es personalizado puedes aprender los temas que quieras cuando quieras",
            }}
            withAction={false}
          />
          <Card
            item={{
              emoji: "🚀",
              title: "Aprendiendo ingles con ESLIA",
              description: "Aca podras generar hojas de vocabulario y ejercicios que te resultaran increible para aprender ingles",
            }}
            withAction={false}
          />
          <Card
            item={{
              emoji: "💸",
              title: "Gratis! ",
              description: "Puedes generar tantas hojas de ejercicios como quieras",
            }}
            withAction={false}></Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
