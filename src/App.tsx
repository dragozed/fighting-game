import React, { useEffect } from "react";
import { useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { theme } from "./utils/theme";
import { Home } from "./pages/Home";

import { CharacterStatusContext } from "./contexts/CharacterStatusContext";
import { CharacterListContext } from "./contexts/CharacterListContext";
import { StageStatusContext } from "./contexts/StageStatusContext";
import { UserInfoContext } from "./contexts/UserInfoContext";
import { UserInfoType } from "./types/UserInfoType";
import { VillageStatusContext } from "./contexts/VillageStatusContext";
import { VillageStatusType } from "./types/VillageStatusType";

import "./App.css";

const stageStatus = {
  stagestatus: "",
  stagenumber: 1,
};
const characterStatus = {
  character1: "alive",
  minion1: "alive",
  boss: "alive",
};

function App() {
  const [villageStatus, setVillageStatus] = useState<VillageStatusType>({
    wood: 0,
    stone: 0,
    iron: 0,
    trainingGroundsLevel: 0,
    trainingGroundsWoodReq: 5,
    trainingGroundsStoneReq: 5,
    trainingGroundsIronReq: 0,
  });
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    username: "",
    email: "",
  });

  return (
    <CharacterStatusContext.Provider value={characterStatus}>
      <CharacterListContext.Provider value={["character1", "minion1"]}>
        <StageStatusContext.Provider value={stageStatus}>
          <VillageStatusContext.Provider
            value={{ villageStatus, setVillageStatus }}
          >
            <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
              <div className="App">
                <ThemeProvider theme={theme}>
                  <Home />
                </ThemeProvider>
              </div>
            </UserInfoContext.Provider>
          </VillageStatusContext.Provider>
        </StageStatusContext.Provider>
      </CharacterListContext.Provider>
    </CharacterStatusContext.Provider>
  );
}

export default App;
