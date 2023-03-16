import React, { useState, useEffect } from 'react';

//TODO SOME STUFF

function DataComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleButtonClick() {
    setIsLoading(true);
    fetch('http://localhost:5000/data')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    handleButtonClick();
  }, []);

  return (
    <div>
      <button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get new data'}
      </button>

          <div>
      {Object.keys(data).map((key) => (
        <div key={key}>
          <span>{key}: </span>
          <span>{data[key]}</span>
        </div>
      ))}
    </div>

    </div>
  );
}

function App() {
  return (
    <div>
      <DataComponent />
      <h1>hello</h1>
    </div>
  );
}

export default App;