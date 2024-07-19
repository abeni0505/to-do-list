/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './SignUpForm';  // Import your SignUpForm component
import LoginForm from './LoginForm'; // Import your LoginForm component
import './App.css'; // Import your CSS file for styling
import TodoList from './componet/TodoList'; // Import your TodoList component (assuming it's named TodoList.jsx)

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Todo App</h1>
        <Routes>
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/todo" element={<TodoList />} /> {/* Route for TodoList */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
