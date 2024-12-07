import checkIfValid from "../helpers/checkIfValid.js";
import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
import updateGame from "../helpers/updateGame.js";

//{valid:true/false,board}
export const deleteElementFromBoard = async (req, res) => {
  try {
    console.log(req.body);
    const gameId = new ObjectId(req.params.id);
    let board = await Game.findOne({ _id: gameId });
    const noteMode = board["noteMode"];
    let stack = board["stack"];
    board = board["problemBoard"];

    if (stack.length === 0) {
      stack.push({ grid: board, booleanValue: checkIfValid(board) });
    }

    const row = parseInt(req.body.row);
    const col = parseInt(req.body.col);

    if (isNaN(row) || isNaN(col) || row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
      // Invalid coordinates
      return res.status(400).json({ error: "Invalid coordinates" });
    }

    if (board[row][col].value !== -1) {
      board[row][col].value = -1;
      stack.push({ grid: board, booleanValue: checkIfValid(board) });
      updateGame(board, gameId, stack, noteMode);
    }

    return res.json({
      valid: true,
      board,
    });
  } catch (error) {
    console.error("Error deleting element from the board:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};