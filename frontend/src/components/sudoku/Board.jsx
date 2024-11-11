import { useEffect, useCallback, useState } from "react";
import Cell from "./Cell";

import Keypad from "./Keypad";
import PropTypes from "prop-types";
import { useSudokuBoard } from "../providers/board-provider";
import GameTimer from "./GameTimer";

function Board({ currentGameId, setCurrentGameId, addNoteMode, boardDimension, setBoardDimension }) {
  const { sudokuGrid, setSudokuGrid, handleCellChange, selectedCell, setSelectedCell } = useSudokuBoard(); // Context
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      setIsLoading(true);
      let data;
      if (currentGameId !== "") {
        // Load existing game
        console.log("Found existing game id in local storage, loading it:", currentGameId);
        data = await getSingleGameById(currentGameId);
        setBoardDimension(data.game.dimension);
      } else {
        // Load a new game
        console.log("Did not find game id in local storage, load new game:");
        data = await (boardDimension == 9 ? getNineBoard() : getFourBoard());
        setCurrentGameId(data.game._id);
      }
      setSudokuGrid(data.game.problemBoard);
      setIsLoading(false);
    };

    fetchGame();
  }, [currentGameId, setCurrentGameId, setSudokuGrid, boardDimension, setBoardDimension]);

  const handleArrowKeys = useCallback(
    (e) => {
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
    },
    [selectedCell, setSelectedCell, boardDimension],
  );

  const handlePhysicalKeyboardInput = useCallback(
    (e) => {
      console.log("HandlePhysicalKeyboardInput");
      const value = e.key;
      if (selectedCell.row == null || selectedCell.col == null) {
        return;
      }

      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        handleCellChange(selectedCell.row, selectedCell.col, 0 - 1, addNoteMode);
      } else if (/^[1-9]$/.test(e.key)) {
        handleCellChange(selectedCell.row, selectedCell.col, value, addNoteMode);
      }
    },
    [selectedCell, handleCellChange, addNoteMode],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeys);
    document.addEventListener("keydown", handlePhysicalKeyboardInput);
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
      document.removeEventListener("keydown", handlePhysicalKeyboardInput);
    };
  }, [selectedCell, handleArrowKeys, handlePhysicalKeyboardInput]);

  const handleKeypadClick = (value) => {
    console.log("Keypad click");
    if (selectedCell.row !== null && selectedCell.col !== null) {
      handleCellChange(selectedCell.row, selectedCell.col, value, addNoteMode);
    }
  };

  const isGridReady = sudokuGrid.length === boardDimension && sudokuGrid.every((row) => row.length === boardDimension);

  if (!isGridReady || isLoading) {
    const placeholderCellProps = {
      cell: {
        value: -1,
        notes: [[], [], []],
      },
      isSelected: false,
      isPrimarySelected: false,
      onCellClick: () => {}, // No-op function
      onChange: () => {}, // No-op function
    };

    const subgridSize = boardDimension === 9 ? 3 : 2;

    return (
      <div className="flex flex-col items-center md:flex-row">
        <table className="mb-4 border">
          <tbody>
            {Array.from({ length: boardDimension }, (_, i) => i)
              .filter((i) => i % subgridSize === 0)
              .map((startRow, quadrantRowIndex) => (
                <tr key={quadrantRowIndex}>
                  {Array.from({ length: boardDimension }, (_, i) => i)
                    .filter((i) => i % subgridSize === 0)
                    .map((startCol, quadrantColIndex) => (
                      <td key={quadrantColIndex} className="border-0 bg-gray-800">
                        <table className={`subgrid`}>
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
                                  return (
                                    <div key={`cell-${cellRow}-${cellCol}`}>
                                      <Cell {...placeholderCellProps} />
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>{" "}
                        </table>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
        <div className="md:ml-6 md:mt-10">
          <center className="mb-3">
            <GameTimer currentGameId={currentGameId} />
          </center>
          <Keypad onKeypadClick={handleKeypadClick} />
        </div>
      </div>
    );
  }

  const isSelectedQuadrant = (row, col) => {
    const selectedRow = selectedCell.row;
    const selectedCol = selectedCell.col;
    return (
      selectedRow !== null &&
      selectedCol !== null &&
      Math.floor(row / 3) === Math.floor(selectedRow / 3) &&
      Math.floor(col / 3) === Math.floor(selectedCol / 3)
    );
  };

  const getQuadrantColor = (quadrantIndex) => (quadrantIndex % 2 === 0 ? "bg-white" : "bg-yellow-100");

  // const subgridSize = Math.sqrt(size);
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
              const isSelected = selectedCell.row === cellRow || selectedCell.col === cellCol || isSelectedQuadrant(cellRow, cellCol);
              return (
                <div
                  key={`cell-${cellRow}-${cellCol}`}
                  className={`
              cell 
              ${rowIndex > 0 && "border-top"}
              ${colIndex > 0 && "border-left"}
              ${rowIndex === 2 && "border-bottom"}
              ${colIndex === 2 && "border-right"}
              ${getQuadrantColor(quadrantIndex)}
              ${isSelectedQuadrant(startRow + rowIndex, startCol + colIndex) && "bg-gray-200"}
              ${startRow + rowIndex === selectedCell.row && startCol + colIndex === selectedCell.col && "bg-red-500 text-white"}
            `}
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

  return (
    <div className="flex flex-col items-center md:flex-row">
      <table className="mb-4 border border-red-950">
        <tbody>
          {Array.from({ length: boardDimension }, (_, i) => i)
            .filter((i) => i % subgridSize === 0)
            .map((startRow, quadrantRowIndex) => (
              <tr key={quadrantRowIndex}>
                {Array.from({ length: boardDimension }, (_, i) => i)
                  .filter((i) => i % subgridSize === 0)
                  .map((startCol, quadrantColIndex) => (
                    <td key={quadrantColIndex} className="border-0 bg-gray-800">
                      <table className={`subgrid ${getQuadrantColor(3 * quadrantRowIndex + quadrantColIndex)}`}>
                        {renderSubgrid(startRow, startCol, 3 * quadrantRowIndex + quadrantColIndex)}
                      </table>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="top-0 left-10 ml-20">
        {/* <center className="mb-2">
         
        </center> */}
        <div className="absolute top-20 left-100 mt-5">
        <GameTimer />
        </div>
        
        <Keypad onKeypadClick={handleKeypadClick} boardDimension={boardDimension} />
      </div>
    </div>
  );
}

Board.propTypes = {
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  addNoteMode: PropTypes.bool.isRequired,
  setAddNoteMode: PropTypes.func.isRequired,
  boardDimension: PropTypes.number.isRequired,
  setBoardDimension: PropTypes.func.isRequired,
};
export default Board;
