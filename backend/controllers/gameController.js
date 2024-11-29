import Game from '../database/gameSchema.js';
import User from '../database/userSchema.js';

// Save Game State
export const saveGameState = async (req, res) => {
  try {
    const { userId, gameState } = req.body; // Expect userId and gameState from the frontend

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    let game = await Game.findById(user.currentGame);

    // If no game is associated with the user, create a new one
    if (!game) {
      game = new Game(gameState); // Create new game instance
      await game.save();

      // Associate this new game with the user
      user.currentGame = game._id;
      await user.save();
    } else {
      // Update the existing game state
      Object.assign(game, gameState);
      await game.save();
    }

    res.status(200).json({ message: 'Game state saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving game state', error: error.message });
  }
};

// Retrieve Game State
export const getGameState = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user in the database
    const user = await User.findById(userId).populate('currentGame');
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    if (!user.currentGame) {
      return res.status(404).json({ message: 'No saved game found for this user.' });
    }

    res.status(200).json(user.currentGame); // Send the game state back to the client
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving game state', error: error.message });
  }
};
