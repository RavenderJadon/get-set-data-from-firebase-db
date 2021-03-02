import { useState } from "react";
import { db } from "./fire";

const Todo = ({ todo, inprogress, id }) => {
  const [state, setstate] = useState(false);
  const [updateTodo, setUdatedTodo] = useState("");

  const changeInProgress = () => {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
  };

  const updateInputText = () => {
    if (updateTodo !== "") {
      db.collection("todos").doc(id).update({
        todo: updateTodo,
      });
      alert("updated");
    } else {
      setstate(!state);
    }
    setUdatedTodo("");
  };

  const deleteTodo = () => {
    db.collection("todos").doc(id).delete();
  };

  return (
    <div className="border">
      <h1>{todo}</h1>
      <p>{inprogress ? "inppogress" : "completed"}</p>
      {state === true && (
        <div style={{ display: "flex" }}>
          <label>edit todo</label>
          <input
            type="text"
            value={updateTodo}
            onChange={(e) => setUdatedTodo(e.target.value)}
          />
          <button onClick={updateInputText}>update</button>
        </div>
      )}
      <button onClick={() => setstate(!state)}>edit todo</button>
      <button onClick={changeInProgress}>
        {inprogress ? "done" : "unDone"}
      </button>
      <button onClick={deleteTodo}>delete</button>
    </div>
  );
};

export default Todo;
