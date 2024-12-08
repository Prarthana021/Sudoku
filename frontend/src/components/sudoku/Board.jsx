import { useEffect, useCallback, useState } from "react";
import Cell from "./Cell";
import Keypad from "./Keypad";
import { getFourBoard, getNineBoard } from "../../api/getBoard";
import { getSingleGameById } from "../../api/getGame";
import PropTypes from "prop-types";
import { useSudokuBoard } from "../providers/board-provider";
import GameTimer from "./GameTimer";
import "./board.css";

function Board({ currentGameId, setCurrentGameId, addNoteMode, boardDimension, setBoardDimension }) {
  const { sudokuGrid, setSudokuGrid, handleCellChange, selectedCell, setSelectedCell } = useSudokuBoard();
  const [isLoading, setIsLoading] = useState(true);
  const [solutionGrid, setSolutionGrid] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      setIsLoading(true);
      let data;
      if (currentGameId !== "") {
        data = await getSingleGameById(currentGameId);
        setBoardDimension(data.game.dimension);
      } else {
        data = await (boardDimension === 9 ? getNineBoard() : getFourBoard());
        setCurrentGameId(data.game._id);
      }
      setSudokuGrid(data.game.problemBoard);
      setSolutionGrid(data.game.solutionBoard); // Load the solution for validation
      setIsLoading(false);
    };

    fetchGame();
  }, [currentGameId, setCurrentGameId, setSudokuGrid, setSolutionGrid, boardDimension, setBoardDimension]);

  const handleArrowKeys = useCallback((e) => {
    const ARROW_KEYS = {
      ArrowUp: { row: -1, col: 0 },
      ArrowDown: { row: 1, col: 0 },
      ArrowLeft: { row: 0, col: -1 },
      ArrowRight: { row: 0, col: 1 },
    };
    if (ARROW_KEYS[e.key]) {
      const maxIndex = boardDimension - 1;
      const newRow = Math.max(0, Math.min(maxIndex, selectedCell.row + ARROW_KEYS[e.key].row));
      const newCol = Math.max(0, Math.min(maxIndex, selectedCell.col + ARROW_KEYS[e.key].col));
      setSelectedCell({ row: newRow, col: newCol });
    }
  }, [selectedCell, setSelectedCell, boardDimension]);

  const handlePhysicalKeyboardInput = useCallback((e) => {
    const value = e.key;
    if (selectedCell.row == null || selectedCell.col == null) {
      return;
    }
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
      handleCellChange(selectedCell.row, selectedCell.col, 0, addNoteMode);
    } else if (/^[1-9]$/.test(e.key)) {
      handleCellChange(selectedCell.row, selectedCell.col, value, addNoteMode);
    }
  }, [selectedCell, handleCellChange, addNoteMode]);

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeys);
    document.addEventListener("keydown", handlePhysicalKeyboardInput);
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
      document.removeEventListener("keydown", handlePhysicalKeyboardInput);
    };
  }, [selectedCell, handleArrowKeys, handlePhysicalKeyboardInput]);

  const handleKeypadClick = (value) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      handleCellChange(selectedCell.row, selectedCell.col, value, addNoteMode);
    }
  };

  const checkSolution = () => {
    const incorrectCells = [];
    for (let row = 0; row < boardDimension; row++) {
      for (let col = 0; col < boardDimension; col++) {
        if (sudokuGrid[row][col].value !== solutionGrid[row][col]) {
          incorrectCells.push({ row, col });
        }
      }
    }
    setHighlightedCells(incorrectCells);
  };

  const getCellClass = (row, col) => {
    const isHighlighted = highlightedCells.some(
      (cell) => cell.row === row && cell.col === col
    );
    return isHighlighted ? "bg-red-400 text-white" : "";
  };

  const isGridReady = sudokuGrid.length === boardDimension && sudokuGrid.every((row) => row.length === boardDimension);

  const subgridSize = boardDimension === 9 ? 3 : 2;

  const renderSubgrid = (startRow, startCol, quadrantIndex) => {
    return (
      <div
        key={`subgrid-${startRow}-${startCol}`}
        className="subgrid"
        style={{ display: "grid", gridTemplateRows: `repeat(${subgridSize}, 1fr)` }}
      >
        {[...Array(subgridSize)].map((_, rowIndex) => (
          <div
            key={`row-${startRow + rowIndex}`}
            className="row"
            style={{ display: "grid", gridTemplateColumns: `repeat(${subgridSize}, 1fr)` }}
          >
            {[...Array(subgridSize)].map((_, colIndex) => {
              const cellRow = startRow + rowIndex;
              const cellCol = startCol + colIndex;
              const cellObj = sudokuGrid[cellRow][cellCol];
              const isSelected = selectedCell.row === cellRow || selectedCell.col === cellCol;
              return (
                <div
                  key={`cell-${cellRow}-${cellCol}`}
                  className={`cell border-2 border-white rounded-sm ${getCellClass(cellRow, cellCol)} ${
                    isSelected && "bg-green-400 text-white"
                  }`}
                >
                  <Cell
                    row={cellRow}
                    col={cellCol}
                    cell={cellObj}
                    onChange={(newCell) => handleCellChange(cellRow, cellCol, newCell, addNoteMode)}
                    onCellClick={setSelectedCell}
                    isSelected={isSelected}
                    isPrimarySelected={cellRow === selectedCell.row && cellCol === selectedCell.col}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  if (!isGridReady || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center md:flex-row">
      <table className="mb-4 border border-gray-600">
        <tbody>
          {Array.from({ length: boardDimension }, (_, i) => i)
            .filter((i) => i % subgridSize === 0)
            .map((startRow, quadrantRowIndex) => (
              <tr key={quadrantRowIndex}>
                {Array.from({ length: boardDimension }, (_, i) => i)
                  .filter((i) => i % subgridSize === 0)
                  .map((startCol, quadrantColIndex) => (
                    <td key={quadrantColIndex} className="border-0 bg-gray-800">
                      {renderSubgrid(startRow, startCol, quadrantRowIndex * subgridSize + quadrantColIndex)}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="md:ml-6 md:mt-0">
        <center className="mb-2">
          <GameTimer currentGameId={currentGameId} />
        </center>
        <Keypad onKeypadClick={handleKeypadClick} />
        <button
          onClick={checkSolution}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Check Solution
        </button>
      </div>
    </div>
  );
}

Board.propTypes = {
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  addNoteMode: PropTypes.bool.isRequired,
  boardDimension: PropTypes.number.isRequired,
  setBoardDimension: PropTypes.func.isRequired,
};

export default Board;

