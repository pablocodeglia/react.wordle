import classes from "./Wordle.module.css";
import { motion } from "framer-motion";
import { GameState } from "../store/Context";
import LineTile from "./LineTile";
import { useEffect } from "react";

const Line: React.FC<{ index: number; id: string }> = (props) => {
  const GameContext = GameState();
  const word = GameContext!.secretWord;

  useEffect(() => {});

  return (
    <>
      <motion.div className={classes["tile-line"]}>
        {word.map((letter, i) => {
          return (
            <LineTile
              id={props.id}
              lineIndex={props.index}
              tileIndex={i}
              key={`${letter}-${i}`}
            />
          );
        })}
      </motion.div>
    </>
  );
};

export default Line;
