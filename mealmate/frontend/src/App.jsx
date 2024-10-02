import React, {useEffect, useState} from "react";

function App(){
    const [data, setData] = useState(null);

    useEffect(() => {
    fetch('/api')
        .then(response => response.text())
        .then(data => setData(data));
  }, []);
  
  return (
    <div className="App">
      <h1>React and Node.js Setup</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
