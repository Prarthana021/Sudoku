import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
import updateGame from "../helpers/updateGame.js";


const addNotes = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    const game = await Game.findOne({ _id: gameId });
    const noteMode = game["noteMode"];
    if (!noteMode) {
      return res.status(400).json({ message: "Note mode is not enabled." });
    }

    const { row, col, element } = req.body;
    const parsedRow = parseInt(row);
    const parsedCol = parseInt(col);
    const parsedElement = parseInt(element);

    if (isNaN(parsedRow) || isNaN(parsedCol) || isNaN(parsedElement)) {
      return res.status(400).json({ error: "Invalid input. Row, column, and element must be numbers." });
    }

    const problemBoard = game["problemBoard"];
    let dimension = game["dimension"];
    dimension = dimension === 9 ? 3 : dimension === 4 ? 2 : dimension;
    const cell = problemBoard[parsedRow][parsedCol].notes;

    for (let i = 0; i < dimension; i++) {
      let cellRow = cell[i];
      if (cellRow.length < dimension) {
        cellRow.push(parsedElement);
        break;
      }
    }

    problemBoard[parsedRow][parsedCol] = {
      value: problemBoard[parsedRow][parsedCol].value,
      notes: cell,
    };

    updateGame(problemBoard, gameId, game["stack"], noteMode);
    await game.save();
    return res.json({ game });
  } catch (err) {
    console.error("Error in addNotes:", err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};

export default addNotes;
