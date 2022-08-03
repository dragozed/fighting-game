import React, { useState, useEffect, useContext } from "react";

import { HealthBar } from "./HealthBar/HealthBar";

import { CharacterStatusContext } from "../../../contexts/CharacterStatusContext";
import { CharacterListContext } from "../../../contexts/CharacterListContext";
import { StageStatusContext } from "../../../contexts/StageStatusContext";

import { healthPointCalculator } from "../../../utils/healthPointCalculator";
import { bossStatsCalculator } from "./utils/bossStatsCalculator";
import { targetCalculator } from "../../../utils/targetCalculator";
import { bossNameCalculator } from "./utils/bossNameCalculator";
import "./Boss.scss";

interface BossProps {
  stageName: string;
  getDamageInfo: (skilldamage: number, targetname: string) => void; //goes to field
  getCharacterName: (charactername: string) => void; //goes to field
  damagedFlag: boolean; //checks if damaged
  recievedDamage: number;
  bossTurn: boolean; //checks if boss's turn
}

export const Boss: React.FC<BossProps> = ({
  stageName,
  getDamageInfo,
  getCharacterName,
  damagedFlag,
  recievedDamage,
  bossTurn,
}) => {
  const [bossName, setBossName] = useState(bossNameCalculator(stageName));
  //set character stats according to characterName
  const [skillDamage, setSkillDamage] = useState(
    bossStatsCalculator(bossName).skillDamage
  );
  const [healthPoints, setHealthPoints] = useState(
    bossStatsCalculator(bossName).healthPoints
  );
  const [skillCount, setSkillCount] = useState(
    bossStatsCalculator(bossName).skillCount
  );
  const [skillName, setSkillName] = useState(
    bossStatsCalculator(bossName).skillName
  );
  const [skillTarget, setSkillTarget] = useState("");

  const characterStatus = useContext(CharacterStatusContext);

  const characterList = useContext(CharacterListContext);

  const stageStatus = useContext(StageStatusContext);

  useEffect(() => {
    //get charactername if it changes
    getCharacterName(bossName);
  }, []);

  useEffect(() => {
    //get charactername if it changes
    getCharacterName(bossName);
  }, [bossName]);

  useEffect(() => {
    //when its bossTurn
    if (bossTurn && stageStatus[0] === "ongoing") {
      getDamageInfo(skillDamage, skillTarget);
    }
  }, [bossTurn]);

  useEffect(() => {
    //when getDamageInfo changes
    setSkillTarget(
      targetCalculator(bossName, characterStatus, characterList).enemyName
    );
  }, [getDamageInfo]);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (
      healthPointCalculator(recievedDamage, healthPoints) > 0 &&
      damagedFlag === true
    ) {
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));

      characterStatus[characterStatusIndexSelect()] = "alive";
    } else if (
      healthPointCalculator(recievedDamage, healthPoints) <= 0 &&
      characterStatus[characterStatusIndexSelect()] !== "dead" &&
      damagedFlag === true
    ) {
      //healthPoints <=0, character is dead
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));
      characterStatus[characterStatusIndexSelect()] = "dead";
      stageStatus[0] = "allieswin";
    }
  }, [damagedFlag]);

  function characterStatusIndexSelect() {
    return bossName === "character1" ? 0 : bossName === "minion1" ? 1 : 2;
  }

  return (
    <>
      <HealthBar healthPoints={healthPoints} />
    </>
  );
};
