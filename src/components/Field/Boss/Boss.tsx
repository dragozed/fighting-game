import React, { useState, useEffect, useContext } from "react";

import { HealthBar } from "./HealthBar/HealthBar";

import { CharacterStatusContext } from "../../../contexts/CharacterStatusContext";
import { CharacterListContext } from "../../../contexts/CharacterListContext";

import { healthPointCalculator } from "../../../utils/healthPointCalculator";
import { characterStatsCalculator } from "../../../utils/characterStatsCalculator";
import { targetCalculator } from "../../../utils/targetCalculator";
import "./Boss.scss";

interface BossProps {
  characterName: string;
  getDamageInfo: (skilldamage: number, targetname: string) => void; //goes to field
  getCharacterName: (charactername: string) => void; //goes to field
  damagedFlag: boolean; //checks if damaged
  recievedDamage: number;
  bossTurn: boolean; //checks if boss's turn
}

export const Boss: React.FC<BossProps> = ({
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

  useEffect(() => {
    //get charactername if it changes
    getCharacterName(characterName);
  }, [characterName]);

  useEffect(() => {
    //when its bossTurn
    if (bossTurn) {
      getDamageInfo(skillDamage, skillTarget);
    }
  }, [bossTurn]);

  useEffect(() => {
    //when getDamageInfo changes
    setSkillTarget(
      targetCalculator(characterName, characterStatus, characterList).enemyName
    );
  }, [getDamageInfo]);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (
      healthPointCalculator(recievedDamage, healthPoints) > 0 &&
      damagedFlag == true
    ) {
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));

      characterStatus[characterStatusIndexSelect()] = "alive";
    } else if (
      healthPointCalculator(recievedDamage, healthPoints) <= 0 &&
      characterStatus[characterStatusIndexSelect()] != "dead" &&
      damagedFlag == true
    ) {
      //healthPoints <=0, character is dead
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));
      characterStatus[characterStatusIndexSelect()] = "dead";
    }
  }, [damagedFlag]);

  function characterStatusIndexSelect() {
    return characterName == "character1"
      ? 0
      : characterName == "character2"
      ? 1
      : 2;
  }

  return (
    <>
      <HealthBar healthPoints={healthPoints} />
    </>
  );
};
