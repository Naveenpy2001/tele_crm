// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./TeleCalling.css";
// import api from "../../api";
// import { FaPhone, FaPhoneSlash, FaSearch, FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
// import { MdNotes, MdHistory, MdPerson, MdCall } from "react-icons/md";

// const TeleCalling = () => {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [callStatus, setCallStatus] = useState("idle"); // 'idle', 'calling', 'in-progress', 'ended'
//   const [callLogs, setCallLogs] = useState([]);
//   const [notes, setNotes] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [followUp, setFollowUp] = useState("none"); // 'none', 'required', 'not-required'
//   const [followUpDate, setFollowUpDate] = useState("");
//   const [followUpTime, setFollowUpTime] = useState("");
//   const [scheduledCalls, setScheduledCalls] = useState([]);

//   // Fetch customers data
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const token = localStorage.getItem("userToken");
//         if (!token) {
//           navigate("/admin/login");
//         }
//         const response = await api.get("/api/candidates/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCustomers(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Check for scheduled calls every minute
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const dueCalls = scheduledCalls.filter(call => {
//         const callDateTime = new Date(`${call.date}T${call.time}`);
//         return callDateTime <= now && !call.completed;
//       });

//       if (dueCalls.length > 0) {
//         alert(`You have ${dueCalls.length} scheduled calls due now!`);
//         // Mark as completed
//         setScheduledCalls(prev => prev.map(call => 
//           dueCalls.some(due => due.id === call.id) ? {...call, completed: true} : call
//         ));
//       }
//     }, 60000); // Check every minute

//     return () => clearInterval(interval);
//   }, [scheduledCalls]);

//   // Filter customers based on search term
//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleCustomerSelect = (customer) => {
//     setSelectedCustomer(customer);
//     setCallStatus("idle");
//     setNotes("");
//     setFollowUp("none");
//     setFollowUpDate("");
//     setFollowUpTime("");
//   };

//   const initiateCall = () => {
//     if (!selectedCustomer) return;

//     setCallStatus("calling");

//     setTimeout(() => {
//       setCallStatus("in-progress");

//       // Add to call logs
//       const newCallLog = {
//         id: Date.now(),
//         customerId: selectedCustomer.id,
//         customerName: selectedCustomer.name,
//         phone: selectedCustomer.phone,
//         date: new Date().toISOString(),
//         status: "in-progress",
//         duration: 0,
//       };

//       setCallLogs((prev) => [newCallLog, ...prev]);

//       // Start call timer
//       const timer = setInterval(() => {
//         setCallLogs((prev) =>
//           prev.map((log) =>
//             log.id === newCallLog.id
//               ? { ...log, duration: log.duration + 1 }
//               : log
//           )
//         );
//       }, 1000);

//       // Store timer reference to clear later
//       newCallLog.timer = timer;
//     }, 1500);
//   };

//   const endCall = () => {
//     if (callStatus !== "in-progress") return;

//     setCallStatus("ended");

//     // Find the current call in logs
//     const currentCallIndex = callLogs.findIndex(
//       (log) => log.status === "in-progress"
//     );
//     if (currentCallIndex !== -1) {
//       // Clear the interval timer
//       clearInterval(callLogs[currentCallIndex].timer);

//       // Update call status
//       setCallLogs((prev) =>
//         prev.map((log, index) =>
//           index === currentCallIndex ? { ...log, status: "completed" } : log
//         )
//       );
//     }

//     // Reset after 2 seconds
//     setTimeout(() => {
//       setCallStatus("idle");
//     }, 2000);
//   };

//   const saveNotes = async () => {
//     if (!selectedCustomer || !notes.trim()) return;

//     try {
//       const now = new Date();
//       const callData = {
//         customerId: selectedCustomer.id,
//         notes: notes.trim(),
//         callId: callLogs[0]?.id,
//         followUp: followUp,
//         followUpDate: followUp === "required" ? followUpDate : null,
//         followUpTime: followUp === "required" ? followUpTime : null,
//         timestamp: now.toISOString(),
//       };

//       await axios.post("/api/candidates/", callData);

//       // Update local state
//       setCustomers((prev) =>
//         prev.map((customer) =>
//           customer.id === selectedCustomer.id
//             ? { 
//                 ...customer, 
//                 notes: [...(customer.notes || []), {
//                   text: notes.trim(),
//                   date: now.toLocaleString(),
//                   followUp,
//                   followUpDate: followUp === "required" ? followUpDate : null,
//                   followUpTime: followUp === "required" ? followUpTime : null
//                 }] 
//               }
//             : customer
//         )
//       );

//       // If follow-up is required, add to scheduled calls
//       if (followUp === "required" && followUpDate && followUpTime) {
//         const newScheduledCall = {
//           id: Date.now(),
//           customerId: selectedCustomer.id,
//           customerName: selectedCustomer.name,
//           phone: selectedCustomer.phone,
//           date: followUpDate,
//           time: followUpTime,
//           notes: notes.trim(),
//           completed: false
//         };
//         setScheduledCalls(prev => [...prev, newScheduledCall]);
//       }

//       setNotes("");
//       setFollowUp("none");
//       setFollowUpDate("");
//       setFollowUpTime("");
//       alert("Notes saved successfully!");
//     } catch (error) {
//       console.error("Error saving notes:", error);
//       alert("Failed to save notes. Please try again.");
//     }
//   };

//   const formatDuration = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="tc-container">
//       <div className="tc-header">
//         <h2 className="tc-title">
//           <MdCall className="tc-title-icon" /> Tele Calling System
//         </h2>
//         <div className="tc-search">
//           <input
//             type="text"
//             placeholder="Search customers..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="tc-search-input"
//           />
//           <FaSearch className="tc-search-icon" />
//         </div>
//       </div>

//       <div className="tc-layout">
//         <div className="tc-customer-list">
//           <h3 className="tc-subtitle">
//             <MdPerson className="tc-subtitle-icon" /> Customer List
//           </h3>
//           {isLoading ? (
//             <div className="tc-loading">Loading customers...</div>
//           ) : filteredCustomers.length === 0 ? (
//             <div className="tc-empty">No customers found</div>
//           ) : (
//             <ul className="tc-customer-items">
//               {filteredCustomers.map((customer) => (
//                 <li
//                   key={customer.id}
//                   className={`tc-customer-item ${
//                     selectedCustomer?.id === customer.id ? "tc-active" : ""
//                   }`}
//                   onClick={() => handleCustomerSelect(customer)}
//                 >
//                   <div className="tc-customer-info">
//                     <span className="tc-customer-name">{customer.name}</span>
//                     <span className="tc-customer-phone">
//                       {customer.mobile_number}
//                     </span>
//                   </div>
//                   <div className="tc-customer-last-contact">
//                     {customer.lastContact || "Never contacted"}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Customer Details and Calling */}
//         <div className="tc-customer-details">
//           {selectedCustomer ? (
//             <>
//               <div className="tc-customer-header">
//                 <h3 className="tc-customer-name-large">
//                   {selectedCustomer.name}
//                 </h3>
//                 <div className="tc-customer-meta">
//                   <span className="tc-customer-phone-large">
//                     {selectedCustomer.mobile_number}
//                   </span>
//                   <span className="tc-customer-location">
//                     {selectedCustomer.location || "Location not specified"}
//                   </span>
//                 </div>
//               </div>

//               <div className="tc-call-section">
//                 <div className={`tc-call-status tc-status-${callStatus}`}>
//                   {callStatus === "idle" && "Ready to call"}
//                   {callStatus === "calling" && "Calling..."}
//                   {callStatus === "in-progress" && "Call in progress"}
//                   {callStatus === "ended" && "Call ended"}
//                 </div>

//                 {callStatus === "in-progress" && callLogs[0] && (
//                   <div className="tc-call-timer">
//                     Duration: {formatDuration(callLogs[0].duration)}
//                   </div>
//                 )}

//                 <div className="tc-call-controls">
//                   {callStatus === "idle" && (
//                     <button
//                       onClick={initiateCall}
//                       className="tc-call-button tc-initiate-call"
//                     >
//                       <FaPhone className="tc-call-icon" /> Call{" "}
//                       {selectedCustomer.phone}
//                     </button>
//                   )}

//                   {callStatus === "in-progress" && (
//                     <button
//                       onClick={endCall}
//                       className="tc-call-button tc-end-call"
//                     >
//                       <FaPhoneSlash className="tc-call-icon" /> End Call
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="tc-notes-section">
//                 <h4 className="tc-notes-title">
//                   <MdNotes className="tc-subtitle-icon" /> Call Notes
//                 </h4>
//                 <textarea
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   className="tc-notes-input"
//                   placeholder="Enter call notes here..."
//                   rows="5"
//                 />
                
//                 <div className="tc-followup-section">
//                   <label className="tc-followup-label">Follow Up:</label>
//                   <div className="tc-radio-group">
//                     <label>
//                       <input
//                         type="radio"
//                         name="followUp"
//                         value="required"
//                         checked={followUp === "required"}
//                         onChange={() => setFollowUp("required")}
//                       />
//                       Required
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name="followUp"
//                         value="not-required"
//                         checked={followUp === "not-required"}
//                         onChange={() => setFollowUp("not-required")}
//                       />
//                       Not Required
//                     </label>
//                   </div>
//                 </div>

//                 {followUp === "required" && (
//                   <div className="tc-followup-datetime">
//                     <div className="tc-followup-date">
//                       <label>Date:</label>
//                       <input
//                         type="date"
//                         value={followUpDate}
//                         onChange={(e) => setFollowUpDate(e.target.value)}
//                         min={new Date().toISOString().split('T')[0]}
//                       />
//                       <FaCalendarAlt className="tc-date-icon" />
//                     </div>
//                     <div className="tc-followup-time">
//                       <label>Time:</label>
//                       <input
//                         type="time"
//                         value={followUpTime}
//                         onChange={(e) => setFollowUpTime(e.target.value)}
//                       />
//                       <FaClock className="tc-time-icon" />
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={saveNotes}
//                   className="tc-save-button"
//                   disabled={!notes.trim() || (followUp === "required" && (!followUpDate || !followUpTime))}
//                 >
//                   Save Notes
//                 </button>
//               </div>

//               <div className="tc-history-section">
//                 <h4 className="tc-history-title">
//                   <MdHistory className="tc-subtitle-icon" /> Call History
//                 </h4>
//                 {selectedCustomer.notes?.length > 0 ? (
//                   <ul className="tc-history-list">
//                     {selectedCustomer.notes.map((note, index) => (
//                       <li key={index} className="tc-history-item">
//                         <div className="tc-history-note">{note.text}</div>
//                         <div className="tc-history-meta">
//                           <span className="tc-history-date">
//                             {new Date(note.timestamp || Date.now()).toLocaleString()}
//                           </span>
//                           {note.followUp === "required" && (
//                             <span className="tc-history-followup">
//                               Follow-up: {note.followUpDate} at {note.followUpTime}
//                             </span>
//                           )}
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <div className="tc-no-history">No call history available</div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="tc-select-customer">
//               <FaArrowLeft className="tc-select-icon" />
//               <p>Select a customer from the list to begin</p>
//             </div>
//           )}
//         </div>

//         {/* Call Logs and Scheduled Calls */}
//         <div className="tc-side-panel">
//           <div className="tc-call-logs">
//             <h3 className="tc-subtitle">Recent Calls</h3>
//             {callLogs.length === 0 ? (
//               <div className="tc-empty">No call logs available</div>
//             ) : (
//               <ul className="tc-log-items">
//                 {callLogs.slice(0, 5).map((log) => (
//                   <li key={log.id} className="tc-log-item">
//                     <div className="tc-log-info">
//                       <span className="tc-log-name">{log.customerName}</span>
//                       <span className="tc-log-phone">{log.phone}</span>
//                     </div>
//                     <div className="tc-log-details">
//                       <span className={`tc-log-status tc-status-${log.status}`}>
//                         {log.status === "completed" ? "Completed" : "In Progress"}
//                       </span>
//                       <span className="tc-log-duration">{formatDuration(log.duration)}</span>
//                       <span className="tc-log-date">
//                         {new Date(log.date).toLocaleTimeString()}
//                       </span>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className="tc-scheduled-calls">
//             <h3 className="tc-subtitle">Scheduled Calls</h3>
//             {scheduledCalls.length === 0 ? (
//               <div className="tc-empty">No scheduled calls</div>
//             ) : (
//               <ul className="tc-scheduled-items">
//                 {scheduledCalls.map((call) => (
//                   <li key={call.id} className={`tc-scheduled-item ${call.completed ? 'tc-completed' : ''}`}>
//                     <div className="tc-scheduled-info">
//                       <span className="tc-scheduled-name">{call.customerName}</span>
//                       <span className="tc-scheduled-phone">{call.phone}</span>
//                     </div>
//                     <div className="tc-scheduled-datetime">
//                       <span className="tc-scheduled-date">{call.date}</span>
//                       <span className="tc-scheduled-time">{call.time}</span>
//                     </div>
//                     <div className="tc-scheduled-status">
//                       {call.completed ? 'Completed' : 'Pending'}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeleCalling;





import  { useState, useEffect } from "react";
import "./TeleCalling.css";
import api from "../../api";
import { FaSearch, FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { MdNotes, MdHistory, MdCall } from "react-icons/md";

const TeleCalling = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [followUp, setFollowUp] = useState("not-required");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpTime, setFollowUpTime] = useState("");
  const [followUpComments, setFollowUpComments] = useState("");
  const [call_result,setcall_result] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(15);


  const [userData,setUserData] = useState([])
 
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("userToken");
        // if (!token) {
        //   navigate("/admin/login");
        // }
        const response = await api.get("/api/candidates/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const customersWithDefaultStatus = response.data.map(customer => ({
          ...customer,
          status: customer.status || "Not Connected"
        }));
        console.log('username :', response.data);
        
        setUserData(response.data)
        setCustomers(customersWithDefaultStatus);
        setFilteredCustomers(customersWithDefaultStatus);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCustomers(customers);
      setCurrentPage(1);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.mobile_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, customers]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setNotes("");
    setFollowUp("not-required");
    setFollowUpDate("");
    setFollowUpComments("");
  };

  const formatTime12Hour = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":");
    const h = parseInt(hour, 10);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

// const saveNotes = async (currentRows) => {
//     console.log("rows data :",currentRows);
    
//     if (!selectedCustomer || !notes.trim()) return;

//     try {
//       const now = new Date();
//       const contactTime = now.toISOString();      
//       const callData = {
//         customerId: selectedCustomer.id,
//         candidate: currentRows.name,
//         notes: notes.trim(),
//         contact_time: contactTime,
//         followUp: followUp,
//         followUpDate: followUp === "required" ? followUpDate : null,
//         followUpTime: followUp === "required" ? formatTime12Hour(followUpTime) : null,
//         followUpComments: followUp === "required" ? followUpComments : null,
//         status: "Contacted" ,
//         user : currentRows.assigned_to

//       };
//       console.log(callData);
      
//         const token = localStorage.getItem("userToken");


//       await api.post("/api/logs/", callData, {
//       headers: {
//             Authorization: `Bearer ${token}`,
//           },});

     
//       setCustomers(prev =>
//         prev.map(customer =>
//           customer.id === selectedCustomer.id
//             ? {
//                 ...customer,
//                 status: "Contacted",
//                 notes: [
//                   ...(customer.notes || []),
//                   {
//                     text: notes.trim(),
//                     contact_time: contactTime,
//                     followUp,
//                     followUpDate: followUp === "required" ? followUpDate : null,
//                     followUpComments: followUp === "required" ? followUpComments : null
//                   }
//                 ]
//               }
//             : customer
//         )
//       );

//       setNotes("");
//       setFollowUp("not-required");
//       setFollowUpDate("");
//       setFollowUpComments("");
//       alert("Feedback saved successfully!");
//     } catch (error) {
//       alert("Failed to save feedback. Please try again.");
//       console.error("Error saving feedback:", error);
//     }
// };

const saveNotes = async (currentRows) => {
  console.log("Current rows array:", currentRows);

  if (!selectedCustomer || !notes.trim()) return;

  const row = currentRows[0]; // 👈 choose the right row

  if (!row || !row.name || !row.assigned_to) {
    alert("Missing candidate name or assigned user in row data");
    console.log("Row data:", row);
    return;
  }

  try {
    const now = new Date();
    const contactTime = now.toISOString();

    const callData = {
      customerId: selectedCustomer.id,
      candidate: row.assigned_to, // ✅ from row
      notes: notes.trim(),
      contact_time: contactTime,
      followUp: followUp,
      followUpDate: followUp === "required" ? followUpDate : null,
      followUpTime: followUp === "required" ? formatTime12Hour(followUpTime) : null,
      followUpComments: followUp === "required" ? followUpComments : null,
      status: "Contacted",
      
      user: row.assigned_to, // ✅ from row
    };

    console.log("Sending payload:", callData);

    const token = localStorage.getItem("userToken");

    await api.post("/api/logs/", callData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Feedback saved successfully!");
    setNotes("");
    setFollowUp("not-required");
    setFollowUpDate("");
    setFollowUpComments("");
  } catch (error) {
    console.error("Error saving feedback:", error);
    alert("Failed to save feedback. Please try again.");
  }
};

  const goBackToList = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="tc-container">
      <div className="tc-header">
        <h2 className="tc-title">
          <MdCall className="tc-title-icon" /> Customer Feedback System
        </h2>
      </div>

      {!selectedCustomer ? (
        <div className="tc-table-view">
          <div className="tc-search-container">
            <div className="tc-search">
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="tc-search-input"
              />
              <FaSearch className="tc-search-icon" />
            </div>
            <div className="tc-total-records">
              Total: {filteredCustomers.length} records
            </div>
          </div>

          <div className="tc-table-wrapper">
            <table className="tc-customer-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Last Contact</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((customer) => (
                    <tr
                      key={customer.id}
                      onClick={() => handleCustomerSelect(customer)}
                      className="tc-customer-row"
                    >
                      <td>{customer.name}</td>
                      <td>{customer.mobile_number}</td>
                      <td>
                        {customer.notes?.length > 0
                          ? new Date(
                              customer.notes[customer.notes.length - 1].contact_time
                            ).toLocaleString()
                          : "Never contacted"}
                      </td>
                      <td>
                        {customer.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="tc-no-data">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length > rowsPerPage && (
            <div className="tc-pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="tc-detail-view">
          <button onClick={goBackToList} className="tc-back-button">
            <FaArrowLeft /> Back to list
          </button>

          <div className="tc-customer-header">
            <h3 className="tc-customer-name-large">{selectedCustomer.name}</h3>
            <div className="tc-customer-meta">
              <span className="tc-customer-phone-large">
                {selectedCustomer.mobile_number}
              </span>
            </div>
          </div>

          <div className="tc-notes-section">
            <h4 className="tc-notes-title">
              <MdNotes className="tc-subtitle-icon" /> Customer Feedback
            </h4>

            <div>
            <label className="block text-gray-700 mb-2" htmlFor="call_result">
              Call Result
            </label>
            <select
              id="call_result"
              name="call_result"
              // value={formData.call_result}
              // onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select result</option>
              <option value="answered">Answered</option>
              <option value="no_answer">No Answer</option>
              <option value="busy">Busy</option>
              <option value="failed">Failed</option>
            </select>
          </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="tc-notes-input"
              placeholder="Enter feedback notes here..."
              rows="5"
              required
            />
            
            <div className="tc-followup-section">
              <label className="tc-followup-label">Follow Up Required:</label>
              <div className="tc-radio-group">
                <label>
                  <input
                    type="radio"
                    name="followUp"
                    value="required"
                    checked={followUp === "required"}
                    onChange={() => setFollowUp("required")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="followUp"
                    value="not-required"
                    checked={followUp === "not-required"}
                    onChange={() => setFollowUp("not-required")}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            // value={formData.status}
            // onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="interested">Interested</option>
            <option value="not_interested">Not Interested</option>
            <option value="follow_up">Follow Up</option>
            <option value="converted">Converted</option>
            <option value="not_reachable">Not Reachable</option>
            <option value="wrong_number">Wrong Number</option>
          </select>
        </div>
            {followUp === "required" && (
              <div className="tc-followup-details">
                <div className="tc-followup-date">
                  <label>Follow-up Date:</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                  <FaCalendarAlt className="tc-date-icon" />
                </div>
                <div className="tc-followup-date">
                  <label>Follow-up Time:</label>
                  <input
                    type="time"
                    value={followUpTime}
                    onChange={(e) => setFollowUpTime(e.target.value)}
                    
                    required
                  />
                  <FaCalendarAlt className="tc-date-icon" />
                  <p>Selected Time: {formatTime12Hour(followUpTime)}</p>
                </div>
                <div className="tc-followup-comments">
                  <label>Follow-up Comments:</label>
                  <textarea
                    value={followUpComments}
                    onChange={(e) => setFollowUpComments(e.target.value)}
                    placeholder="Additional comments for follow-up..."
                    rows="3"
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => saveNotes(currentRows)}
              className="tc-save-button"
              disabled={!notes.trim() || (followUp === "required" && !followUpDate)}
            >
              Save Feedback
            </button>
          </div>

          <div className="tc-history-section">
            <h4 className="tc-history-title">
              <MdHistory className="tc-subtitle-icon" /> Contact History
            </h4>
            {selectedCustomer.notes?.length > 0 ? (
              <table className="tc-history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Feedback</th>
                    <th>Follow Up</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCustomer.notes.map((note, index) => (
                    <tr key={index}>
                      <td>{new Date(note.contact_time).toLocaleString()}</td>
                      <td>{note.text}</td>
                      <td>
                        {note.followUp === "required" ? (
                          <div className="tc-followup-details">
                            <div><strong>Date:</strong> {note.followUpDate}</div>
                            {note.followUpComments && (
                              <div><strong>Comments:</strong> {note.followUpComments}</div>
                            )}
                          </div>
                        ) : (
                          "No follow-up"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="tc-no-history">No contact history available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeleCalling;