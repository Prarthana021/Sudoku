// Akash & Gurpreet

import { generateBoard } from "../helpers/generateBoard.js";
import createGame from "../helpers/createGame.js";

export const getNineBoard = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (id !== 9) {
      return {
        message: "Bad request",
      };
    }
    if (id === 9) {
      const dic = generateBoard(9, 9);
      const board = dic["cell"];
      const solution = dic["solution"];
      const game = await createGame(board, solution, 9, []);

      // Send the response
      return res.json({ game });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
