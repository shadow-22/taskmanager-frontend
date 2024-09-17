import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tasks/', {
          headers: { Authorization: `Token ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        setError('Failed to load tasks.');
      }
    };

    fetchTasks();
  }, [token]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/tasks/', newTask, {
        headers: { Authorization: `Token ${token}` },
      });
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      setError('Failed to add task.');
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} token={token} setTasks={setTasks} tasks={tasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;