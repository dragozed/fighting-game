import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { theme } from "./utils/theme";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { CharacterStatusContext } from "./contexts/CharacterStatusContext";
import { CharacterListContext } from "./contexts/CharacterListContext";
import { StageStatusContext } from "./contexts/StageStatusContext";

import "./App.css";

function App() {
  return (
    <CharacterStatusContext.Provider value={["alive", "alive", "alive"]}>
      <CharacterListContext.Provider value={["character1", "minion1"]}>
        <StageStatusContext.Provider value={["ongoing", 1]}>
          <div className="App">
            <ThemeProvider theme={theme}>
              <Layout>
                <Home />
              </Layout>
            </ThemeProvider>
          </div>
        </StageStatusContext.Provider>
      </CharacterListContext.Provider>
    </CharacterStatusContext.Provider>
  );
}

export default App;
