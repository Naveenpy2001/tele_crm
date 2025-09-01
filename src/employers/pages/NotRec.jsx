import React, { useEffect } from "react";
import { FiPhoneOff, FiRefreshCw, FiSearch } from "react-icons/fi";
import "./NotRec.css";
import api from "../../api";

const NotRec = () => {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/user/login");
      }
      try {
        const res = await api.get("/api/candidates/status-count/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('not rec : ',res.data);
      
      
      } catch (error) {
        console.error(error);
        
      } 
    };
    fetchData()
  }, []);
  const notReceivedList = [
    {
      id: 1,
      name: "Sanjay Verma",
      phone: "9876543210",
      attempts: 3,
      lastAttempt: "Yesterday",
    },
    {
      id: 2,
      name: "Meena Desai",
      phone: "8765432109",
      attempts: 2,
      lastAttempt: "Today",
    },
    {
      id: 3,
      name: "Vikram Joshi",
      phone: "7654321098",
      attempts: 1,
      lastAttempt: "Today",
    },
  ];

  return (
    <div className="nr-container">
      <div className="nr-header">
        <h2 className="nr-title">Not Received Contacts</h2>
        <div className="nr-controls">
          <div className="nr-search">
            <FiSearch className="nr-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="nr-search-input"
            />
          </div>
          <button className="nr-refresh-btn">
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      <div className="nr-table-container">
        <table className="nr-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Attempts</th>
              <th>Last Attempt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notReceivedList.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.attempts}</td>
                <td>{item.lastAttempt}</td>
                <td>
                  <div className="nr-actions">
                    <button className="nr-call-btn">
                      <FiPhoneOff /> Try Again
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotRec;
