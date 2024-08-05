import { motion } from "framer-motion";

export default function SingleOptionSelector({ options, onChange, setSelectedOption, selectedOption }) {
  const onClickButton = (e) => {
    e.preventDefault();
    if (onChange) onChange(e.currentTarget.value);
    setSelectedOption(e.currentTarget.value);
  };

  return (
    <motion.div
      className="grid w-full grid-flow-col content-between gap-8 px-6 text-2xl"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}>
      <input type="hidden" name="level" value={selectedOption} />
      {options.map((option: { label: string; value: string }) => {
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
