"use client";
import { useState } from "react";
import SingleOptionSelector from "../../components/SingleOptionSelector";
import StylizedButton from "@/components/StylizedButton";
import { useCreateOnboarding } from "@/actions/mutations";
import { useRouter } from "next/navigation";

export default function Onboarding({}) {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState({});
  const { mutate } = useCreateOnboarding();

  const handleSelected = (value, fieldName) => setSelectedOptions({ ...selectedOptions, [fieldName]: value });

  const onContinue = async () => {
    let totalValue = 0;
    Object.values(selectedOptions).forEach((option) => {
      console.log(option);
      totalValue += parseInt(option);
    });
    let level = "";
    if (totalValue < 7) level = "beginner";
    if (totalValue >= 7 && totalValue <= 11) level = "intermediate";
    if (totalValue > 11 && totalValue <= 15) level = "advanced";
    mutate(level, {
      onSuccess: () => {
        console.log("Hello?");
        router.push("/generate");
      },
    });
  };

  return (
    <div className="text-primary text-4xl text-center justify-center items-center flex flex-col ">
      <h1 className="text-7xl mb-12">Antes de comenzar</h1>
      <div className="grid grid-cols-1 grid-rows-4 gap-16 justify-center items-center text-center">
        <div className="flex justify-center items-center gap-16 flex-col">
          <h2 className="text-textPrimary text-6xl">¿Qué nivel de inglés crees que tienes actualmente?</h2>
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
        <div className="flex justify-center items-center gap-16 flex-col">
          <h2 className="text-textPrimary text-6xl">¿Cuánto tiempo has estudiado inglés?</h2>
          <SingleOptionSelector
            selectedOptions={selectedOptions}
            handleSelected={handleSelected}
            name={"time"}
            options={[
              { label: "Menos de 6 meses", value: "1" },
              { label: "6 Meses a 1 año", value: "2" },
              { label: "1 a 2 años", value: "3" },
              { label: "Mas de 2 años", value: "4" },
            ]}
          />
        </div>
        <div className="flex justify-center items-center gap-16 flex-col">
          <h2 className="text-textPrimary text-6xl">¿Cuál es tu objetivo principal para aprender inglés?</h2>
          <SingleOptionSelector
            selectedOptions={selectedOptions}
            handleSelected={handleSelected}
            name={"reason"}
            options={[
              { label: "Para trabajar", value: "1" },
              { label: "Para estudiar", value: "2" },
              { label: "Para viajar", value: "3" },
              { label: "Por interes personal", value: "4" },
            ]}
          />
        </div>
        <div className="flex justify-center items-center gap-16 flex-col">
          <h2 className="text-textPrimary text-6xl">Cuán cómodo te sientes hablando en inglés en situaciones cotidianas?</h2>
          <SingleOptionSelector
            selectedOptions={selectedOptions}
            handleSelected={handleSelected}
            name={"comfort"}
            options={[
              { label: "Nada comodo", value: "1" },
              { label: "Poco comodo", value: "2" },
              { label: "Moderadamente comodo", value: "3" },
              { label: "Muy comodo", value: "4" },
            ]}
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-16 relative mt-10  w-fit self-center justify-self-center">
        <StylizedButton
          disabled={!selectedOptions.level && selectedOptions.comfort && selectedOptions.reason && selectedOptions.time}
          onClick={onContinue}>
          Continuar
        </StylizedButton>
      </div>
    </div>
  );
}
