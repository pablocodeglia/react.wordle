import classes from "./Wordle.module.css";
import { GameState } from "../store/Context";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const LineTile: React.FC<{
  lineIndex: number;
  tileIndex: number;
  id: string;
}> = (props) => {
  const GameContext = GameState();

  const variants = {
    invalid: {
      x: [0, 5, 0, -5, 0],
      transition: {
        repeat: 1,
        type: "spring",
        bounce: 10,
        duration: 0.1,
      },
    },
    green: (custom: number) => ({
      backgroundColor: "#53ad09",
      borderColor: "#53ad09",
      color: "#fff",
      scale: [0, 0, 1.5, 1],
      transition: {
        delay: 0.1 * custom,
        duration: 0.2,
      },
    }),
    yellow: (custom: number) => ({
      backgroundColor: "#e0be24",
      borderColor: "#e0be24",
      color: "#fff",
      scale: [0, 0, 1.5, 1],
      transition: {
        delay: 0.1 * custom,
        duration: 0.2,
      },
    }),
    grey: (custom: number) => ({
      backgroundColor: "#666666",
      borderColor: "#666666",
      color: "#fff",
      scale: [0, 0, 1.5, 1],
      transition: {
        delay: 0.1 * custom,
        duration: 0.2,
      },
    }),
  };

  const controls = useAnimationControls();

  useEffect(() => {
    if (
      props.lineIndex === GameContext!.lineIndex - 1 &&
      GameContext!.isWordValid === true
    ) {
      const secretWordLetter = GameContext!.secretWord[props.tileIndex];
      const currentGuessLetter = GameContext!.submittedWord[props.tileIndex];

      if (secretWordLetter === currentGuessLetter) {
        controls.start("green");
      } else if (GameContext!.secretWord.includes(currentGuessLetter)) {
        controls.start("yellow");
      } else {
        controls.start("grey");
        GameContext?.setWrongLetters((prev) => prev.concat(currentGuessLetter));
        console.log(GameContext?.wrongLetters)
      }
    }
  }, [GameContext!.submittedWord]);

  useEffect(() => {
    if (GameContext!.isWordValid === false) {
      controls.start("invalid");
    }
  }, [GameContext!.isWordValid]);

  return (
    <>
      <motion.div
        className={`${classes.tile}`}
        key={`${props.id}-${props.tileIndex}`}
        ref={(element) =>
          (GameContext!.tilesRef.current[props.lineIndex][props.tileIndex] =
            element)
        }
        initial={false}
        animate={controls}
        variants={variants}
        custom={props.tileIndex}
      >
        <span></span>
      </motion.div>
    </>
  );
};

export default LineTile;
