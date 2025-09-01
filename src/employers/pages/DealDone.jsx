import React from 'react';
import { FiCheckCircle, FiDollarSign, FiCalendar, FiUser, FiSearch } from 'react-icons/fi';
import './DealDone.css';

const DealDone = () => {
  const deals = [
    { id: 1, customer: 'Rahul Sharma', amount: '₹25,000', date: '15 May 2023', product: 'Premium Plan' },
    { id: 2, customer: 'Priya Patel', amount: '₹18,500', date: '18 May 2023', product: 'Standard Plan' },
    { id: 3, customer: 'Amit Singh', amount: '₹32,000', date: '20 May 2023', product: 'Enterprise Plan' },
  ];

  return (
    <div className="dd-container">
      <div className="dd-header">
        <h2 className="dd-title">
          <FiCheckCircle className="dd-title-icon" /> Closed Deals
        </h2>
        <div className="dd-search">
          <FiSearch className="dd-search-icon" />
          <input type="text" placeholder="Search deals..." className="dd-search-input" />
        </div>
      </div>

      <div className="dd-stats">
        <div className="dd-stat-card">
          <h3 className="dd-stat-title">Total Deals</h3>
          <p className="dd-stat-value">24</p>
        </div>
        <div className="dd-stat-card">
          <h3 className="dd-stat-title">This Month</h3>
          <p className="dd-stat-value">8</p>
        </div>
       
      </div>

      <div className="dd-table-container">
        <table className="dd-table">
          <thead>
            <tr>
              <th><FiUser /> Customer</th>

              <th><FiCalendar /> Date</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map(deal => (
              <tr key={deal.id}>
                <td>{deal.customer}</td>
                <td>{deal.date}</td>
                <td>
                  <button className="dd-view-btn">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealDone;