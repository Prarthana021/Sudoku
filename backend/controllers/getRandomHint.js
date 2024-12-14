//Prarthana

import { ObjectId } from "mongodb";
import Game from "../database/gameSchema.js";
import doubleStack from "./doubleStack.js";

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
  return res.json({
    suggestedMove,
    updatedBoard: problemBoard,
  });
};

export default callRandomHint;
