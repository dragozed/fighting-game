export const characterStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let skillCount = 0;
  let skillName = "none";
  let skillDamage = 0;

  if (name === "character1") {
    healthPoints = 50;
    skillCount = 1;
    skillName = "Attack1(10)";
    skillDamage = 10;
  }
  return { healthPoints, skillCount, skillName, skillDamage };
};
