import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UploadData.css'; 
import api from '../api';

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedRegisteredUser, setSelectedRegisteredUser] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch uploaded data when component mounts or when activeTab changes to 'table'
  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 'table') {
        setIsLoading(true);
        try {
          const response = await api.get('/api/candidates/');
          setUploadedData(response.data);
          console.log('data : ',response.data);
          
        } catch (err) {
          setError('Failed to fetch data. Please try again.');
          console.error('Fetch error:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [activeTab, showSuccess]); // Re-fetch when tab changes or after successful upload

  // Fetch registered users for assignment
  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await api.get('/api/users/'); 
        console.log('data ra : ',response.data);
        
        setRegisteredUsers(response.data);
      } catch (err) {
        console.error('Error fetching registered users:', err);
      }
    };

    fetchRegisteredUsers();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/data/', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setUploadedData(response.data);
      setShowSuccess(true);
      setFile(null);
      document.getElementById('fileInput').value = '';
      setTimeout(() => setShowSuccess(false), 3000);
      setActiveTab('table'); // Switch to table view after successful upload
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'File upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const handleAssignUsers = () => {
    if (selectedUsers.length === 0) {
      setError('Please select at least one user to assign');
      return;
    }
    setShowAssignModal(true);
  };

  const handleAssignSubmit = async () => {
    if (!selectedRegisteredUser) {
      setError('Please select a registered user to assign to');
      return;
    }

    console.log(selectedRegisteredUser);
    console.log(selectedUsers);
    

    setIsAssigning(true);
    try {
      await api.post('/api/candidates/bulk-assign/', {
        employee_id: selectedRegisteredUser,
        candidate_ids: selectedUsers
      });

      // Update the table by removing assigned users
      setUploadedData(prevData => 
        prevData.filter(user => !selectedUsers.includes(user.id))
      );
      
      setShowAssignModal(false);
      setSelectedUsers([]);
      setSelectedRegisteredUser('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Failed to assign users. Please try again.');
      console.error('Assignment error:', err);
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="up-container">
      <h2 className="up-title">Upload File</h2>
      
      {showSuccess && (
        <div className="up-success-message">
          Operation completed successfully!
          <span className="up-success-close" onClick={() => setShowSuccess(false)}>×</span>
        </div>
      )}

      <div className="up-tabs">
        <button
          className={`up-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload File
        </button>
        <button
          className={`up-tab ${activeTab === 'table' ? 'active' : ''}`}
          onClick={() => setActiveTab('table')}
        >
          View Data
          {uploadedData.length > 0 && (
            <span className="up-tab-badge">{uploadedData.length}</span>
          )}
        </button>
      </div>
      
      {activeTab === 'upload' && (
        <div className="up-upload-area">
          <div className="up-file-input-container">
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className="up-file-input"
              disabled={isUploading}
            />
            <label htmlFor="fileInput" className="up-file-label">
              {file ? (
                <span className="up-file-name">{file.name}</span>
              ) : (
                <>
                  <svg className="up-upload-icon" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                  <span>Choose a file or drag it here</span>
                </>
              )}
            </label>
          </div>
          
          {file && (
            <div className="up-file-info">
              <div className="up-file-details">
                <span className="up-file-name">{file.name}</span>
                <span className="up-file-size">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  document.getElementById('fileInput').value = '';
                }}
                className="up-remove-button"
                disabled={isUploading}
              >
                Remove
              </button>
            </div>
          )}
          
          {isUploading && (
            <div className="up-progress-container">
              <div className="up-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
              <span className="up-progress-text">{uploadProgress}%</span>
            </div>
          )}
          
          {error && <div className="up-error-message">{error}</div>}
          
          <button
            onClick={handleUpload}
            className="up-upload-button"
            disabled={!file || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      )}

      {activeTab === 'table' && (
        <div className="up-data-table-container">
          {isLoading ? (
            <div className="up-loading">
              <div className="up-spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : uploadedData.length > 0 ? (
            <>
              <div className="up-table-actions">
                <button
                  onClick={handleAssignUsers}
                  className="up-assign-button"
                  disabled={selectedUsers.length === 0}
                >
                  Assign Selected Users
                </button>
              </div>
              <table className="up-data-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === uploadedData.length && uploadedData.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(uploadedData.map(user => user.id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                      />
                    </th>
                    <th>Name</th>
                    {/* <th>Email</th> */}
                    <th>Phone</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                        />
                      </td>
                      <td>{user.name}</td>
                      {/* <td>{user.email}</td> */}
                      <td>{user.mobile_number}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="up-no-data">
              <svg className="up-no-data-icon" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
              </svg>
              <h3>No Data Available</h3>
              <p>Upload a file to view the data here</p>
              <button
                className="up-upload-button"
                onClick={() => setActiveTab('upload')}
              >
                Go to Upload
              </button>
            </div>
          )}
        </div>
      )}

      {showAssignModal && (
        <div className="up-modal-overlay">
          <div className="up-modal">
            <div className="up-modal-header">
              <h3>Assign Users</h3>
              <button 
                className="up-modal-close"
                onClick={() => setShowAssignModal(false)}
              >
                ×
              </button>
            </div>
            <div className="up-modal-body">
              <p>Assign {selectedUsers.length} selected user(s) to:</p>
              <div className="up-form-group">
                <label htmlFor="registeredUser">Select Registered User:</label>
                <select
                  id="registeredUser"
                  value={selectedRegisteredUser}
                  onChange={(e) => setSelectedRegisteredUser(e.target.value)}
                  className="up-select"
                >
                  <option value="">Select a user...</option>
                  {registeredUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}  ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              {error && <div className="up-error-message">{error}</div>}
            </div>
            <div className="up-modal-footer">
              <button
                className="up-cancel-button"
                onClick={() => setShowAssignModal(false)}
                disabled={isAssigning}
              >
                Cancel
              </button>
              <button
                className="up-confirm-button"
                onClick={handleAssignSubmit}
                disabled={isAssigning || !selectedRegisteredUser}
              >
                {isAssigning ? 'Assigning...' : 'Confirm Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadData;