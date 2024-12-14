// Prarthana

import mongoose from "mongoose";

const sudokuCellSchema = new mongoose.Schema(
  {
    value: Number,
    notes: [[Number]],
  },
  { _id: false },
);

const gameSchema = new mongoose.Schema({
  problemBoard: [[sudokuCellSchema]], 
  solutionBoard: [[Number]], 
  dimension: Number,
  stack: [
    {
      grid: [[sudokuCellSchema]], 
      booleanValue: Boolean,
    },
  ],
  noteMode: {
    type: Boolean,
    default: false,
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
