const Game = require("./game.js");
const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function playAgain() {
  reader.question("Play again?", (res1) => {
    if (res1 === "yes") {
      let game1 = new Game(reader);
      game1.run(playAgain);
    } else {
      console.log("bye");
      reader.close();
    }
  });
}

let game = new Game(reader);
game.run(playAgain);
