import express from "express";
import { addNumber } from "../controllers/addNumber.js";
import addNotes from "../controllers/addNotes.js";
import deleteNotes from "../controllers/deleteNotes.js";
import undo from "../controllers/undo.js";

const router = express.Router();

// @route /api/addelement/{gameId}
router.post("/addelement/:id", addNumber); // {valid:true or false, board,stack}

// @route /api/addnote/{gameId}
router.put("/addnote/:id", addNotes);

// @route /api/deletenote/{gameId}
router.delete("/deletenote/:id", deleteNotes);

// @route /api/undo/{gameId}
router.get("/undo/:id", undo); // {board}

export default router;
