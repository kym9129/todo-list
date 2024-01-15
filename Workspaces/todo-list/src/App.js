import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // 임시 데이터
    const tempData = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: false },
    ];
    setTasks(tempData);
  }, []);

  const addTask = () => {
    if (!newTask) return;
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTaskObj = { id: newId, title: newTask };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
  };


  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <input 
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            <span className="task-title">{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
