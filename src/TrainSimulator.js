import React, { useState } from 'react';

function useSimulation() {
  const [speed, setSpeed] = useState(0);
  const [throttle, setThrottle] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  function startSimulation() {
    const newIntervalId = setInterval(() => {
      const simulationData = { speed, throttle, pressure };
      console.log(simulationData);
    }, 1000);

    setIntervalId(newIntervalId);
  }

  function stopSimulation() {
    clearInterval(intervalId);
    setIntervalId(null);
  }

  function handleSpeedChange(event) {
    setSpeed(parseInt(event.target.value));
 
  }

  function handleThrottleChange(event) {
    setThrottle(parseInt(event.target.value));

  }

  function handlePressureChange(event) {
    setPressure(parseInt(event.target.value));

  }

  return {
    speed,
    throttle,
    pressure,
    intervalId,
    startSimulation,
    stopSimulation,
    handleSpeedChange,
    handleThrottleChange,
    handlePressureChange,
  };
}

function TrainSimulator() {
  const {
    speed,
    throttle,
    pressure,
    intervalId,
    startSimulation,
    stopSimulation,
    handleSpeedChange,
    handleThrottleChange,
    handlePressureChange,
  } = useSimulation();

  function stopSimulationHandler() {
    stopSimulation();
  }

  React.useEffect(() => {
    if (intervalId) {
      const simulationData = { speed, throttle, pressure };
      console.log(simulationData);
    }
  }, [speed, throttle, pressure, intervalId]);

  return (
    <div>
      <h1>Train Simulator</h1>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Speed</h5>
              <input type="range" min="0" max="100" value={speed} className="slider" id="speed-slider" onChange={handleSpeedChange} />
              <p className="card-text text-center">{speed}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Throttle</h5>
              <input type="range" min="0" max="100" value={throttle} className="slider" id="throttle-slider" onChange={handleThrottleChange} />
              <p className="card-text text-center">{throttle}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pressure</h5>
              <input type="range" min="0" max="100" value={pressure} className="slider" id="pressure-slider" onChange={handlePressureChange} />
              <p className="card-text text-center">{pressure}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col text-center">
          <button type="button" className="btn btn-success" onClick={startSimulation}>Play</button>
        </div>

        <div className="col text-center">
          <button type="button" className="btn btn-danger" onClick={stopSimulationHandler} disabled={!intervalId}>Stop</button>
        </div>
      </div>
    </div>
 

  );
}

export default TrainSimulator;