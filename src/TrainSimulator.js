import React, { useState, useEffect, useRef } from 'react';

function TrainSimulator() {
  const [speed, setSpeed] = useState(0);
  const [throttle, setThrottle] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        console.log({ speed, throttle, pressure });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, speed, throttle, pressure]);

  const startSimulation = () => {
    setIsRunning(true);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleThrottleChange = (event) => {
    setThrottle(event.target.value);
  };

  const handlePressureChange = (event) => {
    setPressure(event.target.value);
  };


  return (
    <div>
      <div>
        <label htmlFor="speed">Speed:</label>
        <input
          type="range"
          id="speed"
          name="speed"
          min="0"
          max="100"
          value={speed}
          onChange={handleSpeedChange}
        />
        <span>{speed}</span>
      </div>
      <div>
        <label htmlFor="throttle">Throttle:</label>
        <input
          type="range"
          id="throttle"
          name="throttle"
          min="0"
          max="100"
          value={throttle}
          onChange={handleThrottleChange}
        />
        <span>{throttle}</span>
      </div>
      <div>
        <label htmlFor="pressure">Pressure:</label>
        <input
          type="range"
          id="pressure"
          name="pressure"
          min="0"
          max="100"
          value={pressure}
          onChange={handlePressureChange}
        />
        <span>{pressure}</span>
      </div>
      <div>
        {isRunning ? (
          <button onClick={stopSimulation}>Stop</button>
        ) : (
          <button onClick={startSimulation}>Start</button>
        )}
      </div>
    </div>
  );
}


export default TrainSimulator;