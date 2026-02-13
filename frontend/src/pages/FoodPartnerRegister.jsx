import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const FoodPartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Partner with Us</h1>
          <p className="auth-subtitle">Register your food business</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Business Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your business name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter business email"
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

          <button type="submit" className="btn btn-primary">
            Register Business
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-link">
            Already registered? <Link to="/food-partner/login">Sign in</Link>
          </p>
          <p className="auth-link" style={{ marginTop: '0.5rem' }}>
            Register as <Link to="/user/register">Normal User</Link> instead?
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
