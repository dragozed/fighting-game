import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";

import { Character } from "./Character/Character";
import { Boss } from "./Boss/Boss";
import { Minion } from "./Minion/Minion";
import { EndStageModal } from "./EndStageModal/EndStageModal";

import { StageStatusContext } from "../../contexts/StageStatusContext";
import { VillageStatusContext } from "../../contexts/VillageStatusContext";

import { stageRewardCalculator } from "./utils/stageRewardCalculator";
import "./Field.scss";

interface FieldProps {
  getIsGameStarted: (isgamestarted: boolean) => void;
}

export const Field: React.FC<FieldProps> = ({ getIsGameStarted }) => {
  const [characterNames, setCharacterNames] = useState([""]);
  const [damagedFlag1, setDamagedFlag1] = useState(false);
  const [damagedFlag2, setDamagedFlag2] = useState(false);
  const [damagedFlag3, setDamagedFlag3] = useState(false);
  const [recievedDamage, setRecievedDamage] = useState(0); //goes to character
  const [bossTurn, setBossTurn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const stageStatus = useContext(StageStatusContext);
  const { data, setData } = useContext(VillageStatusContext);

  const getCharacterName = (charactername: string): void => {
    //if charactername doesnt exist push it
    if (characterNames.indexOf(charactername) === -1) {
      characterNames.push(charactername);
    }
  };

  const getDamageInfo = (skilldamage: number, targetname: string): void => {
    setRecievedDamage(skilldamage);
    checkDamagedCharacter(targetname, characterNames);
  };

  function checkDamagedCharacter(
    targetname: string,
    characternames: Array<string>
  ) {
    if (characternames.indexOf(targetname) === 1) {
      setDamagedFlag1(true);
    } else if (characternames.indexOf(targetname) === 2) {
      setDamagedFlag2(true);
    } else if (characternames.indexOf(targetname) > 2) {
      setDamagedFlag3(true);
    } else {
      setDamagedFlag1(false);
      setDamagedFlag2(false);
      setDamagedFlag3(false);
    }
  }

  useEffect(() => {
    //setdamagedflags back to false
    if (damagedFlag1 || damagedFlag2) {
      setDamagedFlag1(false);
      setDamagedFlag2(false);
      setBossTurn(false);
    }
    if (damagedFlag3) {
      setDamagedFlag3(false);
      setBossTurn(true);
    }
  }, [damagedFlag1, damagedFlag2, damagedFlag3]);

  useEffect(() => {
    //open modal if some side wins
    if (
      stageStatus.stagestatus === "allieswin" ||
      stageStatus.stagestatus === "enemieswin"
    ) {
      setModalIsOpen(true);
      setData({
        wood:
          data.wood +
          stageRewardCalculator(
            stageStatus.stagestatus,
            stageStatus.stagenumber
          ).wood,
        iron:
          data.iron +
          stageRewardCalculator(
            stageStatus.stagestatus,
            stageStatus.stagenumber
          ).iron,
        stone:
          data.stone +
          stageRewardCalculator(
            stageStatus.stagestatus,
            stageStatus.stagenumber
          ).stone,
        trainingGroundsLevel: data.trainingGroundsLevel,
        trainingGroundsWoodReq: data.trainingGroundsWoodReq,
        trainingGroundsIronReq: data.trainingGroundsIronReq,
        trainingGroundsStoneReq: data.trainingGroundsStoneReq,
      });
    }
  }, [stageStatus.stagestatus]);

  useEffect(() => {
    //if modal is open set bossturn false so boss dont attack after modal
    if (modalIsOpen === true && bossTurn === true) {
      setBossTurn(false);
    }
  }, [modalIsOpen]);

  return (
    <>
      <Button
        size="large"
        className="backButton"
        sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        color="secondary"
        variant="contained"
        onClick={() => {
          getIsGameStarted(false);
        }}
      >
        Back
      </Button>
      <div className="allies">
        <Character
          characterName={"character1"}
          getDamageInfo={getDamageInfo}
          getCharacterName={getCharacterName}
          damagedFlag={damagedFlag1}
          recievedDamage={recievedDamage}
          bossTurn={bossTurn}
        />
        <Minion
          characterName={"minion1"}
          getDamageInfo={getDamageInfo}
          getCharacterName={getCharacterName}
          damagedFlag={damagedFlag2}
          recievedDamage={recievedDamage}
          bossTurn={bossTurn}
        />
      </div>
      <div className="enemies">
        <Boss
          stageNo={stageStatus.stagenumber}
          getDamageInfo={getDamageInfo}
          getCharacterName={getCharacterName}
          damagedFlag={damagedFlag3}
          recievedDamage={recievedDamage}
          bossTurn={bossTurn}
        />
      </div>
      <EndStageModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        getIsGameStarted={getIsGameStarted}
      ></EndStageModal>
    </>
  );
};
