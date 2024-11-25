import { ObjectId } from "mongodb";
import Game from "../database/gameSchema.js";
import doubleStack from "./doubleStack.js";
// TODO: - undo undountilcorrect and stack remove elements check properly

const checkIfValidInDB = (board, row, col, num) => {
  //check it from the db and see the element is valid or not
  const solutionBoard = board["solutionBoard"];
  if (solutionBoard[row][col] === num) {
    return true;
  }
  return false;
};
const getRandomHint = (board) => {
  try {
    // before getting the hint check if the cell(x,y) already has the value
    // if already has the value then i have remove all the entries that has been adding the value of cell(x,y) from the stack
    //update the stack using two stacks
    // REF: prof lecture notes

    // console.log(board["problemBoard"])
    const gridSize = board["problemBoard"].length;
    const badCells = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (board["problemBoard"][row][col].value !== -1) {
          const num = board["problemBoard"][row][col].value;
          if (!checkIfValidInDB(board, row, col, num)) {
            badCells.push({ row, col });
          }
        }
      }
    }
    if (badCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * badCells.length);
      const { row, col } = badCells[randomIndex];
      return { suggestedMove: { row, col, num: board["solutionBoard"][row][col] } };
    }

    // incase we dont have the board is empty
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (board["problemBoard"][row][col].value === -1) {
          return { suggestedMove: { row, col, num: board["solutionBoard"][row][col] } };
        }
      }
    }
    console.log("this is no hint");
    return { message: "No hint available", suggestedMove: null };
  } catch (err) {
    console.log(err);
    return { message: "Internal Server Error", error: err };
  }
};

const callRandomHint = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  let board = await Game.findOne({ _id: gameId });
  const { suggestedMove } = getRandomHint(board);
  console.log(suggestedMove);
  let problemBoard = board["problemBoard"];
  console.log("problem", problemBoard);
  let gameStack = board["stack"];
  problemBoard = await doubleStack(suggestedMove, board, gameId, gameStack);

  // const row = suggestedMove.row;
  // const col = suggestedMove.col;
  // const element = suggestedMove[ "num" ];
  // const noteMode = board.noteMode;
  // if (!checkIfCellHasValue(board, row, col)) {
  //   //save it into the db and return json nothing much

  //   problemBoard[ row ][ col ].value = element;

  //   gameStack.push({ grid: problemBoard, booleanValue: checkIfValid(problemBoard) });
  //   //updatestack

  //   await updateGame(problemBoard, gameId, gameStack, noteMode);
  //   return res.json({suggestedMove,updatedBoard:problemBoard})
  // }

  // // stack-> [a,b,c]
  // // pop()= c ->[a,b]
  // //push(d)->[a,b,d]
  // let newStack = [];
  // while (gameStack.length > 0) {
  //   newStack.push(gameStack.pop());
  // }
  // gameStack = [];
  // while (newStack.length > 0) {
  //   let top = newStack.pop();
  //   let grid = top[ "grid" ];
  //   let booleanValue=top["booleanValue"]
  //   let cell = grid[ row ][ col ].value;
  //   if (cell !== -1) {
  //     continue;
  //   }
  //   else if(cell===-1){
  //     gameStack.push({grid,booleanValue});
  //   }
  // }
  // //

  // problemBoard[ row ][ col ].value = element;
  // gameStack.push({
  //   grid:problemBoard,
  //   booleanValue:checkIfValid(problemBoard)
  // });
  // updateGame(problemBoard, gameId, gameStack, noteMode);
  return res.json({
    suggestedMove,
    updatedBoard: problemBoard,
  });
};

export default callRandomHint;
