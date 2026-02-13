import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const FoodPartnerLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Partner Login</h1>
          <p className="auth-subtitle">Access your business dashboard</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your business email"
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
            New partner? <Link to="/food-partner/register">Register your business</Link>
          </p>
          <p className="auth-link" style={{ marginTop: '0.5rem' }}>
            <Link to="/food-partner/forgot-password">Forgot password?</Link>
          </p>
          <p className="auth-link" style={{ marginTop: '0.5rem' }}>
            Login as <Link to="/user/login">Normal User</Link> instead?
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
