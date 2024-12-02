import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

function ChildLogin() {
  const navigate = useNavigate();
  const [loginCode, setLoginCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginCode.trim()) {
      setError('Please enter your login code');
      return;
    }

    setIsLoading(true);
    try {
      await authService.loginAsChild(loginCode);
      // Navigate to child dashboard on successful login
      navigate('/child-main');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Child Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Login Code</label>
            <input
              type="text"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your login code"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:text-blue-700"
          >
            Back to Role Selection
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChildLogin;
