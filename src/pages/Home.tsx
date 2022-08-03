import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

import { Field } from "../components/Field/Field";

import "./Home.scss";

export const Home: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const getIsGameStarted = (isgamestarted: boolean): void => {
    setIsGameStarted(isgamestarted);
  };

  return (
    <div className="home">
      {!isGameStarted ? (
        <>
          <div className="text-button">
            <Typography
              sx={{ marginTop: "1rem" }}
              variant="h4"
              color="primary"
              textAlign="center"
            >
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
          </div>
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
          <Field getIsGameStarted={getIsGameStarted} />
        </>
      )}
    </div>
  );
};
