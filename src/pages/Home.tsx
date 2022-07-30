import React, { useState } from "react";

import "./Home.scss";
import { Button, Typography } from "@mui/material";
import { Field } from "../components/Field/Field";

export const Home: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <div className="home">
      {!isGameStarted ? (
        <>
          <Typography sx={{ marginTop: "1rem" }} variant="h4" color="primary">
            Fighting Game
          </Typography>
          <Button //start button
            size="large"
            sx={{ margin: "2rem" }}
            className="startButton"
            color="primary"
            variant="contained"
            disabled={isGameStarted}
            onClick={() => setIsGameStarted(true)}
          >
            Start
          </Button>
        </>
      ) : (
        <>
          <Button
            size="large"
            className="backButton"
            sx={{ position: "absolute", top: "1rem", left: "1rem" }}
            color="secondary"
            variant="contained"
            onClick={() => {
              setIsGameStarted(false);
            }}
          >
            Back
          </Button>
          <Field />
        </>
      )}
    </div>
  );
};
