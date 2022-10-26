import classes from "../wordle/Wordle.module.css";
import { GameState } from "../../store/Context";
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
      x: [0, 10, 0, -10, 0],
      transition: {
        repeat: 1,
        type: "spring",
        duration: 0.1,
      },
    },
    green: (custom: number) => ({
      backgroundColor: "#53ad09",
      borderColor: "#53ad09",
      color: "#fff",
      scale: [0, 0, 1.2, 1],
      transition: {
        delay: 0.1 * custom,
        duration: 0.2,
      },
    }),
    yellow: (custom: number) => ({
      backgroundColor: "#e0be24",
      borderColor: "#e0be24",
      color: "#fff",
      scale: [0, 0, 1.2, 1],
      transition: {
        delay: 0.1 * custom,
        duration: 0.2,
      },
    }),
    grey: (custom: number) => ({
      backgroundColor: "#666666",
      borderColor: "#666666",
      color: "#fff",
      scale: [0, 0, 1.2, 1],
      transition: {
        delay: 0.1 * custom,
        duration: 0.2,
      },
    }),
    won: (custom: number) => ({
      scaleX: [1, 0, 1],
      y: [0, 15, 0],
      transition: {
        delay: 0.1 * custom,
        repeat: 1,

        duration: 0.4,
      },
    }),
  };

  const controls = useAnimationControls();

  // Animate On submitted, change letter animation accordingly
  useEffect(() => {
    if (
      props.lineIndex === GameContext!.lineIndex - 1 &&
      GameContext!.isWordValid === true
    ) {
      const secretWordLetter = GameContext!.secretWord[props.tileIndex];
      const currentGuessLetter = GameContext!.submittedWord[props.tileIndex];

      if (secretWordLetter === currentGuessLetter) {
        controls.start("green");
        // GameContext!.setSubmittedWord((prev) =>
        //   prev.splice(props.tileIndex, 1, "")
        // );
      } else if (GameContext!.secretWord.includes(currentGuessLetter)) {
        controls.start("yellow");
      } else {
        controls.start("grey");
        GameContext?.setWrongLetters((prev) => prev.concat(currentGuessLetter));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GameContext!.submittedWord]);

  // Animate Error Tremble
  useEffect(
    () => {
      if (
        GameContext?.error !== "" &&
        props.lineIndex === GameContext?.lineIndex
      ) {
        controls.start("invalid");
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [GameContext!.error]
  );

  // Animate Won Game
  useEffect(
    () => {
      if (GameContext!.won && props.lineIndex === GameContext?.lineIndex) {
        controls.start("green");
        setTimeout(() => controls.start("won"), 800);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [GameContext!.won]
  );

  return (
    <>
      <motion.div
        className={
          props.tileIndex === GameContext?.letterIndex &&
          props.lineIndex === GameContext?.lineIndex
            ? `${classes.tile} ${classes["tile-current"]}`
            : `${classes.tile}`
        }
        key={`${props.id}-${props.tileIndex}`}
        initial={false}
        animate={controls}
        variants={variants}
        custom={props.tileIndex}
      >
        {GameContext!.board[props.lineIndex][props.tileIndex]}
      </motion.div>
    </>
  );
};

export default LineTile;
