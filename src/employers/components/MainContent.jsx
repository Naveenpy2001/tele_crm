import React from 'react';
import './MainContent.css';
import AddNewRecord from '../pages/AddNewRecord';
import TeleCalling from '../pages/TeleCalling';
import NotRec from '../pages/NotRec';
import FollowUp from '../pages/FollowUp';
import DealDone from '../pages/DealDone';
import DealCancel from '../pages/DealCancel';

const MainContent = ({ activeComponent, isSidebarOpen }) => {
  const renderComponent = () => {
    switch (activeComponent) {
      case 'AddNewRecord':
        return <div className="user-content-page">
            <AddNewRecord />
        </div>;
      case 'TeleCalling':
        return <div className="user-content-page">
            <TeleCalling />
        </div>;
      case 'NotRec':
        return <div className="user-content-page">
            <NotRec />
        </div>;
      case 'FollowUp':
        return <div className="user-content-page">
            <FollowUp />
        </div>;
      case 'DealDone':
        return <div className="user-content-page">
            <DealDone />
        </div>;
      case 'DealCancel':
        return <div className="user-content-page">
            <DealCancel />
        </div>;
      case 'Logout':
        return <div className="user-content-page"><h2>Logging out...</h2></div>;
      default:
        return <div className="user-content-page"><h2>Sales Dashboard</h2></div>;
    }
  };

  return (
    <div className={`user-main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="user-content-header">
        <h1 className="user-content-title">{activeComponent.replace(/([A-Z])/g, ' $1').trim()}</h1>
      </div>
      {renderComponent()}
    </div>
  );
};

export default MainContent;