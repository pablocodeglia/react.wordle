import { Dispatch, MutableRefObject, SetStateAction } from "react";

type GameContextType = {
  secretWord: string[];
  lineNum: number;
  lineIndex: number;
  letterIndex: number;
  currentGuess: string[];
  wrongLetters: string[];
  setWrongLetters: Dispatch<SetStateAction<string[]>>;
  isWordValid: boolean | null;
  tilesRef: MutableRefObject<(HTMLDivElement | null)[][]>;
  submittedWord: string;
  getWord: () => Promise<void>;
  addClickedLetter: (letter: string) => void;
  backspaceLetter: () => void;
  submitGuess: () => void;
  addWrongLetter: (letter: string) => void;
};

export default GameContextType;
