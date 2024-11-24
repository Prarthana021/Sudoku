import express from "express";
import { addNumberIntoBoard } from "../controllers/addNumber.js";
import { deleteElementFromBoard } from "../controllers/deleteElementFromBoard.js";
import { checkIfSolved } from "../controllers/checkIfSolved.js";
import { correctSoFar } from "../controllers/correctSoFar.js";
import undo from "../controllers/undo.js";
import undoUntilCorrect from "../controllers/undoUntilCorrect.js";
import addNotes from "../controllers/addNotes.js";
import switchNote from "../controllers/switchNotes.js";
import resetGame from "../controllers/resetGame.js";
import deleteNotes from "../controllers/deleteNotes.js";
import callRandomHint from "../controllers/getRandomHint.js";
import callSpecificHint from "../controllers/getSpecificHint.js";

const router = express.Router();

// @route /api/addNumber/{gameId}
router.post("/addnumber/:id", addNumberIntoBoard); // {valid:true or false, board,stack}

// TODO frontend
// @route /api/deleteelement/{gameId}
router.post("/deleteelement/:id", deleteElementFromBoard); // {valid:true or false, board}

// TODO frontend
// @route /api/checksolved/{gameId}
router.get("/checksolved/:id", checkIfSolved); // {isSolved:true/false}

// TODO frontend
//@route /api/correctSoFar/{gameId}
router.get("/correctSoFar/:id", correctSoFar); // {valid:true/false}


// @route /api/getRandomHint/{gameId}
router.get("/getRandomHint/:id", callRandomHint); //{suggestedMove:{row,col,num}}

// @route /api/getSpecificHint/{gameId}
router.post("/getSpecificHint/:id", callSpecificHint); //{suggestedMove} suggestedMove means the element that we can add

// @route /api/undo/{gameId}
router.get("/undo/:id", undo); // {board}

// @route /api/undountilcorrect/{gameId}
router.get("/undountilcorrect/:id", undoUntilCorrect); // {board}

// TODO: SwitchNoteMode - Revisit necessity
//       If removing, look for same todo on frontend
// @route /api/switchnote
router.put("/switchnote/:id", switchNote);

// @route /api/addnote/{gameId}
router.put("/addnote/:id", addNotes);

// @route /api/deletenote/{gameId}
router.delete("/deletenote/:id", deleteNotes);

// @route /api/reset/{gameId}
router.put("/reset/:id", resetGame);

export default router;
