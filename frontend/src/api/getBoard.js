
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:9090/api";

/**
 * Get a 4x4 sudoku board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getFourBoard = () => {
  return axios
    .get(`${BASE_URL}/newboard/4`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 4x4 board: ${error.message}`);
    });
};

/**
 * Get a 9x9 sudoku board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getNineBoard = () => {
  return axios
    .get(`${BASE_URL}/newboard/9`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 9x9 board: ${error.message}`);
    });
};

/**
 * Get a 16x16 sudoku board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getSixteenBoard = () => {
  return axios
    .get(`${BASE_URL}/newboard/16`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 16x16 board: ${error.message}`);
    });
};