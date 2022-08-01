export const enemiesCalculator = (charactername: string) => {
  let enemyName: string = "";
  let characterList = ["character1", "character2"];

  if (charactername === "character1") {
    enemyName = "boss1";
  } else if (charactername === "character2") {
    enemyName = "boss1";
  } else if (charactername === "boss1") {
    enemyName = characterList[Math.floor(Math.random() * characterList.length)];
  }

  /*charactername === "character1"
        ? "boss1" //character1 skill target name
        : charactername === "character2"
        ? "boss1" //character2 skill target name
        : charactername === "boss1" 
        ?  //boss1 skill target selector
        : ""*/
  return { enemyName };
};
