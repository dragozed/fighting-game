import React, { useState, useEffect, useContext } from "react";

import { HealthBar } from "./HealthBar/HealthBar";
import { SkillBar } from "./SkillBar/SkillBar";

import { CharacterContext } from "../../../contexts/CharacterContext";
import { healthPointCalculator } from "../../../utils/healthPointCalculator";
import { characterStatsCalculator } from "../../../utils/characterStatsCalculator";
import { targetCalculator } from "../../../utils/targetCalculator";
import "./Character.scss";

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

  const characterStatus = useContext(CharacterContext);

  useEffect(() => {
    //get charactername if it changes
    getCharacterName(characterName);
  }, [characterName]);

  useEffect(() => {
    //when getDamageInfo changes (skillBar is pressed)
    setSkillTarget(targetCalculator(characterName, characterStatus).enemyName);
  }, [getDamageInfo]);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (
      healthPointCalculator(skillDamage, healthPoints) > 0 &&
      damagedFlag == true
    ) {
      setHealthPoints(healthPointCalculator(skillDamage, healthPoints));

      characterStatus[characterStatusIndexSelect()] = "alive";
    } else if (
      healthPointCalculator(skillDamage, healthPoints) <= 0 &&
      characterStatus[characterStatusIndexSelect()] != "dead" &&
      damagedFlag == true
    ) {
      //healthPoints <=0, character is dead
      setHealthPoints(healthPointCalculator(skillDamage, healthPoints));
      characterStatus[characterStatusIndexSelect()] = "dead";
    }
    console.log(characterStatus, characterName);
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
