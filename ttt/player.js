class HumanPlayer {
  constructor(rdr, name, mark) {
    this.reader = rdr;
    this.name = name;
    this.mark = mark;
  }

  getMove(makeMove) {
    this.reader.question("Move?",(res) => {
      let move = res.split(',').map(el => parseInt(el));
      makeMove(move);
    });
  }
}


module.exports = HumanPlayer;
