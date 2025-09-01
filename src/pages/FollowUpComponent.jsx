import React, { useState, useEffect } from 'react';
import api from '../api';
import './Follow.css'

const FollowUpComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/logs/');
        setData(response.data);
        console.log(response.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and search logic
 const filteredData = data.filter(item => {
  const name = item.name || '';
  const mobile = item.mobile_number || '';
  const status = item.status || '';
  const schedule = item.schedule || '';

  const matchesSearch =
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mobile.includes(searchTerm);

  const matchesStatus = statusFilter === 'all' || status === statusFilter;

  const matchesDate = !dateFilter || schedule.includes(dateFilter);

  return matchesSearch && matchesStatus && matchesDate;
});


  // Handle row click
  const handleRowClick = (item) => {
    setSelectedRow(item);
  };

  // Handle back to table view
  const handleBackClick = () => {
    setSelectedRow(null);
  };

  if (loading) return <div className="fp-loading">Loading...</div>;
  if (error) return <div className="fp-error">Error: {error}</div>;

  return (
    <div className="fp-container">
      {!selectedRow ? (
        <>
          <div className="fp-controls">
            <div className="fp-search-filter">
              <input
                type="text"
                placeholder="Search by name or mobile"
                className="fp-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select 
                className="fp-status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              
              <input
                type="date"
                className="fp-date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
          
          <div className="fp-table-responsive">
            <table className="fp-data-table">
              <thead>
                <tr>
                  <th className="fp-th">Serial No</th>
                  <th className="fp-th">Name</th>
                  <th className="fp-th">Mobile</th>
                  <th className="fp-th">Schedule</th>
                  <th className="fp-th">Status</th>
                  <th className="fp-th">Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map(item => (
                    <tr 
                      key={item.id} 
                      className="fp-tr"
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="fp-td">{item.serial_no}</td>
                      <td className="fp-td">{item.candidate_name}</td>
                      <td className="fp-td">{item.mobile_number}</td>
                      <td className="fp-td">{item.followUpTime}</td>
                      <td className={`fp-td fp-status`}>
                        {item.status}
                      </td>
                      <td className="fp-td">{item.user_name} {item.assigned_to_last_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="fp-tr">
                    <td className="fp-td fp-no-data" colSpan="6">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="fp-detail-view">
          <button 
            className="fp-back-button"
            onClick={handleBackClick}
          >
            &larr; Back to List
          </button>
          
          <div className="fp-detail-card">
            <h2 className="fp-detail-title">{selectedRow.name}</h2>
            
            <div className="fp-detail-grid">
              <div className="fp-detail-item">
                <span className="fp-detail-label">Mobile:</span>
                <span className="fp-detail-value">{selectedRow.mobile_number}</span>
              </div>
              
              <div className="fp-detail-item">
                <span className="fp-detail-label">Schedule:</span>
                <span className="fp-detail-value">{selectedRow.schedule}</span>
              </div>
              
              <div className="fp-detail-item">
                <span className="fp-detail-label">Status:</span>
                <span className={`fp-detail-value fp-status-${selectedRow.status.toLowerCase()}`}>
                  {selectedRow.status}
                </span>
              </div>
              
              <div className="fp-detail-item">
                <span className="fp-detail-label">Assigned To:</span>
                <span className="fp-detail-value">{selectedRow.assigned_to_name}</span>
              </div>
              
              <div className="fp-detail-item">
                <span className="fp-detail-label">Assigned Email:</span>
                <span className="fp-detail-value">{selectedRow.assigned_to_email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpComponent;