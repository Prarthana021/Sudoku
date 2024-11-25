import Game from "../database/gameSchema.js";

//returns games

const listAllGamesInDb = async (req, res) => {
  try {
    const games = await Game.find();

    return res.json({
      games,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default listAllGamesInDb;
