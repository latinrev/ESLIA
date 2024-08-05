"use client";

import React from "react";
import { Circles } from "react-loader-spinner";
import { useFormStatus } from "react-dom";
import { cn } from "@/utils";

interface StylizedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  action?: string;
  containerClassName?: string;
  className?: string;
  loading?: boolean;
}

export default function StylizedButton({
  onClick,
  disabled,
  children,
  action,
  containerClassName,
  className,
  loading,
  ...props
}: StylizedButtonProps) {
  const formState = useFormStatus();

  return (
    <div
      className={cn(
        `relative flex w-fit items-center justify-center gap-16 self-center justify-self-center font-bold`,
        containerClassName
      )}>
      <button
        className={cn("relative z-10 rounded-full w-full bg-primary px-8 text-3xl py-4 text-textSecondary", className)}
        onClick={onClick}
        disabled={formState.pending || disabled}
        {...props}>
        {formState.pending || loading ? <Circles color="#fff" height={50} width={50} /> : children}
      </button>
      {/* Commented out span */}
    </div>
  );
}
