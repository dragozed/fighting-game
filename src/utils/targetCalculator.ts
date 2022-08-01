export const targetCalculator = (
  charactername: string,
  characterstatus: string[],
  characterlist: string[]
) => {
  let enemyName: string = "";

  if (characterstatus[0] === "dead") {
    characterlist[0] = "";
  } else if (characterstatus[1] === "dead") {
    characterlist[1] = "";
  }

  if (charactername === "character1") {
    enemyName = "boss1";
  } else if (charactername === "character2") {
    enemyName = "boss1";
  } else if (charactername === "boss1") {
    characterlist = characterlist.filter((item) => item.length > 1); //filter character list, dump empty strings
    enemyName = characterlist[Math.floor(Math.random() * characterlist.length)];
  }

  return { enemyName };
};
