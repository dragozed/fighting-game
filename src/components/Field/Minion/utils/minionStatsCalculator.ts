export const minionStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let skillCount = 0;
  let skillName = "skillName";
  let skillDamage = 0;
  let characterVisualName = "characterVisualName";

  if (name === "minion1") {
    healthPoints = 10;
    skillCount = 1;
    skillName = "Attack2(25)";
    skillDamage = 25;
    characterVisualName = "Lizard Minion";
  }
  return {
    healthPoints,
    skillCount,
    skillName,
    skillDamage,
    characterVisualName,
  };
};
