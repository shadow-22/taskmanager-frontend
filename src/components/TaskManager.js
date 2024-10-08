import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [next, setNext] = useState(null); // To handle pagination
  // uncomment next line(s) if you ever need a button or something to hide/go to previous page
  // const [previous, setPrevious] = useState(null); 
  const token = localStorage.getItem('token');
  const [isCompleted, setIsCompleted] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks/', {
          headers: { Authorization: `Token ${token}` },
          params: { is_completed: isCompleted },
        });
        setTasks(response.data.results); // Extract tasks from response
        setNext(response.data.next); // Set next page URL
        //setPrevious(response.data.previous); // Set previous page URL
      } catch (error) {
        setError('Failed to load tasks.');
      }
    };

    fetchTasks();
  }, [token, isCompleted]);

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

  const handleLoadMore = async () => {
    if (next) {
      try {
        const response = await axios.get(next.replace('http://127.0.0.1:8000', ''), {
          headers: { Authorization: `Token ${token}` },
        });
        setTasks([...tasks, ...response.data.results]); // Append new tasks
        setNext(response.data.next); // Update next URL
        //setPrevious(response.data.previous); // Update previous URL
      } catch (error) {
        setError('Failed to load more tasks.');
      }
    }
  };

  const isCompletedHandler = () => {
    setIsCompleted(true); 
  };

  const NotCompletedHandler = () => {
    setIsCompleted(false); 
  };

  const resetIsCompletedHandler = () => {
    setIsCompleted(null); 
  };

  return (
    <div className="container mt-4">
      <h2>Task Manager</h2>
      <div className="mb-3">
        <button className="btn btn-secondary me-2" onClick={isCompletedHandler}>
          Show Completed
        </button>
        <button className="btn btn-secondary me-2" onClick={NotCompletedHandler}>
          Show Not Completed
        </button>
        <button className="btn btn-secondary" onClick={resetIsCompletedHandler}>
          Show All
        </button>
      </div>
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

      {next && (
        <button className="btn btn-secondary mt-3" onClick={handleLoadMore}>
          Load More
        </button>
      )}

    </div>
  );
};

export default TaskManager;