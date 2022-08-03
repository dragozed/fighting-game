import React, { useState, useEffect, useContext } from "react";

import { HealthBar } from "./HealthBar/HealthBar";
import { SkillBar } from "./SkillBar/SkillBar";

import { CharacterStatusContext } from "../../../contexts/CharacterStatusContext";
import { CharacterListContext } from "../../../contexts/CharacterListContext";

import { healthPointCalculator } from "../../../utils/healthPointCalculator";
import { minionStatsCalculator } from "./utils/minionStatsCalculator";
import { targetCalculator } from "../../../utils/targetCalculator";
import "./Minion.scss";

interface MinionProps {
  characterName: string;
  getDamageInfo: (skilldamage: number, targetname: string) => void; //goes to field
  getCharacterName: (charactername: string) => void; //goes to field
  damagedFlag: boolean; //checks if damaged
  recievedDamage: number;
  bossTurn: boolean; //checks if boss's turn
}

export const Minion: React.FC<MinionProps> = ({
  characterName,
  getDamageInfo,
  getCharacterName,
  damagedFlag,
  recievedDamage,
  bossTurn,
}) => {
  //set character stats according to characterName
  const [skillDamage, setSkillDamage] = useState(
    minionStatsCalculator(characterName).skillDamage
  );
  const [healthPoints, setHealthPoints] = useState(
    minionStatsCalculator(characterName).healthPoints
  );
  const [skillCount, setSkillCount] = useState(
    minionStatsCalculator(characterName).skillCount
  );
  const [skillName, setSkillName] = useState(
    minionStatsCalculator(characterName).skillName
  );
  const [skillTarget, setSkillTarget] = useState("");

  const characterStatus = useContext(CharacterStatusContext);

  const characterList = useContext(CharacterListContext);

  const [skillBarDisabled, setSkillBarDisabled] = useState(false);

  useEffect(() => {
    //get charactername if it changes
    getCharacterName(characterName);
  }, [characterName]);

  useEffect(() => {
    //when getDamageInfo changes (skillBar is pressed)
    setSkillTarget(
      targetCalculator(characterName, characterStatus, characterList).enemyName
    );
  }, [getDamageInfo]);
  setTimeout(() => {}, 500);

  useEffect(() => {
    if (
      //if bossturn and character is not dead and not dead after the attack
      bossTurn &&
      characterStatus[characterStatusIndexSelect()] !== "dead" &&
      healthPointCalculator(recievedDamage, healthPoints) > 0
    ) {
      //disable skill bar for some time so its not spammable to create bugs
      setSkillBarDisabled(true);
      setTimeout(() => {
        setSkillBarDisabled(false);
      }, 200);
    }
  }, [bossTurn]);

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
      setSkillBarDisabled(true);
    }
  }, [damagedFlag]);

  function characterStatusIndexSelect() {
    return characterName === "character1"
      ? 0
      : characterName === "minion1"
      ? 1
      : 2;
  }

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
