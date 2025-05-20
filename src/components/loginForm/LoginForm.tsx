import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { User } from '../../types/auth';
import styles from './LoginForm.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      alert('Invalid username or password');
      return;
    }

    login(username);
    navigate('/dashboard');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <div className={styles.passwordContainer}>
        <input
          className={styles.input}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
      <button type="submit" className={styles.button}>Login</button>
      <button
        type="button"
        onClick={() => navigate('/register')}
        className={styles.linkButton}
      >
        Don’t have an account? Register
      </button>
    </form>
  );
};

export default LoginForm;
