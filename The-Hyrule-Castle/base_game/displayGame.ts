import { Characters } from "./Characters";

export function printCenteredText(text) {
  const width = process.stdout.columns;
  const padding = Math.max(0, (width - text.length) / 2); //padding au positif
  console.log(" ".repeat(padding) + text);
}

export function combatDisplay(
  fight: number,
  maxHpHero: number,
  maxHpEnnemie: number,
  hero: Characters,
  enemies: Characters
) {
  const red: string = "\x1b[31m";
  const blue: string = "\x1b[34m";
  const green: string = "\x1b[32m";
  const resetColor: string = "\x1b[0m";

  const enemyHpBar =
    red + "I".repeat(enemies.hp > 0 ? enemies.hp : 0) + resetColor;
  const heroHpBar = green + "I".repeat(hero.hp > 0 ? hero.hp : 0) + resetColor;

  console.log(
    "========== \x1b[33mRound " + fight + resetColor + " ==========\n"
  );
  console.log("IA:", red + enemies.name + resetColor);
  console.log("HP: " + enemyHpBar, enemies.hp, "/", maxHpEnnemie, "\n");

  console.log("YOU:", blue + hero.name + resetColor);
  console.log("HP: " + heroHpBar, hero.hp, "/", maxHpHero, "\n");

  return fight;
}
