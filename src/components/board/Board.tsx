import Line from "./Line";
import classes from "../wordle/Wordle.module.css";
import { GameState } from "../../store/Context";

const Board = () => {
  const GameContext = GameState();
  return (
    <div className={classes["tile-container"]}>
      {[...Array(GameContext!.lineNum)].map((e, i) => (
        <Line index={i} id={`line-${i}`} key={`line-${i}`} />
      ))}
    </div>
  );
};

export default Board;
