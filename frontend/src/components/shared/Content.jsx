// Gurpreet and Prarthana
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
