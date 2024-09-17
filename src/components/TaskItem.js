import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, token, setTasks, tasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

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
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <button onClick={handleUpdateTask}>Save</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDeleteTask}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;