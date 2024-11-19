// src/components/ChildLogin.js

import React, { useState } from 'react';
import { loginAsChild } from '../../services/authService'; // Import the child login function

function ChildLogin() {
  const [loginCode, setLoginCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before each submission

    try {
      const response = await loginAsChild(loginCode);
      alert(`Welcome, ${response.role}!`);
    } catch (err) {
      setError(err.message); // Display error if login fails
    }
  };

  return (
    <div>
      <h2>Child Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Login Code:</label>
        <input type="text" value={loginCode} onChange={(e) => setLoginCode(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ChildLogin;