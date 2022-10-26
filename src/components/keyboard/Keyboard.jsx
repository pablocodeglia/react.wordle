import classes from "../wordle/Wordle.module.css";
import KeyboardKey from "./KeyboardKey";
import KeyboardBackspace from "./KeyboardBackspace";

import KeyboardEnter from "./KeyboardEnter";

const language = "english";

const keyboardKeys = {
  english: {
    line1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    line2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    line3: ["z", "x", "c", "v", "b", "n", "m"],
  },
  portuguese: {
    line1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    line2: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],
    line3: ["z", "x", "c", "v", "b", "n", "m"],
  },
  spanish: {
    line1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    line2: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
    line3: ["z", "x", "c", "v", "b", "n", "m"],
  },
};

const Keyboard = () => {
  const currKB = keyboardKeys[language];

  return (
    <div className={classes.keyboard}>
      <div style={{ display: "flex" }}>
        {currKB.line1.map((key) => {
          return <KeyboardKey letter={key} key={key} />;
        })}
      </div>
      <div style={{ display: "flex" }}>
        {currKB.line2.map((key) => {
          return <KeyboardKey letter={key} key={key} />;
        })}
      </div>
      <div style={{ display: "flex" }}>
        <KeyboardEnter />
        {currKB.line3.map((key) => {
          return <KeyboardKey letter={key} key={key} />;
        })}
        <KeyboardBackspace />
      </div>
    </div>
  );
};

export default Keyboard;
