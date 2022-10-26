import Wordle from "./components/wordle/Wordle";
import classes from "../src/components/wordle/Wordle.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";

function App() {
  return (
    <>
      <div className={classes.App}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wordle" element={<Wordle />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

// <div className={classes.App}>
// <BrowserRouter>
// <Routes>

// <Route path="/" element={<Home/>}>
// <Route path="/wordle" element={<Wordle />}>
// </Routes>

// </BrowserRouter>
// </div>
