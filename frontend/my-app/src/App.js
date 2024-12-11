import React, { useState, useEffect } from 'react';
import TodoList from './component/TodoList';
const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  // Fetch all todos on initial Load
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err))
  }, []);
  const addTodo = () => {
    fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    })
      .then(res => res.json())
      .then(data => setTodos([...todos, data]))
      .catch(err => console.error(err));
    setInput('');
  }
  return (
    <div>
      <h1>My To-Do List</h1>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App