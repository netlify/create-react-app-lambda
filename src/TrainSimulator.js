import React, { useState } from 'react';

const Simulator = () => {
  const [sliderValues, setSliderValues] = useState({
    speed: 0,
    throttle: 0,
    pressure: 0
  });

  const [intervalId, setIntervalId] = useState(null);

  const getSliderValues = () => {
    const newValues = { ...sliderValues };
    for (const key in sliderValues) {
      if (sliderValues.hasOwnProperty(key)) {
        newValues[key] = document.getElementById(key).value;
      }
    }
    setSliderValues(newValues);
    console.log(newValues);
  };

  const startSimulation = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    const id = setInterval(getSliderValues, 1000);
    setIntervalId(id);
  };

  const stopSimulation = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <div>
      <h1>Train Simulator</h1>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Speed</h5>
              <input type="range" min="0" max="100" value={sliderValues.speed} className="slider" id="speed-slider" onChange={handleSpeedChange} />
              <p className="card-text text-center">{speed}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Throttle</h5>
              <input type="range" min="0" max="100" value={sliderValues.throttle} className="slider" id="throttle-slider" onChange={handleThrottleChange} />
              <p className="card-text text-center">{throttle}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pressure</h5>
              <input type="range" min="0" max="100" value={sliderValues.pressure} className="slider" id="pressure-slider" onChange={handlePressureChange} />
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