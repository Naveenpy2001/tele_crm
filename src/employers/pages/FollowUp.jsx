import React, { useEffect, useState } from 'react';
import { FiClock, FiCalendar, FiCheck, FiX, FiSearch } from 'react-icons/fi';
import './FollowUp.css';
import api from '../../api';

const FollowUp = () => {
  const [activeFilter, setActiveFilter] = useState('today');


  useEffect(() => {
    const fetchFollowData = async () => {
    const token = localStorage.getItem("userToken");

      const res = await api.get('/api/logs/',{
        headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      console.log('follow up data : ',res.data);
      
    }
    fetchFollowData()
  },[])
  
  const followUps = [
    { id: 1, name: 'Rajesh Khanna', phone: '9876543210', date: 'Today', time: '10:30 AM', status: 'pending' },
    { id: 2, name: 'Sunita Rao', phone: '8765432109', date: 'Tomorrow', time: '11:15 AM', status: 'pending' },
    { id: 3, name: 'Arun Bhatia', phone: '7654321098', date: 'Today', time: '02:00 PM', status: 'completed' },
  ];

  return (
    <div className="fu-container">
      <div className="fu-header">
        <h2 className="fu-title">Follow Up Schedule</h2>
        <div className="fu-filters">
          <button 
            className={`fu-filter-btn ${activeFilter === 'today' ? 'active' : ''}`}
            onClick={() => setActiveFilter('today')}
          >
            Today
          </button>
          <button 
            className={`fu-filter-btn ${activeFilter === 'tomorrow' ? 'active' : ''}`}
            onClick={() => setActiveFilter('tomorrow')}
          >
            Tomorrow
          </button>
          <button 
            className={`fu-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
        </div>
      </div>

      <div className="fu-search-container">
        <div className="fu-search">
          <FiSearch className="fu-search-icon" />
          <input type="text" placeholder="Search follow ups..." className="fu-search-input" />
        </div>
      </div>

      <div className="fu-list">
        {followUps
          .filter(item => activeFilter === 'all' || item.date.toLowerCase().includes(activeFilter))
          .map(item => (
            <div key={item.id} className="fu-item">
              <div className="fu-item-header">
                <h3 className="fu-item-name">{item.name}</h3>
                <span className="fu-item-phone">{item.phone}</span>
              </div>
              
              <div className="fu-item-time">
                <FiClock className="fu-time-icon" />
                {item.time} • {item.date}
              </div>
              
              <div className="fu-item-actions">
                {item.status === 'pending' ? (
                  <>
                    <button className="fu-action-btn fu-done-btn">
                      <FiCheck /> Done
                    </button>
                    <button className="fu-action-btn fu-cancel-btn">
                      <FiX /> Cancel
                    </button>
                  </>
                ) : (
                  <div className="fu-completed-badge">
                    <FiCheck /> Completed
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FollowUp;