import express from 'express';
import { saveGameState, getGameState } from '../controllers/gameController.js';

const router = express.Router();

// Save game progress
router.post('/saveGame', saveGameState);

// Get saved game state for a user
router.get('/getGame/:userId', getGameState);

export default router;