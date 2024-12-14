//Aakash

import { generateBoard } from "../helpers/generateBoard.js";
import createGame from "../helpers/createGame.js";

export const getFourBoard = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
 
    if (id !== 4) {
      
      next();
    
    }
    if (id === 4) {
   
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
