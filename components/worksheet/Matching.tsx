import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import Xarrow from "react-xarrows";
import ContinueButton from "./ContinueButton";

const MatchingGame = ({ item, goNext, handleAnswer }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [connections, setConnections] = useState([]);
  const [items, setItems] = useState([...item.pairs].sort(() => Math.random() - 0.5));
  const [matches, setMatches] = useState([...item.pairs].sort(() => Math.random() - 0.5));

  const isConnected = (index, type) => {
    return connections.some((conn) => conn[type] === index);
  };

  const handleItemClick = (pair, index, type) => {
    if (isConnected(index, type)) return;

    if (selectedItem === null) return setSelectedItem({ ...pair, index, type });
    if (type === selectedItem.type) return setSelectedItem(null);
    if (selectedItem.type !== type) {
      if ((type === "item" && pair.match === selectedItem.match) || (type === "match" && pair.item === selectedItem.item)) {
        const newConnection = {
          item: type === "item" ? index : selectedItem.index,
          match: type === "match" ? index : selectedItem.index,
        };
        setConnections([...connections, newConnection]);
        setSelectedItem(null);
      } else {
        console.log("Incorrect match");
        setSelectedItem(null);
      }
    }
  };

  return (
    <div className="center relative w-full flex-col gap-8">
      <h1 className="text-3xl font-bold">Conecta las palabras en ingles con su traduccion en español</h1>
      <div className="center flex flex-col gap-8 rounded-lg bg-primary p-8">
        <div className="flex gap-x-36">
          <div className="flex w-fit flex-col gap-8">
            <AnimatePresence>
              {items.map((pair, index) => (
                <motion.div
                  key={`item-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <Button
                    className={`w-full ${
                      (selectedItem?.index === index && selectedItem.type === "item") || isConnected(index, "item")
                        ? "bg-secondary text-primary"
                        : ""
                    }`}
                    id={`item-${index}`}
                    secondary
                    onClick={() => handleItemClick(pair, index, "item")}>
                    {pair.item}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex w-fit flex-col gap-8">
            <AnimatePresence>
              {matches.map((pair, index) => (
                <motion.div
                  key={`match-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <Button
                    className={`w-full ${
                      (selectedItem?.index === index && selectedItem.type === "match") || isConnected(index, "match")
                        ? "bg-secondary text-primary"
                        : ""
                    }`}
                    id={`match-${index}`}
                    secondary
                    onClick={() => handleItemClick(pair, index, "match")}>
                    {pair.match}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        {connections.length === items.length && (
          <AnimatePresence initial={false} mode="wait">
            <motion.h1
              key={selectedItem}
              className="rounded-3xl bg-primary p-10 text-center text-4xl font-bold text-secondary"
              initial={{ scale: 0, y: -50 }}
              animate={{ scale: [1.1, 1], y: 0 }}>
              Correcto!🎊
            </motion.h1>
          </AnimatePresence>
        )}
      </div>
      <ContinueButton
        isVisible={connections.length === items.length}
        onClick={() => {
          handleAnswer(connections);
          goNext();
        }}
      />

      {connections.map((conn, index) => (
        <Xarrow
          key={`arrow-${index}`}
          start={`item-${conn.item}`}
          end={`match-${conn.match}`}
          color="#071333"
          strokeWidth={6}
          path="smooth"
        />
      ))}
    </div>
  );
};

export default MatchingGame;
