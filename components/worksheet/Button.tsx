import React from "react";
import { cn } from "@/utils";
import { motion, MotionProps, HTMLMotionProps } from "framer-motion";

interface ButtonOwnProps {
  children: React.ReactNode;
  rightSelector?: boolean;
  leftSelector?: boolean;
  secondary?: boolean;
}

type ButtonProps = ButtonOwnProps & Omit<HTMLMotionProps<"button">, keyof ButtonOwnProps>;

export const Button: React.FC<ButtonProps> = ({
  children,
  rightSelector = false,
  leftSelector = false,
  secondary = false,
  className,
  ...props
}) => {
  const internalClassName = !secondary
    ? "flex w-fit items-center justify-center gap-4 rounded-2xl bg-primary px-8 py-3 text-3xl font-bold text-secondary"
    : "flex w-fit items-center justify-center gap-4 rounded-2xl border-2 border-secondary bg-transparent px-8 py-3 text-3xl font-bold text-secondary";

  return (
    <motion.button
      whileHover={{ scale: 1.15, boxShadow: "0px 0px 30px var(--color-primary)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      initial={false}
      className={cn(internalClassName, className)}
      {...props}>
      {leftSelector && <div className="h-[2rem] w-[2rem] rounded-full border border-secondary"></div>}
      <motion.h1>{children}</motion.h1>
      {rightSelector && <div className="h-[2rem] w-[2rem] rounded-full border border-secondary"></div>}
    </motion.button>
  );
};
