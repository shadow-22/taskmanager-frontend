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
        const response = await axios.get('/api/tasks/', {
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
      const response = await axios.post('/api/tasks/', newTask, {
        headers: { Authorization: `Token ${token}` },
      });
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      setError('Failed to add task.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Task Manager</h2>
      <form onSubmit={handleAddTask} className="mb-3">
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            placeholder="Enter Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Task Description</label>
          <input
            type="text"
            className="form-control"
            id="taskDescription"
            placeholder="Enter Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}

      <ul className="list-group">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} token={token} setTasks={setTasks} tasks={tasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;