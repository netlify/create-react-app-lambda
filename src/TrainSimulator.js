import React, { useState } from 'react';

function TrainSimulator() {
  const [speedValue, setSpeedValue] = useState(0);
  const [throttleValue, setThrottleValue] = useState(0);
  const [pressureValue, setPressureValue] = useState(0);

  function startSimulation() {
    const intervalId = setInterval(() => {
      const speedValue = parseInt(document.getElementById('speed-slider').value);
      const throttleValue = parseInt(document.getElementById('throttle-slider').value);
      const pressureValue = parseInt(document.getElementById('pressure-slider').value);
  
      const simulationData = { speed: speedValue, throttle: throttleValue, pressure: pressureValue };
  
      console.log(simulationData);
    }, 1000);
  
    function stopSimulation() {
      clearInterval(intervalId);
    }
    
  }
  

  
  return (
    <div className="container">
      <h1 className="text-center mt-3">Train Simulator</h1>
      <div className="row mt-5">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Speed Dial</h5>
              <p className="card-text text-center">Value: {speedValue}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Throttle</h5>
              <p className="card-text text-center">Value: {throttleValue}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Pressure Gauge</h5>
              <p className="card-text text-center">Value: {pressureValue}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="speed-slider" className="text-center">Speed</label>
            <input type="range" className="form-control-range" id="speed-slider" min="0" max="100" value={speedValue} onChange={(e) => setSpeedValue(e.target.value)} />
            <p className="text-center">Value: {speedValue}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="throttle-slider" className="text-center">Throttle</label>
            <input type="range" className="form-control-range" id="throttle-slider" min="0" max="100" value={throttleValue} onChange={(e) => setThrottleValue(e.target.value)} />
            <p className="text-center">Value: {throttleValue}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="pressure-slider" className="text-center">Pressure</label>
            <input type="range" className="form-control-range" id="pressure-slider" min="0" max="100" value={pressureValue} onChange={(e) => setPressureValue(e.target.value)} />
            <p className="text-center">Value: {pressureValue}</p>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4 offset-4">
          <div className="btn-group btn-block" role="group" aria-label="Play and Stop buttons">
            <button type="button" className="btn btn-success" onClick={startSimulation}>Play</button>
            
            </div>
            </div>
            </div>
            </div>)}

export default TrainSimulator;
