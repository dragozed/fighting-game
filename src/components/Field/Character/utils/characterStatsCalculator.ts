export const characterStatsCalculator = (name: string) => {
  let healthPoints = 0;
  let armor = 0;
  let skillCount = 0;
  let skillName = "skillName";
  let skillDamage = 0;
  let characterVisualName = "characterVisualName";
  let characterImage = "https://scitechdaily.com/images/Great-Ape-Gorilla.jpg";

  if (name === "Kong") {
    healthPoints = 50;
    armor = 0;
    skillCount = 1;
    skillName = "Throw Feces";
    skillDamage = 10;
    characterVisualName = "Kong";
    characterImage = "https://scitechdaily.com/images/Great-Ape-Gorilla.jpg";
  }
  if (name === "Badger") {
    healthPoints = 250;
    armor = 5;
    skillCount = 1;
    skillName = "Fart";
    skillDamage = 25;
    characterVisualName = "Badger";
    characterImage =
      "https://www.webtekno.com/images/editor/default/0002/99/8c0f4c726338b93507da8d453b1b059970ace9d5.jpeg";
  }
  return {
    healthPoints,
    armor,
    skillCount,
    skillName,
    skillDamage,
    characterVisualName,
    characterImage,
  };
};
