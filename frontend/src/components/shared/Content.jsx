import PropTypes from "prop-types";
import Board from "../sudoku/Board";
import { useState } from "react";

function Content({ boardDimension, difficulty, currentGameId, setCurrentGameId, addNoteMode, setAddNoteMode, setBoardDimension }) {
  const [showDifficultyDialog, setShowDifficultyDialog] = useState(false);

  let difficultyText;
  switch (difficulty) {
    case 1:
      difficultyText = "Easy";
      break;
    case 2:
      difficultyText = "Medium";
      break;
    case 3:
      difficultyText = "Hard";
      break;
    default:
      difficultyText = "Easy";
  }

  const restartGame = () => {
    setCurrentGameId(Date.now().toString());
  };

  return (
    <div className="container ml-40 mt-32 flex flex-col  justify-center pb-28">
      <div data-testid="board">
        <Board
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
          addNoteMode={addNoteMode}
          setAddNoteMode={setAddNoteMode}
          boardDimension={boardDimension}
          setBoardDimension={setBoardDimension}
        />
      </div>
      
      {/* Restart Game button styled similarly to Start Timer */}
      {/* <button
        onClick={restartGame}
        style={{
          border: "2px solid #558B71",
          backgroundColor: "#7fcfa8",
          color: "white",
          padding: "10px 15px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          transition: "all 0.3s ease",
        }}
        className="mt-4"
      >
        Restart Game
      </button> */}

      {showDifficultyDialog && difficultyText}
    </div>
  );
}

Content.propTypes = {
  boardDimension: PropTypes.number.isRequired,
  setBoardDimension: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  addNoteMode: PropTypes.bool.isRequired,
  setAddNoteMode: PropTypes.func.isRequired,
};

export default Content;
