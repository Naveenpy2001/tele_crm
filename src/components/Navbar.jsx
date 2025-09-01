import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="hm-nav">
      <div className="hm-nav-container">
        <Link to="/" className="hm-nav-logo">TELE-CRM | TSAR-IT</Link>
        
        <div className="hm-nav-logins">
          <Link to="/admin/login" className="hm-admin-login">Admin Login</Link>
          <Link to="/user/login" className="hm-user-login">User Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;