import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, token, setTasks, tasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);


  const handleToggleComplete = async () => {
    try {
      const updatedTask = { ...task, is_completed: !task.is_completed };
      const response = await axios.put(`/api/tasks/${task.id}/`, updatedTask, {
        headers: { Authorization: `Token ${token}` },
      });
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    } catch (error) {
      alert('Failed to update task completion status.');
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(`/api/tasks/${task.id}/`, editedTask, {
        headers: { Authorization: `Token ${token}` },
      });
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update task.');
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`api/tasks/${task.id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setTasks(tasks.filter(t => t.id !== task.id));
    } catch (error) {
      alert('Failed to delete task.');
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <button onClick={handleUpdateTask} className="btn btn-success">Save</button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={handleToggleComplete}
            className="form-check-input me-2"
          />
          <span style={{ textDecoration: task.is_completed ? 'line-through' : 'none' }}>{task.title}</span>
          <button onClick={() => setIsEditing(true)} className="btn btn-warning btn-sm ms-2">Edit</button>
          <button onClick={handleDeleteTask} className="btn btn-danger btn-sm ms-2">Delete</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;