export default function StylizedButton({ onClick, disabled, children }) {
  return (
    <div className="flex justify-center items-center gap-16 relative w-fit self-center justify-self-center font-bold">
      <button
        className="bg-primary z-10  text-textSecondary text-4xl px-16 py-8 rounded-full  border-2 relative"
        onClick={onclick}
        disabled={disabled}>
        {children}
      </button>
      <span className="bg-[#fff] text-textSecondary text-4xl  w-full h-full  rounded-full  border-2 -bottom-16 left-1/2 -translate-x-1/2 -translate-y-1/2  absolute " />
    </div>
  );
}
