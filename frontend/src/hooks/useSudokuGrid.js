import { useState } from "react";
import { addNumber } from "../../api/boardManipulation";
import { addNote } from "../../api/notes";
export function useSudokuGrid(size, currentGameId, initialGrid) {
  // Initialize the grid state
  const [sudokuGrid, setSudokuGrid] = useState(() => {
    // If an initial grid is provided, use it; otherwise, create an empty grid
    return initialGrid || Array.from({ length: size }, () => Array(size).fill({ value: 0, notes: Array(9).fill([]) }));
  });
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });

  const handleCellChange = async (row, col, value, addNoteMode) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return;

    // Adding notes
    if (addNoteMode) {
      // Create a deep copy of the grid
      const newGrid = sudokuGrid.map((row) => row.map((cell) => ({ ...cell })));
      const notes = sudokuGrid[row][col].notes;
      // creates a copy of the notes
      const newNotes = [...notes];
      const notesArrayLocation = getNotesArray(numberValue);

      // remove the number value from notes if it exists
      if (notes[notesArrayLocation].includes(numberValue)) {
        const indexToRemove = newNotes[notesArrayLocation].indexOf(numberValue);
        newNotes[notesArrayLocation].splice(indexToRemove, 1);
      } else {
        newNotes[notesArrayLocation].push(numberValue);
      }

      // Update the value of the specified cell
      newGrid[row][col].notes = newNotes;
      if (sudokuGrid[row][col].value !== -1) {
        try {
          await deleteElementFromBoard(currentGameId, row, col);
          newGrid[row][col].value = -1; // Update value after successful deletion
        } catch (error) {
          console.error("Error deleting element from board:", error);
        }
      }
      addNote(currentGameId, row, col, value);
      // setSudokuGrid(response.game.problemBoard);
      // Update the state with the new grid
      setSudokuGrid(newGrid);
      console.log("Complete");
    }
    // Deleting value
    else if (value === -1) {
      const newGrid = sudokuGrid.map((row) => row.map((cell) => ({ ...cell })));
      try {
        await deleteElementFromBoard(currentGameId, row, col);
        newGrid[row][col].value = -1; // Update value after successful deletion
      } catch (error) {
        console.error("Error deleting element from board:", error);
      }
      console.log("Deleted cell value");
      setSudokuGrid(newGrid);
    }
    // Adding value
    else {
      if (sudokuGrid[row][col].value === numberValue) {
        return;
      }

      // Create a deep copy of the grid
      const newGrid = sudokuGrid.map((row) => row.map((cell) => ({ ...cell })));

      // Update the value of the specified cell
      newGrid[row][col].value = numberValue;

      addNumber(currentGameId, row, col, numberValue);

      // Update the state with the new grid
      setSudokuGrid(newGrid);

      console.log("Complete");
    }
  };

  return { sudokuGrid, setSudokuGrid, handleCellChange, selectedCell, setSelectedCell };
}

const getNotesArray = (n) => {
  if (n <= 3) {
    return 0;
  } else if (n <= 6) {
    return 1;
  } else {
    return 2;
  }
};
