export const targetCalculator = (
  charactername: string,
  characterstatus: string[]
) => {
  let enemyName: string = "";
  let characterList = ["character1", "character2"];

  //remove dead characters from characterList
  for (let i = 0; i < characterstatus.length; i++) {
    if (characterstatus[i] == "dead") {
      characterList.splice(i);
    }
  }

  if (charactername === "character1") {
    enemyName = "boss1";
  } else if (charactername === "character2") {
    enemyName = "boss1";
  } else if (charactername === "boss1") {
    enemyName = characterList[Math.floor(Math.random() * characterList.length)];
  }

  return { enemyName };
};
