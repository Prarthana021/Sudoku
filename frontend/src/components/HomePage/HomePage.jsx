//Gurpreet
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px",
    backgroundColor: "#BFFFED",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        backgroundColor: "#98FBCB",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
    {/* Background Image */}
      <img
        src="/background.avif" // Replace with your actual image path
        alt="Background"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%", // Adjust as needed
          height: "auto",
          zIndex: 1,
          opacity: 0.3, // Optional: to make it semi-transparent
        }}
      />
      {/* Image Above Title */}
      <img
        src="/sudoku-white-small.png" // Adjust path if needed
        alt="Sudoku Icon"
        style={{
          width: "100px", // Adjust size as necessary
          height: "auto",
          marginBottom: "20px", // Add spacing between the image and the title
        }}
      />

      {/* Title and Buttons */}
      <h1 style={{ zIndex: 2 }}>Sudoku King</h1>
      <button style={{ ...buttonStyle, zIndex: 2 }}>
        <Link to="/play" style={{ textDecoration: "none", color: "black" }}>
          Play
        </Link>
      </button>
      <button style={{ ...buttonStyle, zIndex: 2 }}>
        <Link to="/settings" style={{ textDecoration: "none", color: "black" }}>
          Settings
        </Link>
      </button>
      <button style={{ ...buttonStyle, zIndex: 2 }}>
        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
          Login/Sign-Up
        </Link>
      </button>
    </div>
  );
}

export default HomePage;
