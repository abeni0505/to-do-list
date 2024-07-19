/* eslint-disable no-unused-vars */
// TodoList.jsx

import React, { useState } from 'react';
import './index.css'; 
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const handleButtonClick = async () => {
    try {
      // Make the request using a library like Axios or the native Fetch API
      const response = await axios.get('/addtasks');
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  function handleInputChange(event) {
    if (editMode) {
      setEditedTask(event.target.value);
    } else {
      setNewTask(event.target.value);
    }
  }

  async function addTask() {
    try {
      // Make the request using a library like Axios or the native Fetch API
      const response = await axios.post('http://localhost:3001/addtasks', {
        name: "test",
      });
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    async () => {
      try {
        // Make the request using a library like Axios or the native Fetch API
        const response = await axios.post('http://localhost:3001/addtasks', {
          name: "test",
        });
        console.log('Response data:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (editMode && editedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editedTask;
      setTasks(updatedTasks);
      setEditMode(false);
      setEditIndex(null);
      setEditedTask('');
     
    } else if (!editMode && newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
      async () => {
        try {
          // Make the request using a library like Axios or the native Fetch API
          const response = await axios.get('/addtasks');
          console.log('Response data:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    }
  }

  function deleteTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }
  function editTask(index) {
    setEditMode(true);
    setEditIndex(index);
    setEditedTask(tasks[index]);
  }

  function cancelEdit() {
    setEditMode(false);
    setEditIndex(null);
    setEditedTask('');
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index - 1];
      updatedTasks[index - 1] = temp;
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index + 1];
      updatedTasks[index + 1] = temp;
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div className="add-task">
        
        <input
          type="text"
          placeholder={editMode ? 'Edit the task...' : 'Enter the task...'}
          value={editMode ? editedTask : newTask}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>{editMode ? 'Save' : 'Add Task'}</button>
        {editMode && <button onClick={cancelEdit}>Cancel</button>}
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {editMode && editIndex === index ? (
              <input
                type="text"
                value={editedTask}
                onChange={handleInputChange}
              />
            ) : (
              task
            )}
            <div className="buttons">
              {!editMode && (
                <button onClick={() => editTask(index)}>Edit</button>
              )}
              <button onClick={() => deleteTask(index)}>Delete</button>
              <button onClick={() => moveTaskUp(index)} disabled={index === 0}>
                Move Up
              </button>
              <button
                onClick={() => moveTaskDown(index)}
                disabled={index === tasks.length - 1}
              >
                Move Down
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
