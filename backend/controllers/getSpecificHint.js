import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
import doubleStack from "./doubleStack.js";
//{suggestedMove}
//{0,0}
//indexes: {row: col:}

const getSpecificHint = (board, row, col) => {
  try {
    if (row === -1 || col === -1) {
      return { message: "Invalid row or col" };
    }
    let solution = board["solutionBoard"];
    const element = solution[row][col];
    return { suggestedMove: { row, col, num: element } };
  } catch (err) {
    return { message: "Internal Server Error", err };
  }
};
const callSpecificHint = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  let board = await Game.findOne({ _id: gameId });

  if (!board) {
    return res.status(404).json({ message: "Game not found" });
  }

  let row = parseInt(req.body.row);
  let col = parseInt(req.body.col);

  // Check for valid row and column
  if (isNaN(row) || isNaN(col) || row < 0 || col < 0 || row >= board.dimension || col >= board.dimension) {
    return res.status(400).json({ message: "Invalid row or column" });
  }

  try {
    const { suggestedMove } = getSpecificHint(board, row, col);
    let problemBoard = board["problemBoard"];
    let gameStack = board["stack"];

    problemBoard = await doubleStack(suggestedMove, board, gameId, gameStack);

    return res.json({
      suggestedMove,
      updatedBoard: problemBoard,
    });
  } catch (err) {
    console.error("Error in callSpecificHint:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

export default callSpecificHint;
