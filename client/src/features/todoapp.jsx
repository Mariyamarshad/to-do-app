import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../features/todo/todoSlice";

const TodoApp = () => {
  const [text, setText] = useState('');
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch(addTodo({ text }));
    setText("");
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="input-task"
        />
        <button onClick={handleAdd} className="btn-add" disabled={!text.trim()}>
          Add
        </button>
      </div>

      <button onClick={() => dispatch(fetchTodos()) &&  setShow(true)} className="add-btn">
        Get All Tasks
      </button>
      <button onClick={() => setShow(false)} className="add-btn">
        Hide tasks
      </button>

      <div>
        {status === "loading" && <p>Loading tasks...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        {show && status === "succeeded" && (
          <ol>
            {items.map((todo) => (
              <li key={todo._id}>
                {todo.text} | <strong>{todo.completed ? "Completed" : "Pending"}</strong>
                <button
                  onClick={() =>
                    dispatch(
                      updateTodo({ id: todo._id, completed: !todo.completed })
                    )
                  }
                >
                  {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button onClick={() => dispatch(deleteTodo(todo._id))}>
                  Delete
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
