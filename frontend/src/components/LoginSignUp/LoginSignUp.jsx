// Akash
import React, { useState } from "react";

function LoginSignUp() {
	  const [isSignUp, setIsSignUp] = useState(false);

	  const formStyle = {
		      backgroundColor: "#BFFFED",
		      padding: "20px",
		      borderRadius: "10px",
		      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
		    };

	  const inputStyle = {
		      display: "block",
		      margin: "10px 0",
		      padding: "10px",
		      width: "100%",
		      borderRadius: "5px",
		      border: "1px solid #ccc",
		    };

	  const buttonStyle = {
		      marginTop: "10px",
		      padding: "10px 20px",
		      backgroundColor: "#7FCFA8",
		      border: "none",
		      borderRadius: "5px",
		      cursor: "pointer",
		    };

	  return (
		      <div
		        style={{
				        backgroundColor: "#7FCFA8",
					        height: "100vh",
					        display: "flex",
					        justifyContent: "center",
					        alignItems: "center",
					      }}
		      >
		        <div style={formStyle}>
		          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
		          {isSignUp ? (
				            <>
				              <input type="text" placeholder="First Name" style={inputStyle} />
				              <input type="text" placeholder="Last Name" style={inputStyle} />
				              <input type="date" style={inputStyle} />
				              <input type="text" placeholder="Phone Number" style={inputStyle} />
				              <input type="email" placeholder="Email" style={inputStyle} />
				              <input
				                type="text"
				                placeholder="Social Security Number"
				                style={inputStyle}
				              />
				              <input type="text" placeholder="Username" style={inputStyle} />
				              <input type="password" placeholder="Password" style={inputStyle} />
				            </>
				          ) : (
						            <>
						              <input type="text" placeholder="Username" style={inputStyle} />
						              <input type="password" placeholder="Password" style={inputStyle} />
						            </>
						          )}
		          <button
		            style={buttonStyle}
		            onClick={() =>
				                alert(`${isSignUp ? "Sign Up" : "Login"} Successful`)
				              }
		          >
		            {isSignUp ? "Sign Up" : "Login"}
		          </button>
		          <button
		            style={{ ...buttonStyle, backgroundColor: "#558B71" }}
		            onClick={() => setIsSignUp(!isSignUp)}
		          >
		            {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
		          </button>
		        </div>
		      </div>
		    );
}

export default LoginSignUp;

