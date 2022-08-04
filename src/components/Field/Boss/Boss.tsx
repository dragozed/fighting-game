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
  stageNo: number;
  getDamageInfo: (skilldamage: number, targetname: string) => void; //goes to field
  getCharacterName: (charactername: string) => void; //goes to field
  damagedFlag: boolean; //checks if damaged
  recievedDamage: number;
  bossTurn: boolean; //checks if boss's turn
}

export const Boss: React.FC<BossProps> = ({
  stageNo,
  getDamageInfo,
  getCharacterName,
  damagedFlag,
  recievedDamage,
  bossTurn,
}) => {
  const [bossName, setBossName] = useState(bossNameCalculator(stageNo));
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
  }, [bossName, getCharacterName]);

  useEffect(() => {
    //when stage changes set new boss
    setBossName(bossNameCalculator(stageNo));
    setSkillDamage(bossStatsCalculator(bossName).skillDamage);
    setHealthPoints(bossStatsCalculator(bossName).healthPoints);
    setSkillCount(bossStatsCalculator(bossName).skillCount);
    setSkillName(bossStatsCalculator(bossName).skillName);
  }, [stageNo, bossName]);

  useEffect(() => {
    //get charactername if it changes
    getCharacterName(bossName);
  }, [bossName]);

  useEffect(() => {
    //when its bossTurn
    if (bossTurn && stageStatus[0] === "ongoing") {
      getDamageInfo(skillDamage, skillTarget);
    }
  }, [bossTurn, getDamageInfo, skillDamage, skillTarget, stageStatus[0]]);

  useEffect(() => {
    //when getDamageInfo changes
    setSkillTarget(
      targetCalculator(bossName, characterStatus, characterList, stageStatus[1])
        .enemyName
    );
  }, [getDamageInfo, bossName, characterStatus, characterList, stageStatus[1]]);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (
      healthPointCalculator(recievedDamage, healthPoints) > 0 &&
      damagedFlag === true
    ) {
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));

      characterStatus[2] = "alive";
    } else if (
      healthPointCalculator(recievedDamage, healthPoints) <= 0 &&
      characterStatus[2] !== "dead" &&
      damagedFlag === true
    ) {
      //healthPoints <=0, character is dead
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));
      characterStatus[2] = "dead";
      stageStatus[0] = "allieswin";
    }
  }, [
    damagedFlag,
    characterStatus,
    healthPoints,
    recievedDamage,
    stageStatus[0],
  ]);

  return (
    <>
      <HealthBar healthPoints={healthPoints} />
    </>
  );
};
