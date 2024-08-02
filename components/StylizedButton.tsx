"use client";
import { Circles } from "react-loader-spinner";

import { useFormStatus } from "react-dom";

export default function StylizedButton({ onClick, disabled, children, action, containerClassName, className, ...props }) {
  const formState = useFormStatus();
  console.log(formState);

  return (
    <div
      className={`relative flex w-fit items-center justify-center gap-16 self-center justify-self-center font-bold ${containerClassName}`}>
      <button
        className={`relative z-10 rounded-full border-2 bg-primary px-16 py-8 text-4xl text-textSecondary ${className}`}
        onClick={onClick}
        disabled={formState.pending || disabled}
        {...props}>
        {formState.pending ? <Circles type="Audio" color="#fff" height={50} width={50} /> : children}
      </button>
      <span className="absolute -bottom-16 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#fff] text-4xl text-textSecondary" />
    </div>
  );
}
