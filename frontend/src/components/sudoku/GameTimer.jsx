import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const GameTimer = ({ currentGameId }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setSeconds(0);
    setIsActive(false);
  }, [currentGameId]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const secs = totalSeconds - hours * 3600 - minutes * 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      <h3 >
        <b style={{ fontSize: "24px" }}>⏰ {formatTime(seconds)}</b>
        <button
          onClick={togglePause}
          style={{
            marginLeft: "10px",
            border: "1px solid #1F2937", // Dark gray border
            backgroundColor: "#1F2937", // Dark gray background
            color: "white",
            padding: "5px 20px",
            cursor: "pointer",
            fontSize: "16px", // Button text size
          }}
        >
          {isActive ? "Pause" : seconds === 0 ? "Start" : "Resume"}
        </button>
      </h3>
    </div>
  );
};

GameTimer.propTypes = {
  currentGameId: PropTypes.string.isRequired,
};

export default GameTimer;
