import React, { useState, useEffect } from "react";

import { Character } from "./Character/Character";

import "./Field.scss";

interface FieldProps {}

export const Field: React.FC<FieldProps> = () => {
  const [characterNames, setCharacterNames] = useState([""]);
  const [damagedFlag1, setDamagedFlag1] = useState(false);
  const [damagedFlag2, setDamagedFlag2] = useState(false);
  const [damagedFlag3, setDamagedFlag3] = useState(false);

  const getDamageInfo = (skilldamage: number, targetname: string): void => {
    checkDamagedCharacter(targetname, characterNames);
  };

  const getCharacterName = (charactername: string): void => {
    characterNames.push(charactername);
  };

  function checkDamagedCharacter(
    targetname: string,
    characternames: Array<string>
  ) {
    if (characternames[1] === targetname) {
      setDamagedFlag1(true);
    } else if (characternames[2] === targetname) {
      setDamagedFlag2(true);
    } else if (characternames[3] === targetname) {
      setDamagedFlag3(true);
    } else {
      setDamagedFlag1(false);
      setDamagedFlag2(false);
      setDamagedFlag3(false);
    }
  }

  useEffect(() => {
    //setdamagedflags back to false
    setDamagedFlag1(false);
    setDamagedFlag2(false);
    setDamagedFlag3(false);
  }, [damagedFlag1, damagedFlag2, damagedFlag3]);

  return (
    <>
      <div className="allies">
        <div className="character1">
          <Character
            characterName={"character1"}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag1}
          />
        </div>
        <div className="character2">
          <Character
            characterName={"character2"}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag2}
          />
        </div>
      </div>
      <div className="enemies">
        <div className="boss">
          <Character
            characterName={"boss1"}
            getDamageInfo={getDamageInfo}
            getCharacterName={getCharacterName}
            damagedFlag={damagedFlag3}
          />
        </div>
      </div>
    </>
  );
};
