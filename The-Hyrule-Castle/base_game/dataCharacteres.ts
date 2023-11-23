import { Characters } from "./Characters";
const fs = require("fs");

function getRandomRarety() {
  let res;
  let random = Math.floor(Math.random() * 100);
  if (random >= 0 && random <= 50) {
    res = 1;
  } else if (random > 50 && random <= 80) {
    res = 2;
  } else if (random > 80 && random <= 95) {
    res = 3;
  } else if (random > 95 && random <= 99) {
    res = 4;
  } else {
    res = 5;
  }
  return res;
}

export function dataPlayers(path: string) {
  try {
    const rarety = getRandomRarety();
    const content = fs.readFileSync(path, "utf-8");
    const jsonObject: Characters = JSON.parse(content);
    const players: Characters[] = [];
    for (let p in jsonObject) {
      if (rarety === jsonObject[p].rarity) {
        players.push(jsonObject[p]);
      }
    }
    const random = Math.floor(Math.random() * players.length);

    return players[random];
  } catch (error) {
    console.error("Wrong use of the program.");
  }
}

export function dataEnnemies(path: string) {
  try {
    const rarety = getRandomRarety();
    const content = fs.readFileSync(path, "utf-8");
    const jsonObject: Characters = JSON.parse(content);
    const ennemies: Characters[] = [];
    for (let e in jsonObject) {
      if (rarety === jsonObject[e].rarity) {
        ennemies.push(jsonObject[e]);
      }
    }
    const random = Math.floor(Math.random() * ennemies.length);

    return ennemies[random];
  } catch (error) {
    console.error("Wrong use of the program.");
  }
}

export function dataBosses(path: string) {
  try {
    const rarety = getRandomRarety();
    const content = fs.readFileSync(path, "utf-8");
    const jsonObject: Characters = JSON.parse(content);
    const bosses: Characters[] = [];
    for (let b in jsonObject) {
      if (rarety === jsonObject[b].rarity) {
        bosses.push(jsonObject[b]);
      }
    }
    const random = Math.floor(Math.random() * bosses.length);

    return bosses[random];
  } catch (error) {
    console.error("Wrong use of the program.");
  }
}
