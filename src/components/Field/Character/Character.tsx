import React, { useState, useEffect } from "react";

import { HealthBar } from "./HealthBar/HealthBar";
import { SkillBar } from "./SkillBar/SkillBar";

import "./Character.scss";
import { healthPointCalculator } from "../../../utils/healthPointCalculator";
import { characterStatsCalculator } from "../../../utils/characterStatsCalculator";

interface CharacterProps {
  characterName: string;
  getDamageInfo: (skilldamage: number, targetname: string) => void;
  getCharacterName: (charactername: string) => void;
  damagedFlag: boolean;
}

export const Character: React.FC<CharacterProps> = ({
  characterName,
  getDamageInfo,
  getCharacterName,
  damagedFlag,
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

  useEffect(() => {
    //get charactername if it changes
    getCharacterName(characterName);
  }, [characterName]);

  useEffect(() => {
    setSkillTarget(
      characterName === "character1" ? "character2" : "character1"
    );
  }, []);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (healthPoints > 0 && damagedFlag == true) {
      setHealthPoints(healthPointCalculator(skillDamage, healthPoints));
    }
  }, [damagedFlag]);

  return (
    <>
      <HealthBar healthPoints={healthPoints} />
      <SkillBar
        skillCount={skillCount}
        skillName={skillName}
        getDamageInfo={getDamageInfo}
        skillDamage={skillDamage}
        skillTarget={skillTarget}
      />
    </>
  );
};
