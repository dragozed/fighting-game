import React, { useState, useContext } from "react";
import { Button, Typography } from "@mui/material";

import { Field } from "../components/Field/Field";
import { CharacterStatusContext } from "../contexts/CharacterStatusContext";
import { CharacterListContext } from "../contexts/CharacterListContext";
import { StageStatusContext } from "../contexts/StageStatusContext";

import "./Home.scss";

export const Home: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const characterStatus = useContext(CharacterStatusContext);
  const characterList = useContext(CharacterListContext);
  const stageStatus = useContext(StageStatusContext);

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
              onClick={() => {
                {
                  //i am not sure why i should do it like that but other methods dont work
                  characterList[0] = "character1";
                  characterList[1] = "minion1";
                  characterStatus[0] = "alive";
                  characterStatus[1] = "alive";
                  characterStatus[2] = "alive";
                  stageStatus[0] = "ongoing";
                  setIsGameStarted(true);
                }
              }}
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
