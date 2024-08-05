import React, { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WorksheetCardProps {
  children: ReactNode;
  keyToUse: string | number;
  className?: string;
}

const WorksheetCard: FC<WorksheetCardProps> = ({ children, keyToUse, className }) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={keyToUse}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-140%" }}
        transition={{
          type: "tween",
          duration: 0.25,
          ease: "easeOut",
        }}
        className={className}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default WorksheetCard;
