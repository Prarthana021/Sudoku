// Mohammad
import PropTypes from "prop-types";

function Keypad({ onKeypadClick, boardDimension }) {
  let keypadNumbers;
  let styling;
  switch (boardDimension) {
    case 4:
      keypadNumbers = [1, 2, 3, 4];
      styling = "grid-cols-4 md:grid-cols-2";
      break;
    case 9:
      keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      styling = "grid-cols-9 md:grid-cols-3";
      break;
    default:
      keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      styling = "grid-cols-9 md:grid-cols-3";
  }

  return (
    <div className={`grid ${styling}`}>
      {keypadNumbers.map((number) => (
        <div key={number} className="flex justify-center border border-black text-2xl hover:bg-gray-300">
          <button onClick={() => onKeypadClick(number)} className="h-20 w-20 p-4 text-3xl">
            {number}
          </button>
        </div>
      ))}
    </div>
  );
}

Keypad.propTypes = {
  onKeypadClick: PropTypes.func.isRequired,
  boardDimension: PropTypes.number.isRequired,
};
export default Keypad;
