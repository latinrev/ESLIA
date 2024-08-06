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

  const testData = {
    vocabularyAnswers: {
      "0": {
        confidence: "2",
        word: "negotiation",
        translation: "negociación",
      },
      "1": {
        confidence: "1",
        word: "invoice",
        translation: "factura",
      },
      "2": {
        confidence: "3",
        word: "budget",
        translation: "presupuesto",
      },
      "3": {
        confidence: "2",
        word: "contract",
        translation: "contrato",
      },
      "4": {
        confidence: "1",
        word: "client",
        translation: "cliente",
      },
      "5": {
        confidence: "2",
        word: "profit",
        translation: "ganancia",
      },
      "6": {
        confidence: "3",
        word: "target market",
        translation: "mercado objetivo",
      },
      "7": {
        confidence: "2",
        word: "strategy",
        translation: "estrategia",
      },
      "8": {
        confidence: "1",
        word: "deadline",
        translation: "fecha límite",
      },
    },
    answers: {
      "0": {
        answer: "contract",
        item: {
          options: ["contract", "deadline", "profit"],
          sentence: "We need to discuss the {BLANK} before we finalize the deal.",
          correctAnswer: "contract",
          sentenceTranslation: "Necesitamos discutir el {BLANK} antes de finalizar el acuerdo.",
          correctAnswerTranslation: "contrato",
        },
      },
      "1": {
        answer: "strategy",
        item: {
          options: ["invoice", "strategy", "budget"],
          sentence: "The {BLANK} is due next week.",
          correctAnswer: "invoice",
          sentenceTranslation: "La {BLANK} vence la próxima semana.",
          correctAnswerTranslation: "factura",
        },
      },
      "2": {
        answer: "to lose",
        item: {
          options: ["to argue", "to agree", "to lose", "to ignore"],
          question: "What is the main goal of a negotiation?",
          correctAnswer: "to agree",
          questionTranslation: "¿Cuál es el objetivo principal de una negociación?",
          correctAnswerTranslation: "acordar",
        },
      },
      "3": {
        answer: "profit",
        item: {
          options: ["target market", "profit", "budget", "client"],
          question: "Which term refers to the money remaining after expenses?",
          correctAnswer: "profit",
          questionTranslation: "¿Qué término se refiere al dinero que queda después de los gastos?",
          correctAnswerTranslation: "beneficio",
        },
      },
      "4": {
        answer: "budget",
        item: {
          options: ["target market", "budget", "deadline"],
          sentence: "We have a {BLANK} to reach by next quarter.",
          correctAnswer: "deadline",
          sentenceTranslation: "Tenemos un {BLANK} que alcanzar para el próximo trimestre.",
          correctAnswerTranslation: "fecha límite",
        },
      },
      "5": {
        answer: "strategy",
        item: {
          options: ["strategy", "client", "profit"],
          sentence: "Understanding our {BLANK} helps us sell better.",
          correctAnswer: "target market",
          sentenceTranslation: "Entender nuestro {BLANK} nos ayuda a vender mejor.",
          correctAnswerTranslation: "mercado objetivo",
        },
      },
      "6": {
        answer: "invoice",
        item: {
          options: ["contract", "invoice", "budget", "strategy"],
          question: "What do we create to plan our spending?",
          correctAnswer: "budget",
          questionTranslation: "¿Qué creamos para planificar nuestro gasto?",
          correctAnswerTranslation: "presupuesto",
        },
      },
    },
    data: {
      data: {
        id: 77,
        created_at: "2024-08-05T03:48:11.30004+00:00",
        user_id: "51830e4d-4284-4731-afcf-a3ec622c643a",
        title: "Hoja de Ejercicios para Aprender Inglés en Negocios - Nivel 3 (ESL)",
        generating: true,
        vocabulary: {
          vocabulary: [
            {
              word: "negotiation",
              example: "The negotiation lasted for several hours.",
              translation: "negociación",
              transcription: "/nɪˌɡoʊ.ʃiˈeɪ.ʃən/",
              exampleTranslation: "La negociación duró varias horas.",
            },
            {
              word: "invoice",
              example: "I received an invoice for the services rendered.",
              translation: "factura",
              transcription: "/ˈɪn.voɪs/",
              exampleTranslation: "Recibí una factura por los servicios prestados.",
            },
            {
              word: "budget",
              example: "We need to prepare our budget for next year.",
              translation: "presupuesto",
              transcription: "/ˈbʌdʒ.ɪt/",
              exampleTranslation: "Necesitamos preparar nuestro presupuesto para el próximo año.",
            },
            {
              word: "contract",
              example: "The contract was signed by both parties.",
              translation: "contrato",
              transcription: "/ˈkɒn.trækt/",
              exampleTranslation: "El contrato fue firmado por ambas partes.",
            },
            {
              word: "client",
              example: "Our client is very satisfied with the service.",
              translation: "cliente",
              transcription: "/ˈklaɪ.ənt/",
              exampleTranslation: "Nuestro cliente está muy satisfecho con el servicio.",
            },
            {
              word: "profit",
              example: "The company made a significant profit last quarter.",
              translation: "ganancia",
              transcription: "/ˈprɒf.ɪt/",
              exampleTranslation: "La empresa obtuvo una ganancia significativa el último trimestre.",
            },
            {
              word: "target market",
              example: "We need to identify our target market.",
              translation: "mercado objetivo",
              transcription: "/ˈtɑːr.ɡɪt ˈmɑːrkɪt/",
              exampleTranslation: "Necesitamos identificar nuestro mercado objetivo.",
            },
            {
              word: "strategy",
              example: "We must develop a new marketing strategy.",
              translation: "estrategia",
              transcription: "/ˈstræt.ə.dʒi/",
              exampleTranslation: "Debemos desarrollar una nueva estrategia de marketing.",
            },
            {
              word: "deadline",
              example: "The deadline for submissions is Friday.",
              translation: "fecha límite",
              transcription: "/ˈdɛd.laɪn/",
              exampleTranslation: "La fecha límite para las entregas es el viernes.",
            },
          ],
        },
        worksheet: {
          worksheet: [
            {
              data: {
                options: ["contract", "deadline", "profit"],
                sentence: "We need to discuss the {BLANK} before we finalize the deal.",
                correctAnswer: "contract",
                sentenceTranslation: "Necesitamos discutir el {BLANK} antes de finalizar el acuerdo.",
                correctAnswerTranslation: "contrato",
              },
              type: "fillInTheBlankWithOptions",
            },
            {
              data: {
                options: ["invoice", "strategy", "budget"],
                sentence: "The {BLANK} is due next week.",
                correctAnswer: "invoice",
                sentenceTranslation: "La {BLANK} vence la próxima semana.",
                correctAnswerTranslation: "factura",
              },
              type: "fillInTheBlankWithOptions",
            },
            {
              data: {
                options: ["to argue", "to agree", "to lose", "to ignore"],
                question: "What is the main goal of a negotiation?",
                correctAnswer: "to agree",
                questionTranslation: "¿Cuál es el objetivo principal de una negociación?",
                correctAnswerTranslation: "acordar",
              },
              type: "multipleChoice",
            },
            {
              data: {
                options: ["target market", "profit", "budget", "client"],
                question: "Which term refers to the money remaining after expenses?",
                correctAnswer: "profit",
                questionTranslation: "¿Qué término se refiere al dinero que queda después de los gastos?",
                correctAnswerTranslation: "beneficio",
              },
              type: "multipleChoice",
            },
            {
              data: {
                options: ["target market", "budget", "deadline"],
                sentence: "We have a {BLANK} to reach by next quarter.",
                correctAnswer: "deadline",
                sentenceTranslation: "Tenemos un {BLANK} que alcanzar para el próximo trimestre.",
                correctAnswerTranslation: "fecha límite",
              },
              type: "fillInTheBlankWithOptions",
            },
            {
              data: {
                options: ["strategy", "client", "profit"],
                sentence: "Understanding our {BLANK} helps us sell better.",
                correctAnswer: "target market",
                sentenceTranslation: "Entender nuestro {BLANK} nos ayuda a vender mejor.",
                correctAnswerTranslation: "mercado objetivo",
              },
              type: "fillInTheBlankWithOptions",
            },
            {
              data: {
                options: ["contract", "invoice", "budget", "strategy"],
                question: "What do we create to plan our spending?",
                correctAnswer: "budget",
                questionTranslation: "¿Qué creamos para planificar nuestro gasto?",
                correctAnswerTranslation: "presupuesto",
              },
              type: "multipleChoice",
            },
          ],
        },
        description:
          "Esta hoja de ejercicios está diseñada para hablantes nativos de español que desean mejorar su inglés en el ámbito de los negocios. Ideal para estudiantes de ESL que buscan vocabulario y expresiones clave.",
        emoji: "💼",
      },
      error: null,
    },
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
