const HumanPlayer = require("./player");
const Board = require("./board.js");
const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
class Game {
  constructor (rdr) {
    this.reader = rdr;
    this.board = new Board;
    this.player1 = new HumanPlayer(rdr, 'Johnny', 'x');
  }

  play(completionCallback) {
    this.board.print();
    this.player1.getMove((move) => {
      if(this.board.placeMark(move, this.player1.mark)) {
        if (this.board.won()) {
          console.log(`${this.board.winner()} has won!`);
          completionCallback();
        } else {
          this.play(completionCallback);
          //switch players
        }
      } else {
        console.log("invalid move");
        this.play(completionCallback);
      }
    });
  }
}

let g = new Game(reader);
g.play();
