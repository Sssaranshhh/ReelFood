import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const contactName = e.target.contactName.value;
  const phone = e.target.phone.value;
  const email = e.target.email.value;
  const address = e.target.address.value;
  const password = e.target.password.value;

  console.log('Submitting registration with:', { name, contactName, phone, address, email, password });

  try {
    const res = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
      name,
      contactName,
      phone,
      email,
      address,
      password
    }, {withCredentials: true})

    console.log('Registration successful:', res.data);
    navigate("/");
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
  }
}

const FoodPartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Partner with Us</h1>
          <p className="auth-subtitle">Register your food business</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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
            <label htmlFor="contactName" className="form-label">Contact Name</label>
            <input
              type="text"
              id="contactName"
              className="form-input"
              placeholder="Enter contact person's name"
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
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              placeholder="Enter contact number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              className="form-input"
              placeholder="Enter business address"
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
