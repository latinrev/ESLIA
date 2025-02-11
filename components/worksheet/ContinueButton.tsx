import React from "react";
import { motion } from "framer-motion";
import StylizedButton from "../StylizedButton";

interface ContinueButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export default function ContinueButton({ onClick, isVisible }: ContinueButtonProps) {
  return (
    <motion.div
      className="center"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}>
      <StylizedButton
        onClick={onClick}
        disabled={!isVisible}
        style={{
          pointerEvents: isVisible ? "auto" : "none",
          visibility: isVisible ? "visible" : "hidden",
        }}>
        Continuar
      </StylizedButton>
    </motion.div>
  );
}
