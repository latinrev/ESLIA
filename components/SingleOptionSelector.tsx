export default function SingleOptionSelector({ options, name, handleSelected, selectedOptions }) {
  const onClickButton = (e) => {
    e.preventDefault();
    handleSelected(e.currentTarget.value, name);
  };

  return (
    <div className="grid grid-flow-col place-content-center gap-8">
      {options.map((option: { label: string; value: string }) => {
        const className =
          selectedOptions[name] === option.value
            ? "px-12 py-3 border-primary rounded-2xl border text-textSecondary bg-primary font-bold"
            : "px-12 py-3 border-primary rounded-2xl border";
        return (
          <button onClick={onClickButton} key={option.value} value={option.value} className={className}>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
