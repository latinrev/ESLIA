import React, { useState } from "react";
import WorksheetCard from "./WorksheetCard";
import SingleOptionSelector from "../SingleOptionSelector";
import { AnimatePresence, motion } from "framer-motion";
import ContinueButton from "./ContinueButton";

interface MultipleChoiceProps {
  // Define the props for your component here
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ goNext, item, handleAnswer }) => {
  const [selected, setSelectedOption] = useState<string>(null);

  const onSelectorChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence initial={false} mode="wait">
        <motion.article key={selected} className="center w-full flex-col gap-4 p-4" initial={{ rotateX: 120 }} animate={{ rotateX: 0 }}>
          <section className="flex w-full flex-col gap-4 bg-primary p-10 text-6xl font-bold text-textSecondary">
            <motion.h1
              key={selected}
              className="rounded-3xl text-center text-5xl"
              initial={{ scale: 0, y: -50 }}
              animate={{ scale: [1.1, 1], y: 0 }}>
              {selected !== null
                ? selected === item.correctAnswer
                  ? "Correcto!🎊"
                  : "Todos se equivocan de vez en cuando 🧐"
                : item.question}
            </motion.h1>
            {selected === null && <span className="text-center text-2xl font-medium">{item.questionTranslation}</span>}
          </section>
        </motion.article>
      </AnimatePresence>
      <SingleOptionSelector
        selectedOption={selected}
        setSelectedOption={setSelectedOption}
        onChange={onSelectorChange}
        options={item.options.map((option) => ({ label: option, value: option }))}
      />
      <ContinueButton
        isVisible={selected}
        onClick={() => {
          handleAnswer(selected);
          goNext();
        }}></ContinueButton>
    </div>
  );
};

export default MultipleChoice;
