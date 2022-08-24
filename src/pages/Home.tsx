import React, { useState, useContext, useEffect } from "react";
import { Button, Typography, AppBar, Toolbar, Box } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

import { Field } from "../components/Field/Field";
import { Village } from "../components/Village/Village";
import { Inventory } from "../components/Inventory/Inventory";
import { RegisterModal } from "../components/RegisterModal/RegisterModal";
import { LoginModal } from "../components/LoginModal/LoginModal";
import { UserList } from "../components/UserList/UserList";

import { CharacterStatusContext } from "../contexts/CharacterStatusContext";
import { CharacterListContext } from "../contexts/CharacterListContext";
import { StageStatusContext } from "../contexts/StageStatusContext";
import { VillageStatusContext } from "../contexts/VillageStatusContext";
import { InventoryContext } from "../contexts/InventoryContext";

import "./Home.scss";

export const Home: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isVillageOpen, setIsVillageOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const characterStatus = useContext(CharacterStatusContext);
  const characterList = useContext(CharacterListContext);
  const { villageStatus, setVillageStatus } = useContext(VillageStatusContext);
  const { inventory, setInventory } = useContext(InventoryContext);
  let stageStatus = useContext(StageStatusContext);
  const [userInfo, setUserInfo] = useState(Cookies.get("userInfo") || "");

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
  const getIsInventoryOpen = (isinventoryopen: boolean): void => {
    setIsInventoryOpen(isinventoryopen);
  };
  const getIsLoginSuccessful = (isloginsuccessful: boolean): void => {
    setIsLoginSuccessful(isloginsuccessful);
  };

  const logoutHandler = () => {
    Cookies.remove("userInfo");
    setVillageStatus({
      wood: 0,
      stone: 0,
      iron: 0,
      trainingGroundsLevel: 0,
      trainingGroundsWoodReq: 5,
      trainingGroundsStoneReq: 5,
      trainingGroundsIronReq: 0,
    });
    setIsLoginSuccessful(false);
  };

  useEffect(() => {
    //check login success using userInfo
    if (userInfo === "") {
      setIsLoginSuccessful(false);
    } else {
      setIsLoginSuccessful(true);
    }
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default" }} height={"100vh"}>
      <div className="home">
        {!isGameStarted &&
        !isVillageOpen &&
        !isRegisterOpen &&
        !isLoginOpen &&
        !isInventoryOpen ? ( //main menu
          <>
            <AppBar color="secondary" position="static">
              <Toolbar>
                {isLoginSuccessful ? (
                  <>
                    <Typography>
                      {"User:" +
                        JSON.parse(Cookies.get("userInfo") || "").userName}
                    </Typography>
                    <Button
                      size="large"
                      className="registerButton"
                      color="primary"
                      variant="contained"
                      disabled={false}
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </>
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
                sx={{ margin: "1rem" }}
                className="startButton"
                color="primary"
                variant="contained"
                disabled={isGameStarted}
                onClick={() => {
                  characterList[0] = inventory.characters[0];
                  characterList[1] = inventory.minions[0];
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
              <Button //start button
                size="large"
                sx={{ margin: "1rem" }}
                className="villageButton"
                color="primary"
                variant="contained"
                disabled={isGameStarted}
                onClick={() => {
                  setIsInventoryOpen(true);
                }}
              >
                Inventory
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
        ) : isInventoryOpen ? (
          <Inventory getIsInventoryOpen={getIsInventoryOpen} />
        ) : (
          "You Shouldnt be here"
        )}
        <UserList />
      </div>
    </Box>
  );
};
