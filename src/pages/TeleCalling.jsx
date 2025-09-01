
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeleCalling.css'; 

const TeleCalling = () => {
  const [customers, setCustomers] = useState([
    {
    id: 1,
    date: "2023-06-15",
    employId: "EMP001",
    name: "John Smith",
    mobile: "9876543210",
    status: "Approved"
  },
  {
    id: 2,
    date: "2023-06-14",
    employId: "EMP002",
    name: "Sarah Johnson",
    mobile: "8765432109",
    status: "Pending"
  },
  {
    id: 3,
    date: "2023-06-13",
    employId: "EMP003",
    name: "Michael Chen",
    mobile: "7654321098",
    status: "Rejected"
  },
  {
    id: 4,
    date: "2023-06-12",
    employId: "EMP004",
    name: "Emily Wilson",
    mobile: "6543210987",
    status: "In Progress"
  },
  {
    id: 5,
    date: "2023-06-11",
    employId: "EMP005",
    name: "David Brown",
    mobile: "9432109876",
    status: "Approved"
  },
  {
    id: 6,
    date: "2023-06-10",
    employId: "EMP006",
    name: "Jessica Lee",
    mobile: "8321098765",
    status: "Pending"
  },
  {
    id: 7,
    date: "2023-06-09",
    employId: "EMP007",
    name: "Robert Taylor",
    mobile: "7210987654",
    status: "Approved"
  },
  {
    id: 8,
    date: "2023-06-08",
    employId: "EMP008",
    name: "Amanda Clark",
    mobile: "6109876543",
    status: "Rejected"
  },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [callStatus, setCallStatus] = useState('idle'); 
  const [callLogs, setCallLogs] = useState([]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  

  // Fetch customers data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('https://your-api-endpoint.com/customers');
        setCustomers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setCallStatus('idle');
    setNotes('');
  };

  const initiateCall = () => {
    if (!selectedCustomer) return;
    
    setCallStatus('calling');
    
    // Simulate call initiation (replace with actual API call)
    setTimeout(() => {
      setCallStatus('in-progress');
      
      // Add to call logs
      const newCallLog = {
        id: Date.now(),
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        phone: selectedCustomer.phone,
        date: new Date().toISOString(),
        status: 'in-progress',
        duration: 0
      };
      
      setCallLogs(prev => [newCallLog, ...prev]);
      
      // Start call timer
      const timer = setInterval(() => {
        setCallLogs(prev => prev.map(log => 
          log.id === newCallLog.id ? {...log, duration: log.duration + 1} : log
        ));
      }, 1000);
      
      // Store timer reference to clear later
      newCallLog.timer = timer;
    }, 1500);
  };

  const endCall = () => {
    if (callStatus !== 'in-progress') return;
    
    setCallStatus('ended');
    
    // Find the current call in logs
    const currentCallIndex = callLogs.findIndex(log => log.status === 'in-progress');
    if (currentCallIndex !== -1) {
      // Clear the interval timer
      clearInterval(callLogs[currentCallIndex].timer);
      
      // Update call status
      setCallLogs(prev => prev.map((log, index) => 
        index === currentCallIndex ? {...log, status: 'completed'} : log
      ));
    }
    
    // Reset after 2 seconds
    setTimeout(() => {
      setCallStatus('idle');
    }, 2000);
  };

  const saveNotes = async () => {
    if (!selectedCustomer || !notes.trim()) return;
    
    try {
      // Replace with your actual API endpoint
      await axios.post('https://your-api-endpoint.com/notes', {
        customerId: selectedCustomer.id,
        notes: notes.trim(),
        callId: callLogs[0]?.id // Associate with latest call if available
      });
      
      // Update local state (simplified - in real app you might want to refresh data)
      setCustomers(prev => prev.map(customer => 
        customer.id === selectedCustomer.id 
          ? {...customer, notes: [...(customer.notes || []), notes.trim()]} 
          : customer
      ));
      
      setNotes('');
      alert('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes. Please try again.');
    }
  };


  const dummyEmployeeData = 
[
  {
    id: 1,
    date: "2023-06-15",
    employId: "EMP001",
    name: "John Smith",
    mobile: "9876543210",
    status: "Approved"
  },
  {
    id: 2,
    date: "2023-06-14",
    employId: "EMP002",
    name: "Sarah Johnson",
    mobile: "8765432109",
    status: "Pending"
  },
  {
    id: 3,
    date: "2023-06-13",
    employId: "EMP003",
    name: "Michael Chen",
    mobile: "7654321098",
    status: "Rejected"
  },
  {
    id: 4,
    date: "2023-06-12",
    employId: "EMP004",
    name: "Emily Wilson",
    mobile: "6543210987",
    status: "In Progress"
  },
  {
    id: 5,
    date: "2023-06-11",
    employId: "EMP005",
    name: "David Brown",
    mobile: "9432109876",
    status: "Approved"
  },
  {
    id: 6,
    date: "2023-06-10",
    employId: "EMP006",
    name: "Jessica Lee",
    mobile: "8321098765",
    status: "Pending"
  },
  {
    id: 7,
    date: "2023-06-09",
    employId: "EMP007",
    name: "Robert Taylor",
    mobile: "7210987654",
    status: "Approved"
  },
  {
    id: 8,
    date: "2023-06-08",
    employId: "EMP008",
    name: "Amanda Clark",
    mobile: "6109876543",
    status: "Rejected"
  },
  {
    id: 9,
    date: "2023-06-07",
    employId: "EMP009",
    name: "Daniel Martinez",
    mobile: "5098765432",
    status: "In Progress"
  },
  {
    id: 10,
    date: "2023-06-06",
    employId: "EMP010",
    name: "Jennifer Adams",
    mobile: "4987654321",
    status: "Approved"
  },
  {
    id: 11,
    date: "2023-06-05",
    employId: "EMP011",
    name: "Christopher Wilson",
    mobile: "3876543210",
    status: "Pending"
  },
  {
    id: 12,
    date: "2023-06-04",
    employId: "EMP012",
    name: "Elizabeth Garcia",
    mobile: "2765432109",
    status: "Approved"
  },
  {
    id: 13,
    date: "2023-06-03",
    employId: "EMP013",
    name: "Matthew Rodriguez",
    mobile: "1654321098",
    status: "Rejected"
  },
  {
    id: 14,
    date: "2023-06-02",
    employId: "EMP014",
    name: "Lauren Anderson",
    mobile: "9543210987",
    status: "In Progress"
  },
  {
    id: 15,
    date: "2023-06-01",
    employId: "EMP015",
    name: "Andrew Thomas",
    mobile: "8432109876",
    status: "Approved"
  }
];


  return (
    <div className="tc-container">
      <div className="tc-header">
        <h2 className="tc-title">Tele Calling System</h2>
        <div className="tc-search">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="tc-search-input"
          />
          <span className="tc-search-icon">🔍</span>
        </div>
      </div>

      <div className="tc-layout">
        {/* Customer List */}
        <div className="tc-customer-list">
          <h3 className="tc-subtitle">Customer List</h3>
          {isLoading ? (
            <div className="tc-loading">Loading customers...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="tc-empty">No customers found</div>
          ) : (
            <ul className="tc-customer-items">
              {filteredCustomers.map(customer => (
                <li
                  key={customer.id}
                  className={`tc-customer-item ${selectedCustomer?.id === customer.id ? 'tc-active' : ''}`}
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <div className="tc-customer-info">
                    <span className="tc-customer-name">{customer.name}</span>
                    <span className="tc-customer-phone">{customer.phone}</span>
                  </div>
                  <div className="tc-customer-last-contact">
                    {customer.lastContact || 'Never contacted'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Customer Details and Calling */}
        <div className="tc-customer-details">
          {selectedCustomer ? (
            <>
              <div className="tc-customer-header">
                <h3 className="tc-customer-name-large">{selectedCustomer.name}</h3>
                <div className="tc-customer-meta">
                  <span className="tc-customer-phone-large">{selectedCustomer.phone}</span>
                  <span className="tc-customer-location">{selectedCustomer.location || 'Location not specified'}</span>
                </div>
              </div>

              <div className="tc-call-section">
                <div className={`tc-call-status tc-status-${callStatus}`}>
                  {callStatus === 'idle' && 'Ready to call'}
                  {callStatus === 'calling' && 'Calling...'}
                  {callStatus === 'in-progress' && 'Call in progress'}
                  {callStatus === 'ended' && 'Call ended'}
                </div>

                {callStatus === 'in-progress' && callLogs[0] && (
                  <div className="tc-call-timer">
                    Duration: {callLogs[0].duration} seconds
                  </div>
                )}

                <div className="tc-call-controls">
                  {callStatus === 'idle' && (
                    <button
                      onClick={initiateCall}
                      className="tc-call-button tc-initiate-call"
                    >
                      <span className="tc-call-icon">📞</span> Call {selectedCustomer.phone}
                    </button>
                  )}

                  {callStatus === 'in-progress' && (
                    <button
                      onClick={endCall}
                      className="tc-call-button tc-end-call"
                    >
                      <span className="tc-call-icon">📞</span> End Call
                    </button>
                  )}
                </div>
              </div>

              <div className="tc-notes-section">
                <h4 className="tc-notes-title">Call Notes</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="tc-notes-input"
                  placeholder="Enter call notes here..."
                  rows="5"
                />
                <button
                  onClick={saveNotes}
                  className="tc-save-button"
                  disabled={!notes.trim()}
                >
                  Save Notes
                </button>
              </div>

              <div className="tc-history-section">
                <h4 className="tc-history-title">Call History</h4>
                {selectedCustomer.notes?.length > 0 ? (
                  <ul className="tc-history-list">
                    {selectedCustomer.notes.map((note, index) => (
                      <li key={index} className="tc-history-item">
                        <div className="tc-history-note">{note}</div>
                        <div className="tc-history-date">
                          {new Date().toLocaleString()} {/* In real app, use actual note date */}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="tc-no-history">No call history available</div>
                )}
              </div>
            </>
          ) : (
            <div className="tc-select-customer">
              <div className="tc-select-icon">👈</div>
              <p>Select a customer from the list to begin</p>
            </div>
          )}
        </div>

        {/* Call Logs */}
        <div className="tc-call-logs">
          <h3 className="tc-subtitle">Recent Calls</h3>
          {callLogs.length === 0 ? (
            <div className="tc-empty">No call logs available</div>
          ) : (
            <ul className="tc-log-items">
              {callLogs.map(log => (
                <li key={log.id} className="tc-log-item">
                  <div className="tc-log-info">
                    <span className="tc-log-name">{log.customerName}</span>
                    <span className="tc-log-phone">{log.phone}</span>
                  </div>
                  <div className="tc-log-details">
                    <span className={`tc-log-status tc-status-${log.status}`}>
                      {log.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                    <span className="tc-log-duration">{log.duration}s</span>
                    <span className="tc-log-date">
                      {new Date(log.date).toLocaleTimeString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeleCalling;