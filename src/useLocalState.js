import React from 'react';

const noop = () => {};
export default function useLocalStorage(key, optionalCallback = noop) {
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    // chose to make this async
    const existingValue = localStorage.getItem(key);
    if (existingValue) {
      const parsedValue = JSON.parse(existingValue);
      setState(parsedValue);
      optionalCallback(parsedValue);
    }
  }, []);
  const removeItem = () => {
    setState(null);
    localStorage.removeItem(key);
    optionalCallback(null);
  };
  const setItem = obj => {
    setState(obj);
    localStorage.setItem(key, JSON.stringify(obj));
    optionalCallback(obj);
  };
  return [state, setItem, removeItem];
}
