export const minionStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let skillCount = 0;
  let skillName = "none";
  let skillDamage = 0;

  if (name === "minion1") {
    healthPoints = 10;
    skillCount = 1;
    skillName = "Attack2(25)";
    skillDamage = 25;
  }
  return { healthPoints, skillCount, skillName, skillDamage };
};
