//db.games.findOne({ _id: ObjectId("65613d985056fc4f970c8cdf") });

import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";

// returns game
const getSingleGameById = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);

    const game = await Game.findOne({
      _id: gameId,
    });
    if (!game) {
      return res.json({
        message: "No game found",
      });
    }
    return res.json({ game });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
export default getSingleGameById;
