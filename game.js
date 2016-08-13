class Game {
  constructor (reader) {
    this.reader = reader;
    let a = [];
    a.push([3,2,1]);
    for (let i = 1; i < 3; i++ ) {
      a.push([]);
    }
    this.stack = a;
  }

  promptMove(callback) {
    this.print();
    this.reader.question("Make a move\n", res => {
      let resArr = res.split(',');
      let startTowerIdx = resArr[0];
      let endTowerIdx = resArr[1];
      callback(startTowerIdx, endTowerIdx);
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    let startStack = this.stack[startTowerIdx];
    let endStack = this.stack[endTowerIdx];
    let start = startStack[startStack.length - 1];
    let end = endStack[endStack.length - 1];
    if (start === undefined) return false;
    return end === undefined || start < end;
  }

  move(startTowerIdx, endTowerIdx) {
    if (!this.isValidMove(startTowerIdx,endTowerIdx)) return false;
    let start = this.stack[startTowerIdx];
    let end = this.stack[endTowerIdx];
    end.push(start.pop());
    return true;
  }

  print() {
    console.log(JSON.stringify(this.stack));
  }

  isWon() {
    for (let i = 1; i < this.stack.length; i++) {
      if (this.stack[i].length === 3) {
        return true;
      }
    }
    return false;
  }

  run(completionCallback) {
    this.promptMove((startTowerIdx, endTowerIdx) => {
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("invalid move");
      }
      if (!this.isWon()) {
        this.run(completionCallback);
      } else {
        console.log("you won");
        completionCallback();
      }
    });
  }

}
module.exports = Game;
