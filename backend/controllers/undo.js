import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";

// returns board after undo
const undo = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    let game = await Game.findOne({ _id: gameId });

    if (!game || !game.stack || game.stack.length <= 1) {
      console.log("No more moves to undo.");
      // Instead of returning an error, return a message indicating no more undos are possible
      return res.json({
        message: "No more moves to undo.",
        board: game ? game.problemBoard : null, // You can choose to return the current board or just a message
      });
    }

    // Undo logic
    let stack = game.stack;
    stack.pop(); // Remove the current state
    const previousBoard = stack.pop(); // Get the previous state
    stack.push(previousBoard); // Re-push the previous state as the current state
    await Game.updateOne({ _id: gameId }, { problemBoard: previousBoard.grid, stack: stack });

    return res.json({ board: previousBoard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default undo;
