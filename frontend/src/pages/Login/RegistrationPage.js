import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    childName: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [childLoginCode, setChildLoginCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.childName) {
      setError('All fields are required');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.register(
        formData.email,
        formData.password,
        formData.childName
      );
      
      setChildLoginCode(response.childLoginCode);
      setShowSuccess(true);
      
      // Wait 5 seconds before redirecting to login
      setTimeout(() => {
        navigate('/parent-login');
      }, 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>
        
        {showSuccess ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Registration successful! Your child's login code is:
              <div className="font-mono text-lg font-bold my-2">{childLoginCode}</div>
              Please save this code as it will be needed for your child to log in.
            </div>
            <p className="text-gray-600">Redirecting to login page in 5 seconds...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Child's Name</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
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
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:text-blue-700"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;