import React, { useEffect, useState } from "react";
import SingleOptionSelector from "../SingleOptionSelector";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";
import StylizedButton from "../StylizedButton";
import ContinueButton from "./ContinueButton";
import BoldMatchingText from "./BoldMatchingText";

interface VocabularyItem {
  translation: string;
  word: string;
  example: string;
  exampleTranslation: string;
}

interface VocabularyCardProps {
  item: VocabularyItem;
  handleAnswer: (value: string) => void;
  goNext: () => void;
}

interface Option {
  label: string;
  value: string;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ item, handleAnswer, goNext }) => {
  const [selected, setSelectedOption] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<boolean>(false);

  const onSelectorChange = (value: string) => {
    setSelectedOption(value);
    setShowConfetti(value === "1");
    handleAnswer(value);
  };

  const handleContinue = () => {
    setSelectedOption("");
    setShowConfetti(false);
    goNext();
  };

  const showAnswer = () => {
    setRevealed(true);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000); // 2000 milliseconds = 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const options: Option[] = [
    { label: "Me la se", value: "1" },
    { label: "No recuerdo", value: "2" },
    { label: "No me la se", value: "3" },
  ];

  return (
    <article className="center w-full flex-col gap-4 p-4">
      <section className="flex w-full flex-col gap-4 text-6xl font-bold text-textSecondary">
        <h1 className="rounded-3xl bg-primary p-10 text-center">{item.translation}</h1>
        <div className="center flex-col rounded-3xl bg-primary p-10 text-center">
          {revealed ? (
            <AnimatePresence initial={true} mode="wait">
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, scale: 0.2, y: 100 }}
                animate={{ opacity: 1, scale: [1.5, 1], y: 0 }}>
                <h1>{item.word}</h1>
                <div>
                  <div className="flex flex-col text-lg font-light">
                    <span>
                      <BoldMatchingText text={item.example} boldText={item.word} />
                    </span>
                    <span className="font-light">
                      <BoldMatchingText text={item.exampleTranslation} boldText={item.translation} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div className="cursor-pointer" whileHover={{ scale: 1.2 }}>
              <h5 className="text-2xl" onClick={showAnswer}>
                Haz click para revelar la traduccion...
              </h5>
            </motion.div>
          )}
        </div>
      </section>
      {revealed && (
        <>
          <SingleOptionSelector
            selectedOption={selected}
            setSelectedOption={setSelectedOption}
            onChange={onSelectorChange}
            options={options}
          />
          <ContinueButton onClick={handleContinue} isVisible={!!selected} />
        </>
      )}
    </article>
  );
};

export default VocabularyCard;
