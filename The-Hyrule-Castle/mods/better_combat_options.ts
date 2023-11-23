import { heal, attack, protect } from "./hyrule_castle";
import { Characters } from "../base_game/Characters";
const readlineSync = require("readline-sync");

export function mod_better_combat_options(
  hero: Characters,
  ennemy: Characters
) {
  const choix = ["Attack", "Heal", "Protect"];
  const index = readlineSync.keyInSelect(choix, "Choose your option !");
  if (index + 1 === 1) {
    attack(hero, ennemy);
  } else if (index + 1 === 2) {
    heal(hero);
  } else if (index + 1 === 3) {
    protect(hero, ennemy);
  } else {
    console.log("\x1b[31mYour give-up ... 🏳️");
    process.exit();
  }
  return index;
}
