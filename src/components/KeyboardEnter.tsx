import { GameState } from "../store/Context";
import classes from "./Wordle.module.css";

const KeyboardEnter: React.FC = (props) => {
  const GameContext = GameState();

  const onClickHandler = () => {
    GameContext?.submitGuess();
  };

  return (
    <input
      type="button"
      className={classes["keyboard-key-large"]}
      value="ENTER"
      onClick={onClickHandler}
    />
  );
};

export default KeyboardEnter;
