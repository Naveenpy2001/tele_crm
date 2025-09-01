import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserAuth.css';

const UserForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('/api/user/forgot-password', { email });
      setStep(2);
      setSuccess('OTP sent to your email');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('/api/user/verify-otp', { email, otp });
      setStep(3);
      setSuccess('OTP verified successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      await axios.post('/api/user/reset-password', { 
        email, 
        otp, 
        newPassword 
      });
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/user/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-auth-container">
      <div className="user-auth-card">
        <h2 className="user-auth-title">
          {step === 1 ? 'Forgot Password' : 
           step === 2 ? 'Verify OTP' : 
           'Reset Password'}
        </h2>
        
        {error && <div className="user-auth-error">{error}</div>}
        {success && <div className="user-auth-success">{success}</div>}
        
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="user-auth-form">
            <div className="user-form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="user-auth-btn" disabled={loading}>
              Send OTP
            </button>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="user-auth-form">
            <div className="user-form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="user-auth-btn" disabled={loading}>
              Verify OTP
            </button>
          </form>
        )}
        
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="user-auth-form">
            <div className="user-form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            
            <div className="user-form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            
            <button type="submit" className="user-auth-btn" disabled={loading}>
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserForgotPassword;