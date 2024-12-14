// Gurpreet
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Settings() {
	const [volume, setLocalVolume] = useState(0.5); // Default volume: 50%

	  const inputStyle = {
		      padding: "10px",
		      borderRadius: "5px",
		      border: "1px solid #ccc",
		      marginLeft: "10px",
		    };

	  const buttonStyle = {
		      padding: "10px 20px",
		      backgroundColor: "#BFFFED",
		      border: "none",
		      borderRadius: "5px",
		      cursor: "pointer",
		    };
	   const handleVolumeChange = (e) => {
		     const newVolume = parseFloat(e.target.value);
		     setLocalVolume(newVolume);
		     setVolume(newVolume); // Update parent state
		    };

	  return (
		      <div
		        style={{
				        backgroundColor: "#7FCFA8",
					        height: "100vh",
					        display: "flex",
					        flexDirection: "column",
					        alignItems: "center",
					        padding: "20px",
					      }}
		      >
		        <h1>Settings</h1>
		        <div style={{ marginBottom: "20px" }}>
		          <label>Music:</label>
		          <select style={inputStyle}>
		            <option>Classical</option>
		            <option>Jazz</option>
		            <option>Pop</option>
		          </select>
		        </div>
		        <div style={{ marginBottom: "20px" }}>
		          <label>Volume:
		  	<input
		            type="range"
		            min="0"
		            max="1"
		            step="0.01"
		            value={volume}
		            onChange={handleVolumeChange}
		          />
		  </label>
		        </div>
		        <div style={{ marginBottom: "20px" }}>
		          <label>Theme:</label>
		          <select style={inputStyle}>
		            <option>Light</option>
		            <option>Dark</option>
		          </select>
		        </div>
		        <button style={buttonStyle}>
		          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
		            Back to Home
		          </Link>
		        </button>
		      </div>
		    );
}

export default Settings;

