export const healthPointCalculator = (
  damage: number,
  health: number,
  armor: number
) => {
  let damageDone = 0;

  if (damage - armor < 0) {
    //we dont want them to get healed
    damageDone = 0;
  } else {
    damageDone = damage - armor;
  }
  health = health - damageDone;
  return health;
};
