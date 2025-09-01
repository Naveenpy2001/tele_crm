import React, { useState } from 'react';
import { FiXCircle, FiUser, FiDollarSign, FiCalendar, FiSearch, FiFilter } from 'react-icons/fi';
import './DealCancel.css';

const DealCancel = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const cancelledDeals = [
    { id: 1, customer: 'Sanjay Verma', amount: '₹22,000', date: '12 May 2023', reason: 'Price too high' },
    { id: 2, customer: 'Meena Desai', amount: '₹15,000', date: '14 May 2023', reason: 'Found better alternative' },
    { id: 3, customer: 'Vikram Joshi', amount: '₹28,500', date: '17 May 2023', reason: 'Not interested anymore' },
  ];

  return (
    <div className="dc-container">
      <div className="dc-header">
        <h2 className="dc-title">
          <FiXCircle className="dc-title-icon" /> Cancelled Deals
        </h2>
        <div className="dc-controls">
          <div className="dc-search">
            <FiSearch className="dc-search-icon" />
            <input type="text" placeholder="Search cancelled deals..." className="dc-search-input" />
          </div>
          <button className="dc-filter-btn">
            <FiFilter /> Filter
          </button>
        </div>
      </div>

      <div className="dc-filters">
        <button 
          className={`dc-filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button 
          className={`dc-filter-tab ${activeFilter === 'last-week' ? 'active' : ''}`}
          onClick={() => setActiveFilter('last-week')}
        >
          Last Week
        </button>
        <button 
          className={`dc-filter-tab ${activeFilter === 'last-month' ? 'active' : ''}`}
          onClick={() => setActiveFilter('last-month')}
        >
          Last Month
        </button>
      </div>

      <div className="dc-table-container">
        <table className="dc-table">
          <thead>
            <tr>
              <th><FiUser /> Customer</th>
              <th><FiCalendar /> Date</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cancelledDeals.map(deal => (
              <tr key={deal.id}>
                <td>{deal.customer}</td>

                <td>{deal.date}</td>
                <td className="dc-reason">{deal.reason}</td>
                <td>
                  <button className="dc-followup-btn">Follow Up</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dc-stats">
        <div className="dc-stat">
          <h3 className="dc-stat-label">Total Cancellations</h3>
          <p className="dc-stat-value">15</p>
        </div>
  
      </div>
    </div>
  );
};

export default DealCancel;