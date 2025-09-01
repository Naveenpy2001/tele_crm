import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddRecord.css';
import api from '../api';

const AddRecord = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (activeTab === 'add') {
      fetchRecords();
    }
  }, [activeTab]);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/api/users/');
      setRecords(response.data);
      
    } catch (error) {
      console.error('Error fetching records:', error);
      setRecords([]); // Set empty array on error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await api.post('/api/create-employee/', formData);
      setShowSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
      });
      setTimeout(() => setShowSuccess(false), 3000);
      if (activeTab === 'view') {
        fetchRecords();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nr-container">
      <div className="nr-tabs">
        <button 
          className={`nr-tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Record
        </button>
        <button 
          className={`nr-tab ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          View Records
        </button>
      </div>

      {activeTab === 'add' ? (
        <>
          <h2 className="nr-title">Add New Record</h2>
          
          {showSuccess && (
            <div className="nr-success-message">
              Record added successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="nr-form">
            <div className="nr-form-grid">
              <div className="nr-form-group">
                <label htmlFor="first_name" className="nr-label">
                  First Name <span className="nr-required">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`nr-input ${errors.first_name ? 'nr-input-error' : ''}`}
                />
                {errors.first_name && <span className="nr-error">{errors.first_name}</span>}
              </div>

              <div className="nr-form-group">
                <label htmlFor="last_name" className="nr-label">
                  Last Name <span className="nr-required">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`nr-input ${errors.last_name ? 'nr-input-error' : ''}`}
                />
                {errors.last_name && <span className="nr-error">{errors.last_name}</span>}
              </div>

              <div className="nr-form-group">
                <label htmlFor="email" className="nr-label">
                  Email <span className="nr-required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`nr-input ${errors.email ? 'nr-input-error' : ''}`}
                />
                {errors.email && <span className="nr-error">{errors.email}</span>}
              </div>

              <div className="nr-form-group">
                <label htmlFor="phone_number" className="nr-label">
                  Phone Number <span className="nr-required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={`nr-input ${errors.phone_number ? 'nr-input-error' : ''}`}
                />
                {errors.phone_number && <span className="nr-error">{errors.phone_number}</span>}
              </div>
            </div>
            
            <div className="nr-form-actions">
              <button
                type="submit"
                className="nr-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="nr-table-container">
          <h2 className="nr-title">Employee Records</h2>
          <table className="nr-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record,index) => (
                <tr key={index}>
                  <td>{record.employee_id}</td>
                  <td>{record.first_name}</td>
                  <td>{record.last_name}</td>
                  <td>{record.email}</td>
                  <td>{record.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddRecord;