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
      setIsLoading(false);
    };

    fetchGame();
  }, [currentGameId, setCurrentGameId, setSudokuGrid, boardDimension, setBoardDimension]);

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
      handleCellChange(selectedCell.row, selectedCell.col, 0 - 1, addNoteMode);
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

  const isGridReady = sudokuGrid.length === boardDimension && sudokuGrid.every((row) => row.length === boardDimension);

  if (!isGridReady || isLoading) {
    return <div>Loading...</div>;
  }

  const getQuadrantColor = (quadrantIndex) => {
    const colors = ["#98FBCB", "#BFFFED", "#7FCFA8", "#558B71"];
    return colors[quadrantIndex % colors.length];
  };

  const isInSameSubgrid = (row, col) => {
    const subgridSize = boardDimension === 9 ? 3 : 2;
    const selectedSubgridRow = Math.floor(selectedCell.row / subgridSize);
    const selectedSubgridCol = Math.floor(selectedCell.col / subgridSize);
    return (
      Math.floor(row / subgridSize) === selectedSubgridRow &&
      Math.floor(col / subgridSize) === selectedSubgridCol
    );
  };

  const renderSubgrid = (startRow, startCol, quadrantIndex) => {
    const subgridSize = boardDimension === 9 ? 3 : 2;

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

              const isSameRow = selectedCell.row === cellRow;
              const isSameCol = selectedCell.col === cellCol;
              const isSameSubgrid = isInSameSubgrid(cellRow, cellCol);
              const isPrimarySelected = cellRow === selectedCell.row && cellCol === selectedCell.col;

              const cellStyle = {
                backgroundColor: isPrimarySelected
                  ? "#4CAF50" // Dark green for the selected cell
                  : isSameRow || isSameCol || isSameSubgrid
                  ? "#D3D3D3" // Light gray for related cells
                  : getQuadrantColor(quadrantIndex),
                color: isPrimarySelected
                  ? "black" // Always black text for the selected cell
                  : "black", // Default text color is black for all other cases
              };

              return (
                <div
                  key={`cell-${cellRow}-${cellCol}`}
                  style={cellStyle}
                  className={`cell border-2 border-white rounded-sm ${
                    isPrimarySelected ? "bg-green-400 text-black" : ""
                  }`}
                >
                  <Cell
                    row={cellRow}
                    col={cellCol}
                    cell={cellObj}
                    onChange={(newCell) => handleCellChange(cellRow, cellCol, newCell, addNoteMode)}
                    onCellClick={() => setSelectedCell({ row: cellRow, col: cellCol })}
                    isSelected={isPrimarySelected}
                    isPrimarySelected={isPrimarySelected}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center md:flex-row">
      <table className="mb-4 border border-gray-600">
        <tbody>
          {Array.from({ length: boardDimension }, (_, i) => i)
            .filter((i) => i % (boardDimension === 9 ? 3 : 2) === 0)
            .map((startRow, quadrantRowIndex) => (
              <tr key={quadrantRowIndex}>
                {Array.from({ length: boardDimension }, (_, i) => i)
                  .filter((i) => i % (boardDimension === 9 ? 3 : 2) === 0)
                  .map((startCol, quadrantColIndex) => (
                    <td key={quadrantColIndex} className="border-0 bg-gray-800">
                      {renderSubgrid(startRow, startCol, quadrantRowIndex * (boardDimension === 9 ? 3 : 2) + quadrantColIndex)}
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


