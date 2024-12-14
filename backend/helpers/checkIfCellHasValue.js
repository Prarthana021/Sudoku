//Gurpreet

const checkIfCellHasValue = (board, row, col) => {
  if (board["problemBoard"][row][col].value === -1) {
    return false;
  }
  return true;
};
export default checkIfCellHasValue;
