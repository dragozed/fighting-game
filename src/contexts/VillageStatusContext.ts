import { createContext } from "react";

const villageStatus = {
  wood: 0,
  stone: 0,
  iron: 0,
  trainingGroundsLevel: 0,
};

export const VillageStatusContext = createContext(villageStatus);
