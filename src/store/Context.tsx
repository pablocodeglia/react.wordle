import React, { useContext, createContext, useState, useRef } from "react";
import GameContextType from "../store/contextType";

const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [letterIndex, setLetterIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [secretWord, setSecretWord] = useState<string[]>([]);
  const [submittedWord, setSubmittedWord] = useState("");
  const [isWordValid, setIsWordValid] = useState(null);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);

  const lineNum = 6;

  const tilesRef = useRef<Array<Array<HTMLDivElement | null>>>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const getWord = () => {
    return fetch("https://thatwordleapi.azurewebsites.net/get")
      .then((response) => response.json())
      .then((data) => setSecretWord(data.Response.split("")));
  };

  const addClickedLetter = (letter: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev.concat(letter));
      setLetterIndex((prev) => prev + 1);
      tilesRef.current[lineIndex][letterIndex]!.firstElementChild!.textContent =
        letter.toUpperCase();
    }
  };

  const addWrongLetter = (letter: string) => {
    console.log("added letter: ", letter, typeof letter);
    setWrongLetters(wrongLetters.concat("p"));
    console.log(wrongLetters);
  };

  const backspaceLetter = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess((prev) => prev.filter((o, i) => i !== prev.length - 1));
      setLetterIndex((prev) => prev - 1);
      tilesRef.current[lineIndex][
        letterIndex - 1
      ]!.firstElementChild!.textContent = "";
    }
  };

  const submitGuess = async () => {
    const response = await fetch(
      `https://thatwordleapi.azurewebsites.net/ask/?word=${currentGuess.join(
        ""
      )}`
    );
    const json = await response.json();
    setIsWordValid((prev) => (prev = json.Response));

    if (currentGuess.length !== 5) {
      console.log("Not enough letters!");
      return;
    }
    if (currentGuess.length === 5 && json.Response === true) {
      setSubmittedWord((prev) => (prev = currentGuess.join("")));

      if (secretWord.join("") === currentGuess.join("")) {
        console.log("WON!!!!!");
      }
      setLineIndex((prev) => prev + 1);
      setLetterIndex((prev) => (prev = 0));
      setCurrentGuess([]);
    }
  };

  return (
    <GameContext.Provider
      value={{
        letterIndex,
        lineIndex,
        currentGuess,
        secretWord,
        lineNum,
        tilesRef,
        isWordValid,
        submittedWord,
        wrongLetters,
        setWrongLetters,
        getWord,
        addClickedLetter,
        backspaceLetter,
        submitGuess,
        addWrongLetter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

export const GameState = () => {
  return useContext(GameContext);
};
