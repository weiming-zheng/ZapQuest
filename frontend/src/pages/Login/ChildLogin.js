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
    <div className="min-h-screen bg-sky-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Child Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Enter Login Code</label>
            <input
              type="text"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
              required
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChildLogin;