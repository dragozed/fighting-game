import { createContext } from "react";

//character1,character2,boss dead or alive status
let characterStatus = ["", "", ""];

export const CharacterStatusContext = createContext(characterStatus);
