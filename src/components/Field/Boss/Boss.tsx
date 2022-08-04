import React, { useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";

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
  const [bossVisualName, setBossVisualName] = useState(
    bossStatsCalculator(bossName).bossVisualName
  );
  const [bossImageAddress, setBossImageAddress] = useState(
    bossStatsCalculator(bossName).bossImageAddress
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
    setBossVisualName(bossStatsCalculator(bossName).bossVisualName);
    setBossImageAddress(bossStatsCalculator(bossName).bossImageAddress);
  }, [stageNo, bossName]);

  useEffect(() => {
    //when boss changes
    getCharacterName(bossName);
    characterStatus.boss = "alive";
  }, [bossName]);

  useEffect(() => {
    //when its bossTurn
    if (bossTurn && stageStatus.stagestatus === "ongoing") {
      getDamageInfo(skillDamage, skillTarget);
    }
  }, [
    bossTurn,
    getDamageInfo,
    skillDamage,
    skillTarget,
    stageStatus.stagestatus,
  ]);

  useEffect(() => {
    //when getDamageInfo changes
    setSkillTarget(
      targetCalculator(
        bossName,
        characterStatus,
        characterList,
        stageStatus.stagenumber
      ).enemyName
    );
  }, [
    getDamageInfo,
    bossName,
    characterStatus,
    characterList,
    stageStatus.stagenumber,
  ]);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (
      healthPointCalculator(recievedDamage, healthPoints) > 0 &&
      damagedFlag === true
    ) {
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));

      characterStatus.boss = "alive";
    } else if (
      healthPointCalculator(recievedDamage, healthPoints) <= 0 &&
      characterStatus.boss !== "dead" &&
      damagedFlag === true
    ) {
      //healthPoints <=0, character is dead
      setHealthPoints(healthPointCalculator(recievedDamage, healthPoints));
      characterStatus.boss = "dead";
      stageStatus.stagestatus = "allieswin";
    }
  }, [
    damagedFlag,
    characterStatus,
    healthPoints,
    recievedDamage,
    stageStatus.stagestatus,
  ]);

  return (
    <>
      <div className="boss-content">
        <div className="boss-topbar">
          <HealthBar
            healthPoints={healthPoints}
            bossName={bossName}
            bossVisualName={bossVisualName}
          />
        </div>
        <img className="boss" src={bossImageAddress}></img>
      </div>
    </>
  );
};
