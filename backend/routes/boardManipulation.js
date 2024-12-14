import express from "express";
import { addNumberIntoBoard } from "../controllers/addNumber.js";
import { deleteElementFromBoard } from "../controllers/deleteElementFromBoard.js";
import { checkIfSolved } from "../controllers/checkIfSolved.js";
import { correctSoFar } from "../controllers/correctSoFar.js";
import undo from "../controllers/undo.js";
import undoUntilCorrect from "../controllers/undoUntilCorrect.js";
import addNotes from "../controllers/addNotes.js";
import switchNote from "../controllers/switchNotes.js";
import deleteNotes from "../controllers/deleteNotes.js";
import callRandomHint from "../controllers/getRandomHint.js";
import callSpecificHint from "../controllers/getSpecificHint.js";

const router = express.Router();

router.post("/addnumber/:id", addNumberIntoBoard); 

router.post("/deleteelement/:id", deleteElementFromBoard); 

router.get("/checksolved/:id", checkIfSolved); 

router.get("/correctSoFar/:id", correctSoFar); 

router.get("/getRandomHint/:id", callRandomHint); 

router.post("/getSpecificHint/:id", callSpecificHint); 

router.get("/undo/:id", undo); 

router.get("/undountilcorrect/:id", undoUntilCorrect); 

router.put("/switchnote/:id", switchNote);

router.put("/addnote/:id", addNotes);

router.delete("/deletenote/:id", deleteNotes);

router.get("/undo/:id", undo); // {board}

export default router;
