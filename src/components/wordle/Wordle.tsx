import { useEffect } from "react";
import { GameState } from "../../store/Context";
import classes from "../wordle/Wordle.module.css";

import Keyboard from "../keyboard/Keyboard";
import Board from "../board/Board";
import ErrorMessage from "./ErrorMessage";

const Wordle: React.FC = () => {
  const GameContext = GameState();

  useEffect(
    () => {
      GameContext!.getWord();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <div className={classes["wordle-container"]}>
        <Board />
        <ErrorMessage />
        psss! word is: {GameContext?.secretWord} <br />
        submitted word: {GameContext?.submittedWord}
        <Keyboard />
      </div>
    </>
  );
};

export default Wordle;
