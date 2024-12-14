// Prarthana and Gurpreet
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:9090/api";

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
