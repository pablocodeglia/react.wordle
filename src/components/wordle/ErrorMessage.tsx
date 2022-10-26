import { useEffect } from "react";
import { GameState } from "../../store/Context";
import classes from "../wordle/Wordle.module.css";

import { motion, useAnimationControls } from "framer-motion";

const ErrorMessage: React.FC = () => {
  const GameContext = GameState();
  const controls = useAnimationControls();

  useEffect(
    () => {
      console.log("show error!");
      if (GameContext!.error !== "") {
        controls.start({ opacity: [1, 1, 1, 0] });
        setTimeout(() => GameContext?.setError(""), 1200);
        return GameContext!.setIsWordValid(null);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [GameContext?.error]
  );

  return (
    <motion.div
      className={classes.error}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {GameContext!.error}
    </motion.div>
  );
};

export default ErrorMessage;
