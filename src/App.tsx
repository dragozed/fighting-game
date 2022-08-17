import React, { useEffect } from "react";
import { useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { theme } from "./utils/theme";
import { Home } from "./pages/Home";

import { CharacterStatusContext } from "./contexts/CharacterStatusContext";
import { CharacterListContext } from "./contexts/CharacterListContext";
import { StageStatusContext } from "./contexts/StageStatusContext";
import { VillageStatusContext } from "./contexts/VillageStatusContext";
import { VillageStatusType } from "./types/VillageStatusType";
import { InventoryContext } from "./contexts/InventoryContext";

import "./App.css";
import { InventoryType } from "./types/InventoryType";

const stageStatus = {
  stagestatus: "",
  stagenumber: 1,
};
const characterStatus = {
  character1: "alive",
  minion1: "alive",
  boss: "alive",
};
const characterList = ["", ""];

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

  const [inventory, setInventory] = useState<InventoryType>({
    characters: ["Kong"],
    minions: ["Lizard Minion"],
  });

  return (
    <>
      <CharacterStatusContext.Provider value={characterStatus}>
        <CharacterListContext.Provider value={characterList}>
          <StageStatusContext.Provider value={stageStatus}>
            <VillageStatusContext.Provider
              value={{ villageStatus, setVillageStatus }}
            >
              <InventoryContext.Provider value={{ inventory, setInventory }}>
                <div className="App">
                  <ThemeProvider theme={theme}>
                    <Home />
                  </ThemeProvider>
                </div>
              </InventoryContext.Provider>
            </VillageStatusContext.Provider>
          </StageStatusContext.Provider>
        </CharacterListContext.Provider>
      </CharacterStatusContext.Provider>
    </>
  );
}

export default App;
