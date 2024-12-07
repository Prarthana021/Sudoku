import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { useSudokuGrid } from "../../hooks/useSudokuGrid";

export const SudokuBoardContext = createContext();

export const useSudokuBoard = () => useContext(SudokuBoardContext);

export const SudokuBoardProvider = ({ size, currentGameId, children }) => {
  const sudokuBoard = useSudokuGrid(size, currentGameId);

  const contextValue = {
    ...sudokuBoard,
  };
  return <SudokuBoardContext.Provider value={contextValue}>{children}</SudokuBoardContext.Provider>;
};

SudokuBoardProvider.propTypes = {
  size: PropTypes.number.isRequired,
  currentGameId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
