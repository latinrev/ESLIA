import React from "react";
import { motion } from "framer-motion";
import ContinueButton from "./ContinueButton";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import Link from "next/link";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

type ResultsProps = {
  data: {
    vocabulary: Array<{
      confidence: string;
      word: string;
      translation: string;
    }>;
    worksheet: Array<{
      item: {
        question?: string;
        sentence?: string;
        questionTranslation?: string;
        sentenceTranslation?: string;
        correctAnswer: string;
      };
      answer: string;
    }>;
  };
};

const Results: React.FC<ResultsProps> = ({ data }) => {
  const { width, height } = useWindowSize();
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="center mt-10 w-full flex-col gap-8 text-2xl" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-6xl font-bold" variants={itemVariants}>
        Tus resultados!
      </motion.h1>
      <motion.div
        className="center hidden w-full flex-col rounded-3xl bg-primary p-4 text-textSecondary md:block md:p-10"
        variants={itemVariants}>
        <div className="w-full">
          <h1 className="p-5 text-4xl font-bold">Vocabulario</h1>
          <div className="bg-primary-200 overflow-x-auto p-2 md:p-5">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="p-2 text-left">Palabra</th>
                  <th className="p-2 text-left">Traduccion</th>
                  <th className="p-2 text-left">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {data.vocabulary.map((item, index) => (
                  <motion.tr key={index} className="border-b border-black" variants={itemVariants}>
                    <td className="p-2">{item.word}</td>
                    <td className="p-2">{item.translation}</td>
                    <td className="p-2">{["Me la se ✅🎉", "No Recuerdo 🤔😅", "No me la se 😵🥴"][parseInt(item.confidence) - 1]}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8 w-full overflow-x-auto bg-primary p-2 md:p-5">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-2 text-left">Pregunta</th>
                <th className="p-2 text-left">Traduccion</th>
                <th className="p-2 text-left">Respuesta Correcta</th>
                <th className="p-2 text-left">Tu respuesta</th>
              </tr>
            </thead>
            <tbody>
              {data.worksheet.map((item, index) => (
                <motion.tr key={index} className="border-b border-black" variants={itemVariants}>
                  <td className="p-2">{item.item.question || item.item.sentence}</td>
                  <td className="p-2">{item.item.questionTranslation || item.item.sentenceTranslation}</td>
                  <td className="p-2">{item.item.correctAnswer}</td>
                  <td className="p-2">{item.answer}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      {/*easily ugliest piece of code ive ever written, this what crunch does to a man, could mapped then display, oh well.*/}
      <motion.div className="rounded-3xl bg-primary px-8 py-5 text-secondary">
        <div>
          <h1>Vocabulario - {data.vocabulary.length} </h1>
          <h1>Me la se - {data.vocabulary.filter((item) => item.confidence === "1").length} ✅🎉</h1>
          <h1>No recuerdo - {data.vocabulary.filter((item) => item.confidence === "2").length} 🤔😅</h1>
          <h1>No me la se - {data.vocabulary.filter((item) => item.confidence === "3").length} 😵🥴</h1>
        </div>
        <br></br>
        Ejercicios - {data.worksheet.length}
        <h1>Correctos - {data.worksheet.filter((item) => item.item.correctAnswer === item.answer).length} ✅🎉 </h1>
        <h1>A la proxima le atino - {data.worksheet.filter((item) => item.item.correctAnswer !== item.answer).length}🧐🧐</h1>
      </motion.div>
      <Link href="/worksheets">
        <Button>Volver a mis hojas de ejercicios</Button>
      </Link>
      <Confetti width={width} height={height} />
    </motion.div>
  );
};

export default Results;
