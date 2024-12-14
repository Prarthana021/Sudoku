// Aakash and Prarthana

import Game from "../database/gameSchema.js";

const updateGame = async (updatedBoard, gameId, updatedStack, noteMode) => {
  try {
    await Game.updateOne(
      { _id: gameId },
      {
        problemBoard: updatedBoard,
        stack: updatedStack,
        noteMode: noteMode,
      },
    );
  } catch (error) {
    console.error("Error updating game:", error);
  }
};

export default updateGame;
