export const bossStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let skillCount = 0;
  let skillName = "none";
  let skillDamage = 0;

  if (name === "boss1") {
    healthPoints = 70;
    skillCount = 1;
    skillName = "Attack(10)";
    skillDamage = 10;
  } else if (name === "boss2") {
    healthPoints = 120;
    skillCount = 1;
    skillName = "Attack(5)";
    skillDamage = 5;
  }
  return { healthPoints, skillCount, skillName, skillDamage };
};
