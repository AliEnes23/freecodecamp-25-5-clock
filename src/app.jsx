import React, { useState, useEffect } from "react";

function App() {
  const [sessionLength, setSessionLength] = useState(25); // Default session length
  const [breakLength, setBreakLength] = useState(5);    // Default break length
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60); // Time in seconds (initially set to sessionLength)
  const [isRunning, setIsRunning] = useState(false);  // Timer running status
  const [isSession, setIsSession] = useState(true);   // Is it a session or break?

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setIsRunning(false);
    setIsSession(true);
    setTimeLeft(25 * 60); // Reset time left to initial session length
  };

  const handleIncrement = (type) => {
    if (type === "session" && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60); // Update timeLeft when session is incremented
    }
    if (type === "break" && breakLength < 60) setBreakLength(breakLength + 1);
  };

  const handleDecrement = (type) => {
    if (type === "session" && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60); // Update timeLeft when session is decremented
    }
    if (type === "break" && breakLength > 1) setBreakLength(breakLength - 1);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) return prevTime - 1;
          if (isSession) {
            setIsSession(false);
            return breakLength * 60;  // Switch to break time
          } else {
            setIsSession(true);
            return sessionLength * 60; // Switch to session time
          }
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionLength, breakLength, isSession]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div id="pomodoro-timer">
      <div id="break-label">Break Length</div>
      <div id="break-length">{breakLength}</div>
      <button id="break-decrement" onClick={() => handleDecrement("break")}>-</button>
      <button id="break-increment" onClick={() => handleIncrement("break")}>+</button>

      <div id="session-label">Session Length</div>
      <div id="session-length">{sessionLength}</div>
      <button id="session-decrement" onClick={() => handleDecrement("session")}>-</button>
      <button id="session-increment" onClick={() => handleIncrement("session")}>+</button>

      <div id="timer-label">{isSession ? "Session" : "Break"}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>

      <button id="start_stop" onClick={handleStartStop}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={handleReset}>Reset</button>

      <audio id="beep" src="https://www.soundjay.com/button/beep-07.wav" preload="auto"></audio>
    </div>
  );
}

export default App;
