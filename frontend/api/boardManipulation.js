
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:9090/api";

/**
 * Add a value to a cell in the sudoku board
 * @param {string} gameId - The identifier for the game.
 * @param {number} row - The row number of the cell.
 * @param {number} col - The column number of the cell.
 * @param {number} value - The value to add
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const addNumber = (gameId, row, col, value) => {
  return axios
    .post(`${BASE_URL}/addnumber/${gameId}`, {
      row: row,
      col: col,
      element: value,
    })
    .then((response) => response.data)
    .then(console.log("Change cell (" + row + ", " + col + ") to " + value))
    .then((res) => console.log(res))
    .catch((error) => {
      throw new Error(`Error adding element to board: ${error.message}`);
    });
};

/**
 * Delete a value from the sudoku board
 * @param {string} gameId - The identifier for the game.
 * @param {number} row - The row number of the cell.
 * @param {number} col - The column number of the cell.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const deleteElementFromBoard = (gameId, row, col) => {
  return axios
    .post(`${BASE_URL}/deleteelement/${gameId}`, { row, col })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error deleting element from board: ${error.message}`);
    });
};

/**
 * Check if the Sudoku board is solved and valid
 * This function sends a request to the server to verify if the Sudoku board associated with the given gameId is completely solved and valid.
 *
 * The response includes an object with properties:
 * - `isSolved`: A boolean indicating if the board is completely filled.
 * - `valid`: A boolean indicating if the filled board is a valid Sudoku solution.
 *
 * If `isSolved` is false, it additionally checks if the current state of the board is valid.
 *
 * @param {string} gameId - The identifier for the game.
 * @returns {Promise<Object>} A promise that resolves to an object containing the properties 'isSolved' and 'valid'.
 */
export const checkIfSolved = (gameId) => {
  return axios
    .get(`${BASE_URL}/checksolved/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error checking if board is solved: ${error.message}`);
    });
};

/**
 * Check if the current state of the Sudoku board is correct
 * This function sends a request to the server to assess the current state of the Sudoku board associated with the given gameId.
 * It evaluates whether the current entries on the board comply with Sudoku rules, without necessarily being a complete solution.
 *
 * The response includes an object with a property:
 * - `valid`: A boolean indicating if the current state of the board is valid according to Sudoku rules.
 *
 * Note: This function does not determine if the board is fully solved, but only checks the correctness of the current entries.
 *
 * @param {string} gameId - The identifier for the game.
 * @returns {Promise<Object>} A promise that resolves to an object containing the property 'valid'.
 */
export const correctSoFar = (gameId) => {
  return axios
    .get(`${BASE_URL}/correctSoFar/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error checking if the board's current state is correct: ${error.message}`);
    });
};

/**
 * Get random hint
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getRandomHint = (gameId) => {
  return axios
    .get(`${BASE_URL}/getRandomHint/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error getting random hint: ${error.message}`);
    });
};

/**
 * Get specific hint
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getSpecificHint = (gameId, row, col) => {
  return axios
    .post(`${BASE_URL}/getspecifichint/${gameId}`, {
      row: row,
      col: col,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(`Error getting specific hint: ${error.message}`);
    });
};

/**
 * Undo last element on the board
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const undo = (gameId) => {
  return axios
    .get(`${BASE_URL}/undo/${gameId}`)
    .then((response) => {
      // If there are no more moves to undo, return a specific response instead of throwing an error
      if (response.data.message && response.data.message === "No more moves to undo.") {
        return { noMoreMoves: true };
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error during undo operation:", error);
      throw error; // Propagate the error for further handling
    });
};

/**
 * Undo until sudoku board is correct
 * @param {string} gameId - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const undoUntilCorrect = (gameId) => {
  return axios
    .get(`${BASE_URL}/undountilcorrect/${gameId}`)
    .then((response) => {
      // Handle specific messages or data returned by the backend
      if (response.data.message) {
        if (response.data.message === "No more moves to undo") {
          console.log(response.data.message);
        } else if (response.data.message === "Reached initial state of the game.") {
          console.log(response.data.message);
        }
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error during undoUntilCorrect operation:", error);
      throw error;
    });
};

/**
 * Reset the sudoku game to its initial state
 * @param {string} gameId - The identifier for the game.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const resetGame = (gameId) => {
  return axios
    .put(`${BASE_URL}/reset/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error resetting the game: ${error.message}`);
    });
};

