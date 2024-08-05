import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import ContinueButton from "./ContinueButton";
import { Button } from "./Button";

interface FillInTheBlanksProps {}

const FillInTheBlanks: React.FC<FillInTheBlanksProps> = ({ item, goNext, handleAnswer }) => {
  const [droppedAnswer, setDroppedAnswer] = useState(null);
  const dropZoneRef = useRef(null);

  const onSelectorChange = (value) => {
    setSelectedOption(value);
  };

  const handleDragEnd = (event, info, option) => {
    if (dropZoneRef.current) {
      const dropZoneRect = dropZoneRef.current.getBoundingClientRect();

      if (
        info.point.x >= dropZoneRect.left &&
        info.point.x <= dropZoneRect.right &&
        info.point.y >= dropZoneRect.top &&
        info.point.y <= dropZoneRect.bottom
      ) {
        setDroppedAnswer(option);
      }
    }
  };

  const renderSentence = () => {
    const parts = item.sentence.split("{BLANK}");
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <span
            ref={dropZoneRef}
            className={`inline-block min-w-[200px] h-[3rem] mx-1 ${
              droppedAnswer ? "bg-white text-black" : "bg-gray-300"
            } rounded px-2 align-bottom`}>
            {droppedAnswer}
          </span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col gap-4 font-bold">
      <AnimatePresence initial={false} mode="wait">
        <motion.article
          key={droppedAnswer}
          className="center w-full flex-col gap-4 p-4"
          initial={{ rotateX: 120 }}
          animate={{ rotateX: 0 }}>
          <div className="flex flex-col gap-4 rounded-3xl bg-primary p-10 text-center text-5xl text-secondary">
            <>
              <h1> {renderSentence()}</h1>
              {droppedAnswer !== null ? (
                droppedAnswer === item.correctAnswer ? (
                  "Correcto!🎊"
                ) : (
                  "Todos se equivocan de vez en cuando 🧐"
                )
              ) : (
                <h5 className="text-2xl">{item.sentenceTranslation}</h5>
              )}
            </>
          </div>
        </motion.article>
      </AnimatePresence>
      {!droppedAnswer && <h5 className="text-center text-4xl">Haz clic y arrastra la respuesta correcta</h5>}
      <div className="bg-[rgba(60, 60, 0.48)] flex flex-wrap justify-center gap-4">
        {!droppedAnswer &&
          item.options.map((option) => (
            <>
              <Button
                key={option}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={1}
                onDragEnd={(event, info) => handleDragEnd(event, info, option)}
                whileDrag={{ scale: 1.1 }}>
                {option}
              </Button>
            </>
          ))}
      </div>
      <ContinueButton
        isVisible={droppedAnswer}
        onClick={() => {
          handleAnswer(droppedAnswer);
          goNext();
        }}></ContinueButton>
    </div>
  );
};

export default FillInTheBlanks;
