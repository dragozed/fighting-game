export const characterStatsCalculator = (name: string) => {
  var healthPoints = 0;
  var skillCount = 0;
  var skillName = "none";
  var skillDamage = 0;
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
