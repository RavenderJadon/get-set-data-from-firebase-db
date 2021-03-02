import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./fire";
import firebase from "firebase";

const useLogger = (logItem) => {
  useEffect(() => {
    console.log("%c Change accured ----------------------", "color: green;");
    console.log(logItem);
    console.log("%c Change finished ----------------------", "color: red;");
  }, [logItem]);
};

function App() {
  const [inputState, setInputState] = useState("");
  const [listInputState, setListInputState] = useState([]);

  useLogger(listInputState);

  // console.log("listInputState", listInputState);

  useEffect(() => {
    getData();
  }, []);

  const addToFireDB = (e) => {
    e.preventDefault();
    if (inputState !== "") {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: inputState,
      });
    }
    setInputState("");
  };

  const getData = () => {
    db.collection("todos").onSnapshot((querySnapshot) => {
      setListInputState(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
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
      <div>
        {listInputState.map((item) => {
          return (
            <div>
              <p>{item.todo}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
