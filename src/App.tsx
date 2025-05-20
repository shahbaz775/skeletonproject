import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/loginForm/LoginForm';
import RegisterForm from './components/registerForm/RegisterForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
