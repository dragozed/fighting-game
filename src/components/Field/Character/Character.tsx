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
  const [skillDamage, setSkillDamage] = useState(0);
  const [healthPoints, setHealthPoints] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [skillName, setSkillName] = useState("");
  const [skillTarget, setSkillTarget] = useState("");

  useEffect(() => {
    //trigger on first render only(or charactername changes)
    //set character stats according to characterName
    setHealthPoints(characterStatsCalculator(characterName).healthPoints);
    setSkillCount(characterStatsCalculator(characterName).skillCount);
    setSkillName(characterStatsCalculator(characterName).skillName);
    setSkillDamage(characterStatsCalculator(characterName).skillDamage / 2);
    getCharacterName(characterName);
  }, [characterName]);

  useEffect(() => {
    setSkillTarget(
      characterName === "character1" ? "character2" : "character1"
    );
  }, []);

  useEffect(() => {
    //if damagedFlag is updated
    if (healthPoints > 0) {
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
