import React, { useState, useEffect } from 'react';

const windowSize = 10; // Adjust the window size as needed

const fetchNumbers = async (numberId) => {
  try {
    const response = await fetch(`http://localhost:9876/numbers/${numberId}`);
    if (!response.ok) {
      throw new Error('Error fetching numbers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('');
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchNumbers(numberId);
      if (data) {
        setWindowPrevState(data.windowPrevState);
        setWindowCurrState(data.windowCurrState);
        setNumbers(data.numbers);
        setAverage(data.avg);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="numberId">Number ID:</label>
      <input type="text" id="numberId" value={numberId} onChange={(e) => setNumberId(e.target.value)} />
      <button onClick={handleFetch}>Fetch</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        <p>Window Previous State:</p>
        <pre>{JSON.stringify(windowPrevState)}</pre>
      </div>

      <div>
        <p>Window Current State:</p>
        <pre>{JSON.stringify(windowCurrState)}</pre>
      </div>

      <div>
        <p>Numbers:</p>
        <pre>{JSON.stringify(numbers)}</pre>
      </div>

      <div>
        <p>Average:</p>
        <p>{average}</p>
      </div>
    </div>
  );
};

export default AverageCalculator;