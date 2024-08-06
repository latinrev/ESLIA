import React, { useState } from "react";
import WorksheetCard from "./WorksheetCard";
import SingleOptionSelector from "../SingleOptionSelector";
import { AnimatePresence, motion } from "framer-motion";
import ContinueButton from "./ContinueButton";

interface MultipleChoiceItem {
  question: string;
  questionTranslation: string;
  options: string[];
  correctAnswer: string;
}

interface MultipleChoiceProps {
  goNext: () => void;
  item: MultipleChoiceItem;
  handleAnswer: (answer: { answer: string; item: MultipleChoiceItem }) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ goNext, item, handleAnswer }) => {
  const [selected, setSelectedOption] = useState<string | null>(null);

  const onSelectorChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence initial={false} mode="wait">
        <motion.article key={selected} className="center w-full flex-col gap-4 p-4" initial={{ rotateX: 120 }} animate={{ rotateX: 0 }}>
          <section className="flex w-full flex-col gap-4 rounded-3xl bg-primary px-4 py-6 text-2xl font-bold text-textSecondary md:p-10 md:text-6xl">
            <motion.h1
              key={selected}
              className="rounded-3xl text-center text-2xl sm:text-5xl"
              initial={{ scale: 0, y: -50 }}
              animate={{ scale: [1.1, 1], y: 0 }}>
              {selected !== null
                ? selected === item.correctAnswer
                  ? "Correcto!🎊"
                  : "Todos se equivocan de vez en cuando 🧐"
                : item.question.replace("{BLANK}", "_________")}
            </motion.h1>
            {selected === null && <span className="text-center text-lg font-medium md:text-2xl">{item.questionTranslation}</span>}
          </section>
        </motion.article>
      </AnimatePresence>
      <SingleOptionSelector
        selectedOption={selected || ""}
        setSelectedOption={setSelectedOption}
        onChange={onSelectorChange}
        options={item.options.map((option) => ({ label: option, value: option }))}
      />
      <ContinueButton
        isVisible={!!selected}
        onClick={() => {
          if (selected) {
            handleAnswer({ answer: selected, item: item });
            goNext();
          }
        }}
      />
    </div>
  );
};

export default MultipleChoice;
