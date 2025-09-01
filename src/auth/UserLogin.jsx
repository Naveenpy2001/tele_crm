import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './UserAuth.css';
import api from '../api';
import Navbar from '../components/Navbar';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    employee_id: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    localStorage.removeItem('adminToken');
    try {
      const response = await api.post('/api/user/login/', formData);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userToken');
      console.log('login user data :',response.data);
      
      localStorage.setItem('userToken', response.data.access);
      alert('user login success');
      navigate('/user/home');
    } catch (err) {
      console.error(err);
      
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="user-auth-container">
      <div className="user-auth-card">
        <h2 className="user-auth-title">User Login</h2>
        
        {error && <div className="user-auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="user-auth-form">
          <div className="user-form-group">
            <label>User ID</label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="user-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="user-auth-btn" disabled={loading}>
            Login
          </button>
          
          <div className="user-auth-links">
            <Link to="/user/register">New User? Register</Link>
            <Link to="/user/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default UserLogin;