import { useState } from "react";
import "./App.css";

function App() {
  const [inputState, setInputState] = useState("");

  const addToFireDB = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>set and get data from db</h1>
      <form onSubmit={addToFireDB}>
        <label>add data to db</label>
        <input
          type="text"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
