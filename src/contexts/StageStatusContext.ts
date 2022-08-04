import { createContext } from "react";

let stageStatus: [string, number] = ["", 1];
//stagestatus[] = ["ongoing",1]

export const StageStatusContext = createContext(stageStatus);
