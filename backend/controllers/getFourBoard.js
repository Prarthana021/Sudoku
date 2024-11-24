import { generateBoard } from "../helpers/generateBoard.js";
import createGame from "../helpers/createGame.js";

export const getFourBoard = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    // Check if id is not equal to 9
    if (id !== 4) {
      // Assuming you want to skip the rest of the middleware stack
      // return {
      //   message: "Bad request",
      // };
      next();
      // If you want to send a response, use res.status().json() here
    }
    if (id === 4) {
      // Generate a 9x9 Sudoku board and its solution
      const dic = generateBoard(4, 4);

      const board = dic["cell"];
      const solution = dic["solution"];
      const game = await createGame(board, solution, 4, []);

      return res.json({ game });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
import { generateBoard } from "../helpers/generateBoard.js";
import createGame from "../helpers/createGame.js";

export const getFourBoard = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    // Check if id is not equal to 4
    if (id !== 4) {
      // Assuming you want to skip the rest of the middleware stack
      // return {
      //   message: "Bad request",
      // };
      next();
      // If you want to send a response, use res.status().json() here
    }
    if (id === 4) {
      // Generate a 4x4 Sudoku board and its solution
      const dic = generateBoard(4, 4);

      const board = dic["cell"];
      const solution = dic["solution"];
      const game = await createGame(board, solution, 4, []);

      return res.json({ game });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};