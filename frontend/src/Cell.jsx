import PropTypes from "prop-types";
import { useMemo } from "react";
import "./cell.css";

function Cell({ row, col, cell, onCellClick, onChange, isSelected, isPrimarySelected }) {
  const { value, notes } = cell;
  const newNotes = useMemo(() => {
    return notes.flat(1);
  }, [notes]);

  const handleOnChange = (e) => {
    if (e.target.value === "0") return;

    // Construct a new cell object with the updated value
    const updatedCell = {
      ...cell, // Copy the existing cell object
      value: e.target.value, // Update the value
    };
    onChange(updatedCell);
  };

  return (
    <>
      {value > 0 ? (
        <input
          type="text"
          className={`m-0 h-14 w-14 cursor-default border border-gray-800 text-center caret-transparent focus:outline-none ${
            isSelected ? "bg-[#98FBCB]" : "" // Darker color when selected
          } ${isPrimarySelected ? "bg-#7FCFA8-400 text-white" : ""}`}
          value={value == -1 ? "" : value}
          onChange={handleOnChange}
          onClick={() => onCellClick({ row, col })}
          maxLength="1"
          style={{ fontSize: "32px" }} // Increased font size
        />
      ) : (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className={`m-0 h-14 w-14 cursor-default border border-gray-800 text-center caret-transparent focus:outline-none ${
              isSelected ? "bg-[#98FBCB]" : "" // Darker color when selected
            } ${isPrimarySelected ? "bg-#7FCFA8-400 text-white" : ""}`}
            value={""}
            onChange={handleOnChange}
            onClick={() => onCellClick({ row, col })}
            maxLength="1"
            style={{ fontSize: "20px" }} // Increased font size
          />
          <div className="sudoku-notes-container m-0 h-14 w-14">
            {[...Array(3)].map((_, noteRowIndex) => {
              return (
                <div className="sudoku-notes-row" key={noteRowIndex}>
                  {[...Array(3)].map((i, noteValueIndex) => {
                    const noteValue = noteRowIndex * 3 + noteValueIndex + 1;
                    return (
                      <div key={i}>
                        {newNotes.includes(noteValue) ? <div className="note-block">{noteValue} </div> : <div className="note-block" />}
                      </div>
                    );
                  })}
                </div>
              );
            })}
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
