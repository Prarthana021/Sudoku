import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
import updateGame from "../helpers/updateGame.js";

// @params{
// id on the url
//  }
const switchNote = async (req, res) => {
  try {
    // note mode on
    //coordinate of the board
    const gameId = new ObjectId(req.params.id);
    const game = await Game.findOne({ _id: gameId });
    const problemBoard = game["problemBoard"];
    const stack = game["stack"];
    let noteMode = game["noteMode"];
    noteMode = !noteMode;
    updateGame(problemBoard, gameId, stack, noteMode);
    return res.json({
      noteMode,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Internal server error",
      err,
    });
  }
};

export default switchNote;
