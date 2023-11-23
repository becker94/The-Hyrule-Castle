import { startGame } from "./menu_choix";
import { Characters } from "../base_game/Characters";
import {
  dataPlayers,
  dataEnnemies,
  dataBosses,
} from "../base_game/dataCharacteres";
import { combatDisplay, printCenteredText } from "../base_game/displayGame";
import { mod_better_combat_options } from "./better_combat_options";
import { experience } from "./experience";

const hero1: Characters = dataPlayers("../json/players.json");
let ennemie1: Characters = dataEnnemies("../json/enemies.json");
let affichage: string = "";

let stage: number = 1;
let fightnumber = 1;
const hpMaxHero = hero1.hp;
let hpMaxEnemie = ennemie1.hp;
let totalXP = 0;
let lvl = 1;
let maxXp = 250;

const header =
  "===================================================================================================================================================================";
const welcomeMessage =
  "Welcome to the magical world of Hyrule!\nYou are about to embark on an epic adventure. You have reached the grand tower of Hyrule, also known as the 'Tower of Hyrule.'\nThe rules are simple: you must navigate through each floor to progress and face the Boss.\nBe prepared to confront formidable enemies and use your skills to survive.";
const footer =
  "===================================================================================================================================================================";

printCenteredText(header);
welcomeMessage.split("\n").forEach((line) => {
  printCenteredText(line);
});
printCenteredText(footer);
printCenteredText("GO , Hope of Hyrule !\n");
printCenteredText("---------- RPG TOWER OF HYRULE ----------");
printCenteredText("NEW GAME");
startGame();
export function attack(hero: Characters, ennemy: Characters) {
  if (ennemy.hp > hero.str) {
    ennemy.hp = ennemy.hp - hero.str;
  } else {
    ennemy.hp = 0; // pas de hp négatif pour ennemy
  }
}

export function heal(hero) {
  let regen = 0;
  if (hero.hp < hpMaxHero) {
    regen = hero.hp + hpMaxHero / 2;
    hero.hp += Math.floor(regen);
    if (hero.hp > hpMaxHero) {
      hero.hp = hpMaxHero;
    }
  } else {
    console.log("\nYou can't heal ! your pv is already in max 🚫💚");
  }
}
export function protect(hero: Characters, ennemy: Characters) {
  hero.hp = hero.hp - Math.floor(ennemy.str / 2);
}

export function combat(hero: Characters, ennemy: Characters) {
  printCenteredText("[--------- \x1b[35mStage " + stage + "\x1b[0m ---------]");
  while (hero.hp > 0 && ennemy.hp > 0) {
    combatDisplay(fightnumber, hpMaxHero, hpMaxEnemie, hero1, ennemie1);
    let index = mod_better_combat_options(hero1, ennemie1);
    if (index + 1 === 1) {
      affichage =
        "\n\x1b[31mYou attacked and dealt  \x1b[33m" +
        hero.str +
        "\x1b[0m damages! ⚔️\n";
    } else if (index + 1 === 2) {
      affichage = "\x1b[32mYou choose Heal ! 💚\x1b[0m\n";
    } else if (index + 1 === 3) {
      (affichage = " \x1b[34mYou choose protect ! 🛡️\x1b[0m\n"),
        console.log(
          "\x1b[31m" + ennemy.name,
          "attacked and dealt \x1b[33m" +
            Math.floor(ennemy.str / 2) +
            "\x1b[0m damages! ⚔️\n"
        );
    }
    console.log(affichage);
    if (ennemy.hp > 0 && index + 1 != 3) {
      if (ennemy.hp > 0) {
        console.log(
          "\x1b[31m" + ennemy.name,
          "attacked and dealt \x1b[33m" + ennemy.str + "\x1b[0m damages! ⚔️\n"
        );
        hero.hp = hero.hp - ennemy.str;

        if (hero.hp < 0) {
          hero.hp = 0; // hero pas de pv negatif
        }
      }
      fightnumber++;
    }
  }
}

export function floor() {
  while (stage <= 10) {
    affichage = "A savage " + ennemie1.name + " just appeared !\n";
    console.log(affichage);
    combat(hero1, ennemie1);
    fightnumber = 1;
    if (hero1.hp <= 0) {
      console.log("\x1b[31mGame Over ! 😞");
      break;
    } else {
      stage = stage + 1;
      let xpGained = Math.floor(Math.random() * 36 + 15); // Génère une nouvelle valeur pour xpGained
      // experience(totalXP, maxXp, lvl, xpGained);

      if (stage < 10) {
        ennemie1 = dataEnnemies("../json/enemies.json");
        hpMaxEnemie = ennemie1.hp;
      } else {
        ennemie1 = dataBosses("../json/bosses.json");
        hpMaxEnemie = ennemie1.hp;
      }
    }
  }
  if (stage > 9) {
    if (hero1.hp <= 0 && stage === 10) {
      // console.log("\x1b[31mGame Over Vous Avez Perdu Retentez Vos Chances 😞");
    } else {
      console.log("\x1b[32mCongrats ! You kill the boss ! 🎉😃");
    }
  }
}
