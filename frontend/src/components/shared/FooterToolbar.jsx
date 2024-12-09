import PropTypes from "prop-types";
import { PiLightbulbFilamentFill, PiLightbulbBold, PiNotePencilBold, PiArrowArcLeftFill, PiArrowBendDoubleUpLeftBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";

import {
  undo,
  undoUntilCorrect,
  correctSoFar,
  getRandomHint,
  getSpecificHint,
} from "../../api/boardManipulation";
import { useSudokuBoard } from "../providers/board-provider";
import { switchNote } from "../../api/notes";

const FooterToolbar = ({ currentGameId, addNoteMode, setAddNoteMode }) => {
  const { selectedCell, sudokuGrid, setSudokuGrid, setSelectedCell } = useSudokuBoard();

  const handleUndo = async () => {
    try {
      const data = await undo(currentGameId);
      if (data.noMoreMoves) {
        console.log("No more moves to undo");
        return;
      }
      const newGrid = data.board.grid;
      setSudokuGrid(newGrid);

      // Find the first cell that is different
      for (let row = 0; row < newGrid.length; row++) {
        for (let col = 0; col < newGrid[row].length; col++) {
          const newValue = Number(newGrid[row][col].value);
          const oldValue = Number(sudokuGrid[row][col].value);
          if (newValue !== oldValue) {
            console.log("Changed cell is", row, col);
            setSelectedCell({ row, col });
            return;
          }
        }
      }
    } catch (error) {
      console.error("Error during undo operation:", error);
    }
  };

  const handleUndoUntilCorrect = async () => {
    try {
      const data = await undoUntilCorrect(currentGameId);
      if (data.noMoreMoves) {
        console.log("No more moves to undo");
        return;
      }
      const newGrid = data.board;
      setSudokuGrid(newGrid);
      setSelectedCell(-1, -1);
    } catch (error) {
      console.error("Error during undoUntilCorrect:", error);
    }
  };

  const handleGetRandomHint = async () => {
    try {
      const { suggestedMove, updatedBoard } = await getRandomHint(currentGameId);
      if (suggestedMove === null) {
        console.log("No more hints available");
        return;
      }
      setSelectedCell({ row: suggestedMove.row, col: suggestedMove.col });
      setSudokuGrid(updatedBoard);
    } catch (error) {
      console.error("Error during getRandomHint:", error);
    }
  };

  const handleGetSpecificHint = async () => {
    if (selectedCell.row === -1 || selectedCell.col === -1) return console.log("No cell selected");
    try {
      const { suggestedMove, updatedBoard } = await getSpecificHint(currentGameId, selectedCell.row, selectedCell.col);
      setSelectedCell({ row: suggestedMove.row, col: suggestedMove.col });
      setSudokuGrid(updatedBoard);
    } catch (error) {
      console.error("Error during getSpecificHint:", error);
    }
  };


  const handleCheckBoard = async () => {
    try {
      const data = await correctSoFar(currentGameId); // Call the correctSoFar API
  
      if (data.valid) {
        // If the board is correct, show a success message and do nothing else
        alert(data.message);
      } else {
        // Highlight incorrect cells in red
        const newGrid = [...sudokuGrid]; // Create a copy of the grid
        data.incorrectCells.forEach(({ row, col }) => {
          // Set the background color of the incorrect cells to red
          newGrid[row][col].style = { ...newGrid[row][col].style, backgroundColor: 'red' };
        });
  
        setSudokuGrid(newGrid); // Update the grid with the highlighted cells
      }
    } catch (error) {
      console.error("Error during checkBoard:", error);
      alert("An error occurred while checking the board. Please try again.");
    }
  };
  
  
  const handleSwitchNoteMode = async () => {
    try {
      const res = await switchNote(currentGameId);
      setAddNoteMode(res.noteMode);
    } catch (error) {
      console.error("Error during switch note mode:", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 flex flex-col items-end space-y-2 mr-4">
      <button
        className="p-4 text-black hover:bg-gray-200 flex items-center justify-center"
        style={{
          backgroundColor: "#7fcfa8",
          border: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          width: "200px",
          height: "40px",
          position: "absolute",
          top: "-250px",
          marginRight: "120px",
        }}
        onClick={handleUndo}
      >
        <PiArrowArcLeftFill size={20} style={{ marginRight: "8px" }} />
        Undo
      </button>

      <button
        className="p-4 text-black hover:bg-gray-200 flex items-center justify-center"
        style={{
          backgroundColor: "#7fcfa8",
          border: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          width: "200px",
          height: "60px",
          position: "absolute",
          top: "-335px",
          marginRight: "120px",
        }}
        onClick={handleUndoUntilCorrect}
      >
        <PiArrowBendDoubleUpLeftBold size={20} style={{ marginRight: "8px" }} />
        Undo Until Correct
      </button>

      <button
        className="p-4 text-black hover:bg-gray-200 flex items-center justify-center"
        style={{
          backgroundColor: "#7fcfa8",
          border: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          width: "200px",
          height: "40px",
          position: "absolute",
          top: "-390px",
          marginRight: "120px",
        }}
        onClick={handleSwitchNoteMode}
      >
        <PiNotePencilBold size={20} style={{ marginRight: "8px" }} />
        {addNoteMode ? "Note Mode On" : "Note Mode Off"}
      </button>

      <button
        className="p-4 text-black hover:bg-gray-200 flex items-center justify-center"
        style={{
          backgroundColor: "#7fcfa8",
          border: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          width: "200px",
          height: "40px",
          position: "absolute",
          top: "-450px",
          marginRight: "120px",
        }}
        onClick={handleGetRandomHint}
      >
        <PiLightbulbFilamentFill size={20} style={{ marginRight: "8px" }} />
        Get Random Hint
      </button>

      <button
        className="p-4 text-black hover:bg-gray-200 flex items-center justify-center"
        style={{
          backgroundColor: "#7fcfa8",
          border: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          width: "200px",
          height: "40px",
          position: "absolute",
          top: "-505px",
          marginRight: "120px",
        }}
        onClick={handleGetSpecificHint}
      >
        <PiLightbulbBold size={20} style={{ marginRight: "8px" }} />
        Get Specific Hint
      </button>

      <button
        className="p-4 text-black hover:bg-gray-200 flex items-center justify-center"
        style={{
          backgroundColor: "#7fcfa8",
          border: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          width: "250px",
          height: "50px",
          position: "absolute",
          marginRight: "430px",
          top: "-220px",
        }}
        onClick={handleCheckBoard}
      >
        <FaCheck size={20} style={{ marginRight: "8px" }} />
        Check Your Solution
      </button>
    </div>
  );
};

FooterToolbar.propTypes = {
  currentGameId: PropTypes.string.isRequired,
  addNoteMode: PropTypes.bool.isRequired,
  setAddNoteMode: PropTypes.func.isRequired,
};

export default FooterToolbar;



