import { createContext } from "react";
import { VillageStatusType } from "../types/VillageStatusType";

const villageStatus = {
  data : {
  wood: 0,
  stone: 0,
  iron: 0,
  trainingGroundsLevel: 0,
  trainingGroundsWoodReq: 0,
  trainingGroundsStoneReq: 0,
  trainingGroundsIronReq: 0
  },
  setData: (data: VillageStatusType) => {}
};

export const VillageStatusContext = createContext(villageStatus);
