import React, { useState, useEffect, useRef } from "react";
import './App.css';
import TodoList from "./TodoList";

export function App() {
  const [addError, setAddError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [todo, setTodos] = useState([]);
  const [errormessage, setErrorMessage] = useState("");
  const inputTodo = useRef();

  useEffect(() => {
    getAllTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (inputTodo.current.value === "") {
      setErrorMessage("Please enter a todo");
      setAddError(true);
      return;
    }
    const newTodo = {
      todoText: inputTodo.current.value
    }
    inputTodo.current.value = "";
    try {
      const response = await fetch("http://localhost:8000/todos/", {
        method: "POST",
        body: JSON.stringify(newTodo)
      })
      if (!response.status === 200) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
      setAddError(true);
      return;
    }
    getAllTodos();
    setAddError(false);
  }

  const clearTodods = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos/", {
        method: "DELETE"
      })
      if (!response.status === 200) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
      setFetchError(true);
      return;
    }
    getAllTodos();
    setFetchError(false);
  }

  const getAllTodos = async () => {
    let response;
    try {
      response = await fetch("http://localhost:8000/todos/");
      if (!response.status === 200) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      setFetchError(true);
    }
    if (response) {
      const todos = await response.json();
      setTodos(todos);
      setFetchError(false);
    }
  }

  return (
    <div className="App">
      <div className="d-block" >
        <h1>Your todos :</h1>
        {fetchError ? (<p className="error">There was an error while fetching the list of Todos</p>) : <TodoList todos={todo} />}
      </div>
      <div className="d-block">
        <h2>Add a ToDo</h2>
        <form onSubmit={addTodo}>
          <input className="input" type="text" name="todo_text" ref={inputTodo} />
          <div style={{ "marginTop": "5px" }}>
            <button className="button" type="submit">Add a todo</button>
          </div>
        </form>
        <button className="button" onClick={clearTodods}>Clear all todos</button>
        {addError ? (<p className="error">{errormessage}</p>) : (null)}
      </div>
    </div>
  );
}

export default App;
