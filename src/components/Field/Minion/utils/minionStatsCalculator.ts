export const minionStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let armor = 0;
  let skillCount = 0;
  let skillName = "skillName";
  let skillDamage = 0;
  let characterVisualName = "characterVisualName";

  if (name === "Lizard Minion") {
    healthPoints = 10;
    armor = 0;
    skillCount = 1;
    skillName = "Attack2(25)";
    skillDamage = 25;
    characterVisualName = "Lizard Minion";
  }
  return {
    healthPoints,
    armor,
    skillCount,
    skillName,
    skillDamage,
    characterVisualName,
  };
};
