import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/auth';
import styles from './RegisterForm.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      alert('Username already exists');
      return;
    }

    const newUser: User = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    navigate('/');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <div className={styles.passwordContainer}>
        <input
          className={styles.input}
          type={showPassword ? 'text' : 'password'}
          placeholder="Choose a password"
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
      <button type="submit" className={styles.button}>Register</button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className={styles.linkButton}
      >
        Already have an account? Login
      </button>
    </form>
  );
};

export default RegisterForm;
