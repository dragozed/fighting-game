export const bossStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let skillCount = 0;
  let skillName = "none";
  let skillDamage = 0;
  let bossVisualName = "bossVisualName";
  let bossImageAddress = "";

  if (name === "boss1") {
    healthPoints = 70;
    skillCount = 1;
    skillName = "Attack(10)";
    skillDamage = 10;
    bossVisualName = "Sloth";
    bossImageAddress =
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Bicho-pregui%C3%A7a_3.jpg";
  } else if (name === "boss2") {
    healthPoints = 60;
    skillCount = 1;
    skillName = "Attack(15)";
    skillDamage = 15;
    bossVisualName = "Macaw";
    bossImageAddress =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Blue_and_yellow_Macaw.jpg/1920px-Blue_and_yellow_Macaw.jpg";
  }
  return {
    healthPoints,
    skillCount,
    skillName,
    skillDamage,
    bossVisualName,
    bossImageAddress,
  };
};
