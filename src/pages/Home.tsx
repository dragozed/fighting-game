import React, { useState, useContext, useEffect } from "react";
import { Button, Typography, AppBar, Toolbar, Box } from "@mui/material";

import { Field } from "../components/Field/Field";
import { Village } from "../components/Village/Village";
import { RegisterModal } from "../components/RegisterModal/RegisterModal";
import { LoginModal } from "../components/LoginModal/LoginModal";
import { UserList } from "../components/UserList/UserList";

import { UserInfoContext } from "../contexts/UserInfoContext";
import { CharacterStatusContext } from "../contexts/CharacterStatusContext";
import { CharacterListContext } from "../contexts/CharacterListContext";
import { StageStatusContext } from "../contexts/StageStatusContext";
import { VillageStatusContext } from "../contexts/VillageStatusContext";

import "./Home.scss";

export const Home: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isVillageOpen, setIsVillageOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const characterStatus = useContext(CharacterStatusContext);
  const characterList = useContext(CharacterListContext);
  let stageStatus = useContext(StageStatusContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const getIsGameStarted = (isgamestarted: boolean): void => {
    setIsGameStarted(isgamestarted);
  };
  const getIsVillageOpen = (isvillageopen: boolean): void => {
    setIsVillageOpen(isvillageopen);
  };
  const getIsRegisterOpen = (isregisteropen: boolean): void => {
    setIsRegisterOpen(isregisteropen);
  };
  const getIsLoginOpen = (isloginopen: boolean): void => {
    setIsLoginOpen(isloginopen);
  };
  const getIsLoginSuccessful = (isloginsuccessful: boolean): void => {
    setIsLoginSuccessful(isloginsuccessful);
  };

  return (
    <Box sx={{ bgcolor: "background.default" }} height={"100vh"}>
      <div className="home">
        {!isGameStarted && !isVillageOpen && !isRegisterOpen && !isLoginOpen ? ( //main menu
          <>
            <AppBar color="secondary" position="static">
              <Toolbar>
                {isLoginSuccessful ? (
                  "User:" + userInfo.username
                ) : (
                  <>
                    <Button
                      size="large"
                      className="registerButton"
                      color="primary"
                      variant="contained"
                      disabled={false}
                      onClick={() => {
                        setIsRegisterOpen(true);
                      }}
                    >
                      Register
                    </Button>
                    <Button
                      size="large"
                      className="registerButton"
                      color="primary"
                      variant="contained"
                      disabled={false}
                      onClick={() => {
                        setIsLoginOpen(true);
                      }}
                    >
                      Login
                    </Button>
                  </>
                )}
              </Toolbar>
            </AppBar>
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
        ) : isRegisterOpen ? (
          <RegisterModal
            isRegisterOpen={isRegisterOpen}
            getIsRegisterOpen={getIsRegisterOpen}
          />
        ) : isLoginOpen ? (
          <LoginModal
            isLoginOpen={isLoginOpen}
            getIsLoginOpen={getIsLoginOpen}
            getIsLoginSuccessful={getIsLoginSuccessful}
          />
        ) : (
          "You Shouldnt be here"
        )}
        <UserList />
      </div>
    </Box>
  );
};
