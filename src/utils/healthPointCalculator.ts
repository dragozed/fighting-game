export const healthPointCalculator = (damage: number, health: number) => {
  health = health - damage;
  return health;
};
