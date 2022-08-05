import React, { useState, useContext } from "react";
import { Button, Typography } from "@mui/material";

import { Field } from "../components/Field/Field";
import { Village } from "../components/Village/Village";
import { CharacterStatusContext } from "../contexts/CharacterStatusContext";
import { CharacterListContext } from "../contexts/CharacterListContext";
import { StageStatusContext } from "../contexts/StageStatusContext";

import "./Home.scss";

export const Home: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isVillageOpen, setIsVillageOpen] = useState(false);
  const characterStatus = useContext(CharacterStatusContext);
  const characterList = useContext(CharacterListContext);
  let stageStatus = useContext(StageStatusContext);

  const getIsGameStarted = (isgamestarted: boolean): void => {
    setIsGameStarted(isgamestarted);
  };
  const getIsVillageOpen = (isvillageopen: boolean): void => {
    setIsVillageOpen(isvillageopen);
  };

  return (
    <div className="home">
      {!isGameStarted && !isVillageOpen ? (
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
                //i am not sure why i should do it like that but other methods dont work
                characterList[0] = "character1";
                characterList[1] = "minion1";
                characterStatus.character1 = "alive";
                characterStatus.minion1 = "alive";
                characterStatus.boss = "alive";
                stageStatus.stagestatus = "ongoing";
                stageStatus.stagenumber = 1;
                setIsGameStarted(true);
              }}
            >
              Start
            </Button>
            <Button //start button
              size="large"
              sx={{ margin: "1rem" }}
              className="villageButton"
              color="primary"
              variant="contained"
              disabled={isGameStarted}
              onClick={() => {
                characterList[0] = "character1";
                characterList[1] = "minion1";
                characterStatus.character1 = "alive";
                characterStatus.minion1 = "alive";
                characterStatus.boss = "alive";
                stageStatus.stagestatus = "ongoing";
                stageStatus.stagenumber = 1;
                setIsVillageOpen(true);
              }}
            >
              Village
            </Button>
          </div>
        </>
      ) : isGameStarted ? (
        <>
          <Field getIsGameStarted={getIsGameStarted} />
        </>
      ) : isVillageOpen ? (
        <Village getIsVillageOpen={getIsVillageOpen} />
      ) : (
        "You Shouldnt be here"
      )}
    </div>
  );
};
