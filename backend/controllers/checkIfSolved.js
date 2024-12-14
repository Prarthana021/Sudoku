// Gurpreet

import Game from "../database/gameSchema.js";
import checkIfValid from "../helpers/checkIfValid.js";
import { ObjectId } from "mongodb";

export const checkIfSolved = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);

    let board = await Game.findOne({ _id: gameId });
    board = board["problemBoard"];

    if (!Array.isArray(board) || board.length === 0 || !board.every((row) => Array.isArray(row))) {
    
      return res.status(400).json({ error: "Invalid board structure" });
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j].value === -1) {
       
          return res.json({ isSolved: false, isValid: checkIfValid(board) });
        }
      }
    }

    // All cells are filled, check if the solution is valid
    const isValid = checkIfValid(board);
    return res.json({ isSolved: true, valid: isValid });
  } catch (error) {
    console.error("Error checking if the board is solved:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
