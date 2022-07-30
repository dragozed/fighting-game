import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import "./App.css";
import { theme } from "./utils/theme";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout>
          <Home />
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
