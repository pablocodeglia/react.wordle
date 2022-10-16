import { useEffect } from "react";
import Keyboard from "./Keyboard";
import classes from "./Wordle.module.css";
import { GameState } from "../store/Context";
import Board from "./Board";
import ErrorMessage from "./ErrorMessage";

const Wordle: React.FC = () => {
  const GameContext = GameState();

  useEffect(() => {
    GameContext!.getWord();
  }, []);

  return (
    <>
      word is{GameContext?.secretWord}
      <div className={classes["wordle-container"]}>
        <Board />
        <ErrorMessage />
        <Keyboard />
      </div>
    </>
  );
};

export default Wordle;
