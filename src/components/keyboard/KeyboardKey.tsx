import { GameState } from "../../store/Context";
import classes from "../wordle/Wordle.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const KeyboardKey: React.FC<{ letter: string }> = (props) => {
  const GameContext = GameState();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (GameContext!.wrongLetters.includes(props.letter)) {
      setIsDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GameContext!.wrongLetters]);

  return (
    <motion.input
      type="button"
      className={classes["keyboard-key"]}
      value={props.letter}
      onClick={() => GameContext?.addClickedLetter(props.letter)}
      whileHover={isDisabled ? "" : { backgroundColor: "#666666" }}
      whileTap={{ scale: 0.9 }}
      disabled={isDisabled}
    />
  );
};

export default KeyboardKey;
