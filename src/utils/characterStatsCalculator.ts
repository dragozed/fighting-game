export const characterStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let skillCount = 0;
  let skillName = "none";
  let skillDamage = 0;
  if (name === "character1") {
    healthPoints = 120;
    skillCount = 1;
    skillName = "Attack1";
    skillDamage = 15;
  } else if (name === "character2") {
    healthPoints = 100;
    skillCount = 1;
    skillName = "Attack2";
    skillDamage = 15;
  } else if (name === "boss1") {
    healthPoints = 1000;
    skillCount = 1;
    skillName = "Attack3";
    skillDamage = 15;
  }
  return { healthPoints, skillCount, skillName, skillDamage };
};
