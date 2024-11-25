import express from "express";
import listAllGamesInDb from "../controllers/listAllGamesInDb.js";
import getSingleGameById from "../controllers/getSingleGameById.js";
const gamesRouter = express.Router();

//@route /api/getonegame/{dbId}
gamesRouter.get("/getonegame/:id", getSingleGameById);

// @route /api/getallgame/{dbId}
gamesRouter.get("/getallgames", listAllGamesInDb);

// TODO add 2 hardcoded boards in /games route

export default gamesRouter;
