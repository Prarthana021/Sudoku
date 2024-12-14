// Akash

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

function makeDB() {
  const url = process.env.MONGODB_URL;
  console.log(url);
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to DB...");
    })
    .catch((err) => console.log(err));
}
export default makeDB;


