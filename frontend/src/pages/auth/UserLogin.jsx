import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../config';

const UserLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/user/login`, {
        email,
        password
      }, { withCredentials: true })

      localStorage.setItem('user', JSON.stringify({ ...response.data.user, role: 'user' }));
      // Dispatch a custom event to notify navigation bar
      window.dispatchEvent(new Event('authChange'));
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password. Please try again.')
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
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <div className="error-alert">{error}</div>}
        </form>

        <div className="auth-footer">
          <p className="auth-link">
            Don't have an account? <Link to="/user/register">Create one</Link>
          </p>
          <p className="auth-link" style={{ marginTop: '0.5rem' }}>
            Login as <Link to="/food-partner/login">Food Partner</Link> instead?
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
