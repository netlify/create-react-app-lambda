import React, { useState, useRef } from 'react';

function TrainSimulator() {
  const [speed, setSpeed] = useState(0);
  const [throttle, setThrottle] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startSimulation = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      console.log({ speed, throttle, pressure });
    }, 1000);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

 function handleChange(event) {
    const { name, value } = event.target;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  }

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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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