import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Toggle timer state between Running and Paused
  const toggleTimer = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  // Reset the timer completely
  const resetTimer = () => {
    setRunning(false);
    setTime(0);
  };

  // Handle side-effects of changing the 'running' state
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    // Cleanup interval when component unmounts or before running next effect
    return () => clearInterval(intervalRef.current);
  }, [running]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stopwatch</h1>
      <h2>{time}s</h2>
      <button onClick={toggleTimer}>
        {running ? "Pause" : "Start"}
      </button>
      <button onClick={resetTimer} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
}

export default App;
