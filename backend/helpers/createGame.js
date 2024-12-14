// Akash

import Game from "../database/gameSchema.js";
const createGame = async (problemBoard, solutionBoard, dimension, stack) => {
  try {

    let notes = [];
    let updatedProblemBoard = [];

    let noteDimension;
    if (dimension === 9) noteDimension = 3;
    if (dimension === 4) noteDimension = 2;
    for (let i = 0; i < noteDimension; i++) {
      notes.push([]);
    }
    for (let i = 0; i < dimension; i++) {
      let initiateRow = [];
      for (let j = 0; j < dimension; j++) {
        initiateRow.push({
          value: problemBoard[i][j],
          notes: notes,
        });
      }
      updatedProblemBoard.push(initiateRow);
    }
    const newGame = new Game({
      problemBoard: updatedProblemBoard,
      solutionBoard,
      dimension,
      stack,
      noteMode: false,
    });

    const savedGame = await newGame.save();
    return savedGame;
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
};

export default createGame;
