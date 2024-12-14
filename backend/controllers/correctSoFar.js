//Prarthana

import checkIfValid from "../helpers/checkIfValid.js";
import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";

export const correctSoFar = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    let game = await Game.findOne({ _id: gameId });

    if (!game || !game.problemBoard) {
      return res.status(404).json({ error: "Game not found or board is missing" });
    }

    const board = game.problemBoard;

    if (!Array.isArray(board) || board.length === 0 || !board.every((row) => Array.isArray(row))) {
      return res.status(400).json({ error: "Invalid board structure" });
    }

    const isValid = checkIfValid(board);
    const incorrectCells = [];

    if (!isValid) {
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col].value !== board[row][col].correctValue) {  // Assuming you have the correct value stored
            incorrectCells.push({ row, col });
          }
        }
      }
    }

    return res.json({
      valid: isValid,
      message: isValid ? "The board is correct so far!" : "The board is not correct so far.",
      incorrectCells: incorrectCells // Return the incorrect cells
    });
  } catch (error) {
    console.error("Error checking if the board is correct so far:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
