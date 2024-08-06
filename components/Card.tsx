import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

interface Item {
  emoji?: string;
  title?: string;
  description?: string;
}

interface CardProps {
  to?: string;
  item?: Item;
  withAction: boolean;
}

export const Card: React.FC<CardProps> = ({ to = "", item, withAction = true }) => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const checkTouchDevice = (): boolean => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;
    };
    setIsTouchDevice(checkTouchDevice());
  }, []);

  const toggleActive = useCallback(() => {
    if (isTouchDevice) {
      setIsActive((prev) => !prev);
    }
  }, [isTouchDevice]);

  const activeClass = isTouchDevice ? (isActive ? "touch-active" : "") : "group-hover";

  return (
    <div className={`perspective-1000 group mt-20 w-full text-left`} onClick={toggleActive}>
      <div className="transform-style-3d group:rotate-y-3 touch-active:rotate-y-3 relative w-full p-1 transition-transform duration-75 ease-in-out">
        <div className="duration-250 relative flex flex-col gap-8 rounded-3xl border-2 border-primary bg-bg px-4 pb-6 pt-20 font-bold text-textContrast shadow-2xl transition-all ease-in-out group-hover:bg-primary group-hover:text-textSecondary group-hover:shadow-primary touch-active:bg-primary touch-active:text-textSecondary">
          <div className="absolute -top-20 left-0 right-0 flex justify-center">
            <span className="flex h-36 w-36 items-center justify-center rounded-full border border-primary bg-bg text-6xl font-bold text-textSecondary transition-all duration-75 ease-in-out group-hover:animate-bounce group-hover:border-secondary group-hover:bg-primary touch-active:animate-bounce touch-active:border-secondary touch-active:bg-primary">
              {item?.emoji}
            </span>
          </div>
          <div className="duration-250 flex flex-col gap-4 p-4 transition-all ease-in-out group-hover:translate-y-[-10px] touch-active:translate-y-[-10px]">
            <h4 className="w-full text-4xl font-bold transition-all duration-75 ease-in-out group-hover:scale-105 touch-active:scale-105 lg:text-4xl">
              {item?.title}
            </h4>
            <p className="text-ellipsis text-2xl font-normal transition-all duration-75 ease-in-out lg:text-2xl">{item?.description}</p>
          </div>
          {withAction && (
            <Link href={to}>
              <div className="duration-250 transition-all ease-in-out">
                <button className="w-full translate-y-full transform self-center rounded-full border border-secondary bg-transparent py-4 text-3xl text-textSecondary opacity-0 shadow-2xl transition-all duration-75 ease-in-out hover:bg-bg hover:text-primary hover:shadow-2xl hover:shadow-bg group-hover:translate-y-0 group-hover:opacity-100 touch-active:translate-y-0 touch-active:opacity-100">
                  A estudiar!
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
