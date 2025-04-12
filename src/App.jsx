import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import UserList from './components/UserList.jsx';
import EditUser from './components/EditUser.jsx';
import './App.css'

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={token ? <UserList /> : <Navigate to="/login" />} />
        <Route path="/users/:id/edit" element={token ? <EditUser /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;