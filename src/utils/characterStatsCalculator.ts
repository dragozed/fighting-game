export const characterStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let skillCount = 0;
  let skillName = "none";
  let skillDamage = 0;
  if (name === "character1") {
    healthPoints = 1200;
    skillCount = 1;
    skillName = "Attack1";
    skillDamage = 15;
  } else {
    healthPoints = 1000;
    skillCount = 1;
    skillName = "Attack2";
    skillDamage = 15;
  }
  return { healthPoints, skillCount, skillName, skillDamage };
};
