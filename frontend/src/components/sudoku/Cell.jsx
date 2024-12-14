// Prarthana

import PropTypes from "prop-types";
import { useMemo } from "react";
import "./cell.css";

function Cell({ row, col, cell, onCellClick, onChange, isSelected, isPrimarySelected, style }) {
  const { value, notes } = cell;
  const newNotes = useMemo(() => notes.flat(1), [notes]);

  const handleOnChange = (e) => {
    if (e.target.value === "0") return;

    const updatedCell = { ...cell, value: e.target.value };
    onChange(updatedCell);
  };

  return (
    <div
      className={`cell ${
        isPrimarySelected
          ? "bg-primary-selected"
          : isSelected
          ? "bg-highlight"
          : "bg-default"
      }`}
      style={style} 
      onClick={() => onCellClick({ row, col })}
    >
      {value > 0 ? (
        <input
          type="text"
          className="cell-input"
          value={value}
          readOnly
        />
      ) : (
        <div className="sudoku-notes-container">
          {[...Array(3)].map((_, noteRowIndex) => (
            <div className="sudoku-notes-row" key={noteRowIndex}>
              {[...Array(3)].map((_, noteValueIndex) => {
                const noteValue = noteRowIndex * 3 + noteValueIndex + 1;
                return (
                  <div key={noteValueIndex}>
                    {newNotes.includes(noteValue) ? (
                      <div className="note-block">{noteValue}</div>
                    ) : (
                      <div className="note-block" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
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
  style: PropTypes.object, 
};

export default Cell;

