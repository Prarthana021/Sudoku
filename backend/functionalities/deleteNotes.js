import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
import updateGame from "../helpers/updateGame.js";

// @params{
// id on the url
// body {row,col ,element}
//  }

const deleteNotes = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    const game = await Game.findOne({ _id: gameId });
    const noteMode = game["noteMode"];
    const problemBoard = game["problemBoard"];
    const stack = game["stack"];
    const row = parseInt(req.body.row);
    const col = parseInt(req.body.col);
    const element = parseInt(req.body.element);
    let note = problemBoard[row][col].notes;
    const updatedNote = note.map((row) => row.filter((ele) => ele !== element));
    problemBoard[row][col].notes = updatedNote;

    updateGame(problemBoard, gameId, stack, noteMode);
    await game.save();
    return res.json({
      game,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Internal server error",
      err,
    });
  }
};

export default deleteNotes;
