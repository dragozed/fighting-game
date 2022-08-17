import React, { useState, useEffect, useContext } from "react";

import { HealthBar } from "./HealthBar/HealthBar";
import { SkillBar } from "./SkillBar/SkillBar";

import { CharacterStatusContext } from "../../../contexts/CharacterStatusContext";
import { CharacterListContext } from "../../../contexts/CharacterListContext";
import { StageStatusContext } from "../../../contexts/StageStatusContext";
import { VillageStatusContext } from "../../../contexts/VillageStatusContext";

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
  characterName, //character name group (minion,character etc)
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
    minionStatsCalculator(characterName).skillDamage +
      villageStatus.trainingGroundsLevel * 5
  );
  const [healthPoints, setHealthPoints] = useState(
    minionStatsCalculator(characterName).healthPoints
  );
  const [armor, setArmor] = useState(
    minionStatsCalculator(characterName).armor
  );
  const [skillCount, setSkillCount] = useState(
    minionStatsCalculator(characterName).skillCount
  );
  const [skillName, setSkillName] = useState(
    minionStatsCalculator(characterName).skillName
  );
  const [characterVisualName, setCharacterVisualName] = useState(
    minionStatsCalculator(characterName).characterVisualName
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
    characterName,
    characterStatus,
    characterList,
    stageStatus.stagenumber,
  ]);

  useEffect(() => {
    if (
      //if bossturn and character is not dead and not dead after the attack
      bossTurn &&
      characterStatus.minion1 !== "dead" &&
      healthPointCalculator(recievedDamage, healthPoints, armor) > 0
    ) {
      //disable skill bar for some time so its not spammable to create bugs
      setSkillBarDisabled(true);
      setTimeout(() => {
        setSkillBarDisabled(false);
      }, 200);
    }
  }, [bossTurn, characterStatus, healthPoints, recievedDamage]);

  useEffect(() => {
    //if damagedFlag is updated and true
    if (
      healthPointCalculator(recievedDamage, healthPoints, armor) > 0 &&
      damagedFlag === true
    ) {
      setHealthPoints(
        healthPointCalculator(recievedDamage, healthPoints, armor)
      );

      characterStatus.minion1 = "alive";
    } else if (
      healthPointCalculator(recievedDamage, healthPoints, armor) <= 0 &&
      characterStatus.minion1 !== "dead" &&
      damagedFlag === true
    ) {
      //healthPoints <=0, character is dead
      setHealthPoints(
        healthPointCalculator(recievedDamage, healthPoints, armor)
      );
      characterStatus.minion1 = "dead";
      setSkillBarDisabled(true);
    }
  }, [damagedFlag, characterStatus, healthPoints, recievedDamage]);

  return (
    <>
      <div className="minion1-content">
        <div className="minion1-topbar">
          <HealthBar
            healthPoints={healthPoints}
            armor={armor}
            characterVisualName={characterVisualName}
          />
        </div>
        <img
          className="minion1"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Komodo_dragon_with_tongue.jpg/1280px-Komodo_dragon_with_tongue.jpg"
        ></img>
        <div className="minion1-bottombar">
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
