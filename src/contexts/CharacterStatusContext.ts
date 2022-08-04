import { createContext } from "react";

//character1,character2,boss dead or alive status

const characterStatus = {
  character1: "",
  minion1: "",
  boss: "",
};

export const CharacterStatusContext = createContext(characterStatus);
