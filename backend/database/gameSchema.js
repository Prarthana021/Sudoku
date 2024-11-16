import mongoose from "mongoose";

const sudokuCellSchema = new mongoose.Schema(
  {
    value: Number,
    notes: [[Number]],
  },
  { _id: false },
);

const gameSchema = new mongoose.Schema({
  problemBoard: [[sudokuCellSchema]], // Array of arrays of numbers
  solutionBoard: [[Number]], // Array of arrays of numbers
  dimension: Number,
  stack: [
    {
      grid: [[sudokuCellSchema]], // Array of arrays of numbers
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
