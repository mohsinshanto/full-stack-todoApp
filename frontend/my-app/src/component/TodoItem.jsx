import React from "react";

const TodoItem = ({ todo, setTodos }) => {
  // Toggle completion status
  const toggleComplete = () => {
    fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos((prev) =>
          prev.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
        );
      })
      .catch((err) => console.error(err));
  };

  // Delete a todo
  const deleteTodo = () => {
    fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "DELETE",
    })
      .then(() => setTodos((prev) => prev.filter((t) => t._id !== todo._id)))
      .catch((err) => console.error(err));
  };

  return (
    <li>
      <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
        {todo.text}
      </span>
      <button onClick={toggleComplete}>
        {todo.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
};

export default TodoItem;
