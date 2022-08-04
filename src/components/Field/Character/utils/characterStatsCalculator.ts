export const characterStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let skillCount = 0;
  let skillName = "skillName";
  let skillDamage = 0;
  let characterVisualName = "characterVisualName";

  if (name === "character1") {
    healthPoints = 50;
    skillCount = 1;
    skillName = "Attack1(10)";
    skillDamage = 10;
    characterVisualName = "Kong";
  }
  return {
    healthPoints,
    skillCount,
    skillName,
    skillDamage,
    characterVisualName,
  };
};
