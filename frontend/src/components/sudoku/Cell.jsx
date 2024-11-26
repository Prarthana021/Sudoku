import PropTypes from "prop-types";
import { useMemo } from "react";
import "./cell.css";

function Cell({ row, col, cell, onCellClick, onChange, isSelected, isPrimarySelected }) {
  // Flatten notes array
  const { value, notes } = cell;
  const newNotes = useMemo(() => notes.flat(1), [notes]);

  const handleOnChange = (e) => {
    if (e.target.value === "0") return;  // Don't change if 0 is entered

    // Update the value of the cell
    const updatedCell = { ...cell, value: e.target.value };
    onChange(updatedCell);
  };

  return (
    <>
      {value > 0 ? (
        <input
          type="text"
          className={`m-0 h-14 w-14 cursor-default border text-center rounded-lg shadow-md transition-all duration-200 
          ${isSelected ? "bg-gray-200 border-blue-400" : "border-gray-800"}
          ${isPrimarySelected ? "bg-green-500 text-black" : ""}
          hover:bg-gray-100 focus:ring-2 focus:ring-blue-300`}
          value={value == -1 ? "" : value}
          onChange={handleOnChange}
          onClick={() => onCellClick({ row, col })}
          maxLength="1"
        />
      ) : (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className={`m-0 h-14 w-14 cursor-default border border-gray-800 text-center caret-transparent focus:outline-none 
            ${isSelected ? "bg-gray-200" : ""} ${isPrimarySelected ? "bg-gray-400 text-white" : ""}`}
            value={""}
            onChange={handleOnChange}
            onClick={() => onCellClick({ row, col })}
            maxLength="1"
          />
          <div className="sudoku-notes-container">
            {[...Array(3)].map((_, noteRowIndex) => (
              <div className="sudoku-notes-row" key={noteRowIndex}>
                {[...Array(3)].map((_, noteValueIndex) => {
                  const noteValue = noteRowIndex * 3 + noteValueIndex + 1;
                  return (
                    <div key={noteValueIndex}>
                      {newNotes.includes(noteValue) ? (
                        <div className="note-block bg-black-100 rounded-full text-blue-600 font-semibold shadow-sm">
                          {noteValue}
                        </div>
                      ) : (
                        <div className="note-block" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape({
    value: PropTypes.number.isRequired,
    notes: PropTypes.arrayOf(PropTypes.array).isRequired,
  }).isRequired,
  onCellClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isPrimarySelected: PropTypes.bool.isRequired,
};

export default Cell;


