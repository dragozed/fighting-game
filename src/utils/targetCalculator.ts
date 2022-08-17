export const targetCalculator = (
  charactername: string,
  characterstatus: { character1: string; minion1: string; boss: string },
  characterlist: string[],
  stageStatus: number
) => {
  let enemyName: string = "";

  if (characterstatus.character1 === "dead") {
    characterlist[0] = "";
  } else if (characterstatus.minion1 === "dead") {
    characterlist[1] = "";
  }

  if (charactername === "boss" + stageStatus) {
    characterlist = characterlist.filter((item) => item.length > 1); //filter character list, dump empty strings
    enemyName = characterlist[Math.floor(Math.random() * characterlist.length)];
    console.log(characterlist);
  } else {
    enemyName = "boss" + stageStatus;
  }

  return { enemyName };
};
