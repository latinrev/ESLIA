"use client";
import { useGetWorksheet } from "@/actions/queries";
import VocabularyCard from "@/components/worksheet/VocabularyCard";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Vocabulary from "@/components/worksheet/Vocabulary";
import MultipleChoice from "@/components/worksheet/MultipleChoice";
import WorksheetCard from "@/components/worksheet/WorksheetCard";
import Matching from "@/components/worksheet/Matching";
import FillInTheBlanks from "@/components/worksheet/FillInTheBlanks";

export default function Worksheet({ id }) {
  const { data, isLoading } = useGetWorksheet(id);
  const [vocabularyAnswers, setVocabularyAnswers] = useState(null);
  const [isVocabularyCompleted, setIsVocabularyCompleted] = useState(false);
  const [answers, setAnswers] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const activeCardData = useMemo(() => data?.data.worksheet.worksheet[activeCardIndex], [activeCardIndex]);

  const handleAnswer = (userAnswers) => {
    setAnswers({ ...answers, [activeCardIndex]: userAnswers });
  };
  const continueToNextCard = () => {
    console.log("continueToNextCard");
    if (activeCardIndex < data?.data.worksheet.worksheet.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      setActiveCardIndex(-1);
      setIsCompleted(true);
    }
  };

  console.log(vocabularyAnswers);
  return (
    <div className="relative w-full">
      {!vocabularyAnswers && <Vocabulary vocabularyData={data?.data?.vocabulary.vocabulary} onCompleted={setVocabularyAnswers} />}
      <WorksheetCard className="flex flex-col gap-8" keyToUse={activeCardIndex}>
        {!isCompleted && vocabularyAnswers && activeCardData?.type === "multipleChoice" && (
          <MultipleChoice item={activeCardData.data} goNext={continueToNextCard} handleAnswer={handleAnswer} />
        )}
        {!isCompleted && vocabularyAnswers && activeCardData?.type === "fillInTheBlankWithOptions" && (
          <FillInTheBlanks item={activeCardData.data} goNext={continueToNextCard} handleAnswer={handleAnswer} />
        )}
        {isCompleted && <h1>Worksheet completed</h1>}
      </WorksheetCard>
      <button onClick={continueToNextCard}>continue</button>
    </div>
  );
}
