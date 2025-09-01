import React from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar, FiMapPin } from 'react-icons/fi';
import './AddNewRecord.css';

const AddNewRecord = () => {
  return (
    <div className="anr-container">
      <h2 className="anr-title">Add New Customer Record</h2>
      
      <div className="anr-form">
        <div className="anr-form-group">
          <label className="anr-label">
            <FiUser className="anr-icon" />
            Customer Name
          </label>
          <input type="text" className="anr-input" placeholder="Enter full name" />
        </div>

        <div className="anr-form-group">
          <label className="anr-label">
            <FiPhone className="anr-icon" />
            Phone Number
          </label>
          <input type="tel" className="anr-input" placeholder="Enter phone number" />
        </div>

        <div className="anr-form-group">
          <label className="anr-label">
            <FiMail className="anr-icon" />
            Email Address
          </label>
          <input type="email" className="anr-input" placeholder="Enter email" />
        </div>

        <div className="anr-form-group">
          <label className="anr-label">
            <FiCalendar className="anr-icon" />
            Follow-up Date
          </label>
          <input type="date" className="anr-input" />
        </div>

        <div className="anr-form-group">
          <label className="anr-label">
            <FiMapPin className="anr-icon" />
            Location
          </label>
          <input type="text" className="anr-input" placeholder="Enter location" />
        </div>

        <div className="anr-form-group">
          <label className="anr-label">Notes</label>
          <textarea className="anr-textarea" placeholder="Additional notes"></textarea>
        </div>

        <button className="anr-submit-btn">Save Record</button>
      </div>
    </div>
  );
};

export default AddNewRecord;