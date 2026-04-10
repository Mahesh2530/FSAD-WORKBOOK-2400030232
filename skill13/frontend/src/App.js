
import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Full Stack Deployment</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
