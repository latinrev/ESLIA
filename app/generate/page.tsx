import StylizedButton from "@/components/StylizedButton";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export default async function Generate() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-6xl font-bold">Ya casi estamos...</h1>
      <h3 className="text-5xl font-medium">
        Para crear tu hoja de ejercicios necesitamos que nos digas en pocas palabras si hay<br></br> alguna razon para la que quieras
        aprendar ingles
      </h3>
      <form action={() => {}} className="flex flex-col items-center justify-center gap-8">
        <input
          name="reason"
          className="w-1/2 w-fit rounded-full border bg-transparent p-6 text-3xl placeholder:text-center"
          placeholder="Cuentanos aqui..."
        />
        <StylizedButton type="submit">Generar Mi Plan</StylizedButton>
      </form>
    </div>
  );
}
