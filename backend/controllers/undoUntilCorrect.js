//Prarthana and Gurpreet 

import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
// board which is the latest one
const undoUntilCorrect = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    console.log(gameId)
    let stackDb = await Game.findOne({ _id: gameId });
    stackDb = stackDb["stack"];
    if (stackDb.length === 0) {
      return res.status(400).json({ error: "Stack is empty." });
    }

    let correct;
    let { grid, booleanValue } = stackDb[stackDb.length-1];

    // Undo changes until a correct state is reached
    while (!booleanValue && stackDb.length > 0) {
      correct = stackDb.pop();
      ({ grid, booleanValue } = correct);
    }
    stackDb.push({ grid, booleanValue });
    let updateGame = await Game.updateOne({ _id: gameId }, { problemBoard: grid, stack: stackDb });

    return res.json({
      board: grid, // Use the grid from the last correct state
      game: updateGame,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

export default undoUntilCorrect;
