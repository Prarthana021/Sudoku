//Prarthana and Gurpreet
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:9090/api";

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

export const deleteElementFromBoard = (gameId, row, col) => {
  return axios
    .post(`${BASE_URL}/deleteelement/${gameId}`, { row, col })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error deleting element from board: ${error.message}`);
    });
};

export const checkIfSolved = (gameId) => {
  return axios
    .get(`${BASE_URL}/checksolved/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error checking if board is solved: ${error.message}`);
    });
};

export const correctSoFar = (gameId) => {
  return axios
    .get(`${BASE_URL}/correctSoFar/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error checking if the board's current state is correct: ${error.message}`);
    });
};

export const getRandomHint = (gameId) => {
  return axios
    .get(`${BASE_URL}/getRandomHint/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error getting random hint: ${error.message}`);
    });
};

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

export const resetGame = (gameId) => {
  return axios
    .put(`${BASE_URL}/reset/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error resetting the game: ${error.message}`);
    });
};
