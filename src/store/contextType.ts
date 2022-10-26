import { Dispatch, SetStateAction } from "react";

type GameContextType = {
  board: string[][];
  won: boolean;
  secretWord: string[];
  lineNum: number;
  lineIndex: number;
  letterIndex: number;
  wrongLetters: string[];
  isWordValid: boolean | null;
  submittedWord: string[];
  error: string;
  setWrongLetters: Dispatch<SetStateAction<string[]>>;
  setIsWordValid: Dispatch<SetStateAction<boolean | null>>;
  setError: Dispatch<SetStateAction<string>>;
  setSubmittedWord: Dispatch<SetStateAction<string[]>>;
  getWord: () => Promise<void>;
  addClickedLetter: (letter: string) => void;
  backspaceLetter: () => void;
  submitGuess: () => void;
};

export default GameContextType;
