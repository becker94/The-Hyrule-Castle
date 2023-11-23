import { Characters } from "./Characters";
import { dataPlayers, dataEnnemies, dataBosses } from "./dataCharacteres";
import { combatDisplay } from "./displayGame";

const readlineSync = require("readline-sync");

const hero1: Characters = dataPlayers("../json/players.json");
let ennemie1: Characters = dataEnnemies("../json/enemies.json");

let stage = 1;
let fightnumber = 1;
const hpMaxHero = hero1.hp;
let hpMaxEnemie = ennemie1.hp;

export default function attack(hero: Characters, ennemy: Characters) {
  if (ennemy.hp > hero.str) {
    ennemy.hp = ennemy.hp - hero.str;
  } else {
    ennemy.hp = 0; // pas de hp négatif pour ennemy
  }
}

function heal(hero) {
  let regen = 0;
  if (hero.hp < hpMaxHero) {
    regen = hero.hp + hpMaxHero / 2;
    hero.hp += Math.floor(regen);
    if (hero.hp > hpMaxHero) {
      hero.hp = hpMaxHero;
    }
  } else {
    console.log("You can't heal ! your pv is already in max");
  }
}

function combat(hero: Characters, ennemy: Characters) {
  console.log("STAGE : ", stage);
  const choix = ["Attack", "Heal"];

  while (hero.hp > 0 && ennemy.hp > 0) {
    combatDisplay(fightnumber, hpMaxHero, hpMaxEnemie, hero1, ennemie1);

    const index = readlineSync.keyInSelect(choix, "Attack Or Heal ?");

    if (index + 1 === 1) {
      attack(hero, ennemy);
    } else if (index + 1 === 2) {
      heal(hero);
    } else {
      process.exit();
    }
    if (ennemy.hp > 0) {
      hero.hp = hero.hp - ennemy.str;

      if (hero.hp < 0) {
        hero.hp = 0; // hero pas de pv negatif
      }
    }
    fightnumber++;
  }

  if (hero.hp === 0) {
    console.log(ennemy.name + " kill you !");
  } else {
    console.log("You kill the " + ennemy.name);
  }
  combatDisplay(fightnumber, hpMaxHero, hpMaxEnemie, hero1, ennemie1);
}

function floor() {
  while (stage <= 10) {
    combat(hero1, ennemie1);
    fightnumber = 1;
    if (hero1.hp <= 0) {
      console.log("GAME OVER !");
      break;
    } else {
      stage = stage + 1;

      if (stage < 10) {
        ennemie1 = dataEnnemies("../json/enemies.json");
        hpMaxEnemie = ennemie1.hp;
      } else {
        ennemie1 = dataBosses("../json/bosses.json");

        hpMaxEnemie = ennemie1.hp;
      }
    }
  }
  if (stage > 10) {
    console.log("Congrats ! You kill the boss !");
  }
}

floor();
