// Gurpreet and Prarthana
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import FooterToolbar from "./components/shared/FooterToolbar";
import Content from "./components/shared/Content";
import Navbar from "./components/shared/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";
import { SudokuBoardProvider } from "./components/providers/board-provider";
import HomePage from "./components/HomePage/HomePage";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import Settings from "./components/Settings/Settings";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

import "./App.css";

function App() {
	const [volume, setVolume] = useState(0.5);
  const [boardDimension, setBoardDimension] = useState(9);
  const [difficulty, setDifficulty] = useState(1);
  const [currentGameId, setCurrentGameId] = useLocalStorage("currentGameId", "");
  const [addNoteMode, setAddNoteMode] = useState(false);

  return (
    <Router>
	  <MusicPlayer volume={volume} />
      <Routes>
        {/* Route for the main homepage */}
        <Route
          path="/"
          element={
            <HomePage />
          }
        />

        {/* Route for login/signup */}
        <Route
          path="/login"
          element={<LoginSignUp />}
        />

        {/* Route for settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* Route for the game */}
        <Route
          path="/play"
          element={
            <SudokuBoardProvider size={boardDimension} currentGameId={currentGameId}>
              <div data-testid="navbar">
                <Navbar
                  setBoardDimension={setBoardDimension}
                  setDifficulty={setDifficulty}
                  setCurrentGameId={setCurrentGameId}
                />
              </div>
              <div data-testid="content">
                <Content
                  boardDimension={boardDimension}
                  setBoardDimension={setBoardDimension}
                  difficulty={difficulty}
                  currentGameId={currentGameId}
                  setCurrentGameId={setCurrentGameId}
                  addNoteMode={addNoteMode}
                  setAddNoteMode={setAddNoteMode}
                />
              </div>
              <div data-testid="footerToolbar">
                <FooterToolbar 
                  currentGameId={currentGameId}
                  addNoteMode={addNoteMode}
                  setAddNoteMode={setAddNoteMode}
                />
              </div>
            </SudokuBoardProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

