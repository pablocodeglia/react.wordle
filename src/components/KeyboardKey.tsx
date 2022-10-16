import { GameState } from "../store/Context";
import classes from "./Wordle.module.css";
import { motion } from "framer-motion";
import { useEffect } from "react";

const KeyboardKey: React.FC<{ letter: string }> = (props) => {
  const GameContext = GameState();
  let className = `${classes["keyboard-key"]}`;

  useEffect(() => {
    console.log("check letter keyboard");
    if (GameContext!.isWordValid === true) {
      if (GameContext!.wrongLetters.includes(props.letter)) {
        className = `${classes["keyboard-key"]} ${classes["keyboard-key-grey"]}`;
      }
    }
  }, [GameContext!.submittedWord]);

  return (
    <motion.input
      type="button"
      className={className}
      value={props.letter.toUpperCase()}
      onClick={() => GameContext?.addClickedLetter(props.letter)}
      whileHover={{ backgroundColor: "#666666" }}
      whileTap={{ scale: 0.9 }}
    />
  );
};

export default KeyboardKey;
