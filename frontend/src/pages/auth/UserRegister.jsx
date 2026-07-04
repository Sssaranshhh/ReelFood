import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const UserRegister = () => {

  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/user/register`, {
        name,
        email,
        password
      }, {withCredentials: true});

      localStorage.setItem('user', JSON.stringify({ ...response.data.user, role: 'user' }));
      window.dispatchEvent(new Event('authChange'));
      navigate("/");

    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-logo">
            <div className="brand-icon">🍔</div>
            <span className="brand-name">ReelFood</span>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join ReelFood as a user</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
          {error && <div className="error-alert">{error}</div>}
        </form>

        <div className="auth-footer">
          <p className="auth-link">
            Already have an account? <Link to="/user/login">Sign in</Link>
          </p>
          <p className="auth-link" style={{ marginTop: '0.5rem' }}>
            Register as <Link to="/food-partner/register">Food Partner</Link> instead?
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
