"use client";

import { useGetWorksheet } from "@/actions/queries";
import VocabularyCard from "@/components/worksheet/VocabularyCard";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Vocabulary from "@/components/worksheet/Vocabulary";
import MultipleChoice from "@/components/worksheet/MultipleChoice";
import WorksheetCard from "@/components/worksheet/WorksheetCard";
import FillInTheBlanks from "@/components/worksheet/FillInTheBlanks";
import Results from "@/components/worksheet/Results";

interface WorksheetProps {
  id: string;
}

interface VocabularyItem {
  word: string;
  example: string;
  translation: string;
  transcription: string;
  exampleTranslation: string;
}

interface VocabularyAnswer {
  confidence: string;
  word: string;
  translation: string;
}

interface FillInTheBlankItem {
  options: string[];
  sentence: string;
  correctAnswer: string;
  sentenceTranslation: string;
  correctAnswerTranslation: string;
}

interface MultipleChoiceItem {
  options: string[];
  question: string;
  correctAnswer: string;
  questionTranslation: string;
  correctAnswerTranslation: string;
}

interface WorksheetItem {
  type: "multipleChoice" | "fillInTheBlankWithOptions";
  data: FillInTheBlankItem | MultipleChoiceItem;
}

interface WorksheetData {
  data: {
    id: number;
    created_at: string;
    user_id: string;
    title: string;
    generating: boolean;
    vocabulary: {
      vocabulary: VocabularyItem[];
    };
    worksheet: {
      worksheet: WorksheetItem[];
    };
    description: string;
    emoji: string;
  };
  error: null | string;
}

type AnswerType = Record<number, { answer: string; item: FillInTheBlankItem | MultipleChoiceItem }>;

interface TestData {
  vocabularyAnswers: Record<string, VocabularyAnswer>;
  answers: AnswerType;
  data: {
    data: WorksheetData["data"];
    error: null | string;
  };
}
interface AnswerItem {
  answer: string;
  item: FillInTheBlankItem | MultipleChoiceItem;
}

export default function Worksheet({ id }: WorksheetProps) {
  const { data, isLoading } = useGetWorksheet(id);
  const [vocabularyAnswers, setVocabularyAnswers] = useState<VocabularyAnswer[] | null>(null);
  const [answers, setAnswers] = useState<AnswerType | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const activeCardData: WorksheetItem | undefined = useMemo(() => data?.data.worksheet.worksheet[activeCardIndex], [data, activeCardIndex]);

  const handleAnswer = (userAnswer: AnswerItem) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [activeCardIndex]: userAnswer,
    }));
  };

  const continueToNextCard = () => {
    if (data && activeCardIndex < data.data.worksheet.worksheet.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      setActiveCardIndex(-1);
      setIsCompleted(true);
    }
  };

  return (
    <div className="relative w-full">
      {!vocabularyAnswers && (
        <Vocabulary
          vocabularyData={data?.data?.vocabulary.vocabulary}
          onCompleted={(completedAnswers: VocabularyAnswer[]) => setVocabularyAnswers(completedAnswers)}
        />
      )}
      <WorksheetCard className="flex flex-col gap-8" keyToUse={activeCardIndex}>
        {!isCompleted && vocabularyAnswers && activeCardData?.type === "multipleChoice" && (
          <MultipleChoice item={activeCardData.data as MultipleChoiceItem} goNext={continueToNextCard} handleAnswer={handleAnswer} />
        )}
        {!isCompleted && vocabularyAnswers && activeCardData?.type === "fillInTheBlankWithOptions" && (
          <FillInTheBlanks item={activeCardData.data as FillInTheBlankItem} goNext={continueToNextCard} handleAnswer={handleAnswer} />
        )}
      </WorksheetCard>
      {vocabularyAnswers && answers && isCompleted && (
        <Results data={{ vocabulary: Object.values(vocabularyAnswers), worksheet: Object.values(answers) }} />
      )}
    </div>
  );
}
