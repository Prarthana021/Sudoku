// Gurpreet
import express from "express";
import { getFourBoard } from "../controllers/getFourBoard.js";
import { getNineBoard } from "../controllers/getNineBoard.js";

const boardRouter = express.Router();

// @route /api/newboard/4 or 9
boardRouter.get("/newboard/:id", getFourBoard);
boardRouter.get("/newboard/:id", getNineBoard);

export default boardRouter;
