import checkIfValid from "../helpers/checkIfValid.js";
import Game from "../database/gameSchema.js";
import updateGame from "../helpers/updateGame.js";
import { ObjectId } from "mongodb";

export const addElementIntoBoard = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    let board = await Game.findOne({ _id: gameId });
    const noteMode = board["noteMode"];
    let stack = board["stack"];
    board = board["problemBoard"];
    const row = parseInt(req.body.row);
    const col = parseInt(req.body.col);
    const element = parseInt(req.body.element);

    if (stack.length === 0) {
      stack.push({ grid: board, booleanValue: checkIfValid(board) });
    }

    board[row][col]["value"] = element;
    stack.push({ grid: board, booleanValue: checkIfValid(board) });
    updateGame(board, gameId, stack, noteMode);

    for (let i = 0; i < board.length; i++) {
      //check in row
      if (board[i][col].value === element) {
        return res.json({
          valid: false,
          board,
          stack,
        });
      }
      //check in col
      if (board[col][i].value === element) {
        return res.json({
          valid: false,
          board,
          stack,
        });
      }
      //check in the block
      if (board[Math.floor(3 * (row / 3) + i / 3)][Math.floor(3 * (col / 3) + (i % 3))].value === element) {
        return res.json({
          valid: false,
          board,
          stack,
        });
      }
    }
    console.log("after");

    if (checkIfValid(board) === false) {
      return res.json({
        valid: false,
        board,
        stack,
      });
    }

    return res.json({
      valid: true,
      board,
      stack,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Interal Server error",
    });
  }
};
