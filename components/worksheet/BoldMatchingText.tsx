import React from "react";

interface BoldMatchingTextProps {
  text: string;
  boldText: string;
}

function BoldMatchingText({ text, boldText }: BoldMatchingTextProps): React.ReactNode {
  if (!text || !boldText) return text;

  const parts = text.split(new RegExp(`(${boldText})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === boldText.toLowerCase() ? (
          <span key={index} className="font-bold">
            {part}
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export default BoldMatchingText;
