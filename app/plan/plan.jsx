"use client";
import { useGetPlan } from "@/actions/queries";
import { Card } from "@/components/Card";
import SingleOptionSelector from "@/components/SingleOptionSelector";
import StylizedButton from "@/components/StylizedButton";
import { useState } from "react";

export default function Plan() {
  const { data: plan, error, ...props } = useGetPlan();
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelected = (value, fieldName) => setSelectedOptions({ ...selectedOptions, [fieldName]: value });

  return (
    <div className="grid place-items-center px-36">
      <h1 className="mb-9 text-8xl font-bold">Mis hojas de trabajo</h1>
      <input
        placeholder="Escribe algo sobre lo quisieras saber mas para generar una hoja de vocabulario y ejercicios"
        className="w-1/3 rounded-full border border-primary bg-transparent px-10 py-6 placeholder:text-center"></input>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 text-3xl">
        <h2 className="text-2xl font-bold text-textPrimary">Selecciona el nivel de dificultad</h2>
        <SingleOptionSelector
          selectedOptions={selectedOptions}
          handleSelected={handleSelected}
          name={"level"}
          options={[
            { label: "Pricipiante", value: "1" },
            { label: "Intermedio", value: "2" },
            { label: "Avanzado", value: "3" },
          ]}
        />
      </div>
      <StylizedButton containerClassName="mt-10" className={""} type="submit">
        Generar
      </StylizedButton>

      <div className="grid grid-cols-2 gap-16 gap-y-32 py-32">
        {plan?.data?.weeks.sort().map((week) => (
          <Card to={`plan/week/${week.id}`} item={week}></Card>
        ))}
      </div>
    </div>
  ); ~
}
