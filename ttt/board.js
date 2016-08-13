class Board {
  constructor(reader) {
    this.reader = reader;
    let a = [];
    for (let i = 0; i < 3; i++ ) {
      a.push([null,null,null]);
    }
    this.board = a;
  }

  won() {
    return Boolean(this.winner());
  }

  winner() {
    let b = this.board;
    let diags = [[b[0][0], b[1][1], b[2][2]], [b[0][2], b[1][1], b[2][0]]];
    let triples = b.concat(this.transpose(b), diags);
    let sameness = function(el, idx, arr) {
      // console.log("checking " + arr );
      // console.log("element " + el + "first: " + arr[0]);
      return el === arr[0];
    };
    for (var i = 0; i < triples.length; i++) {
      if (triples[i][0] == undefined) {
        continue;
      }
      if (triples[i].every(sameness)) {
        return triples[i][0];
      }
    }
    return null;
  }

  empty(pos) {
    return Boolean(!this.board[pos[0]][pos[1]]);
  }

  placeMark(pos, mark) {
    if (this.empty(pos)) {
      this.board[pos[0]][pos[1]] = mark;
      return true;
    }
    return false;
  }

  transpose(array){
    const columns = [];
    for (let i = 0; i < array[0].length; i++) {
      columns.push([]);
    }

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        columns[j].push(array[i][j]);
      }
    }

    return columns;
  }

  print() {
    this.board.forEach(el => {
      console.log(el);
    });
  }
}

module.exports = Board;

// let bo = new Board;
// bo.placeMark([1,0],'x');
// bo.placeMark([1,1],'x');
// bo.print();
// console.log(bo.won());
// bo.placeMark([1,2],'o');
// bo.print();
// console.log(bo.won());
