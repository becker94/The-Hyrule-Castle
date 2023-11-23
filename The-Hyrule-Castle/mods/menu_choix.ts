import * as readline from "readline";

import { floor } from "./hyrule_castle";
import { printCenteredText } from "../base_game/displayGame";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fonction pour afficher le message "New Game" et commencer le jeu
export function startGame() {
  printCenteredText("Press any keys to start the game : ");
  rl.question("", () => {
    floor();
    rl.close();
  });
}
