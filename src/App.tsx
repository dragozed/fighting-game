import React from "react";
import { useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { theme } from "./utils/theme";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";

import { CharacterStatusContext } from "./contexts/CharacterStatusContext";
import { CharacterListContext } from "./contexts/CharacterListContext";
import { StageStatusContext } from "./contexts/StageStatusContext";
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

  return (
    <CharacterStatusContext.Provider value={characterStatus}>
      <CharacterListContext.Provider value={["character1", "minion1"]}>
        <StageStatusContext.Provider value={stageStatus}>
          <VillageStatusContext.Provider
            value={{ villageStatus, setVillageStatus }}
          >
            <div className="App">
              <ThemeProvider theme={theme}>
                <Home />
              </ThemeProvider>
            </div>
          </VillageStatusContext.Provider>
        </StageStatusContext.Provider>
      </CharacterListContext.Provider>
    </CharacterStatusContext.Provider>
  );
}

export default App;
