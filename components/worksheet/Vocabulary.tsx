"use client";
import { useGetWorksheet } from "@/actions/queries";
import VocabularyCard from "@/components/worksheet/VocabularyCard";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorksheetCard from "./WorksheetCard";

export default function Vocabulary({ vocabularyData, onCompleted }) {
  const [activeCardIndex, setActiveCard] = useState(0);
  const [answers, setAnswers] = useState({});

  const activeCardData = useMemo(() => vocabularyData[activeCardIndex], [activeCardIndex, vocabularyData]);

  const handleAnswer = (confidence) => {
    const newAnswers = {
      ...answers,
      [activeCardIndex]: { confidence, word: activeCardData.word, translation: activeCardData.translation },
    };
    setAnswers(newAnswers);
  };

  const continueToNextCard = () => {
    if (activeCardIndex < vocabularyData.length - 1) {
      setActiveCard(activeCardIndex + 1);
    } else {
      onCompleted(answers);
    }
  };

  return (
    <div className="relative w-full">
      <WorksheetCard keyToUse={activeCardIndex}>
        <VocabularyCard goNext={continueToNextCard} handleAnswer={handleAnswer} item={activeCardData} />
      </WorksheetCard>
    </div>
  );
}
