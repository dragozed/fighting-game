import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { theme } from "./utils/theme";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { CharacterContext } from "./contexts/CharacterContext";

import "./App.css";

function App() {
  return (
    <CharacterContext.Provider value={["alive", "alive", "alive"]}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Layout>
            <Home />
          </Layout>
        </ThemeProvider>
      </div>
    </CharacterContext.Provider>
  );
}

export default App;
