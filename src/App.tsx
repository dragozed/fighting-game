import React, { useEffect } from "react";
import { useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import axios from "axios";

import { theme } from "./utils/theme";
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
  let userData: any;

  const [villageStatus, setVillageStatus] = useState<VillageStatusType>({
    wood: 0,
    stone: 0,
    iron: 0,
    trainingGroundsLevel: 0,
    trainingGroundsWoodReq: 5,
    trainingGroundsStoneReq: 5,
    trainingGroundsIronReq: 0,
  });

  const axiosGetData = async () => {
    const response = await axios.get(
      "https://fighting-game-backend.herokuapp.com/users"
    );
    const json = await response.data;
    return json;
  };

  const axiosPostUser = async (username: string, userrole: string) => {
    await axios.post(
      "https://fighting-game-backend.herokuapp.com/users/addUser",
      {
        userName: username,
        userRole: userrole,
      }
    );
  };

  const axiosUpdateUser = async (id: string) => {
    await axios.post(
      "https://fighting-game-backend.herokuapp.com/users/updateUser",
      {
        id: id,
      }
    );
  };

  const denemeOnClick = (): void => {
    axiosUpdateUser(userData[1]._id);
    console.log(userData);
  };

  useEffect(() => {
    axiosGetData().then((data) => {
      //get data THEN console.log(data)
      console.log(data);
      userData = data;
    });
  }, [axiosGetData]);

  return (
    <CharacterStatusContext.Provider value={characterStatus}>
      <CharacterListContext.Provider value={["character1", "minion1"]}>
        <StageStatusContext.Provider value={stageStatus}>
          <VillageStatusContext.Provider
            value={{ villageStatus, setVillageStatus }}
          >
            <div className="App">
              <ThemeProvider theme={theme}>
                <button onClick={() => denemeOnClick()}></button>
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
