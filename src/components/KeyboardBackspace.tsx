import { GameState } from "../store/Context";
import classes from "./Wordle.module.css";

const KeyboardBackspace: React.FC = (props) => {
  const GameContext = GameState();
  return (
    <button
      className={classes["keyboard-key-large"]}
      value="Enter"
      onClick={() => GameContext!.backspaceLetter()}
      style={{ padding: "5px" }}
    >
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
      >
        <g>
          <path d="M10.625,5.09L0,22.09l10.625,17H44.18v-34H10.625z M42.18,37.09H11.734l-9.375-15l9.375-15H42.18V37.09z" />
          <polygon
            points="18.887,30.797 26.18,23.504 33.473,30.797 34.887,29.383 27.594,22.09 34.887,14.797 33.473,13.383 26.18,20.676 
18.887,13.383 17.473,14.797 24.766,22.09 17.473,29.383 	"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </button>
  );
};

export default KeyboardBackspace;
