import React, {
  unstable_ConcurrentMode as ConcurrentMode,
  unstable_Suspense as Suspense,
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import { createFetcher } from './cache';

const DataResource = createFetcher(() =>
  fetch(`/.netlify/functions/hello?q=1`).then(x => x.json())
);

function LambdaDemo() {
  const msg = DataResource.read();
  return <p>{JSON.stringify(msg)}</p>;
}

class App extends Component {
  render() {
    return (
      <ConcurrentMode>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Suspense maxDuration={1000} fallback={'Loading...'}>
              <LambdaDemo />
            </Suspense>
          </header>
        </div>
      </ConcurrentMode>
    );
  }
}

export default App;
