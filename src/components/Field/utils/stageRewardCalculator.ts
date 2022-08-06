export const stageRewardCalculator = (
  stagestatus: string,
  stagenumber: number
) => {
  let wood = 0;
  let stone = 0;
  let iron = 0;
  if (stagestatus === "allieswin") {
    if (stagenumber === 1) {
      wood = randomInteger(0, 5); //random int between 0-5
      stone = randomInteger(0, 5);
      iron = 0;
    } else if (stagenumber === 2) {
      wood = randomInteger(5, 10); //random int between 0-5
      stone = randomInteger(5, 10);
      iron = randomInteger(5, 10);
    }
  } else {
    wood = 0;
    stone = 0;
    iron = 0;
  }
  return {
    wood,
    stone,
    iron,
  };
};
function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
