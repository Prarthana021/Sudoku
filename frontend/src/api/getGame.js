import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:9090/api";

/**
 * Get one game by its identifier.
 * @param {string} gameId - The identifier for the game.
 * @returns {Promise<Object>} A promise that resolves to the game data.
 * The returned game object includes the following properties:
 * - _id: String - Unique identifier of the game.
 * - problemBoard: Array - A 2D array representing the initial state of the game board,
 *   where each element is an object with 'value' and 'notes'.
 * - solutionBoard: Array - A 2D array representing the solution of the game board,
 *   where each element is a number.
 * - dimension: Number - The size of the game board (4 or 9).
 * - stack: Array - An array used for storing game states for undo/redo functionality.
 * - noteMode: Boolean - Indicates whether the note mode is active.
 */
export const getSingleGameById = (gameId) => {
  return axios
    .get(`${BASE_URL}/getonegame/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching game: ${error.message}`);
    });
};

/**
 * List all games.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const listAllGamesInDb = () => {
  return axios
    .get(`${BASE_URL}/getallgames`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching all games: ${error.message}`);
    });
};