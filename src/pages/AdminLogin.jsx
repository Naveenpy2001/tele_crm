import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminAuth.css';
import api from '../api';
import Navbar from '../components/Navbar';


const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
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
    
    try {
      const response = await api.post('/api/token/', {
        username: formData.email,
        password: formData.password
      }); 
      localStorage.setItem('adminToken', response.data.access);
      navigate('/admin/home');
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
    <div className="admin-auth-container">
      <div className="admin-auth-card">
        <h2 className="admin-auth-title">Admin Login</h2>
        
        {error && <div className="admin-auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="admin-auth-form">
          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="admin-auth-btn" disabled={loading}>
            Login
          </button>
        </form>
      </div>
    </div>
   </>
  );
};

export default AdminLogin;