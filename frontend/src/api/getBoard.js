// Gurpreet
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:9090/api";

export const getFourBoard = () => {
  return axios
    .get(`${BASE_URL}/newboard/4`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 4x4 board: ${error.message}`);
    });
};

export const getNineBoard = () => {
  return axios
    .get(`${BASE_URL}/newboard/9`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 9x9 board: ${error.message}`);
    });
};

export const getSixteenBoard = () => {
  return axios
    .get(`${BASE_URL}/newboard/16`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 16x16 board: ${error.message}`);
    });
};
