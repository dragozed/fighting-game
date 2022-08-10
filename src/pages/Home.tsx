import React, { useState, useContext } from "react";
import { Button, Typography } from "@mui/material";

import { Field } from "../components/Field/Field";
import { Village } from "../components/Village/Village";
import { LoginModal } from "../components/LoginModal/LoginModal";
import { UserList } from "../components/UserList/UserList";

import { CharacterStatusContext } from "../contexts/CharacterStatusContext";
import { CharacterListContext } from "../contexts/CharacterListContext";
import { StageStatusContext } from "../contexts/StageStatusContext";
import { VillageStatusContext } from "../contexts/VillageStatusContext";

import "./Home.scss";

export const Home: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isVillageOpen, setIsVillageOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const characterStatus = useContext(CharacterStatusContext);
  const characterList = useContext(CharacterListContext);
  let stageStatus = useContext(StageStatusContext);
  let villageStatus = useContext(VillageStatusContext);

  const getIsGameStarted = (isgamestarted: boolean): void => {
    setIsGameStarted(isgamestarted);
  };
  const getIsVillageOpen = (isvillageopen: boolean): void => {
    setIsVillageOpen(isvillageopen);
  };
  const getIsLoginOpen = (isloginopen: boolean): void => {
    setIsLoginOpen(isloginopen);
  };

  return (
    <div className="home">
      {!isGameStarted && !isVillageOpen && !isLoginOpen ? ( //main menu
        <>
          <Button
            size="large"
            className="loginButton"
            color="primary"
            variant="contained"
            disabled={false}
            onClick={() => {
              setIsLoginOpen(true);
            }}
          >
            Login
          </Button>
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
                setIsVillageOpen(true);
              }}
            >
              Village
            </Button>
          </div>
        </>
      ) : isGameStarted ? (
        <>
          <div className="field">
            <Field getIsGameStarted={getIsGameStarted} />
          </div>
        </>
      ) : isVillageOpen ? (
        <Village getIsVillageOpen={getIsVillageOpen} />
      ) : isLoginOpen ? (
        <LoginModal isLoginOpen={isLoginOpen} getIsLoginOpen={getIsLoginOpen} />
      ) : (
        "You Shouldnt be here"
      )}
      <UserList />
    </div>
  );
};
