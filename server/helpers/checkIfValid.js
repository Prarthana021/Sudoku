const checkIfValid = (board) => {
  let rows = new Set();
  let cols = new Set();
  let squares = new Set();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      // console.log(board[i][j] != -1);
      if (board[i][j].value !== -1) {
        let curr = board[i][j].value;
        let rowVal = curr + "row" + i;
        let colVal = curr + "col" + j;
        let square = curr + "square" + Math.floor(i / 3) + "-" + Math.floor(j / 3);
        if (rows.has(rowVal) || cols.has(colVal) || squares.has(square)) {
          return false;
        } else {
          rows.add(rowVal);
          cols.add(colVal);
          squares.add(square);
        }
      }
    }
  }
  return true;
};
export default checkIfValid;
