import React, { useContext, createContext, useState } from "react";
import GameContextType from "../store/contextType";
import { boardDefault } from "../utilities/boardDefault";

const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<string[][]>(boardDefault);
  const [won, setWon] = useState<boolean>(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [secretWord, setSecretWord] = useState<string[]>([]);
  const [submittedWord, setSubmittedWord] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [isWordValid, setIsWordValid] = useState<boolean | null>(null);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);

  const lineNum = 6;

  const getWord = async () => {
    const response = await fetch(`https://thatwordleapi.azurewebsites.net/get`);
    const json = await response.json();
    setSecretWord(json.Response.split(""));
  };

  const addClickedLetter = (letter: string) => {
    if (letterIndex < 5) {
      const tempBoard = [...board];
      tempBoard[lineIndex][letterIndex] = letter;
      setBoard(tempBoard);
      setLetterIndex((prev) => prev + 1);
    }
  };

  const backspaceLetter = () => {
    if (letterIndex > 0) {
      const tempBoard = [...board];
      tempBoard[lineIndex][letterIndex - 1] = "";
      setBoard(tempBoard);
      setLetterIndex((prev) => prev - 1);
      setIsWordValid(null);
    }
  };

  const submitGuess = async () => {
    // Get submitted word
    const word = board[lineIndex];

    // Fetch and Check is word is valid
    const response = await fetch(
      `https://thatwordleapi.azurewebsites.net/ask/?word=${word.join("")}`
    );
    const json = await response.json();
    setIsWordValid((prev) => (prev = json.Response));

    // Check if word is long enough
    if (word.length !== 5) {
      setError("Not enough letters!");
      return;
    }

    if (word.length === 5 && json.Response === true) {
      if (secretWord.join("") === word.join("")) {
        setWon(true);
        return;
      }
      setSubmittedWord((prev) => (prev = word));

      setLineIndex((prev) => prev + 1);
      setLetterIndex((prev) => (prev = 0));
    } else {
      setError("Invalid word!");
    }
  };

  return (
    <GameContext.Provider
      value={{
        board,
        won,
        letterIndex,
        lineIndex,
        secretWord,
        lineNum,
        error,
        isWordValid,
        submittedWord,
        wrongLetters,
        setWrongLetters,
        setIsWordValid,
        setError,
        setSubmittedWord,
        getWord,
        addClickedLetter,
        backspaceLetter,
        submitGuess,
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
