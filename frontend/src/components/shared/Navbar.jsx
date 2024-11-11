import PropTypes from "prop-types";
import { useState } from "react";
import Logo from "./Logo";
import SwitchPuzzleDialog from "./SwitchPuzzleDialog";
import { useSudokuBoard } from "../providers/board-provider";

const Navbar = ({ setBoardDimension, setDifficulty, setCurrentGameId }) => {
  const { setSelectedCell } = useSudokuBoard();
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [showSwitchPuzzleDialog, setShowSwitchPuzzleDialog] = useState(false);

  const handleNewGame = () => {
    setCurrentGameId("");
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowSwitchPuzzleDialog(true);
  };

  const handleContinueSwitchPuzzle = () => {
    setSelectedCell({ row: -1, col: -1 });
    setBoardDimension(9); // Fixed at 9x9 board
    setDifficulty(selectedDifficulty);
    setShowSwitchPuzzleDialog(false);
    setCurrentGameId("");
  };

  const handleCancelSwitchPuzzle = () => {
    setShowSwitchPuzzleDialog(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full p-4" style={{ backgroundColor: "#558b71" }}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or brand */}
        <Logo />

        {/* Navigation options */}
        <div className="flex space-x-4">
          {/* New Game Button */}
          <button
            onClick={handleNewGame}
            className="cursor-pointer p-2 font-semibold rounded"
            style={{ backgroundColor: "#98fbcb", color: "black" }}
          >
            New Game
          </button>

          {/* Difficulty Level Options - Always Visible */}
          <button
            onClick={() => handleDifficultyChange(1)}
            className="cursor-pointer p-2 font-semibold rounded"
            style={{
              backgroundColor: selectedDifficulty === 1 ? "#98fbcb" : "#98fbcb",
              color: "black",
            }}
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultyChange(2)}
            className="cursor-pointer p-2 font-semibold rounded"
            style={{
              backgroundColor: selectedDifficulty === 2 ? "#98fbcb" : "#98fbcb",
              color: "black",
            }}
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultyChange(3)}
            className="cursor-pointer p-2 font-semibold rounded"
            style={{
              backgroundColor: selectedDifficulty === 3 ? "#98fbcb" : "#98fbcb",
              color: "black",
            }}
          >
            Hard
          </button>
        </div>
      </div>

      {/* Switch Puzzle Dialog */}
      {showSwitchPuzzleDialog && (
        <SwitchPuzzleDialog onCancel={handleCancelSwitchPuzzle} onContinue={handleContinueSwitchPuzzle} />
      )}
    </nav>
  );
};

Navbar.propTypes = {
  setBoardDimension: PropTypes.func.isRequired,
  setDifficulty: PropTypes.func.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
};

export default Navbar;
