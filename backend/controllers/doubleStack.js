// Aakash

import checkIfCellHasValue from "../helpers/checkIfCellHasValue.js";
import updateGame from "../helpers/updateGame.js";
import checkIfValid from "../helpers/checkIfValid.js";

const doubleStack = async (suggestedMove, board, gameId, gameStack) => {
  try {
    console.log("sugg", suggestedMove);
    const row = suggestedMove.row;
    const col = suggestedMove.col;
    const element = suggestedMove["num"];
    const noteMode = board.noteMode;
    let problemBoard = board["problemBoard"];
    if (!checkIfCellHasValue(board, row, col)) {

      problemBoard[row][col].value = element;

      gameStack.push({ grid: problemBoard, booleanValue: checkIfValid(problemBoard) });
      //updatestack

      await updateGame(problemBoard, gameId, gameStack, noteMode);
      return problemBoard;
    }


    let newStack = [];
    while (gameStack.length > 0) {
      newStack.push(gameStack.pop());
    }
    gameStack = [];
    while (newStack.length > 0) {
      let top = newStack.pop();
      let grid = top["grid"];
      let booleanValue = top["booleanValue"];
      let cell = grid[row][col].value;
      if (cell !== -1) {
        continue;
      } else if (cell === -1) {
        gameStack.push({ grid, booleanValue });
      }
    }
    
    problemBoard[row][col].value = element;
    gameStack.push({
      grid: problemBoard,
      booleanValue: checkIfValid(problemBoard),
    });
    updateGame(problemBoard, gameId, gameStack, noteMode);

    return problemBoard;
  } catch (err) {
    return err;
  }
};

export default doubleStack;
