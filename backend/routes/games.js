//Prarthana
import express from "express";
import listAllGamesInDb from "../controllers/listAllGamesInDb.js";
import getSingleGameById from "../controllers/getSingleGameById.js";
const gamesRouter = express.Router();

gamesRouter.get("/getonegame/:id", getSingleGameById);
gamesRouter.get("/getallgames", listAllGamesInDb);

export default gamesRouter;
