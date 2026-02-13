import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form className="auth-form">
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

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-link">
            Don't have an account? <Link to="/user/register">Create one</Link>
          </p>
          <p className="auth-link" style={{ marginTop: '0.5rem' }}>
            <Link to="/user/forgot-password">Forgot password?</Link>
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
