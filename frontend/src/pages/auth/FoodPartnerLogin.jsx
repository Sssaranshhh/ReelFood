import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
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
      const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
        email,
        password
      }, { withCredentials: true })

      localStorage.setItem('user', JSON.stringify({ ...response.data.foodPartner, role: 'partner' }));
      window.dispatchEvent(new Event('authChange'));
      navigate("/create-food");

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
          <h1 className="auth-title">Partner Login</h1>
          <p className="auth-subtitle">Access your business dashboard</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <div className="error-alert">{error}</div>}
        </form>

        <div className="auth-footer">
          <p className="auth-link">
            New partner? <Link to="/food-partner/register">Register your business</Link>
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
