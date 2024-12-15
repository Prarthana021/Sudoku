// Gurpreet 
import logo from "../../assets/sudoku-white-small.png";

function Logo() {
  return (
    <div className="flex justify-center items-center w-full">
    <a className="flex items-center" href="/">
      <img className="mr-4 w-14 h-16" src={logo} alt="Sudoku Logo" /> {/* Adjust width and height */}
      <span className="text-2xl font-mono text-black hover:text-gray-300">Sudoku King</span> {/* Reduced text size */}
    </a>
    </div>
  );
}

export default Logo;
