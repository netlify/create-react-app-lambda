import React, { useState } from "react";
import { Slider } from 'react-bootstrap';

function TrainSimulator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(50);
  const [throttle, setThrottle] = useState(50);
  const [pressure, setPressure] = useState(50);

  const handleSpeedChange = (event, value) => {
    setSpeed(value);
  };

  const handleThrottleChange = (event, value) => {
    setThrottle(value);
  };

  const handlePressureChange = (event, value) => {
    setPressure(value);
  };

  const startSimulation = () => {
    setIsPlaying(true);
    setIntervalId(
      setInterval(() => {
        const data = {
          speed,
          throttle,
          pressure,
        };
        console.log(data);
      }, 1000)
    );
  };

  const stopSimulation = () => {
    setIsPlaying(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <div>
      <h1>Train Simulator</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h2>Speed</h2>
          <Slider
            value={speed}
            min={0}
            max={100}
            onChange={handleSpeedChange}
            aria-labelledby="speed-slider"
          />
          <p style={{ textAlign: "center" }}>{speed}</p>
        </div>
        <div>
          <h2>Throttle</h2>
          <Slider
            value={throttle}
            min={0}
            max={100}
            onChange={handleThrottleChange}
            aria-labelledby="throttle-slider"
          />
          <p style={{ textAlign: "center" }}>{throttle}</p>
        </div>
        <div>
          <h2>Pressure</h2>
          <Slider
            value={pressure}
            min={0}
            max={100}
            onChange={handlePressureChange}
            aria-labelledby="pressure-slider"
          />
          <p style={{ textAlign: "center" }}>{pressure}</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button disabled={isPlaying} onClick={startSimulation}>
          Play
        </button>
        <button disabled={!isPlaying} onClick={stopSimulation}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default TrainSimulator;
