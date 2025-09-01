import React, { useState, useEffect } from 'react';
import { 
  FiPlusCircle, 
  FiPhone, 
  FiUserX,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import './SideNav.css';

const SideNav = ({ activeComponent, setActiveComponent, onToggle, username }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };

  const getUserInitials = () => {
    if (!username) return 'U';
    const parts = username.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  };

  const navItems = [
    { name: 'add new record', icon: <FiPlusCircle />, component: 'AddNewRecord' },
    { name: 'tele calling', icon: <FiPhone />, component: 'TeleCalling' },
    { name: 'not received', icon: <FiUserX />, component: 'NotRec' },
    { name: 'follow up', icon: <FiClock />, component: 'FollowUp' },
    { name: 'deal done', icon: <FiCheckCircle />, component: 'DealDone' },
    { name: 'deal cancel', icon: <FiXCircle />, component: 'DealCancel' },
    { name: 'logout', icon: <FiLogOut />, component: 'Logout' },
  ];

  return (
    <>
      {isMobile && !isOpen && (
        <button className="user-mobile-menu-btn" onClick={toggleSidebar}>
          <FiChevronRight />
        </button>
      )}
      
      <div className={`user-sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="user-sidebar-header">
          {isOpen ? (
            <>
              <div className="user-logo">
                <div className="user-logo-icon">T</div>
                <span>Sales Dashboard</span>
              </div>
              <button className="user-close-btn" onClick={toggleSidebar}>
                <FiChevronLeft />
              </button>
            </>
          ) : (
            !isMobile && (
              <button className="user-menu-btn" onClick={toggleSidebar}>
                <FiChevronRight />
              </button>
            )
          )}
        </div>

        <nav className="user-nav">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <button 
                  className={`user-nav-btn ${activeComponent === item.component ? 'active' : ''}`}
                  onClick={() => {
                    setActiveComponent(item.component);
                    if (isMobile) toggleSidebar();
                  }}
                >
                  <span className="user-nav-icon">{item.icon}</span>
                  {isOpen && <span className="user-nav-text">{item.name}</span>}
                  {isOpen && activeComponent === item.component && (
                    <span className="user-active-indicator"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {isOpen && (
          <div className="user-sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">{getUserInitials()}</div>
              <div className="user-info">
                <div className="user-name">{username || 'User'}</div>
                <div className="user-company">Powered by <strong>Tsarit Pvt Ltd</strong></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideNav;