export const targetCalculator = (
  charactername: string,
  characterstatus: string[],
  characterlist: string[],
  stageStatus: number
) => {
  let enemyName: string = "";

  if (characterstatus[0] === "dead") {
    characterlist[0] = "";
  } else if (characterstatus[1] === "dead") {
    characterlist[1] = "";
  }

  if (charactername === "character1") {
    enemyName = "boss" + stageStatus;
  } else if (charactername === "minion1") {
    enemyName = "boss" + stageStatus;
  } else if (charactername === "boss" + stageStatus) {
    characterlist = characterlist.filter((item) => item.length > 1); //filter character list, dump empty strings
    enemyName = characterlist[Math.floor(Math.random() * characterlist.length)];
  }

  return { enemyName };
};
