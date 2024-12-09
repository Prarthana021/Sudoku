import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import SwitchPuzzleDialog from "./SwitchPuzzleDialog";
import { useSudokuBoard } from "../providers/board-provider";

const Navbar = ({ setBoardDimension, setDifficulty, setCurrentGameId }) => {
  const { setSelectedCell } = useSudokuBoard();
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [show4x4Dropdown, setShow4x4Dropdown] = useState(false);
  const [show9x9Dropdown, setShow9x9Dropdown] = useState(false);
  const [selectedDimension, setSelectedDimension] = useState(4);
  const [showSwitchPuzzleDialog, setShowSwitchPuzzleDialog] = useState(false);
  const dropdown4x4Ref = useRef(null);
  const dropdown9x9Ref = useRef(null);

  const toggle4x4Dropdown = () => {
    setShow4x4Dropdown(!show4x4Dropdown);
    setShow9x9Dropdown(false); // Hide 9x9 dropdown if open
  };

  const toggle9x9Dropdown = () => {
    setShow9x9Dropdown(!show9x9Dropdown);
    setShow4x4Dropdown(false); // Hide 4x4 dropdown if open
  };

  const handleClickOutside = (event) => {
    if (
      dropdown4x4Ref.current &&
      !dropdown4x4Ref.current.contains(event.target) &&
      dropdown9x9Ref.current &&
      !dropdown9x9Ref.current.contains(event.target)
    ) {
      setShow4x4Dropdown(false);
      setShow9x9Dropdown(false);
    }
  };

  const handleDifficultyChange = (dimension, difficulty) => {
    // console.log(dimension, difficulty)
    setSelectedDifficulty(difficulty);
    setSelectedDimension(dimension);
    setShowSwitchPuzzleDialog(true);
  };

  const handleContinueSwitchPuzzle = () => {
    setSelectedCell({ row: -1, col: -1 });
    setBoardDimension(selectedDimension)
    setDifficulty(selectedDifficulty);
    setShowSwitchPuzzleDialog(false);
    setCurrentGameId("");
  };

  const handleCancelSwitchPuzzle = () => {
    setShowSwitchPuzzleDialog(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleNewGame = () => {
    setCurrentGameId("");
  };

  return (
    <nav className="fixed top-0 z-50 w-full p-4" style={{ backgroundColor: "#558b71" }}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or brand */}
        <Logo />

        {/* Navigation options */}
        <div className="flex space-x-4 items-center">
          {/* New Game Button */}
          <button
            onClick={handleNewGame}
            className="cursor-pointer font-semibold rounded"
            style={{
              width: "120px", // Increased width for better layout
              height: "40px", // Adjusted height
              backgroundColor: "#98fbcb", // Light green background
              color: "black", // Black text color
            }}
          >
            Start Again
          </button>

          {/* 4x4 Button */}
          <div ref={dropdown4x4Ref} className="relative">
            <button
              className={`cursor-pointer font-semibold rounded p-4 text-black hover:bg-[#98fbcb] hover:text-black ${show4x4Dropdown ? `bg-gray-900` : ``}`}
              onClick={toggle4x4Dropdown}
              style={{ whiteSpace: "nowrap" }} // Ensure text stays on one line
            >
              4x4
            </button>
            {show4x4Dropdown && (
              <ul className="absolute mt-2" style={{ backgroundColor: "#98fbcb", color: "black", width: "150px" }}> {/* Increased width */}
                <li>
                  <a
                    className="block cursor-pointer p-2 hover:bg-green-700 hover:text-white"
                    onClick={() => handleDifficultyChange(4, 1)}
                  >
                    Easy
                  </a>
                </li>
                <li>
                  <a
                    className="block cursor-pointer p-2 hover:bg-green-700 hover:text-white"
                    onClick={() => handleDifficultyChange(4, 2)}
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a
                    className="block cursor-pointer p-2 hover:bg-green-700 hover:text-white"
                    onClick={() => handleDifficultyChange(4, 3)}
                  >
                    Hard
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* 9x9 Button */}
          <div ref={dropdown9x9Ref} className="relative">
            <button
              className={`cursor-pointer font-semibold rounded p-4 text-black hover:bg-[#98fbcb] hover:text-black ${show9x9Dropdown ? `bg-gray-900` : ``}`}
              onClick={toggle9x9Dropdown}
              style={{ whiteSpace: "nowrap" }} // Ensure text stays on one line
            >
              9x9
            </button>
            {show9x9Dropdown && (
              <ul className="absolute mt-2" style={{ backgroundColor: "#98fbcb", color: "black", width: "150px" }}> {/* Increased width */}
                <li>
                  <a
                    className="block cursor-pointer p-2 hover:bg-green-700 hover:text-white"
                    onClick={() => handleDifficultyChange(9, 1)}
                  >
                    Easy
                  </a>
                </li>
                <li>
                  <a
                    className="block cursor-pointer p-2 hover:bg-green-700 hover:text-white"
                    onClick={() => handleDifficultyChange(9, 2)}
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a
                    className="block cursor-pointer p-2 hover:bg-green-700 hover:text-white"
                    onClick={() => handleDifficultyChange(9, 3)}
                  >
                    Hard
                  </a>
                </li>
              </ul>
            )}
          </div>
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
