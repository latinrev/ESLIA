"use client";
import { useGetWorksheets } from "@/actions/queries";
import { Card } from "@/components/Card";
import SingleOptionSelector from "@/components/SingleOptionSelector";
import StylizedButton from "@/components/StylizedButton";
import { useState } from "react";
import { useGenerateWorksheet } from "@/actions/mutations";
import { Circles } from "react-loader-spinner";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
export default function Plan() {
  const { data: worksheets, error, ...props } = useGetWorksheets();
  const { mutate, isPending } = useGenerateWorksheet();
  const [level, setLevel] = useState("1");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };

  return (
    <div className="grid w-full place-items-center gap-20">
      <h1 className="text-7xl font-bold">Mis hojas de trabajo</h1>
      <form onSubmit={handleOnSubmit} className="grid w-fit place-items-center gap-8">
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 text-3xl">
          <h2 className="text-2xl font-bold text-textPrimary">Selecciona el nivel de dificultad</h2>
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
        <div className="flex w-full items-center justify-center gap-4">
          <input
            name="topic"
            placeholder="Quiero aprender sobre..."
            className="w-4/5 rounded-full border border-primary bg-transparent px-10 py-6"></input>
          <StylizedButton loading={isPending} containerClassName="col-span-auto" type="submit">
            Generar
          </StylizedButton>
        </div>
      </form>
      <Masonry columnsCount={3} gutter={20}>
        {isPending && (
          <Card
            item={{
              emoji: <Circles color="#fff" />,
              title: "Generando algo increible...",
              description: "Generando todo acerca de lo que quieres saber!",
            }}></Card>
        )}

        {worksheets?.data?.sort().map((worksheet) => (
          <Card key={worksheet.id} to={`worksheets/${worksheet.id}`} item={worksheet}></Card>
        ))}
      </Masonry>
    </div>
  );
}
