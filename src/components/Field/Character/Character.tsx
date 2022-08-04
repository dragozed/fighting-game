import React, { useState, useEffect, useContext } from "react";

import { HealthBar } from "./HealthBar/HealthBar";
import { SkillBar } from "./SkillBar/SkillBar";

import { CharacterStatusContext } from "../../../contexts/CharacterStatusContext";
import { CharacterListContext } from "../../../contexts/CharacterListContext";
import { StageStatusContext } from "../../../contexts/StageStatusContext";

import { healthPointCalculator } from "../../../utils/healthPointCalculator";
import { characterStatsCalculator } from "./utils/characterStatsCalculator";
import { targetCalculator } from "../../../utils/targetCalculator";
import "./Character.scss";

interface CharacterProps {
  characterName: string;
  getDamageInfo: (skilldamage: number, targetname: string) => void; //goes to field
  getCharacterName: (charactername: string) => void; //goes to field
  damagedFlag: boolean; //checks if damaged
  recievedDamage: number;
  bossTurn: boolean; //checks if boss's turn
}

export const Character: React.FC<CharacterProps> = ({
  characterName,
  getDamageInfo,
  getCharacterName,
  damagedFlag,
  recievedDamage,
  bossTurn,
}) => {
  //set character stats according to characterName
  const [skillDamage, setSkillDamage] = useState(
    characterStatsCalculator(characterName).skillDamage
  );
  const [healthPoints, setHealthPoints] = useState(
    characterStatsCalculator(characterName).healthPoints
  );
  const [skillCount, setSkillCount] = useState(
    characterStatsCalculator(characterName).skillCount
  );
  const [skillName, setSkillName] = useState(
    characterStatsCalculator(characterName).skillName
  );
  const [skillTarget, setSkillTarget] = useState("");
  const characterStatus = useContext(CharacterStatusContext);
  const characterList = useContext(CharacterListContext);
  const stageStatus = useContext(StageStatusContext);
  const [skillBarDisabled, setSkillBarDisabled] = useState(false);

  useEffect(() => {
    //get charactername if it changes
    getCharacterName(characterName);
  }, [characterName, getCharacterName]);

  useEffect(() => {
    //when getDamageInfo changes (skillBar is pressed)
    setSkillTarget(
      targetCalculator(
        characterName,
        characterStatus,
        characterList,
        stageStatus[1]
      ).enemyName
    );
  }, [
    getDamageInfo,
    characterList,
    characterName,
    characterStatus,
    stageStatus[1],
  ]);

  useEffect(() => {
    if (stageStatus[0] !== "ongoing") {
      setSkillBarDisabled(true);
    } else if (stageStatus[0] === "ongoing") {
      setSkillBarDisabled(false);
    }
  }, [stageStatus[0]]);

  useEffect(() => {
    //used against skillBar spams leading to bugs
    if (
      //if bossturn and character is not dead and not dead after the attack
      bossTurn &&
      characterStatus[0] !== "dead" &&
      healthPointCalculator(recievedDamage, healthPoints) > 0 &&
      stageStatus[0] === "ongoing"
    ) {
      //disable skill bar for some time so its not spammable to create bugs
      setSkillBarDisabled(true);
      setTimeout(() => {
        setSkillBarDisabled(false);
      }, 200);
    }
  }, [bossTurn, characterStatus, healthPoints, recievedDamage, stageStatus[0]]);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (
      healthPointCalculator(recievedDamage, healthPoints) > 0 &&
      damagedFlag === true
    ) {
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));

      characterStatus[0] = "alive";
    } else if (
      healthPointCalculator(recievedDamage, healthPoints) <= 0 &&
      characterStatus[0] !== "dead" &&
      damagedFlag === true
    ) {
      //healthPoints <=0, character is dead
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));
      characterStatus[0] = "dead";
      setSkillBarDisabled(true);
      stageStatus[0] = "enemieswin";
    }
  }, [damagedFlag, characterStatus, healthPoints, recievedDamage, stageStatus[0]]);

  return (
    <>
      <HealthBar healthPoints={healthPoints} />
      <SkillBar
        disabled={skillBarDisabled}
        skillCount={skillCount}
        skillName={skillName}
        getDamageInfo={getDamageInfo}
        skillDamage={skillDamage}
        skillTarget={skillTarget}
      />
    </>
  );
};
