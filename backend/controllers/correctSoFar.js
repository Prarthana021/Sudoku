import checkIfValid from "../helpers/checkIfValid.js";
import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
//json {valid:true/false}
export const correctSoFar = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    //const board = JSON.parse(req.body.board.matrix);
    let board = await Game.findOne({ _id: gameId });
    board = board["problemBoard"];

    if (!Array.isArray(board) || board.length === 0 || !board.every((row) => Array.isArray(row))) {
      // Invalid board structure
      return res.status(400).json({ error: "Invalid board structure" });
    }

    const isValid = checkIfValid(board);

    return res.json({ valid: isValid });
  } catch (error) {
    console.error("Error checking if the board is correct so far:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};