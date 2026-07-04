import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const password = e.target.password.value;
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/food-partner/register`, {
        name,
        contactName,
        phone,
        email,
        address,
        password
      }, { withCredentials: true })

      localStorage.setItem('user', JSON.stringify({ ...res.data.foodPartner, role: 'partner' }));
      window.dispatchEvent(new Event('authChange'));
      navigate("/create-food");
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

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register Business'}
          </button>
          {error && <div className="error-alert">{error}</div>}
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
