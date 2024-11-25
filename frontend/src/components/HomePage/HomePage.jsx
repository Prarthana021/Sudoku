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
					      }}
		      >
		        <h1>Sudoku King</h1>
		        <button style={buttonStyle}>
		          <Link to="/play" style={{ textDecoration: "none", color: "black" }}>
		            Play
		          </Link>
		        </button>
		        <button style={buttonStyle}>
		          <Link to="/settings" style={{ textDecoration: "none", color: "black" }}>
		            Settings
		          </Link>
		        </button>
		        <button style={buttonStyle}>
		          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
		            Login/Sign-Up
		          </Link>
		        </button>
		      </div>
		    );
}

export default HomePage;

