import React from "react";

const Timer = ({ timeLeft, formatTime, onBreak, handleStartStop, handleReset }) => (
  <div className="timer">
    <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
    <div id="time-left">{formatTime(timeLeft)}</div>
    <div className="timer-controls">
      <button id="start_stop" onClick={handleStartStop}>
        {">"} / ||
      </button>
      <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  </div>
);

export default Timer;
