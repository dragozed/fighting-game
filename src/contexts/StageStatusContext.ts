import { createContext } from "react";

const stageStatus = {
  stagestatus: "",
  stagenumber: 1,
};

export const StageStatusContext = createContext(stageStatus);
