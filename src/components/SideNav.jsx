import React, { useState, useEffect } from 'react';
import { 
  FiHome, 
  FiPlusSquare, 
  FiUpload, 
  FiPhone, 
  FiUserPlus,
  FiUsers,
  FiUserCheck,
  FiBook,
  FiX,
  FiMenu,
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi';
import './SideNav.css';

const SideNav = ({ activeComponent, setActiveComponent,onToggle,data }) => {
 
  
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
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

  const navItems = [
    { name: 'home', icon: <FiHome />, component: 'Home' },
    { name: 'add employee', icon: <FiPlusSquare />, component: 'AddRecord' },
    { name: 'upload data', icon: <FiUpload />, component: 'UploadData' },
    // { name: 'telecalling', icon: <FiPhone />, component: 'Telecalling' },
    { name: 'follow-up leads', icon: <FiBook />, component: 'FollowUpRegister' },
    { name: 'all user', icon: <FiUsers />, component: 'AllUser' },
    { name: 'user status', icon: <FiUserCheck />, component: 'UserStatus' },

  ];

  return (
     <>
      {isMobile && !isOpen && (
        <button className="ds-mobile-menu-btn" onClick={toggleSidebar}>
          <FiChevronRight />
        </button>
      )}
      
      <div className={`ds-sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="ds-sidebar-header">
          {isOpen ? (
            <>
              <div className="ds-logo">
                <div className="ds-logo-icon">T</div>
                <div style={{display:'flex',flexDirection:'column'}}>
                <span>Admin Panel</span>
                <span style={{fontSize:'10px'}}>{data.email}</span>
                </div>
              </div>
              <button className="ds-close-btn" onClick={toggleSidebar}>
                <FiChevronLeft />
              </button>
            </>
          ) : (
            !isMobile && (
              <button className="ds-menu-btn" onClick={toggleSidebar}>
                <FiChevronRight />
              </button>
            )
          )}
        </div>

        <nav className="ds-nav">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <button 
                  className={`ds-nav-btn ${activeComponent === item.component ? 'active' : ''}`}
                  onClick={() => {
                    setActiveComponent(item.component);
                    if (isMobile) toggleSidebar();
                  }}
                >
                  <span className="ds-nav-icon">{item.icon}</span>
                  {isOpen && <span className="ds-nav-text">{item.name}</span>}
                  {isOpen && activeComponent === item.component && (
                    <span className="ds-active-indicator"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {isOpen && (
          <div className="ds-sidebar-footer">
            <p>Powered by <strong>Tsarit Pvt Ltd</strong></p>
          </div>
        )}
      </div>
    </>
  );
};

export default SideNav;