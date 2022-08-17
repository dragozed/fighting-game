import React, { useState, useEffect, useContext } from "react";

import { HealthBar } from "./HealthBar/HealthBar";
import { SkillBar } from "./SkillBar/SkillBar";

import { CharacterStatusContext } from "../../../contexts/CharacterStatusContext";
import { CharacterListContext } from "../../../contexts/CharacterListContext";
import { StageStatusContext } from "../../../contexts/StageStatusContext";
import { VillageStatusContext } from "../../../contexts/VillageStatusContext";

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
  const characterStatus = useContext(CharacterStatusContext);
  const characterList = useContext(CharacterListContext);
  const stageStatus = useContext(StageStatusContext);
  const { villageStatus, setVillageStatus } = useContext(VillageStatusContext);
  //set character stats according to characterName
  const [skillDamage, setSkillDamage] = useState(
    characterStatsCalculator(characterName).skillDamage +
      villageStatus.trainingGroundsLevel * 5
  );
  const [healthPoints, setHealthPoints] = useState(
    characterStatsCalculator(characterName).healthPoints
  );
  const [armor, setArmor] = useState(
    characterStatsCalculator(characterName).armor
  );
  const [skillCount, setSkillCount] = useState(
    characterStatsCalculator(characterName).skillCount
  );
  const [skillName, setSkillName] = useState(
    characterStatsCalculator(characterName).skillName
  );
  const [characterVisualName, setCharacterVisualName] = useState(
    characterStatsCalculator(characterName).characterVisualName
  );
  const [characterImage, setCharacterImage] = useState(
    characterStatsCalculator(characterName).characterImage
  );
  const [skillTarget, setSkillTarget] = useState("");
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
        stageStatus.stagenumber
      ).enemyName
    );
  }, [
    getDamageInfo,
    characterList,
    characterName,
    characterStatus,
    stageStatus.stagenumber,
  ]);

  useEffect(() => {
    if (stageStatus.stagestatus !== "ongoing") {
      setSkillBarDisabled(true);
    } else if (stageStatus.stagestatus === "ongoing") {
      setSkillBarDisabled(false);
    }
  }, [stageStatus.stagestatus]);

  useEffect(() => {
    //used against skillBar spams leading to bugs
    if (
      //if bossturn and character is not dead and not dead after the attack
      bossTurn &&
      characterStatus.character1 !== "dead" &&
      healthPointCalculator(recievedDamage, healthPoints, armor) > 0 &&
      stageStatus.stagestatus === "ongoing"
    ) {
      //disable skill bar for some time so its not spammable to create bugs
      setSkillBarDisabled(true);
      setTimeout(() => {
        setSkillBarDisabled(false);
      }, 200);
    }
  }, [
    bossTurn,
    characterStatus,
    healthPoints,
    recievedDamage,
    stageStatus.stagestatus,
  ]);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (
      healthPointCalculator(recievedDamage, healthPoints, armor) > 0 &&
      damagedFlag === true
    ) {
      setHealthPoints(
        healthPointCalculator(recievedDamage, healthPoints, armor)
      );

      characterStatus.character1 = "alive";
    } else if (
      healthPointCalculator(recievedDamage, healthPoints, armor) <= 0 &&
      characterStatus.character1 !== "dead" &&
      damagedFlag === true
    ) {
      //healthPoints <=0, character is dead
      setHealthPoints(
        healthPointCalculator(recievedDamage, healthPoints, armor)
      );
      characterStatus.character1 = "dead";
      setSkillBarDisabled(true);
      stageStatus.stagestatus = "enemieswin";
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
      <div className="character1-content">
        <div className="character1-topbar">
          <HealthBar
            healthPoints={healthPoints}
            armor={armor}
            characterVisualName={characterVisualName}
          />
        </div>
        <img className="character1" src={characterImage}></img>
        <div className="character1-bottombar">
          <SkillBar
            disabled={skillBarDisabled}
            skillCount={skillCount}
            skillName={skillName}
            getDamageInfo={getDamageInfo}
            skillDamage={skillDamage}
            skillTarget={skillTarget}
          />
        </div>
      </div>
    </>
  );
};
