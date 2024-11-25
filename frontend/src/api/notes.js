import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:9090/api";

/**
 * Add a note to a cell in the sudoku board
 * @param {string} gameId - The identifier for the game.
 * @param {number} row - The row number of the cell.
 * @param {number} col - The column number of the cell.
 * @param {number} note - The note to add.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const addNote = (gameId, row, col, note) => {
  return axios
    .put(`${BASE_URL}/addnote/${gameId}`, {
      row: row,
      col: col,
      element: note,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw new Error(`Error adding note to cell: ${error.message}`);
    });
};

/**
 * Remove a note from a cell in the sudoku board
 * @param {string} gameId - The identifier for the game.
 * @param {number} row - The row number of the cell.
 * @param {number} col - The column number of the cell.
 * @param {number} note - The note to remove.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const removeNote = (gameId, row, col, note) => {
  return axios
    .post(`${BASE_URL}/removenote/${gameId}`, {
      row: row,
      col: col,
      element: Number(note),
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error removing note from cell: ${error.message}`);
    });
};

/**
 * Toggle a note in a cell on the sudoku board
 * This function sends a request to the server to either add or remove a note in the specified cell, depending on whether the note is currently present.
 *
 * @param {string} gameId - The identifier for the game.
 * @param {number} row - The row number of the cell.
 * @param {number} col - The column number of the cell.
 * @param {number} note - The note to be toggled.
 * @returns {Promise<Object>} A promise that resolves to the updated board data.
 */
export const switchNote = (gameId, row, col, note) => {
  return axios
    .put(`${BASE_URL}/switchnote/${gameId}`, {
      row: row,
      col: col,
      note: note,
    })
    .then((response) => {
      console.log("RESPONSE:", response);
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Error toggling note in cell: ${error.message}`);
    });
};