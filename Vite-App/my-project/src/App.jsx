import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Format time into HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return {
      hours: String(hrs).padStart(2, "0"),
      minutes: String(mins).padStart(2, "0"),
      seconds: String(secs).padStart(2, "0"),
    };
  };

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

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-100 selection:bg-zinc-850 selection:text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-zinc-800/10 blur-[128px]" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-zinc-900/10 blur-[128px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/5 border border-zinc-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-black/40 flex flex-col items-center">
        <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-2">
          Precision Timer
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-8">
          Stopwatch
        </h1>

        {/* Time Display */}
        <div className="flex items-center justify-center space-x-4 mb-10 bg-zinc-900/50 px-8 py-6 rounded-2xl border border-zinc-800 w-full font-mono text-5xl md:text-6xl font-medium tracking-wider">
          <div className="flex flex-col items-center">
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{hours}</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2 font-sans font-semibold">hr</span>
          </div>
          <span className="text-zinc-600 animate-pulse -mt-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{minutes}</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2 font-sans font-semibold">min</span>
          </div>
          <span className="text-zinc-600 animate-pulse -mt-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">{seconds}</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2 font-sans font-semibold">sec</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={toggleTimer}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold tracking-wide transition-all duration-300 transform active:scale-95 shadow-lg cursor-pointer ${
              running
                ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 shadow-zinc-800/10 hover:shadow-zinc-700/25"
                : "bg-white hover:bg-zinc-200 text-zinc-950 shadow-white/10 hover:shadow-zinc-200/25"
            }`}
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="flex-1 py-4 px-6 rounded-xl font-semibold tracking-wide bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-all duration-300 transform active:scale-95 shadow-lg shadow-black/20 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
