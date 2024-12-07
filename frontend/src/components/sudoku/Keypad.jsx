import PropTypes from "prop-types";

function Keypad({ onKeypadClick, boardDimension }) {
  let keypadNumbers;
  switch (boardDimension) {
    case 4:
      keypadNumbers = [1, 2, 3, 4];
      break;
    case 9:
      keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      break;
    default:
      keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  return (
    <div className="grid grid-cols-3 gap-2 justify-center">
      {keypadNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onKeypadClick(number)}
          className="border-4 border-[#558B71] text-[#558B71] rounded-full text-3xl h-20 w-20 flex items-center justify-center hover:bg-gray-300"
        >
          {number}
        </button>
      ))}
    </div>
  );
}

Keypad.propTypes = {
  onKeypadClick: PropTypes.func.isRequired,
  boardDimension: PropTypes.number.isRequired,
};

export default Keypad;


