import React, { useState, useEffect, useContext } from "react";

import { Character } from "./Character/Character";
import { Boss } from "./Boss/Boss";
import { Minion } from "./Minion/Minion";
import { EndStageModal } from "./EndStageModal/EndStageModal";

import { StageStatusContext } from "../../contexts/StageStatusContext";

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
  const stageStatus = useContext(StageStatusContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    console.log(characternames);
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
    if (stageStatus[0] === "allieswin" || stageStatus[0] === "enemieswin") {
      setModalIsOpen(true);
    }
  }, [stageStatus[0]]);

  useEffect(() => {
    //if modal is open set bossturn false so boss dont attack after modal
    if (modalIsOpen === true && bossTurn === true) {
      setBossTurn(false);
    }
  }, [modalIsOpen]);

  return (
    <>
      <div className="allies">
        <div className="character1">
          <Character
            characterName={"character1"}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag1}
            recievedDamage={recievedDamage}
            bossTurn={bossTurn}
          />
        </div>
        <div className="character2">
          <Minion
            characterName={"minion1"}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag2}
            recievedDamage={recievedDamage}
            bossTurn={bossTurn}
          />
        </div>
      </div>
      <div className="enemies">
        <div className="boss">
          <Boss
            stageNo={stageStatus[1]}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag3}
            recievedDamage={recievedDamage}
            bossTurn={bossTurn}
          />
        </div>
      </div>
      <EndStageModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        getIsGameStarted={getIsGameStarted}
      ></EndStageModal>
    </>
  );
};
