import AddRecord from '../pages/AddRecord';
import AllUsers from '../pages/AllUsers';
import FollowUpComponent from '../pages/FollowUpComponent';
import Home from '../pages/Home';
import UploadData from '../pages/UploadData';
import './MainContent.css';

const MainContent = ({ activeComponent, isSidebarOpen }) => {
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return <div className="ds-content-page">
            <Home />
        </div>;
      case 'AddRecord':
        return <div className="ds-content-page">
            <AddRecord />
        </div>;
      case 'UploadData':
        return <div className="ds-content-page">
            <UploadData />
        </div>;
      case 'FollowUpRegister':
        return <div className="ds-content-page">
          <FollowUpComponent />
        </div>;
      case 'AddUser':
        return <div className="ds-content-page"><h2>Add New User</h2></div>;
      case 'AllUser':
        return <div className="ds-content-page">
          <AllUsers />
        </div>;
      case 'UserStatus':
        return <div className="ds-content-page"><h2>User Status</h2></div>;
      case 'FinalRegister':
        return <div className="ds-content-page"><h2>Final Register</h2></div>;
      case 'CancelRegister':
        return <div className="ds-content-page"><h2>Cancel Register</h2></div>;
      default:
        return <div className="ds-content-page"><h2>Welcome to Admin Dashboard</h2></div>;
    }
  };

  return (
    <div className={`ds-main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="ds-content-header">
        <h1 className="ds-content-title">{activeComponent || 'Dashboard'}</h1>
      </div>
      {renderComponent()}
    </div>
  );
};

export default MainContent;