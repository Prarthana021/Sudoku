import express, { application } from "express";
import bodyParser from "body-parser";
import boardManipulationRoute from "./routes/boardManipulation.js";
import boardRouter from "./routes/getBoard.js";
import makeDB from "./database/database.js";
import gamesRouter from "./routes/games.js";
import authRoutes from "./routes/authRoutes.js"; //User Authentication
import gameRoutes from './routes/gameRoutes.js'; //Saving game state
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.path);
  if (Object.keys(req.body).length !== 0) {
    console.log("    Body:", req.body);
  }
  next();
});

// ... your route definitions

app.use(express.static("dist"));

// all routes called here
app.use("/auth", authRoutes); // For authentication (signup/login)
app.use("/api", boardManipulationRoute);
app.use("/api", boardRouter);
app.use("/api", gamesRouter);
app.use('/game', gameRoutes); // For game state handling

app.listen(port, (err) => {
  makeDB();
  if (!err) {
    console.log(`Server is running on http://localhost:${port}/`);
  } else {
    console.log(err);
  }
});
