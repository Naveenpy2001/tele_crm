import React, { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiX, FiSearch, FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import './Home.css';
import api from '../api';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [statusValue, setStatusValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const recordsPerPage = 10;

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/users/');
      console.log('home data : ', response.data);
      
      // Filter out users with null employee_id
      const usersWithEmployeeId = response.data.filter(user => user.employee_id !== null);
      setData(usersWithEmployeeId);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id) => {
    try {
      setError(null);
      await axios.put(`/api/data/${id}`, { 
        status: statusValue 
      });
      
      setData(data.map(item => 
        item.id === id ? { ...item, status: statusValue } : item
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status. Please try again.');
    }
  };

  const filteredData = Array.isArray(data)
    ? data.filter(item =>
        item.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone_number?.includes(searchTerm)
      )
    : [];

  // Get current records for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ds-home-container">
      {selectedUser ? (
        <div className="ds-user-details">
          <button 
            className="ds-back-btn"
            onClick={() => setSelectedUser(null)}
          >
            <FiArrowLeft /> Back to List
          </button>
          
          <div className="ds-user-card">
            <div className="ds-user-header">
              <h3>User Details</h3>
              <span className={`ds-status ds-status-${selectedUser.status?.toLowerCase().replace(' ', '-')}`}>
                {selectedUser.status || 'No status'}
              </span>
            </div>
            
            <div className="ds-user-info">
              <div className="ds-info-row">
                <span className="ds-info-label">Employee ID:</span>
                <span className="ds-info-value">{selectedUser.employee_id}</span>
              </div>
              <div className="ds-info-row">
                <span className="ds-info-label">Name:</span>
                <span className="ds-info-value">{selectedUser.first_name} {selectedUser.last_name}</span>
              </div>
              <div className="ds-info-row">
                <span className="ds-info-label">Mobile:</span>
                <span className="ds-info-value">{selectedUser.phone_number}</span>
              </div>
              <div className="ds-info-row">
                <span className="ds-info-label">Date Joined:</span>
                <span className="ds-info-value">{new Date(selectedUser.date_joined).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="ds-status-update">
              <h4>Update Status</h4>
              <select
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
                className="ds-status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="In Progress">In Progress</option>
              </select>
              <button 
                className="ds-save-btn"
                onClick={() => {
                  handleStatusUpdate(selectedUser.id);
                  setSelectedUser({...selectedUser, status: statusValue});
                }}
              >
                <FiSave /> Update Status
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="ds-home-header">
            <h2>Employee Records</h2>
            <div className="ds-search-box">
              <FiSearch className="ds-search-icon" />
              <input
                type="text"
                placeholder="Search by name, ID or mobile..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {error && (
            <div className="ds-error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="ds-loading">Loading data...</div>
          ) : (
            <div className="ds-table-container">
              <table className="ds-records-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Date Joined</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                    currentRecords.map((item, index) => (
                      <tr key={item.id} onClick={() => setSelectedUser(item)}>
                        <td>{indexOfFirstRecord + index + 1}</td>
                        <td>{new Date(item.date_joined).toLocaleDateString()}</td>
                        <td>{item.employee_id}</td>
                        <td>{item.first_name} {item.last_name}</td>
                        <td>{item.phone_number}</td>
                        <td>
                          <span className={`ds-status ds-status-${item.status?.toLowerCase().replace(' ', '-') || 'pending'}`}>
                            {item.status || 'Pending'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="ds-edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(item.id);
                              setStatusValue(item.status || 'Pending');
                            }}
                          >
                            <FiEdit />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="ds-no-data">
                        {searchTerm ? 'No matching records found' : 'No employee records available'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {editingId && (
                <div className="ds-edit-modal">
                  <div className="ds-modal-content">
                    <h3>Update Status</h3>
                    <select
                      value={statusValue}
                      onChange={(e) => setStatusValue(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                    <div className="ds-modal-actions">
                      <button 
                        className="ds-save-btn"
                        onClick={() => handleStatusUpdate(editingId)}
                      >
                        <FiSave /> Save
                      </button>
                      <button 
                        className="ds-cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {filteredData.length > recordsPerPage && (
                <div className="ds-pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="ds-pagination-btn"
                  >
                    <FiChevronLeft />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`ds-pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ds-pagination-btn"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;