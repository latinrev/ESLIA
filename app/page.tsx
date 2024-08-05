"use client";
import { Card } from "@/components/Card";
import { Button } from "@/components/worksheet/Button";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { Circles } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import GoogleIcon from '@/components/GoogleIcon'
export default function Home() {
  const supabase = createClient()
  return <AnimatePresence mode="wait" initial={true}>
    <div className="flex flex-col gap-8">
      <motion.div initial={{ y: '-5%', opacity:0 }} animate={{y:0,opacity:1}} className="flex-col flex items-center justify-self-start gap-4 text-center overflow-hidden h-full pb-12 relative md:p-12 ">
        <h1 className="text-5xl md:text-5xl font-bold md:px-10">Aprende <span className="text-textContrast font-black">Ingles facil</span> con la <span className="text-textContrast font-black">ayuda</span><br /> de la  <span className="text-textContrast font-black">inteligencia artificial</span> 🎉</h1>
        <h4 className="text-lg md:text-2xl font-medium md:px-10">Con <span className="text-textContrast font-bold"> ELSIA </span>genera hojas de <span className="text-textContrast font-bold">vocabulario</span> y <span className="text-textContrast font-bold">ejercicios</span><br /> personalizadas a tu nivel de dificultad! 🤓</h4>
        <Button onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: 'https://glorious-zebra-qp4655767xjhx5vv-3000.app.github.dev/worksheets',
            }
          })
        }}><span className="flex center gap-2"><GoogleIcon />Iniciar sesion con Google </span></Button>
      </motion.div>
      <motion.div  initial={{ y: '10%', opacity:0 }} animate={{y:0,opacity:1}}  className=" grid grid-cols-1 lg:grid-cols-3 xl:px-36 gap-8 ">
        <Card
          item={{
            emoji: '🏄🏼‍♂️',
            title: "Es facil!",
            description: "Ya que todo es personalizado puedes aprender los temas que quieras cuando quieras",
          }} />
        <Card

          item={{
            emoji: '🚀',
            title: "Aprendiendo ingles con ESLIA",
            description: "Aca podras generar hojas de vocabulario y ejercicios que que te resultara increible para aprender ingles",
          }} />
        <Card
          item={{
            emoji: '💸',
            title: "Gratis! ",
            description: "Puedes generar tantas hojas de ejercicios como quieras",
          }}></Card>
      </motion.div>
    </div >
  </AnimatePresence>

}

//ESLIA
//Permite generar hojas de vocabularios y ejercicios para estudiantes de ESL(English as a second langauge) basado en la dificultad y tema seleccionado por el usuario
//Para ejercutarlo se requiere un archivo .env.local
//NEXT_PUBLIC_SUPABASE_URL=
//NEXT_PUBLIC_SUPABASE_ANON_KEY=
//OPENAI_API_KEY =
//figure out https://supabase.com/docs/guides/platform/migrating-and-upgrading-projects#transfer-to-a-different-organization
//supabase db dump --db-url "$OLD_DB_URL" -f roles.sql --role-only
//supabase db dump --db-url "$OLD_DB_URL" -f schema.sql
//supabase db dump --db-url "$OLD_DB_URL" -f data.sql --use-copy --data-only
