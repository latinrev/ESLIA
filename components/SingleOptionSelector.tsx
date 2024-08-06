import React from "react";
import { motion } from "framer-motion";

interface Option {
  label: string;
  value: string;
}

interface SingleOptionSelectorProps {
  options: Option[];
  onChange?: (value: string) => void;
  setSelectedOption: (value: string) => void;
  selectedOption: string;
}

export default function SingleOptionSelector({ options, onChange, setSelectedOption, selectedOption }: SingleOptionSelectorProps) {
  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    if (onChange) onChange(value);
    setSelectedOption(value);
  };

  return (
    <motion.div
      className="grid w-full content-between gap-8 px-6 text-lg md:text-2xl lg:grid-flow-col"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}>
      <input type="hidden" name="level" value={selectedOption} />
      {options.map((option: Option) => {
        const isSelected = selectedOption === option.value;
        return (
          <motion.button
            onClick={onClickButton}
            key={option.value}
            value={option.value}
            className={`px-12 py-3 border-primary rounded-2xl border
              ${isSelected ? "text-textSecondary font-bold" : "text-textContrast"}`}
            initial={false}
            animate={{
              backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
              boxShadow: isSelected ? "0 0 15px var(--color-primary)" : "none",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px var(--color-primary)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}>
            <motion.div
              initial={false}
              animate={{ scale: isSelected ? [1, 1.1, 1] : 1 }}
              transition={{
                duration: 0.3,
                times: [0, 0.5, 1],
              }}>
              {option.label}
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
