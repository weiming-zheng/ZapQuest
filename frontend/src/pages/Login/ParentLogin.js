// src/components/ParentLogin.js

import React, { useState } from 'react';
import { loginAsParent, register } from '../../services/authService'; // Import the auth functions

function ParentLogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const toggleRegister = () => setIsRegistering(!isRegistering);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before each submission

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await register(email, password); // Call register if in registration mode
        alert('Registration successful!');
      } else {
        const response = await loginAsParent(email, password);
        alert(`Welcome, ${response.role}!`);
      }
    } catch (err) {
      setError(err.message); // Display error message if login fails
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Parent Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {isRegistering && (
          <>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </>
        )}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={toggleRegister}>
        {isRegistering ? 'Already have an account? Login' : 'No account? Register'}
      </button>
    </div>
  );
}

export default ParentLogin;