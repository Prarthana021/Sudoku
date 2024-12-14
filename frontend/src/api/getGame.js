// Akash
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:9090/api";

export const getSingleGameById = (gameId) => {
  return axios
    .get(`${BASE_URL}/getonegame/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching game: ${error.message}`);
    });
};

export const listAllGamesInDb = () => {
  return axios
    .get(`${BASE_URL}/getallgames`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching all games: ${error.message}`);
    });
};
