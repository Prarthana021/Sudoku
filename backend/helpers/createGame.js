import Game from "../database/gameSchema.js";
const createGame = async (problemBoard, solutionBoard, dimension, stack) => {
  try {
    // the problem board cell is the object that has two things one is the value and notes(size*size of the board)
    //[[1,2,3,4],[2,3,4,1],[3,4,1,2],[4,1,2,3]]=>
    // [
    // [ { 1, [ [], [], [], [] ]}, { 2, [ [], [], [], [] ]}, { 3, [ [], [], [], [] ]}, { 4, [ [], [], [], [] ]} ],
    // [ { 2, [ [], [], [], [] ]}, { 3, [ [], [], [], [] ]}, { 4, [ [], [], [], [] ]}, { 1, [ [], [], [], [] ]} ],
    // [ { 3, [ [], [], [], [] ]}, { 4, [ [], [], [], [] ]}, { 2, [ [], [], [], [] ]}, { 2, [ [], [], [], [] ]} ],
    // [ { 4, [ [], [], [], [] ]}, { 1, [ [], [], [], [] ]}, { 1, [ [], [], [], [] ]}, { 3, [ [], [], [], [] ]} ]
    //]
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

import Game from "../database/gameSchema.js";
const createGame = async (problemBoard, solutionBoard, dimension, stack) => {
  try {
    // the problem board cell is the object that has two things one is the value and notes(size*size of the board)
    //[[1,2,3,4],[2,3,4,1],[3,4,1,2],[4,1,2,3]]=>
    // [
    // [ { 1, [ [], [], [], [] ]}, { 2, [ [], [], [], [] ]}, { 3, [ [], [], [], [] ]}, { 4, [ [], [], [], [] ]} ],
    // [ { 2, [ [], [], [], [] ]}, { 3, [ [], [], [], [] ]}, { 4, [ [], [], [], [] ]}, { 1, [ [], [], [], [] ]} ],
    // [ { 3, [ [], [], [], [] ]}, { 4, [ [], [], [], [] ]}, { 2, [ [], [], [], [] ]}, { 2, [ [], [], [], [] ]} ],
    // [ { 4, [ [], [], [], [] ]}, { 1, [ [], [], [], [] ]}, { 1, [ [], [], [], [] ]}, { 3, [ [], [], [], [] ]} ]
    //]
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