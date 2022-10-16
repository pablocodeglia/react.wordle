import Wordle from "./components/Wordle";
import classes from "../src/components/Wordle.module.css";

function App() {
  return (
    <div className={classes.App}>
      <Wordle />
    </div>
  );
}

export default App;
