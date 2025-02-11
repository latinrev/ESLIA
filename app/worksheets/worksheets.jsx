"use client";
import { useGetWorksheets } from "@/actions/queries";
import { Card } from "@/components/Card";
import SingleOptionSelector from "@/components/SingleOptionSelector";
import { useState } from "react";
import { useGenerateWorksheet } from "@/actions/mutations";
import { Circles } from "react-loader-spinner";
import Masonry from "react-responsive-masonry";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/worksheet/Button";

export default function Worksheets() {
  const { data: worksheets, error, ...props } = useGetWorksheets();
  const { mutate, isPending, isSuccess, isError } = useGenerateWorksheet();
  const [level, setLevel] = useState("1");
  const { width, height } = useWindowSize();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };

  const getColumnsCount = () => {
    if (width < 800) return 1; // Mobile
    if (width < 1280) return 2; // Small tablets
    if (width < 1280) return 3; // Desktops
    return 3;
  };

  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-20 grid w-full place-items-center gap-8 text-center lg:mt-0">
        <h1 className="text-4xl font-bold md:text-7xl">Mis hojas de trabajo</h1>
        <form onSubmit={handleOnSubmit} className="grid w-fit place-items-center gap-8">
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 text-2xl">
            <h2 className="text-lg font-bold text-textPrimary md:text-3xl">Selecciona el nivel de dificultad</h2>

            <SingleOptionSelector
              selectedOption={level}
              setSelectedOption={setLevel}
              name={"level"}
              options={[
                { label: "Pricipiante", value: "1" },
                { label: "Intermedio", value: "2" },
                { label: "Avanzado", value: "3" },
              ]}
            />
          </div>
          <div className="center w-full flex-col gap-4 text-white md:flex-row">
            <motion.input
              initial={{ x: "-120%" }}
              animate={{ x: 0 }}
              name="topic"
              placeholder="Quiero aprender sobre..."
              className="rounded-full border border-primary bg-transparent px-4 py-6 md:w-4/5 md:px-10"
            />
            <Button
              disabled={isPending}
              initial={{ x: "120%" }}
              animate={{ x: 0 }}
              loading={isPending.toString()}
              containerClassName="w-full md:w-fit"
              className="sm:w-fit"
              type="submit">
              {!isPending ? "Generar" : <Circles height={32} width={32} color="#fff" />}
            </Button>
          </div>
        </form>

        {worksheets.data.length > 0 || isPending ? (
          <Masonry columnsCount={getColumnsCount()} gutter={20}>
            {isPending && (!isSuccess || !isError) && (
              <Card
                withAction={false}
                item={{
                  emoji: <Circles color="#fff" />,
                  title: "Generando algo increible...",
                  description: "Espera un momento mientras generamos todo acerca de lo que quieres saber!",
                }}></Card>
            )}
            {worksheets?.data?.sort().map((worksheet) => (
              <Card key={worksheet.id} to={`worksheets/${worksheet.id}`} item={worksheet}></Card>
            ))}
          </Masonry>
        ) : (
          <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
            🤔 Aqui aparecerian tus hojas de ejercicios...
            <br />
            si tuvieras alguna! 🤯
            <br /> Intenta generar una arriba! 🎊
          </motion.h1>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
